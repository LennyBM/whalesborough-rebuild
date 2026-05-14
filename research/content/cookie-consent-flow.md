# Whalesborough Farm Resort & Spa — Cookie Consent & DUAA-Compliant Consent Flow

**Version:** 1.0
**Effective from:** Site launch 2026
**Legal framework:** UK GDPR · Data Protection Act 2018 · PECR · Data (Use and Access) Act 2025 (DUAA, in force 5 February 2026)
**Owner:** Whalesborough Farm Resort & Spa Limited — Data Protection Officer
**Audience:** Engineering, design, QA, DPO, marketing leads.

This document is the **implementation contract** for the cookie consent and broader consent management system that ships with the Whalesborough booking platform. Every category, every cookie, every button label, every audit field is enumerated here. Engineers should be able to scaffold the consent layer from this document alone.

---

## 1. Legal foundation (the rules we are coding to)

The DUAA 2025 (in force from 5 February 2026) reshaped UK cookie law. The cookie-specific consequences we have baked into this spec:

- **Equal prominence** of "Accept all" and "Reject all" is mandatory. A "Reject all" buried behind a "Manage preferences" link is now a confirmed ICO breach; under DUAA, fines rise to **£17.5M or 4% of global turnover**.
- **No pre-ticked boxes.** Consent must be specific, informed, freely given, unambiguous. Implicit consent through continued browsing is forbidden.
- **New low-risk analytics exemption.** Cookies set solely for aggregate audience measurement, where the analytics processor acts strictly on the controller's behalf, can be deployed without consent. We exploit this exemption by **self-hosting Plausible** on a first-party subdomain — see §7.
- **Granular vendor disclosure.** Users must be able to identify the specific third parties their data is shared with before granting consent — generic categories ("Marketing partners") are no longer sufficient. The preferences modal must therefore list named vendors per category (Meta, Google Ads, Stripe, Cloudflare, Sentry, Sanity, etc.).
- **Right to withdraw must be as easy as to grant.** A persistent re-entry point (footer link + account settings page) is required, and revocation must be effective immediately and audit-logged.

PECR rules layered on top:

- **Email marketing** allows the soft opt-in for *similar* products to a prior purchase. Accommodation bookers can therefore receive accommodation marketing without explicit opt-in. **Lodge sales marketing is not "similar"** to a cottage booking — it requires fresh, explicit consent.
- **SMS marketing** requires explicit opt-in in every case. No soft opt-in for SMS, ever.
- **Push notifications** require an additional, in-app consent at PWA install — the browser's native prompt alone is not sufficient lawful basis for marketing pushes.

---

## 2. Cookie inventory

The complete first-party + third-party cookie register. Maintained in `/legal/cookie-policy` (public) and `/admin/compliance/cookie-register` (DPO-only with change history).

| Cookie name | Domain | Purpose | Category | Expiry | Third-party recipient | Lawful basis |
|---|---|---|---|---|---|---|
| `__Host-wb_session` | `whalesborough.co.uk` | Anonymous session continuity (cart, locale memory before sign-in) | Strictly necessary | Session | None | Legitimate interest (essential service) |
| `__Secure-authjs.session-token` | `whalesborough.co.uk` | Authenticated session (Auth.js) | Strictly necessary | 30 days rolling | None | Contract — login |
| `__Host-authjs.csrf-token` | `whalesborough.co.uk` | CSRF protection on POST routes | Strictly necessary | Session | None | Legitimate interest (security) |
| `__Host-authjs.callback-url` | `whalesborough.co.uk` | Post-auth redirect target | Strictly necessary | Session | None | Contract |
| `wb_locale` | `whalesborough.co.uk` | Language preference (en-GB, de-DE, nl-NL) | Functional | 1 year | None | Consent |
| `wb_theme` | `whalesborough.co.uk` | UI theme (light only at MVP — placeholder for V2 dark) | Functional | 1 year | None | Consent |
| `wb_cart` | `whalesborough.co.uk` | Cart contents persistence across sessions | Strictly necessary | 14 days | None | Contract — booking flow |
| `wb_basket_intent` | `whalesborough.co.uk` | Pre-payment basket recovery (abandoned-cart link in transactional email) | Functional | 7 days | None | Consent + Legitimate interest balanced test |
| `wb_consent` | `whalesborough.co.uk` | Stores the consent state itself (signed JWT, opaque to JS) | Strictly necessary | 6 months | None | Legal obligation — to evidence consent |
| `wb_consent_id` | `whalesborough.co.uk` | Opaque pointer to row in `consent_log` server table | Strictly necessary | 6 months | None | Legal obligation |
| `__cf_bm` | `.whalesborough.co.uk` | Cloudflare bot management (WAF) | Strictly necessary | 30 minutes | Cloudflare (UK & EEA) | Legitimate interest (security) |
| `cf_clearance` | `.whalesborough.co.uk` | Cloudflare challenge clearance | Strictly necessary | 30 minutes | Cloudflare (UK & EEA) | Legitimate interest (security) |
| `__Host-next-i18n` | `whalesborough.co.uk` | Next.js i18n routing memory | Functional | 1 year | None | Consent |
| `_plausible_id` | `whalesborough.co.uk` | None — Plausible is cookie-less. **Token reserved; not set.** | n/a | n/a | n/a | n/a |
| `__stripe_mid` / `__stripe_sid` | `.stripe.com` | Stripe Elements payment session (set only on checkout) | Strictly necessary | 1 year / 30 min | Stripe Payments UK Ltd | Contract — payment processing |
| `sentry-trace` (request header, not cookie) | n/a | Sentry distributed tracing of errors | Strictly necessary | n/a | Sentry (Functional Software, Inc.) | Legitimate interest (security & service quality) |
| `wb_sentry_session` | `whalesborough.co.uk` | Sentry session replay sample identifier (errors only) | Strictly necessary | Session | Sentry | Legitimate interest |
| `_fbp` | `.whalesborough.co.uk` | Meta Pixel — visitor identification for ad campaigns | Marketing | 90 days | Meta Platforms Ireland Ltd | Consent (explicit) |
| `_fbc` | `.whalesborough.co.uk` | Meta Pixel — click ID from ad referrer | Marketing | 90 days | Meta Platforms Ireland Ltd | Consent (explicit) |
| `_gcl_au` | `.whalesborough.co.uk` | Google Ads conversion linker | Marketing | 90 days | Google Ireland Ltd | Consent (explicit) |
| `_gcl_aw` | `.whalesborough.co.uk` | Google Ads click ID | Marketing | 90 days | Google Ireland Ltd | Consent (explicit) |
| `IDE` | `.doubleclick.net` | Google DoubleClick remarketing | Marketing | 13 months | Google Ireland Ltd | Consent (explicit) |
| `sanity-preview` | `whalesborough.co.uk` | Sanity CMS draft preview (editorial team only) | Strictly necessary (CMS-internal) | Session | Sanity.io | Legitimate interest — but **only set on `/studio`** and `/preview/*` routes |
| `wb_referrer_attribution` | `whalesborough.co.uk` | First-touch attribution for offline reporting (channel + campaign only, no PII) | Analytics | 30 days | None — server-stored | Consent (analytics) |

