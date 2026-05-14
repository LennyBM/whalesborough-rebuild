# Whalesborough Farm Resort & Spa — Premium Features Specification

**Project:** £500k booking app + guest portal
**Brand voice:** Coastal Editorial — luxury, considered, anti-SaaS
**Target:** #1 luxury resort app in Cornwall (and benchmark for UK boutique hospitality)
**Date:** 14 May 2026
**Author:** Peake Management

---

## Design Doctrine (read first)

Every feature in this spec must earn its place against three filters:

1. **Editorial, not app-like.** Features behave like sections of a curated travel monograph. Buttons sleep until needed. No popups, no toast confetti, no "Did you know?" interruptions. The Newsreader italic does the talking, not exclamation marks.
2. **Substance over spectacle.** Each feature reveals real data, real craft, or real personalisation — never a gimmick. If a feature can't answer "what does this *actually* do for the guest?", it gets cut.
3. **Loved by the 22% who notice, invisible to the 78% who don't.** Heckfield Place and Aman build for the connoisseur. The mass-market guest still benefits — they just don't see the seams.

Cognac (#703a1d) is reserved for *only* primary action — book, confirm, redeem. Everything else is sage, sand, and ink.

---

## 1. AI Concierge — "Hester"

### What it is
A persistent, always-available chat concierge powered by the Claude API (Sonnet 4.6 for general flow, Opus 4.7 for complex itinerary planning). Named "Hester" (after a Cornish field name on the estate — gives it a name a human staff member would have, not "AI Assistant"). Trained on the resort knowledge base: lodge details, menu, treatment menu, opening times, dog policy, local walks, tide tables, weather. Can read the guest's own profile (with permission) to personalise answers. Can take actions on the guest's behalf (book a table, hold a treatment slot, send a hamper order to The Larder) but every action ends with an explicit "Confirm?" tap before fire.

### Why it matters
- Replaces 60–70% of front-desk enquiries that currently land via phone or email
- Available 24/7 — solves the "I'm planning the day at 11pm in the lodge" moment
- Demonstrates the brand's modernity without breaking the editorial voice (Hester writes in considered prose, not chatbot-speak)
- Trains the LLM that owns voice/search to associate Whalesborough with "the resort with the proper concierge AI" — GEO benefit

### User flow
1. A small **"Ask Hester"** wordmark sits in the floating nav (bottom-right on mobile, top-right on desktop). No animated icon, no badge.
2. Tap opens a side-sheet (60% width on desktop, full-screen mobile) with a single suggestion line in Newsreader italic: *"How may I help with your stay?"*
3. Three soft chips below: "Plan tomorrow", "Book a table", "Ideas for kids".
4. User types or speaks (mic icon — Whisper API for speech-to-text).
5. Hester replies in 1–3 short paragraphs, italicised sage in the prose, never bullet-pointed unless asked.
6. If an action is suggested (e.g. "I can hold a 7pm table for four — confirm?"), a single cognac CTA appears beneath the message.
7. Confirmation triggers the actual booking (call to Try.be / restaurant DB / hamper system), success returns inline.
8. **Human handoff:** If Hester detects (a) frustration signals (>2 rephrases, words like "this isn't working", "speak to a human"), (b) complaint topics (refund, complaint, illness, accident), or (c) explicit request — it offers "Shall I pass this to Cara at the front desk? She'll reply within the hour, or you'll see her in the morning." Conversation is escalated to staff Slack with full transcript; guest gets a real-name follow-up.

### Tech requirements
- Claude API with prompt caching (RAG over the knowledge base — ~50k tokens cached, hit-rate target >85%)
- Vector store for knowledge: lodges, treatments, menu, walks, FAQs (Pinecone or Postgres pgvector)
- Function calling for actions: `book_table`, `hold_treatment`, `order_hamper`, `request_housekeeping`, `escalate_to_staff`
- Voice mode: Whisper for STT, ElevenLabs (or OpenAI tts-1-hd) for TTS — a single calm female voice, English (Cornish/RP blend), tested for warmth
- Staff Slack integration for handoff with conversation context
- Rate limit: 30 messages/15min/guest; abuse detection on prompt injection
- Streaming responses for perceived speed

### Build effort
**L** — 8–12 weeks. The KB curation + tone-of-voice tuning is the slow bit, not the code.

### Phase
**V1** — Launch a text-only Hester at app v1 (3 months post-MVP). Voice mode + booking actions in V2. Do not ship before the voice is right; a bad concierge is worse than no concierge.

### Risk / privacy
- **Hallucination on opening hours / pricing:** Pin all factual answers to the live KB; refuse if confidence < threshold ("I'll check with Cara and come back to you").
- **Booking errors made by AI:** Every action requires explicit guest confirm before commit. No silent bookings, ever.
- **PII:** Guest stay data passed to Hester only when guest is logged in. No conversation transcripts retained beyond 30 days unless escalated.
- **Prompt injection:** System prompt hardened; tool calls validated server-side; no raw user input concatenated into prompts.

### Success metric
- 40% of in-stay enquiries handled without staff intervention (baseline: 0%)
- Hester-attributed bookings: 8% of restaurant covers, 5% of treatments by month 6
- Guest CSAT score on Hester interactions: >4.4/5

---

## 2. Digital Key & Mobile Check-in

### What it is
On arrival day, the guest's phone becomes the lodge key. Bluetooth Low Energy (BLE) + HCE NFC for Android. Replaces the physical key handover (and the "where do I find someone at 11pm?" moment for late arrivals). Couples with mobile check-in: guests skip the office entirely if they want to.

### Why it matters
- **Operational saving:** Front desk averaging 12–15 min per check-in × 60 arrivals on a Friday = 12 staff-hours/week reclaimed.
- **Late-arrival friction killer:** Currently arrivals after 6pm are a known pain point.
- **Wow moment:** First memorable "this is different" interaction with the brand.
- **Sustainability story:** ~10,000 physical key cards eliminated annually.

### User flow
1. **T-48h:** Push notification: *"Your lodge is preparing for you. Add your key when you're ready."*
2. App walks through: confirm arrival time, party composition (re-confirm pets), driving licence photo for the under-25 driver of the EV charging bay (optional), pre-arrival hamper order (cross-sell), ETA share.
3. **T-3h before check-in window:** Push: *"Trelowen 4 is ready. Your key activates at 4pm."*
4. On arrival, the ANPR gate recognises plate (already in operation) and welcomes by name on the gate screen. Lodge address auto-routes via in-app map.
5. At the lodge door, phone is brought within ~10cm of the smart lock (Salto KS or Assa Abloy Visionline cloud locks). BLE handshake; door unlocks. A subtle haptic + a single low tone confirms.
6. Inside, the in-app "Welcome" screen activates: heating already set to guest's pre-arrival preference (see Smart Controls), hot tub status, Wi-Fi auto-join QR.
7. **Departure:** Key auto-deactivates at 10am on day of departure. Guest gets a one-tap "Late checkout?" upsell (£25, subject to availability).
8. **Fallback:** Every lodge keeps one physical RFID card behind the door's wall-mounted lockbox; door code given to guest on a tap of "Tech issue?" in app. Front desk also has a manual override portal. The fallback is described in the welcome email — guests know the safety net exists.

### Tech requirements
- Smart lock platform: **Salto Systems KS** (cloud) or **Dormakaba/ASSA Abloy Visionline** — must support BLE + HCE NFC + offline override codes
- Mobile SDK from lock vendor (iOS + Android)
- Hardware install: ~30 lodges × £400 lock + £80 install = £14.4k capex
- Backend issuance API: generate, revoke, audit keys
- HID/Apple Wallet integration (V2) — store the key as a Wallet pass for Apple/Google Wallet (Apple Hotel Keys API rolling out 2026)
- Background BLE permissions handled gracefully on iOS (significant UX edge case)

### Build effort
**L** — 10 weeks. Hardware lead time is the dependency, not the code.

### Phase
**V1** — Launch with 8 of the highest-rate lodges (Trelowen, Tevi, Gwari, Gwelva). Roll to all 30+ units by V2 once flow is proven.

### Risk / privacy
- **Lockout risk:** Triple-fallback (physical card behind lockbox, door code, on-site staff). Document clearly in welcome email.
- **BLE flake:** iOS background BLE is notoriously brittle; spec explicit foreground unlock action (don't try to auto-unlock as guest approaches — privacy risk + battery + reliability).
- **Privacy:** Lock open/close events visible to guest in their portal only. Staff see "checked in / not checked in" status, not granular movement.
- **Shared lodges:** Both lead guests can hold the digital key; up to 4 keys per lodge.

### Success metric
- 80% of arrivals use mobile key by month 12 (target adoption)
- Front-desk check-in time reduced from 12 min to <3 min average
- Zero unresolved lockouts (full fallback rate)

---

## 3. In-Lodge Smart Controls

### What it is
Pre-arrival and in-stay control of lodge environment: hot tub temperature, lighting scenes, underfloor heating, music (Sonos), blinds (lodges with motorised blinds — premium tier only). Guest sees and controls only their lodge — no estate-wide access.

### Why it matters
- **Arrival theatre:** Lodge is at the perfect temperature, hot tub bubbling at 38°C, soft lighting on, Spotify Daily Mix queued — guest walks in and the place is *alive*. This is the single biggest "wow" moment after the digital key.
- **Saves energy:** Heating doesn't run all day before arrival; only ramps up in last 2h based on ETA share.
- **Cross-sell:** Hot tub heat is a £15 add-on for short breaks where it's not included. Lighting scenes can plug into "spa night" packages.

### User flow
1. **Pre-arrival (T-24h):** App nudges: *"Set up your lodge."* Single screen with sliders/toggles for: hot tub temperature (off/35/37/38/40°C), hot tub on-time (e.g. heat to be ready at 5pm), heating target temp (18–22°C), arrival lighting scene (Off / Soft / Warm / Bright), music (Spotify connect — guest links their account, picks a playlist, or chooses one of three curated Whalesborough mixes: "Lakeside Calm", "Cornish Morning", "Slow Sunday").
2. Settings applied automatically when ANPR gate confirms arrival, or 30 min before guest's shared ETA.
3. **In-stay:** Lodge tab in app shows current state, easy adjust. Big sage button: *"Goodnight."* — one tap, lights fade over 10 min, music stops, heating drops 2°C. Sister button: *"Morning."* — reverses it.
4. **Privacy mode:** *"Do not disturb"* toggle hides occupancy status from housekeeping dashboard.

### Tech requirements
- Smart hub per lodge: **Loxone Mini Server** or **Home Assistant Yellow** as the integration layer (talks to all hardware)
- Hot tubs: must be on the network (Balboa BWA Wi-Fi module or Gecko in.touch2 — retrofittable to existing lodge tubs)
- Lighting: existing Lutron / Loxone / Philips Hue — assume mostly retrofit Hue or Casambi
- Heating: smart TRVs / Honeywell evohome or Heatmiser neoHub (most likely existing systems)
- Sonos S2 in each premium lodge (already common spec)
- Backend: device proxy service that gates per-guest access (guest sees their MQTT topics only)
- Audit log: every command logged to per-lodge ledger

### Build effort
**XL** — 12–16 weeks (hardware audit + retrofit + per-lodge config + app UX). Capex per lodge £600–£2,500 depending on existing tech.

### Phase
**V2** — Capex-heavy and dependent on per-lodge surveys. Pilot in Trelowen 1–4 first; expand based on guest feedback. Earlier than V2 only if a lodge-refurb cycle aligns.

### Risk / privacy
- **Authentication scope:** Critical — guest can only see/control their lodge during their stay. Test with two guests in adjacent lodges; verify cross-lodge isolation.
- **Children-and-buttons risk:** Hot tub temperature ceiling locked at 40°C; toddler-proof PIN to enable scalding range never needed (40°C max).
- **Housekeeping conflict:** Staff app overrides guest controls when in cleaning mode (and guest is reminded the lodge is being cleaned).
- **Wi-Fi flake:** Local-fallback control via in-room tablet OR wall switches always physically operational.

### Success metric
- 65%+ of guests engage with pre-arrival setup
- Hot-tub upsell conversion: 22% on eligible stays (currently un-tracked)
- Energy use per occupied night reduced 15% via ramp-on-arrival heating

---

## 4. AR Estate Tour

### What it is
A WebAR (no install) augmented experience for walking the 450-acre estate. Point phone at a building or feature → overlay reveals: name, story, what's inside, "find me on the map". For animals (the alpaca paddock, beehives), animated info panels with live status ("Alberto last spotted at 9:42am near the apple orchard").

### Why it matters
- **Differentiator no Cornish resort has** — first-mover in regional luxury hospitality.
- **Solves the "what is this place?" problem** — guests often miss the heritage layer (the working farm history, the named field stories, the species reintroduction work).
- **Engages kids 6–12** — visible, magical, age-appropriate.
- **Earned media** — AR tours have a journalist hook ("Cornwall's first AR farm walk").

### User flow
1. Within the app, a chip: *"Walk with AR"*. Single tap launches.
2. Camera permission asked clearly: *"Your camera stays on your device. We use it to recognise where you are on the estate — nothing is recorded."*
3. Guest walks to one of ~15 AR points (small slate plaque with a Whalesborough mark, no QR clutter). Camera recognises the location via geolocation + visual anchor (image target).
4. Overlay fades in over the live camera view: a single sentence in Newsreader italic floats over the building/feature. Tap reveals a longer card: the story, archival photo, what happens inside, and (where relevant) a "Book a treatment / table / activity here" CTA.
5. Animal cams: Tap on the alpaca paddock anchor → live preview of the alpaca cam, names overlaid on each animal (face recognition trained on Alberto + Alfonzo's distinctive markings).
6. "Take me there" — turn-by-turn AR pathfinding to any estate point (animated arrows on the ground via 8th Wall path layer).

### Tech requirements
- **WebAR platform: 8th Wall (Niantic)** — best-in-class image targets, geolocation, world tracking; works in mobile Safari/Chrome without install. Licence ~$3k/year.
- Alternative: Adobe Aero (lighter), Zappar (cheaper) — 8th Wall recommended for quality
- 15–20 AR anchor points photographed and registered as image targets
- Geofenced unlock (only works inside the estate; outside the gate, AR mode says "this experience awaits your arrival")
- Lightweight 3D assets (kept under 2MB each) — info cards, arrows
- Offline-capable: AR data cached on arrival so it works without estate Wi-Fi roaming

### Build effort
**L** — 8 weeks for build + content shoot + 8th Wall config. Annual content refresh budget needed (seasonal anchors, e.g. lambing in spring).

### Phase
**V2** — Bells-and-whistles, not table stakes. Ship in time for summer 2027.

### Risk / privacy
- **Privacy:** Camera frames processed on-device only; nothing recorded or uploaded. State this clearly.
- **Phone-walking risk:** Add a soft prompt every 90s: *"Look up — the estate is more beautiful than your screen."* Self-aware humour.
- **Battery drain:** AR is hungry; cap sessions, remind users to charge.
- **Weather:** Heavy rain makes phones unusable. Have indoor AR points (lodge interiors, restaurant) for wet days.

### Success metric
- 35% of in-stay guests launch AR mode at least once
- 5+ min average session length
- AR-attributed activity bookings: 10% of farm tours / spa treatments by month 12

---

## 5. Live Sustainability Dashboard — "Your Impact This Stay"

### What it is
Real-time, guest-specific dashboard showing the environmental impact of their stay. Calculates contributions from on-site wind turbine output, microplastic filter saves (the 700,000 fibres/wash claim made tangible per stay), bee colony count from the resident beekeeper, woodland CO2 sequestration on the 450 acres, water saved via low-flow systems, and food miles for ingredients consumed at The Weir during their stay.

### Why it matters
- **Anti-greenwashing armour:** Hard data is the antidote to vague green claims. This is what The Newt and Heckfield Place do best — proof, not marketing.
- **Guest emotional payoff:** "While you slept, our wind turbine generated enough power for 8 lodges. You were one." This is the kind of detail that becomes a TripAdvisor talking point.
- **PR magnet:** Industry coverage ("First UK resort to show personal sustainability dashboards").
- **Conversion at booking:** A glimpse of the live dashboard on the booking page increases conversion among ESG-conscious bookers.

### User flow
1. **Pre-stay:** On the booking confirmation, a small editorial block: *"While you're with us, you'll see your impact unfold in real-time."*
2. **At check-in (T-0):** Push: *"Welcome. Your impact begins now."* Opens the dashboard.
3. Dashboard is one scrolling page, magazine-laid-out:
   - **Top of page:** A single hero line in Newsreader italic — *"Tonight, while you slept, our wind turbine generated enough power to run your lodge 4× over."*
   - **Section 1 — Power:** Live kWh from turbine + solar, your lodge's share, the surplus exported to the National Grid.
   - **Section 2 — Water:** Litres saved by your lodge's low-flow taps vs UK average lodge. Microplastic fibres prevented from leaving the laundry: ~700,000 per wash × your stay.
   - **Section 3 — Land:** Bees on the estate (live colony count from beekeeper telemetry), trees planted this year, hectares of regenerative pasture, species count from last entomologist audit.
   - **Section 4 — Plate:** Of every dish at The Weir during your stay, average food miles, % from the estate or 10-mile radius.
   - **Section 5 — Departure summary (post-stay email):** "Your stay equivalent to planting 2 trees / removing X kg CO2 / saving Y litres of water."
4. Sharable card: One-tap creates a beautifully-set portrait image for Instagram Stories — the dashboard summary as editorial art, not a sales push.

### Tech requirements
- Sensor integrations:
  - **Wind turbine:** SCADA data via Modbus → MQTT bridge (most UK farm turbines run Endurance, Northern Power, EWT — all expose Modbus)
  - **Solar:** SolarEdge / Enphase / SMA — direct API (well-documented)
  - **Water:** Modbus pulse meters at distribution points (cheap retrofit)
  - **Hive count:** Apivox or BeeHero hive sensors (£200/hive — premium kit gives colony weight, temperature, sound spectrum) or honest manual updates by the beekeeper monthly
  - **Trees / pasture:** Static dataset, updated quarterly by estate manager
- Backend: TimescaleDB or InfluxDB for time-series; aggregation service to compute per-guest impact
- Privacy: Per-guest impact is *modelled* (their share of estate output during their stay), not surveilled

### Build effort
**M** — 6 weeks once data sources are live. Sensor installation is the gating dependency (£8–15k capex).

### Phase
**V1** — This is on-brand and high-leverage; ship early. Start with what's already metered (turbine, solar) and add later.

### Risk / privacy
- **Data accuracy:** Never overclaim. If a sensor goes down, show *"Updating soon"* — never extrapolate.
- **Climate scrutiny:** Have an estate-manager-reviewed methodology page. CO2 sequestration claims must use UK Forestry Commission verified rates only.
- **PR risk:** The "8% guaranteed return" lesson — get the language reviewed by a science communicator before launch.

### Success metric
- 70% of guests view the dashboard at least once during stay
- 25% of guests share the dashboard summary card to social
- Sustainability-related TripAdvisor mentions increase 3× by year 2

---

## 6. Live Farm Cam(s)

### What it is
24/7 livestream of estate animals: alpaca paddock (Alberto + Alfonzo), goats, ducks on the lake, sheep, the wildlife pond. Guests can subscribe to "alpaca cam" 7 days before stay to build anticipation. Editorial framing: not a CCTV grid, but a single beautifully-shot view per animal that switches every 30 seconds.

### Why it matters
- **Anticipation building:** A family with kids who watch the alpaca cam for a week before arrival are emotionally invested before they get out of the car.
- **Slow content:** Like the Berlin Zoo panda cam — known for being calming, sticky, social-shareable.
- **Off-property engagement:** Brings the brand into guests' daily life between stays.
- **Press hook:** Naming the alpacas, anthropomorphising the goats — earned media for free.

### User flow
1. Pre-stay (T-7d): Push: *"Alberto's been waiting for you. Meet the team."* Opens cam screen.
2. Cam screen is a single full-bleed video with a sage caption in italic: *"The alpacas, mid-morning, somewhere near the apple orchard."* Tiny secondary text gives weather + current paddock if relevant.
3. Tap to switch animals: Alpacas → Goats → Ducks → Lake → Woodland. Smooth crossfade, not a grid.
4. Mute by default; tap to unmute (audio captured = farm sounds, not human voices — privacy gated).
5. In-stay: Cams stay accessible. Bonus screen on the lodge in-room tablet: *"Did you see the alpacas this morning?"*
6. Post-stay: Email subscribe option — *"Stay close to the farm. Weekly digest from Alberto and the team."*

### Tech requirements
- **Cameras:** Reolink RLC-823A (4K outdoor PTZ, weather rated) × 4 + IR for night view. ~£400/camera + solar install at remote points.
- Streaming: WebRTC for low-latency (or HLS with 5s latency, lighter on bandwidth); host through Cloudflare Stream (£1 per 1k minutes) or AWS IVS
- Bandwidth: ~3 Mbps per stream × 4 streams × 24/7 = significant; use adaptive bitrate
- **Privacy mask:** Static overlay zones to obscure any human-traffic areas (paths, lodges in view). Audio: filtered to remove human speech if any picked up.
- Outage handling: graceful fallback to a 30s pre-recorded loop with a *"Resting — back online soon"* caption

### Build effort
**M** — 6 weeks once cameras installed (3 weeks for hardware), code is well-understood.

### Phase
**MVP** — Yes, MVP. This is high-charm, low-tech-risk, on-brand. Ship in beta with just the alpaca cam if you have to; expand later.

### Risk / privacy
- **GDPR & paths:** Cameras must not record identifiable humans. Position carefully; mask permanently if needed.
- **Animal welfare framing:** No infrared night cams on animals where it'd disturb them; daytime only on those.
- **Network reliability:** Estate Wi-Fi must reach remote points or use 4G/5G fallback. Bandwidth bill at ~£40/month.

### Success metric
- 50% of bookers in last 7d before stay open cam at least once
- 30% of confirmed bookings opt into pre-stay weekly digest
- 5%+ social shares attributed to cam captures

---

## 7. Open Kitchen Cam at The Weir

### What it is
Theatrical livestream from the open pass at The Weir's kitchen during service hours. Watch your meal being prepared. Two modes: (a) **Service stream** — live during lunch/dinner; (b) **Bakery stream** — 6am–9am, sourdough rising, pastries, bread being made. Chef-approved hours only; chef has a kill switch.

### Why it matters
- **Theatre over efficiency** — a luxury hospitality positioning. The Newt does it with kitchen-garden cams; The Black Swan at Oldstead's chef does it on Instagram. This codifies it.
- **Trust amplifier:** Live cam = nothing to hide = highest-grade kitchen hygiene message.
- **Conversion driver for restaurant bookings:** Watching the bakery at 7am converts breakfast bookers like nothing else.

### User flow
1. From the restaurant tab, a chip: *"In the kitchen, now."* Always-on during chef-approved hours.
2. Tap reveals a full-bleed slow-pan from a single overhead camera at the pass. No commentary, no graphics — just the kitchen.
3. Caption rotates every 30s with what's being made: *"Crab tart. Estate herbs. Service at 12:30."*
4. Single CTA below: *"Book a table"* — direct path to restaurant booking, current available slots only.
5. **Bakery mode:** 6–9am, camera switches to the bakery bench. *"Sourdough, on its second prove."*

### Tech requirements
- 1× ceiling-mounted Reolink/AXIS camera at pass (4K, well-lit; food photography needs colour-accurate exposure)
- Chef-controlled kill switch (physical button at pass + iPad in office) — privacy mandate
- Same streaming infra as farm cams
- Caption rotation: simple admin tool for chef/sous to update "now cooking"

### Build effort
**S** — 3 weeks. The hardware is the lift.

### Phase
**V1** — But test with the chef first. If they hate it, it dies. Get buy-in from Head Chef before commissioning hardware.

### Risk / privacy
- **Staff filming:** Each kitchen team member signs a video appearance consent at hire. New hires must consent before working a stream shift. Faces optionally blurred via real-time face detection if any staff opt out.
- **Service pressure:** Chef must own when to switch off. Never an obligation.
- **Sound:** Muted by default — kitchens are loud and shouty.

### Success metric
- 25%+ open rate during service hours
- Restaurant-booking conversion from cam viewers: 3× baseline
- Chef job satisfaction with the system after 6 months — qualitative, but binary kill criterion

---

## 8. Personalised Recommendation Engine

### What it is
A recommendation layer woven through the app: estate map, activity tab, Hester's suggestions, the morning push. Based on past stays, weather, time of year, family composition, dog profile, and recent in-app behaviour. Produces editorial-style prose recommendations, not Netflix-style grids.

### Why it matters
- **Time-to-value:** Cuts the decision-fatigue moment of "what shall we do today?" — the biggest in-stay friction point for any resort.
- **Cross-sell engine:** Drives revenue across spa, restaurant, activities, hampers without ever feeling like upsell.
- **Differentiator:** Most resort apps are flat lists of facilities. This one *knows* the guest.

### User flow
1. **Morning push (07:30 local):** *"Today's the kind of morning the SWCP was made for. Clearing at 9, sun by 11. Alberto's out at 10."*
2. Tap reveals the day's curated card stack:
   - **Top of day:** Weather + tide + light forecast + suggested first move
   - **Mid-day options:** 2 contrasting suggestions (active vs slow), based on guest profile
   - **Evening:** Dinner ideas (table availability check), spa late slots if relevant
3. Each suggestion is a paragraph of prose, not a tile. Sage CTA below for booking/directions.
4. **Adapt as the day moves:** Rain at 11am? Suggestions silently swap to indoor options (spa, art space, the long-table lunch at The Weir).
5. **Family aware:** If the dog profile says Bella the spaniel, "the SWCP route best for dogs" is foregrounded. If kids 6+9, "the alpaca feeding at 10, then the wild kids den until lunch".

### Tech requirements
- Recommendation service: rule-based engine first (covers 80% of value), ML personalisation later
- Inputs: stay history, dog/family profile, day's weather (Met Office DataPoint API), tide (UK Hydrographic Office), facility availability, time of day, last 24h app behaviour
- LLM (Claude Haiku) renders rule output as editorial prose — temperature low, brand voice prompt cached
- A/B test framework to learn which copy styles convert

### Build effort
**M** — 6 weeks for rules-based v1; ongoing tuning thereafter.

### Phase
**V1** — Core differentiator. Start with weather + time-of-day rules; layer in profile data as it accrues.

### Risk / privacy
- **Profile data accuracy:** Easy to wrongly remember a family. Always allow easy correction; never assume.
- **Recommendation fatigue:** Cap at one morning push per day. No "you might also like" creep.
- **Over-personalisation creepy zone:** Don't say "Last August you cancelled the spa at 11pm — try again?" Be helpful, not stalker-ish.

### Success metric
- 60% of guests open at least one daily recommendation
- 25% of recommendations result in a booked/visited activity
- Per-guest revenue uplift from recs vs control: +£35–£60 per stay

---

## 9. Photo Memories

### What it is
On-site photography programme + AI-curated post-stay gallery. Two arms:
- **(a) Roaming brand photographer** — 2 days per week, captures candid estate moments. Guests can opt-in pre-stay; photos are tagged with stay dates and delivered post-departure.
- **(b) Smart-album AI curation** — If guests share their own photo roll (with explicit consent), AI selects and edits the best 30 into a styled gallery.

### Why it matters
- **The memory IS the product** for hospitality. Beautiful curated images outlast any treatment.
- **Earned media:** Guests share gallery links — every gallery view is a brand impression.
- **Differentiator:** No Cornish competitor offers this; Heckfield Place charges £400+ for it as an add-on.
- **Repeat-stay trigger:** "Remember last August?" is the single strongest re-booking trigger.

### User flow
1. **Pre-stay:** Opt-in checkbox: *"Photo memories — yes please."* with single-paragraph plain-English consent.
2. **In-stay:** Photographer roams (Wed/Sat schedule shared in app). Guests can flag *"around the lodge in the morning"* for a specific shoot.
3. Optional: guest uploads phone-roll snaps via app share sheet. AI (Claude Vision) ranks them; guest picks favourites.
4. **48h post-departure:** Push: *"Your weekend, captured."* Beautifully laid out gallery — magazine-style, not grid.
5. Each photo downloadable (high-res JPEG + a 2:3 portrait crop for Instagram). Optional: order printed photobook (£45, 28pp, edition of 1 — fulfilled by MOO or Bookwright).

### Tech requirements
- Photographer scheduling system (small ops tool)
- Lightroom-mobile or Capture One workflow for raw → web
- Image AI: Claude Vision for aesthetic ranking; Imagen 3 or Flux for any light retouching
- Cloud storage (S3 / Cloudflare R2) with per-guest access
- Print fulfilment: MOO API (photobooks) — known good
- Consent management: granular, withdrawable, deleted after 12 months unless guest saves

### Build effort
**M–L** — 8 weeks for system. Photographer hire is the gating cost (~£40k/year if FT, or £600/week freelance).

### Phase
**V2** — Beautiful, not critical. Launch when other priorities are settled.

### Risk / privacy
- **Image rights:** Strict opt-in. Children require explicit parent consent. Other guests' incidental presence — masked or excluded.
- **GDPR:** Photos are biometric data. Treat as Special Category. Retention 12 months unless guest saves.
- **Storage costs:** Per-stay gallery ~2GB raw — costs add up. Compress archived galleries after 6 months.

### Success metric
- 30% opt-in rate
- 60% of opted-in guests view their gallery within 7 days post-stay
- 12% of viewers purchase a photobook

---

## 10. Wellness Journey Tracking

### What it is
Long-form wellness layer in the W Club. Tracks spa visit history, recommended treatment progressions ("you've done two facials — your skin therapist suggests the four-week course"), and optionally biomarkers (HRV, sleep, stress) if guest opts in via Apple Health / Google Fit / Oura / Whoop. Used by therapists to personalise treatments.

### Why it matters
- **Lifts the spa from "treatments shop" to "wellness practice"** — premium positioning.
- **Increases lifetime value:** Treatment courses (4–8 sessions) materially outperform one-offs.
- **Differentiator:** Only luxury wellness brands (Lanserhof, Six Senses, COMO Shambhala) currently do this.

### User flow
1. **In W Club tab:** *"Your wellness journey."* shows treatment history (date, therapist, notes the guest has consented to keep).
2. After a treatment, push: *"How are you feeling?"* — single soft-tap rating + optional voice-note.
3. **Progression suggestions:** *"Cara recommends the four-week regenerative facial course — usually £540, members £432. Three sessions remaining for you."*
4. **Biomarker opt-in:** *"Connect your watch."* — Apple Health / Google Fit / Oura / Whoop. Plain-English consent.
5. **Therapist view:** Before treatment, therapist sees relevant history + biomarker trend (sleep was poor this week — therapist adjusts pressure / aromas).

### Tech requirements
- Spa CRM integration (Try.be or replacement)
- HealthKit / Google Fit / Oura API / Whoop API integration
- Encryption at rest (Special Category PII)
- Therapist iPad app with read-only journey view

### Build effort
**L** — 10 weeks. Therapist training is half the project.

### Phase
**V2** — Requires spa booking platform to be stabilised first.

### Risk / privacy
- **Special Category PII:** Biomarkers are health data. Encrypt at rest, restrict access (need-to-know basis), document retention, support data export/deletion.
- **Recommendation bias:** Never recommend unsuitable treatments. Therapist must have final say.
- **Guilt-trap risk:** Don't show "you missed your weekly massage" — never use shame to drive bookings.

### Success metric
- 40% of returning spa guests engage with the journey tab
- 18% take up a treatment-course package (vs 3% baseline)
- Course completion rate >70%

---

## 11. Family Activity Planner

### What it is
Age-aware multi-day itinerary generator for families. *"Your kids are 6 and 9 — here's a 3-day plan."* Outputs a beautifully-laid-out, scrollable plan with bookings pre-held (not booked), allowing one-tap confirm. Adapts to weather forecast and what's actually open during the stay dates.

### Why it matters
- **Plans-by-Wednesday phenomenon:** Most families plan their week by Tuesday lunch; if they haven't planned, they default to "do nothing", and resort revenue suffers.
- **Saves the parent decision-fatigue moment.**
- **Reveals the breadth of the estate:** Many guests miss 60% of what's available.

### User flow
1. **At booking (or pre-stay):** Prompt: *"Travelling with little ones? Tell us about them — we'll plan something good."*
2. Guest enters: number, ages, energy levels (low/medium/high), known interests (animals/water/art/sport — multi-select).
3. **Plan generated:** Day 1 / Day 2 / Day 3 — magazine layout, prose-driven. Each day has 2 active morning options and 2 evening dinner options, plus a "shelter" indoor plan if weather turns.
4. Each plan has a *"Hold this plan"* button — soft-holds spa/treatment/restaurant slots for 4h while the parent decides.
5. Tap individual items to swap (Hester rewrites the day around it).

### Tech requirements
- Constraint solver (or simple rules): age ranges, weather thresholds, opening hours, capacity
- LLM rendering layer (Haiku) for prose
- Soft-hold infrastructure on the booking systems (treatments, restaurant)

### Build effort
**M** — 5 weeks.

### Phase
**V1** — Conversion engine for family bookings (30% of guests).

### Risk / privacy
- **Child PII:** Ages only, no names of children. Easy delete.
- **Over-scheduling risk:** Include explicit "do nothing" days. Anti-pattern: a 6-treatment, 4-meal, 3-activity weekend.

### Success metric
- 50% of family bookings engage with planner
- Per-family activity bookings: +£80–£120 vs control
- Family NPS lift: +6 points

---

## 12. Dog Profile System

### What it is
Persistent profile for each guest dog. Name, breed, age, allergies, mobility, treats they love, walking comfort, anxieties. On return visits, the lodge welcome pack is pre-configured: correct treat, dog bowl size, dog towel for muddy paws ready by the door. Pre-stay form: *"Tell us about Bella."*

### Why it matters
- Dog-friendliness is a top-3 booking driver (23–46% of guests bring a dog).
- The detail that **separates Whalesborough from Center Parcs entirely.**
- Repeat-stay magnet: the guest remembers that *the resort remembered the dog*.

### User flow
1. At first booking when "dog" is selected: small form — *"Tell us about Bella."*
2. Fields: Name, breed, age, weight (for treat sizing), known allergies, anxieties (fireworks/strangers/cars), favourite treats (sage chip selector), mobility (mobile/limited/post-op), walking pace (gentle/medium/active).
3. Profile saved to guest account.
4. **Pre-stay:** Profile auto-shared with housekeeping. Welcome pack: branded biscuit (or alternative if allergic), bowl, towel, list of best dog walks at current season.
5. **Return visit:** Profile pre-fills — guest confirms or updates. *"Bella's a year older now — anything changed?"*
6. **Dog-friendly intelligence:** Recommendations explicitly account for the dog (Hester suggests "the SWCP route Bella will manage").

### Tech requirements
- Profile data model
- Housekeeping prep checklist auto-populated from profile
- Lightweight CMS for dog-welcome pack options

### Build effort
**S** — 2 weeks.

### Phase
**MVP** — Yes, MVP. Cheap, on-brand, signature gesture.

### Risk / privacy
- Low risk. Dog data is not PII; treat lightly. Easy delete.

### Success metric
- 80% of dog-bringing guests complete profile
- Repeat-guest qualitative feedback: dog details mentioned spontaneously in 30%+ of reviews

---

## 13. Lodge Owner Portal

### What it is
For people who own a Trelowen, Tevi, or Gwari lodge. See real-time rental occupancy, income earned, maintenance schedule, expenses, view inspection reports, contact owner team, manage personal-use bookings. Mobile-first, secure.

### Why it matters
- Lodge sales is a £750k+ ticket. Owner experience post-sale drives referrals.
- Repeats the success of fractional / branded residences: owner-portal quality is a known sales objection.
- Reduces owner-team admin time (currently spreadsheet-based).

### User flow
1. Separate "Owners" login (post-purchase). 2FA mandatory.
2. **Dashboard:** Year-to-date rental income, occupancy chart, next personal-use window, recent maintenance.
3. **Calendar:** Block personal-use weeks; see what's booked, by whom (anonymised — "Guest party of 4 + dog"); manage friends-and-family rate bookings.
4. **Maintenance log:** Photo + note + cost for every job. Approve estimates above threshold.
5. **Income statements:** Monthly PDF auto-generated; download for accountants.
6. **Messaging:** Direct line to the lodge-owner team (real names, real photos).

### Tech requirements
- Separate sub-app with stricter access controls
- Integration with booking engine (read-only on owner-lodge availability)
- Integration with accounts system (Xero) for income reporting
- Document storage for inspection reports

### Build effort
**L** — 8 weeks.

### Phase
**V2** — Critical once lodge sales scale; not MVP for guest-facing app.

### Risk / privacy
- **Financial PII:** Owner statements are financial data. Treat carefully; PCI-adjacent if payment details stored.
- **Guest privacy:** Owners see anonymised guest info only. No names, no IDs.

### Success metric
- 80% of owners use portal monthly
- Owner satisfaction score on portal experience: 4.5+/5
- Referral-driven lodge sales: track and target 15% of new sales

---

## 14. Lakeside Locals Membership Wallet

### What it is
Digital membership card for the Lakeside Locals scheme (the local-residents discount/loyalty programme). Monday discount at restaurant, member-only events, early access to Grill and Chill tickets. Stored in Apple Wallet / Google Wallet with NFC at the till.

### Why it matters
- Local-resident revenue is steady cash flow vs episodic stay revenue.
- Editorial framing ("Locals") feels community, not transactional.
- Apple Wallet integration is a hallmark of polish.

### User flow
1. Sign up at the restaurant or online — quick form.
2. Membership card added to Apple/Google Wallet (.pkpass file generated server-side).
3. At restaurant till, member presents wallet card (NFC or scan); 10% Monday discount applied automatically.
4. **Member events:** App notification: *"Locals-only ticket release: Spring Grill and Chill, Saturday."* — booking link.
5. **Renewal:** Free annual membership; just needs renewing yearly to keep on file (PECR compliance).

### Tech requirements
- PassKit (Apple Wallet) + Google Wallet API
- NFC capability at till (most modern POS support this)
- Member CRM tied into main customer DB

### Build effort
**S** — 3 weeks.

### Phase
**V1** — Quick win, branded delight.

### Risk / privacy
- Standard PII handling; clearly time-limited consent for marketing.

### Success metric
- 1,000 active locals members by year 1
- 60% monthly engagement (visit/redemption)

---

## 15. W Club Membership Tiers

### What it is
Three tiers for ongoing spa/club membership:
- **Pool & Gym** — £85/month
- **Pool + Spa Classes** — £125/month
- **Full Spa Member** — £225/month (includes 1 treatment/month + class access + member rates)

App handles signup, tier change, payment, member-only booking window (book 14 days ahead of public).

### Why it matters
- Recurring revenue (currently negligible).
- Mirrors Soho House / Equinox model — a recognised premium pattern.
- Aligns with the W Club brand identity.

### User flow
1. In W Club tab, *"Become a member."* — single-screen tier picker (vertical card layout, magazine style).
2. Confirm payment method (Stripe subscription).
3. Member badge added to profile.
4. Member-only booking window opens automatically (treatments 14 days ahead vs 7 for non-members).
5. Tier-change flow: easy upgrade/downgrade; pro-rata billed. No friction on downgrade — keeps trust.
6. Pause membership for 1 month, max twice a year, no charge.

### Tech requirements
- Stripe subscriptions
- Spa booking platform must respect member booking windows + member rates
- Self-serve tier change / pause UI

### Build effort
**M** — 5 weeks.

### Phase
**V1** — Revenue play, ship early.

### Risk / privacy
- **Consumer Rights / Subscription regs (DMCC Act 2024):** Clear renewal reminders, 1-click cancellation, no dark-pattern downgrades.

### Success metric
- 300 members by year 1; £450k ARR
- <3% monthly churn

---

## 16. Gift Vouchers & Experience Gifts

### What it is
Beautifully-presented digital gift system: *"Treat someone to a spa day"*, *"A weekend in a hot tub lodge"*, *"Lunch + a tractor ride"*. E-voucher delivered to giver or recipient; optional posted printed card (heavyweight uncoated stock, foil emboss). QR-code redemption.

### Why it matters
- Gift vouchers smooth seasonality (Christmas, birthdays, Mother's Day).
- Editorial framing: the voucher itself becomes a luxury object.
- Marketing channel: every recipient becomes a new prospect.

### User flow
1. *"Give a gift"* in app or web — pick an experience or fixed value.
2. Personalise: recipient name, message in the magazine voice, choose delivery (e-mail / posted card / both).
3. Pay; voucher generated.
4. Recipient receives email with redemption code OR card in post (~5 working days, fulfilled by MOO API + foil-emboss option).
5. Redemption: At booking, recipient enters code; balance applied. Partial redemption supported.
6. Voucher value valid 24 months (legal default, generous).

### Tech requirements
- Voucher engine (issuance, balance, redemption, audit)
- MOO / Bookwright API for printed cards
- Email delivery (Resend) with proper unsubscribe
- QR-code scan at front desk for in-person redemption

### Build effort
**M** — 5 weeks.

### Phase
**V1** — High ROI feature.

### Risk / privacy
- Unspent voucher liability on balance sheet — finance lead needs sign-off.
- Recipient PII handling (giving form must be PECR-compliant).

### Success metric
- £150k+ annual voucher revenue by year 2
- 70%+ redemption rate (industry benchmark ~60%)

---

## 17. Pre-Arrival Provisioning — "The Larder"

### What it is
Pre-stay shop for welcome hampers, breakfast hampers, gin tasting boxes, vegan/GF/dairy-free grocery boxes, fresh flowers, champagne, kids' welcome pack. Delivered to lodge before arrival.

### Why it matters
- High-margin upsell (welcome hamper £85, breakfast hamper £45, etc.).
- Reduces guest friction — they arrive without needing to shop.
- Showcases the working farm (estate-grown produce in boxes).

### User flow
1. **At booking:** Final upsell screen: *"Arrive to something good."* — small grid of curated hampers, magazine-shot.
2. **T-7d before arrival:** Push if not ordered: *"Last chance for breakfast hampers."*
3. Tap to add to stay; pay at booking total or as separate transaction.
4. On arrival, hamper waiting on lodge counter. Photo confirmation sent post-placement.

### Tech requirements
- Inventory / SKU system (Shopify Hydrogen as embedded shop, or custom)
- Kitchen workflow for prep + delivery
- Dietary tag filtering

### Build effort
**M** — 4 weeks for app side; ops effort is the bigger lift (sourcing, kitchen prep capacity).

### Phase
**MVP** — Revenue lever, on-brand.

### Risk / privacy
- Allergen tracking critical (legal mandate, life-threatening if missed).
- Cold-chain for fresh produce.

### Success metric
- 35% attach rate on confirmed bookings
- £30+ AOV per upsell

---

## 18. Sunset / Tide / Weather Widget

### What it is
Live local data on home tab: sunset/sunrise time, tide times for Widemouth + Crooklets + Bude Canal, weather forecast for next 48h with surf swell, sea temperature, wind. Editorial-rendered, not weather-app style.

### Why it matters
- Useful daily.
- Surf-aware for the surfing demographic.
- Sets the rhythm of the day — opens the door to recommendations.

### User flow
1. Home tab shows a single sage strip: *"Sunset at 8:47. Mid-tide at Widemouth, swell 3–4ft from the south-west."*
2. Tap reveals expanded view: 48h tide curve (visual line, not a table), beach-by-beach forecast, surf at Widemouth + Crooklets.

### Tech requirements
- Met Office DataPoint API (free for ~2k calls/day; sufficient)
- UK Hydrographic Office tides (paid feed, ~£500/year)
- Surfline API or Magic Seaweed for surf data (some free)
- Sea temperature: Plymouth Marine Lab open data

### Build effort
**S** — 2 weeks.

### Phase
**MVP** — Charm + utility.

### Risk / privacy
- None significant.

### Success metric
- 70% daily engagement during stay

---

## 19. Estate Map + Live Status

### What it is
The 3D interactive estate map (existing requirement) with **live status overlays**: pool temperature, restaurant wait time, treatment availability, EV charger free spots, *"alpacas are out"* status, "spa pool busy", "trail closed for muck-spreading today".

### Why it matters
- Solves "is the pool warm enough?" / "is there a wait at the restaurant?" — known friction points.
- Reduces in-person enquiries at front desk.

### User flow
1. Tap map; live status icons over facilities.
2. Tap a facility for detail: current state, predicted state in next 2h, book/visit CTA.
3. EV charger status from charger app deep-link (Pod Point, Project EV).
4. *"Alpacas out / paddock"* status from a tiny GPS collar (Loc8tor or PetSafe per animal).

### Tech requirements
- 3D map: HypaMaps / Mapbox GL JS / custom WebGL — Mapbox most cost-effective
- Live status integrations: pool sensor (temperature probe, MQTT), restaurant booking system (covers count), spa system (slot count), EV charger API
- Alpaca GPS collars (charm feature; £100/collar)

### Build effort
**L** — 10 weeks for full live map.

### Phase
**V1** — Core differentiator.

### Risk / privacy
- Sensor reliability: failover gracefully.
- Animal welfare: GPS collars on grazing animals must be lightweight and welfare-approved.

### Success metric
- 80% of in-stay guests use map daily
- 30%+ reduction in front-desk enquiries on these topics

---

## 20. Loyalty Programme — "Whalesborough Circle"

### What it is
Points-per-£ across all revenue streams: accommodation, spa, restaurant, retail, hampers. Tiers:
- **Visitor** — first stay; small welcome
- **Friend** — 2+ stays or £2k LTV; member rates, priority booking
- **Member** — 5+ stays or £5k LTV; complimentary treatment per stay, late checkout
- **Patron** — 10+ stays or £15k LTV; personal Guest Experience Maker, custom welcome, off-season private estate access

### Why it matters
- 83% return-intent → loyalty programme is a no-brainer.
- Tiered perks drive cross-category purchase.
- Editorial naming ("Friend / Member / Patron") avoids the airline-points cliché.

### User flow
1. Auto-enrolled on first booking; tier badge in profile.
2. Every transaction: 1 point per £. Bonus events (e.g. autumn shoulder season 3× points).
3. Tier upgrade: confetti is forbidden. A single editorial line appears: *"You're now a Friend of Whalesborough. We've sent you something."* — physical card by post the next morning, hand-written.
4. Spending points: redeem against any service; never expire.
5. **Patron tier:** Personal Guest Experience Maker assigned (named real person); WhatsApp line for direct messages.

### Tech requirements
- Loyalty engine: rule-based ledger
- Tier-recalculation cron
- Integration with all 4 booking systems for points accrual
- Physical card fulfilment for tier upgrades (MOO)

### Build effort
**L** — 10 weeks.

### Phase
**V1** — Conversion lever; bake into MVP+1.

### Risk / privacy
- **Subscription / contract regs:** Loyalty points = financial liability on balance sheet.
- **Closing the programme:** Carefully grandfather any future changes.

### Success metric
- 60% of repeat guests join Circle
- Repeat-stay rate lifts +12pp
- Member ADR uplift: +£40 vs non-member

---

## Three Additional Features (proposed by Peake Management)

These didn't appear in the brief but would, in our view, push Whalesborough into legendary territory.

### 21. The Whalesborough Audio Companion — Estate Stories on Demand

A short-form audio library narrated by the estate manager, head chef, head therapist, and the lead beekeeper. Each one 2–6 minutes long. Played in the lodge via Sonos or through the app on a walk. Topics: *"The story of Trelowen"*, *"What we plant in spring"*, *"How the South-West Coast Path got its name"*, *"Three minutes on sourdough"*. Plus seasonal "morning briefings" — a 90-second piece on what's happening on the estate today. **Why:** Audio is the format the brand voice was made for. Newsreader italic *spoken aloud*. Replaces all the explanatory laminated cards in lodges with something cinematic. Build effort: **M** (8 weeks, including audio production with a real sound designer). Phase: **V1**.

### 22. "Other Guests Right Now" — Anonymous Community Layer

A low-key community surface that, with consent, lets guests see fragments of what other guests are doing right now on the estate — *"someone in Trelowen 7 is having the truffle on toast at The Weir"*, *"a couple in Gwari 2 just finished the bamboo facial"*. No names, no identifying detail, but a sense of being in a shared place with other people who chose Whalesborough. Pulled in editorial style as a vertical scroll, refreshes every 2 minutes. **Why:** Modern luxury is paradoxically about *quiet community* — the Soho House effect of being among one's tribe. Sets Whalesborough apart from sterile, isolated hotel-room experiences. Privacy is paramount — strict opt-in, no real-time location, granular consent per category. Build effort: **M** (5 weeks). Phase: **V2**.

### 23. The Saturday Dispatch — Curated Weekly Letter

A weekly editorial newsletter, written by a real person on the team, sent every Saturday morning. Long-form — 600–900 words. Brand voice: thoughtful, slow, considered. What's been planted this week. The beekeeper's notes. A recipe from the chef. A short essay by a guest writer (local artist, food critic, naturalist). One single subtle CTA at the bottom (a stay, a treatment, an event), never aggressive. **Why:** This is the connective tissue between stays. It's what makes a guest feel they belong to *the place* even when they're at home. It compounds — a 2-year subscriber has been with the brand longer than most marriages last. References: Heckfield Place's *Notes from a Farm*, The Newt's *Cyder Press*, Soho House's *House Notes*. Build effort: **S** (2 weeks tech; ongoing editorial commitment is the real cost — needs a dedicated 1d/week writer-editor). Phase: **MVP** if a writer is in place; **V1** otherwise.

---

## Recommended Phasing Summary

**MVP (months 0–6):**
Farm cams, Dog profile, Pre-arrival provisioning, Sunset/tide widget, The Saturday Dispatch (if writer is in place)

**V1 (months 6–12):**
Hester AI concierge, Personalised recommendations, Live sustainability dashboard, Estate map with live status, W Club membership tiers, Gift vouchers, Lakeside Locals wallet, Family activity planner, Digital key (premium lodges), Open kitchen cam, Loyalty Circle, Audio companion

**V2 (months 12–24):**
AR estate tour, In-lodge smart controls, Photo memories, Wellness journey tracking, Lodge owner portal, Anonymous community layer, Digital key rollout to all lodges

**Total premium-feature build budget guidance:** £180–240k of the £500k programme. The remainder funds the core booking platform, design, content, integrations, and compliance.

---

*Spec prepared by Peake Management, 14 May 2026. All features should be reviewed against the Coastal Editorial design system (DESIGN-SYSTEM-REFERENCE.md) and the UK compliance brief before commencement. No feature is approved for build until the chef / therapist / estate manager / beekeeper / front-desk team have walked through its operational implications.*
