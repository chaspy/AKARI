import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

// Configure web-push with VAPID details
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}

export async function sendNotification(
  subscription: any,
  payload: PushPayload
): Promise<void> {
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify(payload)
    );
    console.log('Push notification sent successfully');
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
}

export async function notifyAll(
  subscriptions: any[],
  payload: PushPayload
): Promise<void> {
  const results = await Promise.allSettled(
    subscriptions.map(sub => sendNotification(sub, payload))
  );

  const failed = results.filter(r => r.status === 'rejected');
  if (failed.length > 0) {
    console.log(`Failed to send ${failed.length} notifications`);
  }
}