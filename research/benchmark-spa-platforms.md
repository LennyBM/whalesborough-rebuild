# Benchmark: Spa Booking + Retail + Membership Platforms
**For:** W Club spa module — Whalesborough £500k app build
**Date:** 14 May 2026
**Author:** Peake Management (Leonard Millard)

---

## 1. Platform Feature Matrix

Legend: **Y** = native / strong | **P** = partial / add-on | **N** = absent or weak | **?** = undocumented

| Feature | Mindbody | Boulevard | Mangomint | Booker | Vagaro | **Try.be (Trybe)** | Salonized | Treatwell | Phorest |
|---|---|---|---|---|---|---|---|---|---|
| Treatment booking (calendar + slots) | Y | Y | Y | Y | Y | **Y** | Y | Y (marketplace) | Y |
| Therapist selection at booking | Y | Y | Y | Y | Y | **Y** | Y | Y | Y |
| Digital intake / consent forms | Y | Y | Y (HIPAA) | Y | Y | **Y** | P | N | Y |
| Treatment / package builder | Y | Y | Y | Y | Y | **Y (dynamic packages)** | P | N | Y |
| Overnight / spa-break packages | P | N | N | N | N | **Y (Trybe Overnights)** | N | N | N |
| Memberships (recurring billing) | Y | Y | Y (2025 online) | Y | Y | **P (cannot freeze)** | P | N | Y |
| Membership freeze / pause | Y | Y | Y | Y | Y | **N (gap)** | N | N | Y |
| Gift vouchers (e-comm + scheduled delivery) | Y | Y | Y | Y | Y | **Y (branded)** | Y | Y | Y (£60 avg) |
| Retail e-commerce | Y | P | Y | Y | Y | **Y (auto-track stock)** | Y | N | Y |
| Customer accounts + treatment history | Y | Y | Y | Y | Y | **Y** | Y | Y | Y |
| Preferences / allergies stored | Y | Y | Y | Y | Y | **Y** | Y | N | Y |
| Loyalty points | Y | Y | P | Y | Y | **?** | Y | P | Y (strong) |
| Group / couples booking | Y | Y | **Y (2025)** | Y | Y | **Y** | P | N | Y |
| Class / wellness scheduling | Y (best-in-class) | Y | Y | Y | Y | **Y** | P | N | P |
| Waitlist | Y | Y | Y | Y | Y | **Y** | N | N | Y |
| Abandoned cart / re-engagement | Y | Y | Y (Flows) | Y | Y | **P (email/SMS only)** | Y | Y | Y |
| Staff rostering + commission | Y | Y | Y | Y | Y | **Y** | Y | N | Y |
| Retail inventory + reorder | Y | P | Y | Y | Y | **Y** | Y | N | Y |
| Reporting / analytics | Y | Y (AI) | Y | Y | Y | **Y (Power BI)** | Y | P | Y |
| Open API | Y | Y | P | P | P | **Y (best-in-class, open by design)** | P | P | Y |
| PMS integration | P | N | N | N | N | **Y (live availability across PMS/CRM/POS)** | N | N | N |
| Access-control hardware integration | P | N | N | N | N | **Y** | N | N | N |
| Branded mobile app | Y | Y | Y | Y | Y | **N (web-only)** | N | Y (Treatwell-branded) | Y |
| Couples / dual-therapist room logic | Y | Y | Y | Y | Y | **Y (space & place)** | N | N | Y |
| Hotel/resort orientation | P | N | N | N | N | **Y (purpose-built)** | N | N | N |

**Headline:** Try.be (Trybe) is the **only platform purpose-built for hotel-attached spas** with overnight package logic and PMS integration. Mangomint/Boulevard win on UX and modern membership UI. Mindbody is the heaviest/most comprehensive but feels dated. Phorest leads on loyalty and gift voucher conversion. Treatwell is a marketplace, not an operating system.

---

## 2. Try.be Detailed Audit — What Whalesborough Currently Gets

**Confirmed in-product:**
- Real-time online booking engine with live availability
- Dynamic spa packages + overnight/spa-break packages (Trybe Overnights)
- Space & place bookings (couples rooms, hammam, hydro pool — room+therapist resource logic)
- Gift vouchers (branded, integrated into guest journey)
- Promo codes
- Memberships with recurring billing + access-control integration
- Waitlist management
- Digital intake forms
- Email + SMS comms with customisable templates and delivery tracking
- Retail products + automatic stock tracking across spa/café/shop
- Kiosk + wearable payments
- Daily run sheets, staff scheduling
- Reporting with Power BI connector
- **Open API + webhooks** (the standout feature)
- Native integrations: PMS, CRM, POS, access control, ResDiary, TablePath, Power BI
- Deposit posting, revenue tracking, room-charging back to PMS

