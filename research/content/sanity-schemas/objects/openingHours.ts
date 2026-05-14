/**
 * Opening hours schedule — supports a day-of-week pattern with seasonal overrides.
 * Outputs LocalBusiness.openingHoursSpecification JSON-LD.
 */

import { defineField, defineType } from "sanity";

export const openingHours = defineType({
  name: "openingHours",
  title: "Opening hours",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Schedule label",
      description:
        "What does this schedule represent? e.g. 'Restaurant — main season', 'Spa — winter hours'.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "validFrom",
      title: "Valid from",
      type: "date",
    }),
    defineField({
      name: "validUntil",
      title: "Valid until",
      type: "date",
    }),
    defineField({
      name: "schedule",
      title: "Day-by-day schedule",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: [
                  { title: "Monday", value: "Mo" },
                  { title: "Tuesday", value: "Tu" },
                  { title: "Wednesday", value: "We" },
                  { title: "Thursday", value: "Th" },
                  { title: "Friday", value: "Fr" },
                  { title: "Saturday", value: "Sa" },
                  { title: "Sunday", value: "Su" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            { name: "opens", title: "Opens (HH:mm)", type: "string" },
            { name: "closes", title: "Closes (HH:mm)", type: "string" },
            {
              name: "closedAllDay",
              title: "Closed all day",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "noteToGuest",
              title: "Public note (optional)",
              type: "string",
            },
          ],
          preview: {
            select: {
              day: "day",
              opens: "opens",
              closes: "closes",
              closed: "closedAllDay",
            },
            prepare({ day, opens, closes, closed }) {
              return {
                title: day,
                subtitle: closed ? "Closed" : `${opens ?? "—"} – ${closes ?? "—"}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "exceptions",
      title: "Calendar exceptions (closures, bank holidays)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "date", title: "Date", type: "date" },
            { name: "reason", title: "Reason", type: "string" },
            { name: "opens", title: "Opens", type: "string" },
            { name: "closes", title: "Closes", type: "string" },
            {
              name: "closed",
              title: "Closed all day",
              type: "boolean",
              initialValue: true,
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { label: "label", from: "validFrom", until: "validUntil" },
    prepare({ label, from, until }) {
      return {
        title: label,
        subtitle: [from, until].filter(Boolean).join(" → "),
      };
    },
  },
});
