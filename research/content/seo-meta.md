# Whalesborough Farm Resort & Spa — Complete SEO Metadata & Schema Specification

**Project:** Whalesborough Farm Resort & Spa booking app & marketing website
**Domain:** `https://whalesborough.com`
**Language:** en-GB (default), future-ready hreflang scaffold for en-US, fr-FR, de-DE, nl-NL
**Date:** 14 May 2026
**Author:** Peake Management — for engineer hand-off to Next.js build team
**Compendium files:**
- `seo-meta.md` (this file) — long-form per-route metadata, BLUF reasoning, brand-voice copy
- `seo-json-ld-templates.json` — parameterised JSON-LD payloads ready to drop into `<Script type="application/ld+json">`
- `seo-route-index.json` (optional follow-up) — flat per-route → template mapping

---

## 0. Engineer reading order (5-minute orientation)

If you're the engineer wiring this into Next.js, read in this order.

1. Section 1 — Brand-voice & metadata grammar (so titles/descriptions feel like one site, not 107 sites).
2. Section 2 — Domain-wide defaults (root layout `Metadata` + the shared JSON-LD graph nodes that every page references via `@id`).
3. Section 3 — Implementation patterns in Next.js App Router (`generateMetadata`, `<Script id="ld-json" type="application/ld+json">`).
4. Sections 4–11 — One section per top-level silo. Each route has Title / Description / OG / Twitter / Canonical / Robots / JSON-LD template reference.
5. Section 12 — `robots.txt`, sitemap segmentation, hreflang strategy, IndexNow.
6. Section 13 — Validation checklist (Schema Markup Validator, Rich Results Test, axe DevTools head audit).
7. Appendix A — Persona/size facet pages and how to write canonical-to-parent.
8. Appendix B — FCA-compliant copy rules for the `/own` silo (do not skip — criminal liability under FSMA if breached).

---

## 1. Brand-voice & metadata grammar

Whalesborough's voice is **Coastal Editorial** — restrained, considered, sensory-led, never breathless. This needs to carry through into the 60-character title slot and the 155-character description slot, where most agencies switch to keyword soup. We do not.

### 1.1 Title grammar

Use the **em-dash separator** (`—`, not `-` or `|`) and these four formulas, in priority order. Em-dash is the editorial separator; pipe is for SaaS.

| Formula | When | Example |
|---|---|---|
| `{Page} — Whalesborough Farm Resort & Spa` | Default; almost every page | `Whalesborough Farmhouse — Whalesborough Farm Resort & Spa` |
| `{Page} — {Subline} — Whalesborough` | When subline adds a meaningful filter | `Spa cottages, hot tubs, dog-friendly — Whalesborough` |
| `{Page} — Whalesborough, Bude Cornwall` | Local-intent pages where Bude/Cornwall is the search-volume anchor | `Dog-friendly cottages — Whalesborough, Bude Cornwall` |
| `{Page} — Whalesborough` | Homepage and a handful of high-recognition pages | `Whalesborough Farm Resort & Spa — Five-star gold above Widemouth Bay` |

### 1.2 Title rules

- **≤60 characters** including the brand suffix. (Pixel-truncation safety net.)
- **Never two of the same noun phrase.** Each page's primary noun is unique.
- **Use the property name as the noun**, not a category. `Whalesborough Farmhouse` outranks `8-Bedroom Holiday Cottage Cornwall` in our context because we hold the brand-defended phrase.
- **Capitalise as a sentence**, not as Title Case. Editorial — not SaaS marketing.
- **Avoid keyword stuffing.** "Cornwall holidays · dog friendly cottages · spa breaks" reads as low-trust and is one of the May 2026 ranking dampeners.

### 1.3 Description grammar (BLUF — Bottom Line Up Front)

The 155-character description has three jobs in 2026: SERP click-through, AI citation (Perplexity, ChatGPT, Google AI Overviews), and the social-share preview line. We write it once, well, and let it work in all three.

| Element | Rule |
|---|---|
| Length | 140–155 characters. Pixel-truncation kicks in around 920px; 155 chars in en-GB is the safe ceiling. |
| Opening | Action verb or hard fact. "Sleep eight in a 14th-century farmhouse" not "Welcome to". |
| Middle | One concrete differentiator. Hot tub, sleeps, dogs, distance to coast — never adjective-only. |
| End | Trust marker or destination. "Five-star gold", "above Widemouth Bay", "from £190 a night". |
| Forbidden words | "Welcome", "experience", "discover", "unique" (banned editorial blandness). |

### 1.4 Open Graph & Twitter

- **OG title** can be up to 70 characters and is allowed to be slightly more emotive than the SEO title. It often differs.
- **OG description** can be 200 characters and is allowed to be more sensory.
- **OG image** is always 1200×630 px, AVIF with a JPG fallback, hero of the page, with the property name set in Newsreader at 64pt over a 40%-darkened lower-third.
- **Twitter card** is `summary_large_image` for every page; handle is `@whalesborough`.

### 1.5 Robots & canonical

- Public marketing pages: `index, follow`.
- Booking-flow steps, account, owners portal, partner portal, brochure-token URLs: `noindex, follow` (we want crawl-equity to flow back out, we don't want the page itself in the SERP).
- Persona / size / sort facet pages: `index, follow` for the canonical persona pages where we add unique editorial copy; `index, follow` with **canonical pointing to parent** when the page is purely filtered.
- Cross-domain canonical for any duplicate content syndicated to `landal.co.uk`: self-canonical on whalesborough.com, signed/hreflang-paired with the Landal page.

---

## 2. Domain-wide defaults (root `<head>`)

These go in `app/layout.tsx` `metadata` export and a single shared JSON-LD graph emitted on every page.

### 2.1 Static head tags

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#fbf9f6" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#1b1c1a" media="(prefers-color-scheme: dark)" />
<meta name="format-detection" content="telephone=yes, address=no, email=no" />
<meta name="color-scheme" content="light dark" />
<meta name="application-name" content="Whalesborough" />
<meta name="apple-mobile-web-app-title" content="Whalesborough" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
<meta name="generator" content="" />  <!-- intentionally empty -->
<link rel="icon" type="image/svg+xml" href="/brand/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/brand/icon-192.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png" />
<link rel="mask-icon" href="/brand/safari-pinned-tab.svg" color="#703a1d" />
<link rel="manifest" href="/manifest.webmanifest" />
<link rel="preconnect" href="https://cdn.whalesborough.com" crossorigin />
<link rel="preconnect" href="https://js.stripe.com" />
<link rel="dns-prefetch" href="https://images.landal.com" />
```

### 2.2 Shared JSON-LD graph (every page emits this once)

The `@graph` array contains the three persistent entities: **Organization, WebSite, Resort**. Every page-specific block then references these via `@id` instead of duplicating them. This is how you keep the JSON-LD payload under 8KB per page even when the entity itself runs to 4KB.

```jsonld
{
  "@context": "https://schema.org",
  "@graph": [
    { "@id": "https://whalesborough.com/#organization", "...": "see seo-json-ld-templates.json → shared.organization" },
    { "@id": "https://whalesborough.com/#website",      "...": "see seo-json-ld-templates.json → shared.website_with_searchaction" },
    { "@id": "https://whalesborough.com/#resort",       "...": "see seo-json-ld-templates.json → homepage.resort" }
  ]
}
```

The page-specific JSON-LD then references these:

```jsonld
{
  "@type": "Accommodation",
  "@id": "https://whalesborough.com/stay/cottages/whalesborough-farmhouse#accommodation",
  "name": "Whalesborough Farmhouse",
  "containedInPlace": { "@id": "https://whalesborough.com/#resort" },
  "brand": { "@id": "https://whalesborough.com/#organization" }
}
```

Resulting in a tight, deduplicated graph that validates cleanly against Schema Markup Validator and passes the Google Rich Results Test.

---

## 3. Next.js App Router implementation pattern

Below is the canonical pattern for a single cottage page. Replicate this shape across every dynamic route — accommodation, treatment, event, lodge plot, journal post, POI.

```typescript
// app/stay/cottages/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getCottage } from "@/lib/cms";
import { resortGraph, breadcrumbFor, cottageJsonLd } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const cottage = await getCottage(params.slug);
  if (!cottage) return { title: "Page not found — Whalesborough" };

  const title = `${cottage.name} — Whalesborough Farm Resort & Spa`;
  const description = cottage.metaDescription; // 140-155 chars, hand-edited per cottage
  const url = `https://whalesborough.com/stay/cottages/${cottage.slug}`;
  const ogImage = cottage.heroImage1200x630;

  return {
    title: title.length > 60 ? `${cottage.name} — Whalesborough` : title,
    description,
    alternates: {
      canonical: url,
      languages: { "en-GB": url, "x-default": url }
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: "Whalesborough Farm Resort & Spa",
      title: cottage.ogTitle ?? title,
      description: cottage.ogDescription ?? description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: cottage.heroAlt }]
    },
    twitter: {
      card: "summary_large_image",
      site: "@whalesborough",
      creator: "@whalesborough",
      title: cottage.twitterTitle ?? cottage.name,
      description: cottage.twitterDescription ?? description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
    },
    other: {
      "format-detection": "telephone=yes"
    }
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const cottage = await getCottage(params.slug);
  if (!cottage) notFound();

  return (
    <>
      <Script
        id="ld-graph"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              ...resortGraph(),                                            // shared
              breadcrumbFor("stay/cottages", cottage.name, cottage.slug),  // shared
              cottageJsonLd(cottage)                                       // page-specific
            ]
          })
        }}
      />
      {/* page body */}
    </>
  );
}
```

Apply the same skeleton to:
- `/stay/arvor-suites/[slug]` → `arvorJsonLd`
- `/spa/treatments/[slug]` → `treatmentJsonLd` (MTE: Service + Product)
- `/dine/events/[slug]` → `eventJsonLd`
- `/own/lodges/[range]/[slug]` → `realEstateListingJsonLd`
- `/estate/walks/[slug]` → `trailJsonLd`
- `/estate/local-area/[slug]` → `poiJsonLd`
- `/journal/[slug]` → `articleJsonLd`

---

## 4. Root & marketing pages

### 4.1 `/` — Homepage

| Slot | Value |
|---|---|
| `<title>` | `Whalesborough Farm Resort & Spa — Five-star gold above Bude` (60 chars) |
| Description | `A 450-acre working Cornish farm and spa above Widemouth Bay. 27 cottages, 22 Arvor Suites, dog-friendly throughout. Five-star gold.` (140 chars) |
| OG title | `Whalesborough — five hundred acres of Cornish coast, kept slow.` |
| OG description | `A working farm, a spa, a restaurant and 27 cottages on the cliffs above Bude — held together by one quiet idea: stay longer, do less.` |
| OG image | `/og/homepage-aerial-1200x630.jpg` |
| Twitter card | `summary_large_image` |
| Canonical | `https://whalesborough.com` |
| Robots | `index, follow` |
| hreflang | `en-GB → /`, `x-default → /` |
| JSON-LD | `shared.organization` + `shared.website_with_searchaction` (WebSite + SearchAction + ReserveAction) + `homepage.resort` |

