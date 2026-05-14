# Activities & Experiences Module — Specification

**Project:** Whalesborough Farm Resort & Spa Booking App
**Budget context:** £500k platform | Coastal Editorial design system
**Module owner:** Resort experience team + W Club + estate manager (Tim) + photographer
**Status:** Specification draft v1 — 14 May 2026
**Sources of research:** The Newt (Beezantium, Bee Safaris, workshops), Soho Farmhouse ("What's On" app + sheet, padel booking), Daylesford (cookery school, farm shop), Triparound / HolidayHero / Attractions.io (guest concierge apps), Bokun / FareHarbor / Peek Pro (booking-engine commercial models).

---

## 1. Strategic positioning

Whalesborough's experience programme is currently the resort's **single largest under-monetised asset**. Tim feeds the alpacas. The bees are there. The market garden grows. The walks exist. But none of it is bookable — so 80% of guests never know it happened. The Newt has built a national reputation on the same raw ingredients (a farm, bees, a market garden, a beautiful house) by *productising the estate as a series of named, schedulable, photographable experiences*. Soho Farmhouse does the same with its "What's On" daily sheet.

Our positioning is **"Cornish Country Living, Curated"** — a programme that converts the working estate into a layered guest journey. The taxonomy mirrors the *Premium Experience Design Brief* (estate-to-treatment storytelling) and the *Destination Content Brief* (POI filters, family/wellness/heritage tags).

Three commercial layers:

1. **Included with stay** — drives perception of value, NPS, return-intent. Free with RSVP for capacity (alpaca feeding, tractor rides, welcome cream tea, pool sessions, walking trails, morning circuits for W Club members).
2. **Paid à la carte** — £5–£35 per head experiences that convert quiet operational moments (yoga, foraging walks, beekeeping, market garden tours, gin tasting, wreath-making).
3. **Premium signature** — £75–£450 high-margin private experiences for celebrations, special-occasion guests, and lodge prospects (private beekeeper-for-a-day, chef in your lodge, sole-use spa, behind-the-scenes farm tour with Tim).

This three-tier model lifts ancillary revenue per guest by an estimated **£60–£120 per stay** based on Newt/Daylesford benchmarks, against a build cost absorbed inside the £500k platform.

---

## 2. Activity catalogue (full list, proposed categorisation)

Five top-level categories. Every activity carries up to three secondary tags (age, dog, indoor/outdoor, season, guest-only/open).

### A. Farm & Nature (the working estate)
| Activity | Tier | Schedule | Price | Capacity | Tags |
|---|---|---|---|---|---|
| Little Farmers (alpacas/goats/donkeys/chickens) | Included | Tue + Sat, 10:30 | Free, RSVP | 20 | family, all ages, dog-no, outdoor |
| Summer tractor rides | Included | Daily Jul–Aug, 11:00 + 14:00 | Free, RSVP | 16 | family, 3+, outdoor, summer |
| Alpaca walk | Paid | Wed + Sun, 14:00 | £25 adult / £15 child | 8 | family, 6+, outdoor, all-season |
| Coarse fishing — lake day ticket | Paid | Drop-in dawn–dusk | £15 day / £8 evening | 12 rods | adventure, 8+, dog-yes |
| Market garden tour (Neetfield) | Paid | Thu 11:00, May–Sep | £12 | 10 | nature, 10+, outdoor, summer |
| Beekeeping experience (Cornish Black Bees) | Paid | Sat 10:00, Apr–Sep | £45 (suit included) | 6 | nature, 12+, outdoor, summer |
| Foraging walk | Paid | Sun 09:30, May–Oct | £35 | 10 | nature, 14+, outdoor |
| Photography walk (estate photographer) | Paid | Fri 07:30 + 17:00 | £30 | 6 | nature/culture, 12+, outdoor |
| Stargazing | Paid | Selected new-moon Fridays | £15 (incl. hot drink) | 20 | nature, 8+, outdoor, autumn–winter |
| 450-acre walking trails | Included | Self-guided, always-on | Free | – | family, all ages, dog-yes |
| Self-guided cycling routes | Included | Self-guided, always-on | Free (bike hire £20/day) | – | adventure, 10+, dog-no |

