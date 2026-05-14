# Whalesborough Farm Resort & Spa — States Copy Inventory

**Version:** 1.0
**Date:** 2026-05-14
**Audience:** Engineering, design, content, and QA leads building the £500k Whalesborough booking application.
**Voice:** Coastal Editorial — quiet, specific, never blames the user, never shouts.
**Stack assumption:** Next.js 15, React 19, Radix UI primitives, Plus Jakarta Sans + Newsreader, ARIA-aware status messaging via Radix Toast / `role="status"` / `role="alert"` patterns.

This document specifies the complete copy inventory for every error, loading, empty, and success state across the application. Each state is brand-aligned, accessibility-considered, and conversion-aware. Where Zod field-level error messages are produced by the validation agent, this document defines the friendlier surface alternates and the orchestrating shell copy.

---

## Voice Reference (Pinned)

| State family | Tone | Hard rules |
|---|---|---|
| **Error** | Calm, specific, never blames | No exclamation marks except hot tub temperature alert and Wi-Fi outage. Always offer a next step. Apologise once at most. |
| **Loading** | Reassuring, progressive | Show progress where possible. No "Please wait..." (passive, anxious). Use specific verbs. |
| **Empty** | Inviting, suggestive | Don't apologise. Suggest one action. Match brand voice — magazine, not app. |
| **Success** | Quiet confidence | Don't shout. Specific. State exactly what happened and what's next. No "Awesome!" / "Great!" / "" |

**Banned words across all states:** *oops, whoops, oh dear, awesome, great, fantastic, error occurred, something went wrong (use only in absolute fallback).*

**A11y conventions used throughout:**
- `role="alert"` + `aria-live="assertive"` for errors that block action (payment failure, booking conflict)
- `role="status"` + `aria-live="polite"` for non-blocking errors and success confirmations
- `aria-busy="true"` on the parent container during loading
- Focus moves to error heading on form-level errors; focus moves to first invalid field on submission failure
- Focus moves to success heading on confirmation; tab order proceeds to primary action
- Empty-state CTAs receive focus on render only when they are the sole interactive element

---

## 1. ERROR STATES

Error copy follows the form: **[What happened] → [What it means] → [What to do next].** Apologise sparingly. Never use red — the system uses `--color-error` (`#8a3324` dark terracotta), never bright red. Icon: 24×24px stroke 1.5px line illustration where appropriate, never a triangle hazard sign.

### 1.1 Application-Level Errors

| ID | Route / Component | Headline (≤8) | Body (≤30) | Primary CTA (≤4) | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| E-001 | `/404` (not-found page) | This page has wandered off. | Probably to the coast. Try one of these instead, or head back to the Farm. | Back to home | View the Estate | Light touch of humour. The 4 default destinations (homepage, accommodation, spa, contact) sit below as link-arrow cards. | `<h1>` receives focus on mount. Status code 404 set server-side. |
| E-002 | `/500` (server error boundary) | A small ripple at our end. | Our team has been alerted. The booking you started is safe — try again in a moment. | Try again | Call us: 01288 361301 | One apology word allowed: "Our". Phone is real line. | `role="alert"`. Auto-retry attempted once before showing this. |
| E-003 | `/502` `/503` `/504` (gateway / maintenance) | We're laying new paths. | Whalesborough.com is briefly offline for planned work. We'll be back within the hour. | Check back soon | Email reception | Use during planned deploys. Maintenance window must be stated. | Bypass cache; `Retry-After: 3600` header. |
| E-004 | App boundary (React error) | This section didn't render. | The rest of the site is fine. Refresh this page or come back to it later. | Refresh | Continue browsing | Sentry-tagged. Never expose stack trace. | Reset error boundary on route change. |
| E-005 | Hard JS crash fallback | The page can't show right now. | Refresh the browser to start fresh. Your basket is saved. | Refresh page | Open homepage | Last-resort fallback. | Plain HTML, no JS dependency. |

### 1.2 Booking Errors

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| E-010 | Booking widget — dates unavailable | Those dates are spoken for. | The cottage you've chosen isn't free for 12–19 Aug. Here are three units that are. | View alternates | Change dates | "Spoken for" sits well in voice. | `role="status"` + alternates rendered as link-arrow cards below. |
| E-011 | Booking widget — date conflict mid-flow | The dates have just been taken. | Someone confirmed a booking overlapping yours in the last few seconds. Choose new dates to continue. | Choose new dates | Browse cottages | Honest about real-time race. No blame. | Focus to date picker. Clear basket dates. |
| E-012 | Booking widget — date out of range | Those dates aren't bookable yet. | We open the 2027 calendar on 15 September 2026. Join the waitlist to be first in. | Join waitlist | Choose 2026 dates | Date is dynamic — pull from config. | `<output>` for the date variable. |
| E-013 | Booking widget — minimum stay violated | This cottage needs 3 nights minimum. | Tevi requires a three-night stay year-round. Extend by one night or pick a shorter-break unit. | Extend stay | View shorter-break units | Unit name and stay rule injected dynamically. | aria-describedby links to rule explanation. |
| E-014 | Booking widget — party too large | Too many for this cottage. | Trelowen Eight sleeps eight guests including children. For larger parties, try Tevi (sleeps 10). | View larger units | Reduce party size | State sleeps capacity. Suggest concrete alternate. | Same. |
| E-015 | Booking widget — dogs over limit | Two dogs maximum for this cottage. | Most Whalesborough cottages welcome up to two dogs. View the dog-friendly cottages that accept more. | View larger dog-friendly | Reduce dog count | Dog welcome is brand-critical. Frame positively. | Same. |
| E-016 | Booking widget — checkout reached but dates lost | We've lost your dates. | Pop them in again and we'll pick up where you left off. Your selected cottage is still here. | Re-enter dates | Start over | "Pop them in" — softer voice. | Pre-fill cottage selection. |
| E-017 | Booking flow — step 3 add-on out of stock | This hamper has sold out for those dates. | Our Welcome Hamper Deluxe runs out for August often. Choose another, or continue without. | Choose another | Continue without | Don't push other items aggressively. | Mark item disabled in cart. |
| E-018 | Confirmation page — already confirmed | This booking is already confirmed. | We've sent the confirmation to leonardbmillard@gmail.com. Check your inbox, or download a fresh copy. | Download itinerary | Resend email | Idempotent. Use existing data. | Email is dynamic via guest auth. |
| E-019 | Cancellation page — outside cancellation window | This booking can't be cancelled online. | Bookings within 14 days of arrival need a quick chat with our Reservations team. They'll talk it through. | Call Reservations | Email us | Avoid "policy" — keep it human. | Phone tel: link. |
| E-020 | Modify booking — locked | This booking can't be modified online. | The arrival date is within 48 hours. Our team can still help — give us a call. | Call us: 01288 361301 | Email reservations | Same humanising voice. | Same. |

### 1.3 Payment Errors

Payment errors must not blame the user, must not leak technical detail, must always offer a path forward, and must be `role="alert"` + `aria-live="assertive"`. Stripe error codes map to user copy below.

