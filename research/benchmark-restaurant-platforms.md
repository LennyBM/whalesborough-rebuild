# Benchmark: Best-in-Class Restaurant Booking & Management Platforms
**Prepared for:** The Weir Restaurant (Whalesborough Farm Resort & Spa) — £500k Booking App
**Date:** May 2026
**Status:** Module specification for "from-scratch" build

---

## 1. Executive Summary

The Weir Restaurant has **zero existing booking infrastructure** (walk-in only). This is rare in 2026 and a strategic opportunity: we can build a system that beats every UK boutique-hospitality competitor (Pig, Watergate Bay, Soho Farmhouse). The brief is to be **premium-tier** — comparable to SevenRooms (Soho Farmhouse, Mandarin Oriental, Jumeirah) without the £500–£1,500/month per-venue cost or the locked-in third-party diner network.

**Headline recommendation:** Build a **first-party reservation + ticketed-events + CRM module** inside the Whalesborough app, with a Stripe-based deposit/ticket engine, and integrate one third-party POS (Square or Toast) for kitchen/till sync. Avoid OpenTable's diner network — it commoditises the brand and charges per-cover fees. Use the SevenRooms playbook as the reference design.

---

## 2. Platform Feature Matrix

| Feature | SevenRooms | Tock | Resy | OpenTable Pro | DesignMyNight (Collins) | Mr Yum | Eat App | Yumpingo |
|---|---|---|---|---|---|---|---|---|
| Standard reservations | Yes | Yes | Yes | Yes | Yes | No | Yes | No |
| Ticketed / pre-paid dining | Yes | **Best-in-class** | Yes (post-Tock merge) | Yes (2% fee) | Limited | No | Limited | No |
| Tasting menu / experiences | Yes | **Best-in-class** | Yes | Yes | Limited | No | No | No |
| Private dining / events | Yes | Yes | Yes (Experiences) | **Strong** (PD discovery) | Yes (Access Tonic) | No | Basic | No |
| Waitlist (digital) | Yes | Yes | Yes (24/7, "Notify") | Yes | Yes | No | Yes | No |
| Pre-orders for groups | Yes | Yes | Limited | Yes | Yes | Yes | Limited | No |
| Gift cards | Via partner | Yes | Limited | Via partner | Yes | Yes | Via partner | No |
| Takeaway / collection | Limited | Yes | No | Limited | Limited | **Best-in-class** | No | No |
| QR menu / order-at-table | No | No | No | No | No | **Best-in-class** | No | No |
| Guest CRM / preferences | **Best-in-class** (auto-tags, allergies, occasions, 360° profile) | Good | Good (Amex data) | Good (richer with Amex partnership) | Basic | Built-in | Strong | Feedback-only |
| Loyalty / membership | **Best-in-class** | Limited | Amex-tied | Limited | Reward points | Yes | Limited | No |
| Marketing automation | **Best-in-class** (birthday, anniversary, win-back) | Limited | Network-driven | Strong | Email + SMS | Yes | Strong | No |
| Reviews / feedback | Via integration | Limited | Yes | Yes | Yes | Via integration | Via integration | **Best-in-class** |
| Sommelier / wine pairing | Custom | Yes (tasting model) | No | No | No | Yes (digital menu) | No | No |
| POS integration | 65+ POS | Square, Toast | Toast, Square | 100+ POS | Access POS | Square, Toast | Square, Lightspeed | Toast, Omnivore |
| Kitchen Display (KDS) | Via POS | Via POS | Via POS | Via POS | Via POS | Native | Via POS | No |
| Reporting / analytics | **Best-in-class** | Strong | Good | Strong | Good | Strong | Strong | **Best-in-class** (sentiment) |
| Pricing model | £500–£1,500/mo + setup | £200–£900/mo + 2% on tickets | £249–£899/mo + cover fees | $149–$499/mo + £1–£1.50/cover + 2% | £79–£249/mo | Transaction-based (~3%) | Free–£199/mo | Enterprise |
| UK market fit | Mid (US-led) | US-led | US-led | Strong | **Strong (native UK)** | Mid | Strong | Strong |

