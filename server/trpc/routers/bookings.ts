import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/trpc/init";

/**
 * Bookings router — protected mutations for accommodation bookings.
 */
export const bookingsRouter = createTRPCRouter({
  /** Create a new booking. */
  create: protectedProcedure
    .input(
      z.object({
        propertyId: z.string().min(1),
        checkIn: z.string().date(),
        checkOut: z.string().date(),
        adults: z.number().int().min(1).max(12),
        children: z.number().int().min(0).max(10).default(0),
        infants: z.number().int().min(0).max(4).default(0),
        dogs: z.number().int().min(0).max(2).default(0),
        addOns: z
          .array(
            z.object({
              id: z.string(),
              quantity: z.number().int().min(1).default(1),
            }),
          )
          .default([]),
        specialRequests: z.string().max(1000).optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      // Wave 4: wire to Drizzle queries + payment gateway
      return {
        id: "bkg_mock_001",
        userId: ctx.userId,
        propertyId: input.propertyId,
        checkIn: input.checkIn,
        checkOut: input.checkOut,
        guests: {
          adults: input.adults,
          children: input.children,
          infants: input.infants,
          dogs: input.dogs,
        },
        addOns: input.addOns,
        specialRequests: input.specialRequests ?? null,
        status: "confirmed" as const,
        totalPrice: 2065,
        currency: "GBP" as const,
        createdAt: new Date().toISOString(),
      };
    }),

  /** Get a single booking by ID (must belong to current user). */
  getById: protectedProcedure
    .input(z.object({ bookingId: z.string().min(1) }))
    .query(({ input, ctx }) => {
      // Wave 4: wire to Drizzle queries
      return {
        id: input.bookingId,
        userId: ctx.userId,
        property: {
          id: "prop_001",
          name: "Tevi Spa Lodge 1",
          slug: "tevi-spa-lodge-1",
          type: "spa-lodge" as const,
        },
        checkIn: "2026-07-14",
        checkOut: "2026-07-21",
        guests: { adults: 2, children: 1, infants: 0, dogs: 1 },
        addOns: [{ id: "addon_welcome_pack", name: "Cornish Welcome Pack", quantity: 1, price: 45 }],
        specialRequests: null,
        status: "confirmed" as const,
        totalPrice: 2065,
        currency: "GBP" as const,
        payments: [
          { id: "pay_001", amount: 2065, method: "card", status: "captured", paidAt: "2026-06-01T10:30:00Z" },
        ],
        createdAt: "2026-06-01T10:30:00Z",
      };
    }),

  /** List all bookings for the current user. */
  listMine: protectedProcedure.query(({ ctx }) => {
    // Wave 4: wire to Drizzle queries
    return [
      {
        id: "bkg_mock_001",
        userId: ctx.userId,
        property: {
          id: "prop_001",
          name: "Tevi Spa Lodge 1",
          slug: "tevi-spa-lodge-1",
          type: "spa-lodge" as const,
        },
        checkIn: "2026-07-14",
        checkOut: "2026-07-21",
        guests: { adults: 2, children: 1, infants: 0, dogs: 1 },
        status: "confirmed" as const,
        totalPrice: 2065,
        currency: "GBP" as const,
        createdAt: "2026-06-01T10:30:00Z",
      },
    ];
  }),

  /** Cancel a booking (must belong to current user). */
  cancel: protectedProcedure
    .input(z.object({ bookingId: z.string().min(1) }))
    .mutation(({ input, ctx }) => {
      // Wave 4: wire to Drizzle queries + refund logic
      return {
        id: input.bookingId,
        userId: ctx.userId,
        status: "cancelled" as const,
        cancelledAt: new Date().toISOString(),
      };
    }),
});
