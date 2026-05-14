# Whalesborough Farm Resort & Spa — Sustainability & Estate Storytelling Content Architecture

**Status:** Draft v1.0 — design spec for the £500k Whalesborough booking app
**Author:** Peake Management (research + spec)
**Date:** 2026-05-14
**Audience:** Product, design, content, and CMS implementation teams

---

## Strategic positioning

Whalesborough's Cornwall Tourism Awards **Gold (Ethical, Responsible & Sustainable Tourism 2024/25)** plus its **first-in-UK Cleaner Seas microplastic filter deployment** are real, evidenced, hard-to-fake credentials. The competitive set (Watergate Bay, The Headland, The Pig, Forest Holidays) tells sustainability stories thinly. The Newt, Daylesford and Six Senses tell them in depth. This spec puts Whalesborough in the second group — *evidence-led, dashboard-backed, no greenwashing*.

The principle throughout: **every claim shows its working.** No "eco-friendly" copy without a number, a source, a face, or a photo behind it.

---

## 1. Page-level sitemap

```
/sustainability                                  (manifesto + impact summary hub)
├── /our-impact                                   (live dashboard)
├── /initiatives
│   ├── /wind-turbine
│   ├── /microplastic-filters                    (Cleaner Seas case study)
│   ├── /cornish-black-bees
│   ├── /50-acres-woodland
│   ├── /neetfield-market-garden
│   ├── /biomass-district-heating
│   ├── /air-source-pool-heating
│   ├── /water-stewardship
│   ├── /food-miles-90-percent
│   ├── /ev-charging
│   └── /pollinator-meadows                       (9k sunflowers, 22k pumpkin)
├── /awards-and-accreditations
├── /our-partners                                 (Cleaner Seas, Wildlife Trust, DEFRA, Ocean Saver, Gaia, Sustrans)
├── /the-people
│   ├── /head-of-sustainability
│   ├── /farmer-neetfield                         (market garden)
│   ├── /beekeeper
│   └── /head-gardener
├── /annual-report                                (PDF download + on-page summary)
├── /your-impact                                  (logged-in, post-stay impact card)
├── /carbon-conscious-travel                      (slow travel, train, EV, offset)
└── /journal                                     (estate storytelling — see §5)
```

A **persistent ribbon** at the top of every page on the booking app surfaces one live dashboard metric (rotated) — e.g. *"Today: 184 kWh from our turbine • 12,400 microfibres captured this week"*. Pulls user into the proof story without forcing a click.

---

## 2. Live sustainability dashboard spec

Public page: `/our-impact`. CMS-fed; also exposed as JSON for the persistent ribbon.

### 2.1 Metric tiles (Tier 1 — must-have at launch)

| Tile | Source | Refresh | Visualisation |
|---|---|---|---|
| Wind turbine output — kWh today / month / YTD | 60kW turbine inverter API (Solis/SolarEdge-equiv via Modbus → Node-RED → Supabase) | Live (5-min poll) | Big number + 30-day sparkline |
| % site energy self-sufficiency this month | Turbine kWh + biomass MWh ÷ total site metered draw (Octopus / supplier API) | Daily | Animated radial gauge |
| Microplastic filters: loads filtered today / total since install | Cleaner Seas INDIKON commercial filter — request CSV/API access from Cleaner Seas Group | Daily | Counter + "≈ X microfibres" derived (700,000/wash) |
| Cornish Black Bees: active hives / honey jars produced YTD | Manual entry by beekeeper (CMS field) + optional Broodminder hive sensors | Weekly | Hive icon grid + jar counter |
| Trees planted (cumulative across 50 acres) | Manual count + Woodland Trust record | Annual | Animated map polygon overlay |
| Food sourced within 5 / 25 / 50 miles | Restaurant supplier register — weight % | Monthly | Stacked horizontal bar |
| EV charging sessions delivered (kWh) | Charger network API (e.g. Pod Point / Rolec) | Daily | Big number + bolt icon |
| Water recycled / harvested (litres) | Manual meter reading or sub-meter telemetry | Weekly | Litre counter |

### 2.2 Metric tiles (Tier 2 — roadmap)

- Carbon sequestered (tCO₂e) estimate from 50 acres + new planting (use Woodland Carbon Code calculator)
- Spa product mileage (Gaia is Cornish-made → cite miles)
- Compost produced from on-site organics (kg)
- Wildflower meadow area (ha) and species count from annual ecology survey

