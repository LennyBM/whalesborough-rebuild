/**
 * spaCategory — Rituals / Facials / Body & Massage / Hands & Feet.
 * Mirrors the W Club menu structure from spa-treatments.md.
 */

import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const spaCategory = defineType({
  name: "spaCategory",
  title: "Spa category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Category name",
      type: "string",
      description:
        "e.g. 'Gaia Rituals', 'Facials', 'Body & Massage', 'Hands & Feet'.",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Category tagline",
      description:
        "One-line summary from the menu — e.g. 'The signature line. Multi-stage journeys built around three oil blends.'",
      type: "string",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "bestFor",
      title: "Best for",
      description: "Audience cue — e.g. 'Guests who want a full experience, not a single technique.'",
      type: "string",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "description",
      title: "Long description",
      type: "portableText",
    }),
    defineField({
      name: "heroImage",
      title: "Category hero image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "icon",
      title: "Icon (Lucide name)",
      type: "string",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "tagline" },
  },
});
