# Technical SEO & Schema Development Brief: Whalesborough Resort & Spa

This briefing document outlines the technical requirements, structured data protocols, and architectural standards required for the Whalesborough Resort website to achieve market dominance in the 2026 hospitality landscape. This strategy prioritises Interaction to Next Paint (INP) responsiveness, multi-typed entity schema, and topical silos to align with Google's March 2026 Core Update and the rise of AI-driven search discovery.

---

## 1. Performance Mandates

The March 2026 Core Update has codified Interaction to Next Paint (INP) as a primary ranking signal and tightened the threshold for Largest Contentful Paint (LCP). Development must adhere to the following "Good" thresholds based on the 75th percentile of real-user field data.

### Core Web Vitals (CWV) Targets

| Metric | "Good" Threshold | Dev Requirement |
|---|---|---|
| INP (Interaction to Next Paint) | < 150ms | Hard requirement for ranking stability. |
| LCP (Largest Contentful Paint) | < 2.0s | Tightened from 2.5s; critical for luxury query clusters. |
| CLS (Cumulative Layout Shift) | < 0.10 | Zero tolerance for layout jumps during asset loading. |
| TTFB (Time to First Byte) | < 800ms | Essential for supporting < 2.0s LCP. |
| FCP (First Contentful Paint) | < 1.8s | Perceived speed requirement for high-intent users. |

### Asset Loading & Rendering Rules

- **DOM Node Management:**
  - Total Nodes: Limit to < 1,500 per page to reduce rendering engine workload.
  - Maximum Depth: Limit to < 32 levels.
  - Max Child Nodes: No more than 60 child nodes for any single parent.
- **Image Optimisation:**
  - Standardise on AVIF for all photography (offers 20–30% better compression than WebP).
  - Implement `fetchpriority="high"` for the primary LCP element (e.g., cottage hero images).
  - Use `decoding="async"` for all below-the-fold imagery.
  - Set explicit `width` and `height` attributes to prevent CLS.
- **JavaScript & CSS Execution:**
  - Initial JS Load: < 150KB (gzipped).
  - Initial CSS Load: < 50KB (gzipped).
  - Main Thread Optimisation: Use `scheduler.yield()` or `scheduler.postTask()` within long event handlers to prevent blocking interactions.
  - Critical CSS: Inline the CSS required for top-of-page content directly into the HTML `<head>`.
- **Architecture:** Use global CDN delivery with Incremental Static Regeneration (ISR) to serve static-speed pages while dynamically updating availability for cottages like the Arvor Suites.

---

## 2. Schema Implementation Map

In 2026, search engines act as "answer engines." Structured data must be implemented to define Whalesborough as a "Technical Entity" for AI agents (Google Gemini, ChatGPT, Perplexity).

### Core Entity Assignments

| Schema Type | Target Page(s) | Key Properties & Context |
|---|---|---|
| Resort | Homepage | name, description, amenityFeature (Pool, Spa, Farm), petsAllowed, starRating. |
| LocalBusiness | Site-wide (Footer) | address, telephone, GeoCoordinates, openingHours, priceRange. |
| Accommodation + Product | Individual Cottage Pages | Use Multi-Typed Entities (MTE). Include occupancy (QuantitativeValue), amenityFeature (Hot Tub, Sonos), and petsAllowed. |
| Restaurant | /the-weir | servesCuisine, hasMenu, acceptsReservations, parentOrganization. |
| HealthAndBeautyBusiness | /spa | amenityFeature (Sauna, Gym, Pool), publicAccess (False). |
| FAQPage | /faqs | mainEntity (Question/Answer pairs regarding check-in, dogs, and EV charging). |
| TouristDestination | Regional Pages | Link to local landmarks (Bude, Widemouth Bay, South West Coast Path). |

### Implementation Specifics for Cottages

Each of the 27 cottages must be treated as a unique offer:

- **Product Schema:** Enables inclusion in organic product carousels and Google Travel.
- **ContainedInPlace:** Use this property to link each unit back to the main Whalesborough Resort entity to establish a clear hierarchy.
- **VacationRental:** Use this type specifically to capture search intent for self-catering stays in North Cornwall.

---

## 3. URL & Silo Architecture

The site must be organised into distinct content silos to establish topical authority for Cornwall and Bude tourism. A "Hub and Spoke" model should be used for internal linking.

### Topical Silo Structure

| Silo Hub (URL) | Spoke Pages (Supporting Content) | Topical Authority Goal |
|---|---|---|
| /dog-friendly-cornwall/ | /local-walks/, /beaches-bude/, /features/ (Dog Showers). | Pet-friendly travel dominance; guilt-free dog holidays. |
| /sustainable-luxury/ | /ev-charging/, /microplastic-protection/, /rewilding-cornwall/. | "Green Luxury" and Regenerative Tourism authority. |
| /spa-wellness/ | /treatments/, /fitness-gym/, /arvor-suites/. | Longevity, biohacking wellness, and thermal retreats. |
| /cornish-farm-holidays/ | /little-farmers/, /large-cottages/, /weir-bistro/. | Multi-generational family travel and "Paddock to Plate" dining. |

### Internal Linking & AI Readiness

- **Internal Linking Rules:** All Spoke pages must link back to their respective Hub using descriptive anchor text. Cross-silo linking should be used where relevant (e.g., dog-friendly walks linking to the Weir Bistro).
- **Machine-Extractable Content:**
  - Implement a BLUF (Bottom Line Up Front) paragraph for every cottage.
  - Maintain a strict H1–H3 heading hierarchy.
  - Use tables for comparative data (e.g., cottage amenities).
- **Robots.txt Protocol:** Ensure the file does not block AI crawlers essential for 2026 discovery: GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.

### URL Standards

- **Structure:** Short, descriptive, and lowercase (e.g., `/dog-friendly-cornwall/beaches-bude/`).
- **Breadcrumbs:** Implement Home > Silo Hub > Current Page to improve user navigation and search engine crawl paths.
