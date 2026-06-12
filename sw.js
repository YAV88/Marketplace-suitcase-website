const CACHE_NAME = 'svalka-cache-v1';

// Список файлов "Каркаса" (App Shell), которые кэшируем навсегда
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ЭТАП 1: Установка (Скачиваем файлы в память телефона при первом заходе)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// ЭТАП 2: Активация (Удаляем старые кэши, если мы поменяли CACHE_NAME)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ЭТАП 3: Перехват запросов (Стратегия Stale-While-Revalidate)
self.addEventListener('fetch', event => {
  // Не трогаем запросы к Supabase API (они должны идти напрямую)
  if (event.request.url.includes('supabase.co')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        // Фоновый запрос за свежей версией файла
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
            // Если интернета нет вообще, просто игнорируем ошибку (покажем кэш)
        });

        // Отдаем кэш мгновенно (если он есть), иначе ждем ответа от сети
        return response || fetchPromise;
      });
    })
  );
});