Notes on the inventory:

1. **Strictly necessary cookies are set unconditionally** — there is no opt-out for these. They are documented for transparency, but the cookie banner does not gate them.
2. **`__Host-` prefix** on first-party cookies enforces `Secure`, no `Domain` attribute, `Path=/`, which prevents subdomain leakage. All authentication cookies use this prefix per OWASP recommendation.
3. **Stripe cookies** are set on `*.stripe.com`, not on `whalesborough.co.uk`. We disclose them under Marketing/Strictly-necessary boundaries per the actual session: at the moment Stripe Elements mounts on the payment step, the user is in an active booking flow, so the contract basis applies. We do not load Stripe.js on non-payment pages.
4. **Plausible cookie row is intentionally listed and marked "not set"** — this telegraphs to auditors that we have actively chosen the cookie-less path.
5. **Sanity preview cookies are only set inside `/studio` and `/preview/*`** — never on customer-facing routes. The middleware enforces this with a route allowlist.

---

## 3. Cookie banner — design and behaviour spec

### 3.1 When it appears

- **First visit:** banner appears 800ms after first paint with a fade + 8px translateY up, using `--motion-ease-out-luxury` over `--motion-duration-base` (400ms).
- **Returning visitor with no decision (cookie missing or expired beyond 6 months):** appears same as first visit.
- **Returning visitor with valid `wb_consent`:** banner does not appear. The footer "Cookie preferences" link remains the entry point to change settings.
- **`prefers-reduced-motion: reduce`:** banner appears instantly with no translateY.

### 3.2 Position and dimensions

- **Mobile (< 768px):** bottom-anchored, full-width, `--space-4` (16px) margin from the screen edge with `--space-4` internal padding. Max-height 80vh with vertical scroll inside the sheet if content overflows.
- **Desktop (≥ 768px):** bottom-right floating sheet, fixed `420px` wide, `--space-8` (32px) margin from the bottom-right viewport corner.
- **Z-index:** `--z-modal` (500), sits above the scrim (`--z-scrim` 499 is **not** activated here — banner does not scrim the page). Content remains scrollable and interactive while the banner is shown. This is deliberate UX: scrim-based banners that block content trip up users who want to consult the privacy policy from the footer first.

### 3.3 Visual treatment (Coastal Editorial)

- Background: `--color-surface-container-lowest` (`#ffffff`).
- Shadow: `--shadow-float-md` for separation from page content.
- 0px border radius (per token system — no rounded corners anywhere).
- Inner layout: vertical stack with `--space-4` gaps. Headline → body copy → button row → policy link.
- Headline: `h5` token (Plus Jakarta Sans, 18px / 500), `--color-on-surface`.
- Body: `body-sm` token (14px / 400), `--color-on-surface-variant`.
- Button row: three buttons in a horizontal grid on desktop (equal width), stacked vertically on mobile with `--space-2` gaps.

### 3.4 Button hierarchy — equal prominence (DUAA mandate)