### B. Wellness & Movement
| Activity | Tier | Schedule | Price | Capacity | Tags |
|---|---|---|---|---|---|
| Morning Circuits | Paid (open) | Wed 07:00 | £5 | 12 | wellness, 16+, outdoor |
| Yoga (sunrise) | Paid | Tue + Thu + Sat 07:30 | £15 | 12 | wellness, 16+, indoor/outdoor |
| Aqua-fit (W Club) | Paid | Mon + Fri 10:00 | £10 | 8 | wellness, 16+, indoor |
| Pilates (W Club) | Paid | Tue + Sat 09:00 | £15 | 8 | wellness, 16+, indoor |
| Pool open swim | Included | Daily 07:00–21:00 | Free for guests / W Club | – | wellness, all ages, indoor |
| Wild sea swim (guided) | Premium | Wed dawn + sunset, Apr–Oct | £35 (incl. dryrobe loan) | 8 | wellness/adventure, 16+, outdoor |

### C. Culinary
| Activity | Tier | Schedule | Price | Capacity | Tags |
|---|---|---|---|---|---|
| Welcome cream tea | Included | At check-in, by request | Free (1 per booking) | – | family, all ages, indoor |
| Welcome drink (estate gin/elderflower) | Included | At check-in | Free | – | – |
| Estate gin tasting | Paid | Fri 17:00 | £25 | 12 | culinary, 18+, indoor |
| Wine tasting (Cornish/biodynamic) | Paid | Sat 17:00 | £35 | 12 | culinary, 18+, indoor |
| Chef's Table at The Weir | Premium | First Fri of month | £95 | 8 | culinary, 14+, indoor |
| Private dining in your lodge | Premium | On-demand 48hr lead | £75pp + £150 chef fee | 2–12 | culinary, all ages, indoor |

### D. Family & Kids
Covered by Little Farmers + tractor rides above, plus seasonal additions: **Easter egg hunt** (Apr), **Wild Kids forage** (school holidays), **Halloween pumpkin trail** (Oct), **Wreath-making** (Dec, £35).

### E. Coastal & Off-Estate Partners
Booked through our app via commission deal — see §9. Surf school (Raven, Widemouth), Bude Canal kayak/SUP, Bude Sea Pool dawn swim, SWCP guided walk, Tintagel half-day, Padstow-by-boat. Heritage indoor wet-day options: Bude Castle, Museum of Witchcraft (Boscastle).

---

## 3. Module sitemap

```
/experiences                          ← landing (editorial hero, "what's on today", category tiles)
  /experiences/farm-nature            ← category page
  /experiences/wellness
  /experiences/culinary
  /experiences/family
  /experiences/coastal                ← off-estate partners

  /experiences/[slug]                 ← detail page (e.g. /experiences/beekeeping)

  /experiences/calendar               ← public month/week/day view, filterable
  /experiences/whats-on-today         ← daily curated sheet (Soho-style)

  /my/itinerary                       ← personalised builder (auth required)
  /my/itinerary/[bookingId]           ← per-stay plan, shareable read-only token
  /my/bookings/[activityBookingId]    ← single activity manage

  /admin/experiences                  ← CMS list
  /admin/experiences/[id]             ← edit (details, photos, schedule, capacity, pricing)
  /admin/experiences/schedule         ← grid view of all sessions next 60 days
  /admin/experiences/attendees/[sessionId]
  /admin/experiences/reports
```

---

## 4. Booking-flow wireframes (narrative)

**Step 1 — Detail page.** Editorial hero image (cinematic fade-in, per design system), italic Newsreader headline ("Walk with the Alpacas"), 30–50-word BLUF, *What to expect / Itinerary / What's included / What to bring / Suitability / Cancellation* as accordion (no 1px borders — tone shifts only). Sticky "Book" card on desktop right rail.