The homepage is the only page where we emit the **Resort/LodgingBusiness** node in full (3.5KB). Every other page references it via `@id`.

### 4.2 `/about`

| Slot | Value |
|---|---|
| Title | `About Whalesborough — the family, the farm, the estate — Whalesborough` (truncated to `About Whalesborough — Whalesborough Farm Resort & Spa`) |
| Description | `Whalesborough has been a working Cornish farm for forty years. Today: a spa, a kitchen, 27 cottages and a 60kW wind turbine.` |
| JSON-LD | `WebPage` referencing `#organization` and `#resort` |
| Canonical | `/about` |

### 4.3 `/about/history`

| Slot | Value |
|---|---|
| Title | `Our history — Whalesborough Farm Resort & Spa` |
| Description | `From a working Cornish farm to a five-star gold resort. The Whalesborough story across four decades — and what we kept.` |
| JSON-LD | `AboutPage` |

### 4.4 `/about/team`

| Slot | Value |
|---|---|
| Title | `The team — Whalesborough Farm Resort & Spa` |
| Description | `The people behind the resort, the spa, the kitchen and the farm. Founders, head chef, spa director, head gardener, herd manager.` |
| JSON-LD | `AboutPage` containing `Person` array of named team members with `worksFor` → `#organization` |

### 4.5 `/about/awards`

| Slot | Value |
|---|---|
| Title | `Awards & accreditations — Whalesborough` |
| Description | `Five-star gold from VisitEngland. #1 NPS resort in Cornwall (83.3). Feefo 4.5/5 from 847 verified guest reviews.` |
| JSON-LD | `WebPage` + nested `Rating` references |

### 4.6 `/about/press`

| Slot | Value |
|---|---|
| Title | `Press & media — Whalesborough` |
| Description | `Press kit, brand assets and recent coverage. For all media enquiries please contact press@whalesborough.com.` |
| JSON-LD | `WebPage` |

### 4.7 `/contact`

| Slot | Value |
|---|---|
| Title | `Contact us — Whalesborough Farm Resort & Spa` |
| Description | `Reservations, spa, lodge sales and general enquiries. Telephone 01288 361301 or email stay@whalesborough.com.` |
| JSON-LD | `ContactPage` with the `Organization`'s `contactPoint` array (reservations, spa, sales, press) |

### 4.8 `/contact/finding-us`

| Slot | Value |
|---|---|
| Title | `Finding us — Whalesborough, Bude EX23 0JD` |
| Description | `Marhamchurch, three miles south of Bude on the A39. Three hours from Bristol, four from Birmingham, five from London.` |
| JSON-LD | `WebPage` + `Place` with `geo` and `address` |

### 4.9 `/contact/arrival`

| Slot | Value |
|---|---|
| Title | `Your arrival — Whalesborough Farm Resort & Spa` |
| Description | `Check-in from 4pm. ANPR gate access. Welcome hamper on the kitchen counter. Pool open until 8pm on the day you arrive.` |
| JSON-LD | `WebPage` |

---

## 5. Sustainability silo (`/about/sustainability` + 8 spokes)

### 5.1 `/about/sustainability` — Hub

| Slot | Value |
|---|---|
| Title | `Sustainability — Whalesborough Farm Resort & Spa` |
| Description | `A 60kW wind turbine, 50 rewilded acres, a kitchen garden that feeds The Weir. Our published carbon footprint and yearly progress.` |
| OG image | `/og/sustainability-1200x630.jpg` |
| JSON-LD | `WebPage` + `Dataset` (for the carbon footprint dataset, with `distribution` pointing to a CSV or JSON-LD download) |
| Canonical | `/about/sustainability` |

### 5.2 Spoke pages (8)

Each spoke uses the same pattern. Title formula: `{Initiative} — Sustainability — Whalesborough`.

| Slug | Title | Description |
|---|---|---|
| `/about/sustainability/wind-turbine` | `Our 60kW wind turbine — Whalesborough` | `Our 60kW Endurance turbine generates most of the estate's electricity. Live output, capacity factor, and what it powers each year.` |
| `/about/sustainability/rewilding` | `Fifty rewilded acres — Whalesborough` | `Fifty acres returned to wild planting since 2019. Native hedgerows, scrubland, beetle banks. The bird and pollinator counts each season.` |
| `/about/sustainability/kitchen-garden` | `The kitchen garden — Whalesborough` | `A walled kitchen garden behind The Weir. Heritage tomatoes, herbs, edible flowers — feeding the restaurant for most of the year.` |
| `/about/sustainability/ev-charging` | `EV charging — Whalesborough` | `Twelve EV charging points across the estate. 7kW and 22kW units. Free for guests during their stay, app-based authentication.` |
| `/about/sustainability/microplastics` | `Microplastic protection — Whalesborough` | `Microplastic filtration on every cottage washing machine drain. Coastal salt-water testing every quarter. Published data.` |
| `/about/sustainability/bees-and-pollinators` | `Bees & pollinators — Whalesborough` | `Eight hives, three forager corridors, no pesticides on the estate. Annual bee count and the pollinator-meadow restoration plan.` |
| `/about/sustainability/water-and-waste` | `Water & waste — Whalesborough` | `Rainwater capture, grey-water reuse, on-site composting. Single-use plastic eliminated from every cottage welcome pack.` |
| `/about/sustainability/carbon-footprint` | `Our carbon footprint — Whalesborough` | `Scope 1, 2 and 3 emissions, published yearly. Methodology, what we measure, what we're cutting, and where we're not yet.` |

JSON-LD: `WebPage` for each spoke. The carbon footprint page additionally emits a `Dataset` block.

---

## 6. Stay silo (`/stay/*` — 60+ routes)

This is the biggest silo. Schema strategy:
- **`/stay` hub** → `LodgingBusiness` referencing `#resort`.
- **`/stay/cottages` collection** → `CollectionPage` + `ItemList` of 27 cottages.
- **`/stay/cottages/[slug]`** → Multi-Typed Entity (MTE): `Accommodation` + `Product` + `VacationRental` in a `@graph`.
- **Persona & size facet pages** → `CollectionPage` with canonical-to-parent unless the page has unique editorial copy.

### 6.1 `/stay` — Hub

| Slot | Value |
|---|---|
| Title | `Stay — Whalesborough Farm Resort & Spa` |
| Description | `Twenty-seven cottages, twenty-two Arvor Suites and two spa lodges on a 450-acre working Cornish farm. Five-star gold, dog-friendly.` |
| OG image | `/og/stay-1200x630.jpg` |
| JSON-LD | `LodgingBusiness` referencing `#resort` + `BreadcrumbList` |
| Canonical | `/stay` |

### 6.2 `/stay/cottages` — Collection

| Slot | Value |
|---|---|
| Title | `Cottages & lodges — Whalesborough Farm Resort & Spa` |
| Description | `Twenty-seven cottages across 450 acres. Sleeps 2 to 10, hot tubs, woodburners. Dog-friendly. From £130 a night.` |
| OG image | `/og/cottages-collection-1200x630.jpg` |
| JSON-LD | `CollectionPage` + `ItemList` of 27 cottages |
| Canonical | `/stay/cottages` |

### 6.3 `/stay/cottages/by-size/sleeps-N` — 8 facet pages

These are facet pages that **do not** outrank the parent collection page on intent. Strategy:

- Page is indexable but `<link rel="canonical">` points to the parent `/stay/cottages` unless the page has at least 250 words of unique editorial (then it gets self-canonical and `index, follow`).
- For sleeps-2, sleeps-4, sleeps-6, sleeps-8, sleeps-10 — write unique editorial introductions (Cornwall has high search intent at these sizes) — self-canonical.
- For sleeps-3, sleeps-5, sleeps-7, sleeps-9 — no unique editorial — canonical to parent.

| Slug | Title | Description | Canonical |
|---|---|---|---|
| `sleeps-2` | `Cottages for two — Whalesborough, Cornwall` | `Six cottages for two on a working Cornish farm. Hot tubs, woodburners, dog-friendly. From £130 a night.` | self |
| `sleeps-4` | `Four-person cottages — Whalesborough, Cornwall` | `Twelve four-person cottages across 450 acres. Hot tubs available. Dog-friendly. From £150 a night.` | self |
| `sleeps-5` | `Five-person cottages — Whalesborough` | `Five-person Cornish farm cottage. Jack's House — a five-bed barn conversion with exposed beams. Dog-friendly.` | parent |
| `sleeps-6` | `Six-person cottages — Whalesborough, Cornwall` | `Twelve six-person cottages, balconies, valley views. Premium and spa tiers. Dog-friendly. From £170 a night.` | self |
| `sleeps-7` | `Seven-person cottages — Whalesborough` | `Browse seven-person options at Whalesborough. We pair an eight-person with a single occupancy adjustment.` | parent |
| `sleeps-8` | `Eight-person cottages — Whalesborough, Cornwall` | `Four eight-person cottages including the Grade II Whalesborough Farmhouse and Calf House. Hot tubs. Dog-friendly.` | self |
| `sleeps-9` | `Nine-person cottages — Whalesborough` | `Nine-person stays — combine an eight with the Arvor block, or browse our ten-person Nan's House.` | parent |
| `sleeps-10` | `Ten-person cottage — Whalesborough, Cornwall` | `Nan's House Spa — a ten-person farmhouse with hot tub. The largest single-property booking on the estate.` | self |

JSON-LD: `CollectionPage` + `ItemList` for each, filtered by occupancy.

### 6.4 `/stay/cottages/by-persona/[persona]` — 6 facet pages

| Slug | Title | Description | Canonical | JSON-LD |
|---|---|---|---|---|
| `multi-generational-families` | `Multi-generational cottages — Whalesborough` | `Eight large cottages built for three generations under one roof. Interconnecting bedrooms, single-storey options, ground-floor masters.` | self | CollectionPage + ItemList |
| `couples` | `Cottages for couples — Whalesborough` | `Barley Park's converted feed mill, the Arvor Suite 1.0, Trelowen 2.0. Six couples-first stays on a working farm.` | self | CollectionPage + ItemList |
| `dog-owners` | `Dog-friendly cottages — Whalesborough, Cornwall` | `Twenty-five of our twenty-seven cottages welcome dogs. Enclosed gardens, indoor dog showers, coastal walks straight from the door.` | self | CollectionPage + ItemList |
| `wellness-travellers` | `Spa cottages — hot tubs at Whalesborough` | `Fourteen cottages with private hot tubs. All within walking distance of the W Club and the indoor 29°C pool.` | self | CollectionPage + ItemList |
| `extended-stays` | `Long-stay cottages — Whalesborough` | `Cottages set up for a fortnight or more. Garden offices, full kitchens, fast Wi-Fi, EV charging across the estate.` | self | CollectionPage + ItemList |
| `celebrations` | `Cottages for celebrations — Whalesborough` | `Two flagship signature properties — Whalesborough Farmhouse (sleeps 8) and Nan's House Spa (sleeps 10). Group catering on request.` | self | CollectionPage + ItemList |

### 6.5 `/stay/cottages/compare` — Comparison tool