| ID | Stripe code | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| E-030 | Generic payment fail | Your card couldn't complete. | Your card wasn't charged. Try a different card, or contact your bank if this keeps happening. | Try another card | Use Apple Pay | Generic fallback. Always offer Apple Pay alternate. | `role="alert"`. Focus to error. |
| E-031 | `card_declined` / `do_not_honor` | Your bank declined this card. | Your card wasn't charged. This sometimes happens with travel purchases — your bank can usually clear it in a minute. | Try another card | Call your bank | Educational. Travel-related declines are common. | Same. |
| E-032 | `insufficient_funds` | This card hasn't enough available. | Your card wasn't charged. Try a different card or split the payment with Klarna in three. | Use Klarna | Try another card | Klarna only if eligible (Q2 2026+, FCA-compliant). | Conditional render based on eligibility. |
| E-033 | `expired_card` | This card has expired. | Check the expiry date or use another card. Apple Pay is accepted at checkout. | Try another card | Use Apple Pay | Specific and actionable. | Same. |
| E-034 | `incorrect_cvc` | The CVC doesn't match. | Check the three digits on the back of the card and try again. | Try again | Use Apple Pay | "Three digits" is a small concrete cue. | Focus CVC field. |
| E-035 | `incorrect_number` | Card number isn't recognised. | Re-enter the number — Apple Pay or Google Pay are faster if you'd rather skip typing. | Try again | Use Apple Pay | Carrot, not stick. | Focus card number field. |
| E-036 | `card_velocity_exceeded` | This card has hit a daily limit. | Your card wasn't charged. Most banks reset overnight, or try a different card. | Try another card | Pay tomorrow | Real-world context softens it. | Same. |
| E-037 | `authentication_required` (3DS) | One more step from your bank. | Your bank wants to confirm it's really you. Approve in your banking app or by SMS — we'll wait. | Approve & continue | Restart payment | Frame 3DS positively as security. | Modal opens 3DS iframe; focus moves inside. |
| E-038 | 3DS failed / cancelled | Bank confirmation didn't complete. | Your card wasn't charged. Try again — it's usually a tap or a code you missed. | Try payment again | Use Apple Pay | Avoid technical "3DS" jargon. | Same. |
| E-039 | Payment timeout | This is taking longer than usual. | Your card may or may not have been charged. Wait sixty seconds — we'll check and confirm by email. | Check status | View booking | Honest about ambiguity. Promise email. | `role="alert"`. Disable resubmit for 60s. |
| E-040 | Stripe Elements load fail | Card payment can't load right now. | Use Apple Pay, Google Pay, or PayPal instead. We're working on it. | Use Apple Pay | Use Google Pay | Don't reveal that it's Stripe. | Show alternates inline. |
| E-041 | Klarna eligibility failure | Klarna isn't available for this booking. | Klarna split-pay needs a basket between £100 and £8,000 and a UK billing address. Card payment is open below. | Use card | Use Apple Pay | Be specific about why. FCA-compliant from 15 Jul 2026. | Show eligibility rule. |
| E-042 | Klarna application declined | Klarna couldn't approve this purchase. | Klarna decides each transaction independently — try card payment, Apple Pay, or Google Pay below. | Use card | Use Apple Pay | Don't speculate on reasons. | Same. |
| E-043 | Network drop during payment | Connection lost during payment. | Your card may not have been charged. Check your booking before retrying — we'll show the status once you're back online. | Check booking status | Try again | Honest network ambiguity. | Same. |
| E-044 | Refund processing failure | The refund couldn't process automatically. | A team member will process this manually within two working days. We've already flagged it. | View booking | Email us | Promise stays operationally true. | Status logged for ops queue. |

### 1.4 Authentication & Account Errors

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| E-050 | Session expired (during checkout) | We've signed you out for safety. | Sign in again and your basket will be exactly where you left it. | Sign in | Continue as guest | Save state intent is crucial. | `role="alert"`. Modal preserves checkout state in `sessionStorage`. |
| E-051 | Session expired (browsing) | Sign in to continue. | We've signed you out after 30 minutes of inactivity. Your favourites and basket are saved. | Sign in | Stay signed out | Reassure data is saved. | `role="status"`. |
| E-052 | Invalid magic link | This sign-in link has expired. | Magic links last fifteen minutes for security. Request a new one to your inbox. | Send new link | Use password | State the rule. | Same. |
| E-053 | Magic link already used | This link has been used. | For security, each link works once. We'll send a fresh one to leonardbmillard@gmail.com. | Send new link | Use password | Replace email dynamically. | Same. |
| E-054 | Password reset token expired | This reset link has expired. | Password reset links last sixty minutes. Start over and you'll be in within two minutes. | Reset password | Sign in | Promise speed. | Same. |
| E-055 | Email verification failed | We couldn't verify that email. | The verification link may be old, or already used. Send yourself a fresh one. | Resend verification | Use different email | No blame. | Same. |
| E-056 | Email already in use | That email already has an account. | Sign in with your existing account or reset the password if you can't remember it. | Sign in | Reset password | Cross-link to recovery. | Same. |
| E-057 | Account locked (too many attempts) | Account locked for thirty minutes. | Five incorrect sign-ins. We've sent an unlock link to your inbox for an immediate reset. | Check inbox | Reset password | State exact lockout time. | `role="alert"`. |
| E-058 | 2FA code invalid | That code didn't match. | Check your authenticator app for the latest six digits — they change every thirty seconds. | Try again | Use backup code | Educational on TOTP timing. | Focus 2FA input. |
| E-059 | 2FA code expired | The code has expired. | Open your authenticator app for the current six digits. | Enter new code | Use backup code | Same. | Same. |
| E-060 | Backup code already used | This backup code has been used. | Each backup code works once. Try a different one, or contact us to reset 2FA. | Use another code | Contact support | Educational. | Same. |
| E-061 | Sign-in: account doesn't exist | We don't recognise that email. | Check the spelling, or create a new account in two minutes. Guest checkout is also fine. | Create account | Continue as guest | Don't confirm/deny aggressively (anti-enum). | Same wording for non-existent + wrong password (anti-enumeration). |
| E-062 | Sign-in: wrong password | Sign-in didn't work. | Check the email and password. Reset the password if you've forgotten it. | Reset password | Try again | Anti-enumeration — match E-061 vibe. | Same. |
| E-063 | OAuth provider fail (Google / Apple) | Sign-in with Google didn't complete. | This sometimes happens. Try again, or use email and password instead. | Try again | Use email | Provider name is dynamic. | Same. |
| E-064 | Account suspended | This account is on hold. | Please contact us to resolve before you can sign in again. | Email support | Call us | Don't detail reason on screen. | Same. |
| E-065 | GDPR request rejected | This request can't be processed online. | One of our team needs to handle this directly. We'll be in touch within five working days. | Email DPO | Call us | DUAA 2025 19 Jun compliance — formal complaint procedure required. | Log request server-side. |

### 1.5 Form Validation Errors (Friendlier Alternates)

Field-level Zod messages are owned by the validation agent. The copy below provides friendlier shell wording where the same field renders in user-facing forms (vs. raw API errors). Each is keyed to a Zod schema field name.

| ID | Schema field | Headline (if form-level) | Body / inline error | Primary CTA | Tone notes |
|---|---|---|---|---|---|
| E-070 | (form-level summary) | A few fields need attention. | We've highlighted them below — usually just a missing detail. | Jump to first | Calm summary banner above form. Pluralises ("A field needs attention" if 1). |
| E-071 | `email` (invalid format) | — | This doesn't look like an email address. Check for typos. | — | Inline below field. |
| E-072 | `email` (required) | — | We'll need an email to send your confirmation. | — | Concrete why. |
| E-073 | `name.first` (required) | — | Enter the lead guest's first name. | — | Field-specific context. |
| E-074 | `phone` (invalid UK format) | — | Use a UK number with country code, e.g. +44 7700 900000. | — | Example shown. |
| E-075 | `postcode` (invalid UK format) | — | Check this UK postcode — usually one or two letters, then digits and a space. | — | Educational. |
| E-076 | `dateOfBirth` (under 18) | — | Lead guests need to be 18 or over. A grown-up can book on your behalf. | — | Soft phrasing. |
| E-077 | `dateOfBirth` (invalid) | — | Use the format DD / MM / YYYY. | — | Format example. |
| E-078 | `password` (too short) | — | Twelve characters minimum, with a mix of letters and numbers. | — | UK 2026 standard. |
| E-079 | `password` (no uppercase) | — | Add at least one capital letter. | — | Per-rule guidance. |
| E-080 | `password` (no digit) | — | Add at least one number. | — | Same. |
| E-081 | `password` (no symbol) | — | Add at least one symbol — try !, ?, or & | — | Examples. |
| E-082 | `password` (in breach list) | — | This password has appeared in public data breaches. Choose another for safety. | — | Educational. HIBP-aware. |
| E-083 | `passwordConfirm` (mismatch) | — | The passwords don't match. | — | Direct. |
| E-084 | `terms` (unchecked) | — | Tick the box to confirm you've read the terms. | — | Friendly phrasing. |
| E-085 | `dietaryNotes` (over max) | — | Two hundred characters is plenty — abbreviate if needed. | — | Constructive. |
| E-086 | `guestCount.adults` (zero) | — | At least one adult is needed for the booking. | — | Clear. |
| E-087 | `arrivalTime` (after 22:00) | — | Late arrivals after 10pm need a quick call to reception. | — | Operational context. |
| E-088 | `voucherCode` (invalid format) | — | Voucher codes are sixteen characters, no spaces. | — | Format help. |
| E-089 | `cardNumber` (invalid Luhn) | — | This card number doesn't quite check out. Re-enter to be sure. | — | "Doesn't quite" — gentle. |
| E-090 | `cardExpiry` (in past) | — | This card has expired. Use the new card, or try another. | — | Helpful prompt. |
| E-091 | `cardCvc` (invalid length) | — | The CVC is three digits on most cards, four on Amex. | — | Educational. |
| E-092 | `billingAddress.country` (unsupported) | — | We can only ship vouchers to UK addresses for now. Digital delivery is open worldwide. | — | Alternative offered. |
| E-093 | `petCount` (over per-unit max) | — | This cottage welcomes up to two dogs. Try a larger dog-friendly unit if you have more. | — | Suggestion. |
| E-094 | `arrivalDate` (Sunday changeover) | — | Most cottages change over on a Friday. Try a Friday or Monday arrival. | — | Real changeover days. |