**Documented gaps:**
- **No membership freeze/pause** — flagged by reviewers as the #1 limitation. Critical for a £77/mo full-membership product where members travel, get injured, etc.
- **No branded consumer mobile app** (web-only client experience)
- Loyalty points programme not surfaced in marketing material — unclear if native
- Membership tier customisation reportedly shallow
- Some external integrations need manual intervention
- No native abandoned-cart e-commerce flow (only generic email/SMS)
- Marketing automation is templated email/SMS, not behavioural like Mangomint Flows or Mindbody triggered journeys

**Verdict on Try.be:** Solid operational backbone for spa+hotel; **weak consumer-facing UX layer** (no app, basic web booking flow, no abandoned-cart, dated card layouts in default templates). The API is the unlock.

---

## 3. Build-vs-Buy Recommendation

**Recommendation: HYBRID — Custom-build the W Club consumer module on top of Try.be's API.**

**Rationale:**

| Option | Verdict | Why |
|---|---|---|
| Rip & replace Try.be | **No** | Try.be already handles availability, room/therapist resource logic, PMS sync, stock — rebuilding 18 months minimum, £150k+ in dev, and operationally risky for an active spa with members and bookings already running. |
| Use Try.be's native booking widgets | **No** | Default widgets are functional but generic — they look like Try.be, not like a £100k Coastal Editorial luxury brand. Loses the entire reason for the £500k app. |
| **Hybrid: Try.be backend, custom front-end via API** | **Yes** | Keep the operational engine (availability, payments, PMS, stock, staff). Build the *consumer experience* (treatment menu storytelling, journey builder, membership portal, gift voucher e-comm, retail store) as bespoke Next.js on top of Try.be's open API. Bypass the platform UX limitations without ripping out the operational core. |

**Operational engine = Try.be** (availability, payments, PMS sync, staff, stock)
**Consumer & member experience = custom-built** (W Club app, web booking flow, member portal, retail store, gift voucher gifting flow)
**Loyalty + abandoned-cart + email journeys = custom-built** on top of Try.be webhooks + Klaviyo/Resend

**Custom-build effort estimate:** ~£90–120k of the £500k spa-module budget; the rest goes to accommodation booking (Landal), restaurant booking (Weir Kitchen — currently no system), and the unified guest account that stitches all three together. This positions the app as the *guest experience layer*, not a Try.be replacement.

**Membership freeze gap mitigation:** Build membership state machine in the custom layer (active / frozen / cancelled / lapsed) and use Try.be API to suspend billing + access — bridges the gap without waiting on Try.be roadmap.

---

## 4. Treatment Menu UX — Luxury Best Practices

**The word "treatment" is dead at the top end. Use "Ritual," "Journey," or "Experience."**

| Spa | Top-level noun | Sub-categories |
|---|---|---|
| ESPA Life Corinthia | Rituals | Nurture / Resilience / Reflection / Modern Alchemy / Vitality |
| Aman | Journeys | Grounding / Purifying / Nourishing — each with Massage / Polish / Face Ritual / **The Journey** (all three combined) |
| Mandarin Oriental | **Time Rituals** | Book time, not treatment — therapist customises live |
| Biome by Corinthia | Treatments (organised by **brand**) | Wildsmith Face / Body / Massage / Specialist + Augustinus Bader + Seasonal |
| Bamford Haybarn | Signature treatments | Each begins with grounding foot ritual → bamboo tapping → restorative massage |
| Cowshed | Treatments | Functional categories — Hydrafacial / Massage / Body / Facial / Hands & Feet / Lash & Brow / Specialty |
| The Newt | Spa Days + Treatments | Apothecary-led naming, garden-grown ingredients story |
| **W Club (current)** | **Rituals + Treatments** | **Gaia Rituals (Restore) / Facial (Relax) / Body & Massage (Unwind) / Hands & Feet (Unwind)** |

