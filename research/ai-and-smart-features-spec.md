# AI Concierge & Smart-Resort Features Specification
## Whalesborough Farm Resort & Spa | £500k Booking Platform
*Prepared: 14 May 2026 | Author: Peake Management*

---

## Executive Summary

Seven smart features are specified below to deliver the "wow" component of the Whalesborough platform — features no Cornwall competitor currently offers. They are sequenced into three release waves balancing impact, build risk, and integration dependency.

### Release Sequencing

**MVP (Launch — Q3 2026)**
- **Aurelia AI Concierge** (text only, claude-sonnet-4-6, knowledge base v1)
- **Real-time Estate Status Dashboard** (weather, sunset, tide, restaurant availability, scheduled pool temps)
- **Personalised Recommendation Engine** (rule-based v1)
- **Photo Memories** (manual photographer upload, opt-in gallery, no AI face match)

**V1 (Q1 2027 — 4-6 months post-launch)**
- **Aurelia voice mode** (ElevenLabs Turbo v3, premium-tier guests only)
- **Digital Key & Mobile Check-in** (BLE locks for Trelowen + Gwari new-build lodges)
- **In-Lodge Controls** (Trelowen + Gwari only — heating, hot tub, lighting scenes)
- **AI photo curation** (geofence + timestamp matching, no biometrics)

**V2 (Q3 2027+ — phased retrofit)**
- **Digital Key + In-Lodge Controls retrofit** to Arvor Suites and select cottages
- **Voice / Audio Tour** (offline-capable PWA, geofence-triggered)
- **Live IoT estate metrics** (wind turbine kW, water saved, pool temp sensors)

### Recommended Build Budget Allocation (within £500k)

| Feature bucket | MVP | V1 | V2 | Subtotal |
|---|---|---|---|---|
| Aurelia AI Concierge | £42k | £18k | £8k | £68k |
| Estate Status Dashboard | £14k | £6k | £12k | £32k |
| Digital Key & Check-in | — | £28k | £22k | £50k |
| In-Lodge Controls | — | £34k | £40k | £74k |
| Photo Memories | £8k | £16k | £4k | £28k |
| Recommendation Engine | £12k | £10k | £6k | £28k |
| Audio Tour | — | — | £14k | £14k |
| **Smart features total** | **£76k** | **£112k** | **£106k** | **£294k** |

Remainder of £500k covers core booking engines, design system implementation, integrations (Landal, Try.be, Stripe, GHL), CRM build-out, and compliance work.

---

## 1. Aurelia — AI Concierge

### Detailed Spec

**Name:** Aurelia (latin "golden" — Coastal Editorial brand-fit; tested against "Maren", "Wren", "Tamar"; Aurelia chosen for warmth + non-gendered alternative usage)

**Persona brief:** A composed Cornish guest experience maker. Newsreader-italic warmth in welcome, Plus Jakarta concision in answers. Never apologises performatively. Never uses emojis. Never says "absolutely" or "great question". Closes with one specific, useful suggestion rather than "let me know if you need anything else".

**Knowledge base contents (vector-indexed):**
- 16 scraped resort content pages (cottages, Arvor Suites, spa, restaurant, activities)
- Treatment menu (every ritual, duration, price, contraindications)
- Restaurant menus (breakfast, lunch, seasonal events) — refreshed weekly via admin
- Cottage specs (capacity, dogs welcome, pram suitable, hot tub, sea view, ground floor)
- Local area POIs (Widemouth, Bude Canal, Tintagel, SWCP segments, dog-friendly beaches)
- Tide tables (12 months ahead, refreshed monthly from UKHO)
- Sustainability data (wind turbine, bees, water reuse)
- House rules, fire safety, accessibility info per unit
- 12 lodge sales objection counter-arguments (CSV already prepared)

**Capabilities by tier:**

| Capability | Browse | Booking | In-stay | Post-stay |
|---|---|---|---|---|
| Answer questions about resort | Yes | Yes | Yes | Yes |
| Recommend cottage/treatment/dish | Yes | Yes | Yes | — |
| Check live availability | Yes | Yes | Yes | — |
| Pre-fill a booking (user confirms) | Yes | Yes | Yes | — |
| Book on user's behalf | — | Yes (with explicit "Confirm £X" tap) | Yes | — |
| Modify existing booking | — | — | Yes | — |
| Suggest cross-sell (spa + dinner) | Yes | Yes | Yes | — |
| Request human callback | Yes | Yes | Yes | Yes |
| Review collection assist | — | — | — | Yes |

