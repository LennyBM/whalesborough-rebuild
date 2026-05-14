/**
 * menuSection — a section of a menu (e.g. 'Snacks', 'Mains', 'From the grill').
 */

import { defineField, defineType } from "sanity";
import { ThListIcon } from "@sanity/icons";

export const menuSection = defineType({
  name: "menuSection",
  title: "Menu section",
  type: "document",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "name",
      title: "Section name",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 80 },
    }),
    defineField({
      name: "intro",
      title: "Section intro paragraph",
      description: "Optional editorial line beneath the section heading.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "items",
      title: "Items in this section",
      type: "array",
      of: [{ type: "reference", to: [{ type: "menuItem" }] }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "isHighlight",
      title: "Highlight this section (e.g. chef's specials)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: { title: "name", order: "sortOrder" },
    prepare({ title, order }) {
      return { title, subtitle: `#${order}` };
    },
  },
});
