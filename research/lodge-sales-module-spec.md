# Whalesborough Lodge Sales Module — Complete Specification
**Version 1.0 — 14 May 2026**
**Prepared by:** Peake Management
**Audience:** Product, Engineering, Legal Counsel, Sales Team

---

## 0. Critical Compliance Banner (READ FIRST)

This entire module is built around four product tiers — **Trelowen Exclusive Lodges (£425k-£525k), Tevi Luxury Lodges (£749,950), Gwelva Luxury Villas, and Bespoke Lodges (from £399k)** — and historically the marketing has leaned on a **"8% guaranteed rental return for 3 years"** claim.

**That claim is the single highest-risk element of the entire £500k platform.** ASA has upheld four complaints against Luxury Lodge Estates for materially identical wording, and the FCA treats unauthorised promotion of what may be a Collective Investment Scheme as a criminal offence (FSMA s.21, up to 2 years' imprisonment). Every screen, brochure component, calculator, and CRM email-template referenced in this spec is marked **[TBC — FCA legal review]** wherever investment, return, yield, income-projection, or guarantee language appears. **No copy in those slots ships without a signed counsel sign-off.** The build proceeds; the wording does not appear in production until cleared.

---

## 1. Sales Journey Map — Five Stages, Screen Inventory

### Stage 1 — Awareness (top-of-funnel discovery)
| Screen / Surface | Purpose | CTA |
|---|---|---|
| `/lodges` — tier-overview hub | Single page presenting all four tiers side-by-side at glance | "Explore Trelowen / Tevi / Gwelva / Bespoke" |
| `/lodges/trelowen` — tier landing | Lifestyle-led hero, drone reel, gallery, BS3632 spec, 125-yr licence | "Download Brochure" / "Book a Viewing" / "Request a Callback" |
| `/lodges/tevi` | Ultra-premium tier (£749,950), exclusivity language | "Private Viewing" / "Speak with Rebecca" |
| `/lodges/gwelva` | Villa tier — architectural/permanent-build distinction | "Request Spec Pack" |
| `/lodges/bespoke` | Custom-build from £399k — process-led | "Start a Bespoke Brief" |
| Paid-ad landing variants (`/own/trelowen-q3`) | Single-offer pages for Meta / Google Ads campaigns | Single CTA: Brochure |
| `/own/lifestyle` editorial articles | "A weekend in your second home" — narrative content | Soft CTA — Waitlist join |
| Estate map preview (embedded) | 450-acre context, plot zone identification | "See Available Plots" |

### Stage 2 — Research (mid-funnel evaluation)
| Screen / Surface | Purpose |
|---|---|
| `/lodges/compare` | Interactive side-by-side: square footage, beds, price, licence, spec, plot availability |
| `/lodges/floorplans/[id]` | Interactive 2D plans with toggle to 3D walkthrough; orientation flip for mirrored plots |
| `/lodges/specifications` | Kitchen brand (Symphony / Howdens TBC), bathroom (Roca / Hansgrohe), Quooker tap, EV charger, hot-tub option, BS3632 standard |
| `/lodges/estate-map` | Interactive plot picker — green available / amber reserved / red sold / grey not-released |
| `/lodges/sustainability` | Eco credentials, wind turbine, bee count, EPC ratings, all-electric narrative |
| `/lodges/awards` | Gold Award Ethical Tourism 2024/25, 5-star Gold VisitEngland |
| `/lodges/owners` | Anonymised case studies (3-5 testimonials) |
| `/lodges/whats-included` | Inclusion table vs extras (hot tub, decking upgrade, furniture pack) |
| `/lodges/faqs` | Hosts the 12 objection counterarguments (see section 6 for placement map) |
| `/lodges/calculator` | **Total cost of ownership** tool (purchase + site fees + projected income) — see section 2.6 |
| `/lodges/buyers-guide` | Gated PDF — lead-capture form unlocks download |
| `/lodges/the-process` | Step-by-step: enquiry → viewing → reservation → exchange → handover |

### Stage 3 — Engagement (lead capture & qualification)
| Screen | Action |
|---|---|
| Brochure request modal | Name, email, phone, postcode, marketing consent (separate email + SMS toggles) |
| `/viewing-days` | Group-event viewing day calendar — date selection, party size, dietary notes |
| `/private-viewing` | 1-to-1 VIP viewing with Graeme — calendar-picker with availability |
| `/virtual-viewing` | Zoom/Teams slot booking with screen-share session of plans + 360° |
| Live chat widget | In-hours connection to sales team; out-of-hours captures lead |
| AI pre-screen assistant | Conversational qualifier (budget, timeline, intent, finance) feeding GHL score |

### Stage 4 — Conversion (transaction)
| Screen | Action |
|---|---|
| `/reserve/[plot]` | Reservation initiation — plot reserved for 14 days |
| Reservation fee Stripe checkout | £2,000 - £5,000 fee (TBC); held against purchase |
| AML identity capture | Onfido/Veriff integration — passport/DL + address proof |
| Solicitor referral panel | Three vetted firms; client free to choose own |
| Funding-options page | Cash / specialist lender directory (NO advice — signposts only) |
| Reservation-agreement e-sign | DocuSign / Dropbox Sign with full reservation T&Cs + cooling-off statement |
| Customisation selector | Where available: flooring, kitchen finish, furniture pack |

### Stage 5 — After-Sales / Owner Portal
| Screen | Action |
|---|---|
| `/owner/dashboard` | Welcome, build-stage progress bar, upcoming milestones |
| `/owner/build-progress` | Photo timeline (foundations / shell / first-fix / second-fix / snagging / handover) |
| `/owner/snagging` | Defects list submission with photo upload; status tracking |
| `/owner/handover` | Handover-day appointment scheduling, key-collection prep checklist |
| `/owner/rental` | Opt-in/out of rental scheme; rental performance dashboard (see §7) |
| `/owner/calendar` | Block owner-personal weeks; see rental bookings |
| `/owner/maintenance` | Submit maintenance ticket; status board |
| `/owner/finance` | Statements, invoices, projected vs actual (clearly labelled non-guaranteed — TBC counsel) |
| `/owner/resale` | List for resale with sales-team support |
| `/owner/events` | Owner-only events calendar; RSVP |
| `/owner/concierge` | Pre-arrival ordering for owner stays (groceries, restaurant booking, spa) |

---

## 2. Page-by-Page Wireframe Descriptions

### 2.1 Tier landing page (Trelowen example)
**Hero:** Full-bleed drone video reel, autoplays muted; H1 in Newsreader Italic — *"An exclusive lodge above the Cornish coast"*; subhead lists 2/3/4-bed price points + 125-yr licence + BS3632 + fully-electric badge row; primary CTA `Book a Viewing` (cognac `#703a1d`), secondary `Download Brochure`.
**Section 2 — Editorial intro:** 60-word direct-answer paragraph (AI-citation ready) summarising what Trelowen is, who it is for, and the headline facts; placed as the first thing crawlers ingest.
**Section 3 — Gallery:** 9-image masonry grid, exterior + interior + estate, hover-zoom with caption.
**Section 4 — The lodges:** Three cards (2-bed / 3-bed / 4-bed) with price, sqft, beds, baths, "View floorplans" link.
**Section 5 — Specification highlights:** Six-tile grid (kitchen, bathroom, hot-tub-ready, EV charger, BS3632, eco). Each tile click opens drawer with full spec.
**Section 6 — Why Whalesborough:** Awards row, NPS 83.3 quote, 60kW wind turbine, 15,000 Cornish Black Bees.
**Section 7 — Ownership rationale (HIGH-CARE COPY):** Headline `[TBC pending legal review]`; body explains lifestyle-first proposition, then a clearly-segregated "rental income potential" note with a mandatory **Risk Notice** drawer (FCA-style — "Past performance does not guarantee future returns. This is a lifestyle purchase. Rental income is not guaranteed and depends on…"). Calculator deep-link.
**Section 8 — Lead-magnet:** Brochure download inline form + viewing-days teaser carousel.
**Section 9 — FAQs:** Embed 6-of-12 objection answers most relevant to Trelowen (FHL tax, council tax, BS3632 compliance, capital growth, occupancy, affordability).
**Section 10 — Sticky CTA bar (mobile-only, appears after 30% scroll):** Book Viewing / Brochure / Call Rebecca.

### 2.2 Comparison page (`/lodges/compare`)
Five-column table: Trelowen 2-bed | Trelowen 3-bed | Trelowen 4-bed | Tevi | Gwelva. Rows: price, sqft, beds, baths, licence years, BS3632 yes/no, all-electric, hot-tub included, EV-charger, plot-zone, availability count. Toggle to "Hide identical rows". Mobile: horizontal scroll with sticky first column. Trelowen 2-bed column highlighted as "Most popular".

### 2.3 Estate map (`/lodges/estate-map`)
Mapbox / custom SVG of estate with plot polygons. Filter chips: Tier (Trelowen / Tevi / Gwelva), Status (Available / Reserved / Sold), Beds. Click plot → drawer: plot reference, tier, beds, view orientation, price, status, next-step CTA (`Reserve this plot` if available, `Join waitlist` if reserved). Layer toggles: walking distances to spa / restaurant / farm. Mobile: pinch-zoom; bottom-sheet replaces drawer.

### 2.4 Total cost of ownership calculator (`/lodges/calculator`)
**Inputs:** Tier select, finance mode (cash / mortgage TBC), site-fee toggle, expected ownership years (5/10/15/20).
**Outputs (panel right):** Purchase price + stamp duty estimate + furniture pack + annual site fees × years + maintenance reserve. **Income panel** is **OFF by default** with a toggle reading "Show rental income illustration (illustrative only — not a guarantee)"; when toggled, it reveals a fully-labelled illustration based on **occupancy and ADR assumptions the user enters themselves** with bold disclaimer copy block above and below.
**Critical compliance constraint:** No pre-populated "8%" number is permissible without counsel sign-off. The current spec is built so that any "guaranteed return" figure can ONLY appear via a flag toggled in admin once legal clearance is on file. Default UI shows no yield figure.
**Output document:** "Email me this estimate" — lead-capture into GHL with the inputs preserved.

### 2.5 Brochure-request flow
Three-step modal. Step 1: which tier(s) interest you (multi-select). Step 2: contact details (name, email, phone, address, postcode). Step 3: separate granular consents — *"Email me the brochure" / "Email me future Whalesborough news (you can unsubscribe anytime)" / "SMS me about upcoming viewing days"*; no pre-ticks. Submit triggers (a) email-delivery of brochure PDF via Resend, (b) GHL contact creation, (c) attribution capture (utm params, referrer, landing page). Thank-you screen shows next-step ladder: "Book a viewing day | Request a callback | Explore the estate map".

### 2.6 Viewing-day booking
Calendar of upcoming dates (group viewings). Each date card: date, time, capacity remaining, host, what to expect summary. Selection → booking form (party size, names of attendees, dietary, accessibility, dog-bringing, postcode, contact). Confirmation triggers calendar invite (ICS), GHL pipeline move to *Viewing Booked*, and the seven-day pre-viewing nurture sequence (§9).

### 2.7 Private viewing
Calendly-style 1-to-1 slot picker pinned to Graeme/Rebecca's availability. 60-min slots. Step 2 captures intent: budget band, timeline, finance mode, must-haves. Submission triggers higher-priority GHL workflow and Slack/email ping to assigned sales rep.

### 2.8 Reservation flow
1. Plot confirmation card (plot ref, tier, price, completion ETA).
2. Reservation T&Cs read screen — cooling-off period clearly stated, refundability rules, what reservation does NOT do (does not exchange contracts).
3. AML identity capture (Onfido SDK).
4. Reservation-fee payment (Stripe — Apple Pay, Google Pay, card; **not Klarna** for sales transactions).
5. E-signature step.
6. Solicitor referral panel — three firms listed with disclaimer "Free to choose your own".
7. Confirmation screen + welcome to ownership-portal-light (build progress will appear here as construction proceeds).

### 2.9 Owner portal — dashboard
Hero greeting with lodge name & plot ref, build-stage progress bar (foundations → handover), upcoming milestones list, three action cards (snagging / rental-onboarding / maintenance), notifications inbox.

---

## 3. Database Schema Additions

### 3.1 `lodge_inventory`
- `id` uuid pk
- `tier_id` fk → `lodge_tiers`
- `model_name` (e.g. "Trelowen 3-bed")
- `beds`, `baths`, `sqft`
- `headline_price_pence` (integer)
- `licence_years`
- `is_bs3632` boolean
- `fully_electric` boolean
- `includes_hot_tub` boolean
- `includes_ev_charger` boolean
- `furniture_pack_options` jsonb
- `spec_brand_kitchen`, `spec_brand_bathroom` text
- `epc_rating`
- `floorplan_2d_url`, `floorplan_3d_url`
- `gallery_image_ids` uuid[]
- `available_from_date`
- `is_active` boolean

### 3.2 `lodge_tiers`
- `id`, `slug` (`trelowen` / `tevi` / `gwelva` / `bespoke`), `name`, `tagline`, `description_md`

### 3.3 `lodge_plots`
- `id` uuid pk
- `plot_ref` (text, unique — e.g. "T-12")
- `inventory_id` fk → `lodge_inventory`
- `tier_id`, `geo_polygon` (PostGIS), `orientation`
- `status` enum (`available` / `reserved` / `sold` / `not_released` / `waitlist_only`)
- `current_reservation_id` fk (nullable)
- `current_owner_id` fk (nullable)
- `price_override_pence` (nullable)
- `view_description` text
- `walking_minutes_to_spa`, `walking_minutes_to_restaurant`

### 3.4 `sales_leads`
- `id`, `email`, `phone`, `first_name`, `last_name`, `address_line_1`, `town`, `county`, `postcode`
- `marketing_email_consent`, `marketing_sms_consent` (both boolean + consent timestamps)
- `source` (utm + referrer)
- `lead_score` integer
- `pipeline_stage` enum (see §4)
- `assigned_rep_id`
- `interest_tier_ids` uuid[]
- `budget_band` enum (`399-499` / `500-599` / `600-749` / `750+`)
- `timeline` enum (`0-3m` / `3-6m` / `6-12m` / `12m+`)
- `intent` enum (`primary_residence` / `holiday_home` / `investment` / `mixed`)
- `finance_mode` enum (`cash` / `mortgage` / `tbd`)
- `ghl_contact_id` text
- `created_at`, `updated_at`

### 3.5 `lead_activities`
- `id`, `lead_id`, `activity_type` (brochure_request / viewing_booked / viewing_attended / call / email_open / page_view / chat / calc_used), `meta` jsonb, `created_at`

### 3.6 `reservations`
- `id`, `plot_id`, `lead_id`, `status` (`pending` / `paid` / `expired` / `exchanged` / `cancelled`)
- `reservation_fee_pence`, `stripe_payment_intent_id`
- `aml_status`, `aml_provider_ref`
- `agreement_signed_at`, `agreement_doc_url`
- `cooling_off_ends_at`
- `solicitor_firm_name`
- `customisation_choices` jsonb
- `created_at`, `expires_at`

### 3.7 `owners` & `owner_lodges`
- `owners`: standard user record, MFA enforced
- `owner_lodges`: `owner_id`, `plot_id`, `handover_date`, `on_rental_scheme` boolean, `rental_onboarded_at`

### 3.8 `build_milestones`
- `id`, `plot_id`, `stage` enum, `target_date`, `actual_date`, `photo_ids`, `notes_owner_visible`, `notes_internal`

### 3.9 `snagging_items`
- `id`, `plot_id`, `owner_id`, `title`, `description`, `photo_ids`, `status` (`open` / `triaged` / `in_progress` / `resolved` / `disputed`), `assigned_to`, `created_at`, `resolved_at`

### 3.10 `rental_performance`
- `id`, `plot_id`, `period_month`, `nights_let`, `nights_owner_use`, `gross_revenue_pence`, `management_fee_pence`, `net_to_owner_pence`, `source` (booking-system pulled)

---

## 4. GoHighLevel Integration Spec

**Location ID:** `g2e4b5iug3792efDmkjr`

### 4.1 Pipeline (8 stages)
1. **New** — Lead just captured (any channel)
2. **Qualifying** — Engaged, not yet booked anything
3. **Brochure** — Brochure downloaded
4. **Viewing Booked** — Confirmed slot in calendar
5. **Viewing Attended** — Marked attended by rep
6. **Reservation** — Reservation fee paid, AML in flight
7. **Exchange** — Contracts exchanged
8. **Completion** — Owner; transferred to owner portal

### 4.2 Fields synced (app ↔ GHL)
| App field | GHL field | Direction |
|---|---|---|
| `email`, `phone`, name, address | Contact core | Both |
| `marketing_email_consent`, `marketing_sms_consent` | Custom field — `consent_email`, `consent_sms` | App → GHL |
| `lead_score` | Custom `lead_score_app` | App → GHL |
| `pipeline_stage` | Native pipeline | Both |
| `budget_band` | Custom `budget_band` | Both |
| `timeline` | Custom `timeline` | Both |
| `intent` | Custom `intent` | Both |
| `interest_tier_ids` | Custom `interested_tiers` | App → GHL |
| `assigned_rep_id` | Native owner | Both |
| `source` (utm) | Custom `source_*` | App → GHL |
| Activity events | GHL Notes + Workflow triggers | App → GHL |

### 4.3 Webhooks
- App publishes to GHL on every stage change + every activity event.
- GHL publishes back when rep manually updates stage (kept in sync via signed webhook).
- 5-min replay queue on failure; alert ops on 3 consecutive failures.

### 4.4 Auto-nurture sequences (mapped per stage)
| Stage entered | Sequence |
|---|---|
| Qualifying | 5-email drip over 21 days — lifestyle / spec / awards / FAQs / soft viewing invite |
| Brochure | 3-email drip over 10 days — "did you have questions?", case study, viewing invite |
| Viewing Booked | 7-day pre-viewing — day-before reminder + map + meet-Graeme bio + what-to-bring |
| Viewing Attended | Thank-you within 2 hours + 7-day follow-up + 14-day check-in (rep-personalised template) |
| Reservation | Conveyancing-step explainer drip every 14 days through to exchange |
| Completion | Owner welcome series — portal walkthrough, rental onboarding, owner events |

---

## 5. Lead Scoring Model

Scored 0-100 in app; written to GHL.

| Signal | Points |
|---|---|
| Brochure downloaded | +10 |
| Calculator used (any tier) | +8 |
| Viewing day booked | +20 |
| Viewing attended | +25 |
| Private viewing booked | +20 |
| Private viewing attended | +30 |
| Returned to site (3+ sessions) | +5 |
| Visited `/the-process` or `/the-costs` | +6 |
| Budget band ≥ £500k | +8 |
| Timeline 0-3 months | +12 |
| Timeline 3-6 months | +8 |
| Finance mode = cash | +10 |
| Engaged with rep email (open + click) | +3 each |
| Inactivity 60+ days | −15 |
| Unsubscribed | −20 |

**Bands:** 0-29 cool / 30-59 warm / 60-79 hot / 80+ red-hot (auto-Slack rep). Bands trigger rep-assignment rules in §8.

---

## 6. Compliance Checklist for Sales Copy

This is the line that determines what can ship. Three categories:

### 6.1 OK without specialist review (still goes through ASA/CAP common-sense check)
- Lifestyle copy ("a weekend retreat above the coast", "your second home on the estate")
- Factual specification (sqft, beds, baths, brand names, BS3632, 125-yr licence, EPC, all-electric)
- Estate/facility descriptions
- Awards (Gold Award Ethical Tourism 2024/25, NPS 83.3 — quote source + date)
- Process steps (enquiry → viewing → reservation → exchange)
- Sustainability data with named sources (wind turbine kW, bee count)
- "Past guest" testimonials with anonymised attribution and dated consent

### 6.2 Needs specialist FCA legal review BEFORE launch
- **Any** use of "guaranteed return", "guaranteed yield", "guaranteed rental income", "8%"
- Calculator income illustrations (default OFF until cleared)
- Comparison to investment products, ISAs, savings accounts, pensions
- Capital-growth claims ("lodges have grown X% in value")
- "Investment" language framing the purchase
- The current `/guarenteed-rental-income` page must NOT be ported as-is
- The current `/make-some-money` page must NOT be ported as-is
- Any reference to "tax-efficient" without an accountant disclaimer
- Rental scheme detail copy (must be product-info only, not promotional)

### 6.3 Prohibited under any circumstances
- "Risk-free", "no downside", "passive income"
- Implying FSCS / FCA protection where none applies
- Direct comparison to BTL mortgages without specialist input
- Promising any specific occupancy rate
- "Limited availability — buy now before prices rise"-type pressure tactics on financial value
- Pre-ticked marketing consent
- Pre-ticked "I have read the risk warning"
- Any income figure on a paid ad creative without static risk warning of equal prominence (CAP Code rule 14.4)

### 6.4 Risk-warning template (must appear on every page mentioning income)
> *"Whalesborough lodges are lifestyle purchases. Rental income, where shown, is illustrative only, based on stated assumptions, and is not guaranteed. Your income may be lower or higher and depends on occupancy, market conditions, and individual circumstances. Lodge purchases are not regulated investments and do not benefit from FSCS protection. You should take independent legal, tax and financial advice before purchase."*

### 6.5 Mapping to the 12 objection counterarguments
The existing 12 objection answers (FHL tax, council tax, compliance, CGT, capital growth, post-pandemic, tourism decline, affordability, stamp duty, occupancy, business rates — plus the 12th investment-rationale answer) ship as follows:
- **FAQ accordion** on `/lodges/faqs` — all 12 in full
- **Embedded contextual snippets** on relevant pages: FHL tax + business rates on calculator; council tax + stamp duty on `/the-costs`; tourism decline + post-pandemic + occupancy on Trelowen and Tevi landing; capital growth on `/buyers-guide` (gated)
- **In viewing-day pre-meeting email** — link to top 4 most-objected
- **Rep crib-sheet** in admin (CMS-driven, can be updated by sales managers)

All 12 answers go through legal review (category 6.2) before publication; investment-claim-heavy ones (capital growth, occupancy) may need rewording.

---

## 7. Owner Portal — Full Feature List

1. **Dashboard** — welcome, build-stage progress, milestones, alerts.
2. **Build progress** — photo-timeline per milestone; ETA per stage; comms drawer with site manager.
3. **Snagging board** — create, photograph, track to resolution; SLA visibility (target response 5 working days).
4. **Handover scheduling** — 2-hour appointment slot, prep checklist (utilities, deliveries, keys).
5. **Welcome-to-ownership module** — owner-pack PDF, estate handbook, contact directory, emergency numbers.
6. **Rental scheme onboarding** — opt-in/out, terms (separate signed doc), bank-details collection for payouts, photo-shoot scheduling, listing-copy approval.
7. **Rental income & performance** — monthly statements, occupancy chart, ADR chart, net-payout table; clearly labelled *historical performance — not a projection*.
8. **Occupancy calendar** — block personal use; see incoming rental bookings; cut-off windows for blocking.
9. **Maintenance requests** — categorised tickets, photo upload, status tracker.
10. **Resale support** — list for resale form; broker handoff; live listing visibility.
11. **Owner-only events** — calendar, RSVP, capacity limits, plus-one toggle.
12. **Owner concierge** — pre-arrival groceries, restaurant booking, spa booking, dog-pack add-on; deep-link into main resort booking flows.
13. **Document vault** — sale contracts, warranties, EPC certificate, gas/electrical safety certs, manuals.
14. **Notifications** — email, push (PWA), in-app inbox; granular preferences.
15. **Multi-owner support** — joint-owner invitations, role-based view (read-only / full).

---

## 8. Sales Rep Dashboard / Admin Features

1. **Lead inbox** — all leads, filterable by stage, score, budget, timeline, source, rep.
2. **Lead detail** — full activity timeline, all calls/emails, notes, files, GHL link, AI-summary card "what to say next".
3. **Hot-lead alert** — red-dot in nav when a score ≥ 80 lead becomes active; Slack ping.
4. **Calendar** — viewing days + private viewings + callbacks; drag-drop reschedule.
5. **Lead-assignment rules editor** — round-robin, by tier interest, by score band, by rep specialisation (Rebecca = ownership; Graeme = viewings).
6. **Pipeline forecast** — weighted-value forecast by stage probability; close-date projections.
7. **Plot inventory editor** — release plots, mark sold/reserved, update prices (price-change audit log mandatory).
8. **Customisation catalogue editor** — flooring, kitchen, furniture pack options.
9. **Brochure & buyer-guide CMS** — versioned content with publish workflow.
10. **FAQ / objection editor** — edit the 12 answers; legal-review flag required before publish for category-6.2 fields.
11. **Email-template editor** — merge fields for tier, plot, rep, viewing date.
12. **Reporting suite** — KPIs (see §10), saved views, CSV export.
13. **Audit log** — every price change, copy change, status change, AML decision; 6-year retention.
14. **Role-based access** — Sales rep, Sales manager, Ownership coordinator (Rebecca), Site manager, Marketing, Finance, Legal-reviewer, Admin.

---

## 9. Marketing Automation Flows (Per Stage)

### Awareness
- Meta lead-ad → GHL sync → instant brochure email → 24h "did you get it" email → 72h "explore the estate" email.
- Google Ads landing form → same as above with tier-personalised brochure.
- Organic visitor (no form yet) → exit-intent modal "Get the brochure" (frequency-capped 1/30 days).
- Lifestyle article reader → at-end CTA "Join the waitlist" (lighter-touch capture).

### Research
- Calculator-completed → email with PDF estimate + viewing-day invite.
- Comparison-page > 30s → retargeting pixel; ad sequence "Trelowen vs Tevi" article.
- Three or more page visits in 14 days → flagged "engaged" in GHL; rep gets task to call within 48h.

### Engagement
- Viewing booked → instant ICS + day-before reminder + meet-your-host bio.
- Viewing attended → 2h thank-you + 24h personalised follow-up from rep + 7d nudge.
- Viewing no-show → 24h "sorry we missed you, can we reschedule?" sequence.
- Private-viewing booked → high-touch personal email from rep within 1h.

### Conversion
- Reservation initiated, AML pending → daily reminder + step-by-step explainer.
- Reservation paid → 14-day exchange-prep series (solicitor checklist, customisation deadlines).
- Exchanged → monthly build-progress email pulled from `build_milestones`.

### After-Sales
- Handover-week → arrival prep email + welcome-pack + first-night-on-the-estate concierge.
- 14 days post-handover → snagging-reminder email + NPS request.
- Rental-scheme opt-in → monthly performance email + quarterly market-update.
- Annual owner anniversary → personalised message + invite to owners' event.

---

## 10. Sales Metrics to Track

### Acquisition
- Sessions, unique visitors, traffic by channel
- Brochure downloads (volume, source, tier)
- Cost per brochure (paid channels)
- Cost per qualified lead (score ≥ 30)

### Engagement
- Calculator completions
- Comparison-page engagement (time, completions)
- Viewing-day bookings / show rate
- Private-viewing bookings / show rate
- Chat-initiated conversations / sales-rep-handled
- AI-prescreen completion rate

### Pipeline health
- Leads in each stage
- Stage conversion rates (Brochure → Viewing → Reservation → Exchange → Completion)
- Average time-in-stage per stage
- Pipeline weighted value (£)
- Forecast vs actual close

### Outcomes
- Reservations placed, value
- Exchange rate from reservation
- Cancellations within cooling-off
- Completed sales, value, by tier
- Sales-rep performance (per rep, per stage)
- Lead-source ROI (£ completed sales ÷ £ marketing spend)

### Compliance
- Marketing-consent opt-in rate
- Unsubscribe rate per sequence
- SAR / erasure-request response time
- Risk-warning impression coverage (every income-related page view should record a risk-warning view event)
- Calculator illustration-toggle activations (audit-log requirement)

### Owner Portal
- Active owner accounts
- Snagging-resolution time
- Rental-scheme opt-in rate
- Owner NPS

---

## 11. Build Sequencing Recommendation

**Phase 1 — Pre-launch foundations (weeks 1-6):** schema, GHL sync, brochure flow, tier landing pages WITHOUT income claims, viewing-day booking, lead-score baseline.
**Phase 2 — Conversion (weeks 7-12):** estate map, comparison, calculator (income off by default), reservation flow, AML, e-sign.
**Phase 3 — Owner portal MVP (weeks 13-18):** build-progress, snagging, handover, document vault.
**Phase 4 — Rental & advanced (weeks 19-24):** rental dashboards, owner concierge, retail/owner events, resale support.
**Compliance gate:** Phase 1 ships ONLY after FCA-qualified counsel sign-off on (a) tier-landing copy, (b) brochure PDF, (c) calculator UX, (d) the 12 objection answers. No exceptions.

---

*This specification reflects the Whalesborough product as understood at 14 May 2026. Every reference to investment return, yield, guaranteed income or rental projection is marked [TBC pending FCA legal review] and will not be published in production until specialist counsel has confirmed the wording in writing. The architectural design accommodates legal-approved copy being slotted in via the CMS without rebuild.*
