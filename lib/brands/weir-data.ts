/**
 * Static data loader for The Weir restaurant routes.
 *
 * Wave 1 ships these as importable JSON so the marketing pages render
 * deterministically. Wave 2 swaps the imports for Sanity-backed reads
 * (see research/content/sanity-schemas/documents/menu.ts).
 */
import menusJson from "@/research/content/restaurant-menus.json";
import suppliersJson from "@/research/content/seed-data/suppliers.json";

// ----- Types ----------------------------------------------------------------

export type DietaryCode = "v" | "vg" | "gf" | "df" | "n";

export type AllergenCode =
  | "gluten-wheat"
  | "gluten-oats"
  | "gluten-barley"
  | "gluten-rye"
  | "crustaceans"
  | "egg"
  | "fish"
  | "peanut"
  | "soya"
  | "dairy"
  | "nuts"
  | "celery"
  | "mustard"
  | "sesame"
  | "sulphites"
  | "lupin"
  | "molluscs";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  /** Price in pence. null when "Market price" or a list reference. */
  price_pence: number | null;
  dietary: DietaryCode[];
  allergens: AllergenCode[];
  is_signature?: boolean;
  suppliers?: string[];
  seasonal?: boolean;
  available_window?: string;
  abv?: number;
}

export interface MenuSection {
  name: string;
  items: MenuItem[];
}

export interface SideOrModifier {
  id: string;
  name: string;
  price_pence: number;
  dietary?: DietaryCode[];
  allergens?: AllergenCode[];
}

export interface Menu {
  code: string;
  name: string;
  tagline?: string;
  available: string;
  service_period: "morning" | "midday" | "evening" | "all-day";
  order_index: number;
  policy?: string;
  sections: MenuSection[];
  modifiers?: SideOrModifier[];
  sides?: SideOrModifier[];
  notes?: string[];
}

export interface Supplier {
  slug: string;
  name: string;
  category: string;
  specialism: string;
  location: string;
  distance_miles: number;
  founded_year: number | null;
  is_on_estate: boolean;
  signature_products: string[];
  description: string;
  story_intro?: string;
  endorsements?: string[];
}

// ----- Accessors ------------------------------------------------------------

/** Cast the JSON once at the boundary; consumers get fully typed data. */
const data = menusJson as unknown as {
  venue: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    address_locality: string;
    sourcing_radius_miles: number;
    sourcing_claim_percent: number;
    last_updated: string;
  };
  allergen_policy: {
    compliance: string;
    kitchen_disclaimer: string;
    request_protocol: string;
    gluten_free_bread: string;
  };
  dietary_legend: Record<DietaryCode, string>;
  allergen_codes: AllergenCode[];
  menus: Menu[];
};

export const weirVenue = data.venue;
export const weirAllergenPolicy = data.allergen_policy;
export const weirDietaryLegend = data.dietary_legend;
export const weirAllergenCodes = data.allergen_codes;

/** All menus, ordered. */
export function getAllMenus(): Menu[] {
  return [...data.menus].sort((a, b) => a.order_index - b.order_index);
}

/** Fetch a single menu by code (breakfast, lunch, specials, drinks, kids, dogs). */
export function getMenuByCode(code: string): Menu | null {
  return data.menus.find((m) => m.code === code) ?? null;
}

/** All items across all menus, flattened. Useful for signature lookups. */
export function getAllMenuItems(): MenuItem[] {
  return data.menus.flatMap((m) =>
    m.sections.flatMap((s) => s.items),
  );
}

/** Return n signature items from the named menus, deterministic. */
export function getSignatureItems(menuCodes: string[], limit = 3): MenuItem[] {
  const items = data.menus
    .filter((m) => menuCodes.includes(m.code))
    .flatMap((m) => m.sections.flatMap((s) => s.items))
    .filter((i) => i.is_signature);
  return items.slice(0, limit);
}

const suppliers = suppliersJson as unknown as Supplier[];

export function getAllSuppliers(): Supplier[] {
  // On-estate first, then by distance
  return [...suppliers].sort((a, b) => {
    if (a.is_on_estate && !b.is_on_estate) return -1;
    if (!a.is_on_estate && b.is_on_estate) return 1;
    return a.distance_miles - b.distance_miles;
  });
}

export function getSupplierByName(name: string): Supplier | null {
  return suppliers.find((s) => s.name === name) ?? null;
}

// ----- Format helpers -------------------------------------------------------

/** Format pence as GBP with no trailing period (e.g. 1395 → "13.95"). */
export function formatPrice(price_pence: number | null): string {
  if (price_pence === null) return "POA";
  if (price_pence === 0) return "Free";
  return (price_pence / 100).toFixed(2);
}

/** Format a distance for the supplier pills. */
export function formatDistance(miles: number, isOnEstate: boolean): string {
  if (isOnEstate) return "On the estate";
  if (miles === 0) return "On the estate";
  if (miles === 1) return "1 mile";
  if (miles < 10) return `${miles} miles`;
  return `${miles} miles`;
}

// ----- UK FIR 2014 allergen labels -----------------------------------------

/**
 * Human-readable labels for the UK 14 regulated allergens.
 * Per UK Food Information Regulations 2014 + Natasha's Law (PPDS).
 * Cross-reference: FSA Allergen Guidance May 2026.
 */
export const ALLERGEN_LABEL: Record<AllergenCode, string> = {
  "gluten-wheat": "Wheat",
  "gluten-oats": "Oats",
  "gluten-barley": "Barley",
  "gluten-rye": "Rye",
  crustaceans: "Crustaceans",
  egg: "Egg",
  fish: "Fish",
  peanut: "Peanut",
  soya: "Soya",
  dairy: "Dairy",
  nuts: "Tree nuts",
  celery: "Celery",
  mustard: "Mustard",
  sesame: "Sesame",
  sulphites: "Sulphites",
  lupin: "Lupin",
  molluscs: "Molluscs",
};

/** Dietary chip labels — kept short for inline use. */
export const DIETARY_LABEL: Record<DietaryCode, string> = {
  v: "V",
  vg: "Vg",
  gf: "GF",
  df: "DF",
  n: "N",
};

export const DIETARY_FULL_LABEL: Record<DietaryCode, string> = {
  v: "Vegetarian",
  vg: "Vegan",
  gf: "Gluten-free",
  df: "Dairy-free",
  n: "Contains nuts",
};

/**
 * Resolve the time-aware current menu for default service rendering.
 * Mirrors LiveStatusStrip logic — kept local so server pages can call it.
 */
export function getCurrentMenuCode(now: Date = new Date()): string {
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;

  if (time >= 8.5 && time < 11) return "breakfast";
  if (day === 0 && time >= 12 && time < 17) return "specials"; // Sunday Roast → Specials in this build
  if (time >= 12 && time < 16) return "lunch";
  return "drinks";
}
