# Stripe Products, Prices & Tax — Implementation Spec
## Whalesborough Farm Resort & Spa — £500k Platform
*Prepared: 14 May 2026 — Peake Management | Audience: build engineers + finance team*

---

## 0. Architecture Locks (Non-Negotiable)

| Decision | Value |
|---|---|
| Stripe account topology | **Single account**, NOT Connect |
| Primary currency | GBP |
| Tax engine | Stripe Tax (automatic) |
| Compliance posture | SAQ A (Stripe Elements only; never raw PAN) |
| Klarna availability | **Gated** until 15 July 2026 (FCA + Consumer Duty) |
| 3DS2 | Mandatory on all card charges |
| Reconciliation source of truth | Stripe webhooks → Postgres `payments` table |

All revenue streams (Stay / Spa / Dine / Shop / Activities / Lodge deposits / Memberships) flow through one Stripe account and are segmented downstream by `metadata.revenue_stream` rather than by Connect connected accounts. Rationale: every entity trades under one VAT registration (GB-prefixed Whalesborough Farm Resort Ltd VRN), one bank, one set of statutory accounts. Connect's platform-fee, 1099-K, and KYC overhead would buy nothing and cost weeks.

---

## 1. Stripe Account Setup

### 1.1 Account profile

| Field | Value |
|---|---|
| Legal business name | Whalesborough Farm Resort Ltd |
| Business type | Company — Private limited (Ltd) |
| Registered office | [Registered office, Bude, Cornwall] |
| Companies House number | [Whalesborough company number] |
| HMRC VAT registration | GB[VRN — to confirm] |
| MCC | **7011** — Lodging — Hotels, Motels, Resorts |
| Statement descriptor | `WHALESBOROUGH` (short: `WHALES BORO`) |
| Support email / URL | hello@whalesborough.com / whalesborough.com/help |
| Support phone | [Reception number] |
| Settlement currency | GBP |
| Settlement bank | [HSBC business current — to confirm] |
| Payout schedule | Rolling **T+2 daily** (industry standard for lodging) |
| Time zone | Europe/London |

A secondary statement descriptor is set per revenue stream via `statement_descriptor_suffix` on each PaymentIntent (e.g. `SPA`, `DINE`, `SHOP`, `LODGE-DEP`). Total descriptor length capped at 22 chars on consumer statements.

### 1.2 Payment methods enabled (live mode)

| Method | Status | Notes |
|---|---|---|
| Card (Visa/Mastercard/Amex) | Enabled day 1 | 3DS2 mandatory |
| Apple Pay | Enabled day 1 | Domain verification required (see §11) |
| Google Pay | Enabled day 1 | |
| Link (Stripe Link) | Enabled day 1 | One-tap returning-guest checkout |
| Bacs Direct Debit | Disabled v1 | Considered for membership renewals v2 |
| BNPL — Klarna | **Disabled until 15 Jul 2026**, then gated by feature flag with Consumer Duty copy (see §10) |
| BNPL — Clearpay / Affirm | Disabled — single BNPL provider keeps disclosure surface manageable |
| SEPA | Disabled — UK B2C only at launch |
| Wallet — Cash App Pay | Disabled |
| Wallet — Amazon Pay | Disabled |
| Bank transfer (manual reference) | Enabled for **lodge deposits only** via a separate flow (§3.4) |

### 1.3 Roles & access

Stripe Dashboard roles:
- **Owner:** Leonard (Peake Management) — initially; transfers to client finance director at handover.
- **Administrator:** Whalesborough finance manager.
- **Developer:** Engineering team (read + API key rotation).
- **Analyst:** Marketing/RevOps (read-only).
- **Support:** Front-of-house manager (read transactions + issue refunds up to £500).

MFA mandatory for all roles. API keys rotated quarterly; restricted keys used for any server lacking full Vault access.

---

## 2. Stripe Tax Setup

### 2.1 Tax registrations

| Jurisdiction | Type | VAT rate (standard) | Status |
|---|---|---|---|
| United Kingdom | VAT-registered | 20% | Active from go-live |
| EU (any) | None at v1 | n/a | UK B2C only |

Stripe Tax registration created in the dashboard at **Tax → Registrations → Add registration → United Kingdom**. UK VRN entered exactly as on the HMRC certificate (no spaces). Stripe Tax then automatically computes the right rate per line item using the product `tax_code`.

### 2.2 Tax behaviour and display

- `automatic_tax.enabled: true` on every PaymentIntent, Checkout Session, and Subscription.
- `tax_behavior: "inclusive"` on every Price object (UK convention: consumer-facing prices include VAT).
- B2C invoices show single VAT-inclusive total; B2B invoices (corporate hampers, weddings, retreat bookings ≥ £1,000) show breakdown by rate. A `customer.metadata.invoice_mode = "b2b"` flag toggles the inclusive/exclusive display via our PDF renderer (we do not use Stripe Invoices for B2C).