### 2.3 Display logic
- **Hero tile** rotates between: Self-sufficiency %, Microfibres captured, Hive count. Pick by which metric is currently most impressive.
- **Honesty badges**: every tile has an *i* tooltip stating: source, method, last verified date, who at Whalesborough signed it off.
- **Don't fake live**. If beekeeper hasn't updated this week, show "Last reported: 6 May 2026" — never silently freeze a counter. *This is the single biggest greenwashing risk.*

### 2.4 Stack
Supabase Postgres for time-series, Recharts/D3 for viz, Edge Function for the turbine poll, CMS (Sanity/Payload) for manual-entry fields with audit log.

---

## 3. "Your impact this stay" — per-guest spec

Generated 48h after departure; emailed and pinned to logged-in account profile.

### 3.1 Computation

For a stay of N nights with G guests:

| Output | Formula |
|---|---|
| Renewable energy used | `(N × G × kWh_per_guest_night_avg) × (% site self-sufficiency in stay window)` |
| Microfibres prevented | `washes_in_cottage × 700,000` (washes from cottage utility log or default 2 per stay) |
| Food-miles avoided | `meals_taken × avg_meal_kg × % within_5mi` |
| Woodland contributed | `(N × G × £woodland_levy) ÷ £cost_per_sqm` — pegged to a transparent levy from each booking (suggest £2/guest/night → ringfenced "Whalesborough Woodland Fund") |
| Bees supported | flat statement: "Your stay supports the upkeep of one of our X hives" |

### 3.2 Shareable card (Instagram 1080×1350)

- Whalesborough wordmark + estate aerial
- "Your 4 nights at Whalesborough contributed:"
- 4 metric rows with icons
- "Cornwall Tourism Awards Gold 2024/25"
- QR to `/your-impact` and `/sustainability`
- Generated server-side via @vercel/og or Satori, signed URL.

### 3.3 Data needed per booking
Booking length, guest count, cottage ID (for cottage-specific energy data later), meal covers in The Weir (PMS/EPOS link), opt-in for the post-stay email.

---

## 4. Carbon-conscious booking flow

Surfaced at three points: **Plan** (search results), **Confirm** (checkout), **Post-book** (pre-arrival).

| Feature | Spec |
|---|---|
| **Slow travel badge** | If guest selects "arriving by train/bus" → 5% off spa treatment + reserved EV/cycle locker. |
| **Train + transfer info** | Bodmin Parkway and Exeter St Davids are the nearest mainline stations (Bodmin Parkway 75km road, ~48 min drive). Honest copy: rail is realistic, last-mile is not (Go Cornwall bus is 2h+ with a change). Offer pre-booked private EV transfer at cost as the "right" answer; do not over-claim. |
| **EV info card** | 4 super-fast points on-site (state kW per point — likely 22kW AC, confirm spec). Pre-arrival email confirms charger availability for guest's vehicle. |
| **Offset at checkout** | Optional add-on. Use a UK-verified registry (Woodland Carbon Code or Gold Standard). Cost shown transparently with project named. *Do not* use unverified "offset" providers. |
| **Carbon-aware date suggestion** | Off-peak (Nov–Mar excl. holidays) → "Your stay would run on a higher % of wind energy" — surface as nudge, not gate. |

---

## 5. Editorial content — Journal article roadmap (priority-ordered, 24 ideas)

Tier 1 — launch (first 8 weeks):
1. *"How our wind turbine powers your hot tub"* — explainer with kWh maths
2. *"700,000 microfibres per wash — our pact with the sea"* — Cleaner Seas case study with founder Q&A
3. *"Meet the 15,000 Cornish Black Bees"* — beekeeper portrait + hive map
4. *"What's in season at Neetfield Market Garden — May"* — recurring monthly post (12/yr)
5. *"50 acres, 50,000 trees — the Whalesborough rewilding plan"*
6. *"Farm-to-fork: tracking a head of lettuce from Neetfield to The Weir"*
7. *"The Gold Award: what Cornwall Tourism Awards judges actually checked"*
8. *"Why we don't sell single-use plastic anywhere on site"*

Tier 2 — months 3–6:
9. *"Beekeeper's diary — June: when the hives swarm"* (recurring quarterly)
10. *"Meet the alpacas of Whalesborough"*
11. *"22,000 pumpkin seeds: planting day in pictures"*
12. *"How biomass district heating works (and where the wood chip comes from)"*
13. *"Ocean Saver — why every welcome pack uses plant-based cleaners"*
14. *"Sustrans, the canal, and the car-free route to Bude"*
15. *"Wildflower meadows — what we lost and what we're bringing back"*
16. *"Air source heat pumps: heating a 30°C pool the right way"*