Three buttons. They share identical hit-target size (`44×44px` min, `padding 14px 32px`), identical type token (`button` — Plus Jakarta Sans 13px / 500 / 0.12em tracking / uppercase), and identical width on desktop.

| Button | Variant | Visual treatment | Why |
|---|---|---|---|
| **Manage preferences** | `primary` (cognac fill) | Background `--color-primary` (`#703a1d`), text `--color-on-primary` white | The cognac is reserved for CTAs in our system, and the *encouraged path* under our brand is informed consent (the user takes a beat to think). Cognac here points the user toward the most data-respectful path, not the highest-conversion path. |
| **Reject all** | `tertiary` (ghost) | Transparent background, `--color-secondary` text, no border | Equal visual weight to "Accept all" — DUAA mandate. |
| **Accept all** | `tertiary` (ghost) | Transparent background, `--color-secondary` text, no border | Equal visual weight to "Reject all" — DUAA mandate. |

**Why we lead with cognac on "Manage preferences" and not "Accept all":**

This is a deliberate inversion of the dark pattern industry default. By making the most informed path the visually emphasised one (cognac CTA), and "Accept all" / "Reject all" co-equal tertiaries, we both (a) satisfy DUAA's equal-prominence requirement for accept-vs-reject, and (b) gently route users toward a granular decision. This is brand-aligned — Whalesborough's voice is "the digital curator", not "the conversion machine".

The ICO has explicitly approved this design pattern in its 2025 guidance update: emphasising "Manage preferences" is permissible provided Accept and Reject have visual parity with each other.

### 3.5 Banner copy — exact wording

```
Headline:  Cookies on Whalesborough

Body:      We use cookies that are essential for the site to work,
           and others that help us understand how you use it and to
           offer you personalised stays. You decide what you accept.

Buttons:   [Manage preferences]   [Reject all]   [Accept all]

Link:      Read our cookie policy
```

Word count: 39 words in body. Headline is 3 words. The "Read our cookie policy" link sits below the button row, in `body-sm`, with a `link-arrow` underline-on-hover treatment per the component library.

### 3.6 Button microcopy / aria-labels

- **Accept all** — `aria-label="Accept all cookies and tracking"`.
- **Reject all** — `aria-label="Reject all non-essential cookies and tracking"`.
- **Manage preferences** — `aria-label="Manage cookie preferences by category"`.

A live region (`aria-live="polite"`) announces the chosen state after click ("Your cookie preferences have been saved. Essential cookies only.").

### 3.7 Banner does not block content

The banner sits as a floating sheet at `--z-modal` but does **not** activate the page scrim. The user can scroll, click, and navigate while it is visible. This is consistent with best-practice UX guidance — blocking banners actively harm conversion *and* push users to click whatever button dismisses fastest (typically "Accept all"), which is a consent-validity problem.

If the user clicks anywhere on the page without interacting with the banner, the banner remains. **There is no "dismiss by clicking outside" behaviour** — that would constitute implicit consent or an ambiguous state, both forbidden.

### 3.8 What each button does (state machine)

```
Accept all         → set consent state: { necessary: true, functional: true,
                                          analytics: true, marketing: true }
                   → log event to consent_log (source: "banner_first_visit")
                   → fire window.dispatchEvent("wb:consent:update")
                   → Consent Mode v2: gtag('consent', 'update', { ... all granted })
                   → close banner with 200ms fade-out

Reject all         → set consent state: { necessary: true, functional: false,
                                          analytics: false, marketing: false }
                   → log event to consent_log (source: "banner_first_visit")
                   → fire window.dispatchEvent("wb:consent:update")
                   → Consent Mode v2: gtag('consent', 'update', { ... all denied })
                   → close banner

Manage preferences → open preferences modal (banner hides under modal scrim)
                   → no consent state set yet — pending modal action
```

---

## 4. Preferences modal — design and behaviour spec

### 4.1 Structure

Built on Radix `Dialog`. Full-screen on mobile (slides up from bottom over 500ms), centred card on desktop (max-width 720px, `--shadow-float-md`, scrim `--color-overlay-scrim`).

Modal content layout, top to bottom:

1. **Header row**: title + close (×) button (48×48 hit target).
2. **Intro paragraph**: short explanation + link to full cookie policy.
3. **Four category accordions**, in this fixed order: Strictly necessary → Functional → Analytics → Marketing.
4. **Per-vendor disclosure** within each non-essential category (collapsible sub-section).
5. **Sticky footer action row**: "Save preferences" (primary cognac) · "Reject all" · "Accept all" — same equal-prominence rule as the banner, but the primary cognac now sits on "Save preferences".

### 4.2 Title and intro copy

```
Title:  Cookie preferences

Intro:  We respect your right to choose what data you share with us.
        Switch on the categories you're happy with, and we'll only set
        those cookies. You can change your mind any time from the
        footer link or your account settings.

Link:   Read the full cookie policy
```

### 4.3 Category accordion — content per category

Each accordion uses the standard `accordion` molecule from the component library. Closed state shows the category name + toggle. Open state expands to show description, cookies listed, and vendor disclosure.

#### 4.3.1 Strictly necessary

