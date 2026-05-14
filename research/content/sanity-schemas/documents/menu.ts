/**
 * menu — a complete menu (breakfast / lunch / dinner / drinks / kids / dogs).
 * Composed of menuSection refs.
 */

import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const menu = defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "code",
      title: "Menu code",
      type: "string",
      options: {
        list: [
          { title: "Breakfast", value: "breakfast" },
          { title: "Brunch", value: "brunch" },
          { title: "Lunch", value: "lunch" },
          { title: "Afternoon tea", value: "afternoon-tea" },
          { title: "Dinner", value: "dinner" },
          { title: "Tasting menu", value: "tasting" },
          { title: "Drinks", value: "drinks" },
          { title: "Wine list", value: "wine" },
          { title: "Cocktails", value: "cocktails" },
          { title: "Kids", value: "kids" },
          { title: "Dogs", value: "dogs" },
          { title: "Christmas / festive", value: "festive" },
          { title: "Sunday roast", value: "sunday-roast" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Display name",
      type: "string",
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
      name: "intro",
      title: "Intro / standfirst",
      description: "Top-of-menu editorial paragraph.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      options: {
        list: [
          { title: "The Weir restaurant", value: "weir" },
          { title: "Spa café", value: "spa-cafe" },
          { title: "Pool deck", value: "pool-deck" },
          { title: "Beach kiosk", value: "beach-kiosk" },
          { title: "Pre-arrival hamper", value: "hamper" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections (ordered)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "menuSection" }] }],
      validation: (Rule) => Rule.min(1).unique(),
    }),
    defineField({
      name: "footerNote",
      title: "Footer note (allergens / discretionary / sourcing)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "discretionaryServicePercent",
      title: "Discretionary service %",
      type: "number",
      validation: (Rule) => Rule.min(0).max(20),
    }),
    defineField({
      name: "activeFrom",
      title: "Active from",
      type: "date",
    }),
    defineField({
      name: "activeUntil",
      title: "Active until",
      type: "date",
    }),
    defineField({
      name: "dailyAvailability",
      title: "Days of week available",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Mon", value: "mon" },
          { title: "Tue", value: "tue" },
          { title: "Wed", value: "wed" },
          { title: "Thu", value: "thu" },
          { title: "Fri", value: "fri" },
          { title: "Sat", value: "sat" },
          { title: "Sun", value: "sun" },
        ],
      },
      initialValue: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    }),
    defineField({
      name: "serviceFrom",
      title: "Service start time",
      type: "string",
      description: "HH:mm — e.g. 18:00.",
    }),
    defineField({
      name: "serviceUntil",
      title: "Service end time",
      type: "string",
    }),
    defineField({
      name: "downloadPdf",
      title: "Printable PDF",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Paused", value: "paused" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "live",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  orderings: [
    {
      title: "By code",
      name: "byCode",
      by: [{ field: "code", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", code: "code", venue: "venue", status: "status" },
    prepare({ title, code, venue, status }) {
      return { title, subtitle: `${code} • ${venue} • ${status}` };
    },
  },
});