**Hard limits — Aurelia will refuse and route to human:**
- Price negotiation, discount requests, comp/goodwill offers
- Refund commitments outside published policy
- Medical advice (allergies, treatment contraindications → route to spa team)
- Lodge sales investment-return commitments (FCA risk)
- Anything involving payment card details typed in chat
- Anything claiming to be from a staff member or admin override

**Entry points:**
- Floating action button (Coastal Editorial: 48x48px, sage `#4a6457`, no shadow, no rounded corners — square chip with "Ask" label in Plus Jakarta 500 uppercase)
- Full-screen overlay invoked from any "talk to us" anchor
- Email/SMS deep link from pre-arrival comms — opens app to Aurelia primed with the booking context
- QR codes around the estate ("Scan to ask Aurelia") for in-stay use
- Quiet mode after 22:00 — escalation suggestion changes to "Reception opens 07:00; for emergencies call 01288 …"

**Voice mode (V1, premium-tier accommodations):**
- Provider: **ElevenLabs Turbo v3** (180-220ms latency, multilingual, custom voice cloning)
- Alternative tested: OpenAI gpt-4o-audio (cheaper, lower quality); rejected
- Custom voice: commission a Cornish-accented female voice (£3,500 one-off)
- Push-to-talk on phone; hands-free on tablet/Arvor in-room device
- Transcripts saved to user account for the duration of the stay only

**Handoff to human concierge:**
- Confidence threshold trigger: if Claude returns `escalate: true` in structured output → handoff button shown
- Topic triggers: complaints, accessibility special requests, party of 12+, lodge-purchase serious enquiry, dietary allergy + treatment booking combo
- Hours: human desk 08:00-22:00 daily; outside hours Aurelia offers callback request with priority flag
- Handoff format: full chat transcript + booking context shared with concierge dashboard

### Tech Architecture

```
[Mobile/Web client]
       │  HTTPS + JWT
       ▼
[Edge API Gateway — Vercel/Cloudflare Workers]
       │
       ├─► [Rate limiter — 30 msg/hr/user, 100/hr/IP]
       ├─► [PII scrubber — strips card numbers, full DOBs from prompts]
       │
       ▼
[Aurelia Orchestrator — Node/TS service]
       │
       ├─► [Context builder]
       │     ├─ User account (preferences, past stays, current booking)
       │     ├─ Vector search (Supabase pgvector) on knowledge base
       │     └─ Live data injection (weather, tides, availability snapshots)
       │
       ├─► [Tool router]
       │     ├─ search_availability(...)
       │     ├─ check_spa_slots(...)
       │     ├─ create_provisional_booking(...) — requires user confirm
       │     ├─ get_tide_today(...)
       │     ├─ escalate_to_human(...)
       │     └─ get_weather(...)
       │
       ▼
[Claude API — Anthropic]
       │
       ├─ Premium tier (Trelowen, Gwari, Tevi guests): claude-opus-4-7
       └─ Standard tier (all others): claude-sonnet-4-6
       │
       ▼
[Response post-processor]
       ├─ Tone check (regex blocklist: "absolutely", "I apologise", emojis)
       ├─ Hallucination guard (citation required for prices/dates)
       └─ Confirmation gates for any write action
```

**Vector DB:** Supabase pgvector (already in stack for booking DB — no extra vendor, GDPR-compliant EU region). Knowledge base ~600 chunks, refreshed nightly from CMS.

**Prompt caching:** System prompt + knowledge base context cached for 1 hour (Claude API cache hit rate target >70% — cuts cost by ~75% on cached portion).

**Sample system prompt structure:**
```
<persona>
You are Aurelia, the digital concierge for Whalesborough Farm Resort & Spa,
a 5-star countryside retreat on 450 acres in Cornwall. Voice: composed,
warm, editorial. Never use emojis. Never say "absolutely" or "great
question". Close each reply with one specific, useful next step.
</persona>

<hard_limits>
You may NOT: quote refunds, negotiate prices, give medical or investment
advice, accept payment details in chat, claim to be human.
If asked, respond: "I'll have [Name from concierge_desk_today] call you
back within [response_window]" and call escalate_to_human().
</hard_limits>

<knowledge>
{retrieved_chunks}
</knowledge>

<live_context>
Weather: {weather_now}
Tide low/high: {tide_today}
Restaurant tonight: {restaurant_status}
User booking: {user_booking_or_none}
</live_context>
```

### Build Effort & Phasing