---

## 3. SevenRooms Deep Dive (The Gold Standard)

SevenRooms is the platform Soho House, Mandarin Oriental, Jumeirah, MGM and The Cosmopolitan use. It's not a marketplace — it's a CRM-first operating system. **This is the reference design for The Weir.**

### What makes it exceptional

**1. 360° Guest Profile (auto-built)**
Every booking, payment, delivery order and survey response feeds one guest record. Tracks: spend history, last visit, dish preferences, dietary requirements, allergies, special occasions (birthdays, anniversaries), seating preferences (booth/window/quiet/loud), wine preferences, table mates ("always books with Sarah"), social handles, source of acquisition. Profiles unify across multiple venues (so a Whalesborough lodge guest who eats at The Weir is recognised as a resort guest, not a stranger).

**2. Auto-Tagging**
The system auto-assigns tags: "Wine Lover" (after 3+ bottle purchases), "Big Spender" (AOV > £80), "VIP" (5+ visits or staff-flagged), "Dairy Allergy", "Vegetarian", "Regular", "Dog Owner". Custom tags can be added by staff in seconds. These power both **service** (pre-shift report shows "Table 7: Wine Lover, anniversary tonight") and **marketing** (segment campaign to "Wine Lovers who haven't visited in 60 days").

**3. Pre-Shift Brief**
The morning of service, the system generates a printable or in-app pre-shift report: every booking with notes, VIPs flagged, allergies highlighted, special occasions noted, return guests recognised, table layout with names. Apple Watch alerts on VIP arrival.

**4. Marketing Automation**
Birthday emails 7 days before, anniversary triggers, win-back at 90/180 days, post-visit thank-you, abandoned-booking recovery, lapsed-regular re-engagement. Branded, personalised, sent without staff effort.

**5. Direct Booking — No Marketplace Tax**
Unlike OpenTable, SevenRooms does NOT push guests to a competing marketplace. The restaurant owns the guest data, the relationship and the bookings. This is critical for premium brands.

**6. Membership / Loyalty as Native**
Tier-based memberships ("Lakeside Locals") with auto-enrolment, point earning, perks, exclusive events. Members see different availability windows (e.g., book 60 days out vs. 30 for public).

**7. Events & Experiences Engine**
Ticketed suppers, chef's tables, wine dinners, supper clubs — sold like Eventbrite but inside the same platform. Each ticket is tied to a guest profile.

**8. AI Auto-Seating**
Algorithm maximises floor plan: a 2-top doesn't get a 4-table when a 4-top is on the waitlist; turn-times are optimised; high-value bookings get the window.

### What we steal from SevenRooms for The Weir
- Auto-tagging
- 360° profile unified with lodge stays
- Pre-shift brief PDF / email to head of service
- Birthday / anniversary automation
- Membership tier (Lakeside Locals) with early-access booking window
- Apple Watch / push notification VIP alerts (deferred to Phase 2)

---

## 4. Build vs. Buy Recommendation

### The Verdict: **Build first-party, integrate selectively.**

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| Buy SevenRooms | Industry-leading, low risk | £12k–£18k/yr per venue, locked into their UI, brand watermark, no resort-wide guest unification with lodges/spa | **No** — too expensive + breaks the unified guest record |
| Buy OpenTable Pro | Cheaper, UK distribution | Brand-commoditising, per-cover fee bleeds margin, pushes guests to competitor restaurants in marketplace | **No** |
| Buy Tock | Great for ticketed events | Being absorbed into Resy in summer 2026, US-led, weak UK ops | **No** — platform risk |
| Buy DesignMyNight / Collins | UK-native, mid-market | UI is mid-tier, brand-watermarked, lacks luxury polish | **No** — feels mass-market |
| **Build in-app, integrate Stripe + POS** | Owns guest data, unified profile across resort/spa/restaurant, no per-cover fees, fully branded, custom UX | Higher upfront cost (~£60–£90k of the £500k budget), maintenance burden | **Yes — RECOMMENDED** |

