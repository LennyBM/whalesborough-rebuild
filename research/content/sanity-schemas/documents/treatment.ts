/**
 * treatment — individual spa treatment / ritual.
 * Modelled directly on the YAML front-matter blocks in spa-treatments.md.
 */

import { defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons";

export const treatment = defineType({
  name: "treatment",
  title: "Spa treatment",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "identity", title: "Identity" },
    { name: "duration", title: "Duration & price" },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "suitability", title: "Suitability" },
    { name: "booking", title: "Booking" },
    { name: "seo", title: "SEO & audit" },
  ],
  fields: [
    /* ----------------------------- IDENTITY ------------------------------- */
    defineField({
      name: "name",
      title: "Display name",
      type: "string",
      group: "identity",
      description: "e.g. 'The Gaia Calming Journey'.",
      validation: (Rule) => Rule.required().max(100),
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
      name: "category",
      title: "Category",
      type: "reference",
      group: "identity",
      to: [{ type: "spaCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tryBeServiceId",
      title: "Try.be service ID",
      type: "string",
      group: "identity",
      description: "Used to deep-link booking from the treatment page.",
    }),

    /* ------------------------- DURATION & PRICE --------------------------- */
    defineField({
      name: "durationMinutes",
      title: "Duration (min)",
      type: "number",
      group: "duration",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(15)
          .max(360)
          .error("Treatments are typically 15–360 minutes."),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "priceField",
      group: "duration",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "upgrades",
      title: "Upgrades available",
      description: "e.g. 'Extend to 90 min — adds Indian Head + facial cleanse'.",
      type: "array",
      group: "duration",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Upgrade label", type: "string" },
            {
              name: "additionalDurationMinutes",
              title: "Additional minutes",
              type: "number",
            },
            {
              name: "additionalPricePence",
              title: "Additional price (pence)",
              type: "number",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
          ],
        },
      ],
    }),

    /* ------------------------------ CONTENT ------------------------------- */
    defineField({
      name: "bluf",
      title: "BLUF — bottom-line summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().min(30).max(320),
    }),
    defineField({
      name: "description",
      title: "Description (long-form, editorial)",
      type: "portableText",
      group: "content",
    }),
    defineField({
      name: "pullQuote",
      title: "Pull quote (italicised line)",
      type: "string",
      group: "content",
      description:
        "The one-line evocation under the BLUF. e.g. 'Lavender from the market garden, warm hands, sixty minutes that don't ask anything of you.'",
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "whatYouFeel",
      title: "'What you feel' paragraph",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "fromTheEstate",
      title: "From the estate — botanical credits",
      description:
        "Plants / ingredients sourced from the Whalesborough walled market garden.",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "ingredient", title: "Ingredient", type: "string" },
            { name: "sourcedFrom", title: "Sourced from", type: "string" },
            { name: "note", title: "Note", type: "string" },
          ],
        },
      ],
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

    /* ----------------------------- SUITABILITY ---------------------------- */
    defineField({
      name: "suitableFor",
      title: "Suitable for",
      type: "array",
      group: "suitability",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "First-time spa guest", value: "first-time" },
          { title: "Regular spa-goer", value: "regular" },
          { title: "Men", value: "men" },
          { title: "Women", value: "women" },
          { title: "Couples (side-by-side available)", value: "couples" },
          { title: "Pregnancy (2nd / 3rd trimester)", value: "pregnancy" },
          { title: "Teens (13+ with adult)", value: "teens" },
        ],
      },
    }),
    defineField({
      name: "contraindications",
      title: "Contraindications",
      description:
        "Medical / physical reasons not to book. Required for ANY massage or body treatment.",
      type: "array",
      group: "suitability",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bringInstructions",
      title: "What to bring",
      type: "string",
      group: "suitability",
      initialValue: "Nothing — robe, slippers and disposable underwear provided.",
    }),
    defineField({
      name: "wearInstructions",
      title: "What to wear",
      type: "string",
      group: "suitability",
    }),
    defineField({
      name: "ageMinimum",
      title: "Minimum age",
      type: "number",
      group: "suitability",
      initialValue: 13,
      validation: (Rule) => Rule.integer().min(0).max(99),
    }),
    defineField({
      name: "ageMinimumNote",
      title: "Age minimum note",
      type: "string",
      group: "suitability",
      description:
        "e.g. 'Adults-only spa floor. Teens 13+ welcome with accompanying adult and parental consent.'",
    }),

    /* ------------------------------ BOOKING ------------------------------- */
    defineField({
      name: "leadTimeHours",
      title: "Booking lead time (hours)",
      type: "number",
      group: "booking",
      initialValue: 24,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "cancellationTerms",
      title: "Cancellation terms",
      type: "text",
      rows: 3,
      group: "booking",
    }),
    defineField({
      name: "memberDiscountPercent",
      title: "Member discount %",
      type: "number",
      group: "booking",
      initialValue: 15,
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "booking",
      options: {
        list: [
          { title: "Bookable", value: "bookable" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Seasonal — paused", value: "seasonal-paused" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "bookable",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      group: "booking",
      initialValue: 100,
    }),

    /* ---------------------------- SEO & AUDIT ----------------------------- */
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit", group: "seo" }),
  ],
  orderings: [
    {
      title: "Category, then sort order",
      name: "categorySort",
      by: [
        { field: "category._ref", direction: "asc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
    {
      title: "Duration (short → long)",
      name: "durationAsc",
      by: [{ field: "durationMinutes", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      duration: "durationMinutes",
      weekday: "price.weekday",
      media: "heroImage.image",
    },
    prepare({ title, duration, weekday, media }) {
      return {
        title,
        subtitle: `${duration ?? "?"} min • £${((weekday ?? 0) / 100).toFixed(0)}`,
        media,
      };
    },
  },
});