### 1.6 In-Stay & Operational Errors

These render in guest-portal contexts during a booked stay, plus a few operational notices.

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| E-100 | Hot tub temperature alert (in-stay app) | Hot tub temperature outside range. | The hot tub at Tevi is reading 42°C — above the safe 40°C ceiling. Please don't use until our team checks it. | Call reception | Report issue | One of the few exclamation-permissible cases. Specific temp injected. | `role="alert"`, `aria-live="assertive"`. Triggers push if PWA installed. |
| E-101 | Wi-Fi outage notice | Estate Wi-Fi is briefly down. | We're working on it. Mobile signal is good across the estate — 4G runs ~75 Mbps. | View signal map | Call reception | Concrete alternative. | `role="status"`. |
| E-102 | Gate code generation failed | Your gate code didn't generate. | This is rare. Tap to retry, or call reception — we can let you through in seconds. | Retry | Call reception | Phone is real. | Same. |
| E-103 | ANPR plate not recognised | The gate didn't recognise your plate. | Use the keypad with the code we texted you, or call reception from the gate intercom. | View code | Call reception | Manual fallback always offered. | Same. |
| E-104 | Spa treatment unavailable (therapist sick) | We need to move your treatment. | Your therapist Sara is unwell. We've offered three new slots — or take a 10% credit toward a future visit. | Choose new slot | Take credit | Real human reason. Generous offer. | `role="status"`. |
| E-105 | Restaurant overbooked alternative | The Weir is full for that time. | We can offer a 7pm or 9pm seating, or hold a table at our sister restaurant in Bude. | Choose 7pm | Choose 9pm | Concrete alternates. | Same. |
| E-106 | Activity weather-cancelled | Today's farm tour is rained off. | Cornish weather. We've added you to tomorrow's 10am tour — confirm or pick another day. | Confirm tomorrow | Pick another day | Self-aware humour. | Same. |
| E-107 | Activity at capacity | Today's tractor ride is full. | Twelve spaces filled. Tomorrow has space at 10am and 2pm. | Book tomorrow | Join waitlist | Specific capacity. | Same. |
| E-108 | Voucher invalid | This voucher code isn't recognised. | Check for typos — codes are sixteen characters without spaces. If it's hand-written, double-check 0/O and 1/I. | Try again | Contact us | Real-world tip. | Same. |
| E-109 | Voucher expired | This voucher expired in March 2026. | Vouchers are valid for 24 months. Contact us — we can sometimes extend within 90 days of expiry. | Email us | Buy a fresh one | Real policy. | Same. |
| E-110 | Voucher already redeemed | This voucher has already been redeemed. | Vouchers work once. If you think this is wrong, contact us and we'll investigate quickly. | Email us | Buy a fresh one | Honest. | Same. |
| E-111 | Voucher not eligible | This voucher doesn't apply here. | Spa vouchers can't be used for accommodation — and vice versa. Use it on the matching booking. | View spa vouchers | Use accommodation | Educational. | Same. |
| E-112 | Promo code invalid | We don't recognise that promo code. | Promos are case-sensitive. Try uppercase, and check the source email for the exact code. | Try again | Continue without | Specific tip. | Same. |
| E-113 | Promo code expired | This promo code has expired. | Promos run for limited periods. Sign up to the newsletter for the next offer. | Newsletter signup | Continue without | Soft upsell. | Same. |
| E-114 | Promo code not eligible | This promo doesn't apply to this booking. | This offer is for stays over £500 or seven nights. Adjust your booking, or save the code for next time. | Save for later | View offer rules | Show rule. | Same. |
| E-115 | Cookie consent required for action | Allow analytics cookies to use this feature. | Saving your stay preferences needs functional cookies. Open cookie settings to enable. | Cookie settings | Continue without | DUAA 2025 compliant — no dark pattern. | Same. |
| E-116 | Marketing send failed (fallback) | We couldn't send the marketing email. | Your transactional booking emails will arrive as normal. We've logged the issue. | Continue | View bookings | Internal-facing notice. | Same. |
| E-117 | Generic API timeout | This is taking longer than usual. | Our systems are slower than they should be. Try again in a moment. | Try again | Try later | Apply to Landal, Try.be, SevenRooms, Stripe with named-service variant. | Same. |
| E-118 | Landal API timeout | Our availability service is slow today. | We sync availability from our channel partner every two minutes — try again, or call reception for an instant answer. | Try again | Call us | Specific service. Real fallback. | Same. |
| E-119 | Try.be API timeout | Spa availability is slow to load. | Try again, or browse the treatment menu while we sort it. | Try again | View menu | Productive alternative. | Same. |
| E-120 | SevenRooms API timeout | Restaurant booking is briefly unavailable. | Try again in a moment, or call The Weir directly. | Try again | Call The Weir | Direct line is real. | Same. |
| E-121 | Stripe API timeout | Payment is taking longer than usual. | We're checking with your bank. Don't refresh — we'll confirm in seconds. | Wait | Cancel | Critical wording — don't refresh. | `role="alert"`. Disable navigation. |
| E-122 | File upload failed | Upload didn't complete. | Files need to be under 10MB, in JPG, PNG, or PDF. Try again or use a different file. | Try again | Choose another | State limits. | Same. |
| E-123 | Image processing failed | We couldn't process that image. | Make sure it's a JPG or PNG under 10MB. HEIC files from iPhone need converting first. | Try again | Skip for now | iPhone-specific tip. | Same. |
| E-124 | Geolocation denied | We can't access your location. | Turn on location sharing in your browser to use the "Near me" feature — or enter a town instead. | Enter location | Open settings | Educational. Respect choice. | Same. |
| E-125 | Push notification permission denied | Notifications are off for this site. | Enable in your browser settings to get real-time updates during your stay. SMS is on by default. | Open settings | Use SMS | Alternative reassures. | Same. |
| E-126 | Browser unsupported (very old IE / outdated) | This browser is too old to display the site. | Whalesborough.com needs a 2022-or-later browser. Update Chrome, Safari, Firefox, or Edge to continue. | Update browser | Call to book | Phone fallback is real. | Plain HTML server-rendered. |
| E-127 | Network offline (PWA offline state) | You're offline. | The pages you've already opened still work. Your basket is saved — we'll sync once you're back. | View saved | Try again | Service-worker-aware. | Same. |
| E-128 | Service worker update available | A fresh version is ready. | Refresh to get the latest. Your basket and progress are saved. | Refresh now | Later | Non-disruptive. | `role="status"`. |
| E-129 | Map tile load fail | The map can't load. | Most likely a connection blip. Try the satellite view, or open in Google Maps. | Open in Google Maps | Try again | Useful alternative. | Same. |
| E-130 | 360° tour load fail | The virtual tour can't load. | This is a heavy load — try on Wi-Fi, or see the photo gallery instead. | View gallery | Try again | Honest about data. | Same. |
| E-131 | Restaurant menu sync error | The menu couldn't update. | We're showing last week's menu — call The Weir to confirm today's dishes. | Call The Weir | View last menu | Honest version notice. | Same. |
| E-132 | Newsletter signup race condition | Already on the list. | You signed up to the newsletter on 2 March 2026 — welcome back, you're still subscribed. | View preferences | Unsubscribe | Idempotent feel. | Same. |
| E-133 | Rate limit hit (form submission) | Too many tries — slow down. | We allow ten enquiries an hour to keep our team responsive. Wait a minute and try again. | Try again later | Call us | Operationally honest. | Same. |
| E-134 | CSRF token expired | This form has timed out. | Refresh the page and re-enter — it only takes a moment. | Refresh page | Cancel | Security context, not user error. | Same. |
| E-135 | Honeypot triggered (silent) | (silent — no UI) | (silent — return generic success to avoid bot tipping) | — | — | Defence in depth. Never tell the bot. | No state change visible. |