| Slot | Value |
|---|---|
| Title | `Compare cottages side by side — Whalesborough` |
| Description | `Compare any cottages on amenities, sleeps, price, distance to spa. Save up to three side-by-side.` |
| Canonical | `/stay/cottages/compare` |
| JSON-LD | `WebApplication` |
| Robots | `index, follow` but `noindex` if comparison is in URL params (e.g. `?compare=farmhouse,kew-villa`) |

### 6.6 `/stay/cottages/[slug]` — Individual cottage pages (27)

This is the MTE pattern. Each cottage emits three schema types in a single `@graph`:

1. `Accommodation` (Google Travel)
2. `Product` (organic product carousel)
3. `VacationRental` (self-catering search intent)

All three share the same `@id` set and reference `#resort` via `containedInPlace`.

Below — every cottage with hand-edited title + description. **All descriptions verified ≤155 chars.**

| Slug | Title (≤60) | Description (≤155) |
|---|---|---|
| `whalesborough-farmhouse` | `Whalesborough Farmhouse — sleeps 8 — Whalesborough` | `A Grade II 14th-century farmhouse on the original estate. Sleeps eight, snooker room, cinema snug, hot tub. Five-star gold. Dog-friendly.` |
| `whalesborough-cottage` | `Whalesborough Cottage — sleeps 8 — Whalesborough` | `A 17th-century barn for eight. Four en-suites, 55-inch chill-out den, private hot tub. Dog-friendly. Five-star gold.` |
| `calf-house-spa` | `Calf House Spa — sleeps 8 — Whalesborough` | `An eight-person spa barn from a converted calf shed. Underfloor heating, hot tub, two king en-suites plus a children's dorm.` |
| `kew-villa` | `Kew Villa — sleeps 8 — Whalesborough` | `A new four-bedroom villa with an exclusive hot tub. Sleeps eight, en-suites throughout, two dogs welcome.` |
| `nans-house-spa` | `Nan's House Spa — sleeps 10 — Whalesborough` | `The only ten-person stay on the estate. Five bedrooms, hot tub, parking for five, two dogs welcome.` |
| `eagles-nest` | `Eagle's Nest — sleeps 6 — Whalesborough` | `A 6-person cottage with three balconies and a west-facing garden. The only no-dog premium cottage — for the quiet you'd like back.` |
| `trevelyan` | `Trevelyan — sleeps 6 — Whalesborough` | `Sibling to Eagle's Nest. Six-person cottage, valley views, multiple balconies. Dog-friendly. Five-star gold.` |
| `sheeps-house` | `Sheep's House — sleeps 6 — Whalesborough` | `A six-person cottage with twin-and-super-king sleeping and three balconies. Dog-friendly. Five-star gold.` |
| `moleyns` | `Moleyns — sleeps 6 — Whalesborough` | `New-build six-person cottage with balconies and a short walk to the pool and spa. Dog-friendly. Five-star gold.` |
| `medlands` | `Medlands — sleeps 6 — Whalesborough` | `A light-filled six-person cottage with south-facing garden and a 55-inch TV. Floor-to-ceiling bifolds. Dog-friendly.` |
| `arundell` | `Arundell — sleeps 6 — Whalesborough` | `New-build six-person cottage with valley vista and floor-to-ceiling glazing. Dog-friendly. Five-star gold.` |
| `windy-hills-spa` | `Windy Hills Spa — sleeps 6 — Whalesborough` | `Newly refurbished six-person spa cottage by The Weir. Hot tub, woodburner, single-storey. Dog-friendly.` |
| `long-down-spa` | `Long Down Spa — sleeps 4 — Whalesborough` | `Single-storey four-person spa barn with hot tub. Exposed beams, en-suites throughout. Dog-friendly.` |
| `warrens-spa` | `Warrens Spa — sleeps 4 — Whalesborough` | `An 82m² hot-tub spa cottage with vaulted ceiling and wrap-around bifolds. Single-storey, dog-friendly.` |
| `nettlecoombe-spa` | `Nettlecoombe Spa — sleeps 4 — Whalesborough` | `Mobility-friendly single-storey spa cottage with hot tub and Jacuzzi bath. Step-free throughout. Dog-friendly.` |
| `gwari-spa-barn-2-0` | `Gwari Spa Barn 2.0 — sleeps 4 — Whalesborough` | `A 105m² modern dual-king spa barn. Hot tub, Sonos, upstairs living. Dog-friendly.` |
| `gwari-spa-barn-3-0` | `Gwari Spa Barn 3.0 — sleeps 6 — Whalesborough` | `A 125m² six-person sister to Gwari 2.0. Hot tub, three bedrooms, Sonos. Dog-friendly.` |
| `trelowen-2-0-spa` | `Trelowen 2.0 Spa — sleeps 4 — Whalesborough` | `A contemporary new-build lodge for four. Private hot tub, floor-to-ceiling glazing. Dog-friendly.` |
| `trelowen-3-0-spa` | `Trelowen 3.0 Spa — sleeps 6 — Whalesborough` | `A six-person Trelowen lodge with wine cooler, hot tub and lounger garden. Dog-friendly.` |
| `jacks-house` | `Jack's House — sleeps 5 — Whalesborough` | `A five-person dog-friendly barn conversion with exposed beams. Three bedrooms, family-built.` |
| `barley-park` | `Barley Park — sleeps 2 — Whalesborough` | `The only one-bedroom cottage on the estate. Converted feed mill, Jacuzzi bath, woodburner. Couples-only.` |
| `beachcombers` | `Beachcombers — sleeps 4 — Whalesborough` | `Single-storey four-person cottage with vaulted ceiling and underfloor heating. Up to two dogs.` |
| `westcotts` | `Westcotts — sleeps 4 — Whalesborough` | `Open-plan four-person cottage with woodburner. Two double bedrooms. Dog-friendly. Five-star gold.` |
| `venners` | `Venners — sleeps 4 — Whalesborough` | `A two-storey four-person cottage with master-bedroom Jacuzzi bath. Five-star gold. Dog-friendly.` |
| `middle-hill` | `Middle Hill — sleeps 4 — Whalesborough` | `A former milking parlour with interconnecting bedrooms — best for young families. Dog-friendly.` |
| `little-main` | `Little Main — sleeps 4 — Whalesborough` | `End-of-terrace interior-designed cottage. Walk-in wardrobe, south-facing garden. Dog-friendly.` |
| `chapel-park` | `Chapel Park — sleeps 4 — Whalesborough` | `Newly built four-person cottage. Both bedrooms en-suite with Jacuzzi baths. Dog-friendly.` |
| `woody-platt` | `Woody Platt — sleeps 4 — Whalesborough` | `Former milking parlour with west-facing garden. Two en-suites. A dog-lover favourite.` |
| `sand-parks` | `Sand Parks — sleeps 4 — Whalesborough` | `Converted farm workshop with canal-view access. Four-person, dog-friendly. Five-star gold.` |

For each cottage, JSON-LD reference template: `stay.cottage` (in `seo-json-ld-templates.json`). Variables filled per-cottage from the CMS — `sleeps`, `bedrooms`, `bathrooms`, `floorSizeM2`, `hotTub`, `woodburner`, `sonos`, `privateGarden`, `petsAllowed`, `rating`, `reviewCount`, `adrLow`, `adrHigh`.

### 6.7 `/stay/arvor-suites` — Hub + 5 types + packages + 7 individual packages

#### Hub `/stay/arvor-suites`

| Slot | Value |
|---|---|
| Title | `Arvor Suites — Whalesborough Farm Resort & Spa` |
| Description | `Twenty-two boutique ecotel apartments on a 450-acre Cornish farm. Studios, suites, duplexes and a penthouse. From £85 a night.` |
| JSON-LD | `LodgingBusiness` referencing `#resort` + `ItemList` of 5 suite types |
| Canonical | `/stay/arvor-suites` |

#### 5 Suite types

| Slug | Title | Description |
|---|---|---|
| `studio-1-0` | `Arvor Studio 1.0 — Whalesborough` | `Compact luxury studio with four-poster bed, induction kitchen and smart TV. Single-storey. One dog welcome. From £85 a night.` |
| `wetroom-studio-1-0` | `Arvor Wetroom Studio — Whalesborough` | `Accessibility-adapted four-poster studio. Walk-in shower with seat, grab rails, level access throughout. Dog-friendly.` |
| `suite-1-0` | `Arvor Suite 1.0 — Whalesborough` | `Couples-focused boutique suite. Box-spring bed, open kitchen, smart TV. The top-volume ecotel layout.` |
| `duplex-2-0` | `Arvor Duplex 2.0 — Whalesborough` | `Two-bedroom Arvor duplex for four. King and twin, both en-suite. Pet-friendly family layout.` |
| `penthouse-2-0` | `Arvor Penthouse 2.0 — Whalesborough` | `Top-floor Arvor penthouse for four. Single-storey, elevator access, king and twin both en-suite.` |

JSON-LD per page: `stay.arvor_suite` template.

#### `/stay/arvor-suites/packages` — Hub

| Slot | Value |
|---|---|
| Title | `Arvor packages — Whalesborough Farm Resort & Spa` |
| Description | `Seven curated stays in the Arvor block. Long weekends, anniversaries, baby moons, fourth-trimester stays. Pre-arrival concierge included.` |
| JSON-LD | `CollectionPage` + `ItemList` of 7 packages |

#### 7 package pages

| Slug | Title | Description |
|---|---|---|
| `wild-and-refined` | `Wild & Refined — Arvor package — Whalesborough` | `A two-night Arvor stay paired with two W Club rituals and a foraging walk on the estate. From £xxx, two adults.` |
| `baby-moon` | `Baby Moon — Arvor package — Whalesborough` | `Two-night Arvor stay with a maternity-safe spa ritual, in-suite breakfast and a private estate walk. Specialist therapists.` |
| `fourth-trimester` | `Fourth Trimester — Arvor — Whalesborough` | `A three-night recovery stay for new parents. In-suite postnatal massage, family pool slot, kitchen-garden lunches.` |
| `anniversary` | `Anniversary — Arvor package — Whalesborough` | `Two-night Arvor stay with a Couples Retreat at the W Club and a private supper at The Weir. From £xxx, two adults.` |
| `long-weekend` | `Long Weekend — Arvor package — Whalesborough` | `Three-night Friday-to-Monday Arvor stay. Includes welcome hamper, spa access, one shared treatment.` |
| `summer-stay` | `Summer Stay — Arvor package — Whalesborough` | `A seven-night July or August Arvor stay. Outdoor-pool priority, beach hamper, two estate activities included.` |
| `midweek-escape` | `Midweek Escape — Arvor package — Whalesborough` | `Two-night Mon–Wed Arvor stay. Off-peak pricing, full spa access, a shared massage and breakfast at The Weir.` |

### 6.8 `/stay/spa-lodges`

| Slot | Value |
|---|---|
| Title | `Trelowen & Gwari spa lodges — Whalesborough` |
| Description | `Two contemporary spa-lodge ranges on the estate — private hot tubs, floor-to-ceiling glazing, Sonos throughout.` |

`/stay/spa-lodges/trelowen` and `/stay/spa-lodges/gwari` — `LodgingBusiness` schema referencing `#resort`.

