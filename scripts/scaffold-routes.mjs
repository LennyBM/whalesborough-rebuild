#!/usr/bin/env node
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = join(__dirname, "..", "app");

/**
 * Each entry: [routePath, eyebrow, title, description].
 * routePath uses Next.js conventions ("[id]" for dynamic).
 */
const ROUTES = [
  // STAY
  ["stay", "Accommodation", "Stay at Whalesborough", "Twenty-seven cottages, twenty-two Arvor Suites and a pair of spa lodges. Find your stay below."],
  ["stay/cottages", "Accommodation · 27 properties", "Cottages", "Traditional Cornish cottages, each individually furnished, set across the estate."],
  ["stay/arvor-suites", "Accommodation · 22 suites", "Arvor Suites", "Contemporary suites with sea-air balconies and private parking."],
  ["stay/spa-lodges", "Accommodation · 2 lodges", "Spa Lodges", "Trelowen and Gwari — our two spa-equipped retreat lodges, each with a hot tub."],
  ["stay/availability", "Accommodation", "Availability", "Search live availability across all units."],
  ["stay/booking", "Booking", "Begin your booking", "Five steps. Twelve minutes. Confirmed in one transaction."],
  ["stay/booking/dates", "Booking · Step 1 of 5", "When are you coming?", "Choose your dates and party. Sea-view cottages book quickest."],
  ["stay/booking/select", "Booking · Step 2 of 5", "Choose your stay", "Available properties for the dates you've selected."],
  ["stay/booking/add-ons", "Booking · Step 3 of 5", "Make it yours", "Welcome hampers, spa treatments, restaurant tables, activity passes."],
  ["stay/booking/guest-details", "Booking · Step 4 of 5", "Guest details", "Names, dietary preferences, accessibility needs, dogs."],
  ["stay/booking/payment", "Booking · Step 5 of 5", "Payment", "Secure card payment, Apple Pay, Google Pay. Klarna available from Q2 2026."],
  ["stay/booking/confirmation/[id]", "Booking confirmed", "You're booked", "Confirmation reference and what happens next."],
  ["stay/holiday-treats", "Add-ons", "Holiday Treats", "Hampers, grocery boxes, fresh-baked bread on arrival."],
  ["stay/gallery", "Photography", "Stay gallery", "Inside our cottages, suites and spa lodges."],
  ["stay/faqs", "FAQs", "Stay questions", "Everything from check-in times to where the dog bowls are kept."],
  ["stay/dog-rules", "Dog policy", "Bringing your dog", "Twenty-three of our properties are dog-friendly. Here's how it works."],

  // SPA
  ["spa", "The W Club", "Spa", "An indoor pool, a gym overlooking the lakes, and a treatment menu drawn from the estate."],
  ["spa/treatments", "The W Club · Rituals", "Treatments", "Eighty-minute rituals and ninety-minute journeys. Drawn from Cornish botanicals."],
  ["spa/spa-days", "The W Club · Packages", "Spa Days", "Half-day, full-day and overnight spa packages."],
  ["spa/memberships", "The W Club · Membership", "Memberships", "Local and resident membership tiers. Annual and monthly."],
  ["spa/products", "The W Club · Shop", "Spa Products", "Botanicals to take home. Our partners and our own line."],
  ["spa/gift-vouchers", "The W Club · Gifts", "Gift Vouchers", "Treatments, spa days, full retreats — gifted in any amount."],
  ["spa/booking", "The W Club · Booking", "Book a treatment", "Choose your ritual, your therapist and your moment."],
  ["spa/faqs", "The W Club · FAQs", "Spa questions", "Pregnancy, contraindications, dress code, what's included."],

  // DINE
  ["dine", "The Weir", "Restaurant", "Cornish suppliers, open fires, an estate that grows much of what arrives on the plate."],
  ["dine/menus", "The Weir · Menus", "Menus", "What we're serving this season."],
  ["dine/menus/breakfast", "The Weir · Menus", "Breakfast", "From 8am. Locally roasted coffee, hot dishes, pastries baked on site."],
  ["dine/menus/lunch", "The Weir · Menus", "Lunch", "From midday. Long lunches encouraged."],
  ["dine/events", "The Weir · Events", "Events", "Grill and Chill, seasonal suppers, harvest festival."],
  ["dine/reserve", "The Weir · Reserve", "Reserve a table", "Book for two or for twenty. Outdoor and indoor."],
  ["dine/lakeside-locals", "The Weir · Membership", "Lakeside Locals", "Our membership for residents and regulars. Priority seating and member events."],
  ["dine/private-dining", "The Weir · Private", "Private Dining", "Our private room seats up to fourteen. Tasting menus on request."],
  ["dine/faqs", "The Weir · FAQs", "Restaurant questions", "Dietary requirements, accessibility, dogs, dress code."],

  // OWN
  ["own", "Lodge Ownership", "Own a lodge at Whalesborough", "A small number of architect-designed lodges. Lifestyle purchases with rental income potential."],
  ["own/lodges/trelowen", "Lodge · The Trelowen Collection", "Trelowen Lodges", "Two-bedroom lodges from £425,000."],
  ["own/lodges/tevi", "Lodge · The Tevi Collection", "Tevi Lodges", "Three-bedroom waterside lodges from £750,000."],
  ["own/lodges/gwelva", "Lodge · The Gwelva Collection", "Gwelva Lodges", "Coastal-view lodges from £525,000."],
  ["own/lodges/bespoke", "Lodge · Bespoke", "Bespoke Lodges", "Design your own from £399,000."],
  ["own/why-own", "Lodge Ownership", "Why own at Whalesborough", "What ownership looks like across a year."],
  ["own/process", "Lodge Ownership", "The process", "Reservation, design, build, completion — typically nine to twelve months."],
  ["own/costs", "Lodge Ownership", "Costs & charges", "Pitch fees, utilities, service charges. Transparent and itemised."],
  ["own/rental-income", "Lodge Ownership", "Rental income potential", "Subletting your lodge — what's possible, what's not guaranteed."],
  ["own/brochure", "Lodge Ownership", "Request the brochure", "Sixty pages. Site plans, floor plans, finishes, costs."],
  ["own/viewing/book", "Lodge Ownership", "Book a viewing", "Half-day site tours every Tuesday and Thursday."],
  ["own/waitlist", "Lodge Ownership", "Join the waitlist", "We release new plots in cohorts. Be first to hear."],
  ["own/faqs", "Lodge Ownership · FAQs", "Ownership questions", "Tax, restrictions, transfer, exit."],

  // ESTATE
  ["estate", "The Estate", "Whalesborough Estate", "Four hundred and fifty acres of pasture, woodland, lakes and clifftop."],
  ["estate/map", "The Estate", "Estate Map", "An interactive 3D map of the estate. Walking distances and times included."],
  ["estate/activities", "The Estate · Activities", "Activities", "Farm tours, fishing, mountain biking, swimming, foraging."],
  ["estate/local-area", "Local Area", "The local area", "Widemouth Bay, Bude Canal, Tintagel and beyond."],
  ["estate/dog-friendly", "Estate", "Dog Friendly", "Twenty-three dog-friendly cottages and the entire estate to roam."],
  ["estate/farm", "Estate", "The Farm", "How a working estate produces what arrives on the table."],

  // ABOUT / CONTACT / JOURNAL
  ["about", "About", "About Whalesborough", "How the estate came to be and where it's going."],
  ["about/sustainability", "About · B Corp pending", "Sustainability", "Our wind turbine, our bees, our microplastic filters — measured and published."],
  ["about/awards", "About · Awards", "Awards & Accreditations", "5★ Gold VisitEngland, NPS 83.3, Feefo 4.5/5 and more."],
  ["contact", "Contact", "Contact us", "Phone, email, address, opening hours."],
  ["contact/finding-us", "Contact", "Finding us", "Driving, parking, public transport, EV charging."],
  ["journal", "Journal", "Journal", "Seasonal writing from the estate, the kitchen and the spa."],

  // AUTH
  ["auth/sign-in", "Account", "Sign in", "Sign in with email, Google or Apple."],
  ["auth/sign-up", "Account", "Create an account", "Save preferences, manage bookings, earn loyalty rewards."],
  ["auth/forgot-password", "Account", "Forgotten password", "We'll send a magic link to your inbox."],

  // ACCOUNT
  ["account", "Account", "Your account", "Manage your bookings, preferences and saved properties."],
  ["account/bookings", "Account", "Your bookings", "Upcoming, past and cancelled bookings."],

  // LEGAL
  ["legal/privacy", "Legal", "Privacy Policy", "How we collect, process and protect your personal data — UK GDPR / DPA 2018."],
  ["legal/cookies", "Legal", "Cookie Policy", "Equal-prominence Accept and Reject — DUAA 2025 compliant."],
  ["legal/terms-of-use", "Legal", "Terms of Use", "Terms for using the Whalesborough website and booking platform."],
  ["legal/accessibility", "Legal", "Accessibility Statement", "Our commitment to WCAG 2.2 Level AA conformance."],
  ["legal/complaints", "Legal", "Complaints Procedure", "Formal data-protection complaints procedure (DUAA, in force 19 June 2026)."],
];

async function ensureFile(path, contents) {
  await mkdir(dirname(path), { recursive: true });
  try {
    await access(path);
    // Already exists — skip (we don't want to overwrite app/page.tsx)
    return false;
  } catch {
    await writeFile(path, contents, "utf8");
    return true;
  }
}

function pageContents(eyebrow, title, description) {
  return `import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
};

export default function Page() {
  return (
    <PageShell
      eyebrow=${JSON.stringify(eyebrow)}
      title=${JSON.stringify(title)}
      description=${JSON.stringify(description)}
    />
  );
}
`;
}

let created = 0;
let skipped = 0;

for (const [route, eyebrow, title, description] of ROUTES) {
  const path = join(APP_DIR, route, "page.tsx");
  const made = await ensureFile(path, pageContents(eyebrow, title, description));
  if (made) created++;
  else skipped++;
}

console.log(`Scaffolded routes: ${created} created, ${skipped} skipped.`);
