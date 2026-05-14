/**
 * author — journal article author.
 */

import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      name: "role",
      title: "Role / job title",
      type: "string",
      description:
        "e.g. 'Head of Spa', 'Head Chef', 'Estate Manager', 'Founder'.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "portableText",
    }),
    defineField({
      name: "shortBio",
      title: "Short bio (1 sentence — for article footer)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social profiles",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "isInternal",
      title: "Internal staff member",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo.image" },
  },
});