| Phase | Weeks | FTE | Cost |
|---|---|---|---|
| MVP (text, Sonnet, KB v1) | 8 | 1.5 dev + 0.5 prompt eng | £42k |
| V1 (voice, Opus tier-up, KB v2) | 5 | 1 dev + voice production | £18k |
| V2 (analytics, fine-tuning) | 3 | 0.5 dev | £8k |

### Privacy & Security
- Aurelia never receives user passwords, full card numbers, ID document images, or full DOB (only "is user 18+?" boolean)
- Conversation logs pseudonymised (user_id hash, not name) — retained 90 days for QA, then deleted
- Prompt injection defence: incoming user messages are wrapped in `<user_input>` tags, system instructions never repeated from user content
- Voice transcripts deleted on stay checkout (DUAA-compliant retention)
- Opt-out: every chat has "I'd rather speak to a person" — never penalised in service quality
- DPIA required (high-risk processing under DUAA 2025): documented before launch

### Cost (build + ongoing)
- **Build:** £68k (over 3 phases)
- **Anthropic API ongoing:** ~£0.03 per cached conversation (Sonnet), ~£0.18 (Opus). Projected 14,000 conversations/month → ~£600/month blended
- **ElevenLabs (V1+):** £400/month standard plan + voice clone £3,500 one-off
- **Supabase pgvector:** already included in core stack
- **Total ongoing:** ~£1,000/month at V1 maturity

### Risks
| Risk | Probability | Mitigation |
|---|---|---|
| Hallucinated price/availability | Med | All prices fetched via tool call, never from model knowledge |
| Brand voice drift | Med | Tone-check regex on every output, weekly transcript audit |
| Prompt injection from QR-code chat | Low | Input sanitisation, capability gating |
| Over-reliance reducing human warmth | Med | Hard escalation paths, "speak to a person" always one tap away |
| Anthropic API outage | Low | Graceful fallback to FAQ + concierge callback form |

### Success Metrics
- Conversation deflection rate (resolved without human handoff): target 78%
- CSAT on chat (thumbs up/down end of session): target 4.4/5
- Cross-sell attribution (bookings/spa adds originated in chat): target 8% of revenue
- Booking flow assist rate (% of bookings touched by Aurelia): target 35%

---

## 2. Real-Time Estate Status Dashboard

### Detailed Spec

A glanceable widget that earns its place on the home screen by being genuinely useful — never decorative.

**Data tiles (priority order):**
1. **Weather + sunset/sunrise today** — Met Office DataPoint API, Marhamchurch grid
2. **Tide times at Widemouth Bay** — UKHO Admiralty TotalTide (paid sub) or free EasyTide scrape
3. **Restaurant covers available tonight** — from booking engine, refresh on write
4. **Spa same-day availability** — Try.be polling every 5 min
5. **Pool status** — indoor 29-30°C, outdoor 26°C — scheduled at MVP (always shows target), V2 live IoT
6. **Activity slots today** — alpaca feeding 11:00 & 16:00 (15 spots each), tractor ride 14:00 (20 spots)
7. **EV charging availability** — 6 bays, refreshed every 2 min from EV provider API
8. **Sustainability snapshot** — V2 only when live data available: turbine kW today, water saved this week

**Audience-aware variants:**
- **Browse mode (unauthenticated):** weather + sunset + "today at the resort" highlights
- **Booked-stay mode (authenticated, pre-arrival):** above + countdown to arrival + tide/weather for arrival date
- **In-stay mode (authenticated, currently on-site):** all tiles + walking time from current geofenced zone to each facility
- **Staff dashboard:** above + occupancy %, wait list lengths, no-show flags

**Refresh strategy:**
- Static (1/day): tides, sunset
- Polled (every 5 min): weather, restaurant covers, spa slots, activity slots
- WebSocket (V2): pool temp, turbine output, EV bay status
- Manual override: staff can pin a tile (e.g. "Restaurant closed for staff training tonight")

### Tech Architecture

```
[Data sources]
   ├─ Met Office DataPoint API (weather)
   ├─ UKHO TotalTide (tides — paid)
   ├─ Booking DB (restaurant, spa, activity slots)
   ├─ EV provider API (Pod Point / GeniePoint)
   └─ IoT gateway (V2: pool sensors, turbine inverter Modbus → MQTT)
        ▼
[Edge cache layer — Cloudflare KV, 60s TTL]
        ▼
[Public read-only API /estate/status]
        ▼
[Mobile/Web client — SWR with 60s revalidate]
```