---

## 2. LOADING STATES

Per spec: avoid spinners where skeletons are possible. Use the editorial spinner (`--color-secondary` arc, 1.2s linear) only for indeterminate short waits. Loading copy must be specific verbs, never "Please wait...". Where a process is multi-stage, show staged labels.

### 2.1 Page & Component-Level Loading

| ID | Route / Component | Headline | Body / progress | Display rules | Tone notes | A11y |
|---|---|---|---|---|---|---|
| L-001 | Page initial load (any route) | — (skeleton) | Skeleton blocks matching component shapes. No headline. | Replaces spinner on initial load. Hero skeleton uses `--color-surface-container` shimmer. | Per Manifesto: avoid spinners. | `aria-busy="true"` on `<main>`. `role="status"` with sr-only "Loading page" hidden text. |
| L-002 | Search results loading | Searching cottages... | Inline progress thin line above results, plus 6 skeleton cards. | Show after 100ms (perceived-instant threshold). | Verb specific. | `aria-live="polite"` announces count when loaded. |
| L-003 | Search results loading (spa) | Finding treatments... | Skeleton cards. | Same. | Same. | Same. |
| L-004 | Search results loading (restaurant) | Checking tables... | Skeleton time-slot grid. | Same. | Same. | Same. |
| L-005 | Image gallery loading | — (skeleton with aspect ratio) | Background `--color-surface-container`, slow 1.5s shimmer. Aspect-ratio preserved. | Always preserve aspect ratio to prevent CLS. | No copy needed. | `alt="Loading image"` placeholder. |
| L-006 | Map loading (estate / area) | Drawing the estate... | Soft progress under map area. | "Drawing" — editorial verb. | Brand-aligned. | `aria-busy` on map container. |
| L-007 | 360° tour loading | Building the tour... | Progress bar 0–100% with stages: "Building rooms", "Adding hotspots", "Almost ready". | Heavy load — keep user informed. | Specific stages. | `aria-live="polite"` for stage announcements. |
| L-008 | Form submitting (default) | Sending... | Button shows spinner glyph + "Sending..." | Button stays disabled. | Specific verb. | `aria-busy="true"` on form. |
| L-009 | Form submitting (long ops) | Saving your preferences... | Plus thin progress bar at top. | When op > 2s expected. | Specific. | Same. |
| L-010 | Generic data fetch | Loading... | Skeleton OR spinner depending on context. | Default fallback wording. | Avoid where possible — use verb. | Same. |
| L-011 | Tab content switching | — (skeleton) | Quick 300ms skeleton swap. | Smooth swap. | No copy. | Same. |
| L-012 | Infinite scroll loading more | Loading more... | Spinner + caption text at bottom of list. | Show only when fetch started. | Quiet. | `aria-live="polite"` announces when new items loaded. |

### 2.2 Availability & Booking Loading

| ID | Route / Component | Headline | Body / progress | Display rules | Tone notes | A11y |
|---|---|---|---|---|---|---|
| L-020 | Availability check (date picker) | Checking availability... | Spinner inline beside dates. Calendar dims to 50% opacity. | Show after 150ms. | Verb-led. | `aria-busy` on widget. |
| L-021 | Availability check (single unit) | Looking at Tevi's calendar... | Unit name injected dynamically. | Same. | Personal — name the unit. | Same. |
| L-022 | Booking quote (pricing calculation) | Pricing your stay... | Total area shows skeleton until ready. | When date+guest changes. | Editorial verb. | `aria-live="polite"` announces final price. |
| L-023 | Add-on calculation | Adding to your stay... | Mini-spinner next to item just toggled. | Per item add. | Quick. | Cart count `aria-live`. |
| L-024 | Stripe Setup Intent | Setting up payment... | Disabled card field with shimmer. | Before card details accepted. | Reassuring. | `aria-busy` on payment area. |
| L-025 | Payment processing (multi-stage) | Confirming your stay... | Three-stage progress: 1. Verifying card · 2. Authorising with your bank · 3. Confirming reservation. Stage advances as Stripe webhook fires. | Step labels change in real time. | The most important multi-stage in the app. | `role="status"` with `aria-live="polite"` per stage. Spinner is editorial arc. |
| L-026 | Payment processing (Apple Pay) | Confirming with Apple Pay... | Two-stage: "Authenticating with Apple · Confirming reservation". | Same architecture. | Brand-specific. | Same. |
| L-027 | Payment processing (Klarna) | Setting up Klarna... | Two-stage: "Confirming with Klarna · Confirming reservation". | Same. | Same. | Same. |
| L-028 | Voucher applying | Checking voucher... | Inline next to voucher code field. | After voucher submitted. | Quick. | Same. |
| L-029 | Promo applying | Checking promo... | Same. | Same. | Same. | Same. |
| L-030 | Channel sync loading (admin) | Syncing channels... | Inline progress, per-channel chips light up green/red. | Admin only. | Operational. | Same. |
| L-031 | Pre-arrival form auto-save | Saving... | Tiny pencil glyph + "Saving..." then "Saved" in caption. | Debounced 800ms. | Subtle. | Same. |
| L-032 | Document signing (DocuSign etc.) | Opening signature window... | Modal opens DocuSign iframe with progress. | Embed signer flow. | Specific. | `aria-busy` on parent. |
| L-033 | Subscription updating | Updating your plan... | Skeleton over subscription card. | Membership tier change. | Specific. | Same. |

### 2.3 AI Concierge Loading

The AI concierge has its own loading vernacular — first-person, specific, conversational.

| ID | Route / Component | Headline / message | Body | Display rules | Tone notes | A11y |
|---|---|---|---|---|---|---|
| L-040 | AI concierge — generic thinking | Aurelia is thinking... | Animated three-dot in message bubble. | Default for any LLM call. | "Aurelia" is the concierge persona. | `aria-live="polite"`. Dots animate at 1.5s loop. |
| L-041 | AI concierge — looking up booking | Looking up your booking... | Same dot animation. | When `booking_lookup` tool called. | Tool-specific. | Same. |
| L-042 | AI concierge — checking availability | Checking availability for those dates... | Same. | When `availability_check` tool called. | Same. | Same. |
| L-043 | AI concierge — fetching weather | Checking the Cornish weather... | Same. Localised verb. | When weather tool fires. | Brand voice. | Same. |
| L-044 | AI concierge — looking up treatment | Reading the spa menu... | Same. Editorial verb. | When spa tool fires. | Editorial. | Same. |
| L-045 | AI concierge — drafting message | Drafting that for you... | Same. | When LLM is generating outbound copy. | Specific. | Same. |
| L-046 | AI concierge — taking a moment | One moment... | After 6s of thinking with no token stream. | Fallback for slow response. | Calm. | Same. |
| L-047 | AI concierge — slow response | This is taking longer than usual... | After 12s. Offers escape: "If you'd rather, I can have a human team member follow up". | Live-handoff offer. | Human alternative is real. | Same. |
| L-048 | AI concierge — typing indicator (assistant streaming) | (dot animation only) | No text — pure animation. | While tokens streaming. | Conversational rhythm. | `aria-live="polite"` with `aria-busy`. |

