/**
 * Spa data loader — reads the canonical seed-data JSON files.
 *
 * Single source of truth lives in `research/content/seed-data/`. These
 * accessors expose typed views that the spa pages render directly. When
 * Sanity comes online the same shape will be returned from the CMS, so
 * the page code does not change.
 */
import treatmentsRaw from "@/research/content/seed-data/treatments.json";
import categoriesRaw from "@/research/content/seed-data/spa_categories.json";
import spaPackagesRaw from "@/research/content/seed-data/spa_packages.json";
import membershipTiersRaw from "@/research/content/seed-data/membership_tiers.json";

export type Treatment = {
  slug: string;
  name: string;
  category_code: string;
  duration_minutes: number;
  weekday_price_pence: number;
  weekend_price_pence: number;
  suitable_for: string[];
  contraindications: string[];
  description: string;
  house_blend: string | null;
  pregnancy_safe: boolean;
  cancer_safe: boolean;
  status: string;
};

export type SpaCategory = {
  code: string;
  slug: string;
  name: string;
  order_index: number;
  description: string;
  best_for: string;
  house_brand: string;
  status: string;
};

export type SpaPackage = {
  slug: string;
  name: string;
  duration_hours: number | null;
  start_time: string | null;
  end_time: string | null;
  weekday_price_pence: number | null;
  weekend_price_pence: number | null;
  max_guests?: number;
  min_guests?: number;
  min_age?: number;
  includes: string[];
  treatment_options: string[];
  description: string;
  status: string;
  seasonal_from?: string;
  seasonal_to?: string;
  price_unit?: string;
  weekend_availability?: string;
};

export type MembershipTier = {
  slug: string;
  name: string;
  programme: string;
  monthly_price_pence: number | null;
  annual_price_pence: number | null;
  one_off_price_pence?: number | null;
  joining_fee_pence: number;
  min_term_months: number;
  term_months?: number;
  includes: string[];
  guest_passes_per_year: number | null;
  spa_retail_discount_pct?: number;
  treatment_discount_pct?: number;
  complimentary_treatments_per_year?: number;
  complimentary_classes_per_week?: number;
  tier_status: string;
  cohort_cap?: number;
  description: string;
  cancellation_notice_months: number;
};

const treatments = treatmentsRaw as Treatment[];
const categories = categoriesRaw as SpaCategory[];
const spaPackages = spaPackagesRaw as SpaPackage[];
const membershipTiers = membershipTiersRaw as MembershipTier[];

// ---------- Treatments ----------

export function getAllTreatments(): Treatment[] {
  return treatments.filter((t) => t.status === "active");
}

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export function getTreatmentsByCategory(categoryCode: string): Treatment[] {
  return treatments.filter(
    (t) => t.category_code === categoryCode && t.status === "active",
  );
}

export function getTreatmentSlugs(): string[] {
  return treatments
    .filter((t) => t.status === "active")
    .map((t) => t.slug);
}

/** Pick the signature ritual we feature in the hub featured block. */
export function getFeaturedTreatment(): Treatment {
  // Serenity at the W — the most-booked single-ticket ritual.
  return (
    treatments.find((t) => t.slug === "serenity-at-the-w") ?? treatments[0]
  );
}

/**
 * Related rituals — same category, same general duration band, but not
 * the one currently being read.
 */
export function getRelatedTreatments(slug: string, take = 3): Treatment[] {
  const current = getTreatmentBySlug(slug);
  if (!current) return [];
  return treatments
    .filter(
      (t) =>
        t.slug !== slug &&
        t.status === "active" &&
        t.category_code === current.category_code,
    )
    .slice(0, take);
}

// ---------- Categories ----------

export function getAllCategories(): SpaCategory[] {
  return categories
    .filter((c) => c.status === "active")
    .sort((a, b) => a.order_index - b.order_index);
}

export function getCategoryByCode(code: string): SpaCategory | undefined {
  return categories.find((c) => c.code === code);
}

// ---------- Spa packages ----------

export function getAllSpaPackages(): SpaPackage[] {
  return spaPackages.filter((p) => p.status === "active" || p.status === "seasonal");
}

export function getActiveSpaPackages(): SpaPackage[] {
  return spaPackages.filter((p) => p.status === "active");
}

export function getTopSpaPackages(take = 3): SpaPackage[] {
  // Order matches the catalogue: Sunrise, Sunset, Swim/Spa/Dine — the
  // three most-booked starters.
  const featured = ["sunrise-spa-day", "sunset-spa-day", "swim-spa-dine"];
  return featured
    .map((slug) => spaPackages.find((p) => p.slug === slug))
    .filter((p): p is SpaPackage => Boolean(p))
    .slice(0, take);
}

// ---------- W Club membership tiers ----------

export function getWClubTiers(): MembershipTier[] {
  return membershipTiers.filter((t) => t.programme === "w-club");
}

/**
 * Display map: the four tiers shown on /spa/memberships in canonical
 * order. We collapse Founder (Lifetime) + Founder (5-Year) into a single
 * "Founder" display tier because they are the same offer at different
 * payment cadences.
 */
export function getWClubDisplayTiers() {
  const tiers = getWClubTiers();
  const poolGym = tiers.find((t) => t.slug === "pool-and-gym");
  const wellness = tiers.find((t) => t.slug === "wellness");
  const signature = tiers.find((t) => t.slug === "signature");
  const founderLifetime = tiers.find((t) => t.slug === "founder-lifetime");
  const founderFive = tiers.find((t) => t.slug === "founder-five-year");
  return [
    {
      slug: "pool-and-gym",
      name: "Pool & Gym",
      positioning:
        "The clean baseline. Pool, gym, sauna, steam room, infinity pool — the facilities, nothing more.",
      tier: poolGym,
    },
    {
      slug: "wellness",
      name: "Wellness",
      positioning:
        "For people who treat the spa as part of the weekly rhythm — one group class a week, treatment and retail discount.",
      tier: wellness,
    },
    {
      slug: "signature",
      name: "Signature",
      positioning:
        "The flagship. One signature 60-minute ritual every month, unlimited classes, fifteen percent on treatments and retail.",
      tier: signature,
      featured: true,
    },
    {
      slug: "founder",
      name: "Founder",
      positioning:
        "Lifetime. Two rituals a month, a spa day for two with every stay, auto Patron Circle status. Inaugural cohort, capped at one hundred.",
      tier: founderLifetime,
      altTier: founderFive,
    },
  ] as const;
}

// ---------- Helpers ----------

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  if (minutes === 60) return "1 hr";
  if (minutes % 60 === 0) return `${minutes / 60} hr`;
  return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;
}
