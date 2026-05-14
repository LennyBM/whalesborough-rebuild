/**
 * activity — bookable on-estate activity / experience.
 * e.g. Surf lesson with Wavehunters, foraging walk, archery, alpaca walk, cookery class.
 */

import { defineField, defineType } from "sanity";
import { CompassIcon } from "@sanity/icons";

export const activity = defineType({
  name: "activity",
  title: "Activity / experience",
  type: "document",
  icon: CompassIcon,
  groups: [
    { name: "identity", title: "Identity" },
    { name: "logistics", title: "Logistics" },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "booking", title: "Booking & schedule" },
    { name: "seo", title: "SEO & audit" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Activity name",
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
      name: "category",
      title: "Category",
      type: "string",
      group: "identity",
      options: {
        list: [
          { title: "Watersports", value: "watersports" },
          { title: "Walks & wildlife", value: "walks" },
          { title: "Cycling", value: "cycling" },
          { title: "Foraging / wild food", value: "foraging" },
          { title: "Cookery", value: "cookery" },
          { title: "Wellness", value: "wellness" },
          { title: "Family / kids", value: "family" },
          { title: "Adventure (high-ropes / climb)", value: "adventure" },
          { title: "Animal experience", value: "animal" },
          { title: "Workshops & creative", value: "creative" },
          { title: "Drinks (tasting / pairing)", value: "tasting" },
          { title: "Music / talks", value: "talks" },
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
      name: "durationMinutes",
      title: "Duration (minutes)",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.required().integer().min(15),
    }),
    defineField({
      name: "minAge",
      title: "Min age",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.required().integer().min(0).max(99),
    }),
    defineField({
      name: "maxAge",
      title: "Max age",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.integer().min(0).max(120),
    }),
    defineField({
      name: "maxParticipants",
      title: "Max participants per session",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "minParticipants",
      title: "Min participants to run",
      type: "number",
      group: "logistics",
      initialValue: 1,
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: "intensityLevel",
      title: "Intensity",
      type: "string",
      group: "logistics",
      options: {
        list: [
          { title: "1 — Gentle / accessible", value: "1" },
          { title: "2 — Easy", value: "2" },
          { title: "3 — Moderate", value: "3" },
          { title: "4 — Active", value: "4" },
          { title: "5 — Vigorous / fit-only", value: "5" },
        ],
      },
    }),
    defineField({
      name: "dogFriendly",
      title: "Dog-friendly",
      type: "boolean",
      group: "logistics",
      initialValue: false,
    }),
    defineField({
      name: "wheelchairAccessible",
      title: "Wheelchair-accessible",
      type: "boolean",
      group: "logistics",
      initialValue: false,
    }),
    defineField({
      name: "weatherDependent",
      title: "Weather-dependent",
      type: "boolean",
      group: "logistics",
      initialValue: false,
    }),
    defineField({
      name: "indoorOrOutdoor",
      title: "Indoor / outdoor",
      type: "string",
      group: "logistics",
      options: {
        list: ["indoor", "outdoor", "hybrid"],
      },
    }),
    defineField({
      name: "locationDescription",
      title: "Meeting point",
      type: "string",
      group: "logistics",
      description: "e.g. 'Wavehunters HQ — Widemouth Bay, 10-minute drive'.",
    }),
    defineField({
      name: "what3words",
      title: "Meeting-point what3words",
      type: "string",
      group: "logistics",
    }),
    defineField({
      name: "whatToBring",
      title: "What to bring",
      type: "array",
      group: "logistics",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whatsProvided",
      title: "What's provided",
      type: "array",
      group: "logistics",
      of: [{ type: "string" }],
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
      title: "Description",
      type: "portableText",
      group: "content",
    }),
    defineField({
      name: "instructor",
      title: "Instructor / partner",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "instructorBio",
      title: "Instructor bio",
      type: "text",
      rows: 4,
      group: "content",
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
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      group: "media",
    }),

    /* --------------------------- BOOKING & SCHEDULE ----------------------- */
    defineField({
      name: "pricePence",
      title: "Price per person (pence)",
      type: "number",
      group: "booking",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "groupPricePence",
      title: "Group / private booking price (pence)",
      type: "number",
      group: "booking",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "memberPricePence",
      title: "Member price (pence)",
      type: "number",
      group: "booking",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "guestOnlyPricing",
      title: "Available only to guests staying on-estate",
      type: "boolean",
      group: "booking",
      initialValue: false,
    }),
    defineField({
      name: "schedule",
      title: "Schedule (RRULE-compatible)",
      description:
        "e.g. 'RRULE:FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=10;BYMINUTE=0'. Used to render the activity calendar.",
      type: "array",
      group: "booking",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "rrule",
              title: "iCal RRULE",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "startDate",
              title: "Start date",
              type: "date",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "endDate",
              title: "End date (last occurrence)",
              type: "date",
            },
            {
              name: "exceptions",
              title: "EXDATE exceptions (comma-separated YYYY-MM-DD)",
              type: "text",
              rows: 2,
            },
          ],
        },
      ],
    }),
    defineField({
      name: "leadTimeHours",
      title: "Lead time (hours)",
      type: "number",
      group: "booking",
      initialValue: 24,
    }),
    defineField({
      name: "cancellationTerms",
      title: "Cancellation terms",
      type: "text",
      rows: 3,
      group: "booking",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "booking",
      options: {
        list: [
          { title: "Bookable", value: "bookable" },
          { title: "Seasonal — currently paused", value: "paused" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "bookable",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit", group: "seo" }),
  ],
  preview: {
    select: {
      title: "name",
      cat: "category",
      price: "pricePence",
      media: "heroImage.image",
    },
    prepare({ title, cat, price, media }) {
      return {
        title,
        subtitle: `${cat ?? "—"} • £${((price ?? 0) / 100).toFixed(0)} pp`,
        media,
      };
    },
  },
});
