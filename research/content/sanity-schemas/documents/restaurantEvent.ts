/**
 * restaurantEvent — ticketed dining / supper club / wine pairing / live music.
 */

import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const restaurantEvent = defineType({
  name: "restaurantEvent",
  title: "Restaurant event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow / kicker",
      type: "string",
    }),
    defineField({
      name: "kind",
      title: "Event kind",
      type: "string",
      options: {
        list: [
          { title: "Supper club", value: "supper-club" },
          { title: "Wine pairing dinner", value: "wine-dinner" },
          { title: "Tasting menu special", value: "tasting" },
          { title: "Live music / acoustic", value: "live-music" },
          { title: "Cookery demo", value: "demo" },
          { title: "Foraging walk + lunch", value: "foraging" },
          { title: "Mother's Day / Father's Day", value: "family-occasion" },
          { title: "Christmas / NYE", value: "festive" },
          { title: "Beer / cider festival", value: "festival" },
          { title: "Private hire only", value: "private" },
        ],
      },
      validation: (Rule) => Rule.required(),
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
      name: "bluf",
      title: "BLUF",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "description",
      title: "Description (long-form)",
      type: "portableText",
    }),
    defineField({
      name: "menu",
      title: "Menu for this event",
      type: "reference",
      to: [{ type: "menu" }],
    }),
    defineField({
      name: "menuPdf",
      title: "Menu PDF",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "date",
      title: "Event date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "doorsOpenAt",
      title: "Doors open at",
      type: "datetime",
    }),
    defineField({
      name: "endAt",
      title: "Ends at",
      type: "datetime",
    }),
    defineField({
      name: "venue",
      title: "Venue / location on estate",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "Capacity (total covers)",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "soldCount",
      title: "Tickets sold (manual override)",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "ticketPricePence",
      title: "Ticket price (pence)",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "memberPricePence",
      title: "Member price (pence)",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "chefOrHost",
      title: "Chef / host",
      type: "string",
    }),
    defineField({
      name: "guestSupplier",
      title: "Guest supplier (e.g. a winery)",
      type: "reference",
      to: [{ type: "supplier" }],
    }),
    defineField({
      name: "ageMinimum",
      title: "Age minimum",
      type: "number",
      validation: (Rule) => Rule.integer().min(0).max(99),
    }),
    defineField({
      name: "dressCode",
      title: "Dress code",
      type: "string",
    }),
    defineField({
      name: "termsAndConditions",
      title: "Terms & conditions",
      type: "portableText",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "On sale", value: "on-sale" },
          { title: "Selling fast", value: "selling-fast" },
          { title: "Sold out", value: "sold-out" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Past", value: "past" },
        ],
      },
      initialValue: "on-sale",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  orderings: [
    {
      title: "Date (soonest first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      status: "status",
      media: "heroImage.image",
    },
    prepare({ title, date, status, media }) {
      const niceDate = date
        ? new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "?";
      return { title, subtitle: `${niceDate} • ${status}`, media };
    },
  },
});
