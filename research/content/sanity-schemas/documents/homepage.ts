/**
 * homepage — singleton.
 * Hero (video + image fallback), seasonal vibe switcher, four entry-point cards,
 * journal teaser, sustainability proof block, social proof, footer closer.
 */

import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage (singleton)",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "vibe", title: "Seasonal vibe" },
    { name: "entries", title: "Entry cards" },
    { name: "proof", title: "Proof + sustainability" },
    { name: "journal", title: "Journal teaser" },
    { name: "closer", title: "Closing block" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    /* -------------------------------- HERO -------------------------------- */
    defineField({
      name: "heroHeadline",
      title: "Hero headline (H1)",
      type: "string",
      group: "hero",
      description: "Max 70 chars. Will be wrapped in the gold-accent signature highlight on one phrase.",
      validation: (Rule) =>
        Rule.required().max(70).warning("Long headlines wrap awkwardly on mobile."),
    }),
    defineField({
      name: "heroHighlightPhrase",
      title: "Highlight phrase (gold accent)",
      description:
        "The exact substring of the headline to wrap in the gold accent + animated underline. Must appear in the headline.",
      type: "string",
      group: "hero",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { heroHeadline?: string } | undefined;
          if (!value) return true;
          if (parent?.heroHeadline && !parent.heroHeadline.includes(value)) {
            return "Highlight phrase must be a substring of the hero headline.";
          }
          return true;
        }),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero sub-heading",
      type: "text",
      rows: 2,
      group: "hero",
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "heroVideo",
      title: "Hero video (MP4 / WebM, max 6 MB, 12 s loop)",
      description:
        "Connection-aware: served only on fast connections. Image fallback required.",
      type: "file",
      group: "hero",
      options: {
        accept: "video/mp4,video/webm",
      },
    }),
    defineField({
      name: "heroVideoPoster",
      title: "Hero video poster (also LCP image fallback)",
      type: "imageWithAlt",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCtaPrimary",
      title: "Primary CTA",
      type: "ctaButton",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCtaSecondary",
      title: "Secondary CTA",
      type: "ctaButton",
      group: "hero",
    }),
    defineField({
      name: "heroBookingStrip",
      title: "Show booking-availability strip on hero",
      description:
        "Sticky 'Check availability' strip (date / party / dogs) overlaid on the hero. Industry standard.",
      type: "boolean",
      initialValue: true,
      group: "hero",
    }),

    /* --------------------------- VIBE SWITCHER ---------------------------- */
    defineField({
      name: "seasonalVibes",
      title: "Seasonal vibe variants",
      description:
        "Spring / Summer / Autumn / Winter copy overrides. The site selects the variant based on current date.",
      type: "array",
      group: "vibe",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "season",
              title: "Season",
              type: "string",
              options: {
                list: [
                  { title: "Spring (Mar–May)", value: "spring" },
                  { title: "Summer (Jun–Aug)", value: "summer" },
                  { title: "Autumn (Sep–Nov)", value: "autumn" },
                  { title: "Winter (Dec–Feb)", value: "winter" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            { name: "headlineOverride", title: "Headline override", type: "string" },
            {
              name: "subheadingOverride",
              title: "Sub-heading override",
              type: "text",
              rows: 2,
            },
            {
              name: "heroImage",
              title: "Hero image (this season)",
              type: "imageWithAlt",
            },
            {
              name: "vibeCopy",
              title: "Vibe-block paragraph (under hero)",
              type: "text",
              rows: 3,
            },
          ],
          preview: {
            select: { title: "season", subtitle: "headlineOverride" },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    /* ------------------------- FOUR ENTRY CARDS --------------------------- */
    defineField({
      name: "entryCards",
      title: "Four entry-point cards",
      description:
        "Stay / Spa / Dine / Buy a Lodge — or the four major journeys this season.",
      type: "array",
      group: "entries",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Card label / eyebrow", type: "string" },
            {
              name: "title",
              title: "Card title (H3)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "body", title: "Card body", type: "text", rows: 3 },
            {
              name: "image",
              title: "Card image",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            },
            { name: "cta", title: "Card CTA", type: "ctaButton" },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.length(4).error("Homepage entry block expects exactly 4 cards."),
    }),

    /* ------------------------- SUSTAINABILITY PROOF ----------------------- */
    defineField({
      name: "sustainabilityHeading",
      title: "Sustainability proof — heading",
      type: "string",
      group: "proof",
    }),
    defineField({
      name: "sustainabilityIntro",
      title: "Sustainability proof — intro paragraph",
      type: "text",
      rows: 3,
      group: "proof",
    }),
    defineField({
      name: "sustainabilityMetrics",
      title: "Featured sustainability metrics",
      type: "array",
      group: "proof",
      of: [{ type: "reference", to: [{ type: "sustainabilityMetric" }] }],
      validation: (Rule) =>
        Rule.max(6).warning("More than 6 metrics overwhelms the proof block."),
    }),
    defineField({
      name: "awards",
      title: "Featured awards",
      type: "array",
      group: "proof",
      of: [{ type: "reference", to: [{ type: "award" }] }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "socialProofQuotes",
      title: "Social proof — testimonials / press quotes",
      type: "array",
      group: "proof",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quote",
              title: "Quote (max 25 words)",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(180),
            },
            { name: "attribution", title: "Attribution", type: "string" },
            { name: "source", title: "Source (Guardian, TripAdvisor, etc.)", type: "string" },
            {
              name: "sourceUrl",
              title: "Source URL",
              type: "url",
            },
            {
              name: "datePublished",
              title: "Date published",
              type: "date",
            },
          ],
        },
      ],
    }),

    /* --------------------------- JOURNAL TEASER --------------------------- */
    defineField({
      name: "journalHeading",
      title: "Journal teaser heading",
      type: "string",
      group: "journal",
    }),
    defineField({
      name: "featuredArticles",
      title: "Featured journal articles",
      type: "array",
      group: "journal",
      of: [{ type: "reference", to: [{ type: "journalArticle" }] }],
      validation: (Rule) => Rule.max(3),
    }),

    /* ----------------------------- FOOTER CLOSER -------------------------- */
    defineField({
      name: "closerHeading",
      title: "Closing block heading",
      type: "string",
      group: "closer",
    }),
    defineField({
      name: "closerBody",
      title: "Closing block body",
      type: "text",
      rows: 4,
      group: "closer",
    }),
    defineField({
      name: "closerCta",
      title: "Closing CTA",
      type: "ctaButton",
      group: "closer",
    }),
    defineField({
      name: "closerImage",
      title: "Closing image (full-bleed)",
      type: "imageWithAlt",
      group: "closer",
    }),

    /* ------------------------------- SEO ---------------------------------- */
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
