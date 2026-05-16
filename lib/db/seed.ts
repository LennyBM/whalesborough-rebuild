/**
 * Seed script for Whalesborough Farm Resort & Spa.
 *
 * Inserts sample properties, users, bookings, and lodge leads.
 * Usage: tsx lib/db/seed.ts
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { ulid } from "ulid";

import { bookings, lodgeLeads, properties, users } from "./schema";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  console.log("Connecting to database...");

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  console.log("Seeding database...");

  // ─── Users ───────────────────────────────────────────────────────────────────

  const adminId = ulid();
  const guestId = ulid();

  await db.insert(users).values([
    {
      id: adminId,
      email: "admin@whalesborough.co.uk",
      name: "Whalesborough Admin",
      role: "admin",
    },
    {
      id: guestId,
      email: "guest@example.com",
      name: "Jane Smith",
      phone: "+447700900123",
      role: "guest",
    },
  ]);

  console.log("  Inserted 2 users");

  // ─── Properties ──────────────────────────────────────────────────────────────

  const farmhouseId = ulid();
  const cottageId = ulid();
  const trelowenId = ulid();
  const arvorId = ulid();
  const spaId = ulid();

  await db.insert(properties).values([
    {
      id: farmhouseId,
      name: "Whalesborough Farmhouse",
      slug: "whalesborough-farmhouse",
      type: "barn",
      description:
        "The original 16th-century farmhouse at the heart of the estate, lovingly restored with contemporary interiors.",
      shortDescription: "Historic farmhouse sleeping 10 with hot tub",
      sleeps: 10,
      bedrooms: 5,
      bathrooms: 3,
      hasDog: true,
      hasHotTub: true,
      hasPool: false,
      images: ["/images/properties/farmhouse-hero.jpg"],
      amenities: ["wifi", "log-burner", "hot-tub", "garden", "parking"],
      priceFrom: "395.00",
      status: "active",
      sortOrder: 1,
    },
    {
      id: cottageId,
      name: "Whalesborough Cottage",
      slug: "whalesborough-cottage",
      type: "cottage",
      description:
        "A charming stone cottage nestled in the grounds, ideal for couples or small families.",
      shortDescription: "Cosy cottage for 4 with garden views",
      sleeps: 4,
      bedrooms: 2,
      bathrooms: 1,
      hasDog: true,
      hasHotTub: false,
      hasPool: false,
      images: ["/images/properties/cottage-hero.jpg"],
      amenities: ["wifi", "log-burner", "garden", "parking"],
      priceFrom: "195.00",
      status: "active",
      sortOrder: 2,
    },
    {
      id: trelowenId,
      name: "Trelowen 3.0",
      slug: "trelowen-3-0",
      type: "spa-lodge",
      description:
        "Next-generation luxury lodge from the Trelowen collection with private hot tub and spa access.",
      shortDescription: "Luxury spa lodge sleeping 6 with hot tub",
      sleeps: 6,
      bedrooms: 3,
      bathrooms: 2,
      hasDog: false,
      hasHotTub: true,
      hasPool: false,
      images: ["/images/properties/trelowen-hero.jpg"],
      amenities: ["wifi", "hot-tub", "spa-access", "underfloor-heating", "parking"],
      priceFrom: "450.00",
      status: "active",
      sortOrder: 3,
    },
    {
      id: arvorId,
      name: "Arvor Studio",
      slug: "arvor-studio",
      type: "suite",
      description:
        "A contemporary open-plan studio suite with floor-to-ceiling windows overlooking the meadow.",
      shortDescription: "Modern studio suite for 2",
      sleeps: 2,
      bedrooms: 1,
      bathrooms: 1,
      hasDog: false,
      hasHotTub: false,
      hasPool: false,
      images: ["/images/properties/arvor-hero.jpg"],
      amenities: ["wifi", "kitchenette", "balcony", "parking"],
      priceFrom: "145.00",
      status: "active",
      sortOrder: 4,
    },
    {
      id: spaId,
      name: "Windy Hills Spa",
      slug: "windy-hills-spa",
      type: "spa-lodge",
      description:
        "Premium spa lodge with direct access to hydrotherapy pool and treatment rooms.",
      shortDescription: "Spa lodge for 4 with pool access",
      sleeps: 4,
      bedrooms: 2,
      bathrooms: 2,
      hasDog: false,
      hasHotTub: true,
      hasPool: true,
      images: ["/images/properties/windy-hills-hero.jpg"],
      amenities: ["wifi", "hot-tub", "pool", "spa-access", "parking"],
      priceFrom: "525.00",
      status: "active",
      sortOrder: 5,
    },
  ]);

  console.log("  Inserted 5 properties");

  // ─── Bookings ────────────────────────────────────────────────────────────────

  await db.insert(bookings).values([
    {
      id: ulid(),
      userId: guestId,
      propertyId: farmhouseId,
      checkIn: "2026-07-12",
      checkOut: "2026-07-19",
      adults: 4,
      children: 2,
      infants: 0,
      dogs: 1,
      totalPrice: "2765.00",
      depositPaid: "691.25",
      status: "confirmed",
      source: "direct",
      specialRequests: "Late check-in around 6pm please",
    },
    {
      id: ulid(),
      userId: guestId,
      propertyId: cottageId,
      checkIn: "2026-08-01",
      checkOut: "2026-08-04",
      adults: 2,
      children: 0,
      infants: 0,
      dogs: 0,
      totalPrice: "585.00",
      depositPaid: null,
      status: "pending",
      source: "booking-com",
    },
    {
      id: ulid(),
      userId: guestId,
      propertyId: trelowenId,
      checkIn: "2026-06-01",
      checkOut: "2026-06-05",
      adults: 2,
      children: 1,
      infants: 0,
      dogs: 0,
      totalPrice: "1800.00",
      depositPaid: "1800.00",
      status: "checked-out",
      source: "direct",
    },
  ]);

  console.log("  Inserted 3 bookings");

  // ─── Lodge Leads ─────────────────────────────────────────────────────────────

  await db.insert(lodgeLeads).values([
    {
      id: ulid(),
      name: "Richard Thompson",
      email: "r.thompson@email.co.uk",
      phone: "+447700900456",
      collection: "trelowen",
      message: "Interested in Trelowen 3.0 for investment. Available for viewing weekends.",
      source: "website",
      status: "viewing-booked",
    },
    {
      id: ulid(),
      name: "Sarah & James Mitchell",
      email: "mitchells@email.co.uk",
      phone: "+447700900789",
      collection: "gwelva",
      message: "Looking for a holiday home with rental income potential.",
      source: "phone",
      status: "new",
    },
  ]);

  console.log("  Inserted 2 lodge leads");

  console.log("Seeding completed successfully.");

  await sql.end();

  console.log("Database connection closed.");
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