**Pattern winners:**
1. **Verb-based mood categories** (Restore / Relax / Unwind / Reset) over body-part categories (Face / Body). The W Club already uses this — keep it.
2. **Opening ritual mandatory** — every luxury spa opens with a foot ritual, breathwork, or tea. Build this into the booking flow narrative ("Your ritual begins with…").
3. **Therapist as expert, not commodity** — let the user *opt out* of selecting a therapist ("Let us match you") instead of forcing a selection. Mandarin's "book time not treatment" model is the gold standard.
4. **Brand-partner storytelling** — Biome leads with Wildsmith, W Club leads with Gaia. Each ritual has a product story.
5. **Add-ons as enhancements, not upsells** — "Enhance your ritual with…" framing (CBD oil, scalp massage, hot stones) reads as care, not commerce.
6. **Price visibility variance** — luxury sites *do* show prices (Biome £225–£350 visible), but only on the ritual detail page, not in card grids. Card grids show duration + mood, not "From £X."

---

## 5. Membership Pricing & Structure Patterns

**Industry benchmarks (May 2026):**

| Model | Monthly | What's included | Visit frequency |
|---|---|---|---|
| Soho Friends | £100/yr (~£8/mo) | 15% off treatments, 25% off retail | Pay-per-visit |
| Soho House Full | ~£150–£250/mo | 20% off treatments, 25% off retail, 3 guests | Pay-per-visit |
| US "Glow" tier | $99/mo | 1 signature facial + 10% retail | 1/mo included |
| US "Radiance VIP" | $149/mo | 1 advanced facial + 15% retail + priority booking | 1/mo included |
| US Premium / "Beauty Bank" | $79–$199/mo | Pre-paid credit balance ("beauty bank") used at any visit | Flexible |
| **W Club current** | **£47–£132/mo** | **Gym/pool/tennis + 15% spa + 1 PT session + parking** | **Unlimited facility** |

**Structural patterns:**
1. **Tiered (Bronze/Silver/Gold)** with escalating perks
2. **Credit / "Beauty Bank"** — pre-paid monthly credit redeemable against any service (psychologically powerful — drives the 2.9× visit-frequency stat)
3. **Hybrid** — fixed monthly perk (1 facial) + percentage off + retail discount + priority booking
4. **Annual companion tier** (Soho Friends model, £100/yr — low barrier, retail-heavy) sits alongside premium monthly

**Recommended W Club V2 structure:**
- **Tier 1 — Gym** £47/mo (existing, keep)
- **Tier 2 — Full** £77/mo single / £132/mo couples (existing, keep) + **add £10–£15 monthly spa credit** that rolls over 3 months
- **Tier 3 — Wellbeing** £159/mo — Full + 1 signature ritual/mo + 20% off treatments + priority booking + 10% retail + 2 guest passes/yr
- **Tier 4 — W Friends** £100/yr — 10% off treatments, 15% retail, 1 day pass/yr (retail-heavy, low barrier, marketing funnel)
- **Universal perks:** freeze up to 3 months/yr, transferable guest passes, members-only events (sound baths, breathwork mornings, supper clubs), 24h advance booking window over public

**Critical:** the freeze-membership feature is what Try.be can't do natively — build it custom.

---

## 6. Spa Retail E-commerce Patterns

**What luxury spas sell well online:**
- The exact products used in treatments (post-ritual purchase = highest converter)
- Curated bundles (Daily Ritual, Travel Ritual, Sleep Ritual)
- Gift sets (75% of Q4 spa retail revenue)
- Single-product hero pages with the brand story, ingredients, ritual-use video
- Subscription refills (monthly toner, weekly mask)

**Conversion tactics:**
1. **Use product images in treatment ritual pages** — link "Gaia Jade Facial" → "Take the ritual home: Gaia Jade Serum £45"
2. **Bundled discount** at checkout — buy 3 Gaia products, save 15%
3. **In-treatment QR codes** — therapist sends a basket to the guest's phone post-treatment
4. **Member discount displayed live** in PDP price ("Members £36 / Non-members £45")
5. **Reviews + UGC** — spa retail conversion lifts significantly with verified-purchase reviews
6. **Gift packaging upsell** — £8 for hand-wrapped, ribbon-tied with handwritten card
7. **Free local Cornwall delivery** above £75; collection at W Club; £4.95 UK shipping

**E-commerce stack recommendation:** Shopify-equivalent custom storefront on the Whalesborough app, *not* Shopify itself (single unified guest account is the whole reason for the £500k build). Stripe payments. Inventory synced to Try.be via API webhook.

---

## 7. Definitive W Club Module Feature List

This is the build spec for the spa module of the unified Whalesborough app.

