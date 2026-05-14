# Whalesborough Farm Resort & Spa — PWA & Service Worker Specification

**Project:** £500k booking app + guest portal — Progressive Web App layer
**Status:** Engineer-ready, v1.0
**Date:** 14 May 2026
**Owner:** Peake Management
**Audience:** Front-end / platform engineers, ops, DPO

---

## 0. Why a PWA (and not a native app)

Whalesborough's audience splits roughly 60% iOS / 40% Android with an older skew (45-64 forming 47% of bookers). Native install friction — three-tap App Store install, 80MB download, two updates per quarter, two app stores to keep parity in — is a known conversion killer for hospitality apps where each guest may install once and use across two stays per year. A high-quality PWA installs in two taps from a custom prompt, opens to the same Coastal Editorial UI as the web, weighs <2MB on first load, and inherits every Lighthouse / WCAG / SEO improvement made to the website itself.

This spec defines the PWA shell, the service worker, push and background-sync infrastructure, install prompt strategy, offline behaviour, and the privacy / opt-out controls the DPO has required. It is intentionally conservative — we are not shipping APIs Safari hasn't implemented (Web Bluetooth, USB) without a clear native fallback. The PWA exists to make the website feel like a discreet, owned digital concierge — not to ape native.

Output deliverables: `manifest.webmanifest` (full, valid), `public/sw.js` (Workbox-driven; provided), notification payload schemas, push topic catalogue. Lighthouse PWA score gate: ≥95.

---

## 1. Web App Manifest (`manifest.webmanifest`)

The manifest is the contract between the website and the OS. The full file is delivered as a companion artefact; this section explains the choices.

| Field | Value | Rationale |
|---|---|---|
| `name` | "Whalesborough Farm Resort & Spa" | Full brand on install dialogue + app store-style prompts |
| `short_name` | "Whalesborough" | Home-screen label; ≤12 chars renders cleanly on iOS/Android |
| `description` | "Cornwall's 5-star coastal retreat — book lodges, spa, dining and estate experiences." | 84 chars; OG-compatible |
| `id` | `/?source=pwa` | Stable identifier across origin/start_url variants — prevents Chrome creating duplicate app records |
| `start_url` | `/?source=pwa` | The `source` query param distinguishes PWA opens in Plausible analytics |
| `scope` | `/` | Whole-site PWA; admin/owner routes excluded by SW route guards |
| `display` | `standalone` | Removes browser chrome; falls back gracefully via `display_override` |
| `display_override` | `["window-controls-overlay","standalone","minimal-ui","browser"]` | Desktop WCO support for premium look on Windows/macOS |
| `orientation` | `portrait-primary` | Mobile-first, locked; tablet/desktop unaffected |
| `theme_color` | `#4a6457` (sage) | Status bar + window title chrome — Coastal Editorial secondary |
| `background_color` | `#fbf9f6` (warm white) | iOS/Android splash colour while resources load |
| `lang` / `dir` | `en-GB`, `ltr` | British English locale |
| `categories` | `["travel","lifestyle","shopping"]` | App-store discovery (Microsoft Store, Samsung Galaxy Store via PWABuilder) |
| `iarc_rating_id` | Generated | Required for some app stores; obtain at IARC |
| `handle_links` | `preferred` | Captures whalesborough.com links opened anywhere into the installed PWA |
| `launch_handler.client_mode` | `["navigate-existing","auto"]` | Existing instance focuses + navigates rather than spawning a new window |
| `edge_side_panel.preferred_width` | 480 | Microsoft Edge side-panel-as-app mode |
| `scope_extensions` | `book.whalesborough.com`, `owners.whalesborough.com` | Cross-subdomain link handling (verified via `web-app-origin-association`) |

### Icon set (full coverage)

| Size | Purpose | Reason |
|---|---|---|
| 16×16, 32×32 | Favicon (any) | Browser tabs |
| 180×180 | `any` | iOS home-screen, Apple Touch baseline |
| 192×192 | `any` | Android home-screen, fallback |
| 192×192 | `maskable` | Android adaptive icons with safe zone |
| 512×512 | `any` | Splash, Android app drawer |
| 512×512 | `maskable` | Adaptive icon high-res |
| 1024×1024 | `any` | iOS splash composition, future-proof |
| 512×512 | `monochrome` | Themed icons (Android 13+, iOS 18 tinted) |