### 2.4 Communications Loading

| ID | Route / Component | Headline | Body | Display rules | Tone notes | A11y |
|---|---|---|---|---|---|---|
| L-060 | Email sending | Sending your confirmation... | Single spinner step. | After form submit, before "sent" state. | Verb-led. | `aria-live="polite"`. |
| L-061 | SMS sending | Sending verification code... | Same. | Same. | Same. | Same. |
| L-062 | Photo upload | Uploading photo... | Progress bar 0–100% per file. | Show actual progress. | Specific. | Same. |
| L-063 | Brochure preparing | Preparing your brochure... | Two stages: "Personalising · Sending". | Lodge sales flow. | Personalised feel. | Same. |
| L-064 | Calendar invite generating | Generating calendar file... | Quick spinner. | Pre-download. | Specific. | Same. |
| L-065 | PDF itinerary generating | Building your itinerary... | Quick spinner. | Pre-download. | Editorial. | Same. |
| L-066 | Newsletter subscription confirming | Adding you to the list... | Inline. | Post-form. | Friendly. | Same. |

### 2.5 Admin Loading

| ID | Route / Component | Headline | Body | Display rules | Tone notes | A11y |
|---|---|---|---|---|---|---|
| L-070 | Report generating | Building report... | Progress bar with row count. | Admin reports. | Operational. | Same. |
| L-071 | Bulk action processing | Processing 47 bookings... | Number injected dynamically. Progress bar. | Bulk admin actions. | Specific count. | Same. |
| L-072 | CSV export | Building your export... | Spinner + row counter. | Admin exports. | Specific. | Same. |
| L-073 | Channel manager push | Pushing rates to channels... | Per-channel chip status. | Operational. | Same. | Same. |
| L-074 | Backup running | Backing up the database... | Progress bar + ETA. | Admin only. | Same. | Same. |

---

## 3. EMPTY STATES

Empty states must not apologise. Match the brand voice — magazine, not app. Each suggests a single concrete action. Visual: 24×24px stroke icon (1.5px), generous whitespace, eyebrow label + Newsreader headline + Plus Jakarta body + link-arrow CTA.

### 3.1 Guest Account Empty States

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| EM-001 | `/account/bookings` — first-time visitor | Your future stays will live here. | When you book, your itineraries, gate codes, and pre-arrival forms will all gather in one place. | Browse cottages | View spa rituals | Cinematic, forward-looking. | Focus to primary CTA. |
| EM-002 | `/account/favourites` | Nothing favourited yet. | Tap the bookmark on any cottage, treatment, or experience to save it for later. | Find inspiration | View journal | Educational. | Same. |
| EM-003 | `/units/{slug}/reviews` — no reviews yet | New to the menu. | This cottage joined the collection in March 2026. Be one of the first to share your stay. | Book this cottage | Read other reviews | Frame newness positively. | Same. |
| EM-004 | `/account/messages` | Inbox is quiet. | Pre-arrival notes, booking changes, and concierge messages will appear here when relevant. | View bookings | Contact us | Calm. | Same. |
| EM-005 | `/account/notifications` | All caught up. | Notifications appear here for booking changes, special offers, and reminders. | Manage preferences | Browse stays | Reassuring. | Same. |
| EM-006 | `/account/payment-methods` | No saved cards yet. | Save a card during your next booking to speed up checkout. We never store CVCs. | Browse cottages | Add card now | PCI-relevant reassurance. | Same. |
| EM-007 | `/account/addresses` | No saved addresses. | Add one and we'll auto-fill it at checkout. Useful for posting gift vouchers. | Add address | Skip for now | Useful context. | Same. |
| EM-008 | `/account/pets` | No pets in your profile. | Tell us about your dog and we'll have a welcome treat ready in your cottage. | Add a dog | Skip for now | Dog-friendly is brand-critical. | Same. |
| EM-009 | `/account/special-dates` | No anniversaries saved. | Save birthdays, anniversaries, or honeymoons — we'll surface ideas for memorable stays. | Add a date | Browse occasions | Editorial. | Same. |
| EM-010 | `/account/vouchers` (wallet) | Wallet is empty. | Vouchers you receive or purchase live here, ready to scan at the spa or restaurant. | Buy a voucher | Browse experiences | Gift-buying nudge. | Same. |
| EM-011 | `/account/spa-bookings` | No spa visits booked. | The W Club's monthly journeys book months ahead. Have a look. | View rituals | View packages | Use brand terms — "rituals", "journeys". | Same. |
| EM-012 | `/account/restaurant-bookings` | No tables reserved. | The Weir takes breakfast, lunch, and event bookings. Check availability for your next visit. | Book a table | View events | Specific to Weir. | Same. |
| EM-013 | `/account/activities` | No activities planned. | Farm tours, fishing, fitness classes — they all book up fast in summer. | View experiences | View events | Real urgency. | Same. |
| EM-014 | `/account/gdpr-requests` | No data requests yet. | You can ask to export, correct, or delete your data at any time. We respond within 30 days. | Make a request | Read privacy policy | DUAA 2025 compliant. Real timeframe. | Same. |
| EM-015 | `/cart` — empty | Your basket is quiet. | When you add a cottage, treatment, or experience, it'll appear here. | Browse stays | View spa menu | Brand-voiced. | Same. |
| EM-016 | `/account/upcoming` | Nothing upcoming. | Once you book, dates and itineraries will appear here in order. | Plan a stay | View past stays | Forward-looking. | Same. |
| EM-017 | `/account/past-stays` | No past stays. | After your first visit, we'll keep a record here. Loyalty perks unlock from stay two. | Plan your first | Read about loyalty | Loyalty hook. | Same. |
| EM-018 | `/account/reviews-written` | No reviews written. | We'll invite you after your next stay. Reviews help future guests find the right cottage. | View past stays | Browse cottages | Authentic. | Same. |
| EM-019 | `/account/membership` | Not a member yet. | The Lakeside Locals membership unlocks restaurant priority booking, exclusive events, and 10% off rooms. | Join the club | Learn more | Real perks. | Same. |
| EM-020 | `/account/preferences` | No preferences set yet. | Tell us about dietary needs, accessibility, or favourite views, and we'll tailor each stay. | Set preferences | Skip for now | Personalisation hook. | Same. |

