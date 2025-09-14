import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { notifyAll } from './push';
import { initializeScheduler } from './scheduler';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://takeshis-mac-studio-1.tailb74fce.ts.net',
    /\.ts\.net$/  // Allow all .ts.net domains
  ],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Subscribe to push notifications
app.post('/api/subscribe', async (req, res) => {
  try {
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Invalid subscription' });
    }

    // Upsert subscription
    await prisma.subscription.upsert({
      where: { endpoint: subscription.endpoint },
      update: {
        data: JSON.stringify(subscription),
        updatedAt: new Date()
      },
      create: {
        endpoint: subscription.endpoint,
        data: JSON.stringify(subscription)
      }
    });

    res.status(201).json({ message: 'Subscription saved' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

// Unsubscribe from push notifications
app.post('/api/unsubscribe', async (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint required' });
    }

    await prisma.subscription.delete({
      where: { endpoint }
    });

    res.json({ message: 'Subscription removed' });
  } catch (error) {
    console.error('Error removing subscription:', error);
    res.status(500).json({ error: 'Failed to remove subscription' });
  }
});

// Send test notification
app.post('/api/notify', async (req, res) => {
  try {
    const payload = req.body || {
      title: 'AKARI',
      body: '今のうちに記録しよう。',
      url: '/log?src=push'
    };

    const subscriptions = await prisma.subscription.findMany();

    if (subscriptions.length === 0) {
      return res.status(404).json({ error: 'No subscriptions found' });
    }

    const subs = subscriptions.map(s => JSON.parse(s.data));
    await notifyAll(subs, payload);

    res.json({ message: `Notification sent to ${subscriptions.length} users` });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Meal CRUD operations
app.post('/api/meal', async (req, res) => {
  try {
    const { slot, memo, photoUrl, calories, at } = req.body;

    if (!slot || !at) {
      return res.status(400).json({ error: 'Slot and date are required' });
    }

    const meal = await prisma.meal.create({
      data: {
        slot,
        memo,
        photoUrl,
        calories,
        at: new Date(at)
      }
    });

    res.status(201).json(meal);
  } catch (error) {
    console.error('Error creating meal:', error);
    res.status(500).json({ error: 'Failed to create meal' });
  }
});

app.get('/api/meal', async (req, res) => {
  try {
    const { date } = req.query;

    let where = {};
    if (date) {
      const startDate = new Date(date as string);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date as string);
      endDate.setHours(23, 59, 59, 999);

      where = {
        at: {
          gte: startDate,
          lte: endDate
        }
      };
    }

    const meals = await prisma.meal.findMany({
      where,
      orderBy: { at: 'asc' }
    });

    res.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

// AI Coach endpoint (placeholder - will be implemented with Mastra)
app.post('/api/coach/summarize', async (req, res) => {
  try {
    const { period } = req.body;

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    if (period === 'week') {
      startDate.setDate(endDate.getDate() - 7);
    } else {
      startDate.setDate(endDate.getDate() - 30);
    }

    // Fetch meals in period
    const meals = await prisma.meal.findMany({
      where: {
        at: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { at: 'asc' }
    });

    // TODO: Implement AI analysis with Mastra + OpenAI
    // For now, return a placeholder response
    const response = {
      summary: `${period === 'week' ? '過去1週間' : '過去1ヶ月'}で${meals.length}回の食事を記録しました。`,
      advice: '記録を続けることで、より正確なアドバイスが可能になります。',
      nextSteps: [
        '毎日の記録を継続しましょう',
        '野菜を意識的に摂取しましょう',
        '水分補給を忘れずに'
      ]
    };

    res.json(response);
  } catch (error) {
    console.error('Error generating coach advice:', error);
    res.status(500).json({ error: 'Failed to generate advice' });
  }
});

// Get VAPID public key for client
app.get('/api/vapid-public-key', (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

// Start server
async function startServer() {
  try {
    // Initialize database
    await prisma.$connect();
    console.log('Connected to database');

    // Initialize scheduler
    initializeScheduler();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();