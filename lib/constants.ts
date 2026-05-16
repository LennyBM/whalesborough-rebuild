/**
 * Shared constants for the Whalesborough booking platform.
 * Single source of truth for brand data, contact info, and enums.
 */

// ─── Site ────────────────────────────────────────────────────────────────────

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://whalesborough.co.uk";
export const COMPANY_NAME = "Whalesborough Farm Resort & Spa";
export const COMPANY_SHORT_NAME = "Whalesborough";
export const TAGLINE = "Luxury eco-conscious countryside resort in North Cornwall";

// ─── Contact ─────────────────────────────────────────────────────────────────

export const PHONE = {
  main: "01288 361940",
  sales: "01288 361940",
  vipViewings: "01288 361941",
  restaurant: "01288 362234",
} as const;

export const EMAIL = {
  general: "hello@whalesborough.co.uk",
  reservations: "reservations@whalesborough.co.uk",
  spa: "spa@whalesborough.co.uk",
  restaurant: "theweir@whalesborough.co.uk",
  ownership: "ownership@whalesborough.co.uk",
  events: "events@whalesborough.co.uk",
} as const;

// ─── Address ─────────────────────────────────────────────────────────────────

export const ADDRESS = {
  line1: "Whalesborough Farm",
  line2: "Marhamchurch",
  city: "Bude",
  county: "Cornwall",
  postcode: "EX23 0JD",
  country: "United Kingdom",
  full: "Whalesborough Farm, Marhamchurch, Bude, Cornwall EX23 0JD",
} as const;

// ─── Social ──────────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/whalesboroughresort",
  facebook: "https://www.facebook.com/WhalesboroughResort",
  twitter: "https://twitter.com/Whalesborough",
  youtube: "https://www.youtube.com/@whalesborough",
  tripadvisor: "https://www.tripadvisor.co.uk/Hotel_Review-g1466193-d1466427-Reviews-Whalesborough_Cottages_and_Spa-Marhamchurch_Bude_Cornwall_England.html",
} as const;

// ─── External Domains ────────────────────────────────────────────────────────

export const EXTERNAL_URLS = {
  salesSite: "https://whalesboroughliving.co.uk",
  spaBooking: "https://thewclub.try.be",
  landal: "https://landal.co.uk/parks/whalesborough-resort/",
} as const;

// ─── Property Types ──────────────────────────────────────────────────────────

export enum PropertyType {
  FARMHOUSE = "farmhouse",
  COTTAGE = "cottage",
  SPA_LODGE = "spa_lodge",
  SPA_BARN = "spa_barn",
  ARVOR_SUITE = "arvor_suite",
  ARVOR_STUDIO = "arvor_studio",
  ARVOR_DUPLEX = "arvor_duplex",
  ARVOR_PENTHOUSE = "arvor_penthouse",
}

// ─── Booking Statuses ────────────────────────────────────────────────────────

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CHECKED_IN = "checked_in",
  CHECKED_OUT = "checked_out",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  NO_SHOW = "no_show",
}

// ─── Lodge Collections (For Sale) ────────────────────────────────────────────

export const LODGE_COLLECTIONS = {
  tevi: {
    name: "Tevi Luxury Lodges",
    slug: "tevi",
    priceFrom: 749950,
    description: "Ultra-premium lodges with panoramic countryside views",
  },
  gwelva: {
    name: "Gwelva Luxury Villas",
    slug: "gwelva",
    priceFrom: null,
    description: "Premium villas with private gardens and spa access",
  },
  trelowen: {
    name: "Trelowen Exclusive Lodges",
    slug: "trelowen",
    priceFrom: 425000,
    description: "New-build lodges with 125-year licence, fully electric",
  },
  bespoke: {
    name: "Bespoke Lodges",
    slug: "bespoke",
    priceFrom: 399000,
    description: "Custom-designed lodges tailored to your specification",
  },
} as const;

// ─── Design Tokens (mirrors Tailwind config) ─────────────────────────────────

export const BRAND_COLORS = {
  primary: "#703a1d",       // Cognac — CTAs
  secondary: "#4a6457",     // Deep sage — navigation
  background: "#fbf9f6",    // Warm white
  foreground: "#1a1a1a",    // Near black
} as const;

// ─── Estate ──────────────────────────────────────────────────────────────────

export const ESTATE_FACTS = {
  acres: 500,
  totalKeys: 50,
  cottages: 27,
  arvorSuites: 22,
  hotTubProperties: 7,
  visitEnglandRating: "5-star Gold",
} as const;