### 6.9 `/stay/holiday-types` (8 subpages)

Use `CollectionPage` + persona-specific editorial content. Each is self-canonical and `index, follow`.

| Slug | Title | Description |
|---|---|---|
| `family-holidays` | `Family holidays in Cornwall — Whalesborough` | `Family cottage holidays on a 450-acre working farm. Pool, spa, farm tours, dog-friendly. Five minutes to Widemouth Bay.` |
| `couples-breaks` | `Couples' breaks — Whalesborough, Cornwall` | `Cornish couples' breaks on a five-hundred-acre estate. Hot tubs, spa rituals, lakeside supper at The Weir.` |
| `dog-friendly-holidays` | `Dog-friendly holidays — Whalesborough` | `Twenty-five dog-friendly cottages on a working Cornish farm. Indoor dog showers, enclosed gardens, coast-path access.` |
| `spa-breaks` | `Spa breaks — Whalesborough Farm Resort & Spa` | `Indoor 29°C pool, sauna, steam room, Gaia rituals at the W Club. Spa cottage stays with private hot tubs.` |
| `multi-generational` | `Multi-generational holidays — Whalesborough` | `Family stays for eight or ten across three generations. Interconnecting rooms, single-storey, ground-floor masters.` |
| `accessible-holidays` | `Accessible holidays — Whalesborough, Cornwall` | `Mobility-adapted cottages and Arvor wetroom studio. Step-free, grab rails, accessible pool hoist on request.` |
| `long-weekends` | `Long-weekend cottages — Whalesborough` | `Three- and four-night cottage breaks. Friday or Monday arrivals across our 27-strong cottage estate.` |
| `off-season-escapes` | `Off-season escapes — Whalesborough, Cornwall` | `Winter and shoulder-season stays from £120 a night. Heated indoor pool, woodburners, off-peak spa rituals.` |

### 6.10 `/stay/offers` & `/stay/offers/[slug]`

| Slot | Value |
|---|---|
| Title (hub) | `Current offers — Whalesborough Farm Resort & Spa` |
| Description (hub) | `Seasonal cottage and Arvor offers, member discounts and last-minute availability. Updated weekly.` |
| JSON-LD (hub) | `CollectionPage` + `ItemList` of current `Offer`s |
| Per-offer | `Product` + `Offer` with `validFrom` / `validThrough` ISO dates |

### 6.11 `/stay/availability`

| Slot | Value |
|---|---|
| Title | `Check availability — Whalesborough` |
| Description | `Real-time availability across 27 cottages and 22 Arvor Suites. Filter by sleeps, dates, hot tub and dogs.` |
| Robots | `index, follow` (canonical) — but **`noindex, follow`** when URL contains date params (`?from=2026-07-01&to=2026-07-08`) |
| JSON-LD | `SearchResultsPage` referencing `#website` |

### 6.12 `/stay/booking/*` — 5 funnel steps + confirmation

All steps `noindex, follow`. Title pattern: `{Step} — Booking — Whalesborough`.

| Slug | Title | Robots |
|---|---|---|
| `/stay/booking/dates` | `Choose your dates — Whalesborough` | `noindex, follow` |
| `/stay/booking/guests` | `Who's coming — Whalesborough` | `noindex, follow` |
| `/stay/booking/extras` | `Pre-arrival extras — Whalesborough` | `noindex, follow` |
| `/stay/booking/details` | `Your details — Whalesborough` | `noindex, follow` |
| `/stay/booking/payment` | `Secure payment — Whalesborough` | `noindex, follow` |
| `/stay/booking/confirmation` | `Booking confirmed — Whalesborough` | `noindex, nofollow` |

### 6.13 `/stay/gallery`, `/stay/faqs`, `/stay/dog-rules`, `/stay/damage-deposit`, `/stay/holiday-treats`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/stay/gallery` | `Stay gallery — Whalesborough Farm Resort & Spa` | `A photographic tour of the cottages, Arvor Suites and spa lodges across 450 acres of Cornish coast.` | `ImageGallery` |
| `/stay/faqs` | `Stay FAQs — Whalesborough Farm Resort & Spa` | `Check-in, dogs, EV charging, accessibility, cancellation, Wi-Fi, parking. Twenty answered questions about staying with us.` | `FAQPage` (template `shared.faqpage`) |
| `/stay/dog-rules` | `Dog rules — Whalesborough Farm Resort & Spa` | `Dog rules across the estate: cottages, beaches, walks, restaurant. Maximum two dogs per cottage. Free dog welcome pack.` | `WebPage` |
| `/stay/damage-deposit` | `Damage deposit — Whalesborough` | `A refundable £150 damage deposit applies to every cottage stay. Returned within 14 days of departure if undamaged.` | `WebPage` |
| `/stay/holiday-treats` | `Holiday treats & extras — Whalesborough` | `Pre-arrival hampers, grocery boxes, milk-and-bread starters, kids' welcome packs, cot hire. Add at booking or before arrival.` | `Product` per item + parent `CollectionPage` |

---

## 7. Spa silo (`/spa/*`)

### 7.1 `/spa` — Hub

| Slot | Value |
|---|---|
| Title | `The W Club Spa — Whalesborough Farm Resort & Spa` |
| Description | `A botanical day spa on a 450-acre Cornish farm. Indoor 29°C pool, sauna, steam, gym and Gaia Skincare rituals. Adults only.` |
| OG image | `/og/spa-1200x630.jpg` |
| JSON-LD | `spa.health_business` (HealthAndBeautyBusiness + DaySpa) |
| Canonical | `/spa` |

### 7.2 `/spa/treatments` + 4 categories + ~29 treatment pages

#### Treatments hub

| Slot | Value |
|---|---|
| Title | `Spa treatments — The W Club, Whalesborough` |
| Description | `Twenty-nine spa rituals built around the Gaia botanical skincare line. Massages, facials, hands and feet — from £35.` |
| JSON-LD | `CollectionPage` + `ItemList` of all treatments |

#### Category pages (`/spa/treatments/category/[slug]`)

| Slug | Title | Description |
|---|---|---|
| `rituals` | `Gaia Rituals — The W Club, Whalesborough` | `Eleven Gaia signature journeys built around Calming, Awakening and Balancing oil blends. From £90.` |
| `facials` | `Facials — The W Club, Whalesborough` | `Four facials anchored in Gaia plant actives. Jade-wand lifting, crystal-stone, yoga facial. From £75.` |
| `body-massage` | `Body & massage — The W Club, Whalesborough` | `Hot stone, Indian head, bespoke massage and the W salt-and-oil scrub. Properly technical bodywork. From £55.` |
| `hands-feet` | `Hands & feet — The W Club, Whalesborough` | `Manicures, pedicures and gel polish at the W Club. Quiet, polished, properly done. From £15.` |

JSON-LD per category: `CollectionPage` + `ItemList` filtered by category.

#### Individual treatment pages (29 — MTE: Service + Product)

Title formula: `{Treatment name} — The W Club Spa, Whalesborough` (truncated to fit 60 chars).

| Slug | Title | Description |
|---|---|---|
| `gaia-calming-journey-60` | `Gaia Calming Journey 60 — W Club, Whalesborough` | `60-minute back, neck and scalp massage with the Gaia Calming oil blend. Lavender from our market garden. From £90.` |
| `gaia-calming-journey-90` | `Gaia Calming Journey 90 — W Club, Whalesborough` | `A 90-minute version of the Calming Journey with Indian Head, facial cleanse and a restorative facial massage.` |
| `gaia-awakening-journey-60` | `Gaia Awakening Journey 60 — W Club, Whalesborough` | `60-minute deep-tissue back, leg and arm massage with the Awakening oil blend. Rosemary, citrus, ginger.` |
| `gaia-awakening-journey-90` | `Gaia Awakening Journey 90 — W Club, Whalesborough` | `A 90-minute version of the Awakening Journey with full-body brushing and a focused scalp release.` |
| `gaia-balancing-journey-60` | `Gaia Balancing Journey 60 — W Club, Whalesborough` | `60-minute full-body massage with the Balancing oil blend. Geranium, ylang ylang, frankincense.` |
| `gaia-balancing-journey-90` | `Gaia Balancing Journey 90 — W Club, Whalesborough` | `A 90-minute version of the Balancing Journey with facial massage and warmed compresses.` |
| `gaia-affinity-wellness` | `Gaia Affinity Wellness — W Club, Whalesborough` | `A two-hour signature ritual: bespoke massage, facial and a sea-salt foot soak. From £165.` |
| `mother-gaia` | `Mother Gaia Maternity — W Club, Whalesborough` | `A 75-minute maternity ritual for second and third trimesters. Side-lying massage, foot work, scalp release.` |
| `gaia-raindrop-therapy` | `Gaia Raindrop Therapy — W Club, Whalesborough` | `A 90-minute essential-oil layering ritual along the spine. Vasovagal calming, deep nervous-system reset.` |
| `gaia-total-holistic-ritual` | `Gaia Total Holistic Ritual — W Club, Whalesborough` | `Two and a half hours: bespoke massage, jade facial, scalp work and a foot ritual. The longest journey on the menu.` |
| `gaia-crystal-therapy` | `Gaia Crystal Therapy — W Club, Whalesborough` | `A 75-minute crystal-stone ritual with placement on the chakras. Quiet, ceremonial, deeply restorative.` |
| `equilibrium-crystal-facial` | `Equilibrium Crystal Facial — W Club, Whalesborough` | `A 75-minute crystal-wand facial with Gaia actives. Lifting massage, lymphatic drainage, no needles.` |
| `gaia-jade-facial-45` | `Gaia Jade Facial 45 — W Club, Whalesborough` | `A 45-minute jade-wand facial with Gaia cleanser, exfoliant and mask. From £75.` |
| `gaia-jade-facial-60` | `Gaia Jade Facial 60 — W Club, Whalesborough` | `A 60-minute jade-wand facial with extended lifting massage and lymphatic drainage. From £95.` |
| `gaia-lifting-yoga-facial` | `Gaia Lifting Yoga Facial — W Club, Whalesborough` | `A 75-minute lifting facial with face-yoga work and Gaia actives. The skin-fitness option.` |
| `w-salt-oil-scrub` | `W Salt & Oil Scrub — W Club, Whalesborough` | `A 45-minute Cornish sea-salt body scrub with Gaia oils. Softening, smoothing, briney. From £75.` |
| `w-indian-head-massage` | `W Indian Head Massage — W Club, Whalesborough` | `A 30-minute scalp, neck and shoulder ritual. The quickest way to unhook from a long week. £55.` |
| `w-bespoke-massage-45` | `W Bespoke Massage 45 — W Club, Whalesborough` | `A 45-minute massage shaped to your pressure, areas and oil preferences. From £70.` |
| `w-bespoke-massage-60` | `W Bespoke Massage 60 — W Club, Whalesborough` | `A 60-minute bespoke massage. The most-requested treatment on the menu. From £90.` |
| `w-bespoke-massage-90` | `W Bespoke Massage 90 — W Club, Whalesborough` | `A 90-minute full-body bespoke massage with deeper, technical work where you need it. From £130.` |
| `w-hot-stone-massage-60` | `W Hot Stone Massage 60 — W Club, Whalesborough` | `A 60-minute basalt hot stone massage. Heat releases deeper tension than hands alone. From £100.` |
| `w-hot-stone-massage-90` | `W Hot Stone Massage 90 — W Club, Whalesborough` | `A 90-minute hot stone massage with focused scapula, back and leg work. From £140.` |
| `serenity-at-the-w` | `Serenity at the W — Whalesborough` | `Two hours: salt scrub, bespoke massage and a Gaia jade facial. The W Club's signature half-day ritual. From £165.` |
| `w-luxury-manicure` | `W Luxury Manicure — W Club, Whalesborough` | `60-minute manicure with hand massage, file, soak and polish. £50.` |
| `w-luxury-pedicure` | `W Luxury Pedicure — W Club, Whalesborough` | `75-minute pedicure with foot scrub, soak, massage and polish. £60.` |
| `just-gel-hands` | `Just Gel Hands — W Club, Whalesborough` | `45-minute gel polish for hands. Quick, precise, polished. £35.` |
| `just-gel-toes` | `Just Gel Toes — W Club, Whalesborough` | `45-minute gel polish for toes. Quick, precise, polished. £40.` |
| `gel-polish-upgrade` | `Gel Polish Upgrade — W Club, Whalesborough` | `Add a gel finish to any manicure or pedicure. 15 minutes. £15.` |
| `gel-polish-removal` | `Gel Polish Removal — W Club, Whalesborough` | `Safe gel removal with cuticle and nail conditioning. 30 minutes. £20.` |

