/**
 * giftVoucherProduct — gift voucher products available for purchase.
 * Either monetary value vouchers or experience vouchers.
 */

import { defineField, defineType } from "sanity";
import { GiftIcon } from "@sanity/icons";

export const giftVoucherProduct = defineType({
  name: "giftVoucherProduct",
  title: "Gift voucher",
  type: "document",
  icon: GiftIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Voucher kind",
      type: "string",
      options: {
        list: [
          { title: "Monetary value", value: "monetary" },
          { title: "Experience (specific package)", value: "experience" },
          { title: "Stay (per night)", value: "stay" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valuePence",
      title: "Voucher value (pence)",
      description: "For monetary vouchers — sets the credit. For experience vouchers — the sale price.",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "experienceLinks",
      title: "Linked experience (if applicable)",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "spaPackage" }] },
        { type: "reference", to: [{ type: "treatment" }] },
        { type: "reference", to: [{ type: "arvorPackage" }] },
        { type: "reference", to: [{ type: "activity" }] },
      ],
    }),
    defineField({
      name: "includes",
      title: "What's included (one-liner per item)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Hero image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deliveryMethods",
      title: "Delivery methods",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "Printed certificate (post)", value: "post" },
          { title: "Printed certificate (collect)", value: "collect" },
        ],
      },
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "expiryMonths",
      title: "Expiry (months from purchase)",
      type: "number",
      initialValue: 12,
      validation: (Rule) => Rule.integer().min(1).max(60),
    }),
    defineField({
      name: "termsAndConditions",
      title: "Terms & conditions",
      type: "portableText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "On sale", value: "on-sale" },
          { title: "Out of stock", value: "out-of-stock" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "on-sale",
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
  preview: {
    select: {
      title: "name",
      value: "valuePence",
      kind: "kind",
      media: "image.image",
    },
    prepare({ title, value, kind, media }) {
      return {
        title,
        subtitle: `${kind} • £${((value ?? 0) / 100).toFixed(0)}`,
        media,
      };
    },
  },
});