**Step 2 — Date / session select.** Calendar with available dates emphasised in cognac (#703a1d). Click a date → list of session times with live remaining capacity ("4 spaces left"). Greyed = waitlist only.

**Step 3 — Guests.** Stepper per age band (Adults / Teens 13–17 / Kids 4–12 / Babies <4 / Dogs). Each band shows independent price line.

**Step 4 — Add to stay or standalone.** If guest is logged-in and has an active reservation, default = "Add to stay (Cottage Trelowen 4, 12–19 Jun)". Else collect contact details for standalone booking.

**Step 5 — Cross-sell.** One curated suggestion only (anti-SaaS rule, no "you might also like" carousel). Rule: tractor ride → farm shop hamper; gin tasting → Weir dinner reservation; alpaca walk → photo print pack.

**Step 6 — Payment / RSVP.** Free activities skip payment, capture deposit-free RSVP. Paid → Stripe. Apple Pay/Google Pay default on mobile.

**Step 7 — Confirmation.** Email + .ics calendar invite + add-to-Apple-Wallet pass. 24-hr reminder push, 1-hr "see you at the Farm Gate" reminder with what3words.

**Waitlist.** Full sessions show one-tap "Join waitlist." Auto-promote on cancellation; 2-hour window to confirm before next in queue.

---

## 5. Database schema additions

```sql
-- Core experience catalogue
experiences (
  id, slug, name, category, secondary_tags[], hero_image_id,
  blurb_short, body_md, includes_md, bring_md, suitability_md,
  cancellation_policy_id, tier ENUM('included','paid','premium'),
  default_capacity, lead_time_hours, min_age, max_age,
  dog_friendly, mobility_grade ENUM('A','B','C'),
  indoor_outdoor, seasonal_from, seasonal_to,
  base_price_adult, base_price_child, base_price_baby,
  provider_id, is_active, created_at, updated_at
)

-- Recurring schedule patterns (e.g. "Tue + Sat 10:30")
experience_schedules (
  id, experience_id, rrule_string,  -- iCal RRULE
  start_time, duration_minutes,
  capacity_override, price_override, valid_from, valid_to
)

-- Materialised sessions (next 90 days)
experience_sessions (
  id, experience_id, schedule_id, starts_at, ends_at,
  capacity, capacity_remaining, status ENUM('open','full','cancelled','past'),
  weather_dependent, weather_status
)

-- Bookings & participants
experience_bookings (
  id, session_id, guest_id, reservation_id NULLABLE,
  status ENUM('confirmed','waitlist','cancelled','attended','no-show'),
  total_amount_pence, stripe_payment_intent, booked_at
)

experience_booking_participants (
  id, booking_id, age_band ENUM('adult','teen','child','baby','dog'), count
)

-- Providers (instructor / partner)
experience_providers (
  id, name, kind ENUM('internal','external_partner'),
  contact_email, payout_terms, commission_pct,
  on_site_location, bio_md, photo_id
)

-- Itinerary
itineraries (id, reservation_id, owner_guest_id, share_token, updated_at)
itinerary_items (id, itinerary_id, kind ENUM('experience','dining','offsite','custom'),
                 ref_id, starts_at, ends_at, location_what3words, notes, order_idx)

-- Reviews (separate from accommodation reviews)
experience_reviews (id, booking_id, rating_1_5, headline, body, published_at)
```

Schedules materialise into `experience_sessions` via a nightly job (60-day window) + on-demand on schedule edit. This pattern is borrowed from Bokun and avoids brittle on-the-fly RRULE expansion at request time.

---

## 6. Admin CMS spec

**Activities list.** Filter by category, tier, active/archived. Bulk-archive seasonal items.

**Activity editor.** Tabs: *Details / Story* (Markdown body, gallery picker, BLUF for AI citation per the schema brief), *Schedule* (RRULE builder UI — drag day chips, set time, set capacity), *Pricing* (per-age-band, season override), *Provider & Logistics* (instructor, on-site location, kit list), *Policies* (cancellation tiered: free >24hr / 50% 24–4hr / no refund <4hr), *Publish*.

**Schedule grid.** 60-day horizontal calendar — every session as a chip, colour-coded by category. Click a chip → mini-modal with attendee list, capacity nudge, "cancel session and notify" button.

**Attendee list.** Per session: full guest list, dietary/allergy/mobility flags from guest profile, check-in toggle, "send pre-arrival message" button (template), CSV export for paper-backup. iPad-friendly check-in mode at the Farm Gate.

**Reporting.** Revenue per category, attendance vs capacity (occupancy), no-show rate, NPS uplift correlation (linked to stay reviews), provider commission report for off-estate partners.

**Roles.** Resort manager (full), Farm team / Tim (own activities), W Club spa staff (wellness), Weir chef (culinary), Marketing (read + photo upload).

---

## 7. Itinerary builder spec

**Mobile-first card stack.** Each day = vertical column; activities = drag-handle cards. Pinch-zoom to multi-day overview.

**Auto-populate seed.** On reservation confirmation, system pre-seeds the itinerary with: check-in welcome drink, dinner reservation Day 1, dog-walk suggestion Day 2 morning *if dog flag*, Little Farmers Day 2 *if kids flag*, departure cream tea.

**Conflict detection.** Two-pass check: (1) time overlap — block; (2) location travel time (Beezantium-style) — warn with sage-tone banner "30-min drive between these." Uses static on-estate walk-time matrix (Pool → Farm Gate = 8min; Weir → Tev Lodges = 12min) and Google Maps API for off-estate.

**Smart drag.** Snap to 15-min grid. Auto-pad 30-min buffer between locations.

**Share.** Generate read-only token URL `/i/[token]`. Co-travellers can comment but not edit unless promoted. Print stylesheet renders as a beautiful A4 day-by-day card (uses the design system's print rules).

**Offline.** PWA caches the rendered itinerary so it works on the estate (notorious mobile signal black-spots) — covered by the project's offline-capable PWA requirement.

---

## 8. Recommendation engine

**Inputs:** Guest profile (party composition, ages, dogs, mobility flags, dietary), stay dates (weather forecast 7-day API, day-of-week), past booking history (return guests = 83% intent), accommodation type (lodge vs cottage).

**Rules engine (transparent, not ML — fits Coastal Editorial trust ethos):**

1. **"For your stay"** — match party composition: family-with-under-5s = surface alpaca feeding + tractor + cream tea; couple = wine tasting + spa + sunset wild swim; multi-gen = beekeeping + photography walk + Chef's Table.
2. **"Don't miss"** — 5 always-on signature items chosen by marketing per season.
3. **"Available right now"** — sessions with capacity_remaining > 0 in next 36 hours, filtered to guest's stay window.
4. **Weather-aware swap.** If forecast precipitation > 60% at session start, surface indoor alternative as banner ("Forecast looks unsettled — fancy Pilates instead?"). Inspired by The Newt's wet-day Beezantium pivot.
5. **Inventory health.** If capacity_remaining < 25% across all sessions of an experience that week, boost its rank to drive completion; if > 90% unsold, drop rank (don't surface failure).

**Output:** Each module surface (hero of `/experiences`, in-stay home screen, post-booking confirmation email) consumes up to 3 ranked recommendations from the same engine.

---

## 9. Premium signature experiences (with pricing rationale)

| Experience | Price | Margin model | Rationale |
|---|---|---|---|
| Private Alpaca Encounter (90min, max 4) | £180 flat | High — incremental on existing herd | Newt charges £125 for similar Bee Safari private; Cornwall premium + alpaca novelty justifies. |
| Beekeeper for a Day (with Tim or estate beekeeper, 4hrs, incl. lunch) | £295 | Time-cost of staff + £35 lunch | Anchors against Newt Beezantium £75 day pass; ours is hands-on private. |
| Behind-the-Scenes Farm Tour with Tim (2hr, max 6) | £75pp | Pure margin (Tim already onsite) | Storytelling premium — sells the founder narrative, big for lodge prospects. |
| Private Chef in Your Lodge (3-course, locally sourced) | £75pp + £150 chef fee | Chef labour + 40% food margin | Below London private-chef rates (£120+pp); plays into "Cornish countryside dining" narrative. |
| Spa for One (90min sole-use of pool + spa) | £450 (1–2 guests) | Off-peak capacity utilisation (06:30–08:00 or 21:00–22:30) | Massive perceived value — the only true sole-use spa offer in Cornwall. |
| Lodge Owner Exclusive — Cellar Tasting | £125 (lodge owners only) | Loyalty driver | Reinforces lodge purchase value; ties to the 8% returns narrative *legally* (lifestyle benefit not investment return). |
| Anniversary / Proposal Package | £350 (private dining + flowers + photography 30min) | Bundled premium | Photographer + Weir chef + florist — high-margin, high-NPS. |

All premium experiences gated by 48hr lead time and require deposit at booking.

---

## 10. Off-estate partner integrations

Three integration patterns, in order of preference:

1. **Bokun-style channel partnership (preferred).** We onboard local operators (Raven Surf School, Bude Canal Adventures, Tintagel Castle EH tickets) into our admin as `external_partner` providers. Their inventory is exposed via their existing booking systems (Bokun is owned by Tripadvisor and the dominant operator-side platform in this region) — we ingest via Bokun's marketplace API and earn 15–20% commission per booking.
2. **White-label affiliate links.** Where partner has no API (small surf schools), generate UTM-tagged deep links and reconcile monthly. Lower friction, lower attribution quality.
3. **Concierge-arrange.** Form-only — guest requests, our team books on their behalf. Use for one-off heritage / restaurant tables (Bude Tapas, Beach House, The Bay View Inn).

Restaurants specifically — partner integrations should feed into the **Weir restaurant module** sibling, not duplicate here. Cross-link only.

**Commercial:** Target net 12% ancillary revenue uplift per stay by end-Y1, scaling to 18% by Y2 as partner roster matures.

---

## 11. Marketing copy direction

The umbrella voice is **"Cornish Country Living, Curated"** — borrowing The Newt's "country estate as cultural product" framing without the Somerset garden-centre formality. Copy is sense-led, season-led, location-led — never feature-led.

- **Farm & Nature** experiences = *"Farm encounters"* — verbs: *meet, walk with, learn from, feed*. Italic Newsreader headlines: "*An hour with the bees*", "*Slow morning, fast tractors*".
- **Wellness** = *"Moments of stillness"* — *breathe, drift, float, swim*. "*Sunrise yoga, salt air still on the windows*".
- **Culinary** = *"Estate to plate"* — *taste, pour, gather*. "*Gin distilled where you're standing*".
- **Coastal & off-estate** = *"Coastal moments"* — *catch the tide, follow the path, dawn at the Sea Pool*.
- **Premium** = *"Privately yours"* — restrained, no hyperbole. "*The spa, for the two of you. Before the day begins.*"

Microcopy rules: never use "activity" in user-facing copy (use *experience* or *moment*); never use "book now" twice on the same screen (use *reserve* on secondary CTAs); always show start time in 12hr with am/pm (editorial), never 24hr (transactional).

AI-citation BLUF: every detail page opens with a 30–50 word direct-answer paragraph (*"The Alpaca Walk at Whalesborough is a 90-minute guided walk with two Huacaya alpacas through 450 acres of North Cornwall countryside, runs Wednesdays and Sundays at 2pm, costs £25 adult / £15 child, and is suitable for children 6 and over."*) so ChatGPT, Perplexity and Google AI Overviews surface us by name when guests search "things to do near Bude with kids".

---

**Word count:** ~1,930.

Sources informing this spec:
- [The Newt — Workshops & Tours & Tastings](https://thenewtinsomerset.com/plan-your-visit/whats-on)
- [Soho Farmhouse — Activities + What's On app pattern](https://www.sohohouse.com/en-us/houses/soho-farmhouse/things-to-do)
- [Bokun — operator marketplace + Tripadvisor integration](https://www.bokun.io/activity-booking-software)
- [FareHarbor vs Peek Pro vs Bokun pricing comparison](https://www.bokun.io/fareharbor-vs-peek-pro-vs-bokun)
- [Triparound — hotel concierge itinerary platform](https://www.triparound.com/hotels/)
- [Attractions.io — resort mobile app patterns](https://attractions.io/use-case/mobile-apps-for-resorts)
- [Oaky — 17 hotel pricing strategies 2026](https://oaky.com/en/blog/hotel-pricing-strategies)