JSON-LD per page: `spa.treatment_mte` (Service + Product MTE).

### 7.3 `/spa/spa-days` + 14 package pages

#### Hub

| Slot | Value |
|---|---|
| Title | `Spa days — The W Club, Whalesborough` |
| Description | `Fourteen spa day packages — sunrise to sunset, couples to maternity, hen parties to founder's day. Members 15% off.` |
| JSON-LD | `CollectionPage` + `ItemList` of 14 packages |

#### Per-package pages

Title formula: `{Package name} — Spa day — Whalesborough` (or truncated).

| Slug | Title | Description |
|---|---|---|
| `sunrise` | `Sunrise — Spa day — Whalesborough` | `An early-bird spa day. 8am pool access, a 60-minute ritual, brunch at The Weir. From £xxx.` |
| `sunset` | `Sunset — Spa day — Whalesborough` | `An afternoon-to-evening spa day. Pool, sauna, a 75-minute ritual, supper at The Weir. From £xxx.` |
| `celebrate-at-the-w` | `Celebrate at the W — Spa day — Whalesborough` | `A celebration spa day for two — Champagne, lakeside lunch and two 60-minute rituals.` |
| `swim-spa-dine` | `Swim, Spa & Dine — Whalesborough` | `Full-day estate access. Two pools, sauna, steam, a 60-minute ritual and a three-course supper at The Weir.` |
| `sunday-slow-down` | `Sunday Slow Down — Spa day — Whalesborough` | `A half-day Sunday restore. Pool access, a 45-minute ritual and the Sunday Roast at The Weir.` |
| `couples-retreat` | `Couples Retreat — Spa day — Whalesborough` | `A couples' spa day with paired 75-minute rituals, lakeside lunch and afternoon pool access.` |
| `hen-refined` | `Hen Refined — Spa day — Whalesborough` | `An adult hen-do at the W Club. Group rituals, Champagne, lakeside lunch. From six to twelve guests.` |
| `galentines-spa-sip-paint` | `Galentine's — Spa, Sip, Paint — Whalesborough` | `A February Galentine's day. Pool access, a 45-minute ritual, prosecco and a watercolour class.` |
| `mother-and-daughter` | `Mother & Daughter — Spa day — Whalesborough` | `A mother-daughter spa day. Side-by-side rituals, lakeside lunch and afternoon pool time.` |
| `maternity-babymoon` | `Maternity Babymoon — Spa day — Whalesborough` | `A trimester-safe spa day. Side-lying massage, foot ritual, herbal infusions, no pool heat above 32°C.` |
| `members-day-out` | `Members' Day Out — W Club, Whalesborough` | `A member-rate full spa day. 15% off all rituals, complimentary lakeside lunch.` |
| `quick-lunch-linger` | `Quick Lunch & Linger — Whalesborough` | `A short midweek visit. A 30-minute ritual, pool access and a lakeside lunch at The Weir.` |
| `founders-day` | `Founder's Day — Spa day — Whalesborough` | `Founder's Day — a seasonal celebration day with extended pool hours and complimentary signature ritual.` |
| `september-reset` | `September Reset — Spa day — Whalesborough` | `An autumn reset day. Full estate access, a 75-minute ritual, autumn lunch at The Weir.` |

JSON-LD: `spa.spa_day_offer` (Product + Offer).

### 7.4 `/spa/facilities` + 4 facility pages

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/spa/facilities` | `Spa facilities — The W Club, Whalesborough` | `Indoor 29°C pool, outdoor pool (May–Sep), sauna, steam room, gym. Adults only.` | `Place` + `ItemList` |
| `/spa/facilities/indoor-pool` | `Indoor pool 29°C — Whalesborough` | `A 20m indoor pool kept to 29°C year-round. Adults-only sessions and family swim slots. Wheelchair hoist on request.` | `Place` |
| `/spa/facilities/outdoor-pool` | `Outdoor pool — Whalesborough` | `Open May to September, kept to 26°C, set into the kitchen-garden terrace.` | `Place` |
| `/spa/facilities/sauna-steam` | `Sauna & steam — The W Club, Whalesborough` | `Cedar sauna and eucalyptus steam room at the W Club. Adults only, towel etiquette enforced.` | `Place` |
| `/spa/facilities/gym` | `Gym & fitness studio — Whalesborough` | `Technogym kit, daily fitness classes, sea-view treadmill. Member and guest access.` | `Place` + `ExerciseGym` |

### 7.5 `/spa/memberships`

| Slug | Title | Description | Robots |
|---|---|---|---|
| `/spa/memberships` | `Spa memberships — The W Club, Whalesborough` | `Three membership tiers — Day, Plus and Founders'. 15% off all treatments and unlimited pool access.` | `index, follow` |
| `/spa/memberships/join` | `Join the W Club — Whalesborough` | `Apply for W Club membership. Direct-debit setup, two-month notice period.` | `index, follow` |
| `/spa/memberships/manage` | `Manage your membership — Whalesborough` | `Manage your W Club membership, update payment details, freeze or cancel.` | `noindex, follow` |

JSON-LD on `/spa/memberships`: `Product` per tier with `recurring` price spec.

### 7.6 `/spa/products`

E-commerce silo for Gaia / W Club retail.

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/spa/products` | `Spa products — Gaia Natural Skincare — Whalesborough` | `Gaia Natural Skincare oils, mineral mud, jade crystal wands. Stocked in-spa, posted UK-wide.` | `Store` + `ItemList` |
| `/spa/products/category/[slug]` | `{Category} — Gaia Natural Skincare — Whalesborough` | `{Category} from Gaia Natural Skincare — small-batch, plant-based, blended on the estate.` | `CollectionPage` |
| `/spa/products/[slug]` | `{Product} — Gaia Natural Skincare — Whalesborough` | `{Product description with active ingredients, size, and price.}` | `Product` + `Offer` |

### 7.7 `/spa/gift-vouchers` + redeem

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/spa/gift-vouchers` | `Spa gift vouchers — The W Club, Whalesborough` | `Treatment, day-package and monetary spa gift vouchers. Posted within 48 hours, valid 12 months.` | `Product` per voucher denomination |
| `/spa/gift-vouchers/redeem` | `Redeem a spa voucher — Whalesborough` | `Redeem your W Club gift voucher. Voucher code and booking date required.` | `WebPage` (`noindex, follow`) |

### 7.8 `/spa/estate-to-treatment`

| Slot | Value |
|---|---|
| Title | `Estate-to-treatment — The W Club, Whalesborough` |
| Description | `Each spa ritual is anchored in a botanical from our 450-acre estate. Lavender, rosemary, geranium, Cornish sea salt.` |
| JSON-LD | `WebPage` + multiple `Product` references for each botanical |

### 7.9 `/spa/practitioners`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/spa/practitioners` | `Spa therapists — The W Club, Whalesborough` | `Meet the W Club therapy team. Specialisms, training, and the ritual each practitioner is known for.` | `ItemList` of `Person` |
| `/spa/practitioners/[slug]` | `{Name} — Spa therapist — Whalesborough` | `{Bio first sentence. Specialism. Years of practice.}` | `spa.practitioner` (Person) |

### 7.10 `/spa/booking/*` — `noindex, follow`

All booking-flow steps `noindex, follow`. Title pattern: `{Step} — Spa booking — Whalesborough`.

### 7.11 `/spa/faqs` and `/spa/etiquette`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/spa/faqs` | `Spa FAQs — The W Club, Whalesborough` | `Spa booking, dress, etiquette, pregnancy, accessibility, contraindications. Twenty answered questions.` | `FAQPage` |
| `/spa/etiquette` | `Spa etiquette — The W Club, Whalesborough` | `Quiet voices, no phones, robe-and-slipper everywhere. Adults only, no under-13s. Robe etiquette.` | `WebPage` |

---

## 8. Dine silo (`/dine/*`)

### 8.1 `/dine` — Restaurant root

| Slot | Value |
|---|---|
| Title | `The Weir Restaurant — Whalesborough Farm Resort & Spa` |
| Description | `A lakeside farm-to-fork restaurant. Breakfast, lunch and supper club from the estate's market garden and Cornish boats. Dog-friendly.` |
| OG image | `/og/weir-1200x630.jpg` |
| JSON-LD | `dine.restaurant` (Restaurant) referencing `#resort` |
| Canonical | `/dine` |

### 8.2 `/dine/menus` + `/dine/menus/[type]` + sample

#### Hub

| Slot | Value |
|---|---|
| Title | `Menus — The Weir Restaurant, Whalesborough` |
| Description | `Breakfast, lunch, Supper Club, Sunday Roast, drinks and kids' menus at The Weir. Updated seasonally from the kitchen garden.` |
| JSON-LD | `Menu` parent referencing six `MenuSection`s |

#### Per-menu pages (6)

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `breakfast` | `Breakfast menu — The Weir, Whalesborough` | `Whalesborough breakfast: hot from £8, full Cornish from £14, pastries from the in-house bakery. 8am–11am daily.` | `Menu` + `MenuSection` + `MenuItem` |
| `lunch` | `Lunch menu — The Weir, Whalesborough` | `Lunch at The Weir: small plates, garden plates, sea plates. From £9. Lakeside dog-friendly seating.` | `Menu` |
| `supper-club` | `Supper Club — The Weir, Whalesborough` | `Five-course Friday and Saturday Supper Club menu. Wine pairings, kitchen-garden tasting. £75 per person.` | `Menu` |
| `sunday-roast` | `Sunday Roast — The Weir, Whalesborough` | `Sunday Roast at The Weir: Cornish beef, lamb or porchetta. Dripping potatoes, garden veg. £28 per adult.` | `Menu` |
| `drinks` | `Drinks list — The Weir, Whalesborough` | `Cornish wines, cocktails built around the kitchen garden, low-and-no options, full Cornish gin shelf.` | `Menu` |
| `kids` | `Kids' menu — The Weir, Whalesborough` | `Kids' menu under 12: from £6. Garden-vegetable pasta, fish goujons, kid-friendly Sunday Roast plate.` | `Menu` |