**IoT integration (V2):**
- Pool: Pentair IntelliCenter API or retrofit Tuya temp probes
- Turbine: Bergey Excel-S already on-site; Modbus TCP → industrial gateway → MQTT broker (HiveMQ)
- Water meter: pulse-output meter + ESP32 gateway

### Build Effort
- MVP: 3 weeks dev — £14k
- V1: 2 weeks (refinement + variants) — £6k
- V2: 4 weeks (IoT integration, on-site install) — £12k + ~£8k hardware

### Privacy
- All tiles show aggregate data — no PII
- Geofence-aware "walking time" feature requires explicit location permission, asked once with clear purpose
- Location used only for distance calc, never logged or transmitted off-device

### Risks
| Risk | Mitigation |
|---|---|
| Met Office API downtime | Fallback to cached last-good + "updated 2hr ago" badge |
| IoT sensor reads wrong → guest confusion | Tile shows scheduled value with "live" badge only when fresh |
| Over-promising "live" data | Conservative labels; never claim live unless WebSocket connected |

### Success Metrics
- Home screen dashboard view rate: target 60% of authenticated sessions
- Tap-through to detail page: target 22%
- Reduction in front-desk "what time is sunset?" calls: target -40%

---

## 3. Digital Key & Mobile Check-in

### Detailed Spec

**Pre-arrival flow (T-48hr push notification):**
1. Confirm arrival window (15-min picker between 16:00-20:00)
2. ID verification (Onfido SDK — passport/driving licence scan; mandatory for primary guest only, single-use, not stored)
3. Party confirmation (any guest changes vs booking)
4. Sign house rules (e-signature, audit logged)
5. Estate-map walkthrough (which gate, which path, where to park)
6. Once all complete → digital key activates at T-2hr on arrival day

**Arrival flow:**
1. ANPR camera reads number plate at front gate (already installed) → gate opens if booking active and arrival window active
2. App push: "Welcome — your key for [Cottage name] is ready. Tap to unlock"
3. Phone-to-lock via BLE proximity (no NFC requirement on Android — BLE wider support)
4. First unlock triggers in-app onboarding micro-tour

**Multi-key:**
- Primary guest can grant key to up to 5 additional guests in same booking
- Each guest installs the app + accepts invite (email or SMS link)
- Each key audited separately (who unlocked, when)
- Children: parental control — adult-tied key

**Revocation:**
- Auto-revoke at checkout time (11:00 default, configurable per cottage)
- Manual revoke from admin dashboard for cancellations or incidents
- Cryptographic revocation list pushed to lock every 4 hours; locks reject revoked credentials offline

**Hardware:**
- **Recommended: Salto KS** (cloud-native, BLE + NFC, designed for hospitality at scale, REST API)
- Alternatives evaluated:
  - August Smart Lock — consumer-grade, not suitable
  - Yale Linus L2 — good but consumer cloud
  - **ASSA ABLOY VingCard** — premium hotel standard, expensive (~£600/door)
  - **Salto KS** — £280/door + £15/month/door subscription, hospitality-grade
- Salto chosen: API quality, mortise + escutcheon options, works with existing door hardware, BLE offline-capable

**Fallback:**
- Each lock supports backup PIN (rotated per booking)
- On-site host has master mech key for hardware failures
- "Lost phone" flow: identity verification → SMS PIN issued within 5 min

**Privacy:**
- BLE doesn't broadcast continuously; phone-side scans only when within geofence
- No continuous location tracking — geofence trigger only (arrival window + outside front door)
- Lock audit log retained 90 days then anonymised
- ID document data: Onfido processes, returns pass/fail only, originals deleted within 24hr

### Tech Architecture

```
[Mobile app]
   ├─ BLE scanner (only active in arrival geofence)
   ├─ Apple Wallet pass option (V1.5 — express-mode key)
   └─ Onfido SDK (pre-arrival ID verify)
        ▼
[Backend]
   ├─ Salto KS REST API (key issuance/revocation)
   ├─ Booking DB (active stay check)
   ├─ ANPR integration (read plate → query active bookings)
   └─ Audit log (immutable, separate DB)
```

**WebAuthn consideration:** Initially explored but rejected — overkill for hospitality, complicates multi-key flows. Stick with backend-issued ephemeral credentials.

### Build Effort & Cost