All maskable icons reserve a 20% safe zone around the W mark per Material You guidance. Files are PNG (lossless); the rendered look in dark mode is verified manually on iPhone 15+ tinted icons and Pixel 8.

### Screenshots (install prompt enrichment)

Eight screenshots: three `wide` (1920×1080, desktop install) and five `narrow` (1080×1920, mobile). Each is a real product screenshot — never a marketing render — captured against the Coastal Editorial palette and labelled with a Newsreader-italic caption.

### Shortcuts (home-screen long-press)

Four shortcuts, each with its own 192×192 icon and a `source=shortcut` query param for funnel attribution:

1. **Check availability** → `/stay/availability`
2. **Book a spa treatment** → `/spa/book`
3. **Reserve a table** → `/dine/reserve`
4. **Estate map** → `/estate/map`

Shortcuts intentionally omit Aurelia (the AI concierge) — Aurelia is a within-app context, not a destination, and adding her here would cheapen the editorial register.

### Share Target API

Configured to receive shared photos and text from any other app:

```json
"share_target": {
  "action": "/share/journal",
  "method": "POST",
  "enctype": "multipart/form-data",
  "params": {
    "title": "title",
    "text": "note",
    "url": "url",
    "files": [{ "name": "photos", "accept": ["image/jpeg","image/png","image/webp","image/heic","image/heif"] }]
  }
}
```

The handler at `/share/journal` writes received files into an IndexedDB `share-inbox` and redirects the user to `/journal/import?source=share`, where an **explicit user confirm UI** ("Add these 3 photos to your Whalesborough journal?") is shown before any upload to server. This addresses the prompt-injection / accidental-upload risk inherent in share targets.

### Protocol handler

`web+whalesborough://` is registered for marketing email deep-links (e.g. `web+whalesborough://booking/abc123/preheat`), routed via `/deep-link?ref=%s` — keeps URLs short in SMS and gives the marketing team a clean handle.

### File handlers

JPEG / PNG / HEIC opened from the OS file explorer trigger the same `/share/journal` flow — useful when a guest taps a photo in the iOS Files app and chooses "Open with Whalesborough".

---

## 2. Service Worker — Architecture

The service worker is **Workbox 7.x** generated, with a custom `sw.js` source kept under source control and bundled by `workbox-build`. We avoid the `injectManifest` / `generateSW` confusion: we use `injectManifest`. Source: `src/sw/sw.js`; output: `public/sw.js`. The full worker is delivered as a companion file alongside this spec.

### 2.1 Scope and security boundary

The SW is registered at `/` with full scope. Two zones are explicitly excluded:

- **`/admin/*`** — staff and back-office tooling. Edge returns `Cache-Control: no-store` and the SW route guards add these to a `denylist` array. Sign-in to admin from the same browser cannot end up serving cached content from a previous user.
- **`/owners/*`** — lodge owner portal. Same posture: financial PII, no caching.
- **`/api/admin/*` and `/api/owners/*`** — same.

Edge config (Vercel) enforces this independently:

```toml
[[headers]]
  for = "/admin/*"
  [headers.values]
    Cache-Control = "private, no-store, no-cache, must-revalidate"
    Pragma = "no-cache"
```

If the SW were ever compromised, the admin/owner zones cannot be tampered with via SW because the SW never sees those responses.

### 2.2 Cache namespace strategy

