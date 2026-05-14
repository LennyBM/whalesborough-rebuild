# E-Commerce Architecture Spec
## Whalesborough Farm Resort & Spa — £500k Platform
*Prepared: 14 May 2026 — Peake Management*

---

## 0. Executive Summary

Whalesborough's e-commerce layer must move beyond a "shop bolted onto a brochure site" into a unified commerce graph where every product — a £8 jar of estate honey, a £290 spa ritual, a £2,400 lodge week with a £45 dog hamper — flows through a single cart, a single Stripe relationship, and a single guest order history. The recommendation: **a custom Next.js + Medusa.js commerce core, single Stripe account (no Connect), Stripe Tax for VAT determination, with a separate fulfilment domain for physical goods**. This avoids Shopify's editorial-design lock-in (rounded cards, "Add to Cart" language, Shopify checkout chrome) which would break Coastal Editorial, and avoids the multi-merchant overhead Stripe Connect imposes since all entities trade under a single Whalesborough VAT registration.

---

## 1. Product Catalogue Architecture

### 1.1 Category Tree

```
Whalesborough Commerce
├── Stay (booking engine — accommodation SKUs, see booking-spec.md)
├── Spa (booking engine — treatment SKUs, see booking-spec.md)
├── Dine (booking engine + £0 reservations)
├── Shop
│   ├── The W Club (spa retail)
│   │   ├── Gaia Skincare — Awakening / Balancing / Calming collections
│   │   ├── Bath & Body — salts, oils, candles, diffusers, room sprays
│   │   ├── Wellness Tools — gua sha, jade rollers, foam rollers, dry brushes
│   │   ├── Robes & Slippers — branded waffle, towelling, slippers
│   │   ├── Reading — wellness journals, breathwork cards, sleep stories
│   │   └── Gift Sets — curated bundles (Awakening Ritual, Sleep Sanctuary)
│   ├── Whalesborough Estate Made
│   │   ├── Apiary — single-hive honey, comb honey, honey gift boxes
│   │   ├── Distillery — Whalesborough Gin, gin & tonic kits, miniatures
│   │   ├── Botanicals — herbal teas, tisanes, dried flower bundles
│   │   ├── Preserves — chutneys, jams, marmalades, pickles
│   │   ├── Beeswax — pillar candles, taper sets, wraps, balms
│   │   ├── Apothecary — botanical face oils, balms, bath blends
│   │   └── Merchandise — caps, totes, sweatshirts, enamel mugs
│   ├── The Weir Provisions
│   │   ├── Cream Tea Kits — for 2 / 4 / 6, gluten-free option
│   │   ├── Bakery — sourdough subscription, fruit cakes, scones
│   │   ├── Pantry — oils, vinegars, salts, sauces, chutneys
│   │   ├── Cellar — Cornish wines, ciders, gin pairings
│   │   └── Hampers — Mini / Classic / Ultra / Build-Your-Own
│   └── Gift
│       ├── Monetary Gift Cards — £25 / £50 / £100 / £250 / custom
│       ├── Experience Vouchers — Spa Day, Lodge Night, Dinner-for-Two, Tractor + Lunch
│       ├── Membership Gifts — Lakeside Locals annual gift
│       └── Corporate — bulk vouchers, branded hampers, invoiced
├── Stay Add-Ons (attached to accommodation bookings)
│   ├── Welcome — hampers (Mini £35, Classic £75, Ultra £150), champagne, cream tea
│   ├── Grocery Boxes — Veg, Family, Gluten-Free, Plant-Based
│   ├── Family — cot, highchair, baby kit, toy bag
│   ├── Dog — welcome pack (£25), dog bed hire (£15), grooming voucher
│   └── Reservations — pre-book dinner, spa, tractor, fishing slot
└── In-Stay Services (only available with active reservation)
    ├── Mid-stay clean (£60)
    ├── Top-up grocery delivery
    ├── In-lodge spa treatments (Trelowen / Gwari only)
    └── Private chef (dinner for up to 8)
```

### 1.2 Product Data Model

