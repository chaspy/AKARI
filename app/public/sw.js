// Service Worker for AKARI PWA
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  event.waitUntil(clients.claim());
});

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {
    title: 'AKARI',
    body: '今のうちに記録しよう。',
    url: '/log?src=push',
    tag: 'akari-reminder'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: data.tag || 'akari-reminder',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      data: { url: data.url || '/log?src=push' }
    })
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        const client = windowClients.find(c => c.url.includes(url));
        if (client) {
          return client.focus();
        }
        return clients.openWindow(url);
      })
  );
});