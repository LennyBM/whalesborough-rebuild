import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc/init";

/**
 * Contact router — public enquiry form submission.
 */
export const contactRouter = createTRPCRouter({
  /** Submit a general enquiry. */
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(100),
        email: z.string().email().max(255),
        phone: z
          .string()
          .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number")
          .optional(),
        subject: z.string().min(2).max(200),
        message: z.string().min(10).max(5000),
      }),
    )
    .mutation(({ input }) => {
      // Wave 4: wire to Drizzle queries + notification email
      return {
        success: true as const,
        message:
          "Thank you for your enquiry. We'll be in touch within 24 hours.",
        referenceId: `ENQ-${Date.now()}`,
      };
    }),
});
