/**
 * Portable Text — the rich-text body type used across the site.
 * Supports H2–H4, lists, quotes, inline images, internal references, footnotes,
 * highlight callouts, and the gold-accent phrase span.
 */

import { defineArrayMember, defineType } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Body (rich text)",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
        { title: "BLUF (bottom line up front)", value: "bluf" },
        { title: "Lead paragraph", value: "lead" },
      ],
      lists: [
        { title: "Bulleted", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strikethrough", value: "strike-through" },
          { title: "Code", value: "code" },
          { title: "Gold accent (signature highlight)", value: "goldAccent" },
        ],
        annotations: [
          {
            name: "internalLink",
            title: "Internal link",
            type: "object",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Page / property / article",
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
                  { type: "faq" },
                  { type: "localAreaPOI" },
                ],
              },
            ],
          },
          {
            name: "link",
            title: "External link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["https", "http", "mailto", "tel"],
                  }),
              },
              {
                name: "rel",
                title: "Rel attribute",
                type: "string",
                options: {
                  list: ["nofollow", "noopener noreferrer", "sponsored", "ugc"],
                },
              },
            ],
          },
          {
            name: "footnote",
            title: "Footnote",
            type: "object",
            fields: [
              {
                name: "text",
                title: "Footnote text",
                type: "text",
                rows: 3,
                validation: (Rule) => Rule.required().max(500),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "imageWithAlt",
    }),
    defineArrayMember({
      type: "object",
      name: "calloutBox",
      title: "Callout box",
      fields: [
        {
          name: "tone",
          title: "Tone",
          type: "string",
          options: {
            list: [
              { title: "Info (teal)", value: "info" },
              { title: "Warning (amber)", value: "warning" },
              { title: "Success (sage)", value: "success" },
              { title: "Quote (cream)", value: "quote" },
              { title: "Tip (coral)", value: "tip" },
            ],
          },
          initialValue: "info",
        },
        { name: "title", title: "Title", type: "string" },
        { name: "body", title: "Body", type: "text", rows: 4 },
      ],
      preview: {
        select: { title: "title", subtitle: "tone" },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "pullQuote",
      title: "Pull quote",
      fields: [
        {
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(400),
        },
        { name: "attribution", title: "Attribution", type: "string" },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "factTable",
      title: "Fact table (AI-search friendly)",
      fields: [
        { name: "caption", title: "Caption", type: "string" },
        {
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "key", type: "string", title: "Key" },
                { name: "value", type: "string", title: "Value" },
              ],
            },
          ],
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "embed",
      title: "Embed (video / map / form)",
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "YouTube", value: "youtube" },
              { title: "Vimeo", value: "vimeo" },
              { title: "Google Map", value: "gmap" },
              { title: "Try.be booking widget", value: "trybe" },
              { title: "Landal booking iframe", value: "landal" },
            ],
          },
        },
        {
          name: "url",
          title: "URL",
          type: "url",
          validation: (Rule) => Rule.required(),
        },
        { name: "title", title: "Title (for a11y)", type: "string" },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "ctaBlock",
      title: "CTA block",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "body", title: "Body", type: "text", rows: 2 },
        {
          name: "primary",
          title: "Primary CTA",
          type: "ctaButton",
        },
        {
          name: "secondary",
          title: "Secondary CTA",
          type: "ctaButton",
        },
      ],
    }),
  ],
});
