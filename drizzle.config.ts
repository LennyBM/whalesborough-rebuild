/**
 * Drizzle Kit configuration for Whalesborough Farm Resort & Spa.
 *
 * Add these scripts to package.json:
 *   "db:generate": "drizzle-kit generate",
 *   "db:migrate": "tsx lib/db/migrate.ts",
 *   "db:seed": "tsx lib/db/seed.ts",
 *   "db:studio": "drizzle-kit studio"
 */
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
