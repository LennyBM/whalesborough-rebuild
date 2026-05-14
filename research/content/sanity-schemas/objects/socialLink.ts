/**
 * Social link object — used in siteSettings, author, navigation footer.
 */

import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
          { title: "TikTok", value: "tiktok" },
          { title: "YouTube", value: "youtube" },
          { title: "X / Twitter", value: "x" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Pinterest", value: "pinterest" },
          { title: "Threads", value: "threads" },
          { title: "Bluesky", value: "bluesky" },
          { title: "TripAdvisor", value: "tripadvisor" },
          { title: "Google Business Profile", value: "googlebp" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "handle",
      title: "Handle / username",
      description: "Without the @ — e.g. 'whalesboroughfarm'.",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["https"] }),
    }),
  ],
  preview: {
    select: { platform: "platform", handle: "handle" },
    prepare({ platform, handle }) {
      return {
        title: handle ? `@${handle}` : platform,
        subtitle: platform,
      };
    },
  },
});
