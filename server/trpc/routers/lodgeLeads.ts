import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc/init";

/**
 * Lodge Leads router — ownership enquiry submissions.
 */
export const lodgeLeadsRouter = createTRPCRouter({
  /** Submit a lodge ownership lead (brochure request, viewing, or waitlist). */
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(100),
        email: z.string().email().max(255),
        phone: z
          .string()
          .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number"),
        collection: z.enum(["tevi", "gwelva", "trelowen", "bespoke"]),
        type: z.enum(["brochure", "viewing", "waitlist"]),
        message: z.string().max(2000).optional(),
      }),
    )
    .mutation(({ input }) => {
      // Wave 4: wire to Drizzle queries + CRM notification
      return {
        success: true as const,
        message:
          input.type === "brochure"
            ? "Your brochure is on its way. We'll also be in touch to discuss your interest."
            : input.type === "viewing"
              ? "We'll contact you shortly to arrange your private viewing."
              : "You've been added to our waitlist. We'll notify you as soon as availability opens.",
        referenceId: `OWN-${Date.now()}`,
      };
    }),
});
