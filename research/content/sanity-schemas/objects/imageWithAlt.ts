/**
 * Image with required alt text + caption + credit + focal point.
 * Used everywhere on the site for accessibility + WCAG 2.2 AA.
 *
 * @author  Whalesborough CMS
 * @since   2026-05
 */

import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image (with alt text)",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "palette", "exif"],
      },
      validation: (Rule) => Rule.required().error("An image file is required."),
    }),
    defineField({
      name: "alt",
      title: "Alt text (required — WCAG 2.2 AA)",
      description:
        "Describe what the image contains for screen-reader users and search engines. " +
        'Aim for 8–14 words. Do not start with "Image of" or "Photo of".',
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(180)
          .error("Alt text must be 4–180 characters."),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      description:
        "Shown publicly under the image. Editorial voice — short, evocative, never a duplicate of alt text.",
      type: "string",
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "credit",
      title: "Credit / photographer",
      description:
        "Visible attribution line. Required if the asset was licensed or supplied by a third party.",
      type: "string",
    }),
    defineField({
      name: "takenAt",
      title: "Date taken",
      type: "date",
      description: "Useful for the seasonal-vibe homepage switcher.",
    }),
    defineField({
      name: "focalPoint",
      title: "Mobile focal-point note",
      description:
        "If the Sanity hotspot is not enough, describe which part of the image must stay visible on mobile (e.g. 'sky in the top third').",
      type: "string",
    }),
    defineField({
      name: "decorative",
      title: "Mark as decorative (alt will be empty)",
      description:
        "Only tick if the image is purely decorative (e.g. a divider). Most product imagery is NOT decorative.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "alt",
      subtitle: "caption",
      media: "image",
    },
  },
});
