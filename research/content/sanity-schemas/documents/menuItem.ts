/**
 * menuItem — single dish on a menu.
 * Allergens (UK 14), dietary tags, signature flag, supplier credit.
 */

import { defineField, defineType } from "sanity";
import { OliveIcon } from "@sanity/icons";

export const UK_ALLERGENS_14 = [
  { title: "Celery", value: "celery" },
  { title: "Cereals containing gluten", value: "gluten" },
  { title: "Crustaceans", value: "crustaceans" },
  { title: "Eggs", value: "eggs" },
  { title: "Fish", value: "fish" },
  { title: "Lupin", value: "lupin" },
  { title: "Milk (dairy)", value: "milk" },
  { title: "Molluscs", value: "molluscs" },
  { title: "Mustard", value: "mustard" },
  { title: "Tree nuts", value: "tree-nuts" },
  { title: "Peanuts", value: "peanuts" },
  { title: "Sesame", value: "sesame" },
  { title: "Soybeans", value: "soybeans" },
  { title: "Sulphur dioxide / sulphites", value: "sulphites" },
];

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu item",
  type: "document",
  icon: OliveIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Menu description as it appears printed. Short, sensory.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "longDescription",
      title: "Long description (web only)",
      type: "portableText",
    }),
    defineField({
      name: "pricePence",
      title: "Price (pence)",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .max(50000)
          .error("Prices are pence integers (e.g. 1850 for £18.50)."),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "string",
      options: {
        list: [
          { title: "Snack / nibble", value: "snack" },
          { title: "Starter", value: "starter" },
          { title: "Small plate", value: "small-plate" },
          { title: "Main", value: "main" },
          { title: "Side", value: "side" },
          { title: "Pudding / dessert", value: "pudding" },
          { title: "Cheese", value: "cheese" },
          { title: "Drink — cocktail", value: "cocktail" },
          { title: "Drink — wine", value: "wine" },
          { title: "Drink — beer / cider", value: "beer-cider" },
          { title: "Drink — spirit", value: "spirit" },
          { title: "Drink — soft", value: "soft" },
          { title: "Drink — hot", value: "hot-drink" },
          { title: "Kids", value: "kids" },
          { title: "Dogs", value: "dogs" },
        ],
      },
    }),
    defineField({
      name: "dietaryTags",
      title: "Dietary tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegetarian (v)", value: "v" },
          { title: "Vegan (vg)", value: "vg" },
          { title: "Gluten-free (gf)", value: "gf" },
          { title: "Dairy-free (df)", value: "df" },
          { title: "Low-FODMAP", value: "fodmap" },
          { title: "Pescatarian", value: "pesc" },
          { title: "Halal", value: "halal" },
          { title: "Spicy", value: "spicy" },
          { title: "Contains alcohol", value: "alcohol" },
        ],
      },
    }),
    defineField({
      name: "allergens",
      title: "Allergens (UK 14)",
      description: "Tick every allergen present. Required by Natasha's Law.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: UK_ALLERGENS_14,
        layout: "grid",
      },
    }),
    defineField({
      name: "containsAlcoholAbv",
      title: "ABV %",
      description: "Only for alcoholic drinks.",
      type: "number",
      validation: (Rule) => Rule.min(0).max(80),
    }),
    defineField({
      name: "calories",
      title: "Calories (kcal)",
      description:
        "Required by the Calorie Labelling Regulations 2021 for restaurants with > 250 employees " +
        "or sites publishing menus online. Tick the legal exemption note in audit if not applicable.",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "isSignature",
      title: "Signature dish",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isNew",
      title: "New / just added",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isSeasonal",
      title: "Seasonal item",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "availableFrom",
      title: "Available from",
      type: "date",
    }),
    defineField({
      name: "availableUntil",
      title: "Available until",
      type: "date",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "supplier",
      title: "Hero supplier",
      type: "reference",
      to: [{ type: "supplier" }],
      description:
        "If this dish hero-credits a single supplier (e.g. 'Treffry Estate beef'). " +
        "Use additionalSuppliers for the supporting cast.",
    }),
    defineField({
      name: "additionalSuppliers",
      title: "Additional suppliers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "supplier" }] }],
    }),
    defineField({
      name: "winePairingRef",
      title: "Suggested wine pairing",
      type: "reference",
      to: [{ type: "menuItem" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "On the menu", value: "active" },
          { title: "86'd today (sold out)", value: "soldout" },
          { title: "Drafted (not yet live)", value: "draft" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "active",
    }),
    defineField({ name: "audit", title: "Audit", type: "audit" }),
  ],
  preview: {
    select: {
      title: "name",
      price: "pricePence",
      sig: "isSignature",
      media: "image.image",
    },
    prepare({ title, price, sig, media }) {
      const label = `£${((price ?? 0) / 100).toFixed(2)}${sig ? " • signature" : ""}`;
      return { title, subtitle: label, media };
    },
  },
});