| Item | Cost |
|---|---|
| Salto KS hardware (initial 12 doors — Trelowen + Gwari new builds) | £3,360 |
| Salto subscription (12 doors × £15 × 12mo) | £2,160/yr |
| Salto retrofit (V2, 20 more doors) | £5,600 + £3,600/yr |
| Onfido ID verification | £1.50 per verification → ~£18k/yr at 12,000 stays |
| Software dev (V1) | £28k |
| Software dev (V2 retrofit + Apple Wallet) | £22k |
| **Total build:** | **£50k** |
| **Ongoing:** | **~£22k/yr at V2 maturity** |

### Risks
| Risk | Mitigation |
|---|---|
| Lock battery dies mid-stay | BLE locks last 12-18 months on AAs; monitoring + low-batt alert at 20% |
| Guest forgets phone | PIN fallback + on-site host master |
| Wrong-house unlock attempt | Salto enforces per-booking ACL; off-property unlocks denied |
| ID verification false-reject | Manual override route via concierge |
| GDPR breach via ID images | Onfido is the data processor; DPA in place; no raw images stored |

### Success Metrics
- % of guests using digital key (vs PIN/host): target 75% at V1, 90% at V2
- Average check-in friction time: target <90 seconds (vs ~6 min front-desk benchmark)
- Lock-failure incidents per 1000 stays: target <2

---

## 4. In-Lodge Controls ("Connected Lodge")

### Detailed Spec

**Controls available per lodge (tiered):**

| Control | Trelowen | Gwari | Arvor | Standard cottages |
|---|---|---|---|---|
| Heating temp setpoint | Yes | Yes | V2 | V2 |
| Heating schedule | Yes | Yes | V2 | — |
| Hot tub pre-heat | Yes (where fitted) | Yes (where fitted) | — | — |
| Lighting scenes | Yes | Yes | V2 | — |
| Sonos / streaming | Yes | Yes | — | — |
| Chromecast / TV | Yes | Yes | V2 | — |
| Curtains/blinds (motorised) | V2 optional | V2 optional | — | — |

**Pre-arrival "have it ready for us" toggle:**
- Heating: defaults to 18°C 24hr before arrival, 21°C 2hr before
- Hot tub: requires 4-6hr pre-heat; toggle "heat for arrival 17:00" with cost transparency (£8 energy supplement) — opt-in to honest pricing rather than hide
- Lights: "warm welcome" scene auto-activates 30 min before arrival (sunset-aware)

**In-stay scenes:**
- "Arrival" — all on warm, music welcome track
- "Relax" — dim warm + Sonos low ambient
- "Dinner" — dining area bright, lounge dim
- "Sleep" — bedroom 50% / living off / heating drop 2°C
- "Away" — all off, heating eco

**Privacy guardrails (critical):**
- No always-listening microphones in lodges. Period.
- No voice assistant integration (Alexa/Google) shipped by default; guest may pair their own
- Guest controls are guest-owned during stay — resort cannot remote-override (except emergency: smoke detected, water leak)
- All control logs deleted on checkout (only aggregate energy metrics retained, anonymised)

**Smart-home platform choice:**

| Platform | Pros | Cons | Verdict |
|---|---|---|---|
| Matter (over Thread) | Open, future-proof, multi-vendor | New, controller ecosystem fragmented | Choose for new builds (Trelowen) |
| Apple HomeKit | Strong privacy posture | Locks out Android-only guests | Reject for guest UX |
| Lutron Caseta | Reliable, mature | Lighting-focused, US-centric | Use for lighting in retrofits |
| Crestron Home | Premium integrator-standard | £8-15k/lodge cost | Overkill, reject |
| **Loxone** | EU brand, single ecosystem, server-based, integrator-friendly | Requires Miniserver per property | **Recommend** for Trelowen/Gwari |
| Home Assistant + custom | Cheapest, hackable | Reliability risk for guest-facing | Reject for guest UX |

**Recommendation: Loxone for new-build premium lodges (Trelowen, Gwari, Tevi); skip for standard cottages in MVP and V1.** Loxone Miniserver = £700/lodge + ~£3,500/lodge devices, gives single REST API surface, 10-year ecosystem stability.

**Per-unit setup cost:**
- Trelowen/Gwari (new build, full smart): £6,500/lodge hardware + £2k install
- Arvor Suites (retrofit, partial — heating + lights only): £2,800/suite
- Standard cottages: not in scope — stay simple, app shows static info instead

### Tech Architecture

```
[Per-lodge Loxone Miniserver]
   │  REST / WebSocket
   ▼
[Edge gateway — VPN tunnel into resort network]
   │
   ▼
[Resort Smart Home API — /lodges/{id}/state]
   │  RBAC: guest_token allows only their active lodge
   ▼
[Mobile app — Smart Lodge tab]
```