Tier 3 — months 6–12:
17. *"Counting birds — our annual RSPB Big Farmland Bird Count results"*
18. *"Visit the bees: Beekeeper for a Day, behind the veil"*
19. *"The market gardener's calendar — sowing, harvesting, resting"*
20. *"Cornish Black Bees vs. imported Italians — why our bees matter"*
21. *"The honey harvest — September on the estate"*
22. *"Carbon report 2026 — what we got right, what we got wrong"*
23. *"Why we said no to grass-only golf (and yes to wilder fairways)"*
24. *"How a 5★ Gold cottage stays heated without gas"*

Editorial principles: long-form (1,200–2,000 words), photography-led, named author (head of sustainability / beekeeper / farmer themselves where possible), quote credible third parties (Wildlife Trust, Cleaner Seas, DEFRA). Schema: `Article` + `Person` (author) + `Place` JSON-LD on every post for GEO citation.

---

## 6. Sustainability-aligned products (estate shop module)

| Product | Provenance | Notes |
|---|---|---|
| Whalesborough Honey (250g / 500g jars) | On-site, 15,000 Cornish Black Bees | Limited run — sell scarcity transparently |
| Beeswax candles | Estate bees + Cornish chandler | |
| Wildflower seed packets (gift box) | From estate's own meadow harvest | Low-margin loss-leader; embed brand |
| "Plant a tree at Whalesborough" gift | £25 — guest gets a certificate, GPS pin, photo at year 1 + 5 | High-margin, high-emotion — model on Forest Holidays / National Trust |
| Branded botanical oils | TBC supplier — *do not* market as "our own" unless 100% estate-grown |
| Whalesborough Cyder / Apple Juice | If orchards exist (audit needed) — otherwise sourced from named Cornish maker |
| Whalesborough Gin | **Caution**: research shows local Bude Gin / Norton Barton exists but no confirmed Whalesborough-distilled gin. Either commission a white-label with a named Cornish distiller (Curio Spirits, Tinkture, Rosemullion) and brand it accurately ("Distilled for Whalesborough by X") or drop the SKU. *Do not* imply on-site distillation without it. |
| Gaia spa-product retail | Already used in spa, partner is Cornish |
| Ocean Saver refills | Welcome pack carryover — guests can buy more |
| Annual sustainability calendar | Photographic, year-end gift, doubles as marketing |

---

## 7. Programmes / experiences

| Programme | Format | Pricing | Audience |
|---|---|---|---|
| **Beekeeper for a Day** | 4hr immersive — suit-up, inspect hives, extract a frame, take a jar home | £125pp | Adults; cap 4 |
| **Market Garden Tour** | Weekly, 45min, free for guests | Free | All ages |
| **Sustainability Talk + Tasting** | Monthly, Friday evening, free to guests | Free / £15 non-guests | Adults |
| **Wild Pollinator Walk** | Seasonal, guided by ecologist | £20 / free for guests | Families |
| **Schools Programme** | Half-day, KS2/KS3, curriculum-aligned | Term-time, school rate | Schools within 1hr |
| **Press / Influencer Programme** | Quarterly, vetted journalists, 2-night hosted stay | Free; KPI = published feature | Travel + sustainability press |
| **Forest Bathing** | Quarterly with certified guide | £45pp | Adults |
| **Foraging Walk** | Spring + autumn, with restaurant chef | £55pp + tasting | Adults |
| **Tree-Planting Weekend** | Annual (November) — guests + locals plant new acres | Free / £35 incl. lunch | Mixed |

---

## 8. Awards & accreditations — display

`/awards-and-accreditations` and a condensed footer band.

**Confirmed and verifiable**
- Cornwall Tourism Awards Gold 2024/25 — Ethical, Responsible & Sustainable Tourism
- Cornwall Tourism Awards Silver (prior)
- VisitEngland 5★ Gold (cottage-level — list each)
- Visit Britain 5★ Gold (Woody Platt, Sand Parks named)
- DEFRA environmental recognition
- Wildlife Trust accreditation
- Cleaner Seas Initiative — first UK holiday resort

**Display rules**
- Each award has its own modal: year, category, awarding body, who judged, what evidence Whalesborough submitted, link to issuing body's listing.
- *Never* display unverified or out-of-date logos. Audit annually.
- Logos rendered as SVG, high-contrast, properly licensed.
- Schema: `Award` JSON-LD attached to `Organization` entity for AI-search citation.

---

## 9. Future certification roadmap

