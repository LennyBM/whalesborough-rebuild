# Whalesborough App — Integration Feasibility Research

**Date:** 2026-05-14
**Author:** Peake Management (research pass)
**Decision context:** £500k booking-app build. Must decide build-vs-integrate per revenue stream before architecture lock.

---

## TL;DR — Recommendation Summary

| Revenue stream | Recommendation | Rationale |
|---|---|---|
| **Spa / W Club (Try.be)** | **KEEP Try.be + integrate via Open API** | Try.be has a documented OpenAPI spec, 80+ endpoints, OAuth/OpenID auth, webhooks. No reason to rebuild. |
| **Accommodation (Landal)** | **Phase 1: read-only mirror via channel manager bridge. Phase 2: negotiate direct-API agreement.** | No public Landal API. Landal is a management partner, not the owner (UK Country Parks owns the resort) — contractual leverage exists but must be respected. |
| **Restaurant (Weir)** | **SevenRooms** | Best loyalty/CRM, open API, fits "lakeside locals" membership model. Premium pricing matches the brand. |

Top risk: **Landal channel exclusivity clause** — if the management contract grants Landal exclusive booking rights, the entire direct-booking thesis must be re-scoped to a "discover here, book there" model. **This requires legal review before lock-in.**

---

## 1. Try.be Assessment

### Capability verdict: STRONG — keep and integrate

Try.be (corporate name "Trybe", marketed at try.be) is a UK-headquartered cloud-native operational platform for spa, wellness, leisure and bathhouse operators. Customer base includes Marriott, Belmond, IHG plus 300+ independent spas. Platform has processed £748M+ in bookings.

**API surface (verified from docs.try.be):**

- **OpenAPI specification** publicly available for download — this is the strongest signal of integration-readiness in the market.
- **80+ REST endpoints** covering: Appointments, Sessions, Customers, Memberships, MembershipTypes, Vouchers/CouponCodes, DiscountTypes, Practitioners, PractitionerRotas, Availability, AppointmentEnquiries, InventoryProducts, InventoryOrders, StockOnHand, Suppliers, Orders, Baskets, Payments, Invoices, Sites, ExternalIdTypes, Reports, RevenueByCentre.
- **Webhooks** — first-class capability (dedicated guide section in docs).
- **Authentication:** OAuth 2.0 with OpenID Connect on top. OpenID autodiscovery endpoint at `https://{subdomain}.try.be/.well-known/openid-configuration`. Token exchange flow returns `id_token`, `access_token`, `refresh_token` (JWT).
- **OAuth scopes:** `openid`, `profile`, `email`, `memberships:read`, `memberships:write` — granular and standards-compliant.
- **SSO** for customers/guests/members — meaning we can let app users authenticate once and carry that identity into the spa booking flow without a second login. **This is the single most important capability for the app's UX.**

**Information not publicly disclosed (must confirm with Try.be account team):**
- Rate limits — not published. Will be commercial-tier dependent. **Action: request from CSM.**
- API pricing — likely bundled into the Enterprise tier; need quote.
- SLA / uptime — not on public site; request a copy of their MSA.

**What the API gives us for the app:**
1. Live treatment availability surfaced in the Whalesborough app's "Spa" tab.
2. Native in-app booking (no redirect to thewclub.try.be) — keeping the user inside the brand experience.
3. Webhook-driven push notifications (booking confirmed, treatment changed, cancellation window approaching).
4. Membership read/write — the "Lakeside Locals" tier can grant discounted W Club treatment pricing without staff intervention.
5. Gift cards and vouchers — surfaceable in-app for the seasonal gifting flow.
6. BI feed — pipe revenue and utilisation into the operator dashboard.

### Competitive alternatives (if we ever needed to migrate)

| Platform | API maturity | Spa-fit | Cost signal | Verdict for Whalesborough |
|---|---|---|---|---|
| **Mindbody** | Mature API, but older REST style; well-documented | Strong for hotel spas combining spa + fitness + classes | From ~$129/mo base, custom enterprise | Strong, but UX is dated — would lose ground vs Try.be |
| **Boulevard** | Modern GraphQL API | Premium day-spa focus | From $175/mo | Excellent UX, but US-centric — UK support patchy |
| **Mangomint** | REST API, modern | Boutique spa, slick client UX | ~$165/mo | Best client-facing UX in mid-market, but smaller team / API still maturing |
| **Phorest** | API available, strong marketing module | Salon-leaning | Custom | Strongest CRM/marketing — but less spa-positioning |
| **Zenoti** | Mature enterprise API | Multi-site spa chains | Enterprise | Overkill for one site |
| **Vagaro** | API exists, lighter coverage | SMB salon/spa | From $30+/mo | Too entry-level |

