import type { Context } from "@/server/trpc/init";

/**
 * Build a tRPC context for an incoming HTTP request.
 *
 * Wave 2: integrate Auth.js v5 session resolution here.
 */
export async function createTRPCContext(opts: {
  headers: Headers;
}): Promise<Context> {
  // Placeholder — real session lookup comes in Wave 2.
  return {
    userId: null,
    session: null,
    headers: opts.headers,
  };
}
