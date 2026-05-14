/**
 * Drizzle ORM schema for Whalesborough.
 *
 * Wave 2 will populate this with tables for:
 *  - users / accounts / sessions (Auth.js v5 adapter)
 *  - units (accommodation inventory)
 *  - bookings (reservations across all four engines)
 *  - guests, payments, addOns
 *  - spa treatments, restaurant reservations
 *  - lodge leads, viewings
 *  - audit log (regulatory)
 *
 * Re-export from here as `import { ... } from "@/lib/db/schema"`.
 */
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

/** Placeholder healthcheck table — exists only so migrations have something to do. */
export const healthcheck = pgTable("healthcheck", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  note: text("note"),
});

export type HealthcheckRow = typeof healthcheck.$inferSelect;
export type NewHealthcheckRow = typeof healthcheck.$inferInsert;
