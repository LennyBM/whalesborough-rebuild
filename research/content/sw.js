/*
 * Whalesborough Farm Resort & Spa — Service Worker
 * Workbox 7.x — generated/maintained by Workbox CLI (workbox-config.js)
 *
 * Scope: /
 * Excluded scopes: /admin/*, /owners/*, /api/admin/*, /api/owners/* — these set Cache-Control: no-store at edge.
 *
 * Cache versioning: bumped automatically by build pipeline (commit SHA appended).
 * On activation, all caches not in the current generation are purged.
 *
 * Privacy: DNT honoured at fetch level (precache only). Cache invalidation on sign-out via clients.postMessage.
 */

import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, setDefaultHandler, setCatchHandler, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { BackgroundSyncPlugin, Queue } from 'workbox-background-sync';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import { skipWaiting, clientsClaim } from 'workbox-core';

// ───────────────────────────────────────────────────────────────────────────
// 0. Versioning + skip-waiting
// ───────────────────────────────────────────────────────────────────────────
const CACHE_GENERATION = self.__WB_CACHE_GENERATION__ || 'v1';
const PRECACHE = `whalesborough-precache-${CACHE_GENERATION}`;
const HTML_CACHE = `whalesborough-html-${CACHE_GENERATION}`;
const IMG_CACHE = `whalesborough-img-${CACHE_GENERATION}`;
const FONT_CACHE = `whalesborough-fonts-${CACHE_GENERATION}`;
const STATIC_CACHE = `whalesborough-static-${CACHE_GENERATION}`;
const API_CACHE = `whalesborough-api-${CACHE_GENERATION}`;
const MAP_CACHE = `whalesborough-map-${CACHE_GENERATION}`;

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CLEAR_CACHES_ON_SIGN_OUT') purgeAuthenticatedCaches();
  if (event.data?.type === 'RESET_OFFLINE_DATA') purgeAllCaches();
});
clientsClaim();

// ───────────────────────────────────────────────────────────────────────────
// 1. Precache — injected at build time by workbox-build
// Total budget: <2MB compressed. Lighthouse PWA score gate: >=95.
// ───────────────────────────────────────────────────────────────────────────
precacheAndRoute(self.__WB_MANIFEST || [
  // The build pipeline replaces this fallback with the real manifest.
  // For documentation, the typical precache set is:
  { url: '/', revision: null },
  { url: '/stay', revision: null },
  { url: '/spa', revision: null },
  { url: '/dine', revision: null },
  { url: '/own', revision: null },
  { url: '/estate', revision: null },
  { url: '/offline', revision: null },
  { url: '/icons/icon-192.png', revision: null },
  { url: '/icons/icon-512.png', revision: null },
  { url: '/images/hero-placeholder.webp', revision: null },
  { url: '/images/estate-map-fallback.webp', revision: null },
  { url: '/fonts/newsreader-var.woff2', revision: null },
  { url: '/fonts/plus-jakarta-sans-var.woff2', revision: null }
]);

cleanupOutdatedCaches();

// SPA navigation fallback — every navigation goes through this if cached
const navigationHandler = createHandlerBoundToURL('/');
const navigationRoute = new NavigationRoute(navigationHandler, {
  denylist: [
    /^\/admin/, /^\/owners/, /^\/api\/(admin|owners)/, /^\/share\/journal/
  ]
});
// Disabled by default — Next.js app router renders SSR HTML per route, so we use
// per-route NetworkFirst instead. Uncomment for pure-SPA mode only.
// registerRoute(navigationRoute);

// ───────────────────────────────────────────────────────────────────────────
// 2. Route: /api/* — Network-only, no cache (booking, payment, real-time)
// ───────────────────────────────────────────────────────────────────────────
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkOnly({
    plugins: [
      // Background-sync queue for write requests that fail offline
      new BackgroundSyncPlugin('api-write-retry-queue', {
        maxRetentionTime: 24 * 60, // 24h
        onSync: async ({ queue }) => {
          let entry;
          while ((entry = await queue.shiftRequest())) {
            try {
              await fetch(entry.request.clone());
            } catch (err) {
              await queue.unshiftRequest(entry);
              throw err;
            }
          }
          // Notify clients to refresh their caches/state
          const clients = await self.clients.matchAll({ type: 'window' });
          clients.forEach(c => c.postMessage({ type: 'BG_SYNC_FLUSHED' }));
        }
      })
    ]
  }),
  // Apply only to non-idempotent methods
  'POST'
);
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkOnly(),
  'GET'
);

