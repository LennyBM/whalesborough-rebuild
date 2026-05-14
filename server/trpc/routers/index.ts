import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc/init";

/**
 * Root tRPC router.
 * Wave 2 will mount sub-routers: booking, account, spa, dine, owners, admin.
 */
export const appRouter = createTRPCRouter({
  /** Healthcheck — used for deployment smoke tests. */
  ping: publicProcedure
    .input(
      z
        .object({
          message: z.string().max(120).optional(),
        })
        .optional(),
    )
    .query(({ input }) => {
      return {
        ok: true as const,
        message: input?.message ?? "pong",
        timestamp: new Date().toISOString(),
      };
    }),
});

export type AppRouter = typeof appRouter;