Six caches, each suffixed with `CACHE_GENERATION` (the build's git SHA). On activation, all caches not matching the current generation are deleted by `cleanupOutdatedCaches`.

| Cache | TTL | Strategy | Max entries |
|---|---|---|---|
| `whalesborough-precache-<gen>` | Generation lifetime | Precache | ~120 |
| `whalesborough-html-<gen>` | 24h SWR / 1h NF | SWR / NetworkFirst | 60 |
| `whalesborough-img-<gen>` | 30d | CacheFirst | 200 |
| `whalesborough-fonts-<gen>` | 1y | CacheFirst | 20 |
| `whalesborough-static-<gen>` | 30d (hashed files) | CacheFirst | 80 |
| `whalesborough-map-<gen>` | 30d | CacheFirst | 400 (Mapbox tiles) |
| `whalesborough-api-<gen>` | n/a | NetworkOnly | n/a |

### 2.3 Per-route caching matrix

| Route pattern | Strategy | Notes |
|---|---|---|
| `/api/*` | NetworkOnly | Bookings, payments, real-time data. Write requests go through a Background Sync queue. |
| `/stay/availability`, `/stay/availability/*`, `/dine/reserve`, `/spa/book` | NetworkFirst (3s timeout) → cache | Shell appears if the network is dragging; data prompt re-fetch on regain. 1h max age. |
| `/stay/cottages/*`, `/stay/arvor/*`, `/spa/rituals/*`, `/spa/journeys/*`, `/journal/*`, `/local-area/*`, `/faqs`, `/dine/menu` | StaleWhileRevalidate | Editorial pages — instant load, background refresh. 24h max age. |
| `/_next/static/*`, `/*.{js,css,webmanifest}` | CacheFirst | Hashed filenames; safe to keep for 30d. |
| `/fonts/*.woff2`, any `request.destination === 'font'` | CacheFirst | 1 year. Newsreader + Plus Jakarta. |
| `request.destination === 'image'`, `imagedelivery.net`, `cdn.whalesborough.com` | CacheFirst | 30d. Cache-key strips `v`, `t`, `cf-img-sig` query params for hit-rate. |
| `mapbox.com/*`, `/estate/tiles/*` | CacheFirst | 30d. 400 entries supports full estate map walkthrough offline. |
| Navigations that 404/500 | Fallback to `/offline` | Branded offline page (see §3). |

### 2.4 Precache budget

The precache manifest is generated at build time by `workbox-build`. The target is **<2MB compressed total** — the threshold beyond which SW install becomes user-perceptible on a 4G connection. Items in the precache set:

- HTML shells for `/`, `/stay`, `/spa`, `/dine`, `/own`, `/estate`, `/offline`
- Critical CSS and JS bundles (hashed filenames)
- Two brand fonts (Newsreader variable, Plus Jakarta Sans variable — `woff2`, subsetted to Latin-1 + extended Latin only)
- Logo, hero placeholder, estate-map static fallback, offline placeholder image
- App icons used by the manifest

Anything beyond this is runtime-cached. **Recently viewed cottages** are cached lazily via the SWR rule (LRU enforced by `maxEntries: 60`). **Active booking confirmations** for authenticated users are cached via IndexedDB by the app shell, not by the SW — booking data is identity-scoped and managed by application code, not the cache layer.

### 2.5 Performance budgets

| Metric | Budget |
|---|---|
| Service worker `install` event total | <500ms (cold) |
| Precache compressed total | <2MB |
| Workbox runtime bundle (production) | <30KB minified+gzipped |
| First-paint after SW activation | Should not regress vs no-SW baseline by more than 50ms |

These are enforced in CI via `lighthouse-ci` budgets and a custom `workbox-size.js` script that fails the build if `public/sw.js` exceeds 30KB.

---

## 3. Offline Experience

The offline page is **not** a generic "you are offline" plate. It is a fully-branded `/offline` route, precached, that renders:

1. A short Newsreader-italic line — *"The estate is here when you are."* — in sage on warm white.
2. The guest's **last-known active booking** (read from IndexedDB), including arrival date, cottage name, gate code, and a static cached map of the estate. Encrypted at rest via the Web Crypto API; key derived from sign-in session; cleared on sign-out.
3. A **static estate map** (cached `/estate/map-fallback.webp`) — non-interactive, but oriented and labelled.
4. A list of **downloaded itinerary items** if the guest has saved any.
5. A clear, non-alarming banner: *"You're offline. Booking and payment are paused until you're back."*
6. The booking flow and all "buy" CTAs are disabled (visually de-emphasised, `aria-disabled="true"`, click handled to show "Reconnect to book"). Aurelia is hidden — chat with no backend is worse than no chat.

Background sync is used for:

- **Booking submission retry** — POST to `/api/bookings` that fails because of network drop is queued via Workbox's `BackgroundSyncPlugin`, retried within 24h.
- **Review submissions** — same queue, post-stay reviews.
- **Profile updates** — preferences toggled offline are queued.
- **Concierge messages drafted offline** — Aurelia chat messages composed offline (typing area is allowed even when chat is hidden — a single hidden draft box).

On successful sync, the SW broadcasts `BG_SYNC_FLUSHED` to all clients; the app refreshes affected state and shows a single discreet toast: *"Sent."*

---

## 4. Push Notifications

### 4.1 Permission prompt timing

**No first-visit prompt.** Browser default permission dialogues kill trust. We prompt only when:

- The guest has completed their first booking (success page invites "Stay close — pre-arrival and gate-code updates"). This is the highest-intent moment.
- OR the guest explicitly taps a "Get notified" surface (e.g. "Spa walk-in alerts").
- AND the device platform allows it (iOS 16.4+ Safari has its own consent ladder — see §4.5).

If the guest dismisses the prompt, we wait **14 days** before re-prompting, and only on a topic-specific surface (not at random). After two dismissals, we never auto-prompt again.

### 4.2 Subscription storage

Subscriptions stored server-side in the `push_subscriptions` table:

```sql
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  expiration_time TIMESTAMPTZ,
  platform TEXT,          -- 'ios','android','desktop'
  user_agent TEXT,
  topic_consents JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_push_subscriptions_user ON push_subscriptions(user_id);
```

`topic_consents` is per-topic boolean: `{ "booking_lifecycle": true, "spa_walkin": false, "marketing": false }`. The DPO-approved default after first booking is **booking_lifecycle only**.

### 4.3 VAPID

VAPID key pair generated once, stored as `VAPID_PUBLIC_KEY` (client) and `VAPID_PRIVATE_KEY` (server). Subject is `mailto:notifications@whalesborough.com`. Web Push messages use the `aes128gcm` content-encoding.

### 4.4 Push topics

| Topic | Default consent | Description | Example tag |
|---|---|---|---|
| `booking_lifecycle` | On after first booking | Confirmation, pre-arrival (T-48h), gate code (T-3h), check-in ready, departure reminder | `bk-<id>-<stage>` |
| `concierge_message` | On after first booking | Reply from Aurelia handoff / human concierge | `cc-<thread>` |
| `spa_walkin` | Opt-in only (members) | Same-day availability when a slot opens | `spa-walkin-<date>` |
| `restaurant_waitlist` | Opt-in only | "Your table at The Weir is ready" | `wait-<id>` |
| `instay_message` | On while checked-in | Housekeeping, in-stay offers, weather alerts | `is-<id>` |
| `marketing` | Off by default; opt-in only | Newsletter, member events, voucher promotions | `mkt-<campaign>` |

### 4.5 iOS Safari (Apple Web Push)

iOS 16.4+ supports Web Push for installed PWAs **only**. The notification ladder is:

1. Guest installs the PWA via the iOS "Add to Home Screen" flow (instructions in §5.4).
2. On first launch from the home-screen icon, the in-app **soft** notification primer is shown.
3. Only if the guest taps "Yes, keep me updated" do we call `Notification.requestPermission()`.
4. APNs is not directly involved — Safari relays through Apple's push service using the same VAPID-signed Web Push request. No separate APNs config needed for v1.
5. For richer iOS engagement in V2 (rich attachment, sounds beyond default), evaluate a wrapped native shell (Capacitor) for iOS only — keeps the PWA elsewhere intact.

### 4.6 Payload examples

Server-side payloads are kept under 4KB. Examples:

**Booking lifecycle — T-3h gate code:**
```json
{
  "title": "Trelowen 4 is ready for you.",
  "body": "Your gate code activates at 4pm. We've sent the digital key to your phone.",
  "url": "/stay/bookings/bk_8x32k/check-in",
  "tag": "bk-bk_8x32k-gate",
  "topic": "booking_lifecycle",
  "bookingId": "bk_8x32k",
  "image": "/notif-images/lodge-arrival.webp",
  "actions": [
    { "action": "open-key", "title": "Add key" },
    { "action": "directions", "title": "Directions" }
  ],
  "analyticsId": "n_4839af",
  "renotify": false,
  "unreadCount": 1
}
```

**Spa walk-in:**
```json
{
  "title": "A slot has opened.",
  "body": "Restoration Ritual — 90 min, today at 3pm. £140 / member £112.",
  "url": "/spa/book?ritual=restoration&slot=2026-05-14T15:00",
  "tag": "spa-walkin-2026-05-14",
  "topic": "spa_walkin",
  "analyticsId": "n_61b29c",
  "requireInteraction": false
}
```

**Concierge handoff reply:**
```json
{
  "title": "Cara from the front desk replied.",
  "body": "I've held a table for four at 7pm. Tap to confirm.",
  "url": "/concierge/thread/th_92ka",
  "tag": "cc-th_92ka",
  "topic": "concierge_message",
  "threadId": "th_92ka",
  "analyticsId": "n_72eaa8"
}
```

**In-stay message — weather:**
```json
{
  "title": "Sun's out tomorrow.",
  "body": "Low tide at Widemouth is 11:14. Bring boots, leave the brollies.",
  "url": "/estate/today",
  "tag": "is-weather-2026-05-15",
  "topic": "instay_message",
  "analyticsId": "n_99kxl1",
  "silent": true
}
```

Marketing pushes never use exclamation marks, never use `requireInteraction`, never use sounds. The brand voice rules from the AI spec apply equally to push.

### 4.7 App Badging API

When supported, the badge count reflects unread `concierge_message` threads plus new `booking_lifecycle` notifications not yet opened. `navigator.setAppBadge(n)` is called in the `push` handler; `navigator.clearAppBadge()` runs on sign-out and on the `notificationclick` handler when no unread items remain.

---

## 5. Install Prompt Strategy

### 5.1 Custom A2HS (Add to Home Screen)

We intercept `beforeinstallprompt`, stash the event, and surface our own button when our triggers fire:

- After the guest's **third visit** (counted via `localStorage.visits` with a 7-day window) — and only if they have spent >2 min total.
- OR immediately after a **first booking confirmation** — the highest-intent moment.
- OR via an **explicit user action** — a "Install Whalesborough" link in the footer / account menu.

The browser's default `beforeinstallprompt` dialog is **never** shown unprompted.

### 5.2 The prompt itself

A bottom sheet, sage background, two CTAs:

- *"Install Whalesborough"* (cognac, primary) — calls `deferredPrompt.prompt()`.
- *"Maybe later"* (sage outline) — dismisses; sets a 14-day cool-down in `localStorage`.

Above the buttons, a single line in Newsreader italic: *"Faster access to your bookings, the estate map, and your concierge."* No "free" / "instant" / "exclusive". No badges. No countdown.

### 5.3 Deferral

The 14-day cool-down is enforced both client-side (`localStorage.lastInstallPromptDismissedAt`) and via the `appinstalled` event (which suppresses further prompts entirely). If the guest dismisses twice, the prompt is permanently retired for that browser; the footer "Install" link remains for explicit installs.

### 5.4 iOS Safari

iOS Safari doesn't fire `beforeinstallprompt`. For iOS, we detect the platform (`navigator.standalone === false && /iPad|iPhone|iPod/.test(navigator.userAgent)`) and show a small instructions overlay:

> *"To install Whalesborough on your iPhone:*
> *1. Tap the Share icon below.*
> *2. Choose Add to Home Screen.*
> *3. Tap Add."*

Three frame illustrations show the icons (Share, Add to Home Screen, Add) in the iOS UI style. The overlay is dismissable. It does not auto-open — it is triggered by the same custom CTAs as Chrome/Android.

---

## 6. Update Strategy

### 6.1 Skip waiting

The SW calls `self.skipWaiting()` when prompted by the client; the client controls when to apply the new version. On a new SW being installed, the app shell receives a `controllerchange` event:

```ts
navigator.serviceWorker.addEventListener('controllerchange', () => {
  toast({
    text: "A new version is ready.",
    actionLabel: "Refresh",
    onAction: () => window.location.reload()
  });
});
```

The toast follows the editorial register — a single sage strip across the bottom, never red or yellow. If the guest dismisses it, the new version applies on next full reload (closing the tab and reopening).

### 6.2 Mid-booking safety

If the new SW is detected during an active booking flow (`/stay/availability/checkout` or `/spa/book/checkout`), the toast is **suppressed** until the flow completes. This prevents the dreaded "page refreshed mid-payment" disaster.

### 6.3 Cache version bumping

`CACHE_GENERATION` is the build's git SHA, injected via `workbox-build` `manifestTransforms`. Every release bumps every cache namespace. Old caches are cleaned in the `activate` event via `cleanupOutdatedCaches()`.

---

## 7. Background Sync

Two distinct sync mechanisms are used:

### 7.1 Background Sync API (one-shot)

Workbox `BackgroundSyncPlugin` is registered against `POST /api/*` requests. If a request fails because the network is offline, it is queued in IndexedDB. When the device reconnects, the queue replays in order. Queue name: `api-write-retry-queue`. Retention: 24 hours; anything older is dropped.

Applies to:

- Booking submission (most critical — guest taps "Confirm" on the cottage selector with poor reception on the SWCP edge)
- Spa booking submission
- Review submission post-stay
- Profile updates (dietary, dog profile)
- Aurelia chat messages composed offline

On successful flush, clients receive `BG_SYNC_FLUSHED`. The app then re-fetches affected state and shows a single toast: *"Sent."*

### 7.2 Periodic Background Sync (Chrome-only, permission-gated)

For currently-checked-in guests who have granted permission, the SW pre-fetches:

- **Tomorrow's itinerary** (tag: `tomorrow-itinerary`) — runs nightly at the device's discretion, populates `/stay/itinerary?day=tomorrow` cache.
- **Sustainability dashboard** (tag: `sustainability-dashboard-daily`) — daily, populates `/sustainability/your-impact` cache.

Permission is requested only **after first arrival**, with a single soft primer: *"Your morning briefing — ready before you wake."* The browser dialog follows. iOS Safari doesn't support periodic sync; the app falls back to opportunistic refresh on first foreground each day.

---

## 8. Web Share Target

As described in §1, the share target lets guests send photos and text from the iOS / Android share sheet into the app. The flow:

1. Guest selects "Share" → "Whalesborough" in their photo library.
2. The SW receives the POST at `/share/journal`, parses `multipart/form-data`, and writes blobs into IndexedDB (`share-inbox` object store).
3. SW responds with a 303 redirect to `/journal/import?source=share`.
4. The app loads the import page, reads `share-inbox`, and presents an **explicit confirm UI**: "Add these 3 photos to your Whalesborough journal? They will be uploaded to your private gallery."
5. Only on tap of "Add" does upload happen. On "Cancel", the IndexedDB store is cleared.

This pattern explicitly addresses the auto-share / prompt-injection risk: nothing is uploaded without an in-app confirm step, regardless of how the share was initiated.

---

## 9. Splash Screens

### 9.1 Android

Handled automatically by the manifest — `background_color` + `icon-512.png`. No additional work required.

### 9.2 iOS

iOS requires a static `<link rel="apple-touch-startup-image">` per device size. We generate eleven splash images, each warm-white background with the W mark centred (75% safe zone):

| Device | Size | Media query |
|---|---|---|
| iPhone SE / 6/7/8 | 750×1334 | `(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)` |
| iPhone 6+/7+/8+ | 1242×2208 | `(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)` |
| iPhone X/XS/11 Pro | 1125×2436 | `(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)` |
| iPhone XR/11 | 828×1792 | `(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)` |
| iPhone XS Max/11 Pro Max | 1242×2688 | `(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)` |
| iPhone 12/13/14 / mini | 1170×2532 / 1080×2340 | per-device queries |
| iPhone 14 Pro / 15 Pro | 1179×2556 | dynamic island aware |
| iPhone 15 Pro Max | 1290×2796 | per-device |
| iPad mini | 1488×2266 | per-device |
| iPad Pro 11 | 1668×2388 | per-device |
| iPad Pro 12.9 | 2048×2732 | per-device |

The generation is automated via `pwa-asset-generator` against `1024×1024` source artwork.

---

## 10. Lighthouse PWA Audit Gate

Every PR builds a Lighthouse-CI preview. The PWA category must score ≥95 before merge. Targets within the audit:

| Audit | Target |
|---|---|
| Installable manifest | Pass |
| Service worker registers | Pass |
| Splash screen | Pass |
| Themed address bar | Pass |
| Content sized correctly for viewport | Pass |
| Apple touch icon | Pass |
| Maskable icon | Pass |
| Offline page | Pass |
| Site works cross-browser | Pass |
| Page transitions don't feel like they block on the network | Pass |

Failures block merge. Score drops below 95 are treated as P1 regressions and the responsible commit reverts.

---

## 11. DevTools / Debugging

Reproducible dev experience:

- **Chrome:** Application → Service Workers → "Update on reload" enabled during dev. Application → Storage → "Clear site data" before each verification run.
- **Local SW disable:** `?sw=off` query param skips registration; useful for measuring no-SW baseline performance.
- **Workbox debug mode:** `self.__WB_DISABLE_DEV_LOGS = false` in dev builds — verbose console logging of every cache hit/miss/fetch.
- **Programmatic unregister:** `/account/data` has a "Reset offline data" button (see §13) that calls `registration.unregister()` + purges all caches via `CLEAR_CACHES_ON_SIGN_OUT` message.
- **Mock push:** Chrome DevTools → Application → Push messaging → enter JSON payload. We maintain a `/scripts/mock-push.ts` that emits the same payload via the production push service against a dev-tagged subscription.
- **Periodic sync trigger:** `chrome://serviceworker-internals` → "Inspect" → manually trigger `periodicsync` event.
- **Workbox bundle inspection:** `npm run analyze:sw` outputs the SW bundle's source-map-explorer view.

A team Notion page (`/eng/pwa-debug-cookbook`) holds recipes for each common scenario (push not arriving, cache hit unexpected, manifest not detected, etc.).

---

## 12. Privacy and Compliance

### 12.1 DNT respect

The SW honours `navigator.doNotTrack === '1'` only for the analytics-related precache items (we don't pre-fetch analytics scripts for DNT-on users). Core functionality is unaffected. This is consistent with the DUAA 2025 stance and the project's privacy-first analytics choice (Plausible/Matomo).

### 12.2 Cache invalidation on sign-out

`/api/auth/sign-out` returns 204 and the client posts `{ type: 'CLEAR_CACHES_ON_SIGN_OUT' }` to the SW. The SW deletes:

- `whalesborough-api-<gen>`
- `whalesborough-html-<gen>`
- IndexedDB stores: `bookings`, `concierge-threads`, `journal-drafts`, `share-inbox`
- App Badge cleared via `navigator.clearAppBadge()`

The precache, static, fonts, images, and map caches are retained — they hold no user-identifiable data.

### 12.3 "Reset offline data" control

`/account/data` includes a single sage button: *"Reset offline data."* Tapping triggers:

1. Confirm dialogue: *"This will clear cached pages, images, and offline drafts. You'll need to be online to use the app until things are re-cached. Continue?"*
2. On confirm, `RESET_OFFLINE_DATA` message → SW purges every cache → unregisters → reloads.

This is the user's "I want a clean slate" lever, mandatory under DUAA's data control provisions.

### 12.4 No third-party SW data flow

The SW does not communicate with third-party origins outside the app's own domain (Mapbox tiles excepted, public CDN). No analytics, no marketing tags inside the SW. The SW is a pure delivery and offline layer — nothing more.

### 12.5 DPIA

The SW's processing footprint is documented in the project DPIA, specifically: precache, runtime cache, push subscription endpoints, background sync queue, IndexedDB share-inbox. Retention windows are: precache (release lifetime), runtime cache (per policy in §2.2), background sync queue (24h max), IndexedDB stores (cleared on sign-out).

---

## 13. Workbox Modules Used

Final dependency list:

- `workbox-precaching` — precache + activate cleanup
- `workbox-routing` — `registerRoute`, `setCatchHandler`, `setDefaultHandler`, `NavigationRoute`
- `workbox-strategies` — `NetworkFirst`, `NetworkOnly`, `StaleWhileRevalidate`, `CacheFirst`
- `workbox-cacheable-response` — limit caching to `[0, 200]` status codes
- `workbox-expiration` — per-cache `maxEntries` + `maxAgeSeconds` + `purgeOnQuotaError: true`
- `workbox-background-sync` — `BackgroundSyncPlugin` + low-level `Queue` for custom retries
- `workbox-broadcast-update` — notifies open clients when SWR revalidation brings fresher content
- `workbox-core` — `clientsClaim`, `skipWaiting`, log-level config

Total compressed runtime: ~22KB (within the <30KB budget).

`workbox-window` is included client-side for the registration handshake, update toast, and `messageSW` plumbing.

---

## 14. Companion Files Delivered

This spec is accompanied by two engineer-ready artefacts in the same directory:

1. **`manifest.webmanifest`** — fully populated, valid against the W3C Web App Manifest spec, ready to drop into `public/` and linked from `<head>`.
2. **`sw.js`** — Workbox-driven service worker source, with inline comments mapping each block to the relevant spec section.

A third artefact lives at the project root once the engineering team adopts the spec: `workbox-config.js` (Workbox CLI config for `injectManifest`).

---

## 15. Acceptance Criteria

The PWA is considered complete when **all** of the following are demonstrably true:

- Lighthouse PWA score ≥95 on every release build.
- Site installs from Chrome on Android (one-tap, custom prompt), Safari on iOS (instructions overlay verified on iPhone 13 Pro Max and iPhone SE 3rd gen), Edge on Windows 11 (with WCO chrome).
- All five push topics deliver to a subscribed device within 10 seconds of server-side `sendPush()` call. Apple Web Push verified on iOS 17.4+.
- Offline page renders the guest's active booking and the static estate map, with all CTAs disabled.
- Background sync correctly queues and replays a `POST /api/bookings` that hits an offline cliff.
- Periodic sync correctly pre-fetches tomorrow's itinerary (Chrome only).
- Share target receives a photo from iOS Photos and the import flow shows the explicit confirm UI.
- Sign-out clears `whalesborough-api-<gen>`, `whalesborough-html-<gen>`, and IndexedDB user stores, verified in DevTools.
- "Reset offline data" button at `/account/data` purges every cache and reloads.
- Admin/owner subpaths return `Cache-Control: no-store` at edge and never appear in any cache key when inspected.
- All cache keys carry the build's git SHA suffix.
- Each manifest icon is verified on a real device (sample: iPhone 15 Pro, Pixel 8, Galaxy S23, iPad Air, Surface Pro 9).
- Workbox bundle ≤30KB gzipped. Precache total ≤2MB.

---

## 16. Open Questions for Client Sign-Off

1. **Apple Wallet pass** for the digital key (separate from the PWA) — within scope of the V1.5 release of the Digital Key feature; out of scope of this PWA spec.
2. **Analytics within the SW** — Plausible/Matomo currently page-side only. If we want SW-initiated analytics for push delivery / open / dismiss, this requires a separate DPIA section. Recommended: yes, opt-in, lightweight, no PII.
3. **PWABuilder / Microsoft Store submission** — opportunity, not requirement. Trivial once the manifest is valid; surfaces the resort in the Windows Store and Samsung Galaxy Store. Cost ~£99 one-off (Microsoft developer programme); no ongoing cost.
4. **Capacitor wrapper for iOS richer notifications in V2** — to be evaluated once iOS install rate is known. Adds maintenance overhead; only do if engagement metrics justify.
5. **Resort Wi-Fi captive portal interaction** — captive portals can interfere with the SW on first connection. We recommend the on-site Wi-Fi router is configured to allow `whalesborough.com`, `cdn.whalesborough.com`, `imagedelivery.net`, and `mapbox.com` pre-login. Confirm with the network engineer.

---

*Specification prepared by Peake Management, 14 May 2026. Engineering ownership transfers on sign-off. All caching and push behaviours are governed by the Whalesborough UK Compliance Brief (UK GDPR, DPA 2018, PECR, DUAA 2025) — any future changes require DPO review.*
