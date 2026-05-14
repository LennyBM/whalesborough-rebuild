import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

/**
 * tRPC v11 initialisation.
 * Context is built per-request in lib/trpc/context.ts.
 */
export type Context = {
  /** Authenticated user id, or null for guest requests. */
  userId: string | null;
  /** Auth.js session shape (loose for Wave 1 — tightened in Wave 2). */
  session: { user: { id: string; email?: string | null } } | null;
  /** Request headers (for IP, UA, rate limiting). */
  headers: Headers;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

/** Procedure that requires an authenticated user. */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId || !ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
      session: ctx.session,
    },
  });
});
