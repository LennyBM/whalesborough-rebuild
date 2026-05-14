import "server-only";

import { createCallerFactory } from "@/server/trpc/init";
import { appRouter } from "@/server/trpc/routers";
import { createTRPCContext } from "@/lib/trpc/context";

/**
 * Server-side tRPC caller for use inside React Server Components.
 *
 * Usage in an RSC:
 *   const { trpc } = await getServerCaller();
 *   const result = await trpc.ping();
 */
const createCaller = createCallerFactory(appRouter);

export async function getServerCaller(headers: Headers = new Headers()) {
  const ctx = await createTRPCContext({ headers });
  return { trpc: createCaller(ctx) };
}
