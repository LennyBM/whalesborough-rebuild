/**
 * supplier — local farm / producer credited on menus.
 * Referenced from menuItem and shown on the Suppliers / Provenance page.
 */

import { defineField, defineType } from "sanity";
import { LeaveIcon } from "@sanity/icons";

export const supplier = defineType({
  name: "supplier",
  title: "Supplier / producer",
  type: "document",
  icon: LeaveIcon,
  fields: [
    defineField({
      name: "name",
      title: "Supplier name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "distanceMiles",
      title: "Distance from estate (miles)",
      description: "Used for the 'x miles from our kitchen' editorial line.",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "drivingMinutes",
      title: "Driving time (minutes)",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Meat / butcher", value: "meat" },
          { title: "Fish / shellfish", value: "fish" },
          { title: "Dairy / cheese", value: "dairy" },
          { title: "Bakery", value: "bakery" },
          { title: "Vegetable grower", value: "veg" },
          { title: "Fruit grower / orchard", value: "fruit" },
          { title: "Drinks — wine", value: "wine" },
          { title: "Drinks — beer / cider", value: "beer-cider" },
          { title: "Drinks — spirits", value: "spirits" },
          { title: "Coffee", value: "coffee" },
          { title: "Honey / preserves", value: "honey" },
          { title: "Game / wild food", value: "wild" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatTheyGrow",
      title: "What they grow / make",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "shortBio",
      title: "Short bio (1–2 sentences)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "fullBio",
      title: "Full bio (suppliers page)",
      type: "portableText",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "image",
      title: "Featured image (farmer / produce / farm)",
      type: "imageWithAlt",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Soil Association Organic", value: "soil-organic" },
          { title: "RSPCA Assured", value: "rspca" },
          { title: "MSC sustainable seafood", value: "msc" },
          { title: "Red Tractor", value: "red-tractor" },
          { title: "Demeter biodynamic", value: "demeter" },
          { title: "B Corp", value: "bcorp" },
          { title: "LEAF Marque", value: "leaf" },
          { title: "Local-source charter", value: "local-charter" },
        ],
      },
    }),
    defineField({
      name: "since",
      title: "Working with us since",
      type: "date",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured on suppliers page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      title: "name",
      cat: "category",
      miles: "distanceMiles",
      media: "image.image",
    },
    prepare({ title, cat, miles, media }) {
      return {
        title,
        subtitle: `${cat ?? "—"} • ${miles ?? "?"} mi`,
        media,
      };
    },
  },
});
