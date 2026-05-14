/**
 * Pence-denominated price field with optional weekday/weekend variance.
 * Always store in pence (integer) — never floating-point pounds.
 */

import { defineField, defineType } from "sanity";

export const priceField = defineType({
  name: "priceField",
  title: "Price (pence, GBP)",
  type: "object",
  fields: [
    defineField({
      name: "weekday",
      title: "Weekday price (pence)",
      description:
        "Integer pence — e.g. 9000 for £90.00. Mon–Thu rate.",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .error("Use integer pence (e.g. 9000 for £90)."),
    }),
    defineField({
      name: "weekend",
      title: "Weekend price (pence) — optional",
      description: "Fri–Sun rate. Leave blank if same as weekday.",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "memberDiscountPercent",
      title: "Member discount %",
      description: "Default member rate. Leave blank for no member discount.",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "GBP",
      readOnly: true,
    }),
    defineField({
      name: "vatInclusive",
      title: "VAT-inclusive",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { wd: "weekday", we: "weekend" },
    prepare({ wd, we }) {
      const fmt = (p?: number) =>
        typeof p === "number" ? `£${(p / 100).toFixed(2)}` : "—";
      return {
        title: we ? `${fmt(wd)} / ${fmt(we)}` : fmt(wd),
        subtitle: "Weekday / weekend (incl. VAT)",
      };
    },
  },
});