Every SKU carries: `id`, `slug`, `category_path`, `name`, `subtitle`, `description_md`, `price_minor`, `compare_price_minor`, `vat_treatment` (standard/zero/reduced/exempt/SPV/MPV), `weight_g`, `dimensions`, `fulfilment_type` (digital/post/courier/collection/on_arrival/in_lodge), `inventory_mode` (tracked/untracked/made_to_order), `stock_level`, `low_stock_threshold`, `subscription_eligible` (bool), `gift_card_redeemable` (bool), `booking_attachable` (bool — can it be added to a booking?), `min/max_quantity`, `lead_time_days`, `images[]`, `editorial_long_form_md` (Coastal Editorial pattern), `provenance` (estate-made / curated / third-party), `allergens[]`, `dietary[]`, `seasonality[]`, `restricted_age` (18+ for alcohol).

---

## 2. Cart & Checkout Architecture

### 2.1 Single Unified Cart — The Single Most Important Decision

A guest must be able to add a 7-night Tevi lodge stay, an Ultra welcome hamper, a £290 facial pre-booked for day 3, a jar of honey to take home, and a £100 gift card for their mother — and check out **once**. Splitting carts (one for bookings, one for shop) destroys conversion and breaks the "digital concierge" promise.

**Cart object schema:**
```
cart {
  id, guest_id|anonymous_session,
  line_items: [
    { type: 'accommodation', unit_id, arrival, nights, guests, dogs, total, tax },
    { type: 'spa_treatment', therapist_id|any, slot_iso, duration, total, tax },
    { type: 'reservation', restaurant, slot_iso, covers, total: 0 },
    { type: 'physical_product', sku, qty, total, tax, fulfilment },
    { type: 'digital_product', sku, qty, total, tax, recipient_email },
    { type: 'addon', parent_line_item_id, sku, qty, total, tax }
  ],
  discounts[], gift_card_applied[], loyalty_points_applied,
  shipping_address, billing_address,
  totals { subtotal, vat_breakdown_by_rate, shipping, discount, total }
}
```

### 2.2 Atomic Composite Transactions

The trickiest interaction: a hamper attached to a booking. **Rule: if the parent booking fails (no availability, payment declined), every child add-on is rolled back too.** Implementation: wrap the entire checkout in a SAGA pattern — reserve inventory → reserve booking → tokenise card via Stripe PaymentIntent (manual capture) → on success, capture and confirm all lines → on any failure, release all holds.

### 2.3 Checkout Stack

Stripe Payment Element (Elements, not Checkout-hosted) embedded in our editorial-styled checkout. Hosted Checkout doesn't permit Newsreader Italic or bottom-border-only inputs. Apple Pay / Google Pay / Klarna offered through Stripe's Payment Element. Klarna only activated post-15-Jul-2026 with Consumer Duty compliance copy (see brief §7.2). Stripe Link for returning guests. 3DS2 mandatory.

---

## 3. Stripe Configuration

### 3.1 Single Account, Not Connect

All entities (Whalesborough Farm Resort Ltd, The W Club, The Weir) trade under one VAT registration and one bank. **Recommendation: single Stripe account.** Stripe Connect adds platform-fee overhead, KYC complexity, and 1099/T-bill reconciliation pain we don't need. If a future spinout (e.g., separate gin company) requires its own VAT, migrate that one product line to a Connect connected account at that point.

### 3.2 Stripe Tax

Enable Stripe Tax for automatic UK VAT determination by product tax code. Map each SKU to a Stripe Product Tax Code: `txcd_99999999` general, `txcd_40060003` (alcohol — beer/wine/spirits — standard 20%), `txcd_40050001` (cold takeaway food — zero), `txcd_40060001` (hot food / on-premises — standard 20%), `txcd_10000000` (digital gift card — out of scope of VAT at sale, applied at redemption — see §8.4).

### 3.3 Products vs Prices