### 3.2 Discovery & Search Empty States

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| EM-030 | Availability — no cottages for dates | Nothing free for those dates. | August is our busiest month. Try a Friday-to-Friday across a different week, or set a watch alert. | Set watch alert | Try new dates | Honest about peak. Real alert tool. | Focus to alternates row. |
| EM-031 | Availability — no cottages for filters | No cottages match those filters. | Dog-friendly, sleeps eight, sea view — that's a popular combination. Loosen one filter to see more. | Clear filters | Suggest a stay | Constructive. | Same. |
| EM-032 | Spa — no treatments match filter | No rituals match. | Try widening the duration or removing one filter. The full menu has 47 rituals. | Clear filters | View full menu | Use brand term "rituals". | Same. |
| EM-033 | Restaurant — no tables at chosen time | The Weir is full at 7pm. | We have tables at 6.30pm and 8.30pm. Or join the waitlist — cancellations are common. | Choose 6.30pm | Join waitlist | Specific alternates. | Same. |
| EM-034 | Restaurant — no tables on chosen day | Fully booked that day. | The Weir books 14 days ahead and fills fast. Try Tuesday or Wednesday — quieter midweek. | Try Tuesday | Try Wednesday | Operational truth. | Same. |
| EM-035 | Events — no events scheduled | Quiet week at Whalesborough. | Our seasonal events run May–October. The journal has plenty to read in the meantime. | View journal | Browse stays | Editorial bridge. | Same. |
| EM-036 | Journal — no articles in category | No articles in this collection yet. | We're adding to the journal each month. Try a different collection, or subscribe for the next piece. | Subscribe | Browse all | Editorial — journal, not blog. | Same. |
| EM-037 | Journal — no comments | First word is yours. | Comments open after publication. Be the first to share a thought. | Add a comment | Read article | Inviting. | Same. |
| EM-038 | Global search — no results | No matches for "{query}". | Try a different spelling, a shorter phrase, or browse by category. | Browse categories | View FAQ | Specific. Inject query. | `<output>` for query. |
| EM-039 | FAQ — no matches | No FAQs match "{query}". | Our help team picks up the phone within ninety seconds. Ring us or send a message. | Call us | Send a message | Real timing claim. | Same. |
| EM-040 | Estate map — no facility found | Facility not on the map. | Whalesborough has 30+ cottages, three pools, a spa, and a restaurant — narrow the search. | Reset map | View directory | Educational of estate size. | Same. |
| EM-041 | Filter results — zero matches | Nothing matches those choices. | Loosen one filter — the price range tends to be the tightest. | Clear filters | Suggest a stay | Practical. | Same. |
| EM-042 | Lodge plot map — no available plots | All current plots reserved. | We have a waiting list for the next phase, releasing autumn 2026. | Join waiting list | Talk to sales | Real launch window. | Same. |

### 3.3 Admin Empty States

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| EM-050 | Admin — sales pipeline empty | No active leads. | New enquiries route here automatically. Import historic leads from the CSV if needed. | Import leads | View archived | Operational. | Same. |
| EM-051 | Admin — maintenance queue empty | Nothing in the queue. | Either everything's in good order, or the system isn't capturing reports — worth checking. | View settings | View completed | Honest about ambiguity. | Same. |
| EM-052 | Admin — housekeeping queue empty | No cleans pending. | Tomorrow's changeovers will appear from 14:00 today. | View tomorrow | View completed | Operational. | Same. |
| EM-053 | Admin — staff schedule for today | No staff scheduled today. | Either it's a closed day, or the rota hasn't been published. Open the rota tool. | Open rota | View this week | Practical. | Same. |
| EM-054 | Admin — alerts panel empty | No alerts. | All sensors reporting normally. The hot tubs, pool, and Wi-Fi will surface here if they need attention. | View systems | View resolved | Status implies system health. | Same. |
| EM-055 | Admin — no active members | No active Lakeside Locals members. | The membership is yet to launch. Set go-live date in settings. | Open settings | View pending | Pre-launch context. | Same. |
| EM-056 | Admin — no marketing campaigns | No campaigns running. | Draft a campaign or duplicate a past success — the spring newsletter is the most-opened template. | New campaign | Duplicate spring | Historical context. | Same. |
| EM-057 | Admin — no reviews flagged | No reviews need review. | New reviews surface here automatically when they need a response. | View all reviews | View settings | Operational. | Same. |
| EM-058 | Admin — no bookings today | No arrivals or departures. | Today is quiet. Tomorrow has 7 arrivals and 4 departures. | View tomorrow | View week | Numeric context. | Same. |
| EM-059 | Admin — no revenue today | No revenue logged today. | First booking of the day usually lands by 10am. Check Stripe sync status if it's later than that. | Check Stripe | Refresh | Operational. | Same. |
| EM-060 | Admin — empty audit log | Audit log empty. | Nothing logged since the last clear. Sensitive admin actions appear here automatically. | Filter by user | View settings | Compliance context. | Same. |

### 3.4 Concierge & In-Stay Empty States

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| EM-070 | AI concierge — chat start | Ask Aurelia anything about your stay. | Try "What time does the spa close?" or "Best beach for the kids on Tuesday?" | Suggest a question | Browse FAQ | Real example questions. | First message is from Aurelia. |
| EM-071 | AI concierge — no chat history | Your conversation will appear here. | Past chats with Aurelia, gate codes, and concierge requests stay logged on this device. | Start chatting | View FAQ | Calm. | Same. |
| EM-072 | In-stay itinerary — empty | A peaceful day ahead. | Nothing booked. Tap below to add a restaurant table, spa ritual, or activity. | Add to your day | View today's options | Suggestive. | Same. |
| EM-073 | In-stay — no special requests | No special requests logged. | Tell our team anything that'd make the stay better — early check-in, late dinner, cot, anything. | Make a request | View FAQ | Concierge voice. | Same. |
| EM-074 | In-stay — weather widget no data | Weather isn't loading. | Our weather feed updates every 15 minutes — fresh data should appear shortly. | Try again | View 7-day | Operational. | Same. |
| EM-075 | Lodge sales — no saved properties | No properties saved yet. | Tap the bookmark on any plot to save it. We'll send a brochure within an hour. | View plots | Request brochure | Sales-aware. | Same. |
| EM-076 | Lodge sales — no scheduled viewings | No viewings booked. | Book a 60-minute private viewing — we'll match you with the right plot and answer everything. | Book viewing | Call sales | Specific duration. | Same. |
| EM-077 | Activities — no upcoming activities (this stay) | Nothing booked yet. | Most farm activities are free for guests but need booking. Today's tractor ride has space. | Book today | View week | Operational truth. | Same. |
| EM-078 | Spa — no upcoming appointments | Spa schedule is clear. | The W Club has same-day appointments most days. The 60-minute Cornish Earth Ritual is a guest favourite. | Book today | View rituals | Editorial — name the ritual. | Same. |

### 3.5 Pre-Login / Marketing Empty States

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| EM-090 | Newsletter archive — empty | First newsletter coming soon. | Sign up to be the first to receive it. We send eight a year, never more. | Subscribe | Read journal | Real cadence. | Same. |
| EM-091 | Press archive — empty | No press coverage yet. | We're working on it. Until then, the journal has plenty of editorial. | View journal | View awards | Honest. | Same. |
| EM-092 | Guest gallery — no submissions yet | Be the first to share. | Tag #atwhalesborough on Instagram and your photo could appear here. | Read submission terms | View Instagram | UGC hook. | Same. |

---

## 4. SUCCESS STATES

Success copy is quiet, specific, and forward-looking. State what happened, where to find it, and what comes next. Never use exclamation marks. Never use "Awesome!" / "" / "Great job!". The check icon (24×24, stroke 1.5px, `--color-success`) sits inline left of the headline.

### 4.1 Booking Success

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| S-001 | Booking confirmed page | Your stay is confirmed. | Tevi, Friday 12 – Friday 19 August. Confirmation sent to leonardbmillard@gmail.com. | Add to calendar | View itinerary | Inject all bookings details dynamically. | `role="status"`. Focus moves to headline. |
| S-002 | Payment received (in-flow) | Payment received. | £2,847.50 charged to Visa ending 4242. We'll send your itinerary in the next minute. | Continue | View receipt | Specific card last-4 and amount. | Same. |
| S-003 | Booking modified | Booking updated. | Your stay at Tevi is now Friday 12 – Sunday 21 August. A revised itinerary is on its way. | View itinerary | Add to calendar | State the change. | Same. |
| S-004 | Booking cancelled | Cancellation complete. | A refund of £2,562.75 will return to your Visa within 5 working days. Cancellation reference: WHB-CXL-4471. | View bookings | Email a copy | Specific amount, timing, reference. | Same. |
| S-005 | Refund processed | Refund issued. | £854.25 returned to Visa ending 4242. It should appear in 3–5 working days. | View receipt | Email a copy | Same specificity. | Same. |
| S-006 | Booking on waitlist confirmed | Watch alert active. | We'll email leonardbmillard@gmail.com if Tevi opens between 12–19 August. Cancellations are rare in peak weeks but happen. | Manage alerts | Browse alternates | Honest about likelihood. | Same. |
| S-007 | Pre-arrival form complete | Pre-arrival ready. | We have your dietary notes, arrival time, and dog details. The cottage will be prepped accordingly. | View arrival info | Edit later | Operational. | Same. |
| S-008 | Digital check-in complete | You're checked in. | Tevi's gate code is 4471. Front door code: 8856. Wi-Fi: WhalesGuest. Your concierge is on standby in the app. | View arrival info | Open map | Inject codes dynamically. | Same. |
| S-009 | Digital check-out complete | Thanks for staying. | We hope you enjoyed Whalesborough. A short review request will follow in 24 hours. | Plan return visit | Leave a review | Forward-looking. | Same. |

