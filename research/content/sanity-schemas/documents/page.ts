/**
 * page — generic CMS page (legal, info, marketing, AI-mega).
 * Anything that doesn't fit one of the specialist types.
 */

import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title (H1)",
      type: "string",
      validation: (Rule) => Rule.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Page kind",
      type: "string",
      options: {
        list: [
          { title: "Marketing landing", value: "marketing" },
          { title: "Legal — privacy policy", value: "legal-privacy" },
          { title: "Legal — terms & conditions", value: "legal-terms" },
          { title: "Legal — cookie policy", value: "legal-cookies" },
          { title: "Legal — accessibility statement", value: "legal-a11y" },
          { title: "Legal — modern slavery", value: "legal-slavery" },
          { title: "Legal — STL register", value: "legal-stl" },
          { title: "Legal — sustainability statement", value: "legal-sustain" },
          { title: "Information — generic", value: "info" },
          { title: "AI mega-page (Everything you need to know)", value: "ai-mega" },
          { title: "Contact", value: "contact" },
          { title: "Brochure / download landing", value: "brochure" },
          { title: "404 / error", value: "error" },
          { title: "Thank-you / confirmation", value: "thankyou" },
          { title: "Sitemap (HTML)", value: "sitemap" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / standfirst",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
    }),
    defineField({
      name: "sections",
      title: "Structured sections (optional)",
      description: "Use this for marketing landing pages with repeating sections.",
      type: "array",
      of: [
        {
          type: "object",
          name: "marketingSection",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "subheading", title: "Sub-heading", type: "string" },
            { name: "body", title: "Body", type: "portableText" },
            { name: "image", title: "Image", type: "imageWithAlt" },
            { name: "primaryCta", title: "Primary CTA", type: "ctaButton" },
            { name: "secondaryCta", title: "Secondary CTA", type: "ctaButton" },
            {
              name: "layout",
              title: "Layout",
              type: "string",
              options: {
                list: [
                  { title: "Image left, text right", value: "image-left" },
                  { title: "Image right, text left", value: "image-right" },
                  { title: "Image background, text centred", value: "image-bg" },
                  { title: "Full-bleed image (no text)", value: "image-only" },
                  { title: "Two-column text", value: "two-col-text" },
                ],
              },
            },
            {
              name: "tone",
              title: "Section tone (background)",
              type: "string",
              options: {
                list: ["cream", "teal-dark", "sage", "coral-accent", "white"],
              },
            },
          ],
          preview: {
            select: { title: "heading", layout: "layout" },
          },
        },
      ],
    }),
    defineField({
      name: "lastVerifiedAt",
      title: "Last verified at (shown on legal pages)",
      type: "date",
      description: "Visible on legal pages — required for trust + GDPR.",
    }),
    defineField({
      name: "schemaType",
      title: "Schema.org type",
      type: "string",
      options: {
        list: [
          { title: "WebPage (default)", value: "WebPage" },
          { title: "AboutPage", value: "AboutPage" },
          { title: "ContactPage", value: "ContactPage" },
          { title: "FAQPage", value: "FAQPage" },
          { title: "CollectionPage", value: "CollectionPage" },
          { title: "ItemPage", value: "ItemPage" },
          { title: "PrivacyPolicy", value: "WebPage" },
          { title: "TermsOfService", value: "WebPage" },
        ],
      },
      initialValue: "WebPage",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      title: "title",
      kind: "kind",
      media: "heroImage.image",
    },
    prepare({ title, kind, media }) {
      return { title, subtitle: kind, media };
    },
  },
});
