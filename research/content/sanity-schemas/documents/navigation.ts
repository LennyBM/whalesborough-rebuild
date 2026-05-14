/**
 * navigation — singleton.
 * Header mega-menu, sticky utility nav, footer columns, hero CTAs.
 */

import { defineField, defineType } from "sanity";
import { MenuIcon } from "@sanity/icons";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation (singleton)",
  type: "document",
  icon: MenuIcon,
  groups: [
    { name: "header", title: "Header / mega-menu" },
    { name: "footer", title: "Footer" },
    { name: "utility", title: "Utility / sticky" },
    { name: "mobile", title: "Mobile drawer" },
  ],
  fields: [
    /* ------------------------------ HEADER -------------------------------- */
    defineField({
      name: "headerLogoVariant",
      title: "Header logo variant",
      type: "string",
      group: "header",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Inverse (over hero)", value: "inverse" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "headerPrimary",
      title: "Header primary nav (left)",
      type: "array",
      group: "header",
      of: [
        {
          type: "object",
          name: "megaItem",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Direct link", value: "link" },
                  { title: "Mega-menu panel", value: "mega" },
                ],
              },
              initialValue: "link",
            },
            {
              name: "link",
              title: "Link",
              type: "ctaButton",
              hidden: ({ parent }) => parent?.type !== "link",
            },
            {
              name: "columns",
              title: "Mega-menu columns",
              type: "array",
              hidden: ({ parent }) => parent?.type !== "mega",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "heading", title: "Column heading", type: "string" },
                    {
                      name: "subheading",
                      title: "Sub-heading / promo line",
                      type: "string",
                    },
                    {
                      name: "links",
                      title: "Links in column",
                      type: "array",
                      of: [{ type: "ctaButton" }],
                    },
                    {
                      name: "featuredImage",
                      title: "Featured image (right rail)",
                      type: "imageWithAlt",
                    },
                    {
                      name: "featuredLabel",
                      title: "Featured caption",
                      type: "string",
                    },
                    {
                      name: "featuredCta",
                      title: "Featured CTA",
                      type: "ctaButton",
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { label: "label", type: "type" },
            prepare({ label, type }) {
              return { title: label, subtitle: type };
            },
          },
        },
      ],
    }),
    defineField({
      name: "headerCtas",
      title: "Header CTAs (right of nav)",
      description:
        "Typically 'Book a stay' (primary), 'Reserve a table' (secondary), 'Sign in' (ghost).",
      type: "array",
      group: "header",
      of: [{ type: "ctaButton" }],
      validation: (Rule) => Rule.max(4),
    }),

    /* ------------------------------ UTILITY ------------------------------- */
    defineField({
      name: "utilityBar",
      title: "Utility bar (top-most)",
      description:
        "Tiny links above the main nav — phone, email, members-sign-in, language.",
      type: "array",
      group: "utility",
      of: [{ type: "ctaButton" }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "stickyMobileCta",
      title: "Sticky mobile CTA",
      description:
        "Persistent bottom CTA bar on mobile. Usually 'Book a stay'.",
      type: "ctaButton",
      group: "utility",
    }),

    /* ------------------------------- FOOTER ------------------------------- */
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Column heading", type: "string" },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "ctaButton" }],
            },
          ],
          preview: {
            select: { heading: "heading" },
            prepare({ heading }) {
              return { title: heading || "Untitled column" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerLegalLinks",
      title: "Footer legal-row links",
      description:
        "Bottom row — Privacy, Terms, Cookies, Accessibility, Modern Slavery, Companies House.",
      type: "array",
      group: "footer",
      of: [{ type: "ctaButton" }],
    }),
    defineField({
      name: "footerNewsletterCopy",
      title: "Footer newsletter heading + body",
      type: "object",
      group: "footer",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "body", title: "Body", type: "text", rows: 2 },
        { name: "buttonLabel", title: "Button label", type: "string" },
        {
          name: "consentText",
          title: "Consent text",
          type: "text",
          rows: 2,
        },
      ],
    }),
    defineField({
      name: "footerClosingLine",
      title: "Footer closing line",
      description:
        "e.g. 'Whalesborough Farm Resort & Spa — 400 acres above Widemouth Bay'.",
      type: "string",
      group: "footer",
    }),

    /* ------------------------------- MOBILE ------------------------------- */
    defineField({
      name: "mobileDrawerSections",
      title: "Mobile drawer sections",
      type: "array",
      group: "mobile",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Section heading", type: "string" },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "ctaButton" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "audit",
      title: "Audit",
      type: "audit",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
