# Whalesborough Farm Resort & Spa — Loyalty & Membership Architecture

**Document version:** 1.0 - May 2026
**Author:** Product/Architecture Spec for £500k booking app build
**Author audience:** Peake Management product team, Whalesborough leadership, CTO, finance
**Strategic context:** 83% revisit intent is currently uncaptured. A unified loyalty fabric is the single highest-leverage CRM intervention available. Estimated impact: +12-18% repeat revenue, +£280k contribution year 2, +£550k year 3.

---

## 1. Competitive Landscape

| Brand | Type | Entry tier (annual) | Top tier (annual) | Joining fee | Key earn mechanic | Strongest lock-in |
|---|---|---|---|---|---|---|
| Soho House (Every House) | Members club | £3,400 | £3,400 | £2,200 | Flat fee, status by tenure | Friends-invite caps, waitlist |
| Soho Friends | Adjacent | £100 | £100 | nil | Flat | 10% off stays & food |
| The Newt | Garden+estate | £62-79pp | Family £200 | nil | Flat, renewal voucher | RHS-style reciprocal gardens |
| Beaverbrook Coach House | Spa club | £4,000 | £4,000 | £1,000 | Flat, weekday | Capacity-capped roster |
| Bamford Club | Wellness | £2,475-3,500 | n/a | £825-1,500 | Flat | Class allocation |
| Birch (Selsdon) | Country club | £1,800 (£150/mo) | Family +£800 | £300 | Flat | Workspace + wellness blend |
| Watergate Bay Swim Club | Day/annual hybrid | Day £80-120 | Annual ~£1,200 | nil | Flat | Coastal scarcity |
| Carbis Bay Spa | Spa | ~£1,800 | ~£2,400 | £250 | Flat | Estate-resident roster |
| ESPA Life at Corinthia | Urban spa | £4,500 (Mind, Body & Soul) | £8,000+ | £1,500 | Flat | Treatment credit pool |
| The Pig Hotel | Boutique hotel | None formal | n/a | n/a | "Pruning" multi-night discount | Brand affinity only — gap in market |
| Marriott Bonvoy | Hotel chain | Silver (10 nights) | Ambassador (100 + $23k) | nil | 10pts/$ + tier bonus | Suite upgrades, lounge |
| World of Hyatt | Hotel chain | Discoverist (10) | Globalist (60) | nil | 5pts/$ + 30% bonus | Suite Upgrade Awards, Guest of Honor |
| IHG One Rewards | Hotel chain | Silver (10) | Diamond (70 / 120k pts) | nil | 10pts/$ + up to 100% bonus | Confirmable suites, milestone gifts |
| Six Senses Place (via IHG) | Wellness hotel | Place — TBC ~£3,000+ | n/a | Likely £500-1,000 | Hybrid (IHG points) | Wellness programming |

### Key learnings applied to Whalesborough

1. **Hybrid model wins.** The Marriott/Hyatt/IHG points-based earn structure converts every transaction into loyalty currency; the Soho House/Bamford flat-fee model creates premium identity. Whalesborough should combine both: free points-based "Circle" for all + paid subscription "W Club / Lakeside Local" overlays.
2. **The Pig has no loyalty programme.** Direct competitive whitespace for a brand-of-choice play in southwest premium hospitality.
3. **Joining fees signal seriousness.** £250-1,500 joining fees are standard in the £2k+ tier and reduce churn dramatically (sunk cost effect).
4. **Reciprocal access drives renewal.** The Newt's 17 partner gardens is the single most cited renewal reason; Whalesborough can replicate via curated southwest partners (National Trust regional, surf schools, fine-dining).
5. **Status quo beats points for the top 20%.** Hyatt Globalist's Suite Upgrade Awards and Guest of Honor are stickier than dollar-equivalent points. Patron-tier perks must be experiential, not transactional.

---

## 2. "Whalesborough Circle" — Master Loyalty Programme

### 2.1 Brand positioning

A free, automatic, transaction-driven loyalty fabric across every revenue stream (rooms, spa, restaurant, retail, events). The Circle is the glue beneath W Club and Lakeside Locals — every paid member is also a Circle member; not every Circle member is paid. Soft, editorial, on-brand naming. Currency: **"Acorns"**, an English-countryside metaphor evoking growth, longevity, return.

### 2.2 Tier ladder