| `/dine/menus/sample` | `Sample menu — The Weir, Whalesborough` | `An indicative sample menu — published items shift weekly with what the garden and boats deliver.` | `Menu` |

### 8.3 `/dine/reserve/*` — `noindex, follow`

All reservation-flow steps `noindex, follow`.

### 8.4 `/dine/events` + per-event pages

#### Hub

| Slot | Value |
|---|---|
| Title | `Events at The Weir — Whalesborough` |
| Description | `Grill and Chill, Supper Club, Galentine's, Easter, Sunday Roast and Music with Yazzy. Seasonal events at the lakeside restaurant.` |
| JSON-LD | `CollectionPage` + `ItemList` of `Event`s |

#### 6 events

| Slug | Title | Description |
|---|---|---|
| `grill-and-chill` | `Grill and Chill — The Weir, Whalesborough` | `A long-table summer barbecue at The Weir. Cornish fire-cooking, four courses, live music. From £55 per adult.` |
| `supper-club` | `Supper Club — The Weir, Whalesborough` | `A five-course Friday and Saturday Supper Club. Kitchen-garden tasting, wine pairings, single sitting at 7.30pm.` |
| `galentines-sip-spa-paint` | `Galentine's — The Weir, Whalesborough` | `Galentine's night at The Weir. Prosecco arrival, three-course supper, watercolour painting. £75 per guest.` |
| `easter-at-the-weir` | `Easter at The Weir — Whalesborough` | `An Easter weekend at The Weir. Egg hunt, lamb feast, kids' baking class. Booking opens January.` |
| `music-with-yazzy` | `Music with Yazzy — The Weir, Whalesborough` | `Live acoustic sets from Cornish singer-songwriter Yazzy. Monthly through summer, free with supper.` |
| `sunday-roast` | `Sunday Roast — The Weir, Whalesborough` | `The Weir's Sunday Roast — Cornish beef, lamb or porchetta. Booking strongly advised, three sittings.` |

JSON-LD per event: `dine.event` (Event) with `startDate`, `endDate`, `offers`.

### 8.5 `/dine/lakeside-locals` + join

| Slug | Title | Description | Robots |
|---|---|---|---|
| `/dine/lakeside-locals` | `Lakeside Locals membership — The Weir, Whalesborough` | `A locals' membership at The Weir. 15% off food and drink, priority bookings, members-only Supper Club seats.` | `index, follow` |
| `/dine/lakeside-locals/join` | `Join Lakeside Locals — Whalesborough` | `Sign up for Lakeside Locals. EX23, EX22 and PL postcodes — proof of address required.` | `noindex, follow` |

JSON-LD on `/dine/lakeside-locals`: `Product` (membership) + `Offer`.

### 8.6 `/dine/private-dining` + enquire

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/dine/private-dining` | `Private dining — The Weir, Whalesborough` | `Private dining at The Weir for 8–24 guests. The Garden Room or the lakeside terrace. Bespoke menus on request.` | `Service` + `Offer` |
| `/dine/private-dining/enquire` | `Private dining enquiry — Whalesborough` | `Enquire about private dining at The Weir. We respond within one business day.` | `WebPage` (`index, follow`, no rich snippet) |

### 8.7 `/dine/paddock-to-plate`, `/dine/suppliers`, `/dine/gift-vouchers`, `/dine/faqs`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/dine/paddock-to-plate` | `Paddock to plate — The Weir, Whalesborough` | `How The Weir sources: 60% from the estate, 30% from named neighbours, 10% from Cornish boats. Our published supplier list.` | `WebPage` |
| `/dine/suppliers` | `Our suppliers — The Weir, Whalesborough` | `The named neighbours and boats behind The Weir's menu. Each supplier's story, what we buy, and how often.` | `WebPage` + `Organization` references |
| `/dine/gift-vouchers` | `Restaurant gift vouchers — The Weir, Whalesborough` | `Voucher denominations from £25 to £200. Valid 12 months, posted within 48 hours.` | `Product` per denomination |
| `/dine/faqs` | `Restaurant FAQs — The Weir, Whalesborough` | `Dietary, dogs, opening hours, walk-ins, dress code, children, accessibility. Twenty answered questions.` | `FAQPage` |

---

## 9. Own silo (`/own/*`) — FCA-compliant lodge sales

**Critical compliance note.** This silo is the highest legal-risk area on the site. Every page that mentions income or returns must:

1. Never use the standalone word "investment" or "guaranteed".
2. Pair any income reference with the mandatory risk panel.
3. Never use the URL `/own/guaranteed-rental-income` — the canonical slug is `/own/rental-income`.
4. Pass a pre-launch review with the project's FCA solicitor (Lee Lewis sign-off pending).

Failure to comply with FSMA 2000 financial promotion rules in this silo is a criminal offence and could trigger ASA action like the Luxury Lodge Estates case. **Do not deviate from the language in this section.**

### 9.1 `/own` — Hub

| Slot | Value |
|---|---|
| Title | `Lodge ownership — Whalesborough Farm Resort & Spa` |
| Description | `Twenty-eight residences across four ranges on a 450-acre working Cornish farm. 125-year licence. Lifestyle purchase. Not an investment.` |
| OG image | `/og/own-1200x630.jpg` |
| JSON-LD | `RealEstateAgent` + `Product` |
| Canonical | `/own` |

**Description compliance check:** ✓ No "investment" standalone. ✓ Explicit "lifestyle purchase". ✓ Explicit "not an investment".

### 9.2 `/own/lodges/[range]` — 4 range pages

| Slug | Title | Description |
|---|---|---|
| `trelowen` | `Trelowen Exclusive Lodges — Whalesborough` | `The signature timber-frame range. BS 3632, 125-year licence, private hot tub on every plot. Guide prices from £425,000.` |
| `tevi` | `Tevi Luxury Lodges — Whalesborough` | `The ultra-premium tier. Eight residences only. Architect-designed, floor-to-ceiling glazing. Guide prices from £749,950.` |
| `gwelva` | `Gwelva Luxury Villas — Whalesborough` | `Permanent-build four-bedroom villas with garden-facing decking. A small range, larger plots. Guide prices on request.` |
| `bespoke` | `Bespoke Lodges — Whalesborough` | `A lodge designed with you. Specification, finish, furniture and decking to your brief. Guide prices from £399,000.` |

JSON-LD per range: `Product` + `RealEstateListing` referencing `#organization` as seller.

### 9.3 `/own/lodges/[range]/[slug]` — Individual plot pages

Title formula: `Plot {N} — {Range} — Whalesborough`.

Description formula: `Plot {N} — {bedrooms} bedrooms, hot tub, {decking type}. 125-year licence. Lifestyle purchase. Guide price £{n,nnn,nnn}.`

JSON-LD: `own.real_estate_listing` (Product + RealEstateListing) with explicit `Use class: Holiday use only — not a primary residence`.

### 9.4 `/own/why-own`, `/own/lifestyle`, `/own/process`, `/own/costs`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/own/why-own` | `Why own at Whalesborough — Whalesborough` | `What ownership at Whalesborough is — and what it isn't. A long-form buyer's guide, FCA-clean and plain-spoken.` | `WebPage` |
| `/own/lifestyle` | `The ownership lifestyle — Whalesborough` | `What a year at Whalesborough looks like — pool mornings, farm walks, kitchen-garden lunches. Owner-rate at The Weir.` | `WebPage` |
| `/own/process` | `The buying process — Whalesborough` | `A five-step ownership pathway from first viewing through legals to completion. 60 days from offer to keys.` | `HowTo` (`own.howto_process`) |
| `/own/costs` | `Costs of ownership — Whalesborough` | `Purchase price, site fees, utilities, insurance, council tax position. The full annual running cost, published.` | `WebPage` |

### 9.5 `/own/rental-income` — CRITICAL FCA-compliant pages

**These four routes (`/own/rental-income`, `/own/rental-income/calculator`, and their child meta entries) require absolute language discipline.**

| Slug | Title | Description |
|---|---|---|
| `/own/rental-income` | `Rental income at Whalesborough — Whalesborough` | `Optional managed letting for owner-residences. Historic gross income figures. Capital at risk. Past performance is not a guide.` |
| `/own/rental-income/calculator` | `Income calculator — Whalesborough` | `An illustrative calculator showing historic gross income across managed-letting units. Not an investment. Capital at risk.` |

**Description compliance verification (manual review required before launch):**
- ✗ No "guaranteed" — verified
- ✗ No "investment" as standalone noun — verified
- ✓ "Capital at risk" present — verified
- ✓ "Past performance is not a guide" present — verified
- ✓ "Optional" framing — verified
- ✓ "Lifestyle purchase" framing absent here intentionally — these pages discuss income specifically

JSON-LD on `/own/rental-income/calculator`: `own.rental_calculator_app` (WebApplication) — with the description field carrying the FCA disclosures.

### 9.6 `/own/objection-handling` + per-objection

The 12 pre-built counterarguments from the CSV — render as a FAQPage hub, with each individual objection getting its own deep page.

| Slug | Title | Description |
|---|---|---|
| `/own/objection-handling` | `Owner questions answered — Whalesborough` | `Twelve common owner questions — FHL tax, council tax, compliance, CGT, capital values, occupancy, business rates, stamp duty.` |
| `/own/objection-handling/[slug]` | `{Topic} — Owner questions — Whalesborough` | `{Plain-language answer first 150 chars.}` |

JSON-LD on `/own/objection-handling`: `FAQPage`. On each child: `WebPage` referencing the parent.

### 9.7 `/own/compliance`, `/own/sustainability`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/own/compliance` | `Compliance & regulation — Whalesborough ownership` | `Holiday-use planning, BS 3632 build standard, the 125-year licence, Short-Term Let registration scheme. Plain-spoken.` | `WebPage` |
| `/own/sustainability` | `Owner sustainability — Whalesborough` | `What each owner contributes — wind turbine quotas, EV charging entitlements, kitchen-garden access, owner offset scheme.` | `WebPage` |

### 9.8 `/own/brochure` + tokenised download

| Slug | Title | Description | Robots |
|---|---|---|---|
| `/own/brochure` | `Owner brochure — Whalesborough` | `Request the full 64-page owner brochure. Posted in 48 hours or downloaded after your details.` | `index, follow` |
| `/own/brochure/download/[token]` | `Your brochure — Whalesborough` | `Your personalised brochure download link.` | `noindex, nofollow` |

### 9.9 `/own/viewing` + `/own/viewing/book` + `/own/viewing/open-weekends`

