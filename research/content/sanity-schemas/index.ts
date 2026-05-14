/**
 * Sanity Studio v4 schema index — Whalesborough Farm Resort & Spa.
 *
 * Drop this into the Studio's `sanity.config.ts`:
 *
 *   import { schemaTypes } from "./schemas";
 *   export default defineConfig({ ..., schema: { types: schemaTypes } });
 *
 * Singletons are listed first; reusable objects last. The order here drives
 * the side-rail in Studio Vision.
 *
 * Schema count: 35 (3 singletons + 22 documents + 10 objects).
 */

/* ------------------------------ Singletons ----------------------------------- */
import { siteSettings } from "./documents/siteSettings";
import { navigation } from "./documents/navigation";
import { homepage } from "./documents/homepage";
import { seoDefaults } from "./documents/seoDefaults";

/* ----------------------------- Accommodation -------------------------------- */
import { property } from "./documents/property";
import { amenity } from "./documents/amenity";
import { arvorPackage } from "./documents/arvorPackage";

/* --------------------------------- Spa --------------------------------------- */
import { treatment } from "./documents/treatment";
import { spaCategory } from "./documents/spaCategory";
import { spaPackage } from "./documents/spaPackage";
import { membershipTier } from "./documents/membershipTier";

/* ------------------------------ Restaurant ---------------------------------- */
import { menu } from "./documents/menu";
import { menuSection } from "./documents/menuSection";
import { menuItem } from "./documents/menuItem";
import { supplier } from "./documents/supplier";
import { restaurantEvent } from "./documents/restaurantEvent";

/* ------------------------------ Lodge sales --------------------------------- */
import { lodgeModel } from "./documents/lodgeModel";
import { lodgePlot } from "./documents/lodgePlot";
import { lodgeOffer } from "./documents/lodgeOffer";

/* ------------------------------- Activities --------------------------------- */
import { activity } from "./documents/activity";

/* -------------------------------- Content ----------------------------------- */
import { journalArticle } from "./documents/journalArticle";
import { author } from "./documents/author";
import { page } from "./documents/page";
import { faq } from "./documents/faq";
import { localAreaPOI } from "./documents/localAreaPOI";

/* -------------------------------- Marketing --------------------------------- */
import { banner } from "./documents/banner";
import { offer } from "./documents/offer";
import { seasonalContent } from "./documents/seasonalContent";

/* ----------------------------- Sustainability ------------------------------- */
import { sustainabilityMetric } from "./documents/sustainabilityMetric";
import { award } from "./documents/award";

/* --------------------------- Loyalty / vouchers ----------------------------- */
import { giftVoucherProduct } from "./documents/giftVoucherProduct";
import { loyaltyTier } from "./documents/loyaltyTier";

/* -------------------------------- Objects ----------------------------------- */
import { ctaButton } from "./objects/ctaButton";
import { seo } from "./objects/seo";
import { imageWithAlt } from "./objects/imageWithAlt";
import { audit } from "./objects/audit";
import { address } from "./objects/address";
import { socialLink } from "./objects/socialLink";
import { portableText } from "./objects/portableText";
import { openingHours } from "./objects/openingHours";
import { priceField } from "./objects/priceField";
import { linkRef } from "./objects/linkRef";

/**
 * The order here drives the Studio side-rail.
 * Group singletons at the top, then the core booking types,
 * then content, then marketing, then objects (hidden).
 */
export const schemaTypes = [
  // singletons (one document each — pin in desk structure)
  siteSettings,
  navigation,
  homepage,
  seoDefaults,

  // accommodation
  property,
  amenity,
  arvorPackage,

  // spa
  spaCategory,
  treatment,
  spaPackage,
  membershipTier,

  // restaurant
  menu,
  menuSection,
  menuItem,
  supplier,
  restaurantEvent,

  // lodge sales
  lodgeModel,
  lodgePlot,
  lodgeOffer,

  // activities
  activity,

  // content
  page,
  journalArticle,
  author,
  faq,
  localAreaPOI,

  // marketing
  banner,
  offer,
  seasonalContent,

  // sustainability
  sustainabilityMetric,
  award,

  // loyalty
  giftVoucherProduct,
  loyaltyTier,

  // objects (re-used across documents)
  ctaButton,
  seo,
  imageWithAlt,
  audit,
  address,
  socialLink,
  portableText,
  openingHours,
  priceField,
  linkRef,
];

/**
 * Lists of types which should be modelled as singletons in the desk structure.
 * Use this in your sanity.config.ts to lock down "create new" on these.
 */
export const SINGLETON_TYPES = new Set<string>([
  "siteSettings",
  "navigation",
  "homepage",
  "seoDefaults",
]);

/**
 * Helper for the desk structure — singletons get pinned, everything else
 * appears as a list.
 */
export const SINGLETON_ACTIONS = new Set<string>([
  "publish",
  "discardChanges",
  "restore",
]);
