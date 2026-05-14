# Whalesborough Sanity Studio Schemas

Production-ready Sanity Studio v4 schemas (TypeScript) for the Whalesborough Farm Resort & Spa CMS.

35 schema files. ~3,000 lines of TypeScript.

---

## Install

1. Copy `documents/`, `objects/`, and `index.ts` into your Studio's `schemas/` folder:

   ```
   studio/
     schemas/
       documents/...
       objects/...
       index.ts          <-- exports schemaTypes
     sanity.config.ts
   ```

2. Wire it up in `sanity.config.ts`:

   ```ts
   import { defineConfig } from "sanity";
   import { schemaTypes } from "./schemas";

   export default defineConfig({
     projectId: "your-project-id",
     dataset: "production",
     plugins: [/* deskTool(), visionTool() */],
     schema: { types: schemaTypes },
   });
   ```

3. Pin singletons in the desk structure (`structure.ts`):

   ```ts
   import { SINGLETON_TYPES } from "./schemas";

   export const structure = (S) =>
     S.list()
       .title("Whalesborough")
       .items([
         S.listItem()
           .title("Site settings")
           .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
         S.listItem()
           .title("Navigation")
           .child(S.document().schemaType("navigation").documentId("navigation")),
         S.listItem()
           .title("Homepage")
           .child(S.document().schemaType("homepage").documentId("homepage")),
         S.listItem()
           .title("SEO defaults")
           .child(S.document().schemaType("seoDefaults").documentId("seoDefaults")),
         S.divider(),
         // ...all other types as lists
         ...S.documentTypeListItems().filter(
           (li) => !SINGLETON_TYPES.has(li.getId() as string),
         ),
       ]);
   ```

---

## Schema map (35 files)

### Singletons (4)
- `siteSettings` — resort identity, contact, social, legal disclosures, STL register
- `navigation` — header mega-menu, footer columns, sticky CTAs
- `homepage` — hero + seasonal vibes + entry cards + proof + journal
- `seoDefaults` — title template, default description, OG image, AI-crawler policy

### Accommodation (3)
- `property` — Cottage / Arvor / Spa Lodge (34 units, 3-level taxonomy)
- `amenity` — referenced from property; drives filter facets
- `arvorPackage` — pre-built Arvor stay packages

### Spa (4)
- `spaCategory` — Rituals / Facials / Body & Massage / Hands & Feet
- `treatment` — modelled on `spa-treatments.md` YAML blocks
- `spaPackage` — multi-service spa days with hour-by-hour itinerary
- `membershipTier` — W Club Spa paid memberships

### Restaurant (5)
- `menu` — breakfast / lunch / dinner / drinks / kids / dogs
- `menuSection` — sections within a menu
- `menuItem` — dishes with UK-14 allergens + dietary tags
- `supplier` — local farms / producers credited on menus
- `restaurantEvent` — supper clubs, wine dinners, festive

### Lodge sales (3) — FCA-gated
- `lodgeModel` — Gwelva / Trelowen / Tevi (FCA review BOOLEAN GATE blocks publish)
- `lodgePlot` — individual master-plan plots
- `lodgeOffer` — buyer incentives

### Activities (1)
- `activity` — bookable on-estate experiences with RRULE schedule

### Content (5)
- `page` — generic CMS pages (legal, marketing, AI-mega)
- `journalArticle` — long-form editorial with BLUF + FAQs for GEO
- `author` — journal authors
- `faq` — single FAQ; powers FAQPage schema
- `localAreaPOI` — beaches, walks, gardens nearby

### Marketing (3)
- `banner` — site-wide announcement strip
- `offer` — promotions / discounts
- `seasonalContent` — homepage vibe overrides

### Sustainability (2)
- `sustainabilityMetric` — auditable metric with source + methodology
- `award` — awards / press accolades

### Loyalty (2)
- `giftVoucherProduct` — monetary + experience vouchers
- `loyaltyTier` — automatic loyalty bands

### Objects (10)
- `ctaButton` `seo` `imageWithAlt` `audit` `address` `socialLink`
- `portableText` `openingHours` `priceField` `linkRef`

---

## Design conventions

- **Money** always in pence (integer). Never floats.
- **Slugs** auto-generated; manual override allowed.
- **References** never embedded. Use `reference` for many-to-many relationships.
- **Alt text** required on every image (`imageWithAlt`) — WCAG 2.2 AA.
- **Portable Text** is the body type. Includes the gold-accent highlight mark.
- **BLUF** (Bottom-Line Up Front) field on every long-form type — drives AI citation.
- **Audit** object on every document — captures publishStatus, flagsForReview,
  lastVerifiedAt, lastEditedBy.
- **STL registration** on every bookable property (Cornwall 2026 law).
- **FCA review gate** on lodge sales — content blocks publishing until reviewed.

---

## Critical fields, in every document

Every document carries an `audit` object with:

- `publishStatus` — draft / in_review / approved / published / archived
- `flagsForReview` — multi-tick FCA / Legal / Marketing / Verify / A11y / Photo
- `lastVerifiedAt`, `lastVerifiedBy` — for prices/hours/claims freshness
- `lastEditedAt`, `lastEditedBy` — auto-populated via on-save hook
- `internalNotes` — editor scratchpad

And an `seo` object with title / description / OG image / canonical / no-index /
robots / JSON-LD override.

---

## Front-end consumption hints

- Sustainability + FCA gating: the front-end MUST cross-check
  `lodgeModel.fcaComplianceReviewed` before rendering any `lodgePlot.projectedYieldPencePerYear`
  or `lodgePlot.projectedOccupancyPercent`.
- Seasonal vibe selection: query `seasonalContent` by `activeFrom`/`activeUntil`
  containing today, fall back to `homepage.seasonalVibes`.
- Member rate: anonymous users see `price.weekday`; logged-in members see
  `price.weekday × (1 - memberDiscountPercent / 100)`.
- Calorie display: `menuItem.calories` is required only if Calorie Labelling
  Regulations 2021 apply. Set audit flag if exempt.

---

## Tested against (May 2026)

- Sanity Studio v4 with `defineType` / `defineField` builders
- `@sanity/icons` v3+
- Portable Text v3
- Editor experience tested against Chrome 137 + Firefox 135.

Maintained by Peake Management for Whalesborough Farm Resort & Spa.
