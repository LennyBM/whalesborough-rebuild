/**
 * UK address object — used in siteSettings and contact pages.
 */

import { defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

export const address = defineType({
  name: "address",
  title: "Address",
  type: "object",
  icon: PinIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description:
        "What is this address? e.g. 'Resort reception', 'Registered office', 'Spa entrance'.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "line1",
      title: "Address line 1",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "line2", title: "Address line 2", type: "string" }),
    defineField({
      name: "town",
      title: "Town / city",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "county", title: "County", type: "string" }),
    defineField({
      name: "postcode",
      title: "Postcode",
      type: "string",
      description: "Use UK postcode format with the space, e.g. EX23 0JD.",
      validation: (Rule) =>
        Rule.required().regex(
          /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
          { name: "uk-postcode", invert: false },
        ),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      initialValue: "United Kingdom",
    }),
    defineField({
      name: "what3words",
      title: "what3words",
      type: "string",
      description:
        "e.g. ///lagging.amusement.scarcely. Useful for resort wayfinding and ambulance access.",
      validation: (Rule) =>
        Rule.regex(/^\/\/\/?[a-z]+\.[a-z]+\.[a-z]+$/, {
          name: "what3words",
          invert: false,
        }).warning("Use format ///word.word.word"),
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      validation: (Rule) => Rule.min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      validation: (Rule) => Rule.min(-180).max(180),
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
    }),
  ],
  preview: {
    select: { label: "label", town: "town", postcode: "postcode" },
    prepare({ label, town, postcode }) {
      return {
        title: label,
        subtitle: [town, postcode].filter(Boolean).join(", "),
      };
    },
  },
});