### 2.3 Tax codes by product category

The mapping below is the **canonical lookup** every Product creation call must use. Stored as a constant `STRIPE_TAX_CODES` in `lib/stripe/tax-codes.ts`.

| Whalesborough category | Stripe `tax_code` | UK rate | Notes |
|---|---|---|---|
| Accommodation (rooms, lodges, cottages) | `txcd_30060001` | 20% | Hotel / short-term lodging |
| Spa treatments & rituals | `txcd_20030001` | 20% | Standard-rated services |
| Spa memberships (W Club) | `txcd_20030001` | 20% | Standard-rated services |
| Lakeside Locals membership | `txcd_20030001` | 20% | Standard-rated service |
| Restaurant — hot food / on-premises | `txcd_40060001` | 20% | Catering, always standard |
| Restaurant — cold takeaway / cold groceries | `txcd_40050001` | 0% | Most cold food zero-rated |
| Restaurant — alcohol (bar, wine pairings) | `txcd_40060003` | 20% | Always standard |
| Retail — spa skincare, candles, robes, books | `txcd_99999999` | 20% | Standard general |
| Retail — estate-made honey, preserves, herbal teas | `txcd_40050001` | 0% | Zero-rated consumable food |
| Retail — alcohol (estate gin, wine) | `txcd_40060003` | 20% | Standard + alcohol duty in COGS |
| Activities — tractor tour, alpaca, fishing | `txcd_20030001` | 20% | Standard-rated service |
| Event tickets (supper club, wine evening) | `txcd_20030001` | 20% | Standard-rated service |
| Gift cards — MPV (monetary £25/£50/£100/£250/custom) | `txcd_10000000` | Out of scope at sale | VAT at redemption — see §2.4 |
| Gift cards — SPV (e.g. "Spa Day for Two") | Inherit destination code | 20% at sale | All-spa scope = standard |
| Lodge reservation deposit (£5,000) | `txcd_99999999` | Out of scope | Deposit on a property purchase — not VAT-able; flagged `tax_behavior: "exempt"` and reconciled outside Stripe Tax |

### 2.4 Voucher VAT (HMRC VAT Information Sheet 09/18)

- **MPV (Multi-Purpose Voucher) — monetary gift cards:** no VAT at sale. VAT recognised at redemption based on the SKU(s) the voucher pays for. In Stripe we use `tax_behavior: "exempt"` on the gift-card Price, and our internal redemption engine applies the correct VAT line at the moment the voucher offsets a basket. Stripe does not see the voucher value at redemption (we apply it as an off-Stripe discount and charge only the residual to Stripe).
- **SPV (Single-Purpose Voucher) — fixed-scope experience vouchers (e.g. "Spa Day for Two"):** VAT charged at issue, using the destination tax code. In Stripe these are standard products at 20%.

### 2.5 Reverse charge and B2B

Not used at v1. Configuration left at Stripe Tax defaults; if a future EU B2B sale occurs, we will set `customer.tax.validate_location` and `customer_tax_ids` per Stripe Tax docs.

---

## 3. Product Catalogue

### 3.1 Naming convention

Every Stripe Product `name` and `metadata.internal_sku` follows:

```
WB / {revenue_stream} / {category} / {sku}
```

Examples:
- `WB / Spa / Ritual / estate-restorative-60`
- `WB / Stay / Lodge / tevi-04`
- `WB / Shop / EstateMade / honey-single-hive-340g`
- `WB / Membership / WClub / signature-monthly`
- `WB / Dine / Event / supper-club-2026-06-14`

This is mandatory for finance team search in the dashboard. The `metadata.internal_sku` must equal the right-hand portion of the name verbatim so reconciliation joins cleanly.

### 3.2 Accommodation (34 Products)

One Stripe Product per accommodation unit. Pricing is **dynamic per night** — we do not pre-create Price objects for every (unit × date × occupancy) combination because that would mint millions of unused Prices.

Pattern:

1. Create Product once at platform setup (idempotent upsert on `metadata.internal_sku`).
2. On every booking, create a **one-shot Price** with `unit_amount_decimal`, `currency: "gbp"`, `tax_behavior: "inclusive"`, and metadata describing the stay (`arrival`, `nights`, `guests`, `dogs`, `rate_plan_code`).
3. Attach that Price to the PaymentIntent line item.

Stripe Product attributes (created once):

```json
{
  "name": "WB / Stay / Lodge / tevi-04",
  "description": "Tevi 4 — Three-bedroom lakeside lodge sleeping 6, dog-friendly, private hot tub",
  "tax_code": "txcd_30060001",
  "metadata": {
    "revenue_stream": "stay",
    "category": "lodge",
    "tier": "tevi",
    "internal_sku": "tevi-04",
    "occupancy_max": "6",
    "bedrooms": "3",
    "dog_friendly": "true"
  },
  "shippable": false,
  "url": "https://whalesborough.com/stay/lodges/tevi/tevi-04"
}
```

