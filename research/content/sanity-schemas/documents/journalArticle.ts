/**
 * journalArticle — long-form editorial / blog / cornerstone-content article.
 * Modelled for AI-citation (GEO): BLUF, fact tables, pull quotes, FAQ section.
 */

import { defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";

export const journalArticle = defineType({
  name: "journalArticle",
  title: "Journal article",
  type: "document",
  icon: ComposeIcon,
  groups: [
    { name: "identity", title: "Identity" },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "meta", title: "Meta & taxonomy" },
    { name: "seo", title: "SEO & audit" },
  ],
  fields: [
    /* ----------------------------- IDENTITY ------------------------------- */
    defineField({
      name: "title",
      title: "Title (H1)",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required().min(10).max(110),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / dek",
      type: "text",
      rows: 3,
      group: "identity",
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "identity",
      options: {
        list: [
          { title: "Food & provenance", value: "food" },
          { title: "Wellness & spa", value: "wellness" },
          { title: "Estate & nature", value: "estate" },
          { title: "Travel guides — North Cornwall", value: "guides" },
          { title: "Dog-friendly", value: "dog-friendly" },
          { title: "Family", value: "family" },
          { title: "Seasonal", value: "seasonal" },
          { title: "Behind the scenes", value: "behind-scenes" },
          { title: "Sustainability", value: "sustainability" },
          { title: "News", value: "news" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "identity",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "identity",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "additionalAuthors",
      title: "Additional authors",
      type: "array",
      group: "identity",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),
    defineField({
      name: "publishDate",
      title: "Publish date",
      type: "datetime",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdatedDate",
      title: "Last updated",
      description:
        "AI search prioritises freshness — visible on the page. Set this every time the article is materially updated.",
      type: "datetime",
      group: "identity",
    }),

    /* ------------------------------ CONTENT ------------------------------- */
    defineField({
      name: "bluf",
      title: "BLUF — bottom-line summary (AI-citation friendly)",
      description:
        "First-on-the-page 40–80-word direct answer. This is what ChatGPT / Perplexity / Gemini will quote.",
      type: "text",
      rows: 4,
      group: "content",
      validation: (Rule) => Rule.required().min(80).max(480),
    }),
    defineField({
      name: "body",
      title: "Body (portable text)",
      type: "portableText",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pullQuotes",
      title: "Pull quotes",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text", rows: 3 },
            { name: "attribution", title: "Attribution", type: "string" },
          ],
        },
      ],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "faqs",
      title: "FAQ section (for FAQPage schema)",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),

    /* ------------------------------- MEDIA -------------------------------- */
    defineField({
      name: "heroImage",
      title: "Hero image (LCP)",
      type: "imageWithAlt",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Override OG image",
      type: "imageWithAlt",
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [{ type: "imageWithAlt" }],
    }),

    /* ------------------------------- META --------------------------------- */
    defineField({
      name: "readingTimeMinutes",
      title: "Reading time (minutes — auto)",
      type: "number",
      group: "meta",
      readOnly: true,
    }),
    defineField({
      name: "relatedArticles",
      title: "Related articles (manual)",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "journalArticle" }] }],
      validation: (Rule) => Rule.max(4).unique(),
    }),
    defineField({
      name: "relatedProperties",
      title: "Related properties (sidebar)",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "property" }] }],
    }),
    defineField({
      name: "relatedTreatments",
      title: "Related treatments (sidebar)",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "treatment" }] }],
    }),
    defineField({
      name: "schemaType",
      title: "Schema.org type",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Article", value: "Article" },
          { title: "BlogPosting", value: "BlogPosting" },
          { title: "NewsArticle", value: "NewsArticle" },
          { title: "Recipe", value: "Recipe" },
          { title: "TravelGuide", value: "TravelGuide" },
          { title: "FAQPage (if FAQ-heavy)", value: "FAQPage" },
        ],
      },
      initialValue: "Article",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit", group: "seo" }),
  ],
  orderings: [
    {
      title: "Publish date (newest first)",
      name: "publishDateDesc",
      by: [{ field: "publishDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      date: "publishDate",
      media: "heroImage.image",
    },
    prepare({ title, author, date, media }) {
      const niceDate = date
        ? new Date(date).toLocaleDateString("en-GB")
        : "draft";
      return {
        title,
        subtitle: `${author ?? "?"} • ${niceDate}`,
        media,
      };
    },
  },
});