**Conclusion:** Try.be is already the right tool. The migration cost (staff retraining, data migration, gift-card balance carry-over, membership state) would be £40–80k for marginal API gain. **Stay with Try.be.**

---

## 2. Landal Integration Assessment

### The contractual headline first

**Whalesborough Resort & Spa is owned by UK Country Parks Ltd.** Landal GreenParks UK is the **management / booking partner**, not the owner. This is critical to the negotiation — the resort owner controls the contract, and the management agreement is a renewable commercial arrangement.

Landal itself is now part of **Roompot** (KKR-owned), having been sold by Awaze in 2023. The combined Roompot+Landal entity is a pan-European operator of ~250 parks with 6M annual guests.

### Public API status: NONE

There is **no public Landal developer programme, no public REST/GraphQL API, no documented webhooks, no partner sandbox.** Searches for "Landal API" surface only:

1. **Elite Dynamics / EliteParks partnership** — this is the official UK integration route. EliteParks (built on Microsoft Dynamics 365) is the go-to PMS for Landal GreenParks UK operators. It shares availability, dynamic pricing, reservations and bookings with Landal. EliteParks already integrates with Hoseasons via API, so the connector technology exists.
2. **CCV Shop** — Landal's Dutch e-commerce environment (consumer-side webshop, not a B2B API).

This means the only sanctioned path into the Landal inventory in the UK is **through EliteParks as a PMS**, not by talking to Landal directly.

### The three architectural options

**Option A — Integrate Landal as parent system (read availability, push bookings to Landal)**
- Mechanism: Whalesborough operates EliteParks as its PMS. Whalesborough app talks to EliteParks (which has a modern API). EliteParks bidirectionally syncs to Landal.
- Pros: Sanctioned, supported, low political friction. EliteParks gives the resort operational control of yields, fees, restrictions.
- Cons: Whalesborough still pays Landal commission on every booking, even ones that originate in the resort's own app. Margin is eroded.
- **Effort: 8-12 weeks integration.**

**Option B — Replace Landal as primary booking system (Landal becomes a downstream channel)**
- Mechanism: App owns the calendar. Whalesborough surfaces inventory to Landal via a channel manager (likely RentalsUnited or SiteMinder — both are vacation-rental-capable). Landal becomes one of N distribution channels.
- Pros: Whalesborough keeps full margin on direct bookings. Brand owns the customer relationship and email list. Landal becomes a marketing channel (paid by commission only on what they sell).
- Cons: **Requires renegotiation of the Landal management contract.** Landal's commercial model depends on being the booking-of-record. Likely Landal will resist or demand minimum-volume guarantees.
- **Effort: 6–9 months including legal + commercial.**

**Option C — Run alongside Landal (both accept bookings, must avoid double-bookings)**
- Mechanism: Calendar sync via iCal feed, channel manager, or PMS bridge. Both systems write to the same inventory.
- Pros: Lowest contractual friction in the short term.
- Cons: **Double-booking risk is real.** Latency between systems is the enemy. Whalesborough has 30+ units across multiple property types (cottages, barn conversions, the farmhouse) — even a 2-minute sync gap during peak release is a customer-service disaster.
- **Effort: 3–4 weeks for naive iCal sync; 8 weeks for PMS-mediated sync.**

### Recommendation: A → B over 18 months

**Phase 1 (Months 0–6):** Implement Option A. Adopt EliteParks as PMS. Whalesborough app reads availability and books through the EliteParks API. Landal continues to be the dominant channel. Confirm pricing parity rules (Landal almost certainly has a rate-parity clause).

**Phase 2 (Months 6–18):** Renegotiate the Landal management contract to permit direct bookings via the Whalesborough app at a reduced or zero commission. Use leverage points:
- The £500k investment in a custom guest-facing app is value Landal benefits from (improved guest data, repeat visits, on-site spend).
- Whalesborough's app drives traffic that Landal would otherwise pay for.
- UK Country Parks (the owner) holds the renewal cards.

**Phase 3 (Months 18+):** If renegotiation succeeds, the app becomes the primary booking surface. Landal remains a distribution channel alongside Booking.com and Airbnb via a proper channel manager.

### Has any Landal park done this?

**No public case study found.** Most Landal UK parks (Sandy Balls, Kenwick Woods, Darwin Forest, Whalesborough, etc.) book exclusively through landal.co.uk and the Hoseasons/Landal call centre infrastructure. There is one public report of inventory desync between Hoseasons and Landal (Kenwick Woods) — confirming the synchronisation challenge is real even within the Landal family.

