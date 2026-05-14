/**
 * faq — single FAQ Q&A used in FAQPage schema and across page accordions.
 */

import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      description: "Phrase it as the user would search — natural language.",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(8).max(180).warning(
          "Questions over 180 chars hurt FAQ-snippet eligibility.",
        ),
    }),
    defineField({
      name: "slug",
      title: "Slug (used for anchor / direct link)",
      type: "slug",
      options: { source: "question", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bluf",
      title: "BLUF — direct one-sentence answer (AI-citation)",
      description:
        "What ChatGPT / Perplexity / Google AI Overviews will quote. < 40 words.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(20).max(280),
    }),
    defineField({
      name: "detail",
      title: "Full detailed answer",
      type: "portableText",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Stay & booking", value: "stay" },
          { title: "Check-in / check-out", value: "checkin" },
          { title: "Pet-friendly", value: "pets" },
          { title: "Accessibility", value: "a11y" },
          { title: "Family & children", value: "family" },
          { title: "Spa", value: "spa" },
          { title: "Restaurant", value: "restaurant" },
          { title: "Activities", value: "activities" },
          { title: "Membership", value: "membership" },
          { title: "Lodge ownership", value: "ownership" },
          { title: "Sustainability", value: "sustainability" },
          { title: "Travel / location", value: "travel" },
          { title: "Cancellation & refunds", value: "cancellation" },
          { title: "Cottage-specific", value: "cottage-specific" },
          { title: "Wedding / events", value: "weddings" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "relatedLinks",
      title: "Related links / pages",
      type: "array",
      of: [{ type: "linkRef" }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "appliesToProperties",
      title: "Applies to properties (optional)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "property" }] }],
      description: "Leave blank for site-wide FAQs.",
    }),
    defineField({
      name: "schemaType",
      title: "Schema.org type",
      type: "string",
      options: { list: [{ title: "FAQPage", value: "FAQPage" }] },
      initialValue: "FAQPage",
      readOnly: true,
    }),
    defineField({
      name: "lastVerifiedAt",
      title: "Last verified at",
      description:
        "AI search prefers recently verified content. Update when you re-check the answer.",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "isHighlight",
      title: "Highlight on FAQ landing page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  orderings: [
    {
      title: "Category, then sort order",
      name: "categorySort",
      by: [
        { field: "category", direction: "asc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "question", category: "category", verified: "lastVerifiedAt" },
    prepare({ title, category, verified }) {
      return {
        title,
        subtitle: `${category} • verified ${verified ?? "?"}`,
      };
    },
  },
});