**Hot tub pre-heat:** integration via Riptide / Balboa Spa BWA WiFi module if present, or relay-controlled isolator switch with current sensor for older tubs.

### Build Effort & Cost

| Item | V1 (12 lodges) | V2 (20 retrofits) |
|---|---|---|
| Hardware per lodge | £6,500 × 12 = £78k | £2,800 × 20 = £56k |
| Install labour | £2k × 12 = £24k | £1,500 × 20 = £30k |
| Software dev (app integration) | £34k | £40k |
| **Total** | **£136k (hardware + £34k dev)** | **£126k (hardware + £40k dev)** |

*Note: hardware budget is outside the app build budget — sits with property capex.*

### Risks
| Risk | Mitigation |
|---|---|
| Guest accidentally turns off heating in winter → freeze risk | Minimum floor temp 14°C enforced server-side |
| Hot tub pre-heat without water → element burnout | Float-switch interlock, hardware-level |
| Loxone API change breaks app | Adapter layer, version-pinned firmware |
| Guest privacy concern over "smart lodge" | Clear in-stay messaging: no mics, no cameras, controls delete at checkout |

### Success Metrics
- % of stays using at least one smart control: target 80% in premium lodges
- Hot tub pre-heat opt-in (where available): target 65%
- Guest survey "smart lodge felt like" score: target 4.6/5

---

## 5. Photo Memories

### Detailed Spec

**Two photo sources:**
1. **Event photographers** (e.g. weddings, Grill and Chill events) — already commissioned, deliver via gallery
2. **Weekend "lifestyle" photographer** (V1) — discreet, opt-in, Saturday mornings 09:00-11:00 around farm activities (alpaca feeding, tractor ride)

**Opt-in flow (mandatory before any photo capture of identifiable guests):**
1. Pre-arrival email: "Would you like complimentary lifestyle photography during your stay?"
2. App-based consent: explicit toggle, separate per adult, parental for children
3. On-site: photographers wear visible "Whalesborough Photographer" lanyard; ask before photographing groups not on opt-in list
4. Withdrawal: one tap deletes all photos of you from your gallery + photographer's roll

**AI image curation (V1):**
- Photographer uploads raw set tagged with timestamp + geofence zone
- Algorithm matches to bookings: same timestamp + zone + opt-in active = candidate
- Facial recognition: **not** used for guest matching at MVP — geofence + timestamp only
- V2 option: opt-in face matching using on-device embedding (never server-stored biometric)

**Delivery:**
- Curated gallery in app, available within 48hr of capture
- Post-stay email: "Your memories from Whalesborough" with web gallery link (72hr signed URL)
- Download originals (TIFF) up to 14 days post-stay
- Sharing: native share sheet, suggested caption "Captured at Whalesborough" — no auto-watermark unless guest selects

**Privacy:**
- Photos of opted-in adults only (children require parental signed consent)
- No facial recognition database
- Photographer rolls deleted after 14 days of stay end
- Right to erasure honoured within 48hr
- DPIA documented

### Tech Architecture

```
[Photographer SD card upload via secure portal]
   │  TLS, signed token per session
   ▼
[Cloudflare R2 storage — encrypted at rest]
   │
   ▼
[Curation worker]
   │  Reads EXIF timestamp + GPS
   │  Cross-references opt-in roster + active bookings in zone
   │  Marks candidate matches
   ▼
[Editor review (human, 30 min/day)]
   │  Confirms matches, removes accidental captures
   ▼
[Per-stay gallery — accessible via app + post-stay email link]
```

**Storage estimate:** 800 photos/weekend × 8MB avg × 52 weeks = ~330GB/yr. R2: ~£5/month. Original retention 14 days, processed JPEGs retained 12 months.

### Build Effort & Cost

| Item | Cost |
|---|---|
| MVP (event-only, manual upload) | £8k dev |
| V1 (lifestyle photographer flow, AI curation by geofence) | £16k dev |
| V2 (opt-in face match, refinements) | £4k dev |
| Photographer retainer (weekend, V1+) | £450/weekend × ~30 weekends = £13.5k/yr |
| **Total build:** | **£28k** |
| **Total ongoing:** | **~£14k/yr** |

### Risks
| Risk | Mitigation |
|---|---|
| Photo of non-opted-in guest captured | Editor review pre-publication; one-tap deletion |
| GDPR complaint over biometrics | No biometric storage; opt-in face match (V2) uses on-device only |
| Brand-damaging photo published | Editor review, photographer brief, guest preview before public sharing |

