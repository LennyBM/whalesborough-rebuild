/**
 * amenity — code, name, category, icon, sort_order.
 * Referenced from `property`. Drives filter facets and the property amenity grid.
 */

import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const amenity = defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "code",
      title: "Code (machine-friendly)",
      description:
        "lowercase, hyphen-separated. e.g. 'hot-tub', 'log-burner', 'sea-view'. Used in filter URLs.",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^[a-z0-9-]+$/, "kebab-case").error(
          "Use kebab-case (a-z, 0-9, hyphens only).",
        ),
    }),
    defineField({
      name: "name",
      title: "Display name",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "shortName",
      title: "Short name (for badges)",
      description: "e.g. 'Hot tub' for a property card chip.",
      type: "string",
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Bedrooms & bathrooms", value: "bedrooms" },
          { title: "Kitchen", value: "kitchen" },
          { title: "Living space", value: "living" },
          { title: "Outdoor", value: "outdoor" },
          { title: "Views & setting", value: "views" },
          { title: "Wellness", value: "wellness" },
          { title: "Accessibility", value: "accessibility" },
          { title: "Pet-friendly", value: "pet" },
          { title: "Family", value: "family" },
          { title: "Technology", value: "tech" },
          { title: "Sustainability", value: "sustainability" },
          { title: "Walking distance", value: "proximity" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon (Lucide name or SVG)",
      description:
        "Use a Lucide icon name like 'bath' or upload a custom SVG.",
      type: "string",
    }),
    defineField({
      name: "iconAsset",
      title: "Custom icon SVG",
      type: "image",
      options: { accept: "image/svg+xml" },
    }),
    defineField({
      name: "description",
      title: "Tooltip description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "isFilterable",
      title: "Expose as filter facet",
      description:
        "If ticked, this amenity becomes a tick-box in the search filters.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isHighlight",
      title: "Highlight amenity (show on card)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Sort order, then name",
      name: "sortOrderName",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category", icon: "icon" },
  },
});
