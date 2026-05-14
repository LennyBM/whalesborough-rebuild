/**
 * offer — promotion / discount across the resort.
 * e.g. 'Locals Discount 20%', 'Members' Spa Day', 'Winter Sundays — half-price treatment'.
 */

import { defineField, defineType } from "sanity";
import { TagsIcon } from "@sanity/icons";

export const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  icon: TagsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Offer title",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
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
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary (BLUF)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "description",
      title: "Description (portable text)",
      type: "portableText",
    }),
    defineField({
      name: "terms",
      title: "Terms & conditions",
      type: "portableText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "validFrom",
      title: "Valid from",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "validUntil",
      title: "Valid until",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "applicableProducts",
      title: "Applies to (eligible products)",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "property" }] },
        { type: "reference", to: [{ type: "treatment" }] },
        { type: "reference", to: [{ type: "spaPackage" }] },
        { type: "reference", to: [{ type: "arvorPackage" }] },
        { type: "reference", to: [{ type: "activity" }] },
        { type: "reference", to: [{ type: "menu" }] },
      ],
    }),
    defineField({
      name: "discountKind",
      title: "Discount kind",
      type: "string",
      options: {
        list: [
          { title: "% off", value: "percent" },
          { title: "£ off", value: "cash" },
          { title: "BOGO / 2-for-1", value: "bogo" },
          { title: "Complimentary upgrade", value: "upgrade" },
          { title: "Bundle saving", value: "bundle" },
          { title: "Members only — not public discount", value: "member-rate" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discountValue",
      title: "Discount value (pence or %)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "promoCode",
      title: "Promo code",
      description:
        "Manual code (e.g. LOCAL20). Leave blank for auto-applied member rates.",
      type: "string",
    }),
    defineField({
      name: "claimMethod",
      title: "How to claim",
      type: "string",
      description:
        "e.g. 'Apply code at checkout', 'Quote when booking by phone'.",
    }),
    defineField({
      name: "audienceTags",
      title: "Audience tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Locals (EX/PL postcodes)", value: "locals" },
          { title: "Members", value: "members" },
          { title: "Repeat guests", value: "repeat" },
          { title: "New customers", value: "new" },
          { title: "Owners", value: "owners" },
          { title: "Dog owners", value: "dog-owners" },
        ],
      },
    }),
    defineField({
      name: "blackoutDates",
      title: "Blackout dates",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "from", type: "date", title: "From" },
            { name: "to", type: "date", title: "To" },
            { name: "reason", type: "string", title: "Reason" },
          ],
        },
      ],
    }),
    defineField({
      name: "maxRedemptions",
      title: "Max total redemptions",
      type: "number",
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Expired", value: "expired" },
          { title: "Withdrawn", value: "withdrawn" },
        ],
      },
      initialValue: "live",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      title: "title",
      until: "validUntil",
      status: "status",
      media: "heroImage.image",
    },
    prepare({ title, until, status, media }) {
      return {
        title,
        subtitle: `${status} • until ${until ?? "—"}`,
        media,
      };
    },
  },
});
