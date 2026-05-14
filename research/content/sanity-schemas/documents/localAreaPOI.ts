/**
 * localAreaPOI — places to visit near the resort (beaches, gardens, towns, walks).
 * Drives the Local Area / Things-to-do landing page.
 */

import { defineField, defineType } from "sanity";
import { CompassIcon } from "@sanity/icons";

export const localAreaPOI = defineType({
  name: "localAreaPOI",
  title: "Local-area place",
  type: "document",
  icon: CompassIcon,
  groups: [
    { name: "identity", title: "Identity" },
    { name: "logistics", title: "Logistics" },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO & audit" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      name: "kind",
      title: "Kind",
      type: "string",
      group: "identity",
      options: {
        list: [
          { title: "Beach", value: "beach" },
          { title: "Walk / coast path", value: "walk" },
          { title: "Town / village", value: "town" },
          { title: "Garden / estate", value: "garden" },
          { title: "Heritage / NT", value: "heritage" },
          { title: "Restaurant / pub off-site", value: "off-restaurant" },
          { title: "Café / bakery", value: "cafe" },
          { title: "Surf school / activity", value: "activity-off" },
          { title: "Wildlife reserve", value: "wildlife" },
          { title: "Family attraction", value: "family-attraction" },
          { title: "Shop / market", value: "shop" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.max(140),
    }),

    /* ---------------------------- LOGISTICS ------------------------------- */
    defineField({
      name: "distanceMiles",
      title: "Distance from estate (miles)",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "driveMinutes",
      title: "Drive time (minutes)",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "walkMinutes",
      title: "Walk time (minutes, if walkable)",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "transportOptions",
      title: "Transport options",
      type: "array",
      group: "logistics",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Car", value: "car" },
          { title: "Cycle path", value: "cycle" },
          { title: "Bus route", value: "bus" },
          { title: "Foot from resort", value: "foot" },
          { title: "E-bike (resort hire)", value: "ebike" },
        ],
      },
    }),
    defineField({
      name: "dogRules",
      title: "Dog rules",
      type: "string",
      group: "logistics",
      options: {
        list: [
          { title: "Dogs welcome year-round", value: "year-round" },
          { title: "Dogs welcome out of season", value: "off-season" },
          { title: "Dogs on lead only", value: "on-lead" },
          { title: "Dog restrictions seasonal", value: "seasonal" },
          { title: "No dogs", value: "no-dogs" },
          { title: "Check beach signage", value: "check" },
        ],
      },
    }),
    defineField({
      name: "accessibilityNotes",
      title: "Accessibility notes",
      type: "text",
      rows: 3,
      group: "logistics",
    }),
    defineField({
      name: "parking",
      title: "Parking",
      type: "string",
      group: "logistics",
      description:
        "e.g. 'NT car park, £4 all day, free for members. Drops to 12 spaces in winter.'",
    }),
    defineField({
      name: "familySuitability",
      title: "Family suitability",
      type: "string",
      group: "logistics",
      options: {
        list: [
          { title: "All ages", value: "all" },
          { title: "Better for older kids (6+)", value: "6plus" },
          { title: "Adult-leaning", value: "adult" },
          { title: "Toddler-friendly", value: "toddler" },
        ],
      },
    }),
    defineField({
      name: "bestTimeToVisit",
      title: "Best time to visit",
      type: "string",
      group: "logistics",
      description: "e.g. 'Low tide for rockpooling • Sunset for the cliff walk'.",
    }),
    defineField({
      name: "what3words",
      title: "what3words",
      type: "string",
      group: "logistics",
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      group: "logistics",
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      group: "logistics",
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
      title: "Description (portable text)",
      type: "portableText",
      group: "content",
    }),
    defineField({
      name: "facilitiesOnSite",
      title: "Facilities on site",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
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

    /* ------------------------------- SEO ---------------------------------- */
    defineField({
      name: "officialWebsite",
      title: "Official website",
      type: "url",
      group: "seo",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit", group: "seo" }),
  ],
  orderings: [
    {
      title: "Distance (nearest first)",
      name: "distAsc",
      by: [{ field: "distanceMiles", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      kind: "kind",
      miles: "distanceMiles",
      media: "heroImage.image",
    },
    prepare({ title, kind, miles, media }) {
      return {
        title,
        subtitle: `${kind ?? "—"} • ${miles ?? "?"} mi`,
        media,
      };
    },
  },
});