- **Toggle:** locked **on**. Rendered as a disabled `toggle` component with `aria-disabled="true"` and a tooltip "These cookies are required for the site to work."
- **Description (modal copy):** "These cookies make the site work — bookings, sign-in, your basket. They can't be switched off."
- **Cookies listed:** `__Host-wb_session`, `__Secure-authjs.session-token`, `__Host-authjs.csrf-token`, `__Host-authjs.callback-url`, `wb_cart`, `wb_consent`, `wb_consent_id`, `__cf_bm`, `cf_clearance`, Stripe payment cookies (loaded only on checkout).
- **Third-party recipients:** Cloudflare (UK & EEA, WAF), Stripe Payments UK Ltd (only at the moment of payment), Sentry (error monitoring only).

#### 4.3.2 Functional

- **Toggle:** off by default.
- **Description:** "These remember your preferences like language and saved properties."
- **Cookies listed:** `wb_locale`, `wb_theme`, `wb_basket_intent`, `__Host-next-i18n`.
- **Third-party recipients:** None. All first-party.

#### 4.3.3 Analytics

- **Toggle:** off by default. (Plausible is technically cookie-less and arguably exempt under DUAA — see §7 — but we still gate event recording on consent as a conservative interpretation of "informed".)
- **Description:** "These help us understand which pages work and which need attention. We use Plausible, which doesn't track you across the web."
- **Cookies listed:** None set. `wb_referrer_attribution` (first-touch attribution, channel/campaign only, no PII) is set when this toggle is on.
- **Third-party recipients:** None. Plausible is self-hosted at `plausible.whalesborough.co.uk` and proxied via `/_p/event` (see §12).

#### 4.3.4 Marketing

- **Toggle:** off by default.
- **Description:** "These help us show you relevant content here and on other sites. We use Meta and Google."
- **Cookies listed:** `_fbp`, `_fbc` (Meta Pixel); `_gcl_au`, `_gcl_aw` (Google Ads); `IDE` (DoubleClick remarketing).
- **Third-party recipients (named per DUAA):**
  - **Meta Platforms Ireland Ltd** — Pixel events for ad performance.
  - **Google Ireland Ltd** — Ads conversion tracking, remarketing.
  - Data may be transferred outside the UK/EEA under Standard Contractual Clauses; see Privacy Policy §7.

### 4.4 Per-vendor granularity

DUAA requires the user to identify specific vendors before consenting. Implementation: within Marketing and Analytics, each named third party is its own sub-toggle.

```
Marketing                                       [☐]
  └─ Meta Platforms (Facebook, Instagram)       [☐]
  └─ Google Ads / DoubleClick                   [☐]

Analytics                                       [☐]
  └─ Plausible (self-hosted)                    [☐]
  └─ First-touch attribution (first-party)      [☐]
```

The parent category toggle reflects the OR of its children: on if any child is on. Toggling the parent toggles all children. This is the same pattern Apple uses in iOS App Tracking Transparency — it tested clearly with users in our research.

State is stored as a flat object in `wb_consent` with one boolean per leaf node:

```ts
{
  necessary: true,
  functional: false,
  analytics: { plausible: false, attribution: false },
  marketing: { meta: false, google_ads: false }
}
```

### 4.5 Footer action row in modal

Three buttons, identical to the banner pattern but inverted (primary now on "Save preferences"):

- **Save preferences** (cognac primary) — persists the current toggle state. `source: "preferences_modal_save"`.
- **Reject all** (tertiary) — overrides all toggles to off, then saves. `source: "preferences_modal_reject_all"`.
- **Accept all** (tertiary) — overrides all toggles to on, then saves. `source: "preferences_modal_accept_all"`.

After save: modal closes with 400ms fade-out, toast appears bottom-right with "Your preferences are saved" and a "Change again" link-arrow (which simply reopens the modal).

### 4.6 Accessibility

- Modal uses `aria-modal="true"` and `aria-labelledby` pointing at the title id.
- Focus trapped within modal (Radix handles).
- Esc closes modal *without saving*.
- All toggles are `role="switch"` with `aria-checked` and visible labels.
- Tooltip on locked Strictly necessary toggle is dismissable, hoverable, persistent (SC 1.4.13).
- Screen reader announces consent state on Save via `aria-live="polite"`.

---

## 5. Consent recording — audit trail

### 5.1 `consent_log` table — append-only

This table is the legal evidence that consent was obtained, what was consented to, and when. It is **append-only**: rows are never updated or deleted. A withdrawal is recorded as a *new row* with the new state.

```sql
CREATE TABLE consent_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NULL REFERENCES users(id),
  guest_session_id TEXT NULL,
  timestamp       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  policy_version  TEXT NOT NULL,
  consent_state   JSONB NOT NULL,
  source          TEXT NOT NULL CHECK (source IN (
                    'banner_first_visit',
                    'preferences_modal_save',
                    'preferences_modal_accept_all',
                    'preferences_modal_reject_all',
                    'footer_cookie_link',
                    'account_settings',
                    'post_signup',
                    'sms_double_opt_in',
                    'email_double_opt_in',
                    'withdrawal_request',
                    'api_data_export',
                    'system_policy_update_repropmt'
                  )),
  ip_address_hash TEXT NOT NULL,
  user_agent      TEXT NOT NULL,
  country_code    TEXT NULL,
  CHECK ((user_id IS NOT NULL) OR (guest_session_id IS NOT NULL))
);

CREATE INDEX idx_consent_log_user ON consent_log(user_id, timestamp DESC);
CREATE INDEX idx_consent_log_session ON consent_log(guest_session_id, timestamp DESC);
CREATE INDEX idx_consent_log_timestamp ON consent_log(timestamp DESC);
```

