# Whalesborough Farm Resort & Spa
# Premium Booking App & Website — Project Brief
## Budget: £500,000 | Target Launch: 2026

---

## 1. Executive Summary

Build a luxury booking platform for Whalesborough Farm Resort & Spa that unifies all revenue streams — holiday accommodation, The W Club Spa, The Weir Restaurant, and lodge sales — into a single, brand-owned digital experience. The platform replaces fragmented third-party systems with a cohesive "digital concierge" that matches the resort's ultra-luxury positioning and drives direct bookings.

**Current state:** 5+ disconnected systems (Landal booking, Try.be spa, walk-in restaurant, WordPress sales site, GoHighLevel CRM) with no unified guest experience and 80-91% of holiday revenue flowing through Landal's platform.

**Target state:** One premium platform that owns the guest relationship from discovery through post-stay loyalty, reducing OTA dependency, enabling cross-sell between accommodation/spa/restaurant, and providing a dedicated lodge sales funnel with CRM integration.

---

## 2. Business Context

### The Resort
- **Location:** 450-500 acres, Marhamchurch, Bude EX23 0JD, Cornwall
- **Accommodation:** 30+ bookable units (27 cottages + 22 Arvor Suites + Trelowen/Gwari spa lodges)
- **Rating:** 5-star Gold VisitEngland, NPS 83.3 (#1 in Cornwall), Feefo 4.5/5
- **2026 Budget:** £1,730,505 accommodation revenue
- **2025 Actuals:** £1,217,234 (57.9% occupancy, £190 ADR)
- **YoY Growth (2026):** +63% nights, +40% revenue as at May 2026

### Revenue Streams the App Must Handle
1. **Holiday accommodation booking** (£1.73M budget) — Currently via Landal (80-91%)
2. **The W Club Spa** — Treatments, spa days, packages — Currently via Try.be
3. **The Weir Restaurant** — Breakfast, lunch, events — Currently NO booking system
4. **Lodge sales** (£425k-£749k properties) — Currently via WordPress + manual CRM
5. **Activities & experiences** — Farm tours, fitness, fishing — Currently ad hoc

### Guest Profile
- Extended families 32%, Families 30%, Couples 24%, Friends 9%
- Ages: 35-44 (28%), 45-54 (25%), 55-64 (22%)
- 83% intend to revisit — massive loyalty opportunity
- Dog-friendliness is a key booking driver (23-46%)
- Mobile booking expected at 55-65% of traffic

### Key Competitive Advantage
**No competitor in Cornwall has a dedicated booking app.** This is first-mover territory.

---

## 3. Platform Architecture

### 3.1 Four Booking Engines

#### A. Accommodation Booking
- **Integration:** Landal API (if available) OR custom booking engine
- **30+ units** with individual availability calendars, pricing, and imagery
- Real-time availability, instant confirmation
- Length of stay optimization (7-night and 3-4 night short breaks dominate)
- Dynamic pricing by season (August £315 ADR peak, January £120 low)
- Guest count: Adults/Children/Babies/Pets
- Add-ons at booking: Welcome hampers, grocery boxes, activity pre-booking
- Multi-channel sync: Landal, Booking.com, Sykes, affiliate network (~100 channels)
- Payments: Stripe (Apple Pay 30%, Google Pay, Klarna BNPL)

#### B. Spa Booking
- **Integration:** Try.be API or replacement custom system
- Treatment menu as "Rituals" / "Journeys" (not services list)
- Spa day packages with tiered pricing
- Combined accommodation + spa upsell flow
- Pool/gym access management
- Gift voucher system

#### C. Restaurant Booking
- **NET NEW** — no existing system to integrate
- Table reservation for breakfast & lunch
- "Lakeside Locals" membership integration
- Event booking (Grill and Chill, seasonal events)
- Dietary preference capture
- Dog-friendly seating preference
- Walk-in waitlist management

#### D. Lodge Sales Funnel
- Property showcase: Tevi (£750k), Gwelva, Trelowen (£425k-£525k), Bespoke (from £399k)
- Virtual tours (Matterport/360°)
- Viewing day booking and RSVP
- Brochure request / download (gated lead capture)
- Investment calculator (rental income projections — with FCA-compliant disclaimers)
- CRM integration (GoHighLevel, Location ID: g2e4b5iug3792efDmkjr)
- Lead scoring and nurture automation
- Objection handling content (12 pre-built counterarguments available)

### 3.2 Guest Portal
- Unified login (guest account across all services)
- Booking management (view, modify, cancel)
- Digital check-in/check-out
- In-stay itinerary management
- Post-stay review collection
- Loyalty programme (leveraging 83% return intent)
- Saved preferences (dietary, accessibility, pet info)

### 3.3 Estate Navigator
- Interactive 3D map of 450-acre estate
- Walking distances and times between facilities
- Real-time facility status (pool temperature, restaurant availability)
- Activity scheduling and booking
- ANPR gate integration context

### 3.4 Admin Dashboard
- Multi-role access: Resort management, restaurant staff, spa staff, sales team
- Revenue reporting across all streams
- Occupancy management and yield optimization
- Guest CRM with cross-channel history
- Marketing campaign management
- Review monitoring and response

---

## 4. Design Direction

### 4.1 Approved Design System: "Coastal Editorial"
An existing, approved design system already exists from the Whalesborough Rebuild project. The new app MUST use this system.

**Creative North Star:** "The Digital Curator" — a luxury travel monograph, not a booking website.

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#703a1d` | CTAs, "Book Now" buttons ONLY |
| Secondary | `#4a6457` | Navigation, structural anchors |
| Background | `#fbf9f6` | Primary canvas (warm white) |
| Text | `#1b1c1a` | Body text (not pure black) |
| Text Secondary | `#424844` | Captions, secondary text |

**Typography:**
- Display/Hero: **Newsreader** (300-700 weight, -0.02em tracking)
- Headlines: **Newsreader Italic** (400 weight — "the romantic voice")
- Body: **Plus Jakarta Sans** (300-400, line-height 1.6-1.8)
- Labels: **Plus Jakarta Sans** (500-600, UPPERCASE, 0.05em tracking)

**Hard Rules:**
- **0px border radius everywhere** — sharp corners are editorial, rounded is app-like
- **No 1px borders** — separate content by background tone shifts only
- **No decorative shadows** — ultra-diffused sage-tinted shadows only for floating elements
- **Glassmorphism** sparingly: floating nav bars and photo captions only
- **No pre-ticked consent boxes**, no dark patterns on cookies
- **Forms:** Bottom-border only inputs, focus state transitions to cognac (#703a1d)

### 4.2 Design Principles (from Digital Manifesto)
- **Anti-SaaS Visual Language:** Editorial spatial logic, asymmetric grids, expansive negative space
- **Cinematic imagery:** Images "bleed" or fade in (never pop), low-velocity ease-out
- **Theatrical motion:** Slow, purposeful transitions. Parallax scroll for depth
- **Concierge UX:** Booking flow feels like interacting with a Guest Experience Maker
- **Spa menu as magazine:** Tactile, editorial layout with ritual-based organization
- **Cornish texture:** Subtle background textures evoking the landscape (salt air, damp earth)

### 4.3 Existing Design Briefs (reference material in Whalesborough Rebuild project)
1. `Whalesborough-Digital-Manifesto.md` — North star aesthetic vision
2. `Core-UI-Architecture-Brief.md` — Layout patterns, navigation, accessibility mandates
3. `Premium-Experience-Design-Brief.md` — Meta-luxury, eco-transparency, emotional UX
4. `Competitive-Edge-Design-Brief.md` — Feature parity and differentiation vs Center Parcs, The Newt, Landal
5. `UX-Booking-Flow-Design-Brief.md` — Golden path, CRO components, friction reduction
6. `Destination-Content-Design-Brief.md` — Local area guide, POI map, seasonal content
7. `Technical-SEO-Schema-Brief.md` — Schema markup, AI crawler optimization, structured data
8. `Geo-Personalisation-Local-SEO-Brief.md` — GBP nested departments, proximity nudges
9. `Security-and-Compliance-Brief-2026.md` — Existing compliance framework

---

## 5. Content Assets Available

### 5.1 Photography (163 URLs catalogued)
- **Interior photography:** 28 professional shots (Trelowen lodges — 8631961 series)
- **Exterior/Aerial:** DJI drone footage, Tevi aerial, estate overviews
- **Facilities:** Pool shoots (professional), restaurant/bar, spa
- **Farm/Activities:** Animal feeding, tractor rides, dogs
- **Local Area:** Summerleaze Beach, Widemouth Bay, Bude Canal, Tintagel
- **Marketing assets:** Social carousel posts, banner ads, video banner

### 5.2 Scraped Content (16 pages in Rebuild project)
Complete website copy already extracted and organized:
- Homepage, Navigation/Sitemap, Cottages (overview + individual), Arvor Suites, Arvor Packages
- Spa & Facilities, The Weir Restaurant, Holidays & Breaks
- Activities & Local Area, Dog-Friendly, Sustainability
- Awards & Accreditations, Contact, Holiday Home Investment, Landal Copy Reference

### 5.3 Sales Collateral
- Brochure (PDF, downloadable)
- 12 objection counterarguments (CSV — FHL tax, council tax, compliance, CGT, growth, tourism, affordability, stamp duty, occupancy, business rates)
- 110+ social media posts (professional, humorous, seasonal — from 3 content PDFs)
- Open weekend enquiry form structure
- Viewing day email templates

### 5.4 Brand Assets
- Logo files (3 variants: standard, favicon 150px, favicon 300px)
- OG social preview card
- Estate map image
- Whalesborough-featured.jpg/webp (multiple sizes)

### 5.5 CRM Data
- 52 qualified leads with budget, timeline, usage intent, priority score
- GoHighLevel CRM (Location ID: g2e4b5iug3792efDmkjr — 59% components MISSING per audit)

---

## 6. Technical Requirements

### 6.1 Performance
- Page load under 3 seconds
- Next-gen image formats (WebP/AVIF), lazy loading
- Mobile-first (65%+ expected traffic)
- PWA capable (Progressive Web App — winning over native for hospitality)
- Offline-capable for in-resort use (estate map, booking confirmations)

### 6.2 Integrations
| System | Purpose | Integration Type |
|--------|---------|-----------------|
| Landal GreenParks | Holiday accommodation booking | API (investigate availability) or redirect |
| Try.be | Spa booking | API integration or replacement |
| Stripe | Payment processing | Direct integration |
| Apple Pay / Google Pay | Mobile payments | Via Stripe |
| Klarna | BNPL (from Q2 2026) | Direct integration (FCA-regulated from 15 Jul 2026) |
| GoHighLevel | CRM for lodge sales | API integration |
| Booking.com | Channel distribution | Channel manager sync |
| Sykes | Channel distribution | Channel manager sync |
| Affiliate network (~100) | Distribution | Via Landal's affiliate platform |
| ANPR gate system | Contactless entry | Data integration for guest context |
| EV charging app | On-site EV | Deep link integration |
| Google Business Profile | Local SEO | Nested departments (Resort, Spa, Restaurant) |

### 6.3 Analytics & Tracking
- Privacy-preserving analytics (Plausible/Matomo preferred over GA4 — see DUAA compliance)
- Booking funnel conversion tracking
- Revenue attribution by channel
- Guest behaviour / journey mapping
- A/B testing framework for CRO
- Heatmaps for UX optimization

---

## 7. Compliance Requirements (Critical)

### 7.1 Immediate (From Launch)
- **UK GDPR / DPA 2018:** Privacy policy, data subject rights, retention schedule, international transfer safeguards
- **PECR Marketing:** Separate consent for email vs SMS; lodge sales marketing needs EXPLICIT consent (not soft opt-in)
- **Cookie Consent (post-DUAA):** Equal prominence Accept/Reject; analytics cookies may qualify for exemption if self-hosted
- **PCI DSS v4.0.1:** SAQ A if using Stripe tokenization; script inventory on payment pages; weekly integrity monitoring
- **WCAG 2.2 Level AA:** Keyboard navigation, 24x24px targets, 4.5:1 contrast, screen-reader compatible payments
- **Consumer Contracts Regs:** Pre-contract info, inform no cancellation right for specific-date bookings
- **Accessibility statement:** Published on site

### 7.2 Upcoming Deadlines
- **19 June 2026:** Formal data protection complaints procedure (DUAA requirement)
- **15 July 2026:** Klarna FCA regulation — BNPL promotions must comply with Consumer Duty
- **April 2026:** Short-term let registration — unique registration number on ALL listings (already in force)

### 7.3 HIGH RISK: Lodge Sales Financial Promotions
- **"8% Guaranteed Returns"** claims could constitute unregulated Collective Investment Scheme promotion (criminal offence under FSMA)
- ASA upheld complaints against similar claims (Luxury Lodge Estates)
- **MUST:** Get specialist FCA legal advice before any marketing
- **MUST:** Describe as lifestyle purchases with rental income potential, not investments
- **MUST:** Include risk warnings, disclose all fees/charges

### 7.4 Security Standards
- TLS 1.3 preferred, HSTS preload, strict CSP with nonce-based scripts
- OWASP Top 10:2025 mitigations (broken access control, injection, cryptographic failures)
- Rate limiting: Login 5/15min, API 100/min, Booking 10/hour, Payment 5/hour
- MFA for all admin access, 12-character password minimum
- Session: 128-bit entropy tokens, 30-min idle timeout, Secure+HttpOnly+SameSite cookies
- Network segmentation: Guest Wi-Fi isolated from POS and back-office

---

## 8. SEO & Marketing Requirements

### 8.1 Technical SEO
- Schema markup: LodgingBusiness, Accommodation, Product, TouristDestination, Restaurant, HealthAndBeautyBusiness
- Multi-typed entities per property tier
- AI crawler admission: GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- BLUF paragraphs on every property page (30-50 words for AI citation)
- Silo-hub URL convention for intent pages

### 8.2 Google Business Profile
- **Nested departments strategy:** Parent listing (Whalesborough Farm Resort & Spa), nested profiles for "The W Club Spa" and "The Weir Restaurant" with "Located in:" attribute
- Sync star ratings, amenities, sustainability practices
- Free booking links integration

### 8.3 Geo-Personalisation
- Distance-based proximity nudges (privacy-preserving, static)
- Persona-specific guest journeys: Multi-generational families, Conscious couples, Dog owners
- Seasonal content switching (Spring/Summer/Autumn/Winter)

---

## 9. Competitive Differentiation Features

### 9.1 "Beat Sheet" (from Competitive Edge Brief)
| Competitor Weakness | Our Solution |
|-------------------|--------------|
| Spatial confusion on large estates | Interactive 3D estate map with walking times |
| Greenwashing without data | Live sustainability dashboard (wind turbine, bee count, microplastic data) |
| Generic white-label booking engines | Brand-first transactional UI maintaining editorial aesthetic through payment |
| Under-served older kids (11-15) | "Regenerative Ranger" & "Wild Kids" activity modules |
| Disconnected wellness narrative | "Estate-to-Treatment" spa menu linking 450-acre farm botanicals to specific rituals |

### 9.2 First-Mover Opportunities
- **Only dedicated app in Cornwall lodge market** — no competitor has one
- **Restaurant booking** is NET NEW capability (currently walk-in only)
- **Cross-sell engine:** Accommodation → Spa → Restaurant upsell at booking
- **Loyalty programme:** 83% return intent with no existing loyalty mechanism
- **Guest planning portal:** Pre-booking grocery boxes, spa treatments, farm activities

---

## 10. Data Sources & Reference Files

### Research (in `research/` directory)
| File | Content |
|------|---------|
| `website-image-urls.md` | 163 catalogued image URLs by category |
| `site-structure.md` | Current sales website analysis (navigation, funnels, design system, tech stack) |
| `landal-booking-structure.md` | Landal platform analysis (widget structure, URL patterns, CDN) |
| `uk-compliance-security.md` | Complete UK compliance requirements with deadlines |
| `cornwall-market-research.md` | Competitive landscape, tourism data, technology trends |
| `operational-data-may2026.md` | Full revenue, occupancy, unit performance, booking patterns |

### Existing Design Work (in `Whalesborough Rebuild/` directory)
| File | Content |
|------|---------|
| 9 design briefs | Complete UX/UI, SEO, compliance, competitive, destination, geo briefs |
| `design-system/DESIGN-SYSTEM-REFERENCE.md` | Approved Coastal Editorial design system |
| `scraped-content/00-MASTER-BRAND-FACTS.md` | Definitive brand reference |
| 16 scraped content pages | Complete Landal site copy organized by section |

### Client Files (read in previous session)
- Sales objection handling CSV (12 counterarguments)
- Monthly 2026 booking data CSV
- 52 qualified leads CSV (Facebook/Instagram with budget/timeline)
- 3 social content PDFs (110+ posts)
- Open weekend enquiry form structure
- Viewing day email templates
- Full website screenshot PDF
- GHL comprehensive audit
- Landal leadership meeting PDFs (Feb & Mar 2026)
- Trelowen FAQ PDF
- SWOT competitors PDF

---

## 11. Outstanding Actions Before Build

### Must Do
1. **Investigate Landal API access** — can we get real-time availability/booking API? This determines whether accommodation booking is custom-built or API-integrated
2. **Investigate Try.be API** — can we integrate spa booking or do we build a replacement?
3. **FCA legal counsel for lodge sales marketing** — "8% guaranteed returns" claims need specialist review before ANY marketing goes live
4. **Register all units under Short-Term Let Registration Scheme** — mandatory from April 2026
5. **Complete GoHighLevel CRM build** — 59% of components still missing
6. **Commission professional photography** — current assets are adequate but not premium enough for £500k platform (especially restaurant, spa treatments, individual cottage interiors)

### Should Do
7. **User testing with guest segments** — validate booking flow assumptions with actual families, couples, dog owners
8. **Matterport/360° virtual tours** — commission for all cottage types and Arvor Suites
9. **Video content** — drone footage, property walkthroughs, farm experience, spa rituals
10. **Accessibility audit of existing content** — ensure all PDFs, images, video have accessible alternatives

### Nice to Have
11. **AI concierge chatbot** — trained on resort knowledge base for instant guest support
12. **Live sustainability dashboard** — real-time data from wind turbine, microplastic filters
13. **Digital "Estate Shop"** — e-commerce for Whalesborough-made products (honey, botanicals, gin)
14. **Open Banking / VRP** — emerging payment framework for subscription/loyalty models

---

## 12. Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Direct booking % | 9-20% (rest via Landal/OTAs) | 40%+ |
| Booking abandonment | Industry avg 81.7% | Below 60% |
| Spa cross-sell at accommodation booking | 0% (separate systems) | 15-25% |
| Restaurant reservations | 0 (walk-in only) | 80% of covers pre-booked |
| Lodge enquiry conversion | Unknown | Track and optimize |
| Mobile booking share | Unknown | 65%+ |
| Page load speed | N/A (new build) | Under 3 seconds |
| WCAG compliance | Non-existent | Level AA |
| Guest satisfaction (digital) | N/A | NPS 80+ |

---

*Brief compiled: 14 May 2026*
*Prepared by: Peake Management for Whalesborough Farm Resort & Spa*
*All research files, design briefs, and source material available in project directory*
