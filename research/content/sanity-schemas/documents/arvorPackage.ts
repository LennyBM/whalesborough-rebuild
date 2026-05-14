/**
 * arvorPackage — pre-built Arvor stay packages.
 * e.g. "Arvor + Spa Day", "Arvor Coastal Walk Weekender".
 */

import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

export const arvorPackage = defineType({
  name: "arvorPackage",
  title: "Arvor package",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "name",
      title: "Package name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow line",
      description: "Short label above the title — e.g. 'Two nights · Couples'.",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: "bluf",
      title: "BLUF — one-paragraph summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "description",
      title: "Description (long-form)",
      type: "portableText",
    }),
    defineField({
      name: "inclusions",
      title: "Inclusions (what's in the package)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Item", type: "string" },
            {
              name: "detail",
              title: "Detail (e.g. 'Tasting menu for two')",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(2),
    }),
    defineField({
      name: "exclusions",
      title: "Exclusions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "pricePence",
      title: "Package price (pence)",
      type: "number",
      validation: (Rule) =>
        Rule.required().integer().min(0),
    }),
    defineField({
      name: "memberPricePence",
      title: "Member price (pence)",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "durationNights",
      title: "Duration (nights)",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(14),
    }),
    defineField({
      name: "eligibleProperties",
      title: "Eligible properties",
      type: "array",
      of: [{ type: "reference", to: [{ type: "property" }] }],
    }),
    defineField({
      name: "availableFrom",
      title: "Available from",
      type: "date",
    }),
    defineField({
      name: "availableUntil",
      title: "Available until",
      type: "date",
    }),
    defineField({
      name: "blackoutDates",
      title: "Blackout dates",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "from", title: "From", type: "date" },
            { name: "to", title: "To", type: "date" },
            { name: "reason", title: "Reason", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "termsAndConditions",
      title: "Terms & conditions",
      type: "portableText",
    }),
    defineField({
      name: "leadTimeHours",
      title: "Minimum lead time (hours)",
      type: "number",
      initialValue: 48,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Sold out", value: "sold-out" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "active",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      title: "name",
      price: "pricePence",
      nights: "durationNights",
      media: "heroImage.image",
    },
    prepare({ title, price, nights, media }) {
      return {
        title,
        subtitle: `${nights ?? "?"} nights • £${((price ?? 0) / 100).toFixed(0)}`,
        media,
      };
    },
  },
});
