import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc/init";
import { propertiesRouter } from "@/server/trpc/routers/properties";
import { bookingsRouter } from "@/server/trpc/routers/bookings";
import { newsletterRouter } from "@/server/trpc/routers/newsletter";
import { contactRouter } from "@/server/trpc/routers/contact";
import { lodgeLeadsRouter } from "@/server/trpc/routers/lodgeLeads";

/**
 * Root tRPC router.
 * Merges all domain sub-routers into a single AppRouter type.
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

  /** Accommodation properties — listings, detail, availability. */
  properties: propertiesRouter,

  /** Accommodation bookings — create, view, cancel. */
  bookings: bookingsRouter,

  /** Newsletter subscriptions. */
  newsletter: newsletterRouter,

  /** General contact enquiries. */
  contact: contactRouter,

  /** Lodge ownership leads — brochure, viewing, waitlist. */
  lodgeLeads: lodgeLeadsRouter,
});

export type AppRouter = typeof appRouter;
