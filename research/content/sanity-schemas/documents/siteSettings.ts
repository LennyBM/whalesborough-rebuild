/**
 * siteSettings — singleton, one document.
 *
 * Resort identity, contact, social, legal disclosures, STL registration numbers,
 * Companies House #, ICO #. Surfaces into footer and Organization JSON-LD.
 */

import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings (singleton)",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Identity" },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "legal", title: "Legal & compliance" },
    { name: "stl", title: "STL registrations" },
    { name: "default", title: "Defaults" },
  ],
  fields: [
    /* ----------------------------- IDENTITY ------------------------------- */
    defineField({
      name: "name",
      title: "Resort name (public)",
      type: "string",
      group: "identity",
      initialValue: "Whalesborough Farm Resort & Spa",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      type: "string",
      group: "identity",
      initialValue: "Whalesborough",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      description: "Used in OG, meta description fallback, hero subtitle.",
    }),
    defineField({
      name: "logo",
      title: "Primary logo (SVG preferred)",
      type: "imageWithAlt",
      group: "identity",
    }),
    defineField({
      name: "logoInverse",
      title: "Inverse logo (white on dark)",
      type: "imageWithAlt",
      group: "identity",
    }),
    defineField({
      name: "favicon",
      title: "Favicon source (512×512 PNG)",
      type: "image",
      group: "identity",
    }),
    defineField({
      name: "themeColor",
      title: "Theme colour (hex)",
      type: "string",
      group: "identity",
      initialValue: "#1A4D4A",
      description: "Used in <meta name='theme-color'> and PWA manifest.",
    }),

    /* ------------------------------ CONTACT ------------------------------- */
    defineField({
      name: "primaryEmail",
      title: "Primary contact email",
      type: "string",
      group: "contact",
      validation: (Rule) =>
        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "valid-email"),
    }),
    defineField({
      name: "primaryPhone",
      title: "Primary phone (E.164)",
      type: "string",
      group: "contact",
      description: "e.g. +441288xxxxxx",
    }),
    defineField({
      name: "whatsAppPhone",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "reservationsEmail",
      title: "Reservations email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "spaEmail",
      title: "Spa email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "restaurantEmail",
      title: "Restaurant email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "addresses",
      title: "Addresses",
      type: "array",
      group: "contact",
      of: [{ type: "address" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "openingHours",
      title: "Opening hours (per venue)",
      type: "array",
      group: "contact",
      of: [{ type: "openingHours" }],
    }),

    /* ------------------------------ SOCIAL -------------------------------- */
    defineField({
      name: "socialLinks",
      title: "Social profiles",
      type: "array",
      group: "social",
      of: [{ type: "socialLink" }],
    }),

    /* ----------------------------- LEGAL ---------------------------------- */
    defineField({
      name: "companyName",
      title: "Registered company name",
      type: "string",
      group: "legal",
      description: "e.g. 'Whalesborough Farm Holidays Ltd'.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companiesHouseNumber",
      title: "Companies House number",
      type: "string",
      group: "legal",
      description: "8-digit (e.g. 12345678).",
      validation: (Rule) =>
        Rule.required().regex(/^\d{8}$/, "8-digit").error(
          "Must be 8 digits — see Companies House register.",
        ),
    }),
    defineField({
      name: "vatNumber",
      title: "VAT registration number",
      type: "string",
      group: "legal",
      description: "GB + 9 digits (or 12 if branch).",
      validation: (Rule) =>
        Rule.regex(/^GB\d{9,12}$/, "GB-VAT").warning(
          "Use format GB123456789.",
        ),
    }),
    defineField({
      name: "icoNumber",
      title: "ICO registration number",
      type: "string",
      group: "legal",
      description: "Data Protection registration — e.g. ZA123456.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "registeredOffice",
      title: "Registered office address",
      type: "address",
      group: "legal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dataProtectionOfficer",
      title: "Data Protection Officer contact",
      type: "object",
      group: "legal",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "email", title: "Email", type: "string" },
      ],
    }),

    /* --------------------- STL REGISTRATIONS (Cornwall) ------------------- */
    defineField({
      name: "stlRegistrations",
      title: "Short-Term Letting registration numbers",
      description:
        "Cornwall STL register — one entry per unit. Required on listing pages from 2026.",
      type: "array",
      group: "stl",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "property",
              title: "Property",
              type: "reference",
              to: [{ type: "property" }],
            },
            {
              name: "registrationNumber",
              title: "STL registration number",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "renewsAt",
              title: "Renewal date",
              type: "date",
            },
            { name: "issuingAuthority", title: "Authority", type: "string" },
          ],
          preview: {
            select: {
              prop: "property.name",
              reg: "registrationNumber",
            },
            prepare({ prop, reg }) {
              return {
                title: prop ?? "Property",
                subtitle: reg ?? "No number",
              };
            },
          },
        },
      ],
    }),

    /* ----------------------------- DEFAULTS ------------------------------- */
    defineField({
      name: "defaultCurrency",
      title: "Default currency",
      type: "string",
      group: "default",
      initialValue: "GBP",
      readOnly: true,
    }),
    defineField({
      name: "defaultLocale",
      title: "Default locale",
      type: "string",
      group: "default",
      initialValue: "en-GB",
    }),
    defineField({
      name: "audit",
      title: "Audit & review",
      type: "audit",
      group: "default",
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }) {
      return { title: title ?? "Site settings" };
    },
  },
});
