/**
 * Lightweight link reference for "related content" arrays.
 * Wraps either an internal Sanity reference or an external URL with a label.
 */

import { defineField, defineType } from "sanity";

export const linkRef = defineType({
  name: "linkRef",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "reference",
      title: "Internal reference",
      type: "reference",
      to: [
        { type: "page" },
        { type: "property" },
        { type: "treatment" },
        { type: "spaPackage" },
        { type: "arvorPackage" },
        { type: "lodgeModel" },
        { type: "journalArticle" },
        { type: "restaurantEvent" },
        { type: "activity" },
        { type: "faq" },
        { type: "localAreaPOI" },
        { type: "supplier" },
      ],
    }),
    defineField({
      name: "externalUrl",
      title: "External URL (overrides internal)",
      type: "url",
    }),
  ],
});
