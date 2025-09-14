import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { notifyAll } from './push';

const prisma = new PrismaClient();

// Meal reminder messages
const mealReminders = {
  breakfast: {
    title: 'AKARI',
    body: '今日の最初の一口、記録しますか？',
    url: '/log?src=push&slot=breakfast',
    tag: 'meal-breakfast'
  },
  lunch: {
    title: 'AKARI',
    body: '午後の前にエネルギー補給。ランチを記録しよう',
    url: '/log?src=push&slot=lunch',
    tag: 'meal-lunch'
  },
  dinner: {
    title: 'AKARI',
    body: '一日を振り返る時間。夕食を記録しよう',
    url: '/log?src=push&slot=dinner',
    tag: 'meal-dinner'
  }
};

export async function sendMealReminder(meal: 'breakfast' | 'lunch' | 'dinner') {
  try {
    // Get all active subscriptions
    const subscriptions = await prisma.subscription.findMany();

    if (subscriptions.length === 0) {
      console.log('No subscriptions found');
      return;
    }

    // Parse subscription data and send notifications
    const subs = subscriptions.map(s => JSON.parse(s.data));
    await notifyAll(subs, mealReminders[meal]);

    console.log(`${meal} reminder sent to ${subscriptions.length} users`);
  } catch (error) {
    console.error(`Error sending ${meal} reminder:`, error);
  }
}

export function initializeScheduler() {
  // Check if reminders are enabled
  prisma.setting.findUnique({ where: { id: 1 } }).then(settings => {
    if (!settings) {
      // Create default settings
      prisma.setting.create({
        data: {
          id: 1,
          tz: 'Asia/Tokyo',
          remind08: true,
          remind1230: true,
          remind19: true
        }
      }).then(() => {
        console.log('Default settings created');
        setupCronJobs();
      });
    } else {
      setupCronJobs();
    }
  });
}

function setupCronJobs() {
  // TEST: 16:35 JST notification for testing
  cron.schedule('35 16 * * *', async () => {
    console.log('Running TEST notification at 16:35');
    try {
      const subscriptions = await prisma.subscription.findMany();
      if (subscriptions.length > 0) {
        const subs = subscriptions.map(s => JSON.parse(s.data));
        await notifyAll(subs, {
          title: 'AKARI テスト通知',
          body: '画面を閉じていても通知が届きました！16:35',
          url: '/log?src=push',
          tag: 'test-1635'
        });
        console.log('TEST notification sent at 16:35');
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  }, {
    timezone: 'Asia/Tokyo'
  });

  // Breakfast reminder at 08:00 JST
  cron.schedule('0 8 * * *', () => {
    console.log('Running breakfast reminder');
    sendMealReminder('breakfast');
  }, {
    timezone: 'Asia/Tokyo'
  });

  // Lunch reminder at 12:30 JST
  cron.schedule('30 12 * * *', () => {
    console.log('Running lunch reminder');
    sendMealReminder('lunch');
  }, {
    timezone: 'Asia/Tokyo'
  });

  // Dinner reminder at 19:00 JST
  cron.schedule('0 19 * * *', () => {
    console.log('Running dinner reminder');
    sendMealReminder('dinner');
  }, {
    timezone: 'Asia/Tokyo'
  });

  console.log('Meal reminder scheduler initialized');
}