The 34 unit list is materialised from the units catalogue: 4 Trelowen lodges, 6 Tevi lodges, 4 Gwelva lodges, 12 cottages, 6 hotel rooms, 2 bespoke lodges (see `units.json` in the booking spec).

### 3.3 Spa — Treatments, Packages, Memberships

**Treatments (30 Products):** one Product per treatment. Treatments have **two Prices each** — weekday + weekend — because the pricing model is per-slot, not per-night. Both Prices are recurring=null (one-off) and `tax_code: txcd_20030001`.

Example:

```json
// Product
{
  "name": "WB / Spa / Ritual / estate-restorative-60",
  "description": "Estate Restorative — signature 60-minute full-body ritual",
  "tax_code": "txcd_20030001",
  "metadata": {
    "revenue_stream": "spa",
    "category": "ritual",
    "duration_min": "60",
    "internal_sku": "estate-restorative-60"
  }
}

// Price A — weekday
{
  "unit_amount": 14000,
  "currency": "gbp",
  "tax_behavior": "inclusive",
  "metadata": { "day_band": "weekday" },
  "nickname": "Estate Restorative 60 — Weekday"
}

// Price B — weekend
{
  "unit_amount": 16500,
  "currency": "gbp",
  "tax_behavior": "inclusive",
  "metadata": { "day_band": "weekend" },
  "nickname": "Estate Restorative 60 — Weekend"
}
```

**Packages (14 Products):** treated as bundles — single Product, single one-off Price, `metadata.contains` lists constituent SKUs for fulfilment.

**Memberships — W Club (4 tiers + 1 lifetime variant):**

| Tier | Stripe Product | Monthly Price | Annual Price | Joining Fee Price (one-off) |
|---|---|---|---|---|
| Pool & Gym | `prod_w_club_pool_gym` | £85/mo recurring | £918/yr recurring | £75 one-off |
| Wellness | `prod_w_club_wellness` | £125/mo | £1,350/yr | £150 |
| Signature | `prod_w_club_signature` | £225/mo | £2,430/yr | £250 |
| Founder (5-yr / lifetime) | `prod_w_club_founder` | n/a | £4,500 (5-yr) **or** £15,000 (lifetime) one-off | nil |

Recurring Price object pattern:

```json
{
  "currency": "gbp",
  "unit_amount": 12500,
  "tax_behavior": "inclusive",
  "recurring": {
    "interval": "month",
    "interval_count": 1,
    "usage_type": "licensed"
  },
  "nickname": "W Club Wellness — Monthly",
  "metadata": {
    "revenue_stream": "membership",
    "product_line": "w_club",
    "tier": "wellness",
    "cadence": "monthly"
  }
}
```

The joining fee is added to the **first invoice** via `subscriptions.create` with an `add_invoice_items` array referencing the joining-fee Price. The fee does not recur.

Family add-ons (`+£50/mo partner`, `+£15/mo child 12-17`) are separate recurring Products that are added as additional `items[]` on the same Subscription.

### 3.4 Restaurant

| SKU | Stripe Product | Price | Type |
|---|---|---|---|
| Restaurant pre-pay deposit (group ≥ 8) | `prod_restaurant_deposit` | `£25 per cover` via `custom_unit_amount` with min £25, max £100 | one-off |
| Event ticket — Supper Club | One Product per event (`prod_event_{slug}`) | Fixed per event, e.g. £85 | one-off |
| Event ticket — Wine Evening | One Product per event | Fixed | one-off |
| Lobster Night | One Product per occurrence | Fixed | one-off |
| Lakeside Locals annual | `prod_lakeside_locals` | £35/yr recurring | recurring `interval: "year"` |

### 3.5 Lodge Sales

**Critical:** The £400k–£749k lodge purchase **does NOT** flow through Stripe. It is solicitor-mediated with conveyancing trust account, AML checks, and Land Registry filing.

Stripe handles **only** the £5,000 reservation deposit:

```json
{
  "name": "WB / LodgeSale / ReservationDeposit",
  "description": "Reservation deposit — Whalesborough lodge purchase, refundable per Reservation Agreement",
  "tax_code": "txcd_99999999",
  "metadata": {
    "revenue_stream": "lodge_sale",
    "category": "reservation_deposit",
    "internal_sku": "lodge-reservation-deposit",
    "refundable": "true",
    "linked_to": "reservation_agreement_v1"
  }
}
```

Price: £5,000 fixed, one-off, `tax_behavior: "exempt"` (deposit on a property purchase is outside scope of VAT). PaymentIntent metadata must include `lodge_unit_id`, `reservation_agreement_id`, and `cooling_off_ends_at`.

### 3.6 Retail

One Product per SKU. Variants (sizes, scents, bundle options) modelled as separate Prices on the same Product, with `metadata.variant_label`. Inventory tracked in our DB, not Stripe.

