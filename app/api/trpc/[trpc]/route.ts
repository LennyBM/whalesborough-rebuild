import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server/trpc/routers";
import { createTRPCContext } from "@/lib/trpc/context";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: req.headers }),
    onError({ error, path }) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[trpc] error on ${path ?? "<no-path>"}:`, error);
      }
    },
  });

export { handler as GET, handler as POST };

export const runtime = "nodejs";
