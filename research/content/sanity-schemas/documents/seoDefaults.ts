/**
 * seoDefaults — singleton.
 * Default title template, description, OG image, Organization JSON-LD seed.
 */

import { defineField, defineType } from "sanity";
import { SearchIcon } from "@sanity/icons";

export const seoDefaults = defineType({
  name: "seoDefaults",
  title: "SEO defaults (singleton)",
  type: "document",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "titleTemplate",
      title: "Title template",
      description:
        "Use %s as the page-title placeholder. e.g. '%s | Whalesborough Farm Resort & Spa'.",
      type: "string",
      initialValue: "%s | Whalesborough Farm Resort & Spa",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          value && value.includes("%s")
            ? true
            : "Template must include %s placeholder.",
        ),
    }),
    defineField({
      name: "defaultTitle",
      title: "Default title (homepage)",
      type: "string",
      validation: (Rule) => Rule.required().max(70),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG image (1200×630)",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "twitterHandle",
      title: "Twitter / X handle",
      type: "string",
      description: "Without @ — used in twitter:site card.",
    }),
    defineField({
      name: "robotsAllowList",
      title: "Robots allow / disallow lines",
      type: "text",
      rows: 6,
      description:
        "Raw robots.txt directives appended to the default. Use only for advanced tweaks.",
    }),
    defineField({
      name: "indexNowKey",
      title: "IndexNow key",
      type: "string",
      description:
        "Bing / Yandex IndexNow key. Hosted at /<key>.txt. Generates at https://www.bing.com/indexnow.",
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Google site verification",
      type: "string",
    }),
    defineField({
      name: "bingSiteVerification",
      title: "Bing site verification",
      type: "string",
    }),
    defineField({
      name: "aiCrawlerPolicy",
      title: "AI crawler policy",
      description: "Choose how the site treats GPTBot, ClaudeBot, PerplexityBot, etc.",
      type: "string",
      options: {
        list: [
          { title: "Allow all (recommended for AI citation)", value: "allow" },
          { title: "Disallow training, allow citation", value: "citation-only" },
          { title: "Disallow all AI crawlers", value: "block" },
        ],
        layout: "radio",
      },
      initialValue: "allow",
    }),
    defineField({
      name: "audit",
      title: "Audit",
      type: "audit",
    }),
  ],
  preview: {
    prepare() {
      return { title: "SEO defaults" };
    },
  },
});
