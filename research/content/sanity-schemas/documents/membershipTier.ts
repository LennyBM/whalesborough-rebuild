/**
 * membershipTier — W Club Spa membership tiers (Foundation / Signature / Estate).
 * Monthly + annual price, benefits, joining fee, freeze policy, status-match eligibility.
 */

import { defineField, defineType } from "sanity";
import { CrownIcon } from "@sanity/icons";

export const membershipTier = defineType({
  name: "membershipTier",
  title: "Membership tier",
  type: "document",
  icon: CrownIcon,
  fields: [
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      description: "Short machine code — e.g. 'foundation', 'signature', 'estate'.",
      validation: (Rule) =>
        Rule.required().regex(/^[a-z0-9-]+$/, "kebab-case").error(
          "Use kebab-case (a-z, 0-9, hyphens).",
        ),
    }),
    defineField({
      name: "name",
      title: "Display name",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "monthlyPricePence",
      title: "Monthly price (pence)",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "annualPricePence",
      title: "Annual price (pence)",
      description: "Total annual price (not monthly × 12). Should reflect any discount.",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "joiningFeePence",
      title: "Joining fee (pence)",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      description: "Use a bulleted list. AI-search friendly.",
      type: "portableText",
    }),
    defineField({
      name: "benefitsShortList",
      title: "Benefits short-list (for cards)",
      description: "5–8 punchy bullets used on the membership comparison grid.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(3).max(10),
    }),
    defineField({
      name: "treatmentDiscountPercent",
      title: "Treatment discount %",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "guestPassesPerYear",
      title: "Complimentary guest passes / year",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "freezeMaxMonths",
      title: "Max freeze months / year",
      description: "How many months can be paused per membership year.",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0).max(12),
    }),
    defineField({
      name: "statusMatchEligible",
      title: "Eligible for status-match from competitor membership",
      description:
        "If ticked, prospects holding equivalent memberships at Soho House / The Newt / Babington House can apply for fast-track entry.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "minCommitmentMonths",
      title: "Minimum commitment (months)",
      type: "number",
      initialValue: 12,
      validation: (Rule) => Rule.integer().min(0).max(36),
    }),
    defineField({
      name: "noticePeriodMonths",
      title: "Notice period (months)",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.integer().min(0).max(12),
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
          { title: "Open for applications", value: "open" },
          { title: "Waitlist only", value: "waitlist" },
          { title: "Closed", value: "closed" },
        ],
      },
      initialValue: "open",
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
  orderings: [
    {
      title: "Sort order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      monthly: "monthlyPricePence",
      status: "status",
      media: "heroImage.image",
    },
    prepare({ title, monthly, status, media }) {
      return {
        title,
        subtitle: `£${((monthly ?? 0) / 100).toFixed(0)}/mo • ${status}`,
        media,
      };
    },
  },
});
