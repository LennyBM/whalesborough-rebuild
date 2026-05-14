/**
 * award — awards, gold-listings, press accolades.
 * Displayed on the homepage proof block + dedicated press page.
 */

import { defineField, defineType } from "sanity";
import { TrophyIcon } from "@sanity/icons";

export const award = defineType({
  name: "award",
  title: "Award / accolade",
  type: "document",
  icon: TrophyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Award name",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "awardingBody",
      title: "Awarding body",
      description: "e.g. 'Visit England', 'AA', 'Good Hotel Guide', 'Cornwall Tourism Awards'.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) =>
        Rule.required().integer().min(1990).max(2100),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Self-catering — gold", value: "self-catering-gold" },
          { title: "Self-catering — silver", value: "self-catering-silver" },
          { title: "Spa", value: "spa" },
          { title: "Restaurant", value: "restaurant" },
          { title: "Sustainability", value: "sustainability" },
          { title: "Dog-friendly", value: "dog-friendly" },
          { title: "Family", value: "family" },
          { title: "Wedding venue", value: "wedding" },
          { title: "Lodge / park", value: "park" },
          { title: "Press feature", value: "press" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "logo",
      title: "Logo / badge",
      type: "image",
    }),
    defineField({
      name: "evidenceUrl",
      title: "Evidence URL",
      type: "url",
    }),
    defineField({
      name: "evidenceFile",
      title: "Evidence file (certificate PDF)",
      type: "file",
    }),
    defineField({
      name: "quote",
      title: "Judge / reviewer quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "quoteAttribution",
      title: "Quote attribution",
      type: "string",
    }),
    defineField({
      name: "displayPriority",
      title: "Display priority (lower = higher on page)",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isActive",
      title: "Still active (within last 3 years or renewable)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  orderings: [
    {
      title: "Year (newest)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      body: "awardingBody",
      year: "year",
      media: "logo",
    },
    prepare({ title, body, year, media }) {
      return { title, subtitle: `${body} • ${year}`, media };
    },
  },
});
