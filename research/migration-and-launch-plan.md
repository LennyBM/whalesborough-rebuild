# Whalesborough Farm Resort & Spa
# Migration & Launch Plan
*£500k Unified Booking Platform — 5 fragmented systems to one digital concierge*
*Compiled: 14 May 2026 | Target public launch: late Q4 2026 / early Q1 2027*

---

## 1. Domain Strategy & Redirect Map

**Primary domain:** `whalesborough.co.uk`. It has the strongest backlink profile, owns the brand name, and is the only domain that can credibly host all four revenue streams under one roof.

**Architecture:** Path-based subdirectories — *not* subdomains. Subdomains split link equity and force separate Search Console properties, Google Business Profile reconciliation, and analytics configs. The W Club and The Weir are *departments* of one resort, not separate businesses.

| Current domain | New target | Reason |
|---|---|---|
| `whalesborough.co.uk/*` | Stays as canonical | Strongest equity |
| `wclubwhalesborough.co.uk/*` | `whalesborough.co.uk/spa/*` (per-page 301) | Consolidate spa equity |
| `weir-restaurant-bude.co.uk/*` | `whalesborough.co.uk/restaurant/*` | Consolidate restaurant equity |
| `whalesboroughliving.co.uk/*` | `whalesborough.co.uk/ownership/*` | Consolidate lodge sales equity |
| `whalesboroughluxurylodges.co.uk/*` | 301 → `whalesborough.co.uk/ownership/` | Already dormant, single redirect |
| `landal.co.uk/parks/whalesborough-resort/*` | Negotiate with Landal: add canonical pointing to our pages, or accept as channel mirror | Cannot 301 third-party domain |

**Redirect mechanics:** Deploy at Cloudflare Workers (or Netlify `_redirects` if hosted there) — *not* at the application layer. CDN-level redirects survive deploy outages and avoid first-hop latency. Use 301 (permanent) for every mapped URL, never 302, and never chain redirects (max one hop, ever).

**Domain retention:** Keep all four legacy domains registered for **minimum 10 years**. Redirect them forever. Letting `wclubwhalesborough.co.uk` lapse would be catastrophic — competitors or affiliate scrapers would pick it up within months.

**Per-page mapping (illustrative, full inventory below):**

| Old URL | New URL |
|---|---|
| `wclubwhalesborough.co.uk/spa-treatments/gaia-rituals/` | `whalesborough.co.uk/spa/rituals/gaia/` |
| `wclubwhalesborough.co.uk/spa-day-packages/sunrise/` | `whalesborough.co.uk/spa/days/sunrise/` |
| `wclubwhalesborough.co.uk/membership/` | `whalesborough.co.uk/spa/membership/` |
| `weir-restaurant-bude.co.uk/breakfast/` | `whalesborough.co.uk/restaurant/breakfast/` |
| `weir-restaurant-bude.co.uk/lunch/` | `whalesborough.co.uk/restaurant/lunch/` |
| `weir-restaurant-bude.co.uk/events/` | `whalesborough.co.uk/restaurant/events/` |
| `whalesboroughliving.co.uk/tevi/` | `whalesborough.co.uk/ownership/tevi/` |
| `whalesboroughliving.co.uk/buyers-guide/` | `whalesborough.co.uk/ownership/guide/` |
| `whalesboroughliving.co.uk/faqs/` | `whalesborough.co.uk/ownership/faqs/` |

---

## 2. SEO Migration Checklist & Timeline

The single highest-risk part of this launch. A botched migration can wipe 40–60% of organic traffic for 3–6 months. Treat it as a separate workstream with its own owner.

**Week –6 (six weeks pre-launch):**
- Full Screaming Frog crawl of all four live domains. Export every URL, status code, title, H1, canonical, internal link count.
- Pull top 200 ranking keywords per domain from Search Console (export last 16 months).
- Pull top 50 inbound linking domains per property from Ahrefs/Majestic.
- Build the master URL map (Sheets) — every old URL gets a target URL. No "TBD" rows allowed.

