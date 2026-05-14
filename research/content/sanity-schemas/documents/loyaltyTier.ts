/**
 * loyaltyTier — automatic loyalty band based on spend threshold.
 * Distinct from membershipTier (paid spa membership).
 */

import { defineField, defineType } from "sanity";
import { AwardIcon } from "@sanity/icons";

export const loyaltyTier = defineType({
  name: "loyaltyTier",
  title: "Loyalty tier",
  type: "document",
  icon: AwardIcon,
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "name",
      title: "Tier name",
      type: "string",
      description: "e.g. 'Friend of the Farm', 'Guest in Residence', 'Estate Insider'.",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      description: "Machine code, used in member records.",
      validation: (Rule) =>
        Rule.required().regex(/^[a-z0-9-]+$/, "kebab-case"),
    }),
    defineField({
      name: "thresholdPence",
      title: "Spend threshold (pence)",
      description: "Lifetime spend to qualify for this tier.",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "qualifyingWindowMonths",
      title: "Qualifying window (months)",
      description: "How far back do we count spend? 0 = lifetime.",
      type: "number",
      initialValue: 24,
      validation: (Rule) => Rule.integer().min(0).max(120),
    }),
    defineField({
      name: "icon",
      title: "Tier icon",
      type: "image",
      options: { accept: "image/svg+xml" },
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "benefits",
      title: "Benefits (portable text)",
      type: "portableText",
    }),
    defineField({
      name: "benefitsShortList",
      title: "Benefits short-list",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "pointsPerPound",
      title: "Points earned per £1 spent",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  orderings: [
    {
      title: "Threshold (low → high)",
      name: "thresholdAsc",
      by: [{ field: "thresholdPence", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      threshold: "thresholdPence",
      media: "heroImage.image",
    },
    prepare({ title, threshold, media }) {
      return {
        title,
        subtitle: `Threshold £${((threshold ?? 0) / 100).toLocaleString("en-GB")}`,
        media,
      };
    },
  },
});
