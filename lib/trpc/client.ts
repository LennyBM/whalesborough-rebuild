import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@/server/trpc/routers";

/**
 * Client-side tRPC entrypoint.
 * Use this in client components: `const ping = trpc.ping.useQuery();`
 */
export const trpc = createTRPCReact<AppRouter>();