**Week –4:**
- Pre-publish all new URLs as `noindex, follow` on staging. Validate schema, canonicals, Open Graph.
- Implement `LodgingBusiness`, `Accommodation`, `Restaurant`, `HealthAndBeautyBusiness`, `Product` (lodge sales), `FAQPage`, `BreadcrumbList` per the Technical-SEO brief.
- Add `Organization` schema with `subOrganization` linking to spa and restaurant nested entities.

**Week –2:**
- Deploy 301 redirect rules to Cloudflare staging, dry-run against URL inventory.
- Validate every redirect resolves single-hop, 200 final status.
- Reach out to top 50 inbound linkers asking for link updates (don't *rely* on this — 301s do the work, but it accelerates equity transfer).
- Update Google Business Profile: parent listing for the resort, nested departments for The W Club and The Weir with "Located in:" attribute.

**Launch day:**
- Flip DNS to new infrastructure. Activate redirects.
- Submit fresh sitemaps for `whalesborough.co.uk` in Search Console and Bing Webmaster Tools.
- Use Search Console **Change of Address** tool for each of the three secondary domains (wclub, weir, living).
- IndexNow ping to Bing and Yandex with the full URL list.

**Week +1 to +12:**
- Daily Search Console crawl-error monitor. Fix any 404s within 24hr.
- Weekly rankings tracker for the 30 priority keywords ("whalesborough", "luxury cottages Cornwall", "Bude spa", "Cornwall lodges for sale", "dog friendly cottages Cornwall").
- Expect a 10–20% temporary traffic dip in weeks 2–6. Recovery by week 8–12 if redirects are clean.

**Hard rules during migration:**
- No URL pattern changes between launch –2 weeks and launch +12 weeks.
- No content "improvements" that could change a page's primary intent.
- Restaurant pages (currently bare) need full content live *before* the redirects fire — empty 200s are worse than 301s.

---

## 3. Booking Continuity Plan

The cardinal rule: **zero existing bookings get dropped**.

**Landal (accommodation):**
- Existing future bookings stay on Landal — do not attempt to migrate active reservations. The legal contract is Landal-to-guest.
- Negotiate read API access from Landal to mirror those bookings into the new guest portal (read-only display).
- All new direct bookings from launch day onward run through the new platform. Landal stays live as a *channel* (alongside Booking.com, Sykes) via the channel manager.

**Try.be (spa):**
- Existing spa appointments stay in Try.be until they've been delivered.
- Cut-over date for new spa bookings: **single hard switch**. Try.be is small enough that dual-running creates more confusion than it solves. Set a "last booking date via Try.be" two weeks before launch.

**Restaurant:**
- 100% net-new. No continuity problem. Launch the new booking flow on day one with no legacy migration burden.

**Cut-over communications (T-minus 21, 14, 7, 1 day to every upcoming guest):**
- "We're moving home" email explaining the change.
- Their existing booking is safe — link to log in to the new guest portal (one-click magic-link, no password reset friction).
- New benefits unlocked: cross-property add-ons, spa pre-booking, restaurant reservation.

**Dual-running policy:** Old systems stay readable for **90 days post-launch** for support/reconciliation purposes. After day 91, archive to cold storage.

---

## 4. Data Migration Plan & Consent Strategy

**Sources:**
- Landal: guest records, booking history, preferences
- Try.be: spa client list, appointment history
- GoHighLevel: 52 qualified lodge leads + any captured contacts (59% of CRM build is missing — fix this *before* migration)
- Mailchimp / current email tool: marketing subscribers
- Restaurant guest book / Lakeside Locals roster (if exists)

**Process:**
1. Export each source to structured CSV (week –10).
2. De-duplicate on email-as-primary-key, fallback to phone+surname match. Expect 30–40% overlap across Landal/Try.be/Mailchimp (return guests who use the spa).
3. Standardise: title case names, E.164 phone numbers, ISO dates, normalised addresses.
4. Tag each record with `source_system` and `source_consent_date`.
5. Import to new platform's customer table with verified provenance.

**Consent — this is where you cannot cut corners:**
- Transactional data (booking history, contact details) migrates lawfully under contract-performance basis. No re-opt-in needed.
- **Marketing consent does NOT migrate automatically.** A 2023 Mailchimp opt-in does not transfer to a 2026 Whalesborough platform marketing list under UK GDPR + PECR.
- Send a soft re-permission campaign 4 weeks pre-launch: "We're moving home — confirm you'd like to keep hearing from us." Non-responders are dropped from marketing (kept in transactional only).
- The lodge sales database needs **explicit opt-in** per PECR — soft opt-in does not apply to lodge marketing (not the "same or similar products" exemption). Re-consent every single lead.
- Loyalty programme transition: existing W Club members + Lakeside Locals members get a personal email from Rebecca Peake explaining the move to "Whalesborough Circle" with grandfathered status + a launch perk (e.g. complimentary 60-min treatment on next visit).

**DUAA (deadline 19 June 2026):** Implement formal data subject rights mechanisms — DSAR portal, rectification flow, erasure workflow, complaints procedure — *before* migration begins. Migrating data into a platform that can't honour rights requests is non-compliant from day one.

---

## 5. Channel Manager Selection & Setup

**Recommendation: SiteMinder.** Rationale:
- Strongest Landal connector (existing inventory feed is critical — we're not moving away from Landal as a *channel*, just demoting it from monopoly to one-of-many).
- Booking.com and Sykes both have native, mature SiteMinder integrations.
- Pricing scales by units (~30 units × £15/unit/month band) sits comfortably inside platform OpEx.
- Rentals United is the alternative — better for very-high-channel-count strategies (1000+ OTAs) but overkill for the ~6 channels Whalesborough actually needs.

**Channels to onboard:**
| Channel | Status | Action |
|---|---|---|
| Direct (own platform) | New primary | 100% inventory, best rate |
| Landal | Existing channel | Demote from monopoly, retain |
| Booking.com | Existing 5–9% | Retain, sync rates |
| Sykes | Started Jan 2026 | Retain |
| Hoseasons | Stopped Dec 2025 | Confirm closed, archive listings |
| Airbnb | Not currently used | Evaluate Q1 2027 — luxury Airbnb is a real audience |

**Rate parity rule:** Direct booking always gets the lowest publicly-available rate (subject to OTA contractual minimums) **plus** a value-add OTAs can't match (welcome hamper, spa credit, late checkout). Avoid pure-price wars; OTAs will retaliate by demoting search position.

**Onboarding timeline:** 6 weeks from contract signing to live sync. Begin at week –10 so all channels are stable by launch.

---

## 6. Compliance Launch Checklist

Binary pass criteria — each must be **green** before public launch:

- [ ] Privacy policy live, dated, lists all processing purposes + lawful bases
- [ ] Cookie policy live, separate from privacy policy
- [ ] T&Cs live — separate clauses for accommodation, spa, restaurant, lodge enquiry
- [ ] Cookie banner: equal-prominence Accept/Reject, no pre-ticked boxes, withdraw mechanism in footer
- [ ] No analytics, marketing, or non-essential cookies fire before consent (Plausible self-hosted may qualify for exemption — get DPO sign-off)
- [ ] DSAR portal live with documented 30-day response SLA
- [ ] Data protection complaints procedure live (DUAA deadline 19 June 2026)
- [ ] Accessibility statement live, references WCAG 2.2 AA conformance, lists known issues + remediation timeline
- [ ] WCAG 2.2 AA audited by external party (not just axe/Lighthouse) — Equality Act 2010 exposure
- [ ] PCI DSS SAQ A attestation completed, signed
- [ ] Stripe payment script integrity monitoring active (weekly)
- [ ] Short-term let registration number visible on **every** unit page (mandatory April 2026)
- [ ] Lodge sales copy reviewed by FCA-specialist solicitor — no "guaranteed return" language, risk warnings present, lifestyle-not-investment framing
- [ ] Klarna BNPL (if live by 15 July 2026) — Consumer Duty disclosures, FCA-regulated promotion compliance
- [ ] DPO appointed *or* documented decision that DPO is not legally required (depends on scale of processing — likely required given 30+ units, spa client data, lodge investment leads)
- [ ] SPF, DKIM, DMARC live on all sending domains; transactional email separated from marketing email
- [ ] CSP header with nonce-based scripts deployed, HSTS preload submitted
- [ ] Cookie banner verified post-launch with browser dev tools — confirm no leaks

---

## 7. Phased Launch Recommendation

**My recommendation: Hybrid B + D — phased per revenue stream, but with a hard MVP feature gate inside each phase.**

Rejected alternatives:
- **Option A (big bang)** — Too much risk. Four booking engines, channel manager, CRM migration, 4-domain SEO migration, four legal frameworks. One bug at launch could take down the spa *and* accommodation *and* restaurant simultaneously. £500k buys you the right to launch *carefully*.
- **Option C (audience-phased)** — Sounds prudent but stretches timeline by 4–6 weeks for marginal benefit. Staff training can run in parallel to the public phase rollout.
- **Pure Option D (feature-phased)** — Loses the per-stream narrative. Marketing a "the booking is great, loyalty comes Q2" launch is a soft sell; phasing the *streams* gives four legitimate launch moments.

**The recommended four-phase launch:**

**Phase 1 — Lodge Sales (Week 0 of public launch)**
Why first: lowest transactional risk (it's lead capture, not real-time payment), highest commercial urgency (52 qualified leads need a credible site, GHL is half-built), and the easiest stream to soft-launch behind. WordPress + Elementor migration is a known quantity. If something breaks, the worst case is enquiries route to phone.

**Phase 2 — The Weir Restaurant (Week +2)**
Why second: net-new capability, no migration risk, no legacy bookings to preserve, immediate revenue lift (currently zero pre-bookings). Lowest-stakes way to bed in the new platform's auth + payments + email confirmation pipeline.

**Phase 3 — The W Club Spa (Week +6)**
Why third: medium complexity (Try.be cutover), known guest base, contained blast radius. Use the four weeks since restaurant launch to harden the auth and payment flows before subjecting them to spa-day-package pricing complexity and gift voucher edge cases.

**Phase 4 — Accommodation + Channel Manager (Week +10)**
Why last: highest complexity (Landal API or replacement engine, 30+ units, channel manager sync, dynamic pricing, length-of-stay rules, OTA rate parity). By this point the platform has been live for 10 weeks with real bookings on three less-risky streams. The accommodation launch is the one that *must not fail* — give it the most production-hardened version of the platform.

**MVP gate within each phase:**
Phase 1 (lodge): property pages + enquiry forms + brochure download + CRM integration. *Not yet*: investment calculator (legal sign-off pending), virtual tours (commission later).
Phase 2 (restaurant): table booking + dietary capture + confirmation email. *Not yet*: dynamic table-layout visualisation.
Phase 3 (spa): treatment booking + spa-day packages + gift vouchers. *Not yet*: AI concierge recommendations.
Phase 4 (accommodation): booking + payment + add-ons + cross-sell. *Not yet*: estate 3D map, live sustainability dashboard.

Loyalty programme, AI concierge, estate 3D map, sustainability dashboard — these are **Phase 5 (Q1 2027)**. The temptation to launch with everything is real and must be resisted.

---

## 8. Soft Launch Programme

**Week –4 to –2: Internal alpha.** Resort management, restaurant staff, spa staff, sales team all create accounts, place test bookings, attempt to break the system. Daily bug bash. Slack channel `#whalesborough-app-bugs` with engineering on-call.

**Week –2 to 0: VIP closed beta.**
- 30 invited guests: existing high-value returners, top-5 lodge owners, key trade contacts (Boutique Hotelier journalist).
- Real bookings at real prices.
- £100 platform credit as a thank-you for friction reports.
- One-question post-booking survey: "Would you recommend this platform? Why?"

**Marketing pause:** No paid media. No press. No PR. Organic-only until Phase 4 (accommodation) is stable. Stripe alerts and Sentry monitored hourly during this period.

**Staff training programme:**
- 2-hour platform overview session for all front-of-house
- 1-day deep dive for sales team (lodge funnel + CRM)
- 1-day deep dive for reception (admin dashboard + cross-stream upsell)
- Recorded video walkthroughs in the staff handbook for new joiners

---

## 9. Public Launch Marketing Plan

Target window: aligned with Phase 4 (accommodation) going live. Likely late autumn launching ahead of January-to-Easter booking surge.

**PR strategy (booked 8 weeks in advance):**
- Condé Nast Traveller — exclusive on "Cornwall's first resort with a true digital concierge"
- The Times Travel — angle: "Independent luxury fights back against the OTAs"
- The Telegraph Travel — dog-friendly angle (Whalesborough's strongest USP)
- House & Garden — interiors angle (Trelowen photography is press-ready)
- Boutique Hotelier (trade) — case study: how a 500-acre resort replaced 5 systems
- Cornwall Live + Cornwall Today — local angle, jobs, investment in West Cornwall tech

**Influencer programme (12 partnerships):**
- 4 luxury travel (UK + international)
- 4 dog travel (highest-converting affinity per Whalesborough data: 23–46% booking driver)
- 4 family travel (multi-generational angle — 32% of guests are extended families)
- All on hosted-stay basis with disclosed partnerships; no paid posts to maintain editorial credibility

**Existing guest comms — "Our new home":**
- Personalised email from Charlie Peake to every past guest (segment by recency)
- Subject line: "We've built you something" (highest open-rate format in hospitality)
- Single CTA: explore the new platform, claim a returning-guest perk

**Trade press:** Boutique Hotelier feature, Hospitality Net case study, Cornwall Tourism Awards submission.

**Social campaign (8-week run):**
- Instagram: hero video + 12-post grid takeover (production: existing 110+ posts inventory)
- Pinterest: lodge sales primary, restaurant secondary (high-intent UK travel platform)
- TikTok: dog content + family content (organic only, no paid)
- No Facebook Reels — audience misalignment

**Paid media (£40k launch budget):**
- Google Search: brand defence + non-brand intent ("luxury cottages Cornwall", "spa break Cornwall", "Cornwall lodges for sale")
- Google Performance Max: switched OFF until 6 weeks of conversion data exists (don't feed an unprimed algorithm)
- Meta Advantage+ Shopping: lodge sales audience (52-lead lookalike + interest layers)
- Pinterest: luxury UK travel + interiors audiences

---

## 10. Post-Launch Operational Plan

**Hypercare period: first 72 hours.**
- Engineering on-call rotation, 24/7 coverage
- Sentry alerts to Slack with 5-minute response SLA for P1 (booking failures, payment failures, auth failures)
- Daily standup including engineering, operations, sales, marketing at 09:00
- Daily booking + revenue reconciliation between platform, Stripe, Landal, Try.be archives

**Hypercare period: weeks 1–2.**
- 4-hour P1 response SLA
- Twice-weekly standup
- Weekly stakeholder report to Charlie Peake + Rebecca Peake

**Monitoring stack:**
- **Sentry** — runtime errors, source-mapped, integrated with Slack
- **Plausible** (self-hosted, EU) — privacy-first analytics, conversion funnel tracking
- **Stripe Radar** — payment fraud, failed payments alerted
- **Statuspage** — public-facing uptime dashboard at `status.whalesborough.co.uk`
- **Pingdom** — synthetic uptime checks every 60s from 4 UK regions
- **Search Console** — daily check during weeks 1–12

**Iteration cadence:** 2-week sprints from week 3 onwards. First three sprints are 80% bug fixes / 20% small enhancements. After sprint 4, ratio inverts to 30/70 in favour of new features.

**Phase 5 backlog (Q1 2027 onwards):** AI concierge, estate 3D map, sustainability dashboard, Whalesborough Circle loyalty redemption, e-commerce ("Estate Shop"), Open Banking / VRP payments.

---

## 11. Risk Register — Top 10

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Landal API access denied or restrictive | Medium | High | Plan B: build custom availability engine with nightly Landal CSV sync (15–30 min delay acceptable) |
| 2 | SEO traffic drop > 30% post-migration | Medium | High | Per-page 301 audit pre-launch; daily Search Console monitor; rollback plan for individual redirect rules |
| 3 | FCA enforcement on lodge sales claims | Low | Critical | FCA-specialist legal review pre-launch; lifestyle-not-investment framing; risk warnings on every page |
| 4 | Payment failures at launch peak | Low | Critical | Stripe webhooks idempotent; circuit breaker on payment provider; manual fallback (call to reception) documented |
| 5 | Customer data migration produces duplicates or orphans | High | Medium | Stage migration in QA copy of production DB; reconciliation report signed off before go-live |
| 6 | Cookie banner non-compliance triggers ICO complaint | Low | High | DPO sign-off pre-launch; pen-test the cookie behaviour with real browser fingerprinting |
| 7 | Try.be cutover loses existing spa appointments | Medium | High | Read-only Try.be archive kept 12 months; existing appointments imported to display in new portal |
| 8 | Channel manager rate parity violation by OTA | Medium | Medium | Rate parity audit weekly; OTA contract review by legal; rate fence policy on direct perks |
| 9 | WCAG 2.2 AA failure → Equality Act complaint | Low | High | External a11y audit before launch; ongoing axe-CI on PRs; accessibility statement with remediation log |
| 10 | Soft launch reveals fundamental UX flaw (e.g. booking abandonment > 80%) | Medium | High | VIP beta with 30 invited guests; willingness to delay Phase 4 by 2–4 weeks if Phase 3 abandonment > 70% |

---

## 12. Timeline — Week-by-Week (20-Week Build)

Assumes a 20-week build, public launch Phase 4 (accommodation) at week 30 from kickoff (20 build + 4 staging + 6 phased rollout).

| Week | Workstream | Milestone |
|---|---|---|
| 1–2 | Discovery | API discovery (Landal, Try.be), legal kickoff, FCA counsel engaged, design system handoff |
| 3–4 | Foundations | Repo scaffolded, design system tokens in code, CI/CD live, Sentry + Plausible wired, auth flow built |
| 5–6 | Lodge sales build | Property pages, brochure download, enquiry form, GHL integration |
| 7–8 | Restaurant build | Table booking, dietary capture, confirmation pipeline |
| 9–10 | Spa build | Treatment booking, spa-day packages, gift vouchers, Try.be migration plan finalised |
| 11–13 | Accommodation build | Landal API/custom engine, 30+ unit pages, dynamic pricing, add-ons |
| 14 | Channel manager | SiteMinder configured, Booking.com + Sykes + Landal feeds verified |
| 15 | Guest portal | Cross-stream login, booking management, magic-link flow |
| 16 | Admin dashboard | Multi-role access, revenue reporting, CRM integration |
| 17 | Compliance hardening | DSAR portal, complaints procedure, accessibility statement, cookie consent, PCI SAQ A |
| 18 | SEO migration prep | Full URL inventory, redirect map, schema deployed on staging |
| 19 | Internal alpha | Staff training, bug bash, performance optimisation |
| 20 | VIP closed beta | 30 invited guests, real bookings, friction logging |
| 21–22 | Phase 1 launch — Lodge sales | Public launch, GHL nurture flows live, FCA-cleared copy |
| 23–24 | Phase 2 launch — Restaurant | First pre-booked covers, dietary data captured |
| 25–28 | Phase 3 launch — Spa | Try.be hard cutover, gift vouchers live, Whalesborough Circle migration begins |
| 29 | Pre-launch press embargo | PR briefings, influencer content shoots, paid media creative |
| 30 | Phase 4 launch — Accommodation + public launch | Full platform live, channel manager fully active, press goes live |
| 31–32 | Hypercare | Daily standup, SLA monitoring, Search Console daily |
| 33–42 | Stabilisation | Bi-weekly sprints, conversion optimisation, abandoned-cart recovery |
| 43+ | Phase 5 roadmap | AI concierge, 3D estate map, sustainability dashboard, loyalty redemption |

**Critical path dependencies:**
- FCA legal sign-off must complete by week 18 or Phase 1 (lodge) slips
- Landal API decision must be made by week 8 or Phase 4 build extends 4 weeks
- Channel manager contract must sign by week 10 or Phase 4 slips
- External a11y audit must complete by week 19 or compliance gate fails

---

*Plan compiled: 14 May 2026 | Peake Management for Whalesborough Farm Resort & Spa*