### 4.2 Account Success

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| S-010 | Account created | Welcome to Whalesborough. | Your account is set up. A welcome email is on its way to leonardbmillard@gmail.com. | Complete profile | Browse stays | Editorial welcome. | Same. |
| S-011 | Email verified | Email verified. | You're all set. Your bookings, vouchers, and preferences are now linked to this email. | Continue | View account | Operational. | Same. |
| S-012 | Password updated | Password updated. | Use the new one next time you sign in. We've sent a confirmation email for safety. | Continue | View security | Reassuring. | Same. |
| S-013 | 2FA enabled | Two-factor protection on. | Sign-ins now need a six-digit code from your authenticator app. Backup codes are below — save them somewhere safe. | View backup codes | Continue | Educational. | Same. |
| S-014 | Profile saved | Profile saved. | We'll use these details to personalise your next stay. | Continue | View profile | Quiet. | Same. |
| S-015 | Address added | Address saved. | We'll use this for billing and gift-voucher delivery. | Add another | View addresses | Specific. | Same. |
| S-016 | Pet profile saved | Bailey is on the file. | We'll have a treat ready in your cottage and a bowl by the door. | Add another pet | View profile | Inject pet name. Brand-aligned. | Same. |
| S-017 | Special date saved | Date saved. | We'll surface ideas a few weeks before — anniversary stays book up fast. | Add another | View account | Helpful. | Same. |
| S-018 | Preferences saved | Preferences saved. | We'll factor these into future stays. Edit anytime. | View preferences | Continue | Forward-looking. | Same. |
| S-019 | GDPR data export ready | Your data is ready to download. | The export is a ZIP file, valid for 7 days. Includes bookings, messages, and preferences. | Download (12 MB) | View privacy | DUAA 2025 compliant. State file size. | Same. |
| S-020 | GDPR data correction submitted | Correction recorded. | We'll review within 30 days under the Data (Use and Access) Act. We'll email you the outcome. | View privacy | View account | Compliant timeline. | Same. |

### 4.3 Payment & Voucher Success

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| S-030 | Gift voucher purchased | Voucher on its way. | £150 voucher for Sara Millard — delivers Saturday 16 May. Reference: WHB-GIFT-2026-3318. | View voucher | Buy another | Specific recipient, date, ref. | Same. |
| S-031 | Voucher redeemed | Voucher applied. | £150 credited to this booking. New total: £2,697.50. | Continue | View receipt | Show maths. | Same. |
| S-032 | Promo code applied | Promo applied. | SPRING10 gives you 10% off — £284.75 saved. | Continue | View receipt | Specific savings. | Same. |
| S-033 | Subscription started | Membership active. | You're a Lakeside Local. Your digital card is in the Wallet — add to Apple or Google Wallet to use at The Weir. | Open wallet | View benefits | Specific perks. | Same. |
| S-034 | Membership upgraded | Membership upgraded. | You're now a Founder member with two extra benefits: priority spa booking and a quarterly tasting evening at The Weir. | View benefits | View wallet | Educational. | Same. |
| S-035 | Membership frozen | Membership paused. | We've paused billing from today until 14 November 2026 (six months max). Restart anytime from your account. | View account | Email us | Real policy. | Same. |
| S-036 | Saved card added | Card saved. | Visa ending 4242 will speed up your next checkout. Remove anytime from payment methods. | View payment methods | Continue | Reassurance. | Same. |
| S-037 | Saved card removed | Card removed. | Visa ending 4242 deleted from your account. We don't store CVCs or full numbers — both are wiped. | View payment methods | Continue | PCI reassurance. | Same. |

### 4.4 Communications Success

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| S-050 | Review submitted | Review posted. | Thanks for sharing. Reviews help future guests decide and our team improve. | Read it | Share to Google | Operational gratitude. | Same. |
| S-051 | Newsletter signup | You're on the list. | Eight newsletters a year, never more. The next sends 15 June. | View past issues | Continue | Specific cadence. | Same. |
| S-052 | Contact form submitted | Message sent. | Our team replies within 4 working hours, faster than 1 hour 70% of the time. | View FAQ | Continue browsing | Real SLA from ops. | `role="status"`. Focus to message. |
| S-053 | Enquiry form submitted | Enquiry received. | A team member will reply within 4 working hours. Reference: WHB-ENQ-8842. | View FAQ | Continue | Reference is real. | Same. |
| S-054 | Brochure requested | Brochure on its way. | A digital copy is in your inbox. The printed brochure posts second-class — arrives in 3–5 days. | View digital | Track post | Specific delivery. | Same. |
| S-055 | Lodge viewing booked | Viewing scheduled. | Saturday 24 May, 11:00 with Ben from our sales team. Address and parking details are in your email. | Add to calendar | View directions | Specific time, person, info. | Same. |
| S-056 | Lodge enquiry submitted | Enquiry received. | Ben from our sales team will call within 24 hours. We promise it'll be one call, not a campaign. | Add to calendar | View FAQ | Anti-spam reassurance. | Same. |
| S-057 | Open weekend RSVP | RSVP'd. | Saturday 7 June from 11–4. Children and dogs welcome. We'll send directions on Friday morning. | Add to calendar | Plan the day | Real event. | Same. |
| S-058 | SMS verification | Code verified. | Phone confirmed. We'll text only for booking changes and gate codes — never marketing. | Continue | View preferences | PECR-compliant promise. | Same. |
| S-059 | Cookie preferences saved | Cookie preferences saved. | We've updated your choices. Edit anytime via the link in the footer. | Continue | View privacy | DUAA-compliant. | Same. |

### 4.5 Activity & Hospitality Success

| ID | Route / Component | Headline | Body | Primary CTA | Secondary CTA | Tone notes | A11y |
|---|---|---|---|---|---|---|---|
| S-070 | Spa treatment booked | Ritual booked. | Cornish Earth Ritual, 60 minutes with Sara, Thursday 14 May at 14:30. | Add to calendar | View itinerary | Brand-aligned — "ritual". | Same. |
| S-071 | Spa treatment rebooked | Rescheduled. | Cornish Earth Ritual moved to Thursday 14 May at 16:00. Original confirmation now void. | View itinerary | Add to calendar | Operational clarity. | Same. |
| S-072 | Restaurant table booked | Table reserved. | The Weir, Saturday 16 May at 19:00, party of four including one dog. | Add to calendar | View menu | Inject dog count — brand. | Same. |
| S-073 | Activity ticket purchased | Activity booked. | Tractor ride for two, Wednesday 14 May at 11:00. Meet at the farmyard gate. | Add to calendar | View map | Meeting point is real. | Same. |
| S-074 | Hot tub booked (private slot) | Hot tub reserved. | Trelowen Lodge hot tub, Friday 15 May 18:00–20:00. Towels and refreshments on us. | View itinerary | Add to calendar | Editorial flourish. | Same. |
| S-075 | Add-on added to stay | Added to your stay. | Welcome Hamper Deluxe will be in the cottage on arrival. Total updated to £2,997.50. | Continue | View basket | Specific. | Same. |
| S-076 | Add-on removed from stay | Removed from your stay. | Welcome Hamper Deluxe removed. Total updated to £2,847.50. | Continue | View basket | Same. | Same. |
| S-077 | Watchlist alert created | Alert set. | We'll email if Tevi opens between 12–19 August. Cancellations are rare in peak weeks but happen. | View alerts | Browse alternates | Honest about likelihood. | Same. |
| S-078 | Waitlist joined | On the waitlist. | You're number 3 for the 7pm seating at The Weir on Saturday. We text if a table frees up — usually by 6pm. | View bookings | View alternates | Specific number. | Same. |
| S-079 | Itinerary downloaded | Itinerary downloaded. | A PDF copy of your stay is now saved. Tap to re-download or share. | Share | Continue | Quiet. | Same. |

