import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/lib/env";
import * as schema from "./schema";

/**
 * Supabase Postgres client via the `postgres` driver.
 * eu-west-2 (London).
 *
 * In server-side code use `db` directly. Do not import this from client modules.
 */
const globalForDb = globalThis as unknown as {
  client?: ReturnType<typeof postgres>;
};

const client =
  globalForDb.client ??
  postgres(env.DATABASE_URL, {
    max: 10,
    idle_timeout: 30,
    connect_timeout: 10,
    prepare: false, // Supabase pgbouncer compatibility
  });

if (env.NODE_ENV !== "production") {
  globalForDb.client = client;
}

export const db = drizzle(client, { schema });
export { schema };
export type DB = typeof db;