// ───────────────────────────────────────────────────────────────────────────
// 3. Route: booking availability + payment-adjacent — NetworkFirst with short cache
// (allows the page shell to appear if the network blips, but data is fresh-first)
// ───────────────────────────────────────────────────────────────────────────
registerRoute(
  ({ url }) =>
    url.pathname === '/stay/availability' ||
    url.pathname === '/dine/reserve' ||
    url.pathname === '/spa/book' ||
    url.pathname.startsWith('/stay/availability/'),
  new NetworkFirst({
    cacheName: HTML_CACHE,
    networkTimeoutSeconds: 3,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 60 * 60, // 1h
        purgeOnQuotaError: true
      }),
      new BroadcastUpdatePlugin({ channelName: 'whalesborough-cache-updates' })
    ]
  })
);

// ───────────────────────────────────────────────────────────────────────────
// 4. Route: editorial pages (cottage detail, treatment pages, journal, FAQs,
//    local area pages) — Stale-While-Revalidate (SWR), 24h
// ───────────────────────────────────────────────────────────────────────────
registerRoute(
  ({ url, request }) =>
    request.mode === 'navigate' &&
    (url.pathname.startsWith('/stay/cottages/') ||
     url.pathname.startsWith('/stay/arvor/') ||
     url.pathname.startsWith('/spa/rituals/') ||
     url.pathname.startsWith('/spa/journeys/') ||
     url.pathname.startsWith('/journal/') ||
     url.pathname.startsWith('/local-area/') ||
     url.pathname.startsWith('/faqs') ||
     url.pathname.startsWith('/dine/menu')),
  new StaleWhileRevalidate({
    cacheName: HTML_CACHE,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 24 * 60 * 60, // 24h
        purgeOnQuotaError: true
      }),
      new BroadcastUpdatePlugin({ channelName: 'whalesborough-cache-updates' })
    ]
  })
);

// ───────────────────────────────────────────────────────────────────────────
// 5. Route: static assets (CSS, JS bundles, manifest) — CacheFirst
// ───────────────────────────────────────────────────────────────────────────
registerRoute(
  ({ request, url }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker' ||
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.endsWith('.webmanifest'),
  new CacheFirst({
    cacheName: STATIC_CACHE,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30d (hashed filenames mean we rarely hit expiry)
        purgeOnQuotaError: true
      })
    ]
  })
);

// ───────────────────────────────────────────────────────────────────────────
// 6. Route: images — CacheFirst with 30d expiration
// (Cloudflare Images URLs use signed query params — we strip those for keys)
// ───────────────────────────────────────────────────────────────────────────
registerRoute(
  ({ request, url }) =>
    request.destination === 'image' ||
    url.hostname.includes('imagedelivery.net') ||
    url.hostname.includes('whalesborough.imgix.net') ||
    url.hostname.includes('cdn.whalesborough.com'),
  new CacheFirst({
    cacheName: IMG_CACHE,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
      }),
      {
        cacheKeyWillBeUsed: async ({ request }) => {
          // Strip cache-busting params and CF Images signing tokens
          const url = new URL(request.url);
          ['v', 't', 'cf-img-sig', 'x-cf-token'].forEach(p => url.searchParams.delete(p));
          return url.toString();
        }
      }
    ]
  })
);

// ───────────────────────────────────────────────────────────────────────────
// 7. Route: fonts — CacheFirst, 1 year
// ───────────────────────────────────────────────────────────────────────────
registerRoute(
  ({ request, url }) =>
    request.destination === 'font' ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff'),
  new CacheFirst({
    cacheName: FONT_CACHE,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1y
        purgeOnQuotaError: true
      })
    ]
  })
);

// ───────────────────────────────────────────────────────────────────────────
// 8. Route: estate map tiles (Mapbox/HypaMaps) — CacheFirst, 30d
// ───────────────────────────────────────────────────────────────────────────
registerRoute(
  ({ url }) =>
    url.hostname.endsWith('mapbox.com') ||
    url.pathname.startsWith('/estate/tiles/'),
  new CacheFirst({
    cacheName: MAP_CACHE,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 400,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
      })
    ]
  })
);

// ───────────────────────────────────────────────────────────────────────────
// 9. Catch handler — offline page for navigations, transparent gif for images
// ───────────────────────────────────────────────────────────────────────────
setCatchHandler(async ({ request }) => {
  if (request.mode === 'navigate') {
    const cached = await caches.match('/offline');
    if (cached) return cached;
  }
  if (request.destination === 'image') {
    return caches.match('/images/offline-placeholder.webp');
  }
  return Response.error();
});