The closest precedent is **Hoseasons-affiliated parks running EliteParks alongside the Hoseasons distribution**, which is the architectural template we'd inherit.

---

## 3. Restaurant Platform Decision — Weir Restaurant

### Selection criteria (in order)

1. **API for in-app embed** — the app must be able to show availability and complete a booking without sending the user out.
2. **Membership/CRM** — Lakeside Locals discount must be honoured automatically.
3. **UK presence + support.**
4. **Group/event ticketing** — the Weir hosts seasonal events.
5. **Pricing must fit a single-venue operator.**

### Platform comparison (2026 market)

| Platform | Monthly | API | UK support | Membership/CRM | Event ticketing | Verdict |
|---|---|---|---|---|---|---|
| **SevenRooms** | $500–700/mo single venue | Open API, webhooks, 100+ integrations | UK office, strong | **Class-leading CRM** — every booking creates a guest profile with preferences and order history | Yes (private events, ticketed experiences) | **WINNER** |
| **Tock** | $79 base / $199 Essential / $339 Premium / $769 unlimited | API available, prepaid focus | UK availability via parent (Amex) | Decent; merging with Resy mid-2026 | **Strongest** — prepaid tickets, tasting menus | Strong runner-up |
| **Resy** | $249 Basic / $399 Pro / $899 Enterprise | API + webhooks | Amex-backed UK presence | Solid, Amex Platinum tie-in ($400 credit programme) | Limited | Decent — better for urban dining than destination |
| **OpenTable** | ~£200/mo + £1/cover | Limited API | Strong | Weakest of the four | Limited | Cover fees would punish a popular Weir |

### Recommendation: SevenRooms

**Why:**
1. **Owner of the guest relationship** — SevenRooms is explicitly built so the venue keeps the data, unlike OpenTable. For a destination resort whose retention loop depends on guest profiles, this is non-negotiable.
2. **CRM depth fits the Lakeside Locals model** — automated tagging, preferences, order history, lifetime value tracking out of the box.
3. **Open API** that can drive an in-app embed cleanly. JavaScript events fireable to GTM/Cloudflare Zaraz for marketing attribution.
4. **Event ticketing** for the Weir's seasonal supper clubs, gin nights, etc.
5. **Premium positioning** matches Whalesborough's brand and pricing.

Cost (~£500–700/mo) sits well inside the £1.73M project budget, and per-venue pricing means no scaling penalty.

**One caveat:** DoorDash announced a $1.2B acquisition of SevenRooms in June 2025. Post-acquisition roadmap is uncertain. Mitigations: insist on a 12-month price lock, retain data-export rights in the contract.

**When to reconsider:** If Tock-Resy's mid-2026 merger ships strong API + CRM features at $339/mo, re-evaluate at app v1.1.

---

## 4. Build-vs-Buy Matrix per Revenue Stream

| Stream | Build custom | Integrate | Decision |
|---|---|---|---|
| Spa (W Club) | £80–120k engineering + 6 months + lifetime maintenance | Try.be API integration: £15–25k + ongoing licence | **INTEGRATE — Try.be** |
| Accommodation | £150–250k engineering + PCI scope + tax engine + channel manager build | EliteParks PMS adoption + integration: £30–50k + licence | **INTEGRATE — EliteParks bridge** |
| Restaurant | £40–70k + reservation engine + table management + waitlist + CRM | SevenRooms: £6–9k integration + £6–8k/yr licence | **INTEGRATE — SevenRooms** |
| Gift cards | £15–30k cross-stream + tax/expiry compliance | Try.be vouchers + SevenRooms gift cards | **INTEGRATE — federated, surfaced in app** |
| Membership (Lakeside Locals) | £20–40k membership engine | Try.be memberships:read/write + SevenRooms tags | **BUILD a thin orchestration layer** that federates Try.be + SevenRooms membership state. This is the one place custom code earns its keep. |

**Net engineering split of the £500k app budget (indicative):**
- Custom app shell, navigation, brand experience: £180k
- Membership orchestration + federated identity: £80k
- Integrations (Try.be + EliteParks + SevenRooms + payments + analytics): £120k
- Content + design + QA + accessibility + launch: £100k
- Contingency: £20k

---

## 5. Phasing — Fallbacks if Landal API Isn't Available

The Landal-direct-API path is **assumed unavailable** (no evidence one exists). The phasing below assumes that and only escalates.

