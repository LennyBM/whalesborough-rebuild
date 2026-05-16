/**
 * Migration runner for Whalesborough Farm Resort & Spa.
 *
 * Usage: tsx lib/db/migrate.ts
 */
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  console.log("Connecting to database...");

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Migrations completed successfully.");

  await sql.end();

  console.log("Database connection closed.");
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