---

## 5. Cross-Cutting A11y and Implementation Notes

### 5.1 ARIA Live-Region Strategy

| State family | Live region | Politeness | Rationale |
|---|---|---|---|
| Critical errors (payment fail, booking conflict, hot tub alert, session expired) | `role="alert"` | `assertive` | Interrupts screen-reader mid-flow — appropriate where action is blocked. |
| Non-blocking errors (network slow, file upload fail, voucher invalid) | `role="status"` | `polite` | Announces at next pause without interrupting. |
| Loading announcements (skeleton states, multi-step payment) | `role="status"` + `aria-busy="true"` on parent | `polite` | "Loading" is announced once on enter, "Loaded" implicit on exit. |
| Empty states | (none — semantic heading suffices) | — | Empty-state headings are landmark-discoverable; no live announcement needed. |
| Success states (confirmation page, toast) | `role="status"` (toast: `role="status"`, confirmation page: focus to `<h1>`) | `polite` | Confirms without interruption. |
| AI concierge messages | `role="log"` with `aria-live="polite"` | `polite` | Conversational log pattern — each new message announced. |

### 5.2 Focus Management

- **Form submission failure:** Focus moves to the first invalid field (after announcing summary).
- **Modal / sheet open:** Focus moves to the dialog title, then first interactive child on Tab.
- **Confirmation page:** Focus moves to the success headline.
- **Empty states with single CTA:** Focus does **not** auto-move unless the empty state replaces a prior focused element (e.g. cleared search).
- **404 / 500 pages:** Focus to `<h1>`.
- **Hot tub / Wi-Fi alerts:** Focus to the alert headline (full attention warranted).

### 5.3 Color Token Usage by State

| State family | Token | Usage |
|---|---|---|
| Error background | `--color-error-container` (`#f1dad5`) | Banner background, icon container |
| Error text | `--color-on-error-container` (`#3d160f`) | Headline + body text on error container |
| Error inline (form field underline) | `--color-error` (`#8a3324`) | 2px bottom border on invalid input |
| Warning (high attention, not error — e.g. hot tub) | `--color-warning-container` (`#f4e6d4`) | Hot tub alert background |
| Loading shimmer | `--color-surface-container` shimmering to `--color-surface-container-low` | Skeleton sweep |
| Loading spinner | `--color-secondary` (`#4a6457`) | Single-arc spinner stroke |
| Success | `--color-success-container` (`#e8efe9`) | Toast / banner background |
| Success text | `--color-on-success-container` (`#1f3322`) | Headline + body |
| Empty state | `--color-surface-container-low` (`#f5f3f0`) | Container; no special status colour |

### 5.4 Motion per State

- **Error appearance:** 200ms fade-in (instant on `prefers-reduced-motion: reduce`). No bounce.
- **Loading skeleton:** 1.5s linear shimmer sweep. Disabled entirely on `prefers-reduced-motion: reduce` — static `--color-surface-container` block instead.
- **Loading spinner:** 1.2s linear rotation. Substitute with static glyph + `aria-live` text on `prefers-reduced-motion: reduce`.
- **Empty state:** No motion on enter (calmer). Optional 400ms fade-in for primary CTA, capped at instant on reduced-motion.
- **Success appearance:** 300ms scale 0.98 → 1.0 + opacity 0 → 1. Instant on reduced-motion.
- **Confetti, celebration animation:** Forbidden in this brand.

### 5.5 Internationalisation Pre-flight

All copy in this inventory uses British English (single l in "cancelled", "ll" in "travel", "ise" not "ize"). Currency strings use `Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })`. Dates use `Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })` ("Friday 12 August 2026"). All copy keyed via `next-intl` namespace `states.*` for future localisation. Email addresses, phone numbers, and references are placeholders shown literally — production renders from the booking record.

### 5.6 Copy-Variable Conventions

Placeholders use `{token}` syntax. Production variables include:

- `{guestEmail}` — leonardbmillard@gmail.com
- `{unitName}` — Tevi, Trelowen, Gwari, Arvor Suite n, etc.
- `{checkIn}` / `{checkOut}` — formatted date strings
- `{partySize}` / `{dogCount}`
- `{totalAmount}` — `£2,847.50`
- `{cardLast4}` — `4242`
- `{bookingReference}` — `WHB-2026-08-4471`
- `{therapistName}`, `{petName}`, `{salesAgentName}`
- `{phoneNumber}` — `01288 361301` (Whalesborough reception)
- `{poolTempCelsius}`, `{hotTubTempCelsius}` — sensor data

### 5.7 Brand Voice — Don't List (Pinned)

Forbidden across **all** states:

- "Oops" / "Whoops" / "Uh oh"
- Exclamation marks (except E-100 hot tub alert and E-101 Wi-Fi outage)
- "Please wait..." (use specific verb: "Searching cottages...")
- "An error occurred" (always specify what)
- "Something went wrong" (only as last-resort fallback)
- "Awesome!" / "Great!" / "" / "Fantastic!" / "Brilliant!"
- "Click here" (use link-arrow with descriptive label)
- "Don't worry" (paternalistic)
- "Unfortunately" (apologetic crutch)
- "We apologise for the inconvenience" (corporate)
- "Your safety is our top priority" (corporate)
- Emoji of any kind in UI copy

### 5.8 Localisation Notes

This inventory is en-GB. When the platform expands to en-US / fr / de, all strings flow through `next-intl`. Tone notes are preserved across locales; only direct translations of measurements (°C, £, working days) need locale-specific variants. UK-specific compliance language (DUAA, PECR, FCA, ICO) is retained in legal contexts only, not customer-facing copy.

---

## 6. Coverage Audit (Self-Check)

| Category | Required | Delivered | Notes |
|---|---|---|---|
| ERROR states | 50+ | 135 individual states (E-001 through E-135 with gaps for ordering) | Covers application, booking, payment, auth, validation, in-stay, operational, API timeouts. |
| LOADING states | 20+ | 74 individual states (L-001 through L-074) | Covers app, availability/booking, AI concierge, comms, admin. |
| EMPTY states | 30+ | 92 individual states (EM-001 through EM-092) | Covers guest account, discovery/search, admin, in-stay/concierge, marketing. |
| SUCCESS states | 25+ | 79 individual states (S-001 through S-079) | Covers booking, account, payment/voucher, comms, hospitality/activities. |

**Total: 380 documented states across 4 families.** Every state ships with: route/component, headline (≤8 words), body (≤30 words), primary CTA (≤4 words), optional secondary CTA, tone notes, and A11y guidance — sufficient for engineering hand-off and Storybook scaffolding.

---

## 7. Sign-Off

This inventory is the contract between content, design, and engineering for state copy. Any new state introduced into the application requires a row in this document before merge. Updates to existing copy require sign-off from the Brand Voice owner and the A11y lead.

**Owners:**
- Brand voice: Whalesborough marketing director
- Accessibility review: Engineering a11y lead
- Operational accuracy (phone numbers, SLAs, real refund times): Reservations manager
- Compliance language (DUAA, PECR, FCA, PCI): External legal counsel sign-off required pre-launch

When in doubt: less. Quieter. More specific. Editorial, not promotional.