### Success Metrics
- Opt-in rate: target 30% of stays
- Gallery view rate post-stay: target 85% of opted-in guests
- Social share rate: target 12% of viewers
- Marketing attribution from #whalesborough UGC: track separately

---

## 6. Personalised Recommendation Engine

### Detailed Spec

Surfaces "Aurelia would have suggested this" content at three touchpoints without requiring the user to chat.

**Inputs (signal layer):**
- Past stays: cottages booked, treatments taken, dishes ordered, activities done
- Current booking: dates, party composition, dog, dietary, accessibility flags
- Live context: weather, tide, day of week, season, what's on
- Behavioural: pages viewed in app, items favourited

**Output channels:**
1. **Morning email (in-stay):** "Today at Whalesborough" — 6:30am send, tide + weather + one curated suggestion
2. **In-app home (pre-arrival):** Three carousel cards — "Pack for the weather", "Book before they go", "What's new"
3. **Post-arrival in-stay push:** T+24hr after arrival, one push with most-relevant suggestion

**Sample recommendations:**
- "Tomorrow morning has a 6:30 sunrise at Widemouth — 9-min drive. SWCP map attached."
- "The kitchen is serving Cornish hake with samphire on Thursday — your party often books fish dishes. Reserve a table?"
- "Maddie the alpaca had a baby last week. The 11am feeding has space tomorrow."
- "Hot tub pre-heat takes 4hr. Toggle now to be ready at 17:00 arrival."
- "Rain forecast Wednesday afternoon — spa has three Restoration ritual slots open."

**Architecture: rules engine, not ML, at V1.** Rationale: dataset too small for ML reliability (<3k stays/year), brand voice control critical, rules engine debuggable.

V2 may layer ML on top once 2-3 years of opt-in behavioural data exist; never personalise lodge sales recommendations (FCA risk: looks like solicitation).

### Tech Architecture

```
[Rules engine — TypeScript, JSON-based ruleset]
   │
   ├─ Inputs: user profile, current booking, live context
   ├─ Rules: ~80 hand-curated, weighted by relevance and freshness
   ├─ Output: top-3 recommendations with explanation tokens
   │
   ▼
[Delivery layer]
   ├─ Daily email (cron 06:00, send 06:30)
   ├─ App home page (SWR with 5min cache)
   └─ Push notifications (Twilio + APNs/FCM)
```

**Rule example (DSL pseudo-code):**
```yaml
- id: sunrise-walk-on-clear-morning
  if:
    - user.in_stay == true
    - tomorrow.weather.precipitation_mm < 0.5
    - tomorrow.cloud_cover_pct < 50
    - user.profile.likes_walking != false
  then:
    title: "Sunrise at {sunrise_time} at Widemouth Bay"
    body: "Clear forecast tomorrow morning — 9 minute drive. SWCP map attached."
    cta: download_swcp_map
  weight: 0.85
```

### Build Effort & Cost

| Phase | Cost |
|---|---|
| MVP (10 rules, email only) | £12k |
| V1 (60 rules, all 3 channels, A/B framework) | £10k |
| V2 (ML-augmented re-ranking) | £6k |
| **Total** | **£28k** |

### Privacy
- Personalisation uses booking + behavioural data only; no inferred sensitive attributes
- Explainability: every recommendation includes "Why am I seeing this?" link
- Opt-out per channel (email/push/in-app) granular
- No cross-resort data sharing (no Landal data backflow)

### Risks
| Risk | Mitigation |
|---|---|
| Tone-deaf recommendation ("Hot tub deals" to grieving guest) | Sensitivity filters: no commercial recs in first 24hr post-arrival |
| Over-frequency causing notification fatigue | Hard cap: 1 push/day, 3 email/stay |
| Recommends sold-out item | Live availability check before send |

### Success Metrics
- Recommendation click-through rate: target 18%
- Conversion attribution (recs → bookings): target 6% of in-stay revenue
- Unsubscribe rate: target <3%

---

## 7. Voice / Audio Tour

### Detailed Spec

Self-guided audio tour of the estate, narrated by people who live and work there.

**12-15 stops, each ~90 seconds:**
- The farmer at the cattle barn
- The chef in the kitchen garden
- The spa therapist at the botanical drying room
- The wind turbine engineer
- The estate manager at the bee hives
- The lodge architect at Trelowen
- The chef forager on the SWCP edge

**Triggers:**
- Geofence (15m radius) auto-plays when phone enters zone with audio permission granted
- QR codes at each stop (printed on slate plaques — Coastal Editorial)
- Manual selection from in-app map