Mirror our internal SKU catalogue into Stripe via `products.create` and `prices.create` (nightly sync). Use **idempotent upserts keyed by our internal SKU**. Variable prices (custom-value gift cards) use Stripe's `custom_unit_amount`. Subscription products use `recurring` prices.

### 3.4 Shipping Rates

Pre-defined Stripe Shipping Rates: `UK Standard 2-3 day £4.95`, `UK Next Day £8.95`, `Royal Mail Tracked 24 £6.95`, `Click & Collect at Whalesborough £0`, `On Arrival to Lodge £0`. Threshold-based free shipping over £75 (UK Mainland).

---

## 4. Inventory Model

### 4.1 Database Schema Additions

```sql
products(id, sku, category_id, name, slug, vat_code, fulfilment_type,
         subscription_eligible, gift_card_redeemable, booking_attachable, ...)
product_variants(id, product_id, sku, price_minor, weight_g, attributes_json)
inventory_locations(id, name)  -- 'estate_warehouse', 'spa_retail_floor',
                                  'weir_provisions_shop', 'cold_store'
inventory_levels(variant_id, location_id, on_hand, committed, available, low_threshold)
inventory_movements(variant_id, location_id, delta, reason, order_id, occurred_at)
gift_cards(id, code_hash, type[monetary|experience], face_value_minor,
           balance_minor, currency, issued_at, expires_at, recipient_email,
           sender_name, message, redemption_log_json, status)
voucher_codes(id, gift_card_id, code_hash, redeemed_at, redeemed_against)
subscriptions(id, customer_id, plan_id, status, next_renewal_at,
              shipping_address_id, billing_address_id, pause_until, cycles_completed)
```

### 4.2 Stock Strategy

Real-time decrement on order confirmation; soft-reserve at checkout intent (15-min hold). Estate-made small-batch items (honey from a specific hive, gin batch numbers) are tracked at the batch level. Sold-out behaviour: hide vs notify-when-back (per-SKU flag). Made-to-order products (custom hampers, corporate orders) skip inventory entirely and surface a lead-time field.

---

## 5. Order Lifecycle

```
draft → checkout_intent → payment_pending → paid → confirmed
     → picking → packed → dispatched → delivered → review_requested → closed
```

Booking lines branch: `confirmed → arrived → in_stay → departed → review_requested`. Failed states: `cancelled`, `refunded`, `partially_refunded`, `failed_delivery`, `returned`. Each transition emits a domain event consumed by: transactional email service (Resend), CRM (GoHighLevel), inventory ledger, analytics, and loyalty engine (points accrue on `delivered` / `departed`, not `paid` — fraud guard).

---

## 6. Fulfilment Workflows

| Category | Fulfilment | SLA | Handler |
|---|---|---|---|
| Gaia skincare | Dropship from Gaia warehouse | 3–5 working days | Gaia API webhook |
| Estate-made (honey, gin, candles) | Picked & packed at Whalesborough estate dispatch | 2–3 working days | In-house team via Shopify-style picklist UI |
| The Weir Provisions (perishable) | Picked Mon/Wed/Fri only, chilled courier (DPD Next Day) | Dispatch within 48hr | Kitchen team |
| Hampers (built-to-order) | Assembled per order at estate | 3–5 working days | Estate dispatch |
| Welcome hampers (pre-stay) | Placed in lodge before arrival | On arrival day | Housekeeping checklist |
| In-lodge spa treatments | Therapist dispatched to lodge | Scheduled | Spa rota system |
| Click & Collect | Held at Weir reception | 14-day collection window | Reception |
| Digital products (gift cards) | Email + PDF + wallet pass | Instant (or scheduled date) | Resend automation |
| Alcohol (gin, wine) | Age-gate at checkout (Stripe Identity optional), adult-signature delivery | 2–3 working days | DPD age-verified service |

Alcohol cannot be left unattended — DPD adult signature required.

---

## 7. Pre-Stay Add-On UX

