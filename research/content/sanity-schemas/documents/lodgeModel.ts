/**
 * lodgeModel — a model of lodge sold to private buyers.
 * e.g. 'Trelowen 3-bed', 'Gwelva Villa', 'Tevi Luxury Lodge'.
 *
 * FCA NOTE: content cannot publish unless FCA_compliance_reviewed_at is set.
 * All yield, return-on-investment, or rental-income claims must be reviewed first.
 */

import { defineField, defineType } from "sanity";
import { HomeIcon as ModelIcon } from "@sanity/icons";

export const lodgeModel = defineType({
  name: "lodgeModel",
  title: "Lodge model (for sale)",
  type: "document",
  icon: BulbOutlineIcon,
  groups: [
    { name: "identity", title: "Identity" },
    { name: "spec", title: "Specification" },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "pricing", title: "Price & ownership" },
    { name: "compliance", title: "Compliance (FCA / Legal)" },
    { name: "seo", title: "SEO & audit" },
  ],
  fields: [
    /* ----------------------------- IDENTITY ------------------------------- */
    defineField({
      name: "code",
      title: "Internal code",
      type: "string",
      group: "identity",
      description: "e.g. TREL-3B-V2.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Display name",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rangeName",
      title: "Range",
      type: "string",
      group: "identity",
      options: {
        list: [
          { title: "Gwelva Luxury Villas", value: "gwelva" },
          { title: "Trelowen Exclusive Lodges", value: "trelowen" },
          { title: "Tevi Luxury Lodges", value: "tevi" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    /* ----------------------------- SPEC ----------------------------------- */
    defineField({
      name: "sleeps",
      title: "Sleeps (max)",
      type: "number",
      group: "spec",
      validation: (Rule) => Rule.required().integer().min(2).max(12),
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      group: "spec",
      validation: (Rule) => Rule.required().integer().min(1).max(6),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      group: "spec",
      validation: (Rule) => Rule.required().integer().min(1).max(6),
    }),
    defineField({
      name: "sizeSqm",
      title: "Floor area (m²)",
      type: "number",
      group: "spec",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "plotSizeSqm",
      title: "Plot size (m²)",
      type: "number",
      group: "spec",
    }),
    defineField({
      name: "constructionMethod",
      title: "Construction method",
      type: "string",
      group: "spec",
      options: {
        list: [
          { title: "Timber-frame lodge (BS 3632)", value: "bs3632" },
          { title: "Brick & block villa", value: "brick-block" },
          { title: "Modular / SIPS panel", value: "sips" },
        ],
      },
    }),
    defineField({
      name: "epcRating",
      title: "EPC rating",
      type: "string",
      group: "spec",
      options: { list: ["A", "B", "C", "D"] },
    }),
    defineField({
      name: "specsTable",
      title: "Specs table",
      description: "Key-value rows displayed in the lodge spec section.",
      type: "array",
      group: "spec",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Spec", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "includedFeatures",
      title: "Included as standard",
      type: "array",
      group: "spec",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "optionalUpgrades",
      title: "Optional upgrades",
      type: "array",
      group: "spec",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Upgrade", type: "string" },
            { name: "pricePence", title: "Price (pence)", type: "number" },
          ],
        },
      ],
    }),

    /* ------------------------------ CONTENT ------------------------------- */
    defineField({
      name: "bluf",
      title: "BLUF",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "description",
      title: "Description (long-form)",
      type: "portableText",
      group: "content",
    }),

    /* ------------------------------- MEDIA -------------------------------- */
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "brochureUrl",
      title: "Brochure PDF",
      type: "file",
      group: "media",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "virtualTourUrl",
      title: "Virtual tour URL",
      type: "url",
      group: "media",
    }),
    defineField({
      name: "floorPlanUrl",
      title: "Floor plan PDF",
      type: "file",
      group: "media",
    }),

    /* -------------------------- PRICE & OWNERSHIP ------------------------- */
    defineField({
      name: "basePricePence",
      title: "Base price (pence)",
      description:
        "Starting price including standard inclusions. £749,950 = 74995000.",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "depositPercent",
      title: "Deposit %",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "groundRentPenceAnnual",
      title: "Ground rent / annual site fee (pence)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "serviceChargePenceAnnual",
      title: "Service charge / year (pence)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "tenureType",
      title: "Tenure",
      type: "string",
      group: "pricing",
      options: {
        list: [
          { title: "999-year leasehold", value: "leasehold-999" },
          { title: "150-year leasehold", value: "leasehold-150" },
          { title: "125-year leasehold", value: "leasehold-125" },
          { title: "Licence agreement (pitch)", value: "licence" },
          { title: "Freehold (villa)", value: "freehold" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subLetEligible",
      title: "Sub-let scheme eligible",
      description: "Owner can let through the resort's letting scheme.",
      type: "boolean",
      group: "pricing",
      initialValue: true,
    }),
    defineField({
      name: "personalUseMaxWeeks",
      title: "Personal-use max weeks / year",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.integer().min(0).max(52),
    }),

    /* ------------------------- COMPLIANCE (FCA / Legal) ------------------- */
    defineField({
      name: "fcaComplianceReviewed",
      title:
        "FCA financial promotion check completed (BLOCKING — content cannot publish without this)",
      type: "boolean",
      group: "compliance",
      initialValue: false,
      description:
        "Lodge sales are not regulated investments — but rental-yield / return claims are " +
        "financial promotions and must be reviewed under FCA s21 FSMA before publishing. " +
        "Tick only when sign-off recorded.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as
            | { audit?: { publishStatus?: string } }
            | undefined;
          if (
            (doc?.audit?.publishStatus === "published" ||
              doc?.audit?.publishStatus === "approved") &&
            !value
          ) {
            return "Cannot publish a lodge model without FCA review sign-off.";
          }
          return true;
        }),
    }),
    defineField({
      name: "fcaComplianceReviewedAt",
      title: "FCA review date",
      type: "datetime",
      group: "compliance",
    }),
    defineField({
      name: "fcaComplianceReviewedBy",
      title: "FCA reviewer name",
      type: "string",
      group: "compliance",
    }),
    defineField({
      name: "fcaReviewNotes",
      title: "FCA review notes (internal)",
      type: "text",
      rows: 4,
      group: "compliance",
    }),
    defineField({
      name: "yieldClaimsAllowed",
      title: "Are yield claims permitted on this content?",
      type: "boolean",
      group: "compliance",
      initialValue: false,
    }),
    defineField({
      name: "legalDisclosure",
      title: "Required legal disclosure paragraph",
      description:
        "Must appear on every page that references rental income or ownership investment.",
      type: "portableText",
      group: "compliance",
    }),

    /* -------------------------------- SEO --------------------------------- */
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "seo",
      options: {
        list: [
          { title: "On sale (now)", value: "on-sale" },
          { title: "Reserve interest", value: "reserve" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Sold out", value: "sold-out" },
          { title: "Withdrawn", value: "withdrawn" },
        ],
      },
      initialValue: "on-sale",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit", group: "seo" }),
  ],
  preview: {
    select: {
      title: "name",
      range: "rangeName",
      price: "basePricePence",
      fca: "fcaComplianceReviewed",
      media: "heroImage.image",
    },
    prepare({ title, range, price, fca, media }) {
      const priceLabel = price
        ? `£${(price / 100).toLocaleString("en-GB")}`
        : "£?";
      const fcaLabel = fca ? "✓ FCA" : "✗ FCA";
      return {
        title,
        subtitle: `${range ?? "—"} • ${priceLabel} • ${fcaLabel}`,
        media,
      };
    },
  },
});