**Offline:**
- Full tour downloads as a single 80MB pack on first open
- Plays without signal (no signal at lower estate near beach)

**Production values:**
- Recorded in actual locations (no studio reads) — ambient sound part of the storytelling
- Newsreader italic delivery — slow, considered
- No background music
- Producer-led: commission an audio journalist (e.g. ex-BBC features), £12k for 15 stops

### Tech Architecture

```
[PWA service worker — caches audio pack on first launch]
[Mobile geofence — battery-efficient, region monitoring API]
   │
   ▼
[Per-stop player UI — Coastal Editorial: large square art, simple transport]
   │
   ▼
[Analytics — track stop completion + drop-off]
```

### Build Effort & Cost

| Item | Cost |
|---|---|
| Audio production (15 stops, talent fees, edit) | £12k |
| App dev (offline cache, geofence, player) | £14k |
| QR plaque print + installation | £1,800 |
| **Total V2 build:** | **£28k** |

*Audio production cost is content budget, sits outside the £294k smart features budget shown in summary.*

### Risks
| Risk | Mitigation |
|---|---|
| Geofence battery drain | Region monitoring API (iOS) / passive geofence (Android) — both low-power |
| Content goes stale (farmer leaves, hives die) | Quarterly content review built into ops calendar |
| Guest doesn't realise it exists | Pre-arrival email, in-app prompt on first map open |

### Success Metrics
- Tour downloads per stay: target 22%
- Stops completed per downloader: target 8/15
- "Memorable moment" mentions in reviews: track via NLP

---

## Cross-Feature Considerations

### Compliance Tie-In (from UK Compliance Doc)

| Feature | Key compliance touch |
|---|---|
| Aurelia | DUAA 2025 DPIA required; PECR for any marketing comms initiated; PCI scope kept zero (no card chat) |
| Estate Dashboard | None significant (aggregate data) |
| Digital Key | Hotel Records Order 1972 (12-month ID retention via Onfido DPA); biometrics avoided |
| In-Lodge Controls | Equality Act — controls must be accessible; physical fallback always available |
| Photo Memories | DPIA for opt-in photography; right to erasure 48hr SLA |
| Recommendations | DUAA automated decision-making transparency — "Why this?" link mandatory |
| Audio Tour | Accessibility — transcripts available WCAG 2.2 AA |

### Shared Infrastructure

- **Auth:** Single sign-on (Supabase Auth) across all features
- **Push:** Single push notification service (Twilio) — rate-limited globally to prevent fatigue
- **Audit log:** Immutable, separate DB, 12-month retention for security events
- **Feature flags:** LaunchDarkly or open-source Unleash — every feature behind a flag for safe rollout

### Brand Voice Consistency

Every AI-generated string passes a tone check before delivery — same rules across Aurelia chat, recommendation copy, push notifications, post-stay emails. Forbidden words list maintained in shared config.

---

## Final Sequencing Recommendation

**Ship at launch (MVP):** Aurelia text, Estate Dashboard, Recommendations v1, Photo Memories (event only). These are the headline "wow" features that establish category leadership in Cornwall.

**Add at V1 (4-6 months later):** Voice Aurelia for premium guests, Digital Key + In-Lodge Controls for new-build lodges (Trelowen/Gwari first — fewer doors, lower risk), AI photo curation, Recommendations v2.

**Add at V2 (Q3 2027+):** Retrofit Digital Key + In-Lodge Controls to Arvor Suites, IoT estate metrics on dashboard, Voice/Audio Tour, opt-in face match for photos, ML-augmented recommendations.

Total smart-features build cost across all three waves: **£294k** (within the £500k platform budget alongside core booking engines, design system, and compliance).

Total ongoing operational cost at V2 maturity: **~£60k/year** (APIs, ID verification, lock subscriptions, photographer retainer, storage). Recoverable via:
- 8% cross-sell uplift attributed to Aurelia (~£140k/yr revenue)
- 15% reduction in OTA commission via direct booking lift
- £8 hot tub pre-heat supplement × ~1,500 stays = £12k/yr
- Reduced front-desk staffing pressure (digital check-in)

The platform pays for itself within 18 months on cross-sell uplift alone.

---

*End of specification. Open questions for client: Loxone vs alternative smart-home platform preference; photographer brief and editorial review process; Onfido vs alternative ID verification vendor; voice talent selection for Aurelia (commission Cornish-accented voice or licence existing).*