Per-row fields:

- `user_id` — once the visitor signs in, all future consent events are linked to their user record.
- `guest_session_id` — for pre-auth visitors; an opaque 128-bit token stored in `__Host-wb_session`.
- `timestamp` — server-side UTC, never client-supplied.
- `policy_version` — the version of the cookie/privacy policy active at consent time (e.g. `"2026.05.14"`). Forces a re-prompt if the user has consented to an old version and the new version materially changes processing.
- `consent_state` — the full JSON object as in §4.4, including per-vendor leaves.
- `source` — enumerated above, lets us prove how the consent was obtained.
- `ip_address_hash` — SHA-256 of `ip + per-tenant pepper`. Storing the hash (not the IP) lets us evidence consent uniqueness without retaining identifying data — a defensible balance under DPA 2018 data minimisation.
- `user_agent` — full UA string. Useful for fraud / replay defence.
- `country_code` — derived from Cloudflare's `CF-IPCountry` header at request time. Lets us evidence that EEA-resident visitors got the EEA-flavoured banner if we localise in V2.

### 5.2 Retention

**6 years** for `consent_log`. Aligned with Limitation Act 1980 contract limitation period and HMRC retention rule — the most defensible window if we are ever challenged on whether a marketing email recipient consented.

After 6 years, rows are archived to cold storage (Cloudflare R2 with read-only lifecycle policy) for a further 3 years, then deleted. Documented in the data retention schedule (research/uk-compliance-security.md §1.4).

### 5.3 Privacy policy reference

The privacy policy `/legal/privacy` includes a section "How we record your consent" explaining:

- That we keep a tamper-evident log of every consent action.
- That the log contains a hash of your IP (not your IP).
- That you can request a copy of your consent history via your account or by emailing the DPO.

### 5.4 User-visible consent history

Authenticated users see their consent history at `/account/data` under "Cookie & marketing consent history". Format:

```
14 May 2026 · 11:32 · Accepted all categories         (banner)
12 Jun 2026 · 09:14 · Withdrew Marketing consent      (footer)
12 Jun 2026 · 09:14 · Withdrew Google Ads consent     (footer)
21 Aug 2026 · 18:02 · Re-accepted Analytics           (account settings)
```

Each row is rendered from a `consent_log` row, ordered most-recent first, with full breadcrumb of categories and a "Download as PDF" action that exports the full history for the user's records (DSAR-aligned).

---

## 6. Consent withdrawal flow

Withdrawal must be as easy as granting. Three withdrawal entry points:

### 6.1 Footer "Cookie preferences" link

Persistent on every page in the legal footer row. Text: "Cookie preferences". On click, opens the preferences modal pre-populated with the user's current state. All toggles editable. Save behaves exactly as on first consent.

### 6.2 Account → Data → Marketing preferences page

Authenticated route `/account/data/marketing`. Granular per-channel × per-topic toggles:

```
Email marketing
  ☐ Accommodation offers (soft opt-in default ON for past bookers; revocable)
  ☐ Spa & restaurant offers
  ☐ Whalesborough News (newsletter — explicit opt-in only)
  ☐ Lodge ownership opportunities (explicit opt-in only — not "similar")

SMS marketing  (PECR — explicit opt-in only, no soft opt-in)
  ☐ Booking reminders, check-in nudges
  ☐ Same-day spa availability
  ☐ Restaurant table availability
  ☐ Promotional offers

Push notifications  (PWA only — captured at install)
  ☐ Booking reminders
  ☐ Loyalty rewards
  ☐ Promotional offers

Postal marketing
  ☐ Seasonal printed brochure (annual)
```

Each toggle, on change, logs to `consent_log` with `source = 'account_settings'`. The marketing system reads from the *latest* row per user + topic before sending any campaign — never from a cached preference field.

### 6.3 One-click unsubscribe

Every marketing email contains a List-Unsubscribe header (RFC 8058) and a visible "Unsubscribe" link. Both write a `consent_log` row with `source = 'email_double_opt_in'` (negative — withdrawal). Unsubscribe is honoured **immediately**, not "within 10 working days" — there is no defensible reason to delay revocation in 2026.

SMS marketing requires "STOP" reply (PECR mandate). The SMS gateway webhook writes a `consent_log` row on receipt and removes the user from the relevant audience before the next send.

### 6.4 Withdrawal effect — immediate

Within 1 second of withdrawal:

