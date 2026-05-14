/**
 * seasonalContent — content overrides driven by the calendar.
 * One per season. Powers the homepage seasonal-vibe switcher and editorial blocks across the site.
 */

import { defineField, defineType } from "sanity";
import { SunIcon } from "@sanity/icons";

export const seasonalContent = defineType({
  name: "seasonalContent",
  title: "Seasonal content",
  type: "document",
  icon: SunIcon,
  fields: [
    defineField({
      name: "season",
      title: "Season",
      type: "string",
      options: {
        list: [
          { title: "Spring (Mar–May)", value: "spring" },
          { title: "Summer (Jun–Aug)", value: "summer" },
          { title: "Autumn (Sep–Nov)", value: "autumn" },
          { title: "Winter (Dec–Feb)", value: "winter" },
          { title: "Christmas / festive (mid-Nov – Jan 5)", value: "festive" },
          { title: "Half-term — Feb", value: "half-feb" },
          { title: "Half-term — May", value: "half-may" },
          { title: "Half-term — Oct", value: "half-oct" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Internal name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "activeFrom",
      title: "Active from",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "activeUntil",
      title: "Active until",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "homepageHero",
      title: "Homepage hero override",
      type: "imageWithAlt",
    }),
    defineField({
      name: "homepageVideo",
      title: "Homepage hero video override",
      type: "file",
    }),
    defineField({
      name: "headlineOverride",
      title: "Hero headline override",
      type: "string",
      validation: (Rule) => Rule.max(110),
    }),
    defineField({
      name: "subheadingOverride",
      title: "Hero subheading override",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "headlineCopy",
      title: "Vibe paragraph (longer)",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "featuredOffers",
      title: "Featured seasonal offers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "offer" }] }],
    }),
    defineField({
      name: "featuredEvents",
      title: "Featured seasonal events",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "restaurantEvent" }] },
        { type: "reference", to: [{ type: "activity" }] },
      ],
    }),
    defineField({
      name: "featuredArticles",
      title: "Featured seasonal articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "journalArticle" }] }],
    }),
    defineField({
      name: "menuOverride",
      title: "Restaurant menu override",
      type: "reference",
      to: [{ type: "menu" }],
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      title: "name",
      from: "activeFrom",
      until: "activeUntil",
      media: "homepageHero.image",
    },
    prepare({ title, from, until, media }) {
      return {
        title,
        subtitle: [from, until].filter(Boolean).join(" → "),
        media,
      };
    },
  },
});
