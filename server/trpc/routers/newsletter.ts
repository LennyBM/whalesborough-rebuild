import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc/init";

/**
 * Newsletter router — public subscription endpoint.
 */
export const newsletterRouter = createTRPCRouter({
  /** Subscribe to the Whalesborough newsletter. */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email().max(255),
        emailOptIn: z.boolean(),
        smsOptIn: z.boolean().default(false),
        smsNumber: z
          .string()
          .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number")
          .optional(),
      }),
    )
    .mutation(({ input }) => {
      // Wave 4: wire to Drizzle queries + email marketing integration
      return {
        success: true as const,
        message: "Thank you for subscribing to our newsletter.",
        email: input.email,
      };
    }),
});