| Slug | Title | Description | Robots |
|---|---|---|---|
| `/own/viewing` | `Book a private viewing — Whalesborough` | `Private estate viewings with the sales team. 90 minutes, one or two ranges, refreshments at The Weir.` | `index, follow` |
| `/own/viewing/book` | `Book your viewing — Whalesborough` | `Choose a date for your private estate viewing. Weekday and weekend slots available.` | `noindex, follow` |
| `/own/viewing/open-weekends` | `Open weekends — Whalesborough` | `Quarterly open weekends. Five plots open, ranger walks, lakeside lunch and Q&A with the sales team.` | `index, follow` |

JSON-LD on `/own/viewing/open-weekends`: `Event` with future-dated `startDate`.

### 9.10 `/own/waitlist`, `/own/testimonials`, `/own/case-studies`, `/own/case-studies/[slug]`, `/own/faqs`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/own/waitlist` | `Join the owner waitlist — Whalesborough` | `Join the waitlist for our next Trelowen or Tevi plot release. We contact each lead before public release.` | `WebPage` |
| `/own/testimonials` | `Owner testimonials — Whalesborough` | `What current owners say. Year-by-year quotes from Trelowen, Tevi and Gwelva residents.` | `WebPage` + multiple `Review` |
| `/own/case-studies` | `Owner case studies — Whalesborough` | `Long-form ownership stories — the family with three generations, the couple downsizing, the second-home buyers.` | `CollectionPage` + `ItemList` |
| `/own/case-studies/[slug]` | `{Family name} case study — Whalesborough` | `{Family} bought a {range} plot in {year}. How they use it, how they let it, what they'd do differently.` | `Article` + nested `Person` |
| `/own/faqs` | `Owner FAQs — Whalesborough` | `Tax, planning, licence, legals, occupancy and resale. The thirty most-asked questions from prospective owners.` | `FAQPage` |

---

## 10. Estate silo (`/estate/*`)

### 10.1 `/estate` — Hub

| Slot | Value |
|---|---|
| Title | `The estate — Whalesborough Farm Resort & Spa` |
| Description | `A 450-acre working Cornish farm: woodland, lakes, alpacas, kitchen garden and a 60kW wind turbine. Eight minutes to Widemouth Bay.` |
| OG image | `/og/estate-1200x630.jpg` |
| JSON-LD | `estate.tourist_destination` (TouristDestination + Place) |
| Canonical | `/estate` |

### 10.2 `/estate/map`, `/estate/walks`, `/estate/walks/[slug]`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/estate/map` | `Interactive estate map — Whalesborough` | `Walk the 450 acres before you arrive. Pin the spa, restaurant, cottages, animal fields and the South West Coast Path.` | `WebApplication` |
| `/estate/walks` | `Walks on the estate — Whalesborough` | `Twelve named walks across 450 acres. Distances, times, difficulty and which are dog-friendly.` | `CollectionPage` + `ItemList` |
| `/estate/walks/[slug]` | `{Walk name} — Walks at Whalesborough` | `{Distance, time, terrain and what you'll see. Dog policy if relevant.}` | `estate.trail` (Place + Trail) |