**Insertion point:** Step 4 of the 6-step booking flow (Dates → Unit → Guests → **Curate Your Stay** → Details → Payment). Editorial layout — large hero per add-on, "From the Estate" tag, provenance copy. Add-ons surface as cards with a single primary button; selecting reveals a sheet with quantity / variant / scheduling. The cart drawer shows add-ons indented under their parent booking line ("Tevi 4 — 7 nights / + Ultra Welcome Hamper / + Cream Tea on arrival").

Post-booking, add-ons remain orderable from the guest portal up to **48 hours before arrival** (after which only in-stay services become available). Email nudges at T-21d ("Make your stay unforgettable…") and T-7d ("Last chance to pre-order…") drive conversion — target 30% add-on attach rate.

---

## 8. Gift Card Specification

### 8.1 Types

**Monetary** — face value, redeemable against any SKU including bookings. Multi-Purpose Voucher (MPV) under UK VAT law — VAT accounted for at **redemption**, not sale (the SKUs it ultimately pays for span 0% to 20% VAT).

**Experience** — fixed-scope ("Spa Day for Two", "One Night at Gwari", "Tractor Tour + Lunch"). Single-Purpose Voucher (SPV) if the entire scope is at one VAT rate — VAT accounted for at sale. Most experience vouchers will be MPV (mixed food / service / accommodation).

### 8.2 UK Compliance

Despite the brief referencing a "Gift Card Act 2023", **no such UK statute exists** — gift card terms are governed by the Consumer Rights Act 2015 (fair terms) and CPRs. Best practice:

- Expiry no shorter than 24 months from issue, prominently displayed at sale, on the email, and in the wallet pass
- "Where expiry dates are used, the Government strongly encourages at least two years" — we set **36 months** to exceed and signal premium
- Lost / damaged replacement policy published; balance retrievable from issuing receipt
- Refundable if unused **and** purchased online (Consumer Contracts Regulations 14-day cancellation window applies to gift cards delivered electronically only when not yet redeemed)
- Treat unspent balance as deferred revenue on the balance sheet, recognise on redemption or breakage

### 8.3 Anti-Fraud

16-character alphanumeric codes (Crockford Base32, no ambiguous chars), Argon2id hashed at rest, rate-limited redemption (5 attempts/hr/IP), single-active-session lock during redemption, audit trail of every check / redeem / partial-redeem event. Codes never appear in URLs or query strings. Apple/Google Wallet pass for friction-free in-resort use.

### 8.4 Mechanics

Partial redemption allowed (deducts from balance, prints residual). Top-up disallowed (each card is single-issue). Transfers between cards disallowed. Stackable with other discounts and other gift cards (cap of 3 per cart for AML hygiene).

---

## 9. VAT Strategy

Per HMRC, UK VAT applies as follows for our SKU mix in 2026:

| Category | Rate | Notes |
|---|---|---|
| Accommodation | 20% | Standard rate, with TOMS where applicable |
| Spa treatments | 20% | Standard-rated service |
| Restaurant on-premises food | 20% | Catering, always standard |
| Hot takeaway food / cream teas in-resort | 20% | Hot food = standard |
| Cold groceries delivered (welcome hampers, grocery boxes) | 0% | Most cold food zero-rated |
| Alcohol (gin, wine) | 20% | Always standard, plus alcohol duty already in COGS |
| Skincare, candles, books, robes, merchandise | 20% | Standard |
| Honey, preserves, herbal teas (consumable food) | 0% | Zero-rated |
| Children's clothing (if range expands) | 0% | Zero-rated |
| Monetary gift cards (MPV) | At redemption | Per VAT Information Sheet 09/18 |
| Experience vouchers (SPV) | 20% at sale | Where all goods/services are standard-rated |
| Postage & packing | Follows the product | Mixed-rate cart apportions |

Stripe Tax handles per-line determination; we display a single "VAT included" total on consumer-facing receipts (per UK convention) plus full breakdown on B2B invoices.

---

## 10. Shipping Rules

UK Mainland only at launch. Channel Islands, Isle of Man, Highlands & Islands surcharge. No international shipping in v1 — restricts complexity around alcohol export licences, food import rules per market, and Brexit paperwork. Phase 2 (2027): EU via Etsy-style "Local Pickup" partners. Phase 3: US, dropshipped via a third-party logistics partner.