| Certification | Timeline | Effort | Worth it? |
|---|---|---|---|
| **Green Tourism Gold (UK)** | 6 months to first audit | Medium — 80%+ scoring across 14 criteria | **Yes** — UK-recognised, complements CTA Gold, expected by trade buyers. **Recommended next.** |
| **B Corp** | 18–30 months (5 questionnaires, legal change to articles, score ≥80) | High — 87.3 is Daylesford's score; The Pig and Exclusive Collection certified. | **Yes for 2027** — aligns with luxury hospitality trajectory. Plan as 2-yr programme. |
| **1% for the Planet** | Immediate — commit 1% of revenue to verified environmental partners | Low operational, financial commitment is the bar | **Yes** — high signal-to-noise. Pair with named partner (Wildlife Trust / Surfers Against Sewage / Cornwall AONB). |
| **GSTC-recognised certification** (via UCSL or similar) | 12 months | High; international gold standard | **Optional** — only if pursuing international wholesale (luxury TO) market. |
| **Woodland Carbon Code** | Per planting project | Project-by-project | **Yes** — formalises the 50-acre rewilding's carbon claim. |
| **Soil Association Organic** | Per Neetfield Market Garden | 2 yr conversion | **Yes** if market garden is selling/serving externally — pre-empts customer challenge. |
| **EarthCheck Certified** | 12 months | International luxury benchmark | Optional. |
| **The Considerate Hoteliers Association** | Membership-based | Low | Cheap signal; worth it. |

**Recommended sequence:** 1% for the Planet (Q3 2026) → Green Tourism Gold (Q1 2027) → Soil Association on market garden (2027–28) → B Corp (target 2028).

---

## 10. Photography brief — sustainability-specific shots

The visual story is the credibility story. Commission a dedicated 2-day shoot.

