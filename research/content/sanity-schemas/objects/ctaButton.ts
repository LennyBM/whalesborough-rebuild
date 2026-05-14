/**
 * Re-usable CTA button. Renders consistently across heroes, banners, cards, content blocks.
 */

import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "CTA button",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Button label",
      type: "string",
      description:
        "Action-specific verb phrase. e.g. 'Book a stay', 'Reserve a table', 'Plan your spa day'. " +
        "Avoid 'Click here' or 'Learn more'.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(40)
          .error("Labels must be 2–40 characters."),
    }),
    defineField({
      name: "linkType",
      title: "Link type",
      type: "string",
      options: {
        list: [
          { title: "Internal page", value: "internal" },
          { title: "External URL", value: "external" },
          { title: "Email (mailto:)", value: "email" },
          { title: "Telephone (tel:)", value: "phone" },
          { title: "Anchor on same page (#section-id)", value: "anchor" },
          { title: "Document download", value: "file" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalLink",
      title: "Internal page",
      type: "reference",
      to: [
        { type: "page" },
        { type: "property" },
        { type: "treatment" },
        { type: "spaPackage" },
        { type: "arvorPackage" },
        { type: "lodgeModel" },
        { type: "journalArticle" },
        { type: "restaurantEvent" },
        { type: "activity" },
        { type: "offer" },
      ],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === "internal" && !value) {
            return "Choose an internal page.";
          }
          return true;
        }),
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https", "http"],
          allowRelative: false,
        }).custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === "external" && !value) {
            return "External URL is required.";
          }
          return true;
        }),
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      hidden: ({ parent }) => parent?.linkType !== "email",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === "email") {
            if (!value) return "Email is required.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string))
              return "Invalid email format.";
          }
          return true;
        }),
    }),
    defineField({
      name: "phone",
      title: "Telephone number",
      type: "string",
      description: "Full E.164 format preferred — e.g. +441288xxxxxx.",
      hidden: ({ parent }) => parent?.linkType !== "phone",
    }),
    defineField({
      name: "anchor",
      title: "Anchor ID (without the #)",
      type: "string",
      hidden: ({ parent }) => parent?.linkType !== "anchor",
    }),
    defineField({
      name: "file",
      title: "File to download",
      type: "file",
      hidden: ({ parent }) => parent?.linkType !== "file",
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      description: "Automatically true for external links. Manual override otherwise.",
      initialValue: false,
    }),
    defineField({
      name: "variant",
      title: "Button style",
      type: "string",
      options: {
        list: [
          { title: "Primary (filled teal)", value: "primary" },
          { title: "Secondary (outline teal)", value: "secondary" },
          { title: "Ghost (text only, coral underline)", value: "ghost" },
          { title: "Inverse (white on dark hero)", value: "inverse" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "sm" },
          { title: "Medium (default)", value: "md" },
          { title: "Large (hero)", value: "lg" },
        ],
        layout: "radio",
      },
      initialValue: "md",
    }),
    defineField({
      name: "ariaLabel",
      title: "Accessibility label override",
      description:
        "Only set if the button label alone is ambiguous to screen readers (e.g. 'Read more').",
      type: "string",
    }),
  ],
  preview: {
    select: {
      label: "label",
      type: "linkType",
      variant: "variant",
    },
    prepare({ label, type, variant }) {
      return {
        title: label || "Untitled CTA",
        subtitle: `${variant ?? "primary"} • ${type ?? "internal"}`,
      };
    },
  },
});
