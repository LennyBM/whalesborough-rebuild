/**
 * lodgePlot — an individual buyable plot on the master plan.
 * Each plot references a lodgeModel and may have its own listing price.
 *
 * Projected-yield fields are blocked unless lodgeModel.fcaComplianceReviewed is true.
 */

import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const lodgePlot = defineType({
  name: "lodgePlot",
  title: "Lodge plot",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "plotNumber",
      title: "Plot number",
      type: "string",
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "plotNumber", maxLength: 40 },
    }),
    defineField({
      name: "model",
      title: "Lodge model",
      type: "reference",
      to: [{ type: "lodgeModel" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Plot status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Reserved (deposit taken)", value: "reserved" },
          { title: "Under offer", value: "under-offer" },
          { title: "Sold", value: "sold" },
          { title: "Coming soon", value: "coming-soon" },
        ],
      },
      initialValue: "available",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "listingPricePence",
      title: "Plot listing price (pence)",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "premiumOverBasePence",
      title: "Plot premium over model base (pence)",
      description: "Plot uplift for view / position. Positive or negative.",
      type: "number",
    }),
    defineField({
      name: "positionDescription",
      title: "Position description",
      description: "e.g. 'South-facing valley view, end of West Terrace, backs onto woodland'.",
      type: "string",
    }),
    defineField({
      name: "outlook",
      title: "Outlook tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Sea view", value: "sea-view" },
          { title: "Valley view", value: "valley-view" },
          { title: "Woodland", value: "woodland" },
          { title: "Walled garden", value: "walled-garden" },
          { title: "Pond / lake", value: "water" },
          { title: "South-facing", value: "south-facing" },
          { title: "West-facing", value: "west-facing" },
          { title: "Private", value: "private" },
        ],
      },
    }),
    defineField({
      name: "mapLat",
      title: "Latitude (on the master plan)",
      type: "number",
    }),
    defineField({
      name: "mapLng",
      title: "Longitude (on the master plan)",
      type: "number",
    }),
    defineField({
      name: "photos",
      title: "Plot photos",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),

    /* ---------------- PROJECTED YIELD (FCA-GATED) ------------------------- */
    defineField({
      name: "projectedYieldPencePerYear",
      title: "Projected gross yield (pence p.a.) — FCA-GATED",
      description:
        "Only renderable on public pages if the linked lodgeModel has FCA review " +
        "and yieldClaimsAllowed=true. The website MUST hide this value otherwise.",
      type: "number",
      readOnly: ({ document }) => {
        // We cannot reach across refs at validation time in Sanity v4, so the front-end
        // must enforce the lodgeModel.fcaComplianceReviewed gate at render. We still
        // keep the field guarded by yieldDisclosureAcknowledged below.
        return !document?.yieldDisclosureAcknowledged;
      },
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "projectedOccupancyPercent",
      title: "Projected occupancy %",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
      readOnly: ({ document }) => !document?.yieldDisclosureAcknowledged,
    }),
    defineField({
      name: "yieldDisclosureAcknowledged",
      title:
        "I confirm the linked lodge model is FCA-reviewed and yieldClaimsAllowed",
      type: "boolean",
      initialValue: false,
      description:
        "Editor self-declaration. Front-end will still cross-check against lodgeModel.fcaComplianceReviewed at render.",
    }),

    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      plot: "plotNumber",
      model: "model.name",
      status: "status",
      price: "listingPricePence",
    },
    prepare({ plot, model, status, price }) {
      const priceLabel = price ? `£${(price / 100).toLocaleString("en-GB")}` : "—";
      return {
        title: `Plot ${plot}`,
        subtitle: `${model ?? "?"} • ${status} • ${priceLabel}`,
      };
    },
  },
});