### 7.1 Treatment Discovery & Booking
- Editorial treatment menu organised by **mood category** (Restore / Relax / Unwind / Energise) with hero imagery, brand-partner storytelling (Gaia), full ritual narrative
- Filter by: duration, price, mood, brand, therapist, pregnancy-safe, couples-eligible
- "Let us match you" path — no therapist selection required, system picks best fit
- Optional therapist selection with photo, bio, specialisms, languages, review count
- **Live availability via Try.be API** — calendar shows real slots, not a "request" model
- Smart slot suggestions: "Quietest time today," "Most popular," "Next available with [therapist]"
- 60s booking flow target — date → time → therapist (optional) → add-ons → checkout
- Add-on enhancements (scalp massage £15, CBD oil upgrade £25, hot stones £20) inline
- Guest-account checkout (no forced sign-up; member auto-applies discount)
- Confirmation: SMS + email + Apple/Google Wallet pass + add to phone calendar
- Pre-arrival intake form (allergies, skin concerns, music preference, pressure preference) — 24h before visit
- 24h reminder + check-in QR code in app
- Post-visit follow-up: rate ritual, rebook prompt, retail recommendations

### 7.2 Spa Day & Overnight Packages
- Branded package builder showing all 9 current packages (Galentines, Sunset, Sunrise, Spa Party, Swim Spa & Dine, Sunday Slow Down, etc.)
- Couples package logic — single basket, two intake forms, two therapists, two slots, one payment
- Group booking (Spa Party 8–12) with single organiser checkout + per-guest detail collection
- **Overnight packages** — accommodation + spa day bundled, availability synced to Landal API + Try.be API + Weir restaurant
- Lunch/dining credits applied at Weir Kitchen via shared guest account
- Package upsell at room booking ("Add a spa day from £80")

### 7.3 Memberships (V2 — 4 Tiers)
- 4 tier choice (Gym / Full / Wellbeing / W Friends)
- Stripe recurring billing (monthly + annual)
- **Custom freeze logic** (3 months/yr, member-initiated, suspends billing + access)
- Member portal: visit history, credit balance, guest passes remaining, treatment notes
- Auto-applied member discount across booking, retail, gift vouchers
- Members-only event calendar + RSVP
- Members-only treatment slots (early-access window)
- Waitlist management with position visibility (current spa has waitlist for all tiers — productise this)
- Annual renewal flow with one-click + perks summary email

### 7.4 Gift Vouchers (E-commerce)
- Voucher amounts: fixed denominations (£50, £75, £100, £150, £200, £300) + custom amount
- Voucher *experiences* (e.g. "Sunset Spa Day for Two") with auto-redemption flow
- Scheduled delivery — pick the recipient's email + delivery date/time
- Personalised message + sender name (BCC sender to prevent leakage)
- Choice of 4 visual designs (Birthday / Anniversary / Thank You / Just Because)
- Print-at-home PDF + branded physical card option (£5 add-on, posted in tissue paper)
- Recipient redemption: code-based or one-click through app
- Auto-apply at checkout (no code lookup faff)
- Balance tracking — partial-redemption supported
- Voucher analytics — average gift value (target £80+ per Phorest benchmark)

