/**
 * property — Cottage / Arvor / Spa Lodge. The most important content type on the site.
 *
 * Each unit page (Whalesborough Farmhouse, Arvor Suite 1.0, etc.) is one document.
 * Field set built against unit-inventory-complete.md (34 units, 3-level taxonomy).
 */

import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const property = defineType({
  name: "property",
  title: "Property (cottage / Arvor / lodge)",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "identity", title: "Identity" },
    { name: "category", title: "Category & capacity" },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "amenities", title: "Amenities" },
    { name: "location", title: "Location" },
    { name: "pricing", title: "Pricing & integrations" },
    { name: "legal", title: "Legal (STL)" },
    { name: "seo", title: "SEO & audit" },
  ],
  fields: [
    /* ----------------------------- IDENTITY ------------------------------- */
    defineField({
      name: "name",
      title: "Unit name",
      description:
        "Public-facing name. e.g. 'Whalesborough Farmhouse', 'Arvor Suite 1.0'.",
      type: "string",
      group: "identity",
      validation: (Rule) =>
        Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline (one-line description)",
      description:
        "Editorial one-liner — appears on listing cards. Max 120 chars.",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required().max(120),
    }),

    /* ------------------------- CATEGORY & CAPACITY ------------------------ */
    defineField({
      name: "level1Category",
      title: "Level 1 — Stay type (top nav)",
      type: "string",
      group: "category",
      options: {
        list: [
          { title: "Arvor Apartments", value: "arvor" },
          { title: "Cottages & Lodges", value: "cottages" },
          { title: "Signature Properties", value: "signature" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level2Subtype",
      title: "Level 2 — Sub-type",
      type: "string",
      group: "category",
      description:
        "Arvor: Studio / Wetroom Studio / Suite / Family Duplex / Penthouse. " +
        "Cottages: Couples / Standard / Spa / Premium / Large. " +
        "Signature: Heritage / Villa / Group.",
      options: {
        list: [
          { title: "Arvor — Studio", value: "arvor-studio" },
          { title: "Arvor — Wetroom Studio (accessible)", value: "arvor-wetroom" },
          { title: "Arvor — Suite", value: "arvor-suite" },
          { title: "Arvor — Family Duplex", value: "arvor-duplex" },
          { title: "Arvor — Penthouse", value: "arvor-penthouse" },
          { title: "Cottage — Couples (1-bed)", value: "cottage-couples" },
          { title: "Cottage — Standard", value: "cottage-standard" },
          { title: "Cottage — Spa", value: "cottage-spa" },
          { title: "Cottage — Premium", value: "cottage-premium" },
          { title: "Cottage — Large Spa", value: "cottage-large-spa" },
          { title: "Signature — Heritage", value: "signature-heritage" },
          { title: "Signature — Villa", value: "signature-villa" },
          { title: "Signature — Group", value: "signature-group" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sleeps",
      title: "Sleeps (max)",
      type: "number",
      group: "category",
      validation: (Rule) =>
        Rule.required().integer().min(1).max(20),
    }),
    defineField({
      name: "sleepsWithCot",
      title: "Sleeps incl. cot",
      description: "If a cot adds an extra sleeping place.",
      type: "number",
      group: "category",
      validation: (Rule) => Rule.integer().min(0).max(20),
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      group: "category",
      validation: (Rule) => Rule.required().integer().min(1).max(10),
    }),
    defineField({
      name: "bedroomConfig",
      title: "Bedroom configuration",
      description:
        "e.g. '1 super-king + twin', '2 king ensuites + dorm + single'.",
      type: "string",
      group: "category",
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      group: "category",
      validation: (Rule) => Rule.required().integer().min(1).max(10),
    }),
    defineField({
      name: "sizeSqm",
      title: "Floor area (m²)",
      type: "number",
      group: "category",
      validation: (Rule) => Rule.positive().max(500),
    }),
    defineField({
      name: "storeys",
      title: "Storeys",
      type: "string",
      group: "category",
      options: {
        list: [
          { title: "Single-storey", value: "single" },
          { title: "Two-storey", value: "two" },
          { title: "Duplex", value: "duplex" },
        ],
      },
    }),
    defineField({
      name: "hasHotTub",
      title: "Has hot tub",
      type: "boolean",
      group: "category",
      initialValue: false,
    }),
    defineField({
      name: "maxDogs",
      title: "Max dogs allowed",
      type: "number",
      group: "category",
      description:
        "0 = no dogs. Most cottages allow unlimited (set 99). Some cap at 1 or 2.",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0).max(99),
    }),
    defineField({
      name: "accessibility",
      title: "Accessibility features",
      type: "array",
      group: "category",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Mobility-adapted", value: "mobility" },
          { title: "Step-free entry", value: "step-free" },
          { title: "Walk-in shower with grab rails", value: "walk-in-shower" },
          { title: "Ground-floor master bedroom", value: "ground-floor-master" },
          { title: "Wide doorways (≥ 800mm)", value: "wide-doorways" },
          { title: "Hearing-loop / vibrating fire alarm", value: "hearing-loop" },
          { title: "Visual fire alarm", value: "visual-alarm" },
        ],
        layout: "grid",
      },
    }),

    /* ------------------------------ CONTENT ------------------------------- */
    defineField({
      name: "bluf",
      title: "BLUF — Bottom-line summary",
      description:
        "AI-search-friendly 1–2 sentence answer to 'what is this property?'. " +
        "Appears at the top of the page and in FAQ schema.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) =>
        Rule.required().min(40).max(280).warning("BLUF must be 40–280 chars."),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description (card / listing)",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "narrative",
      title: "Narrative description (long-form)",
      description: "Coastal Editorial voice. Portable Text — sections, quotes, images, CTAs.",
      type: "portableText",
      group: "content",
    }),
    defineField({
      name: "highlightFeatures",
      title: "Highlight features (5 max — used on card)",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "perfectFor",
      title: "Perfect for (audience tags)",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Couples — escape", value: "couples-escape" },
          { title: "Couples — special occasion", value: "couples-occasion" },
          { title: "Young families", value: "families-young" },
          { title: "Multi-gen families", value: "families-multi-gen" },
          { title: "Friends getaway (4–6)", value: "friends-getaway" },
          { title: "Large groups (8–10)", value: "groups-large" },
          { title: "Dog owners", value: "dog-owners" },
          { title: "Accessibility-led trip", value: "accessibility" },
          { title: "Wellness focus", value: "wellness" },
          { title: "Working remote", value: "remote-work" },
        ],
      },
    }),

    /* ------------------------------- MEDIA -------------------------------- */
    defineField({
      name: "heroImage",
      title: "Hero image (LCP)",
      type: "imageWithAlt",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery (ordered)",
      description:
        "Drag to reorder. First 6 images preloaded. Each requires alt text (WCAG 2.2 AA).",
      type: "array",
      group: "media",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) =>
        Rule.min(6)
          .max(40)
          .error("Min 6, max 40 gallery images per property."),
    }),
    defineField({
      name: "virtualTourUrl",
      title: "360° / virtual tour URL",
      type: "url",
      group: "media",
      description: "Matterport / Kuula / iStaging embed URL.",
    }),
    defineField({
      name: "floorPlanUrl",
      title: "Floor plan (PDF or image)",
      type: "file",
      group: "media",
    }),
    defineField({
      name: "videoUrl",
      title: "Walkthrough video URL",
      type: "url",
      group: "media",
    }),

    /* ----------------------------- AMENITIES ------------------------------ */
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      group: "amenities",
      of: [{ type: "reference", to: [{ type: "amenity" }] }],
      validation: (Rule) =>
        Rule.unique().min(5).warning("Most properties have 15–30 amenities."),
    }),

    /* ------------------------------ LOCATION ------------------------------ */
    defineField({
      name: "locationOnEstate",
      title: "Location on estate (text)",
      description:
        "Editorial copy — e.g. 'A two-minute walk from the spa, set behind the walled garden.'",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      group: "location",
      validation: (Rule) => Rule.min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      group: "location",
      validation: (Rule) => Rule.min(-180).max(180),
    }),
    defineField({
      name: "what3words",
      title: "what3words",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "distanceToSpaMetres",
      title: "Distance to spa (m)",
      type: "number",
      group: "location",
    }),
    defineField({
      name: "distanceToRestaurantMetres",
      title: "Distance to restaurant (m)",
      type: "number",
      group: "location",
    }),
    defineField({
      name: "distanceToCarParkMetres",
      title: "Distance to nearest car park (m)",
      type: "number",
      group: "location",
    }),

    /* ------------------------ PRICING & INTEGRATIONS ---------------------- */
    defineField({
      name: "basePricingPence",
      title: "Base nightly price (pence, indicative)",
      description:
        "Indicative starting price for display only. Real prices come from Landal.",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "GBP",
      group: "pricing",
      readOnly: true,
    }),
    defineField({
      name: "landalCode",
      title: "Landal type code",
      description:
        "e.g. 8ELP1 (Whalesborough Farmhouse). Used to deep-link to Landal booking.",
      type: "string",
      group: "pricing",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "landalBookingUrl",
      title: "Landal direct-booking URL",
      type: "url",
      group: "pricing",
    }),
    defineField({
      name: "status",
      title: "Booking status",
      type: "string",
      group: "pricing",
      options: {
        list: [
          { title: "Bookable", value: "bookable" },
          { title: "Off-market (temporarily)", value: "off-market" },
          { title: "Refurb — return date set", value: "refurb" },
          { title: "Coming soon (2026 opening)", value: "coming-soon" },
          { title: "Decommissioned", value: "decommissioned" },
        ],
        layout: "radio",
      },
      initialValue: "bookable",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "statusNote",
      title: "Status note (public)",
      type: "string",
      group: "pricing",
    }),

    /* -------------------------------- LEGAL ------------------------------- */
    defineField({
      name: "stlRegistrationNumber",
      title: "STL registration number",
      description:
        "Cornwall Short-Term Letting register number. MUST appear on the public page (legal requirement from 2026).",
      type: "string",
      group: "legal",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as { status?: string } | undefined;
          if (parent?.status === "bookable" && !value) {
            return "STL number required for bookable properties.";
          }
          return true;
        }),
    }),
    defineField({
      name: "stlExpiresAt",
      title: "STL expires at",
      type: "date",
      group: "legal",
    }),
    defineField({
      name: "epcRating",
      title: "EPC rating",
      type: "string",
      group: "legal",
      options: {
        list: ["A", "B", "C", "D", "E", "F", "G"],
      },
    }),
    defineField({
      name: "epcCertificateUrl",
      title: "EPC certificate PDF",
      type: "file",
      group: "legal",
    }),

    /* ------------------------- SCHEMA OVERRIDES --------------------------- */
    defineField({
      name: "schemaOverrides",
      title: "JSON-LD schema overrides",
      description:
        "Optional override to LodgingBusiness / Accommodation JSON-LD. Advanced only.",
      type: "text",
      rows: 8,
      group: "seo",
    }),
    defineField({
      name: "relatedProperties",
      title: "Related properties (manual cross-link)",
      type: "array",
      group: "seo",
      of: [{ type: "reference", to: [{ type: "property" }] }],
      validation: (Rule) => Rule.max(6).unique(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit", group: "seo" }),
  ],
  orderings: [
    {
      title: "Sleeps (low → high)",
      name: "sleepsAsc",
      by: [{ field: "sleeps", direction: "asc" }],
    },
    {
      title: "Sleeps (high → low)",
      name: "sleepsDesc",
      by: [{ field: "sleeps", direction: "desc" }],
    },
    {
      title: "Name A→Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      sleeps: "sleeps",
      l1: "level1Category",
      media: "heroImage.image",
      status: "status",
    },
    prepare({ title, sleeps, l1, media, status }) {
      return {
        title,
        subtitle: `${l1 ?? "—"} • Sleeps ${sleeps ?? "?"} • ${status ?? "—"}`,
        media,
      };
    },
  },
});
