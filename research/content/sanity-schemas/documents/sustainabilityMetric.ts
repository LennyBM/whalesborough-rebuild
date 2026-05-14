/**
 * sustainabilityMetric — a verifiable sustainability fact.
 * e.g. 'Single-use plastics removed: 12,400 / year'.
 *
 * Greenwash-prevention: source + methodology required.
 */

import { defineField, defineType } from "sanity";
import { TrendUpwardIcon } from "@sanity/icons";

export const sustainabilityMetric = defineType({
  name: "sustainabilityMetric",
  title: "Sustainability metric",
  type: "document",
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: "name",
      title: "Metric name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Carbon / energy", value: "carbon" },
          { title: "Water", value: "water" },
          { title: "Waste", value: "waste" },
          { title: "Biodiversity", value: "biodiversity" },
          { title: "Sourcing / local economy", value: "sourcing" },
          { title: "People / community", value: "people" },
          { title: "Animal welfare", value: "animals" },
          { title: "Single-use plastics", value: "plastics" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline (the number)",
      description: "Pure display string — e.g. '94%' or '12,400/yr' or 'Zero'.",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "currentValue",
      title: "Current numeric value",
      type: "number",
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      description: "e.g. 'kg CO₂e', 'litres', '%', 'items per year'.",
    }),
    defineField({
      name: "comparisonValue",
      title: "Comparison value (baseline)",
      type: "number",
    }),
    defineField({
      name: "comparisonLabel",
      title: "Comparison label",
      type: "string",
      description: "e.g. 'vs. 2024 baseline'.",
    }),
    defineField({
      name: "trend",
      title: "Trend",
      type: "string",
      options: {
        list: [
          { title: "Improving", value: "up" },
          { title: "Flat", value: "flat" },
          { title: "Worse than last year", value: "down" },
        ],
      },
    }),
    defineField({
      name: "explainer",
      title: "Plain-English explainer",
      description: "1–2 sentences. Anti-greenwash — what does the number mean?",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "source",
      title: "Source",
      description:
        "Who measured it? e.g. 'Internal utility meter readings', 'Cornwall Wildlife Trust', 'Carbon Disclosure Project audit'.",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "methodology",
      title: "Methodology",
      description: "How was it measured? Required for credibility + audit.",
      type: "portableText",
    }),
    defineField({
      name: "supportingDocumentUrl",
      title: "Supporting document URL",
      type: "url",
    }),
    defineField({
      name: "supportingDocumentFile",
      title: "Supporting document file",
      type: "file",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nextReviewDate",
      title: "Next scheduled review",
      type: "date",
    }),
    defineField({
      name: "displayOnHomepage",
      title: "Show on homepage proof block",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      title: "name",
      headline: "headline",
      updated: "lastUpdated",
    },
    prepare({ title, headline, updated }) {
      return {
        title,
        subtitle: `${headline} • updated ${updated ?? "?"}`,
      };
    },
  },
});