### 7.5 Retail Store
- Native Gaia product catalogue + future expansion (Weir Kitchen larder, Whalesborough branded)
- PDP: hero image, ingredients, ritual-use video, "Used in this treatment" cross-link
- Bundles + subscriptions (auto-refill every 4/8/12 weeks)
- Reviews + UGC photos
- Member-pricing badge live on PDP
- Free local Cornwall delivery >£75 + W Club collection + UK shipping £4.95
- Inventory synced to Try.be via webhook
- Abandoned-cart email sequence (custom — Try.be doesn't do this)

### 7.6 Classes & Wellness Sessions
- Yoga / Pilates / breathwork / cold dip / sound bath / supper clubs / running club
- Drop-in pricing + class packs + member inclusion
- Capacity-limited booking with waitlist
- Recurring class series (e.g. 6-week beginner yoga)
- Instructor profile pages

### 7.7 Customer Account (Unified Across All Whalesborough Apps)
- Single sign-on across stay (Landal) + spa (Try.be) + dining (Weir)
- Profile: photo, allergies, pronouns, preferences (pressure, aroma, music, temperature)
- Lifetime visit history (stays + treatments + dining)
- Saved payment methods (Stripe)
- Address book for gift voucher recipients
- Marketing preferences (granular consent — GDPR)
- Family member profiles (couples + kids for family stays)
- Data export + delete (UK GDPR right)

### 7.8 Loyalty Layer (Custom — Hybrid Points + Member Credit)
- Spend across stay + spa + dining accrues W Points
- £1 spent = 1 point; 100 points = £1 redemption
- Bonus points campaigns (double points midweek November)
- Members get 1.5× point multiplier
- Tier achievements (Bronze / Silver / Gold) based on rolling-12-month spend with perks (free hot tub session, free upgrade, priority booking)

### 7.9 Marketing Automation (Custom on Top of Try.be Webhooks)
- Abandoned-cart (treatment + retail) — 1h, 24h, 72h sequence
- Pre-arrival treatment upsell (3 days before stay arrival → spa booking nudge)
- Post-visit retail follow-up (24h after treatment → "Take the ritual home")
- Lapsed-member win-back (90 days no booking → free guest pass offer)
- Birthday treatment (members get £25 credit on birthday week)
- Seasonal campaigns (Mother's Day, Galentines, Father's Day, Black Friday gift voucher push)
- Klaviyo or Resend for delivery; events triggered from Try.be webhooks + app event bus

### 7.10 Operational Tools (Inherited from Try.be, surfaced in app)
- Staff app: daily run sheet, client preference notes, intake forms pre-loaded
- Stock alerts to managers
- Daily/weekly/monthly reporting dashboard with custom KPIs (utilisation, ADR, attach rate, member visit frequency)
- Commission tracking
- Power BI / Looker Studio connector for finance team
- Manual override booking (phone bookings, gifts redeemed in-person)

### 7.11 Compliance & Security
- UK GDPR + DPA 2018 — granular consent, data export, right to be forgotten
- PECR-compliant cookie banner — no pre-checked boxes, no cookies fire before consent
- Stripe Strong Customer Authentication
- Intake-form medical data treated as special-category data (UK GDPR Art 9)
- WCAG 2.2 AA throughout
- PCI-DSS via Stripe (no card data on Whalesborough infrastructure)
- Resend transactional email with SPF/DKIM/DMARC
- Rate limiting + honeypot on all public forms
- Encrypted at rest (intake forms, preferences)

---

## Sources

- [Mindbody spa software](https://www.mindbodyonline.com/business/wellness/hotel-spa-software)
- [Boulevard spa software](https://www.joinblvd.com/spa-software)
- [Mangomint 2025 features](https://www.mangomint.com/blog/best-new-mangomint-features-of-2025/)
- [Try.be hotel spa & leisure](https://try.be/hotel-spa-leisure)
- [Try.be API & integrations](https://try.be/us/api-integrations)
- [Try.be review on Hotel Tech Report](https://hoteltechreport.com/operations/spa-software/trybe)
- [Phorest spa software](https://www.phorest.com/us/industry/spa-software/)
- [Phorest gift vouchers](https://www.phorest.com/features/online-gift-vouchers/)
- [Vagaro memberships](https://www.vagaro.com/pro/memberships)
- [Treatwell partners](https://www.treatwell.co.uk/partners/)
- [Booker by Mindbody review](https://www.selecthub.com/p/spa-software/booker-by-mindbody/)
- [Salonized features](https://www.salonized.com/en/features/appointments-calendar)
- [ESPA Life at Corinthia treatments brochure](https://www.corinthia.com/globalassets/hotel-london/documents/espa/cl_spa-booklet-treatments-2025.pdf)
- [Biome by Corinthia treatments](https://www.corinthia.com/en-gb/london/spa-at-corinthia-london/treatments/)
- [Aman Spa wellness](https://www.aman.com/wellness)
- [Mandarin Oriental Time Rituals brochure](https://photos.mandarinoriental.com/is/content/MandarinOriental/MOBKK%20-%20Bangkok/PDFs/bangkok-spa-brochure.pdf)
- [Soho House pricing](https://www.sohohouse.com/en-us/pricing)
- [Cowshed treatments](https://spa.cowshed.com/us/treatments)
- [Bamford Haybarn Cotswolds](https://bamford.com/us/pages/haybarn-cotswolds)
- [The Newt spa](https://thenewtinsomerset.com/hotel/spa)
- [W Club Whalesborough memberships](https://www.wclubwhalesborough.co.uk/membership)
- [W Club spa day packages](https://www.wclubwhalesborough.co.uk/spa-day-packages)
- [W Club spa treatments](https://www.wclubwhalesborough.co.uk/spa-treatments)
- [Spa membership pricing 2026](https://www.meevo.com/blog/salon-spa-membership-models/)
- [Time picker UX best practices](https://www.eleken.co/blog-posts/time-picker-ux)
- [Gift card UX best practices](https://www.voucherify.io/blog/gift-cards-ux-and-ui-best-practices)