Free UK shipping over £75. £4.95 standard (2–3 day). £8.95 next-day (order before 12:00 Mon–Thu). Alcohol always adult-signature (+£2 fee). Hampers above £100 always Next Day. Lodge pre-delivery free.

---

## 11. Returns & Refunds

| Category | Policy |
|---|---|
| Skincare, candles, books | 14-day distance-selling return, unopened only (hygiene exemption applies to opened skincare) |
| Robes, slippers, merchandise | 30-day return, unworn, tags attached |
| Estate-made food (preserves, honey, herbal tea) | Refund only if faulty or damaged in transit |
| Perishables (cream tea kits, bakery) | No return — refund/replace if faulty on arrival, photo required within 24hr |
| Alcohol | 14-day distance-selling return, unopened only |
| Hampers | 14 days if unopened; partial refund if some items unopened |
| Welcome hampers (delivered to lodge) | No return — refund only if not delivered as ordered |
| Gift cards (digital) | Refundable within 14 days only if no redemption activity |
| Bookings (accommodation, spa) | Per cancellation policy — separate spec |
| Experience vouchers | Refundable within 14 days only if unredeemed |

All refunds processed via Stripe Refunds API to the original payment method within 5 working days. Partial refunds supported per line item.

---

## 12. Subscription Products

Built on Stripe Billing. Three launch SKUs:

1. **Honey Club** — £18/month, single jar of single-hive honey, hive rotation, pause anytime, 12-month gift option (prepaid).
2. **Gin Club** — £45/quarter, one full-size bottle of latest Whalesborough Gin small-batch, tasting note card, age-gated (Stripe Identity at signup).
3. **Treatment Package** — £450 prepaid for 3x 60-min signature rituals at W Club, valid 12 months, bookable via guest portal, transferable once. Single up-front charge, not recurring.

Subscription portal: pause, skip-a-month, swap delivery address, update card, cancel. Dunning sequence: 3 retries over 7 days, smart retry, then email "we couldn't process your payment". Subscription churn target <5% monthly.

---

## 13. Reporting

Dashboard tiles required:

- **Revenue by category** — Stay / Spa / Dine / Shop, with sub-category drill-down, comparable to LY
- **Revenue by channel** — Direct / Landal / Booking.com / Sykes / OTA / gift card redemption
- **Top SKUs by revenue, units, margin** — surface slow-movers (cold-store risk)
- **Add-on attach rate by parent SKU** — which cottages drive hamper conversions?
- **Stock health** — low-stock, dead-stock (>90 days no sale), forecasted runout
- **Gift card liability** — outstanding balance, breakage, redemption velocity
- **Subscription MRR** — by plan, net churn, LTV, cohort retention
- **Tax remitted by rate** — for VAT return
- **Refund rate** — by category, by reason code, by SKU
- **Fulfilment SLA** — % shipped within promise, by carrier
- **Pre-stay add-on funnel** — booking → add-on view → add-on add → checkout

Exports to CSV / Xero / Sage. Plausible for traffic-to-revenue; Stripe Sigma for finance team SQL.

---

## 14. Build Recommendation

**Core:** Next.js 15 (App Router) + Medusa.js as headless commerce engine, Postgres, Stripe Payment Element, Stripe Tax, Resend for transactional email, Cloudflare R2 for image CDN, Algolia for product search. Avoid Shopify Hydrogen — visual lock-in violates Coastal Editorial; Plus pricing (£2,300+/mo) is wasted spend. Avoid Saleor — Python team overhead. Medusa.js keeps the entire stack in TypeScript, lets us own the schema, and Stripe handles every payment primitive natively. Reference patterns: **The Newt's farm shop** proves a country estate can run a substantial mail-order operation; **Daylesford** proves the editorial design language can co-exist with a transactional shop.

---

*Spec ready for engineering review. Open questions documented in `research/ecommerce-open-questions.md` (to follow).*