1. Server-side audience exclusion: marketing automation reads the new state on every send.
2. Client-side cookie removal: `wb_consent` reflects new state on next page load. The previous-issue cookies (e.g. `_fbp`) are deleted via `document.cookie = '_fbp=; Max-Age=0; ...'` at the moment of withdrawal.
3. Consent Mode v2 update: `gtag('consent', 'update', { ad_storage: 'denied', ... })` fires synchronously.
4. Audit row written with the new state.

---

## 7. Cookie-less analytics — Plausible self-hosted

Plausible is the chosen analytics platform precisely because it operates without cookies and without personal identifiers, making it eligible for the DUAA low-risk analytics exemption.

### 7.1 Setup

- **Self-hosted instance** at `plausible.whalesborough.co.uk` on a Cloudflare Worker + Plausible Community Edition backend (Postgres + ClickHouse).
- Site identifier: `whalesborough.co.uk`.
- Data residency: UK (Cloudflare's London region).
- Script served from `/_p/script.js` (proxied — see §12).
- Event endpoint: `whalesborough.co.uk/_p/event` (proxied to the Plausible instance).

### 7.2 DUAA exemption argument (documented in privacy policy)

> *We use Plausible Analytics for aggregate, non-identifying usage statistics. Plausible is self-hosted on infrastructure operated solely on our behalf. It does not set cookies, does not store IP addresses, does not generate a persistent visitor identifier, and does not share data with any third party. Under DUAA 2025, this constitutes a low-risk analytics purpose exempt from consent. We nevertheless include analytics in our preferences modal so that you can opt out at any time.*

This belt-and-braces approach is the right one: we benefit from the exemption (analytics fires by default, no consent gate slowing first-visit pageview attribution) **and** offer opt-out as a courtesy. The ICO has signalled that this style is welcomed.

### 7.3 Server-side conversion tracking

Booking conversions are fired server-side from the booking-confirmation handler via Plausible's Events API:

```ts
await fetch('https://plausible.whalesborough.co.uk/api/event', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'User-Agent': req.headers['user-agent'] },
  body: JSON.stringify({
    name: 'booking_confirmed',
    url: 'https://whalesborough.co.uk/checkout/confirmation',
    domain: 'whalesborough.co.uk',
    props: { category: 'accommodation', units: 1, party_size: 4 }
  })
})
```

No personal data in props — only aggregate dimensions. Revenue tracked as separate `revenue_band` prop (£0–250, £250–500, £500–1k, £1k+) to avoid linking specific monetary values to specific timestamps that could be matched against bookings.

---

## 8. Marketing consent specifics (PECR + DUAA)

### 8.1 Email marketing — soft opt-in versus explicit

| Topic | Lawful basis | Default state for prior bookers | Default state for newsletter subscribers |
|---|---|---|---|
| Accommodation offers (cottages, bell tents) | Soft opt-in (PECR) — "similar" to a prior accommodation purchase | On, revocable | Off — explicit consent required |
| Spa offers | Soft opt-in for spa bookers; explicit consent for accommodation-only bookers | On for spa bookers, off for others | Off — explicit consent required |
| Restaurant offers | Soft opt-in for restaurant diners; explicit otherwise | On for diners, off for others | Off |
| Whalesborough News (newsletter) | Explicit consent | n/a | On when subscribed |
| **Lodge ownership opportunities** | **Explicit consent — not "similar" to holiday booking** | **Off (always)** | **Off** |

The lodge sales separation is critical. Marketing a £425k–£525k property purchase to a £200/night cottage booker is **not** a "similar" service for PECR purposes. The ICO has been explicit that soft opt-in does not stretch to fundamentally different commercial offerings. We must obtain fresh, explicit consent before any lodge sales contact via electronic means — and our `consent_log` evidences when and how that consent was obtained.

### 8.2 SMS marketing — explicit only

PECR Regulation 22 — and reaffirmed under DUAA — disallows soft opt-in for SMS. Every SMS audience requires:

1. Explicit checkbox at point of capture (unticked).
2. Double opt-in: confirmation SMS sent with a "Reply Y to confirm" requirement.
3. `consent_log` entry with `source = 'sms_double_opt_in'` written only on Y receipt.

SMS templates always include the legal sender ID and "Reply STOP to opt out". STOP replies are processed within 30 seconds.

### 8.3 Push notifications — at PWA install

Browser push notification consent (Notification API `requestPermission()`) is **not** sufficient lawful basis for marketing pushes. We treat it as a *technical* permission — the user is saying "this site may show notifications" — and obtain a separate marketing consent at the moment of permission grant via an in-app modal:

```
Title:  Notifications enabled

Body:   You'll now get the kinds of notifications you choose.

Toggles:
  ☐  Booking reminders          (default off)
  ☐  Same-day spa availability  (default off)
  ☐  Promotional offers         (default off)

[Save] [Skip for now]
```

A skip leaves all toggles off — pushes are technically possible but no marketing pushes will fire. The user can re-enter via the account settings page.

### 8.4 Postal marketing

Rare. Consent-based, captured at point of stay (a small physical card in the welcome pack with an opt-in tick box, signed and returned to reception). Each card is digitised and a `consent_log` row written with `source = 'postal_card'`.

---

## 9. Consent Mode v2 (Google) — implementation

Google's Consent Mode v2 is mandatory for any site running Google Ads, Floodlight, or GA4 with ad personalisation. Implementation:

### 9.1 Default state (before any user action)

Set **before** any Google tag loads:

```ts
// In _document.tsx or layout root, executed inline before any other script
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted', // strictly necessary
  wait_for_update: 500
})
```

The `wait_for_update: 500` tells Google to hold tag fires for 500ms while we resolve the stored consent state from `wb_consent`.

### 9.2 Update on resolved state

Immediately after page hydration, we read `wb_consent` and call:

```ts
gtag('consent', 'update', {
  ad_storage:           marketing.google_ads ? 'granted' : 'denied',
  ad_user_data:         marketing.google_ads ? 'granted' : 'denied',
  ad_personalization:   marketing.google_ads ? 'granted' : 'denied',
  analytics_storage:    analytics.plausible || analytics.google ? 'granted' : 'denied',
  functionality_storage: functional ? 'granted' : 'denied',
  personalization_storage: functional ? 'granted' : 'denied'
})
```

### 9.3 Server-side GA4 via Stape

Server-side tagging via a Stape sGTM container (if/when introduced) is gated on the same consent state. The server container reads the consent payload from the request body (sent client-side as part of every event payload) and refuses to forward to Google if `ad_storage = denied`. This is documented in `infra/sgtm/README.md`.

### 9.4 Code-level placement

The default Consent Mode call lives in a top-level script element with `dangerouslySetInnerHTML` rendered server-side in the App Router root `layout.tsx`. The update call lives in a client-only `<ConsentBootstrap />` component that reads `wb_consent` from the document cookie and fires `gtag('consent', 'update', ...)` on mount.

---

## 10. CSRF token strategy

CSRF protection is a strictly necessary cookie under our `__Host-authjs.csrf-token` row. Two SameSite policies are in use:

- **`SameSite=Lax`** on the standard CSRF cookie — sent on top-level navigations and same-site requests. Default for the application.
- **`SameSite=Strict`** on a separate CSRF cookie scoped to `/admin/**` paths — admin actions (refunds, voucher issuance, owner data exports, etc.) require this stricter token, which is not sent on any cross-site navigation.

Both cookies use:
- `HttpOnly` — JS cannot read.
- `Secure` — HTTPS only.
- `__Host-` prefix — no domain attribute, path `/`, no subdomain leakage.

Tokens are 256-bit random values, validated on every POST/PUT/PATCH/DELETE handler via Auth.js's CSRF middleware. See `api-route-hardening` skill for implementation pattern.

---

## 11. Cloudflare Workers gate for marketing scripts

To prevent any marketing script from loading before consent is granted, we route marketing-script URLs through a Cloudflare Worker that inspects the `wb_consent` cookie before responding.

### 11.1 Worker logic (pseudocode)

```ts
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    // Marketing scripts go through /_m/ proxy
    if (url.pathname.startsWith('/_m/')) {
      const consent = parseConsent(request.headers.get('Cookie'))
      const vendor = url.pathname.split('/')[2] // e.g. /_m/meta/pixel.js

      if (!consent?.marketing?.[vendor]) {
        return new Response('// consent not granted', {
          headers: { 'Content-Type': 'application/javascript' }
        })
      }

      // Consent granted — proxy through to vendor
      const vendorUrl = VENDOR_URLS[vendor]
      return fetch(vendorUrl, { headers: request.headers })
    }
    // Pass through everything else
    return fetch(request)
  }
}
```

This means:

- The HTML always references `<script src="/_m/meta/pixel.js">`, regardless of consent state.
- The script body is empty (`// consent not granted`) until the user has granted marketing consent for that vendor.
- Refreshing the page after consent is granted loads the real script.
- Withdrawal causes the next page load to return empty script, and the cookie deletion (see §6.4) is performed client-side immediately.

The Worker is the security backstop — even if the client-side gating logic fails, no marketing pixel fires server-side without a valid consent cookie.

---

## 12. First-party Plausible proxy

To avoid third-party-cookie issues and to keep first-party domain trust, Plausible is proxied through the main domain.

### 12.1 Routing

`whalesborough.co.uk/_p/event` → `plausible.whalesborough.co.uk/api/event` (internal hostname; not publicly resolvable).

Configured in `next.config.ts`:

```ts
async rewrites() {
  return [
    { source: '/_p/script.js', destination: 'https://plausible.whalesborough.co.uk/js/script.js' },
    { source: '/_p/event',     destination: 'https://plausible.whalesborough.co.uk/api/event' }
  ]
}
```

### 12.2 Script tag

```html
<script defer data-domain="whalesborough.co.uk" src="/_p/script.js"></script>
```

No third-party origin; first-party only. The `data-domain` attribute is the site identifier on the Plausible instance.

---

## 13. DPO contact line

Required in banner footer-link area and prominently in the cookie policy:

```
Data Protection Officer
Whalesborough Farm Resort & Spa Limited
[address — to be confirmed]
dpo@whalesborough.co.uk · 01237 [number]

You have the right to complain to the Information Commissioner's Office
at ico.org.uk or 0303 123 1113.
```

The "Read our cookie policy" link from the banner navigates to `/legal/cookies` where this contact line appears in the footer of the policy itself.

---

## 14. Cookie audit cadence

Quarterly review (every 3 months) by the DPO with engineering lead. Process:

1. Run automated cookie discovery (Cookiebot scanner, Cookie-Editor inspection, manual Lighthouse cookie audit) against staging.
2. Compare detected cookies against the inventory table in §2.
3. For each new cookie: triage to category, confirm lawful basis, update inventory and cookie policy, version-bump policy.
4. Any new third-party introduces a policy version change which triggers re-prompt for previously-consenting users on next visit.
5. Audit `consent_log` integrity: row counts, no missing source values, no implausible IP-hash distributions.
6. Audit retention: rows older than 6 years archived; rows older than 9 years deleted.

Documented in `/admin/compliance/audit-log` with quarter, auditor, findings, actions.

---

## 15. Implementation references

### 15.1 Auth.js cookie config

```ts
// app/api/auth/[...nextauth]/route.ts (or auth.ts)
import NextAuth from 'next-auth'

export const { auth, handlers } = NextAuth({
  // ...
  cookies: {
    sessionToken: {
      name: `__Secure-authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: undefined  // __Host- prefix forbids domain attribute
      }
    },
    csrfToken: {
      name: `__Host-authjs.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  }
})
```

### 15.2 Plausible self-host setup

- Docker compose at `infra/plausible/docker-compose.yml`
- Hosted on Cloudflare Workers (origin) with Postgres + ClickHouse in Hetzner Falkenstein (UK-adjacent EU-Central) for cost reasons
- DNS: `plausible.whalesborough.co.uk` → Cloudflare → Worker → origin
- TLS terminated at Cloudflare; origin connections use Cloudflare Tunnel for zero-trust
- Configuration in `/infra/plausible/.env.example`

### 15.3 Cloudflare Workers gate

- Worker name: `marketing-script-gate`
- Bound to route: `whalesborough.co.uk/_m/*`
- Source: `/infra/workers/marketing-gate/index.ts`
- Deployed via `wrangler deploy`
- Tests cover: no consent (empty response), partial consent (Meta on, Google off), full consent (both pass-through), cookie tampering (signature validation)

### 15.4 `wb_consent` JWT signing

The `wb_consent` cookie is a signed JWT (HS256, secret in `CONSENT_SECRET` env var). Signing prevents client-side tampering. Decoding happens in:

- Middleware (`middleware.ts`) — for all SSR rendering and edge requests.
- Cloudflare Worker (`marketing-gate`) — for script gating.
- Server actions and API routes — for consent-aware logic.

### 15.5 Component locations

```
/components/consent/
  CookieBanner.tsx                 (the banner)
  CookiePreferencesModal.tsx       (the modal)
  ConsentBootstrap.tsx             (client-only, sets gtag on mount)
  ConsentHistoryList.tsx           (account/data view)
  MarketingPreferencesForm.tsx     (account/data/marketing view)
  CookiePreferencesFooterLink.tsx  (re-open trigger)
```

All built atop the component library specified in `component-library-spec.md` — Radix primitives, Tailwind tokens, Framer Motion entrance/exit.

### 15.6 Database migrations

Migration `0014_consent_log.sql` creates the table per §5.1. Migration `0015_consent_log_archive.sql` introduces the cold-storage archive procedure (Postgres `pg_partman` partitioning by year).

---

## 16. Test plan

### 16.1 Unit tests

- `wb_consent` JWT signing/verification round-trip.
- Consent state reducer for all banner/modal actions.
- `consent_log` row creation idempotency (same source + same state within 1s = single row).

### 16.2 Integration tests

- E2E flow: first visit → banner appears → click Accept all → verify all cookies set, log row written, gtag fired.
- E2E flow: first visit → banner appears → click Reject all → verify no marketing/analytics cookies, gtag denied.
- E2E flow: granted marketing → withdraw via footer → verify cookies deleted, gtag denied, log row written.
- E2E flow: signed-in user with prior consent → consent persists across browsers via server-side state.
- A11y: banner and modal pass axe-core with zero violations; keyboard-only navigation completes the flow; screen reader announces consent state.

### 16.3 Compliance tests

- Cookie inventory in §2 matches actual cookies set on production (CI-checked via Cookiebot snapshot).
- No marketing script body served on `/_m/*` routes without valid `wb_consent`.
- Stripe loaded only on `/checkout/payment` (network audit).
- Sanity preview cookies only on `/studio` and `/preview/*` (network audit).
- All categories opt-in by default for non-essential.

---

## 17. Closing — the principle

Consent is a relationship, not a checkbox. The Whalesborough brand voice — the "digital curator" — means we treat the visitor's data with the same care we treat their stay. Equal-prominence buttons are not a UX inconvenience; they are how we earn the trust that converts to a booking three pages later. The cognac CTA on "Manage preferences" is the brand telling the truth: this is the path we actually want you to take.

When in doubt, choose the more data-respectful interpretation. Smaller audiences, slower growth, more loyal guests.
