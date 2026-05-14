/**
 * spaPackage — multi-service spa days (e.g. Half-Day Calming, Full-Day Estate Ritual).
 * Hour-by-hour itinerary, includes/excludes, lead time, cancellation.
 */

import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const spaPackage = defineType({
  name: "spaPackage",
  title: "Spa package",
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "identity", title: "Identity" },
    { name: "content", title: "Content" },
    { name: "itinerary", title: "Itinerary" },
    { name: "pricing", title: "Pricing & booking" },
    { name: "seo", title: "SEO & audit" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Package name",
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
      name: "eyebrow",
      title: "Eyebrow / kicker",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "bluf",
      title: "BLUF — bottom-line summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "description",
      title: "Description (long-form)",
      type: "portableText",
      group: "content",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "content",
      of: [{ type: "imageWithAlt" }],
    }),

    /* ----------------------------- ITINERARY ------------------------------ */
    defineField({
      name: "itinerary",
      title: "Hour-by-hour itinerary",
      description: "Ordered steps with start time and duration.",
      type: "array",
      group: "itinerary",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "startTime",
              title: "Start time (HH:mm)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "durationMinutes",
              title: "Duration (min)",
              type: "number",
              validation: (Rule) => Rule.required().integer().min(1),
            },
            {
              name: "title",
              title: "Step title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
            {
              name: "treatmentRef",
              title: "Linked treatment (optional)",
              type: "reference",
              to: [{ type: "treatment" }],
            },
            { name: "location", title: "Location on estate", type: "string" },
          ],
          preview: {
            select: { time: "startTime", title: "title", dur: "durationMinutes" },
            prepare({ time, title, dur }) {
              return {
                title: `${time ?? "?"} — ${title ?? "Step"}`,
                subtitle: `${dur ?? "?"} min`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2),
    }),

    /* ------------------------- PRICING & BOOKING -------------------------- */
    defineField({
      name: "pricePence",
      title: "Package price (pence)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "memberPricePence",
      title: "Member price (pence)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "durationHours",
      title: "Duration (hours)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "includes",
      title: "What's included",
      type: "array",
      group: "pricing",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(3),
    }),
    defineField({
      name: "excludes",
      title: "What's NOT included",
      type: "array",
      group: "pricing",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "suitableFor",
      title: "Suitable for",
      type: "array",
      group: "pricing",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "leadTimeHours",
      title: "Lead time (hours)",
      type: "number",
      group: "pricing",
      initialValue: 48,
    }),
    defineField({
      name: "cancellationTerms",
      title: "Cancellation terms",
      type: "text",
      rows: 4,
      group: "pricing",
    }),
    defineField({
      name: "tryBePackageId",
      title: "Try.be package ID",
      type: "string",
      group: "pricing",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "pricing",
      options: {
        list: [
          { title: "Bookable", value: "bookable" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Sold out today", value: "sold-out" },
          { title: "Seasonal — paused", value: "paused" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "bookable",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit", group: "seo" }),
  ],
  preview: {
    select: {
      title: "name",
      hours: "durationHours",
      price: "pricePence",
      media: "heroImage.image",
    },
    prepare({ title, hours, price, media }) {
      return {
        title,
        subtitle: `${hours ?? "?"} h • £${((price ?? 0) / 100).toFixed(0)}`,
        media,
      };
    },
  },
});
