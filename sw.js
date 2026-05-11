/* Whalesborough Farm Resort & Spa — Service Worker
   Minimal offline-first shell. Caches critical assets on install and
   falls back to /offline.html when the network fails. */

const CACHE = 'whalesborough-v2';
const CORE = [
  '/',
  '/offline.html',
  '/assets/css/whalesborough.min.css',
  '/assets/css/fonts.min.css',
  '/assets/js/main.js',
  '/assets/images/logo/Resort-Spa.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // For navigations: network first, fall back to cached page or offline shell.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match(req).then((cached) => cached || caches.match('/offline.html'))
      )
    );
    return;
  }

  // For same-origin static assets: cache-first with background refresh.
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const networked = fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || networked;
      })
    );
  }
});