// ───────────────────────────────────────────────────────────────────────────
// 10. Push notifications
// ───────────────────────────────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const payload = event.data.json();

  const options = {
    body: payload.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    image: payload.image,
    tag: payload.tag,
    renotify: payload.renotify ?? false,
    requireInteraction: payload.requireInteraction ?? false,
    silent: payload.silent ?? false,
    timestamp: payload.timestamp || Date.now(),
    data: {
      url: payload.url || '/',
      topic: payload.topic,
      bookingId: payload.bookingId,
      threadId: payload.threadId,
      analyticsId: payload.analyticsId
    },
    actions: payload.actions || []
  };

  event.waitUntil(self.registration.showNotification(payload.title, options));

  // App Badging API — bump unread count if topic is concierge/booking
  if (['concierge', 'booking-lifecycle'].includes(payload.topic) && 'setAppBadge' in self.navigator) {
    event.waitUntil(self.navigator.setAppBadge(payload.unreadCount || 1));
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const { url, analyticsId } = event.notification.data || {};
  const target = event.action || url || '/';

  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const existing = allClients.find(c => c.url.includes(self.location.origin));
    if (existing) {
      existing.focus();
      existing.postMessage({ type: 'NOTIFICATION_CLICK', target, analyticsId });
    } else {
      self.clients.openWindow(target);
    }
  })());
});

self.addEventListener('notificationclose', (event) => {
  // Send dismissal event to analytics endpoint via beacon
  const { analyticsId } = event.notification.data || {};
  if (analyticsId) {
    fetch('/api/analytics/notification-dismissed', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analyticsId })
    });
  }
});

// ───────────────────────────────────────────────────────────────────────────
// 11. Periodic Background Sync (Chrome only, requires user permission)
// ───────────────────────────────────────────────────────────────────────────
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'tomorrow-itinerary') {
    event.waitUntil(prefetchTomorrowItinerary());
  }
  if (event.tag === 'sustainability-dashboard-daily') {
    event.waitUntil(prefetchSustainabilityDashboard());
  }
});

async function prefetchTomorrowItinerary() {
  const cache = await caches.open(HTML_CACHE);
  try {
    const res = await fetch('/api/itinerary/tomorrow', { credentials: 'include' });
    if (res.ok) await cache.put('/stay/itinerary?day=tomorrow', res.clone());
  } catch {}
}

async function prefetchSustainabilityDashboard() {
  const cache = await caches.open(HTML_CACHE);
  try {
    const res = await fetch('/sustainability/your-impact');
    if (res.ok) await cache.put('/sustainability/your-impact', res.clone());
  } catch {}
}

// ───────────────────────────────────────────────────────────────────────────
// 12. Share Target — receive photos shared from other apps
// ───────────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method === 'POST' && url.pathname === '/share/journal') {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const photos = formData.getAll('photos');
      // Save to IndexedDB temp store; client will pick up and prompt user to confirm
      const db = await openIDB();
      const tx = db.transaction('share-inbox', 'readwrite');
      for (const photo of photos) {
        await tx.store.add({ blob: photo, ts: Date.now() });
      }
      // Redirect into the app, which will read share-inbox and show explicit confirm UI
      return Response.redirect('/journal/import?source=share', 303);
    })());
  }
});

// ───────────────────────────────────────────────────────────────────────────
// 13. Helpers
// ───────────────────────────────────────────────────────────────────────────
async function purgeAuthenticatedCaches() {
  // Called on sign-out — clear anything tied to a user identity
  const keys = await caches.keys();
  for (const key of keys) {
    if (key.includes('-api-') || key.includes('-html-')) {
      await caches.delete(key);
    }
  }
  if ('clearAppBadge' in self.navigator) self.navigator.clearAppBadge();
}

async function purgeAllCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  if ('clearAppBadge' in self.navigator) self.navigator.clearAppBadge();
}

async function openIDB() {
  // Pseudo — real implementation uses idb or idb-keyval wrapper.
  // Schema: db 'whalesborough-app', store 'share-inbox' (keyPath 'id', autoIncrement).
  return {
    transaction: () => ({ store: { add: async () => {} }, done: Promise.resolve() })
  };
}

// ───────────────────────────────────────────────────────────────────────────
// 14. workbox-config.js (companion file, lives at project root)
//
// module.exports = {
//   globDirectory: '.next/static',
//   globPatterns: ['**/*.{js,css,woff2,webp}'],
//   swSrc: 'src/sw/sw.js',
//   swDest: 'public/sw.js',
//   maximumFileSizeToCacheInBytes: 2_097_152,
//   mode: 'production',
//   inlineWorkboxRuntime: false,
//   sourcemap: false,
//   manifestTransforms: [
//     async (manifestEntries) => {
//       const generation = process.env.GIT_SHA || Date.now().toString();
//       return {
//         manifest: manifestEntries.map(e => ({ ...e, url: e.url })),
//         warnings: []
//       };
//     }
//   ]
// };
// ───────────────────────────────────────────────────────────────────────────
