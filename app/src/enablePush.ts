// Web Push notification subscription handler
export async function enablePush(publicVapidKeyB64Url: string): Promise<boolean> {
  try {
    // Check if VAPID key is provided
    if (!publicVapidKeyB64Url) {
      console.error('VAPID public key is not configured');
      alert('VAPID公開鍵が設定されていません。環境変数を確認してください。');
      return false;
    }
    // Check browser support
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.error('Push notifications are not supported');
      alert('Push notifications are not supported on this device');
      return false;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered', registration);

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;
    console.log('Service Worker is ready');

    // Request notification permission
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      alert('通知の許可が拒否されました');
      return false;
    }

    // Convert VAPID key from base64url to Uint8Array
    const vapidKey = Uint8Array.from(
      atob(publicVapidKeyB64Url.replace(/_/g, '/').replace(/-/g, '+')),
      c => c.charCodeAt(0)
    );

    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidKey
    });

    // Send subscription to server
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription)
    });

    if (!response.ok) {
      throw new Error('Failed to save subscription');
    }

    console.log('Push subscription successful');
    return true;
  } catch (error) {
    console.error('Error enabling push notifications:', error);
    if (error instanceof Error) {
      alert(`エラー: ${error.message}`);
    } else {
      alert('通知の有効化中にエラーが発生しました');
    }
    return false;
  }
}

// Check if push notifications are already enabled
export async function isPushEnabled(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  } catch {
    return false;
  }
}

// Unsubscribe from push notifications
export async function disablePush(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();

      // Notify server to remove subscription
      await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endpoint: subscription.endpoint })
      });

      return true;
    }
    return false;
  } catch (error) {
    console.error('Error disabling push notifications:', error);
    return false;
  }
}