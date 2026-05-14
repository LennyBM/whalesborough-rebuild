/**
 * Per-document SEO overrides. Inherits from seoDefaults singleton when fields blank.
 */

import { defineField, defineType } from "sanity";
import { SearchIcon } from "@sanity/icons";

export const seo = defineType({
  name: "seo",
  title: "SEO & social",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      description:
        "55–60 chars ideal. Leave blank to use the document title + site suffix from seoDefaults.",
      type: "string",
      validation: (Rule) =>
        Rule.max(70).warning(
          "Titles over 60 chars often truncate in Google results.",
        ),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      description:
        "120–158 chars. Reads like a direct answer to the search query. Avoid marketing fluff.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(180).warning(
          "Descriptions over 158 chars get cut off in SERPs.",
        ),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image (1200×630)",
      type: "imageWithAlt",
      description:
        "Used for Facebook, Twitter / X, LinkedIn, iMessage, WhatsApp link previews.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      description:
        "Only set if this page should canonicalise to a different URL than its own slug. " +
        "Leave blank for normal pages.",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).warning(
          "Canonical URLs must use HTTPS.",
        ),
    }),
    defineField({
      name: "noIndex",
      title: "No-index this page",
      description:
        "Tick to add <meta name='robots' content='noindex'>. Use for thank-you pages, internal previews, " +
        "legal-archive duplicates. Never tick on a money page.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No-follow links on this page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "structuredDataOverride",
      title: "Structured-data override (JSON-LD)",
      description:
        "Raw JSON-LD that REPLACES the auto-generated schema for this page. Advanced only. " +
        "Validate with Schema Markup Validator before publishing.",
      type: "text",
      rows: 8,
    }),
  ],
});