Example with variants:

```json
// Product
{ "name": "WB / Shop / EstateMade / honey-single-hive", "tax_code": "txcd_40050001" }

// Price — 340g
{ "unit_amount": 1200, "metadata": { "variant_label": "340g jar" } }

// Price — gift box of 3
{ "unit_amount": 3200, "metadata": { "variant_label": "gift box of 3" } }
```

### 3.7 Activities

One Product per activity (tractor tour, alpaca feeding, guided fishing slot). Sessions are materialised nightly from our internal RRULE engine; we do **not** create a Stripe Price per session. Per-session pricing is `unit_amount` on a one-shot Price at booking time with metadata `{ session_iso, capacity_at_book, guide_id }`.

### 3.8 Gift Cards & Vouchers

- **Monetary (MPV):** Single Product `prod_gift_card_monetary` with `tax_behavior: "exempt"`. Five denomination Prices (£25, £50, £100, £250, £500) plus one custom-amount Price using `custom_unit_amount: { min: 2500, max: 500000 }`. Stripe issues the charge; our internal gift-card service issues the actual tokenised code (Crockford Base32, Argon2id hashed at rest — see ecommerce-spec §8.3).
- **Experience vouchers (SPV):** One Product per experience SKU (`prod_voucher_spa_day_for_two`, `prod_voucher_hot_tub_weekend`, etc.) with the destination tax code, tax recognised at sale.

**We do not use Stripe Gift Cards.** Native Stripe Gift Cards remain US-only at scale in May 2026 and don't meet our wallet-pass, partial-redemption, and UK-bookkeeping needs.

---

## 4. Customer Object Structure

We create a Stripe Customer for every paying guest, even unauthenticated checkout users (Stripe Customer created lazily on first successful PaymentIntent if no auth account exists; we set `metadata.is_guest = "true"` so we know to merge it if they later sign up).

```json
{
  "email": "guest@example.com",
  "name": "Eleanor Penrose",
  "phone": "+447700900123",
  "address": { "line1": "...", "city": "Truro", "postal_code": "TR1 1AA", "country": "GB" },
  "tax": { "ip_address": "203.0.113.1" },
  "metadata": {
    "whalesborough_guest_id": "g_01HXY...",
    "whalesborough_user_id": "u_01HXZ...",
    "is_guest": "false",
    "loyalty_tier": "member",
    "circle_acorn_balance": "4250",
    "marketing_consent_email": "true",
    "marketing_consent_sms": "false",
    "marketing_consent_recorded_at": "2026-05-14T09:21:00Z",
    "preferred_locale": "en-GB"
  }
}
```

Updates to consent or loyalty tier propagate via `customers.update` within 60 seconds of the change in our DB (debounced). The `tax.ip_address` field is required so Stripe Tax can pin VAT rate even where shipping address is absent (single-treatment spa bookings).

---

## 5. Payment Intent Creation Pattern

Single canonical PaymentIntent shape used across every revenue stream. Differences are encoded in metadata, not in code paths.

```ts
const intent = await stripe.paymentIntents.create({
  amount: total_minor,             // GBP pence, post-VAT (inclusive)
  currency: "gbp",
  customer: customerId,
  automatic_payment_methods: { enabled: true, allow_redirects: "always" },
  automatic_tax: { enabled: true },
  setup_future_usage: saveCard ? "off_session" : undefined,
  capture_method: usesSaga ? "manual" : "automatic",
  application_fee_amount: 0,       // explicit, even though not Connect
  statement_descriptor_suffix: descriptorFor(revenueStream),  // e.g. "SPA"
  description: humanReadable,       // see §14 search optimisation
  receipt_email: customer.email,
  metadata: {
    booking_id: booking.id,
    order_id: order.id,
    revenue_stream: "spa",          // stay | spa | dine | shop | activity | membership | lodge_sale | gift_card
    unit_code: "trelowen-02",        // accommodation unit OR spa treatment OR product SKU
    source_channel: "direct_web",    // direct_web | direct_app | landal | sykes | bookingdotcom | corporate_invoice | concierge
    idempotency_key: idemKey,
    saga_id: saga.id,
    wb_environment: process.env.WB_ENV
  },
  payment_method_options: {
    card: { request_three_d_secure: "automatic" },
    klarna: klarnaEnabled
      ? {
          preferred_locale: "en-GB",
          capture_method: "manual"
        }
      : undefined
  },
  expand: ["latest_charge"]
}, {
  idempotencyKey: idemKey
});
```

### 5.1 `automatic_payment_methods` vs explicit list

We use `automatic_payment_methods.enabled: true` for the marketing site + main checkout because Stripe's dashboard then governs the displayed methods (engineering doesn't have to ship code to enable Klarna on 15 Jul 2026; finance flips the dashboard switch + our feature flag).

For the **lodge deposit flow** we explicitly set `payment_method_types: ["card", "bacs_debit"]` because BNPL on a £5,000 property deposit is inappropriate.