### Cost-benefit
A custom build absorbed within the £500k app budget pays back in 2–3 years vs. SevenRooms' £15k/yr + cover fees. More importantly, it unifies the **single Whalesborough guest record** across lodge bookings (Landal), spa (Try.be) and restaurant — something no SaaS will give us.

### Integrations we still buy
- **Stripe** — payment, deposits, gift cards, tickets
- **Resend** — transactional email (confirmations, reminders, birthday automation)
- **Twilio** — SMS booking reminders (reduces no-shows ~30%)
- **Square or Toast POS** — kitchen / till sync (start with Square; cheaper, better UK API)
- **Google / Apple Wallet** — pass for membership card
- **Klaviyo or Customer.io** — marketing automation (or build in-app if Phase 2)

---

## 5. Complete Feature Specification — The Weir Restaurant Module

### 5.1 Booking Types (six in total)

**A. Standard Reservation**
- Walk-up-style booking: party size 1–10, date, service period (breakfast / lunch / dinner / weekend brunch), seating preference.
- No deposit for parties ≤6; **£10pp deposit for parties of 7+** (refunded against bill on arrival).
- Seating preferences: lakeside window, log-fire, terrace, "anywhere", dog-friendly indoor zone, family/play-area-adjacent.
- 24-hour confirmation, 4-hour reminder via SMS + email.
- Self-service cancel / modify up to 4 hours before.

**B. Lakeside Locals Member Booking**
- Members get a separate booking flow with:
  - Booking window opens 60 days out (vs. 30 for public).
  - Monday discount auto-applied.
  - "My usual table" one-tap rebook.
  - Member-only events surfaced.
- Membership purchase / renewal handled in-app (£49/yr or whatever tier is set).

