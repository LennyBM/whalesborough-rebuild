/**
 * banner — site-wide announcement / promo / urgent strip.
 * Sits above (or below) the main nav. Auto-expires.
 */

import { defineField, defineType } from "sanity";
import { MegaphoneIcon } from "@sanity/icons";

export const banner = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  icon: MegaphoneIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Announcement (neutral teal)", value: "announcement" },
          { title: "Promo (coral accent)", value: "promo" },
          { title: "Urgent (red — outages, weather)", value: "urgent" },
          { title: "Editorial (cream — soft)", value: "editorial" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "copy",
      title: "Banner copy (one line)",
      type: "string",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "secondaryCopy",
      title: "Secondary copy (small line)",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "ctaButton",
    }),
    defineField({
      name: "dismissable",
      title: "User-dismissable",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showFrom",
      title: "Show from",
      type: "datetime",
    }),
    defineField({
      name: "expiresAt",
      title: "Expires at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showOnPaths",
      title: "Show on paths (URL prefixes)",
      description:
        "Comma-separated path prefixes. e.g. '/stay,/spa'. Blank = site-wide.",
      type: "string",
    }),
    defineField({
      name: "hideOnPaths",
      title: "Hide on paths",
      type: "string",
    }),
    defineField({
      name: "priority",
      title: "Priority (lower = higher)",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Expired / archived", value: "archived" },
        ],
      },
      initialValue: "active",
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      title: "copy",
      subtitle: "type",
      expiresAt: "expiresAt",
    },
    prepare({ title, subtitle, expiresAt }) {
      return {
        title,
        subtitle: `${subtitle} • exp ${expiresAt?.slice(0, 10) ?? "—"}`,
      };
    },
  },
});
