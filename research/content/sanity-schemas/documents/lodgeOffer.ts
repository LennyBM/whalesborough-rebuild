/**
 * lodgeOffer — buyer-incentive offers (e.g. 'Service charge waived for year one',
 * 'Furniture pack included', 'Reserve before Jun 30 to lock 2026 price').
 *
 * FCA-sensitive: any offer mentioning return / income requires FCA review.
 */

import { defineField, defineType } from "sanity";
import { TagsIcon } from "@sanity/icons";

export const lodgeOffer = defineType({
  name: "lodgeOffer",
  title: "Lodge sales offer",
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
      name: "summary",
      title: "Summary (one-liner)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "description",
      title: "Full description",
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
      name: "eligibleModels",
      title: "Eligible lodge models",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lodgeModel" }] }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "discountKind",
      title: "Discount kind",
      type: "string",
      options: {
        list: [
          { title: "Cash off purchase price", value: "cash" },
          { title: "Percentage off purchase price", value: "percent" },
          { title: "Furniture / fit-out pack", value: "furniture" },
          { title: "Service charge waiver", value: "service-charge" },
          { title: "Stamp duty contribution", value: "stamp-duty" },
          { title: "Free upgrade pack", value: "upgrade-pack" },
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
      name: "fcaReviewed",
      title: "FCA review completed (required if any return/income claim)",
      type: "boolean",
      initialValue: false,
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
        subtitle: `Until ${until ?? "—"} • ${status}`,
        media,
      };
    },
  },
});
