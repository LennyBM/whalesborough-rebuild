---
name: Briefing doc insights
description: Synthesized best ideas from 9 NotebookLM briefing documents — design, UX, SEO, content, competitive strategy
type: project
---

## Visual Identity & Design Language

- "Anti-SaaS" principle — asymmetric editorial layouts, no bento boxes, no rigid grids. Feels like a curated gallery or high-end travel magazine
- Cinematic pacing — scrolling like a travel documentary. Images bleed/fade in, never pop in. Ease-out curves, slow and smooth
- Scroll parallax + depth — elements move at different speeds to simulate estate grandeur
- Color grading photography to evoke Cornwall: salt air, damp earth, fresh grass. Color should "do the smelling"
- Earthy Cornish palette driven by natural materials (already aligned with Coastal Editorial)
- Serif headers (Old World authority) + clean sans-serif body — already matched by Newsreader + Plus Jakarta Sans

**Why:** Benchmarked against Aman Resorts, Mandarin Oriental, Six Senses. Must move beyond "spectacle-driven" toward "experience-driven restraint."
**How to apply:** Every page should feel like a page-turn in Condé Nast Traveller, not a software product.

---

## Homepage Must-Haves

- Ambient "circadian rhythm" video — estate alive at different times of day (dawn mist, afternoon farm, evening spa). Establishes "working estate" identity not holiday park
- Seasonal Vibe Switcher module — Spring (wildflowers), Summer (festivals), Autumn (food/surf), Winter (storms/fires)
- UX hierarchy: Aspiration → Rooms → Amenities → Social Proof → Book CTA (never sales-first)
- 500-acre interactive estate map as centrepiece — bird's-eye, filterable by Quiet / Farm / Spa / Trails. Solves arrival disorientation
- Search/availability bar integrated into or immediately below hero
- Lead magnet lower on page — AI Itinerary Planner or destination guide to capture non-ready visitors
- Full availability calendar embedded toward bottom of homepage for re-engagement

---

## Navigation

- Opens on click (not hover) — ADA/WCAG requirement
- Mega-menu with grouped, descriptive labels OR "Immersive Discovery" full-screen reveal with slow video background
- Categories by experience type: "A Massage for One", "A Dinner for Two", "Bring the Pack" — not just Rooms/Spa/Restaurant
- Sticky header — Book Now always visible on scroll

---

## Booking Flow ("Golden Path")

- Search bar in/under hero → Room/add-on selection → Frictionless checkout → Confirmation
- All-in transparent pricing from first result (cleaning fees, taxes, amenity access)
- OTA price comparison widget on room pages — show why booking direct is cheaper
- Guest checkout mandatory — no forced account creation
- Apple Pay / Google Pay / PayPal integration
- Progress indicator (visual breadcrumb) during checkout
- Exit-intent pop-up on abandonment — offer 10% off or free breakfast
- WhatsApp floating button for instant mobile contact
- Upsell step: spa treatments, farm tours, local experiences as natural add-ons during booking

---

## Key Competitive Differentiators

Whalesborough's unique angles vs St Moritz, Center Parcs, Carbis Bay:

1. **Live Sustainability Dashboard** — real data: energy output, rewilding progress, biodiversity audit results. Not vague "greenwashing" claims
2. **"Estate-to-Treatment" spa menu** — botanicals harvested from the 500 acres used in specific rituals. Unique causal link between farm and spa
3. **"Regenerative Ranger" / "Wild Kids" modules** — dedicated content for kids aged 11–15 (underserved by competitors who focus on toddlers)
4. **Interactive 3D estate map** — walking times, mobile turn-by-turn, parking zones. Solves the large-estate disorientation problem
5. **Brand-first booking flow** — emotional narrative maintained all the way through payment (competitors use clunky white-label engines)

---

## High-Value Content Modules to Build

- **Dog-friendly hub** — filter presets, Pooch Welcome Pack info, dog shower images, year-round vs seasonal beach restrictions
- **Local area interactive map** — branded pins, POI side panel with distance/tide times/dog rules, filterable by activity type / rainy day / dining / accessibility
- **Estate shop / guest planning portal** — post-booking interface: veg boxes, grocery packs, spa pre-booking, "Whalesborough Made" products (honey, botanical oils, gin)
- **Spa menu as digital magazine** — treatments as "Rituals" or "Journeys", hand-drawn locally-inspired illustrations, editorial layout
- **Multi-generational group landing pages** — "Conscious Couples", "Families with Babies", "Large Group Gatherings", "Dog Holidays"
- **Arvor Suites packages** — hero experiences with champagne arrival, panoramic dining, curated stays

---

## SEO & Technical Structure

Four content silos (hub-and-spoke internal linking):
1. `/dog-friendly-cornwall/` — dominate pet-friendly Cornwall travel searches
2. `/sustainable-luxury/` — own green luxury + regenerative tourism
3. `/spa-wellness/` — longevity, biohacking, thermal retreats
4. `/cornish-farm-holidays/` — multi-gen family + paddock-to-plate dining

Per-cottage SEO:
- Treat each of the 27 cottages as a unique entity with VacationRental + Accommodation + Product schema
- BLUF (Bottom Line Up Front) paragraph on every cottage page for AI search extractability
- Allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended in robots.txt

Image format: AVIF (better than WebP). Explicit width/height on every image to prevent CLS.
Core Web Vitals targets: LCP < 2.0s, INP < 150ms, CLS < 0.10, TTFB < 800ms

---

## Smart Personalisation (Phase 2)

- Proximity nudge for nearby visitors: "You're only 90 mins away — come up this weekend"
- Returning visitor adaptation — hero and CTAs adapt based on previous browsing
- Google Business Profile nested departments: separate GBP listings for "The W Club Spa" and "The Weir Restaurant" nested under main resort listing
- Real-time GBP booking link integration so pricing on Google is accurate and direct

---

## What to Deprioritise

- Heavy backend security (PCI-DSS, WAF, ZTA) — mostly relevant if building a custom booking engine. If using Supercontrol/Freetobook etc, their responsibility
- Full geo-IP personalisation engine — complex and Phase 3+ territory
- Voice UI / spatial AI features — future consideration, not Day 1