**Phase 0 (Weeks 0–4): Discovery + contracts**
- Legal review of the UK Country Parks ↔ Landal management agreement (commission %, exclusivity, rate-parity, term, notice).
- Spike: Try.be sandbox + SevenRooms sandbox + EliteParks sales conversation.

**Phase 1 (Months 1–4): App MVP with read-only accommodation**
- Try.be + SevenRooms integrated and live in-app.
- Accommodation surfaces availability via **EliteParks PMS** if adopted, or via an **iCal feed from Landal** as a degraded fallback. CTA to book sends user to landal.com for accommodation only.
- Result: app is useful for everything except accommodation booking.

**Phase 2 (Months 4–9): Bridge accommodation through EliteParks**
- Adopt EliteParks as resort PMS. Integrate EliteParks API into app.
- App can now show real availability and (depending on Landal's policy) take direct bookings against the inventory, with Landal as the channel-of-record for commission.

**Phase 3 (Months 9–18): Renegotiate Landal terms / introduce channel manager**
- Contract renegotiation, or if it fails: invoke a notice period and replace Landal as the primary system, retaining them as a channel via SiteMinder or RentalsUnited.

**Manual rate management fallback** (if all software paths fail): A daily ops process where rates and restrictions are mirrored manually between Landal's extranet and the app's catalogue. Painful, not scalable past 30 units. Last resort only.

---

## 6. Contractual Considerations — Items to Flag for Legal Review

These must be checked in the UK Country Parks ↔ Landal management agreement **before architecture lock**:

1. **Exclusivity clause** — does Landal have exclusive booking rights for the resort? If yes, the app cannot accept direct accommodation bookings until renegotiated.
2. **Rate parity clause** — common in OTA agreements. If Landal requires that no other channel undercuts their pricing, dynamic pricing in the app is constrained.
3. **Customer data ownership** — who owns the guest contact details captured at booking? This determines whether the app can email past Landal-channel guests.
4. **Commission structure** — is commission charged on all bookings, or only ones Landal originates? This is the single biggest commercial variable.
5. **Term and termination** — notice period, break clauses, transition obligations.
6. **Brand and IP** — can the Whalesborough app use the "Landal Whalesborough Resort & Spa" name, or only "Whalesborough"? (Note: Landal markets the property as "Landal Whalesborough Resort & Spa"; the resort's own site uses just "Whalesborough" — there's a positioning conversation here.)
7. **Channel manager permissions** — does Landal permit the resort to operate a channel manager that includes Landal as one of many channels?
8. **Technology stipulations** — does the management agreement mandate or prohibit specific PMS vendors? (EliteParks is now the Landal-preferred PMS, which may help or hinder.)

**Recommendation:** Commission a 4-hour review by a hospitality-specialist solicitor (Bird & Bird, Wiggin, or DAC Beachcroft) before signing engineering commitments. Budget £2,500–4,000.

---

## 7. Cost Estimates for Integration Platform Fees

**Year 1 recurring (steady state, all systems live):**

| System | Monthly | Annual | Notes |
|---|---|---|---|
| Try.be (existing, no change) | TBC | £15–30k assumed | Already a sunk cost; API access likely free at Enterprise tier |
| EliteParks PMS | ~£800–1,500/mo | £10–18k | Microsoft Dynamics 365 base + EliteParks per-park licence |
| SevenRooms | ~£500–700/mo | £6–8.4k | Single venue |
| Channel manager (RentalsUnited or SiteMinder) Year 2+ | £150–300/mo | £2–3.6k | Only if Phase 3 fired |
| Resend / Postmark transactional email | £30/mo | £360 | Booking confirmations |
| Cloudflare + observability stack | £100/mo | £1.2k | App infra |
| **Total Year 1 platform fees** | | **~£32–50k** | Excluding Try.be sunk cost |
| **Total Year 2+ with channel manager** | | **~£35–55k** | |

**Integration build (one-off):**
- Try.be: £15–25k
- EliteParks: £30–50k
- SevenRooms: £6–9k
- Payments (Stripe Connect or similar): £8–12k
- Federated identity + membership orchestration: £40–60k
- **Total one-off integration work: £100–160k**

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Landal management contract contains exclusivity that blocks direct accommodation booking | **High** | **Critical** — collapses 80–91% of revenue from the app | Legal review Week 1. Plan B: app becomes discovery + spa/restaurant booking only; accommodation deep-links to Landal. |
| 2 | Try.be API rate limits / costs not viable at scale | Low | Medium | Confirm with Try.be CSM before integration kick-off. Architect with caching and webhook-driven invalidation. |
| 3 | DoorDash acquisition of SevenRooms changes pricing or roadmap | Medium | Medium | 12-month price lock in contract; data portability clause; have Tock as a fallback. |
| 4 | EliteParks integration is heavier than expected (Dynamics 365 has a learning curve) | Medium | Medium | Engage Elite Dynamics' professional services early. Budget £15k for vendor-led discovery. |
| 5 | Double-booking during inventory sync gaps | Medium | High (reputation) | Hold inventory in a single source-of-truth (EliteParks). App is read-through with optimistic locking. No dual writes. |
| 6 | Landal renegotiation fails | Medium | High (limits long-term margin upside) | The app still delivers on spa + restaurant + content + loyalty. Direct accommodation booking is upside, not the foundation. |
| 7 | Try.be deprecates the open API or restricts it | Low | Medium | OpenAPI spec is publicly published — strong commitment signal. Monitor changelog. Have Mangomint/Boulevard as theoretical fallbacks. |
| 8 | Membership state drifts between Try.be and SevenRooms | Medium | Medium | Single source of truth in the app's identity layer; both downstream systems are written to via the orchestration service. |
| 9 | UK GDPR / DUAA 2025 issues with cross-system data flow | Low | High | DPIA at project start. Standard Contractual Clauses or controller-processor agreements with each vendor. |
| 10 | SevenRooms doesn't support pre-paid event ticketing as richly as Tock | Low | Low | SevenRooms does ticket experiences; if a specific Weir use case needs Tock-grade pre-payment, layer Stripe Checkout directly. |

---

## 9. Action List — Next 14 Days

1. **Legal review** of UK Country Parks ↔ Landal management agreement (focus: exclusivity, rate parity, data ownership). Budget £3k.
2. **Request from Try.be:** SLA document, rate limits, API access pricing at current tier.
3. **Discovery call with Elite Dynamics** — quote for EliteParks deployment + API integration scope.
4. **Demo with SevenRooms** UK team — confirm event ticketing depth, API embed examples, 12-month price lock.
5. **Spike** a Try.be OAuth + appointment-create flow against the sandbox to de-risk the SSO design.
6. **Draft DPIA** scoping the four-system data flow (App ↔ Try.be ↔ EliteParks/Landal ↔ SevenRooms).
7. **Whalesborough/Landal brand conversation** — agree how the app refers to the resort.

---

## Sources

- [Trybe — Open API & Integrations page](https://try.be/api-integrations)
- [Trybe — main platform overview](https://try.be/)
- [Trybe — Developer Docs / SSO Guide](https://docs.try.be/guides/sso)
- [Trybe — About / customers](https://try.be/about)
- [Landal GreenParks UK Partners with Elite Dynamics](https://news.landal.com/landal-greenparks-uk-partners-with-elite-dynamics)
- [Elite Dynamics — Holiday Park Management Software](https://www.elite-parks.com/)
- [Elite Dynamics & Hoseasons Partnership (API connectivity precedent)](https://www.elite-dynamics.com/news/elite-dynamics-hoseasons-partnership/)
- [Awaze Completes Sale of Landal GreenParks to Roompot](https://www.awaze.com/blog/awaze-completes-sale-of-landal-greenparks-to-roompot/)
- [Roompot and Landal GreenParks combine](https://news.landal.com/roompot-and-landal-greenparks-to-combine-into-a-pan-european-organisation)
- [Landal Whalesborough Resort & Spa listing](https://www.landal.com/parks/whalesborough-resort)
- [Whalesborough Resort own site](https://www.whalesborough.co.uk/)
- [Landal GreenParks UK adds two new resorts (Whalesborough ownership context)](https://shorttermrentalz.com/news/landal-greenparks-uk-resorts-portfolio/)
- [SevenRooms — Restaurant API and Integrations](https://sevenrooms.com/platform/integrations-apis/)
- [SevenRooms — 2026 reservation systems comparison](https://sevenrooms.com/blog/restaurant-reservation-system-comparison-guide/)
- [Best Bar Booking Systems UK 2026 (VenueFounder)](https://venuefounder.co.uk/guides/best-bar-booking-systems-uk/)
- [DoorDash acquisition of SevenRooms (CNBC)](https://www.cnbc.com/2026/02/25/doordash-resy-opentable-restaurant-reservation-wars.html)
- [Best Spa Software 2026 (Zenoti comparison)](https://www.zenoti.com/thecheckin/best-spa-software-2026)
- [Lodgify — Channel Manager guide](https://www.lodgify.com/vacation-rental-channel-manager/)
- [RentalsUnited — UK serviced accommodation channel manager guide](https://rentalsunited.com/blog/serviced-accommodation-channel-manager/)
