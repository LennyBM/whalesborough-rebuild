/**
 * Audit fields embedded on every content document.
 * Captures editing accountability, publish state, FCA / Legal / Marketing review flags.
 */

import { defineField, defineType } from "sanity";
import { ActivityIcon } from "@sanity/icons";

export const audit = defineType({
  name: "audit",
  title: "Audit & review",
  type: "object",
  icon: ActivityIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "publishStatus",
      title: "Publish status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "In review", value: "in_review" },
          { title: "Approved", value: "approved" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "flagsForReview",
      title: "Flags for review",
      description:
        "Tick any compliance area that must sign this content off before publishing.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "FCA review (financial promotions / yield claims)", value: "FCA" },
          { title: "Legal review (Ts & Cs / privacy / accessibility)", value: "Legal" },
          { title: "Marketing review (brand voice / proof)", value: "Marketing" },
          { title: "Verify facts (operations, hours, prices)", value: "Verify" },
          { title: "Accessibility check (WCAG 2.2 AA)", value: "A11y" },
          { title: "Photography re-shoot needed", value: "Photo" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "lastVerifiedAt",
      title: "Last verified at",
      description:
        "When were the facts on this page last checked? Required on anything with prices, hours, or claims.",
      type: "datetime",
    }),
    defineField({
      name: "lastVerifiedBy",
      title: "Last verified by",
      type: "string",
      description: "Editor name or role.",
    }),
    defineField({
      name: "lastEditedAt",
      title: "Last edited at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "lastEditedBy",
      title: "Last edited by",
      type: "string",
      description: "Auto-populated by GROQ hook on save.",
      readOnly: true,
    }),
    defineField({
      name: "internalNotes",
      title: "Internal notes",
      description: "Editor scratchpad. Never published.",
      type: "text",
      rows: 4,
    }),
  ],
});