| Tier | Threshold (rolling 12mo £ spend) | Implied behaviour |
|---|---|---|
| **Visitor** | £0-499 | First-stay or single restaurant visit |
| **Friend** | £500-2,499 | One short break or 4-6 dinners |
| **Member** | £2,500-7,499 | Two stays + spa, or quarterly diner |
| **Patron** | £7,500-19,999 | Annual ritual + spa member |
| **Founder** | £20,000+ OR lodge owner | Year-round household + ownership tier |

Tier review monthly. Tiers held for 12 months from earn date (Hyatt-style rolling, not calendar). Soft-landing rule: anyone within 90% of next-tier threshold at month 11 is auto-upgraded as a goodwill mechanism. Anyone dropping a tier receives a "win-back" voucher of equivalent value before downgrade.

### 2.3 Earn mechanics

- **Base earn:** 5 Acorns per £1 spent on accommodation, spa treatments, restaurant covers, retail, events, gift cards (Acorns earned on the gift recipient's transaction, not the buyer — UK gift card law alignment).
- **Tier multipliers:** Visitor 1.0x, Friend 1.1x, Member 1.25x, Patron 1.5x, Founder 2.0x.
- **Acorn value at redemption:** 100 Acorns = £1 (i.e. 5% baseline return rising to 10% at Founder). Industry benchmark: hotel programmes settle around 4-7%.
- **Channel modifier:** Direct booking via the Whalesborough app earns 1.2x; OTA-mediated bookings earn 0.8x. Pushes traffic away from Booking.com / Expedia commission.
- **Bonus events:** Triple Acorns on shoulder-season midweek stays (Tue-Thu, Nov-Mar excluding school holidays). Goal: revenue management lever, not pure marketing.

### 2.4 Tier benefits matrix

| Benefit | Visitor | Friend | Member | Patron | Founder |
|---|---|---|---|---|---|
| Acorn earn rate | 5/£ | 5.5/£ | 6.25/£ | 7.5/£ | 10/£ |
| Member rate on rooms (% off BAR) | — | 5% | 8% | 12% | 15% |
| Early booking window | std | 7-day early | 14-day early | 30-day early | 60-day early + waitlist priority |
| Late checkout | — | 12pm | 1pm | 2pm | 4pm guaranteed |
| Welcome amenity | — | water + cookies | local cheeseboard | bottle + tasting plate | sommelier-selected bottle + curated plate |
| Room upgrade (subject to avail.) | — | — | one-cat | one-cat confirmed 24hr | two-cat confirmed at booking |
| Spa retail discount | — | — | 5% | 10% | 15% |
| Restaurant priority | — | — | — | first-call new menu nights | dedicated table on request |
| Anniversary recognition (return-date gift) | — | — | yes | yes (£25) | yes (£75 + handwritten) |
| Birthday gift | — | £10 voucher | £20 voucher | spa add-on or dessert | dinner for 2 (one course free) |
| Complimentary treatment per year | — | — | — | 1x signature 60-min | 2x signature 90-min |
| Complimentary nights per year | — | — | — | — | 2 nights midweek shoulder |
| Friend-and-family rate (members only, 4 per yr) | — | — | yes | yes | yes (12 per yr) |
| Whalesborough Foundation invitation (annual private event) | — | — | — | yes | yes + plus-one |

### 2.5 Redemption catalogue

Acorns redeem 1:1 (100 = £1) against:
- Accommodation stays (any room category, any night — no blackout dates above Member tier)
- Spa treatments and day-spa entries (Member tier and above; Friend redeems on retail only)
- Restaurant covers at The Weir (Friend tier and above)
- Retail (shop, deli, wine list)
- Gift cards (issued to others — creates referral viral loop)
- "Acorn experiences" curated collection: hot tub turndown (500), private breakfast in lodge (1,500), alpaca-feeding private session (2,000), couples-massage upgrade (5,000), helicopter transfer to dinner (50,000 — aspirational/PR)

Blocked redemptions: third-party bookings (e.g. golf), gratuities, alcohol on dining bill below Member tier (UK licensing tidy-up).

### 2.6 Surprise & delight moments

- **First-stay welcome:** Handwritten note on arrival to every new Circle account.
- **5-stay milestone:** Bottle of Whalesborough Wine Estate house white delivered to home address.
- **Anniversary of first stay:** "A year ago today" SMS with one-tap rebook + 1.5x Acorns offer.
- **Tier-up moment:** Push notification + email with new perks unlocked + animation (Wallet "ring" thickens).
- **Birthday:** 7 days prior — voucher in Wallet; on-day — push if onsite.
- **Quiet-period nudges:** Founder/Patron only — concierge-style "the orchard is in blossom this weekend" notes; conversion 15-22% historically in comparable programmes.

### 2.7 Status match programme

Targeted accelerator: holders of Soho Friends, The Newt, Beaverbrook, Carbis Bay, Watergate Bay annual membership get **instant Member tier for 6 months** on first Whalesborough stay. Verification by photo of current membership card via in-app form. After 6 months, retention based on natural spend. Goal: poach the high-affinity SW England luxury-leisure consumer.

### 2.8 Referral mechanics

- Member-and-above tiers get a unique referral code in Wallet.
- New customer using code at first booking: gets £25 statement credit applied at checkout (only on bookings ≥ £200).
- Referrer earns 2,500 Acorns (£25 value) once referred guest completes their stay (12-month window).
- Hard cap: 10 referrals per Circle member per calendar year to prevent gaming.
- Patron and Founder tiers earn 5,000 Acorns per referral (incentivises high-LTV personal networks).

### 2.9 Expiry, pause, freeze

- Acorns: 24-month rolling expiry from earn date (exceeds UK 2-year regulatory "fair terms" guidance).
- Any qualifying transaction extends all Acorns to a fresh 24 months ("engagement extension").
- Tier: 12-month rolling; one-time "tier hold" available to members on bereavement, parental leave, serious illness — concierge-administered, not self-service.
- No fee for tier hold; max 12 months.

### 2.10 Communications cadence

- **Welcome:** Auto trigger on first transaction. Email + SMS + in-app onboarding (sets birthday, anniversary, communication prefs).
- **Statement:** Monthly email — current tier, Acorn balance, tier progress bar, expiry warnings, curated experience inspiration. Cohorted by tier.
- **Tier-up:** Immediate push + email; printed certificate posted to Patron/Founder.
- **Anniversary of first stay:** Annual.
- **Birthday:** 7 days prior + day-of.
- **Win-back:** 6, 9, 12 months no transaction — escalating offer ladder (5% / 10% / personalised invite).

### 2.11 Whalesborough Wallet (app home for loyalty)

A single screen accessible from app bottom-nav. Shows: current tier (animated ring + tier name), Acorn balance, progress bar to next tier with monetary delta, active vouchers, referral code, upcoming reservations, recent activity feed. Tier ring uses a brand-coded gold-to-bronze gradient. Wallet exports as Apple Wallet / Google Wallet pass on demand.

---

## 3. W Club — Spa Membership Tiers

W Club is the paid, recurring-revenue spa membership. Sits inside Circle (every W Club member auto-earns Acorns on monthly billing). Pricing positions Whalesborough between Bamford (£2,475) and Carbis Bay (~£1,800), well below Beaverbrook (£4,000), reflecting the resort's destination-not-urban geography.

| Tier | Monthly | Annual (paid up-front, 10% disc) | Joining fee | What's included |
|---|---|---|---|---|
| **Pool & Gym** | £85 | £918 | £75 | Pool, gym, sauna, steam — weekdays 7am-8pm; weekends from 10am. 4 guest passes/yr. |
| **Wellness** | £125 | £1,350 | £150 | All P&G + 1 group class/week + 5% off treatments + 10% off retail + 8 guest passes/yr. |
| **Signature** | £225 | £2,430 | £250 | All Wellness + 1 signature 60-min treatment/month + 15% off retail + 15% off treatments + unlimited classes + 12 guest passes/yr. |
| **Founder** (lifetime / inaugural cohort, capped at 100) | £4,500 one-off OR £15,000 lifetime | n/a | nil | All Signature in perpetuity (or 5 years for £4,500 option) + 2 treatments/mo + spa day for 2 with each stay + auto Patron Circle status + Founder dinner annually. |

### 3.1 Add-ons

- **Family add-on:** +£50/mo per partner; +£15/mo per child 12-17. Children under 12 free with member adult (subject to age-restricted hours).
- **Couples membership:** -10% on combined tier price (e.g. two Signature = £405/mo combined).
- **Trial day pass:** £45 weekday / £65 weekend, redeemable in full against joining fee within 14 days.

### 3.2 Freeze rules

- Up to 3 months/year freeze on Pool & Gym and Wellness; 6 months/year on Signature (reflecting higher commitment & life event tolerance).
- £15/mo freeze maintenance fee (covers locker, member ID, app access).
- Freeze must be applied with 14 days' notice via app or front-of-house.

### 3.3 Cancellation terms

- 3-month minimum term across all tiers (UK Consumer Rights Act-friendly with cooling-off period).
- 14-day full cooling-off refund from signup if no facility use.
- After minimum term: 1 calendar month notice, in-app or in writing.
- Founder: no refund post-cooling-off; transferable once to a family member.

### 3.4 Migration from existing Try.be memberships

Try.be members get a personalised migration letter 8 weeks pre-launch:
- Current Try.be plan mapped to equivalent W Club tier.
- Joining fee waived.
- First 3 months at current Try.be price (price-protected).
- Locked into current rate for 12 months (then standard renewal).
- Auto-enrolled into Circle at Member tier minimum (regardless of historic spend) as goodwill.

---

## 4. Lakeside Locals — Restaurant Membership Upgrade

The current "Lakeside Locals" perk (Monday discount only) is a CRM dead-end: it captures email but creates no recurring engagement.

### 4.1 Proposed structure

**Annual fee:** £35 (positioned as "less than two starters"). Sweet spot between The Newt's £62 and free email club.

### 4.2 Year-round benefits

- 10% off food bill, any service, any day (excludes alcohol — keeps margin protection).
- Free filter coffee with breakfast and lunch.
- Birthday: dessert on the house + 500 Acorns gifted to Wallet.
- Priority on event tickets (supper clubs, wine evenings, lobster nights, Christmas) — 48hr early access.
- 2 complimentary cocktails per year (one summer, one winter — drives off-peak visit).
- £10 voucher on renewal.
- Auto-enrolled into Circle at Friend tier (if not already higher).

### 4.3 Conversion mechanics

- Existing email DB (~estimate based on Monday-club signup over 24 months): convert 18-22% at £35.
- Upsell path: Lakeside Local → Circle Member → W Club Wellness. Visible in app: "Eat here often? Save £180/yr by joining W Club Wellness for £40 more per month."

---

## 5. Lodge Owner Programme

Owners of Trelowen, Tevi, Gwelva, and Bespoke lodges (£425-749k purchase) are the brand's highest-LTV cohort. They have already converted; the programme exists to maximise ancillary spend and retention to second-property purchase / referral generation.

### 5.1 Automatic entitlements (no fee)

- Auto-enrolment at **Circle Founder** tier from purchase completion (held for as long as ownership is current).
- **W Club Signature membership included** (saves £2,430/yr — material perceived value).
- **Lakeside Locals included** (saves £35/yr — token but useful).
- Owner concierge — named contact, dedicated email, WhatsApp line, average response < 2hr.
- Owner-only portal in app: rental income statements, occupancy, maintenance log, calendar block requests, household manual, smart-lock keycode reset.
- 25% discount on additional Whalesborough bookings (sister lodge for guests, hotel rooms for relatives) on top of Founder Circle benefits.
- Two private owner-only events annually: spring orchard supper, winter harvest dinner. Plus-one included.
- Priority spa booking window: 90 days (vs 60 for Founder).
- Quarterly owner newsletter from estate director with sustainability, harvest, brand updates.
- Complimentary use of estate vehicle (if available) for arriving guests of owners.

### 5.2 Rental pool mechanics

Owners enrolled in the managed-rental pool receive:
- Quarterly statement with occupancy %, gross, net, deductions itemised.
- Annual rental performance review with revenue optimisation recommendation.
- Owners earn Circle Acorns at 0.5x on their own personal-use nights (acknowledges revenue forgone).
- Repair/maintenance threshold (£500) auto-approved; above requires owner sign-off in-app.

### 5.3 Referral acknowledgment

Owner referring a new lodge buyer who completes: £5,000 statement credit applied to owner's annual service charge. Material incentive given £425k+ ticket price and demonstrated cohort behaviour (lodge owners typically refer 0.4-0.6 future buyers over 5 years per UK holiday-park data).

---

## 6. Cross-Programme Synergy Matrix

| You are... | You also automatically get... |
|---|---|
| Circle Patron (any source) | 10% off W Club annual; £25 off Lakeside Locals first year |
| Circle Founder (any source) | 15% off W Club annual; free Lakeside Locals first year |
| W Club member (any tier) | Min Friend Circle on joining; auto Member after 6mo |
| W Club Signature member | Min Member Circle; 1.25x Acorns on spa spend |
| Lakeside Local | Min Friend Circle |
| Lodge owner | Founder Circle + W Club Signature + Lakeside Locals — all included |
| Lakeside Local + W Club Wellness | "Both Worlds" badge in Wallet; +5% retail across resort |
| W Club + 4 stays in 12mo | Patron status fast-track at month 9 |

---

## 7. Gift Cards & Experience Gifts

### 7.1 Denominations & products

- **Cash-value cards:** £25, £50, £100, £250, £500, custom £ between £25 and £5,000.
- **Experience gifts (fixed price, redemption code):**
  - Spa Day for Two — £325
  - Hot Tub Lodge Weekend (2 nights, midweek, shoulder) — £495
  - Cream Tea + Alpaca Feed (2 adults, 2 children) — £85
  - Tasting Menu Evening for Two (incl. wine pairing) — £225
  - Signature Treatment & Lunch — £175
- **Bulk corporate / wedding:** Custom orders ≥ £1,000 — 5% volume discount, named-recipient personalisation, single invoice.

### 7.2 Delivery formats

- Digital (email-delivered PDF with QR code, scheduled send to recipient at chosen date — drives anniversary/birthday gifts).
- Premium printed card — kraft-paper envelope, hand-tied gold ribbon, posted in 5-7 working days (£4.50 add-on).

### 7.3 UK Gift Card regulation compliance

- Expiry: **24 months from purchase** (exceeds government 2-year recommendation).
- Terms displayed prominently at purchase, on the card itself, and at redemption page.
- 14-day cooling-off compliance for online purchases (Consumer Rights Act 2015) — refundable if unredeemed.
- Lost-card replacement: free if not redeemed; record held by Circle account or proof-of-purchase.
- Partial redemption supported (balance retained on card).
- VAT: Single-Purpose Vouchers (e.g. "Spa Day") VAT charged at issue; Multi-Purpose Vouchers (cash cards) VAT charged at redemption.

### 7.4 Marketing automation around gifts

- Buyer reminder: 7 days before chosen send date, "your gift to [name] sends tomorrow — anything to add?".
- Recipient reminder: 30, 60, 90 days before expiry — escalating tone, with one-tap booking.
- Repurchase nudge for buyer on the same date a year later — converts gift purchase into annual ritual.
- Failed redemption (e.g. dates unavailable): triggers concierge follow-up within 24hr.

---

## 8. Database / Data Model Implications

Core entities and key fields. Postgres via Supabase.

```
users (existing)
  id, email, phone, dob, communication_prefs, created_at

circle_accounts
  user_id (PK/FK), tier_current, tier_since_date, tier_held_until, acorn_balance,
  lifetime_spend_pence, rolling_12mo_spend_pence, first_transaction_date,
  status_match_source (nullable), referral_code (unique), referred_by_code (nullable)

acorn_transactions
  id, user_id, type (earn/redeem/expire/adjustment), amount_acorns,
  source_transaction_id, source_type (booking/spa/restaurant/retail/gift_card/manual),
  earn_rate_used, channel (app/web/ota/pos), occurred_at, expires_at, reversed_at

tier_history
  user_id, tier_from, tier_to, change_reason (auto/manual/freeze/winback), changed_at

w_club_memberships
  id, user_id, tier (pool_gym/wellness/signature/founder),
  billing_status (active/paused/cancelled/cooling_off), start_date,
  minimum_term_ends, current_period_end, joining_fee_paid_pence,
  stripe_subscription_id, stripe_customer_id, freeze_balance_days,
  family_addons (jsonb), couples_partner_user_id (nullable)

lakeside_locals_memberships
  id, user_id, status, start_date, renewal_date, stripe_subscription_id

lodge_ownerships
  id, user_id, lodge_id, ownership_type (sole/joint/syndicate),
  rental_pool_enrolled, purchase_completion_date, ownership_share_pct,
  concierge_contact_user_id

gift_cards
  id, code (unique), denomination_pence, balance_pence, type (cash/experience),
  experience_sku (nullable), purchased_by_user_id, recipient_email,
  recipient_name, message, send_at, redeemed_by_user_id (nullable),
  expires_at, vat_treatment (spv/mpv)

referrals
  referrer_user_id, referred_user_id, referral_code_used,
  status (pending/qualified/paid/expired), qualified_at, acorns_paid

surprise_events
  id, user_id, event_type (welcome/anniversary/birthday/milestone/winback),
  triggered_at, channel, redeemed
```

Indexes: composite on `(user_id, occurred_at)` for transactions; partial index on `acorn_transactions WHERE expires_at IS NOT NULL AND expires_at < now() + interval '30 days'` for expiry warnings. Materialised view `mv_user_loyalty_state` refreshed hourly for fast Wallet load.

Tier-recalculation job runs nightly: sums rolling-12mo spend, applies threshold, writes to `tier_history` on change, fires tier-up notification trigger.

---

## 9. Stripe Billing Setup

### 9.1 Products (created via Dashboard or Terraform)

- `prod_w_club_pool_gym` — Pool & Gym
- `prod_w_club_wellness` — Wellness
- `prod_w_club_signature` — Signature
- `prod_w_club_founder` — Founder (one-off + lifetime variants)
- `prod_lakeside_locals` — Restaurant membership
- `prod_w_club_family_addon` — per-member family addon
- `prod_w_club_joining_fee` — one-off SKU per tier
- `prod_gift_card` — Multi-Purpose Vouchers

### 9.2 Prices

Each W Club tier has two recurring prices: `monthly` and `annual` (annual carries 10% discount metadata). Joining fees as one-off invoice items added to first invoice. Founder lifetime as one-off charge with custom Stripe metadata flagging "lifetime_until: null".

### 9.3 Subscription configuration

- `collection_method: charge_automatically`
- `proration_behavior: create_prorations` on upgrades; `none` on downgrades after min-term.
- Pause: `pause_collection.behavior = "void"` (no invoices generated, no service via app gate).
- Trial: not used (paid trial-day-pass instead, accounted as separate one-off product).

### 9.4 Customer Portal

Enable:
- Update payment method
- View invoices
- Cancel subscription (with retention flow — Churnkey or custom)
- Update billing address
- Upgrade tier (downgrade gated to support to enforce min-term)

Disable:
- Pause (handled in-app to enforce 14-day notice & freeze fee logic; the Stripe portal pause is too permissive)

### 9.5 Webhooks (must-handle)

`customer.subscription.created/updated/deleted`, `invoice.payment_succeeded/failed`, `invoice.upcoming` (drives renewal-reminder emails), `customer.subscription.trial_will_end` (unused but configured).

### 9.6 Tax & VAT

Stripe Tax enabled. Gift cards: SPV (e.g. specific spa-day) charged 20% at issue; MPV (cash gift cards) charged at redemption. Memberships: standard rated 20%.

---

## 10. Comms & Lifecycle Automations

Stack: Resend for transactional, Customer.io or Klaviyo for lifecycle (Klaviyo preferred for richer segmentation given retail catalogue).

| Trigger | Channel | Timing | Audience |
|---|---|---|---|
| First Circle account created | Email + push | Immediate | All new |
| First stay completed | Email + handwritten note | Day after departure | All new stayers |
| Tier-up | Push + email + Wallet animation | Real-time on recalc | Tiered-up only |
| Tier-down (warning) | Email | 30 days pre-downgrade | At-risk |
| Acorn expiry warning | Email + push | 30 + 7 days | Holders with > 500 expiring |
| Birthday | Push (day-of) + email (7 days prior) | Annual | All Circle |
| Anniversary of first stay | Email + SMS for Patron+ | Annual | All Circle |
| W Club renewal upcoming | Email | 30, 7, 1 day | Annual W Club |
| W Club payment failed | Email + SMS + push | Day 1, 3, 7 of dunning | Affected |
| Win-back ladder | Email | 6, 9, 12 months silent | Lapsed |
| Gift card sent (to recipient) | Email | Scheduled send date | Recipients |
| Gift card expiry | Email | 90, 60, 30, 7 days | Recipients |
| Founder/Patron quarterly note | Hand-signed email | Quarterly | Top tier |
| Shoulder-season nudge | Push + email | 4 weeks out | Founder/Patron with no upcoming booking |

All comms respect quiet hours (08:00-21:00 local), unsubscribe granularity (transactional always sent), and dual-opt-in for SMS.

---

## 11. Launch Strategy

**Phase 0 (T-12 to T-8 weeks):** Build, internal test, staff briefing. Lodge owners briefed in person by estate director.

**Phase 1 (T-8 to T-4):** Soft launch to lodge owners (auto-enrolled at Founder). Migration letters to ~120 Try.be members + ~800 Lakeside Locals email subscribers.

**Phase 2 (T-4 to T-0):** Status match outreach campaign — paid social and influencer seeding targeted at SW England luxury consumers with Soho House / Newt / Beaverbrook affinity proxies. PR moment with regional press: "Whalesborough launches Circle — Cornwall's most generous loyalty programme".

**Phase 3 (T+0):** Public launch.

### Auto-enrolment rules at launch

| Existing relationship | Starting Circle tier |
|---|---|
| Lodge owner | Founder |
| Try.be Pool & Gym member | Friend |
| Try.be Wellness/treatments active member ≥ 12 months | Member |
| Lakeside Locals email subscriber | Visitor (with one-tap upgrade to paid Lakeside Local at £25 launch price, locked in for 12 months) |
| Past stayer (≥ 1 stay in last 24 months) | Visitor (with £100 spend captured retroactively as 500 welcome Acorns) |
| Past stayer ≥ £2,500 historic spend (matched on email) | Friend |
| Past stayer ≥ £7,500 historic spend | Member |

### Year-one targets

- 4,000 active Circle accounts (1,200 net-new + ~2,800 migrated/retroactive).
- 350 W Club members across tiers (vs ~190 currently on Try.be).
- 450 Lakeside Locals paid.
- 40 lodge owners auto-Founder.
- £180k recurring annual membership revenue.
- £85k incremental ancillary spend attributable to loyalty surfacing.
- Repeat booking rate up from baseline (~28% est.) to 38% by month 18.

---

## Sources

- [Soho House Membership Pricing](https://www.sohohouse.com/en-us/pricing)
- [Soho House Cost Guide 2026 (Candace Abroad)](https://candaceabroad.com/soho-house-membership-cost/)
- [Marriott Bonvoy 2026 Changes (Screened)](https://www.screened.com/blog/marriott-bonvoy-elite-status-changes-2026/)
- [Marriott Bonvoy Member Benefits](https://www.marriott.com/loyalty/member-benefits.mi)
- [World of Hyatt Tiers & Benefits](https://world.hyatt.com/content/gp/en/tiers-and-benefits.html)
- [IHG One Rewards Benefits Chart](https://www.ihg.com/content/us/en/customer-care/member-tc/2nd-page)
- [IHG Diamond Fast Track 2026 (LoyaltyLobby)](https://loyaltylobby.com/2026/01/21/ihg-diamond-tier-fast-track-8-nights-by-march-8-2026/)
- [Beaverbrook Coach House Spa Membership](https://beaverbrook.co.uk/spa/membership/)
- [The Newt in Somerset Membership](https://thenewtinsomerset.com/buy-membership)
- [Watergate Bay Swim Club Day Membership](https://watergatebay.co.uk/what-to-do/swim-club/day-membership)
- [Carbis Bay Estate Spa Membership](https://www.carbisbayhotel.co.uk/spa/spa-membership)
- [The Club by Bamford Membership](https://www.bamfordclub.com/club-membership)
- [Birch Selsdon Membership](https://www.birchcommunity.com/selsdon/membership/)
- [Six Senses & IHG One Rewards Guide (One Mile at a Time)](https://onemileatatime.com/guides/six-senses-ihg/)
- [ESPA Life at Corinthia London Membership PDF](https://www.corinthia.com/globalassets/hotel-london/documents/espa/corinthia-london-spa-booklet-membership-2025.pdf)
- [UK Gift Card Compliance Guide (Mondaq)](https://www.mondaq.com/uk/contracts-and-commercial-law/1346710/essential-guidelines-for-businesses-complying-with-uk-law-for-b2c-gift-cards)
- [Gift Vouchers — Consumer Rights (Which?)](https://www.which.co.uk/consumer-rights/advice/what-are-my-rights-with-gift-vouchers-and-cards-aCgOF7w7505Z)
- [Stripe Pause Subscriptions Documentation](https://docs.stripe.com/billing/subscriptions/pause)
- [Stripe Billing Customer Portal](https://support.stripe.com/questions/billing-customer-portal)
- [Lovat Parks Lodge Ownership Guide 2026](https://lovatparks.com/discover/your-guide-to-lodge-ownership-in-the-uk/)