**Must-have shots:**
1. Wind turbine — **golden hour**, low angle, with cottage roof in foreground (proves it's *on site*, not stock)
2. Wind turbine — close-up of the nacelle/blade root (technical detail signals real)
3. Microplastic filter — close-up of cartridge being changed by named technician
4. Microplastic filter — Cleaner Seas branded unit *installed in cottage utility cupboard* (proves "all cottages")
5. Beekeeper portrait, gloved, holding a frame — *eyes visible through veil*
6. Hive close-up — bees crawling on comb, sharp macro
7. Honey extraction — frames in spinner, glass jar being filled
8. Beehives in landscape — wide shot showing context
9. Farmer at Neetfield Market Garden — soil-on-hands, named portrait
10. Market garden — raised beds wide shot, **with people working** (not just empty rows)
11. Tray of just-picked produce — hero food image for journal
12. Restaurant pass — chef plating Neetfield produce with named ingredients visible
13. 50-acre woodland — drone, showing scale + adjacency to cottages
14. Saplings being planted — hands, soil, named volunteer
15. Wildflower meadow in full bloom (June/July shoot)
16. Pollinators on flowers — macro
17. Biomass boiler room — *clean, well-lit*; doesn't hide infrastructure
18. EV chargers — guest plugging in their actual car
19. Cyclist arriving at gates from Bude Canal towpath — slow-travel hero
20. Ocean Saver welcome pack on cottage worktop
21. Awards wall in reception — physical certificates framed (provenance proof)
22. Head of Sustainability portrait — named, looking at camera, on the estate
23. Solar/turbine inverter screen showing live kWh — proof of monitoring
24. Compost bay — turning a heap, named member of grounds team

**Style guide:**
- Natural light, no over-styling
- People wherever possible (sustainability without faces = greenwashing)
- Captions every shot — names, dates, locations
- 60% editorial, 40% hero
- Drone licensed (CAA), turbine and woodland shots especially

---

## 11. Greenwashing risk register — every claim with its evidence

This is the most important section. The CMS should have a **claim register** where each public-facing claim links to a verifiable source. Auditable annually.

| Claim | Evidence (must exist in register) |
|---|---|
| "First UK holiday resort with Cleaner Seas filters on all washing machines" | Cleaner Seas Group written confirmation + install dates per cottage |
| "700,000 microfibres per wash captured" | Cleaner Seas published research (cite link) |
| "60kW wind turbine powers the site" | Inverter MPAN/manufacturer spec sheet |
| "Site-wide green power" | Octopus/supplier tariff statement *plus* turbine output figures — be specific about % grid vs. self-gen |
| "Fully energy self-sufficient by 2025" | **CAREFUL** — if 2025 already passed and target slipped, *update to honest current % + revised date*. Missed targets owned-up to are more credible than silence. |
| "50 acres new woodland" | Woodland Trust / Forestry Commission planting record + GPS polygon |
| "9,000 sunflowers / 22,000 pumpkin seeds" | Order invoices from seed supplier + planting day photos |
| "15,000 Cornish Black Bees" | Beekeeper's count + named bee supplier |
| "90% of food from our doorstep" | Restaurant supplier register with % by weight or spend — **publish the methodology** |
| "450 acres total stewardship" | Title deeds / land registry summary |
| "Air source heat pumps for pools" | Installer spec sheet |
| "Biomass district heating" | Boiler spec sheet + wood chip supplier statement |
| "DEFRA recognition" | Award/letter date + scheme name (DEFRA hosts multiple schemes — name the specific one) |
| "Wildlife Trust accreditation" | Which Wildlife Trust (Cornwall WT), which scheme, year |
| "Ocean Saver in all welcome packs" | Procurement contract |
| "Gaia products in spa" | Spa product list with named brand |
| "EV charging — 4 super-fast points" | State actual kW per point; "super-fast" has a specific industry meaning (≥50kW DC). If they're 22kW AC, call them *fast* not *super-fast*. |

### Anti-greenwashing operating principles

1. **Numbers or no claim.** Replace "we love nature" with "450 acres under stewardship, 50 newly woodland".
2. **Source every number.** Tooltip on each metric. Methodology page linked.
3. **Show your working including failures.** Annual report should name what slipped. (Six Senses publishes shortfalls; The Newt names problems with crop rotation.)
4. **Use ranges, not point estimates,** for modelled figures (carbon, food miles).
5. **Never use the word "carbon-neutral" without verified offset registry.**
6. **Audit the claim register annually** — appoint a named signatory.
7. **Reject vague terms:** "eco-friendly", "natural", "green" *without a number behind them*.
8. **Photographic provenance** — sustainability photos must be of *this estate*, not stock.

---

## 12. Integration with the booking app — UX touchpoints

The sustainability content is not a separate website — it lives *inside* the booking funnel.

- **Search results card** — a small leaf icon with a tap-to-reveal: "This cottage runs on 78% renewable energy YTD."
- **Confirmation screen** — soft-prompt to add a £25 tree-plant gift or £10 woodland levy.
- **Pre-arrival email** — link to the carbon-conscious arrivals guide.
- **In-stay app screen** — daily "your impact today" card.
- **Post-stay email** — the shareable Instagram card (§3.2).
- **Loyalty tier** — model on 1 Hotels Mission Membership; "Mission" tier benefits tied to verified sustainable behaviours (train arrival, multi-night, off-peak) rather than spend alone.

---

## 13. Implementation priorities (90 days)

| Sprint | Deliverable |
|---|---|
| Wks 1–2 | Claim register populated. Turbine + filter data feeds scoped with vendors. |
| Wks 3–4 | `/sustainability` hub + manifesto live. Awards page live. |
| Wks 5–6 | Live dashboard MVP (3 tiles minimum: turbine, filters, hives). |
| Wks 7–8 | Journal launch — 4 tier-1 articles published. People profiles shot. |
| Wks 9–10 | Per-stay impact email + shareable card in production. |
| Wks 11–12 | Carbon-conscious booking flow merged. 1% for the Planet membership signed. |

---

## Sources / benchmarks consulted

- Cornwall Tourism Awards Gold 2024/25 (Whalesborough confirmed)
- Cleaner Seas Group — commercial INDIKON filter, microfibre research with University of Portsmouth
- The Newt in Somerset — regenerative farming, 3,000-acre estate, educational programmes model
- Daylesford Organic — B Corp score 87.3, Impact Report model, supply-chain traceability
- Six Senses — Earth Lab guest engagement model, 0.5%-of-revenue Sustainability Fund, named community impact metrics
- 1 Hotels — Mission Membership loyalty model (impact tracked alongside spend)
- Exclusive Collection (first UK hotel B Corp 2021), The Pig (B Corp 2024), Mr & Mrs Smith (B Corp 2023)
- Sharpham Trust — biomass + PV + organic gardens, 550-acre estate retreat model
- Bodmin Parkway → Bude rail-last-mile reality check (75km road, 2h+ public transit)
- Green Tourism Gold ≥80%; GSTC three-year certification framework
- B Lab UK / B Lab Global directory for hospitality
- Woodland Carbon Code (verified UK carbon registry)
- 1% for the Planet member directory

**End of spec — v1.0**