### 5.2 SAGA pattern for composite carts

When the cart contains both a booking and add-ons, we use `capture_method: "manual"`. The flow:

1. Reserve inventory + booking holds in DB.
2. Create PaymentIntent with `manual` capture.
3. Client confirms PaymentIntent (3DS challenge if needed).
4. On `payment_intent.requires_capture` webhook, our orchestrator verifies all reservations are still valid, then calls `paymentIntents.capture(id)`.
5. If any reservation has expired in the interim (e.g. concurrent booker grabbed the last room), we call `paymentIntents.cancel(id)` and refund the guest with a friendly message.

Capture-or-cancel decision must complete within 7 days (Stripe's hold limit). Our orchestrator enforces 60 minutes.

---

## 6. Webhook Configuration

### 6.1 Endpoints

| Environment | URL | Signing secret env var |
|---|---|---|
| Production | `https://api.whalesborough.com/webhooks/stripe` | `STRIPE_WEBHOOK_SECRET_LIVE` |
| Staging | `https://api.staging.whalesborough.com/webhooks/stripe` | `STRIPE_WEBHOOK_SECRET_TEST` |
| Local dev | Stripe CLI forward | local secret |

Endpoints are SHA-256 signed. Verification uses `stripe.webhooks.constructEvent(body, sig, secret)`. Unverified events return 400 immediately. We accept retries; idempotency on the receiving side is keyed by `event.id` stored in `webhook_events` table with a unique constraint.

### 6.2 Subscribed events (see `stripe-webhook-events.json` for full handler matrix)

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.requires_capture`
- `payment_intent.canceled`
- `charge.refunded`
- `charge.dispute.created` / `charge.dispute.closed`
- `customer.subscription.created` / `.updated` / `.deleted`
- `customer.subscription.paused` / `.resumed`
- `customer.subscription.trial_will_end`
- `invoice.payment_succeeded` / `.payment_failed`
- `invoice.upcoming`
- `checkout.session.completed` (only if Checkout used — gift-card receiver flow)
- `setup_intent.succeeded` (saved card on file)
- `radar.early_fraud_warning.created`
- `payout.failed`

### 6.3 Handler responsibilities

Concise per-event responsibility list — full version in JSON file:

- **`payment_intent.succeeded`** → mark `payments` row PAID; confirm booking/order in DB; emit `booking.confirmed` or `order.placed` domain event; trigger Resend transactional email; accrue Acorns (Circle loyalty) once underlying delivery is fulfilled (NOT on payment, per fraud-guard rule in loyalty spec §5).
- **`payment_intent.payment_failed`** → release inventory holds; mark `payments` row FAILED with `last_payment_error` JSON; email guest with friendly retry CTA; if Klarna decline, scrub Klarna from re-offer for 24h.
- **`charge.dispute.created`** → freeze any remaining service (if guest still on property, alert duty manager via Slack); attach evidence package automatically (3DS authentication record, booking confirmation, in-stay logs); set `risk_review_required = true` on customer.
- **`customer.subscription.deleted`** → revoke member entitlements at `current_period_end`; do NOT remove Acorn balance.
- **`radar.early_fraud_warning.created`** → flag for finance manual review; pause any future scheduled fulfilment for the customer.

---

## 7. Idempotency Keys

### 7.1 Pattern

```
wb:{user_or_guest_id}:{booking_or_order_id}:{action}:{retry_seq}
```

Examples:
- `wb:u_01HXZ:b_01HX4:create_intent:1`
- `wb:g_01HXY:b_01HX5:capture:2`
- `wb:u_01HXZ:o_01HX6:refund:1`

### 7.2 Rules

- Generated server-side, never trusted from the client.
- Stored in `idempotency_keys` table with `expires_at = now() + 24h` (Stripe's window).
- Reused on retry of the SAME logical operation; never reused across operations.
- `retry_seq` increments on legitimate retries after Stripe returned a 5xx or network timeout. Same-key reuse with a different request body returns Stripe's standard idempotency violation error — we log and surface to engineering.
- Subscription create on tier upgrade: new idempotency key (it is a new logical operation, not a retry).

### 7.3 Rotation

Keys older than 24h are pruned nightly. A rotation breach (Stripe rejected with `idempotency_key_in_use`) is logged to Sentry with breadcrumbs of both calls for triage.

---

## 8. Refund Flow

### 8.1 Refund decision tree

```
Refund request
├── Within Stripe 180-day window?
│   ├── No → Use bank transfer + manual ledger entry
│   └── Yes ↓
├── Booking lifecycle stage?
│   ├── Pre-arrival, > 8 weeks out → 100% refund less £25 admin (cancellation policy)
│   ├── Pre-arrival, 4-8 weeks → 70% refund
│   ├── Pre-arrival, 2-4 weeks → 50% refund
│   ├── Pre-arrival, < 2 weeks → 0% refund unless concierge-discretion or rebooking
│   └── Post-stay → exceptional only, requires manager approval
├── Add-ons present?
│   ├── Hamper not yet dispatched → refund full add-on
│   ├── Hamper dispatched → returns flow per §11 of ecommerce-spec
│   └── In-stay services consumed → no refund on consumed portion
└── Retail returns → per category policy (ecommerce-spec §11)
```

### 8.2 API call pattern

```ts
await stripe.refunds.create({
  payment_intent: pi_id,
  amount: refund_amount_minor,   // partial supported; omit for full
  reason: "requested_by_customer",  // or "duplicate" / "fraudulent"
  metadata: {
    booking_id, order_id,
    cancellation_window: "8wk+",
    refund_policy_version: "v2026-05",
    approved_by_user_id: staff.id,
    restocking_fee_applied: restocking ? "true" : "false"
  }
}, { idempotencyKey: `wb:${userId}:${orderId}:refund:${seq}` });
```

### 8.3 Restocking fee logic

Applied as a **negative refund** rather than a separate charge: original payment £2,400; restocking fee £75; refund issued for £2,325; metadata captures the fee. Restocking fee shown explicitly on the refund-confirmation email and the Stripe-side description so the guest's bank statement reads "Refund WHALESBOROUGH £2,325" with no surprises.

### 8.4 Acorn / loyalty clawback on refund

On any refund, the `acorn_transactions` table is updated with a reversal entry equal to the negative of the original earn for the refunded portion. Reversal is automatic for full refunds and pro-rated for partial. If the customer has already spent Acorns earned from a refunded transaction, the balance can go negative — we cap clawback at the current balance and write the residual off as a loyalty marketing expense.

---

## 9. Subscription Mechanics (Memberships)

### 9.1 Creation

```ts
await stripe.subscriptions.create({
  customer: customerId,
  items: [
    { price: w_club_signature_monthly_price_id, quantity: 1 },
    ...familyAddons.map(a => ({ price: a.priceId, quantity: 1 }))
  ],
  add_invoice_items: joiningFeeAlreadyPaid
    ? []
    : [{ price: w_club_signature_joining_fee_price_id, quantity: 1 }],
  collection_method: "charge_automatically",
  proration_behavior: "create_prorations",
  automatic_tax: { enabled: true },
  trial_period_days: hasTrial ? 14 : undefined,
  cancel_at: undefined,
  metadata: {
    revenue_stream: "membership",
    product_line: "w_club",
    tier: "signature",
    minimum_term_ends: "2026-08-14T00:00:00Z"
  }
});
```

### 9.2 Pause / freeze

W Club allows freeze for up to 3 months/year (Pool & Gym, Wellness) or 6 months/year (Signature), with a £15/month maintenance fee. Implementation:

```ts
await stripe.subscriptions.update(sub.id, {
  pause_collection: {
    behavior: "mark_uncollectible",
    resumes_at: Math.floor(resumeDate.getTime() / 1000)
  },
  // and add a one-off freeze-fee invoice item for each paused month
});
```

`mark_uncollectible` rather than `void` so we preserve the audit trail of "would have charged" months. The freeze fee is invoiced separately via `invoiceItems.create` with the maintenance-fee Price.

### 9.3 Cancellation

- 14-day cooling-off (no facility use): immediate cancel + full refund.
- Within minimum 3-month term: blocked at API; UI explains why.
- Post-minimum-term: 1 calendar month notice → `cancel_at_period_end: true` with custom `cancel_at` if guest gave exact future date.

```ts
await stripe.subscriptions.update(sub.id, {
  cancel_at: cancelDate,
  cancellation_details: {
    feedback: feedback,        // optional UI capture
    comment: comment
  }
});
```

### 9.4 Tax on subscriptions

`automatic_tax.enabled: true` on every subscription. VAT computed against the Price's `tax_code` (`txcd_20030001`) and the customer's address. Stripe Tax fees apply (0.5% on tax-determined transactions); included in cost-of-software budget.

### 9.5 Failed payments / dunning

Smart Retries enabled in dashboard. Retry schedule: day 1, day 3, day 7. After final failure, subscription transitions to `past_due` → `unpaid`. Our app gates facility access on `subscription.status in ('active','trialing','past_due')` for 7 days post-fail, then revokes entitlement and emails escalation copy.

---

## 10. Klarna FCA Compliance Gate (15 July 2026)

### 10.1 Activation prerequisites — all must be true to render Klarna option

```ts
const klarnaEligible =
  process.env.WB_KLARNA_ENABLED === "true" &&
  new Date() >= new Date("2026-07-15T00:00:00Z") &&
  customer.date_of_birth_age >= 18 &&
  cart.subtotal_minor >= 5000 &&   // £50 Klarna floor
  cart.subtotal_minor <= 100000 && // £1,000 cap (Whalesborough policy, lower than Klarna's)
  !cart.contains_lodge_deposit &&
  !cart.contains_membership_recurring;
```

### 10.2 Consumer Duty copy injection

Adjacent to the Klarna option (not inside the iframe — Stripe Elements doesn't permit injection there; we render the disclosure card above the Element), the following copy renders **verbatim**, sourced from `lib/disclosures/klarna-v2026-07.ts`:

> Klarna is a regulated credit product. Missed payments may affect your credit file. Klarna performs an eligibility check. Choose Pay Later or Pay in 3 to spread your payment over 30 days or 3 instalments. Late fees may apply. Read Klarna's pre-contract information before continuing.

Plus a link to the affordability disclosure (`/legal/klarna-affordability`) and Klarna's own terms.

### 10.3 Audit trail

Every time a Klarna option is rendered, we log:

```ts
{
  event: "klarna_disclosure_rendered",
  user_id_or_guest_id,
  cart_id,
  disclosure_version: "2026-07-15-v1",
  rendered_at,
  ip_address,
  user_agent
}
```

Stored in `disclosure_log` table, retained 7 years (FCA SYSC retention). Required to evidence Consumer Duty fair-value, fair-information, and fair-treatment outcomes in any future FCA Section 165 information request.

### 10.4 DOB check

We do not ask for DOB at checkout (friction). Klarna-eligibility is determined from the guest's authenticated account if DOB is on file; if anonymous, we either skip Klarna entirely OR present a one-question DOB capture with explicit "We need to confirm you're 18+ to offer Klarna" copy and the user's choice is logged. Anonymous-Klarna disabled at v1 to avoid disclosure-loop edge cases.

---

## 11. Apple Pay / Google Pay Setup

### 11.1 Apple Pay

1. Apple Developer Account → register Merchant ID `merchant.com.whalesborough.web`.
2. Apple Developer → Identifiers → Apple Pay → register domains `whalesborough.com` and `book.whalesborough.com`.
3. Stripe Dashboard → Settings → Payments → Apple Pay → Add domain → upload `apple-developer-merchantid-domain-association.txt` to `/.well-known/` (served from edge).
4. Test in Safari on iPhone with a real card.

### 11.2 Google Pay

No domain verification required at the dashboard level; supported networks are inherited from card method config. We allow Visa, Mastercard, Amex (no Discover/JCB at v1).

### 11.3 Network support

| Network | Status |
|---|---|
| Visa | Enabled |
| Mastercard | Enabled |
| American Express | Enabled |
| Discover | Disabled (negligible UK volume) |
| JCB | Disabled |
| Diners | Disabled |
| UnionPay | Disabled (post-launch consideration if Chinese tourism returns) |

### 11.4 Statement appearance

`statement_descriptor: "WHALESBOROUGH"` for card statements. `statement_descriptor_suffix` per revenue stream (e.g. `"SPA"`, `"DINE"`).

---

## 12. Why NOT Connect

Documented explicitly so future architects don't second-guess.

- All entities (Whalesborough Farm Resort Ltd, The W Club, The Weir Restaurant Ltd, The Whalesborough Distillery Ltd) trade under one VAT registration and one bank.
- Connect adds platform-fee accounting, 1099-K equivalent (Stripe annual tax forms), KYC re-runs per connected account, and a separate dispute liability matrix — all overhead with zero offsetting benefit.
- Multi-entity revenue allocation is solved cleanly with `metadata.revenue_stream` and a nightly reconciliation job (§15) writing to the appropriate entity ledger in Xero.
- **Future trigger:** if Whalesborough spins out a separate gin company under its own VAT, we'd onboard that single product line to a Connect Custom account. Document this carefully; do not pre-build Connect plumbing speculatively.

---

## 13. Test Mode → Live Mode Migration Plan

### 13.1 Test mode build phase (weeks 1–10 of build)

- All engineering, QA, UAT in Stripe test mode using `sk_test_...` and `pk_test_...` keys.
- Test mode products created via the bootstrap script (see `stripe-products.json`, `stripe-prices.json`).
- Test cards documented in `docs/stripe-test-cards.md` — Visa OK, Visa 3DS challenge, decline, dispute, fraud-trigger, Klarna sandbox.
- Webhook endpoint deployed to staging, Stripe CLI forwards locally.

### 13.2 Pre-go-live checklist

- [ ] Live mode account verified by Stripe (KYC, KYB documents accepted).
- [ ] HMRC VAT number entered, Stripe Tax registration approved.
- [ ] Apple Pay domain verified on production domain (both `whalesborough.com` and `book.whalesborough.com`).
- [ ] Live API keys rotated into the production secret manager (Doppler / 1Password Secrets Automation). Test keys revoked from production env.
- [ ] Production webhook endpoint added with `STRIPE_WEBHOOK_SECRET_LIVE`.
- [ ] `stripe-products.json` re-run against live mode (idempotent on `metadata.internal_sku`).
- [ ] `stripe-prices.json` re-run against live mode.
- [ ] Statement descriptor approved by Stripe Risk (24–48h review).
- [ ] Klarna disabled until 15 Jul 2026 (feature flag verified).
- [ ] £1 live test transaction completed end-to-end, refunded immediately.
- [ ] Reconciliation cron pointed at live mode, smoke test passes.
- [ ] Sentry alerts wired on `payment_intent.payment_failed` rate spike.

### 13.3 Go-live day procedure

1. Switch DNS so `book.whalesborough.com` resolves to production.
2. Flip `WB_STRIPE_MODE=live` in production env.
3. Soft-launch with **lodge owners only** for 48 hours — internal cohort, named individuals, manual fraud watch.
4. Open to public.
5. Engineering on call for 7 days, finance reviewing reconciliation daily for 30 days.

---

## 14. Stripe Dashboard Search Optimisation

### 14.1 `description` field convention

Finance and front-of-house search the Stripe dashboard frequently. Every PaymentIntent's `description` follows:

```
{revenue_stream} | {guest_surname} | {unit_or_treatment_code} | {date_or_session}
```

Examples:
- `stay | Penrose | tevi-04 | 2026-08-14 7nt`
- `spa | Hammond | estate-restorative-60 | 2026-06-12 14:30`
- `dine | Jakes | supper-club-2026-06-14 | x4`
- `shop | Webster | honey-single-hive-340g x3 | retail-order-A1B2`
- `lodge-deposit | Mercer | tevi-future-01 | 2026-08-01`

Stripe dashboard search matches on description, so this format lets finance answer "find the £290 spa charge for Hammond on 12 June" with one search box query.

### 14.2 Metadata used in Sigma / Stripe-data warehouse joins

Every transaction carries `metadata.booking_id` or `metadata.order_id` allowing 1:1 join to our internal `bookings` / `orders` tables. Sigma queries (Stripe's SQL layer) join via these fields for finance analysis. Loyalty team joins on `customer.metadata.whalesborough_user_id`.

---

## 15. Reconciliation Strategy

### 15.1 The triangle: Stripe → our DB → bank

1. **Stripe is source of truth for payment status.**
2. **Our `payments` table is source of truth for fulfilment status** (was the booking actually delivered?).
3. **Bank settlement file is source of truth for cash received.**

### 15.2 Daily reconciliation cron (Inngest)

Triggered at 06:00 Europe/London:

1. Fetch all Stripe `balance_transactions` created between (yesterday 00:00) and (yesterday 23:59:59) Europe/London via the Stripe API.
2. For each, look up our `payments` table by `metadata.booking_id` / `metadata.order_id`.
3. Verify amount, currency, fee, net match.
4. Verify VAT line breakdown matches (Stripe Tax reports vs our internal calc).
5. Write reconciliation results to `reconciliation_log` with status `OK`, `MISMATCH`, or `MISSING`.
6. Mismatches and missings → Sentry alert tagged `finance:reconciliation` with severity `error` → routed to finance Slack channel.
7. Generate daily summary email to finance manager: total charges, refunds, disputes, net payout, VAT due.

### 15.3 Monthly close

End of each month, finance manager runs the close workflow:
1. Export Stripe payouts to CSV.
2. Match against `payments` table grouped by `revenue_stream`.
3. Push journal entries to Xero with class = revenue_stream value.
4. Reconcile bank statement against Stripe payouts.
5. Sign off VAT return.

### 15.4 Alerting

| Alert | Threshold | Channel |
|---|---|---|
| Webhook backlog | > 100 unprocessed | Sentry → PagerDuty |
| Reconciliation mismatch | any | Slack #finance |
| Reconciliation missing | any | Slack #finance + email |
| Failed payment rate spike | > 5% of last hour's intents | Sentry → engineering |
| Dispute opened | any | Slack #finance + email |
| Payout failed | any | Slack #finance + email |
| Webhook signature failure | any | Sentry critical |
| Klarna disclosure render failure | any | Sentry critical (compliance) |

---

## 16. Open Questions for Finance / Client

1. Confirm registered office address and Companies House number for Stripe KYB.
2. Confirm VAT registration number and any pending VAT-group additions.
3. Confirm settlement bank and account holder name exactly as on HMRC paperwork.
4. Confirm payout cadence preference (rolling T+2 vs weekly Monday).
5. Confirm whether wedding/event bookings ≥ £1,000 require B2B invoices via Stripe Invoices, or whether we continue using our own PDF renderer for those.
6. Confirm Klarna activation date plan — go live 15 Jul 2026 or stagger to August after FCA register entry is confirmed.
7. Confirm DOB capture policy for anonymous-Klarna eligibility (recommend: no anonymous Klarna at v1).

---

*Spec ready for engineering. Companion files: `stripe-products.json`, `stripe-prices.json`, `stripe-webhook-events.json`.*
