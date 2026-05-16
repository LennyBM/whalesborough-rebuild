import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc/init";

/**
 * Properties router — public queries for accommodation listings.
 */
export const propertiesRouter = createTRPCRouter({
  /** List properties with optional filters. */
  list: publicProcedure
    .input(
      z
        .object({
          type: z
            .enum(["spa-lodge", "cottage", "arvor-suite"])
            .optional(),
          sleeps: z.number().int().min(1).max(12).optional(),
          hasDog: z.boolean().optional(),
          hasHotTub: z.boolean().optional(),
          checkIn: z.string().date().optional(),
          checkOut: z.string().date().optional(),
        })
        .optional(),
    )
    .query(({ input }) => {
      // Wave 4: wire to Drizzle queries
      return [
        {
          id: "prop_001",
          slug: "tevi-spa-lodge-1",
          name: "Tevi Spa Lodge 1",
          type: "spa-lodge" as const,
          sleeps: 6,
          bedrooms: 3,
          hasDog: true,
          hasHotTub: true,
          priceFrom: 295,
          images: ["/images/properties/tevi-1-hero.webp"],
          shortDescription:
            "Luxury 3-bedroom spa lodge with private hot tub and lake views.",
        },
      ];
    }),

  /** Get a single property by its URL slug. */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1).max(100) }))
    .query(({ input }) => {
      // Wave 4: wire to Drizzle queries
      return {
        id: "prop_001",
        slug: input.slug,
        name: "Tevi Spa Lodge 1",
        type: "spa-lodge" as const,
        sleeps: 6,
        bedrooms: 3,
        bathrooms: 2,
        hasDog: true,
        hasHotTub: true,
        priceFrom: 295,
        images: ["/images/properties/tevi-1-hero.webp"],
        shortDescription:
          "Luxury 3-bedroom spa lodge with private hot tub and lake views.",
        longDescription:
          "Set on the shores of Whalesborough Lake, this contemporary lodge offers...",
        amenities: ["hot-tub", "sauna", "lake-view", "dog-friendly"],
        floorPlan: null,
      };
    }),

  /** Check availability and pricing for a property + date range. */
  getAvailability: publicProcedure
    .input(
      z.object({
        propertyId: z.string().min(1),
        checkIn: z.string().date(),
        checkOut: z.string().date(),
      }),
    )
    .query(({ input }) => {
      // Wave 4: wire to Drizzle queries + availability engine
      return {
        propertyId: input.propertyId,
        checkIn: input.checkIn,
        checkOut: input.checkOut,
        available: true,
        nights: 7,
        basePrice: 2065,
        totalPrice: 2065,
        currency: "GBP" as const,
        breakdown: [
          { label: "7 nights @ £295/night", amount: 2065 },
        ],
      };
    }),
});