### 10.3 `/estate/activities` + `/estate/activities/[slug]` + booking flow

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/estate/activities` | `Activities & experiences — Whalesborough` | `Farm tours, fishing, fitness classes, archery, paddle-boarding and the Regenerative Ranger programme. Free and paid.` | `CollectionPage` + `ItemList` |
| `/estate/activities/[slug]` | `{Activity name} — Whalesborough` | `{Duration, age range, dog policy, price, where on the estate.}` | `estate.activity_event` (Event + Offer) |
| `/estate/activities/book/*` | `Book {Activity} — Whalesborough` | (booking flow) | `noindex, follow` |

### 10.4 `/estate/dog-friendly` — silo hub + spokes

This is one of the four silo hubs from the Technical SEO brief — it must win local "dog-friendly Cornwall" search.

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/estate/dog-friendly` | `Dog-friendly Cornwall — Whalesborough` | `Twenty-five dog-friendly cottages, ten coast-path walks from the door, indoor dog showers and a dog-friendly restaurant.` | `FAQPage` + `CollectionPage` |
| `/estate/dog-friendly/walks` | `Dog-friendly walks — Whalesborough` | `Eight named on-estate and coastal walks for dogs. Lead-required, off-lead and stock-area sections marked.` | `CollectionPage` + `ItemList` of `Trail` |
| `/estate/dog-friendly/beaches` | `Dog-friendly beaches — Whalesborough` | `Six beaches near Whalesborough that welcome dogs year-round or off-season. Distances, parking and tide notes.` | `CollectionPage` + `ItemList` of `Beach` |
| `/estate/dog-friendly/features` | `Dog facilities — Whalesborough` | `Indoor dog showers in every cottage, dog drying station at reception, free dog welcome pack, dog menu at The Weir.` | `WebPage` |
| `/estate/dog-friendly/rules` | `Dog rules — Whalesborough` | `Maximum two dogs per cottage. Always under control near livestock. Free welcome pack at check-in.` | `WebPage` |

### 10.5 `/estate/local-area` + 12 POI pages

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/estate/local-area` | `Around Whalesborough — Local area guide` | `Twelve named places near the estate — beaches, harbours, market towns, the South West Coast Path.` | `CollectionPage` + `ItemList` of `TouristDestination` |
| `/estate/local-area/widemouth-bay` | `Widemouth Bay — 8 minutes from Whalesborough` | `A two-mile surf beach eight minutes by car from the estate. Dog-friendly year-round. Two parking options.` | `estate.poi` |
| `/estate/local-area/bude-summerleaze-beach` | `Summerleaze Beach — 10 min from Whalesborough` | `Bude's main town beach with sea pool, lifeguarded summer, dog-restricted in season. Ten minutes by car.` | `estate.poi` |
| `/estate/local-area/crooklets-beach` | `Crooklets Beach — Whalesborough local guide` | `North of Bude town. Surf club, café, off-season dog-friendly. Eleven minutes from the estate.` | `estate.poi` |
| `/estate/local-area/bude-canal` | `Bude Canal — Whalesborough local guide` | `The Cornish coastal canal, towpath walk straight from Whalesborough to Bude. Three miles, flat, dog-friendly.` | `estate.poi` |
| `/estate/local-area/south-west-coast-path` | `South West Coast Path — from Whalesborough` | `The path crosses the estate at Marhamchurch. Walk south to Widemouth or north to Bude on a single morning.` | `estate.poi` |
| `/estate/local-area/tintagel-castle` | `Tintagel Castle — 35 min from Whalesborough` | `English Heritage Arthurian site on the Cornwall coast. 35 minutes by car. Footbridge, café, gift shop.` | `estate.poi` |
| `/estate/local-area/boscastle` | `Boscastle Harbour — 35 min from Whalesborough` | `A National Trust harbour village south of the estate. Witchcraft museum, harbourside pub, dog-friendly walks.` | `estate.poi` |
| `/estate/local-area/clovelly` | `Clovelly — 45 min from Whalesborough` | `Privately owned cobbled village descending to a Devon harbour. 45 minutes north of the estate. Pay-to-enter.` | `estate.poi` |
| `/estate/local-area/hartland-quay` | `Hartland Quay — 40 min from Whalesborough` | `Dramatic North Devon coast cliffs and a single pub-hotel. 40 minutes north. Dog-friendly walks.` | `estate.poi` |
| `/estate/local-area/stratton` | `Stratton — 10 minutes from Whalesborough` | `The historic village two miles inland of Bude. Tudor history, a single pub, a single farm shop.` | `estate.poi` |
| `/estate/local-area/marhamchurch` | `Marhamchurch — Whalesborough's home village` | `The village at the gate of the estate. Church, post office, two pubs, single farm shop. Three miles to Bude.` | `estate.poi` |
| `/estate/local-area/compass-point` | `Compass Point — Whalesborough local guide` | `The 1830s octagonal tower above Bude Harbour. Coast path landmark twelve minutes from the estate.` | `estate.poi` |

### 10.6 `/estate/farm` + `/estate/farm/animals` + per-animal

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/estate/farm` | `The working farm — Whalesborough` | `What a working farm on 450 acres looks like. Alpacas, chickens, rare-breed sheep, a herd of beef cattle.` | `WebPage` |
| `/estate/farm/animals` | `Meet the animals — Whalesborough` | `Twelve alpacas, two flocks of chickens, a herd of South Devon cattle, ten Hebridean ewes. Daily feeding tours.` | `CollectionPage` + `ItemList` |
| `/estate/farm/animals/[slug]` | `{Animal name or group} — Whalesborough farm` | `{Animal name, breed, year arrived, what it does on the farm.}` | `WebPage` |

---

## 11. Journal silo (`/journal/*`)

### 11.1 `/journal` — Hub

| Slot | Value |
|---|---|
| Title | `The Whalesborough Journal — Whalesborough` |
| Description | `Stories from a working Cornish farm — seasons, suppliers, the kitchen garden, dog-friendly trails and the rituals of a slow weekend.` |
| OG image | `/og/journal-1200x630.jpg` |
| JSON-LD | `journal.blog_hub` (Blog) |

### 11.2 `/journal/category/[slug]`, `/journal/[slug]`, `/journal/author/[slug]`, `/journal/tag/[slug]`

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/journal/category/[slug]` | `{Category} — The Whalesborough Journal` | `{Editorial intro to the category.}` | `CollectionPage` + `Blog` |
| `/journal/[slug]` | `{Article title} — Whalesborough Journal` | `{Article first-paragraph excerpt, 140–155 chars.}` | `journal.article` (Article + BlogPosting) |
| `/journal/author/[slug]` | `{Author} — Whalesborough Journal` | `Articles by {author}. Bio, role and writing focus.` | `Person` + `ItemList` |
| `/journal/tag/[slug]` | `{Tag} — Whalesborough Journal articles` | `Articles tagged {tag}.` | `CollectionPage` |

---

## 12. Auth, account, owners, partners, legal, system

### 12.1 Auth + account + owners portal + partners portal — all `noindex, follow`

| Slug | Title | Robots |
|---|---|---|
| `/login`, `/register`, `/forgot-password`, `/reset-password` | `Sign in — Whalesborough` | `noindex, follow` |
| `/account/*` | `Account — Whalesborough` | `noindex, follow` |
| `/owners/*` | `Owners portal — Whalesborough` | `noindex, follow` |
| `/partners/*` | `Partners portal — Whalesborough` | `noindex, follow` |

JSON-LD: minimal `WebPage` or none — these pages are private.

### 12.2 Legal pages — public, indexable

| Slug | Title | Description | JSON-LD |
|---|---|---|---|
| `/legal/privacy` | `Privacy policy — Whalesborough` | `How we collect, use and protect your data. UK GDPR / DPA 2018 / DUAA 2025 compliant. Updated April 2026.` | `WebPage` (canonical: `/legal/privacy`) |
| `/legal/cookies` | `Cookie policy — Whalesborough` | `What cookies we set, why, how long they last, and how to refuse them. PECR / DUAA 2025 compliant.` | `WebPage` |
| `/legal/terms` | `Terms & conditions — Whalesborough` | `Booking, payment, cancellation and behaviour terms. Consumer Contracts Regulations 2013 compliant.` | `WebPage` |
| `/legal/accessibility` | `Accessibility statement — Whalesborough` | `Our WCAG 2.2 Level AA conformance, known issues, and how to request adjustments.` | `WebPage` |
| `/legal/modern-slavery` | `Modern Slavery statement — Whalesborough` | `Our 2026 statement under the UK Modern Slavery Act 2015. Annual disclosure required for £36m+ turnover.` | `WebPage` |
| `/legal/sustainability-claims` | `Sustainability claims — Whalesborough` | `Verification and methodology for every environmental claim on this site. DMCC Act 2024 compliant.` | `WebPage` |

### 12.3 System pages

| File | Notes |
|---|---|
| `/robots.txt` | See `_robots_txt_recommendation` in `seo-json-ld-templates.json`. AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) explicitly allowed for public pages only. |
| `/sitemap.xml` | Sitemap index pointing to 9 child sitemaps. Each child < 50,000 URLs per sitemaps.org. |
| `/sitemap-images.xml` | Dedicated image sitemap with `<image:image>` per hero image and gallery. |
| `/manifest.webmanifest` | PWA manifest. Icon set: 48, 72, 96, 144, 192, 256, 384, 512px PNG + maskable variant. Start URL: `/`. Theme: `#fbf9f6` light, `#1b1c1a` dark. |
| `/404` | `Title: Page not found — Whalesborough`. Description: `That page has moved or never existed. Search the estate or browse cottages.` JSON-LD: none. |
| `/500` | `Title: Something went wrong — Whalesborough`. Robots: `noindex, nofollow`. |
| `/offline` | PWA offline shell. `noindex, follow`. |

### 12.4 Sitemap segmentation (Google guidance)

Per Google's December 2024 guidance and sitemaps.org: each sitemap caps at 50,000 URLs or 50MB uncompressed. With ~107 user-facing routes plus dynamic plot, treatment, walk, POI, article and tag pages, the full URL set sits around 600–1,200 URLs in year one and 2,500–4,000 by year three. We segment for diagnostic granularity, not size.

| Sitemap | Routes | Refresh |
|---|---|---|
| `sitemap-core.xml` | `/`, `/about/*`, `/contact/*`, sustainability hub & spokes, legal | Monthly |
| `sitemap-stay.xml` | All `/stay/*` (excluding booking flow) | Weekly |
| `sitemap-spa.xml` | All `/spa/*` (excluding booking flow) | Weekly |
| `sitemap-dine.xml` | All `/dine/*` (excluding reserve flow) | Weekly |
| `sitemap-own.xml` | All `/own/*` (excluding download tokens) | Monthly |
| `sitemap-estate.xml` | All `/estate/*` (excluding activity booking) | Monthly |
| `sitemap-journal.xml` | All `/journal/*` | Weekly |
| `sitemap-legal.xml` | `/legal/*` | Quarterly |
| `sitemap-images.xml` | Per-page hero and gallery imagery | Weekly |

### 12.5 IndexNow submission

Implement IndexNow per Bing's guidance. POST `https://api.indexnow.org/indexnow` with the JSON payload of changed URLs on each publish event. Bing, Yandex, Seznam and Naver consume this. Google does not, but the cost is zero.

### 12.6 hreflang strategy

- Default `en-GB` self-references on every public page.
- `x-default` set to the same en-GB URL.
- Future-proof: when we add `en-US` (US source-market guests), `nl-NL` (Netherlands second-largest international segment), `de-DE` and `fr-FR`, swap the `alternates.languages` map. No URL pattern change needed.

---

## 13. Validation checklist

Before launch, every page type must pass:

1. **Schema Markup Validator** (https://validator.schema.org) — zero errors, warnings reviewed.
2. **Google Rich Results Test** (https://search.google.com/test/rich-results) — eligible for at least one rich-result type per page.
3. **Bing URL Inspection** — same payload reads cleanly in Bing.
4. **AI Overviews canary search** — type the home-page H1 verbatim into Google; the SERP AI Overview surface citing the resort should appear within 2–4 weeks of launch.
5. **OG preview** — `https://www.opengraph.xyz/` or Slack DM preview confirms the OG title, description and image render correctly.
6. **Twitter Card Validator** (deprecated by X but still works for Slack/Discord previews) — confirms `summary_large_image`.
7. **Lighthouse SEO score** — 100/100 across the route sample (homepage, a cottage, a treatment, a journal post, an FAQ page).
8. **Manual head audit** — every page has exactly one `<title>`, one canonical, one description, one OG image, one Twitter card and one structured-data block.

---

## Appendix A — Persona/size facet pages and canonical strategy

Facet pages are an SEO hazard because they multiply thin content. The rule we apply at Whalesborough:

1. If the page has **≥250 words of unique editorial copy** (a description of the persona, two-three signature properties, a use-case scenario) — **self-canonical**, `index, follow`.
2. If the page is **purely filtered output of the parent collection** — `canonical` to the parent collection, `index, follow` (we want the link equity, not the SERP entry).
3. If the page is **a sort, pagination or compare-state URL** — `canonical` to the parent and `noindex, follow` for pagination beyond page 2.

Apply this to:
- `/stay/cottages/by-size/sleeps-N` (see §6.3)
- `/stay/cottages/by-persona/[persona]` (see §6.4)
- `/spa/treatments/category/[slug]` (4 categories — all self-canonical with editorial)
- `/spa/products/category/[slug]`
- `/dine/menus/[type]` (all self-canonical — each menu is unique content)
- `/journal/tag/[slug]` — canonical to parent unless the tag has ≥10 articles

---

## Appendix B — `/own` FCA-compliant copy rules (do not skip)

These rules apply to every meta description, OG description, and Twitter description across the `/own/*` silo. They are derived from the FCA Conduct of Business Sourcebook (COBS 4), FSMA 2000 s.21 (Financial Promotions), and the ASA's Luxury Lodge Estates ruling (April 2024).

### B.1 Forbidden words (across `/own/*` meta)

The following words **may not appear** in any `/own/*` title or description:

- `investment` (standalone noun)
- `guaranteed` / `guarantee` / `guaranteed return` / `guaranteed yield` / `guaranteed rental income`
- `% return` (without "historic", "gross", "averaged", or "indicative" qualifier within the same 30 characters)
- `risk-free`
- `wealth`
- `tax-efficient` (without explicit "subject to your circumstances" qualifier)

### B.2 Required-pairing patterns

Where any of the following terms appear, they **must** be paired with one of the listed qualifying phrases in the same description, OG description, or Twitter description:

| Term | Required adjacent phrase |
|---|---|
| `income`, `returns`, `yield` | `capital at risk` OR `past performance is not a guide` OR `historic, gross` |
| `% figures` | `historic, gross, averaged` |
| `let`, `letting`, `letted` | `optional` OR `at the owner's discretion` |
| `appreciation`, `growth` | `not guaranteed` OR `may rise or fall` |

### B.3 Description templates (drop into CMS as locked fields)

For `/own` and child pages, use only these description shells. Replace `{n}` with the specific value:

- `/own`: `{n} residences across four ranges on a 450-acre working Cornish farm. 125-year licence. Lifestyle purchase. Not an investment.`
- `/own/rental-income`: `Optional managed letting for owner-residences. Historic gross income figures. Capital at risk. Past performance is not a guide.`
- `/own/rental-income/calculator`: `An illustrative calculator showing historic gross income across managed-letting units. Not an investment. Capital at risk.`
- `/own/costs`: `Purchase price, site fees, utilities, insurance, council tax position. The full annual running cost, published. Lifestyle purchase.`
- `/own/lodges/[range]`: `{n} bedrooms. BS 3632 timber-frame. 125-year licence. Lifestyle purchase. Guide prices from £{n,nnn,nnn}.`

### B.4 Pre-launch sign-off

Every meta description in `/own/*` requires sign-off from:

1. Head of Sales (Lee Lewis) — commercial accuracy of figures.
2. Specialist FCA legal counsel — compliance with FSMA s.21 and FCA COBS 4.
3. Compliance officer — ASA / DMCC Act 2024 readiness.

Three signatures, dated, before the route ships. The legal counsel sign-off must be re-obtained if any meta description in `/own/*` is edited after launch.

---

## Appendix C — Performance & Core Web Vitals impact

Per the Technical SEO & Schema Brief, the May 2026 Core Update tightened LCP to 2.0s and codified INP at 150ms. Our metadata payload is engineered to add **zero** weight to that budget:

- Each JSON-LD block: 1–4KB gzipped. Total per page: <10KB.
- `<Script>` strategy: `afterInteractive` — JSON-LD is parsed after first paint, not before.
- No additional meta tags require a render-blocking external lookup. All preconnect / dns-prefetch hints are deliberate, not speculative.
- OG images: AVIF with JPG fallback; the social-scraper-friendly version sits on a separate CDN path with no JS.

Net SEO payload cost: <3% of the 150KB initial-JS budget set by the brief.

---

## Appendix D — Cottage description CSV (engineer-ready)

A flat CSV of every cottage's `metaTitle`, `metaDescription`, `ogTitle`, `ogDescription`, `twitterTitle`, `twitterDescription`, `canonicalUrl`, and `heroImage` will be supplied separately as `seo-content.csv` for direct CMS import. The same applies to:

- `seo-content-arvor.csv` (5 suite types + 7 packages)
- `seo-content-treatments.csv` (29 treatments + 4 categories)
- `seo-content-spadays.csv` (14 day packages)
- `seo-content-events.csv` (6 events)
- `seo-content-pois.csv` (12 POIs)
- `seo-content-walks.csv` (12 walks — pending walk inventory finalisation)

Each CSV references the per-route template ID from `seo-json-ld-templates.json` so the CMS can compose the final JSON-LD payload at render time without a per-route code change.

---

## Appendix E — Migration & SEO-redirect plan

When the new site replaces the current Whalesborough.com / Landal-hosted pages, the following 301 redirects must ship in `netlify.toml` / `next.config.js` / Cloudflare worker:

| Legacy URL pattern | New URL |
|---|---|
| `/our-cottages/{slug}` | `/stay/cottages/{slug}` |
| `/cottages/{slug}` | `/stay/cottages/{slug}` |
| `/arvor-suites/{slug}` | `/stay/arvor-suites/{slug}` |
| `/spa-and-facilities/*` | `/spa` |
| `/the-weir/*` | `/dine` |
| `/holiday-home-investment*` | `/own` |
| `/guarenteed-rental-income` *(typo)* | `/own/rental-income` |
| `/holidays-and-breaks/{slug}` | `/stay/holiday-types/{slug}` |
| `/activities-and-local-area/*` | `/estate/local-area` |
| `/dog-friendly-holidays/*` | `/estate/dog-friendly` |
| `/sustainability/*` | `/about/sustainability` |

All redirects are 301 (permanent) per Google's December 2024 guidance on consolidating link equity. Test in staging via `curl -sI {legacy-url} | grep -i location` before cut-over.

---

*Document compiled 14 May 2026 by Peake Management for Whalesborough Farm Resort & Spa. Ship-readiness review pending: FCA legal counsel (`/own/*`), brand-voice review (Whalesborough marketing director), engineer review (frontend lead).*