**C. Ticketed Events (Grill and Chill, supper clubs, chef's tables)**
- Tock-model: full pre-payment, ticket assigned to guest profile.
- Multiple ticket tiers: General (£X), Paired (with wine flight £Y), Premium Window Table (£Z).
- Capacity cap, automated waitlist when sold out.
- Refund policy enforced (e.g., 7 days = full, <7 days = credit, <48h = no refund).
- QR ticket delivered to email + Apple/Google Wallet.

**D. Tasting Menu / Experience Booking**
- For multi-course menus (e.g., 7-course farm-to-table tasting):
  - Pre-pay full price.
  - Wine pairing add-on at booking (Sommelier-curated flight; staff can override per guest).
  - Dietary capture is **mandatory** at booking, not on arrival.

**E. Group Booking with Pre-Order (parties 8–30)**
- Triggered automatically when party size ≥ 8.
- Two-stage flow:
  1. **Stage 1:** Reserve (party size, date, time, host name, deposit £10pp).
  2. **Stage 2:** Pre-order portal sent to host 7 days before — host enters each guest's choices from a pre-set menu (2/3 courses), dietary, allergies, plus dietary notes per guest.
- Final total split: deposit deducted from bill on the night.
- Used for Sunday lunches, family gatherings, small corporate.

**F. Private Dining Enquiry (parties 20+, exclusive hire)**
- Not instant-book — opens an enquiry form: name, date, party size, budget range, occasion, dietary notes, requested space (Lakeside Room / full restaurant).
- Routes to enquiries@whalesborough.co.uk + restaurant manager dashboard.
- 24-hour response SLA, follow-up sequence built in.

### 5.2 Guest CRM (the heart of the module)

**Mandatory fields at booking:** name, email, phone, party size, date/time.
**Optional but prompted:** dietary requirements (multi-select: vegetarian, vegan, GF, DF, nut allergy, shellfish allergy, other), special occasion (birthday, anniversary, engagement, other), preferred seating, dog with you (yes/no), how did you hear (lodge guest, member, walk-by, social, google, recommended).

**Auto-built profile (server-side):**
- Visit count, last visit date, lifetime spend (from POS sync).
- Average cover, favourite dishes (top 3 from POS line items), preferred service period.
- Allergy + dietary tags (sticky across visits).
- Family / group links (e.g., "always books with..." inferred from co-bookings).
- Lodge stay history (cross-referenced from Landal).
- Spa visit history (cross-referenced from Try.be when API exposed).
- Auto-tags: "Lodge Guest", "Member", "Wine Lover" (3+ wines), "VIP" (10+ visits or staff-flagged), "Birthday Month", "Recent Lapsed" (no visit 90 days).

**Allergy flagging:**
- Allergies surface at THREE points: booking confirmation, pre-shift brief, table-side iPad on arrival. **Red banner on table card.**

**Return-guest recognition:**
- On second-visit booking, the booking widget auto-fills name, email, phone, dietary, preferences. Greeting line: "Welcome back, Leonard."
- Staff iPad shows "Returning guest — 4th visit. Birthday in 2 weeks. Last ordered Cornish Hake, Sauvignon Blanc."

### 5.3 Pre-Shift Brief (Service Tool)

Every morning, 8am, head of service receives an email + in-app PDF:
- All bookings (time, party, table, host name)
- VIP flags
- Special occasions (with suggested gestures: complimentary card, candle in dessert)
- Allergy summary by table
- Returning guests (with name + visit count)
- Lodge-staying guests (with lodge unit + check-out date)
- Pre-ordered group menus
- Sold-out items / kitchen notes

### 5.4 Other Modules

- **Gift cards:** Stripe-issued, balance tracked in profile, redeemable for any service period or event ticket. £25–£500 denominations + custom.
- **Takeaway / collection (Phase 2):** Limited "Sunday lunch to go" or "farm hamper to go". QR menu pickup window.
- **QR menu / order-at-table (Phase 2):** Mr-Yum-style QR for the terrace (high turnover, low-friction). Pay-at-table integrated with POS.
- **Wine list & sommelier pairings:** Each menu item tagged with 2–3 recommended pairings; sommelier can override in-app for the night.
- **Reviews integration:** Auto-trigger post-visit email at T+24h asking for Google review (one-click) + private feedback form. Yumpingo-style 60-second NPS card. Negative feedback (<7) auto-flags to manager, suppresses public review request.
- **Reporting dashboard:** Covers, AOV, no-show rate, channel split, top dishes, dietary trends, member vs. public mix, occasion mix, lodge-guest conversion rate.

---

## 6. Booking Flow Wireframe Description

The flow is **mobile-first, single-column, no chrome**, in the Coastal Editorial design system (cognac CTAs, deep sage nav, warm-white bg, Newsreader serif headings, Plus Jakarta Sans body, 0px radius).

### Step 1 — Discovery (hero / "Reserve a table" CTA)
- Editorial hero image of The Weir's lakeside terrace at golden hour.
- H1: "Reserve a table at The Weir"
- Subhead: "Lakeside dining at Whalesborough. Farm-to-table breakfast, lunch & dinner. Open daily."
- Primary CTA (cognac): "Reserve a table"
- Secondary inline link: "Book a private event" / "Become a Lakeside Local"
- Trust signals strip: "Cornwall Tourism Awards Gold 2024/25 · NPS 83 · Feefo 4.5/5"

### Step 2 — Party Size + Date + Service
- Three large stacked tiles (one-tap each, no dropdowns):
  1. **Party size** — visual selector 1–10, "8+ guests" opens group flow, "20+" opens private dining enquiry.
  2. **Date** — calendar widget (month at a time), unavailable dates greyed, special-event dates highlighted with cognac dot.
  3. **Service period** — Breakfast (9–10:30) / Lunch (12–2:30) / Dinner (6–9) / Weekend Brunch.
- Inline: "Are you a Lakeside Local? Sign in for early access and member discounts."

### Step 3 — Time Slot + Seating Preference
- Available time slots as horizontal scroll chips (15-minute increments, greyed if full).
- Seating preference toggles (one or more):
  - Lakeside window
  - Log-fire side
  - Terrace (outdoor)
  - Dog-friendly indoor zone
  - Family / play-area adjacent
  - Anywhere
- Live capacity hint: "3 tables left at 7:00pm" (urgency, soft).

### Step 4 — Your Details (smart form)
- Returning guest? Sign-in option (email magic link, no password).
- New guest: First name, last name, email, mobile, marketing opt-in (unticked).
- Dog with you? (yes/no)
- Dietary requirements (multi-select chips with "other" free text).
- Allergies — separate, prominent, **required if selected** ("This will be shared with our kitchen and front-of-house team.")
- Special occasion? (optional — birthday, anniversary, engagement, other + date).
- Notes / requests (free text, 280 chars).

### Step 5 — Confirm + Deposit (if applicable)
- Booking summary card: date, time, party, table preference, host name.
- Deposit required (only if party ≥ 7 or event ticket): Stripe Payment Element, Apple Pay / Google Pay enabled.
- Terms: cancellation policy in plain English.
- CTA (cognac): "Confirm reservation"

### Step 6 — Confirmation
- Editorial-style success page: "Your table is reserved."
- Booking reference, calendar add (Apple/Google), directions, what to expect ("We can't wait to welcome you. Look for the lakeside terrace.").
- Confirmation email + SMS sent.
- Upsells (soft, dismissible): "Add a cake to celebrate the birthday — £18" / "Pre-order the wine pairing flight — £42pp" / "Stay the night — explore Whalesborough lodges".

### Confirmation comms cadence
- T-0: Email + SMS confirmation
- T-7d (group bookings only): Pre-order portal link
- T-1d: Email reminder + directions + parking
- T-4h: SMS reminder ("See you at 7pm. Reply 'CANCEL' to release the table.")
- T+24h: Thank-you + review request + post-visit upsell (wine club, next event)

---

## 7. CRM / Guest Preference Patterns — Implementation Notes

### Data model (Postgres)
```
guests
├─ id, name, email, phone, marketing_opt_in
├─ created_at, last_visit_at, visit_count, lifetime_spend, aov
├─ dietary[] (vegetarian, vegan, gf, df, etc.)
├─ allergies[] (nut, shellfish, dairy, etc.) — sticky, surfaces prominently
├─ preferences (jsonb: seating, wine, dishes, time_of_day)
├─ special_occasions[] (birthday MM-DD, anniversary, etc.)
├─ tags[] (vip, member, wine_lover, lodge_guest, etc. — auto + manual)
├─ landal_guest_id (FK if matched)
├─ try_be_guest_id (FK if matched)
└─ membership_tier (null, lakeside_local, ...)

bookings → guests (many-to-one)
guest_notes (free-text staff annotations, timestamped, author-tagged)
guest_visits (denormalised view: date, party, table, total, dishes from POS)
```

### Allergy surfacing (red-flag rule)
Any allergy entry triggers:
1. Booking confirmation email shows allergy panel.
2. Pre-shift brief lists allergy by table number in red.
3. Table-side staff iPad shows persistent red badge.
4. POS check ticket prints "ALLERGY: NUT" header in red ink.
5. Manager dashboard alerts if a dish containing the allergen is rung up against the table.

### Special occasion gestures (automated suggestions)
- Birthday: complimentary candle in dessert, handwritten card option (auto-printed to back-office printer morning of), happy-birthday photo offer.
- Anniversary: prosecco welcome, table card "Happy Anniversary, the Millards".
- First visit: warm welcome script + take-home small treat (jam from Neetfield).
- 5th visit: hand-written thank-you card from head chef.
- Lodge guest staying: welcome line, lodge unit shown on staff card, soft cross-sell of spa booking after meal.

### Return-guest recognition (the magic moment)
On any second-or-later booking, the system:
- Pre-fills 90% of the form.
- Greets by first name on confirmation page.
- Surfaces preferred seating as default.
- Pre-checks dietary / allergy from profile (with "still correct?" prompt).
- Staff iPad on arrival shows: visit count, last visit date, last dish, last wine, any open notes, occasion month, recent reviews left.

### Cross-property unification (the killer feature)
Match keys: email (primary), phone (secondary), Landal booking ID (tertiary, via integration), name+postcode fuzzy match (fallback).
When a guest books at The Weir AND has a lodge stay this week, both records link. Staff see "Lodge: Trelowen 2-bed, checking out Sunday". The lodge greeter receives a follow-up: "Your guests dined at The Weir on Wednesday — they loved the hake. Suggest the brunch tomorrow."

### Marketing automation triggers (Phase 1)
- T+24h post-visit: thank you + review request
- T+14d post-visit (if no review): gentle re-prompt
- T+30d no booking: "We're back to autumn menu" newsletter
- T+90d no booking: "We miss you — £20 credit on your next visit"
- T-7d birthday: "Celebrate at The Weir — your table on us when you bring 3 friends"
- Anniversary trigger: similar
- Lodge booking made (from Landal feed): "Reserve your welcome dinner at The Weir — locals' rate applies"

---

## 8. Phasing Recommendation

**Phase 1 (Launch — 12 weeks, ~£60k of build budget)**
- Standard reservation + member booking
- Guest CRM core (profile, tags, allergies, preferences)
- Pre-shift brief PDF + email
- Stripe deposits + gift cards
- Square POS integration
- Confirmation comms (email + SMS via Resend + Twilio)
- Lakeside Locals membership tier
- Private dining enquiry form

**Phase 2 (T+3 months, ~£25k)**
- Ticketed events engine (Grill and Chill, supper clubs)
- Group pre-order flow (party 8+)
- Tasting menu booking with wine pairing
- Yumpingo-style post-visit feedback NPS
- Cross-property unification (Landal + Try.be record matching)

**Phase 3 (T+6 months, ~£15k)**
- QR menu / order-at-table (terrace only)
- Apple Watch VIP alerts for service team
- AI auto-seating algorithm
- Advanced marketing automation (win-back, lapsed regular, birthday)

---

## 9. Sources

- [SevenRooms platform overview](https://sevenrooms.com/) — CRM, table management, marketing
- [SevenRooms restaurant CRM](https://sevenrooms.com/platform/crm/) — 360° guest profiles, auto-tags
- [SevenRooms reservations & waitlist](https://sevenrooms.com/platform/reservations-waitlist/)
- [SevenRooms events & experiences](https://sevenrooms.com/platform/events-experiences/)
- [Tock for restaurants](https://www.exploretock.com/join/restaurants/) — ticketed dining model
- [Restaurant Business: Resy + Tock merger summer 2026](https://www.restaurantbusinessonline.com/technology/reservation-services-resy-tock-are-merging)
- [Resy for restaurants](https://resy.com/join/) — waitlist, Notify, experiences
- [Amex Resy + Tock integration announcement](https://www.americanexpress.com/en-us/newsroom/articles/travel-and-dining/resy-announces-next-phase-of-its-reservation-and-dining-platform.html)
- [OpenTable Pro plan](https://www.opentable.com/restaurant-solutions/plans/pro/)
- [OpenTable private dining](https://www.opentable.com/restaurant-solutions/plans/private-dining/)
- [OpenTable pricing 2026](https://restaurant.eatapp.co/blog/opentable-pricing)
- [DesignMyNight homepage](https://www.designmynight.com/)
- [DesignMyNight + Access Collins partnership](https://www.theaccessgroup.com/en-gb/hospitality/software/booking-reservations/design-my-night-partnership/)
- [Mr Yum QR ordering platform](https://www.crunchbase.com/organization/mr-yum)
- [Yumpingo / BBI Survey Studio](https://blackboxintelligence.com/yumpingo)
- [Toast + Yumpingo integration](https://pos.toasttab.com/integrations/yumpingo)
- [Watergate Bay restaurant booking page](https://watergatebay.co.uk/book/restaurants)
- [WAX at Watergate Bay on OpenTable](https://www.opentable.co.uk/r/wax-at-watergate-bay-cornwall)
- [The Pig Hotel](https://www.thepighotel.com/)
- [Tripleseat event management](https://tripleseat.com/)
- [Eat App vs Quandoo comparison](https://eatapp.co/comparison/eat-app-vs-quandoo)
- [TableAgent alternatives](https://restaurant.eatapp.co/blog/top-tableagent-alternatives)
