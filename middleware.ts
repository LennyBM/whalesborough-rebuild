import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth/config";

/**
 * Edge middleware — protects /account, /owners, /admin.
 * Uses lightweight authConfig (no DB calls) so it runs in the edge runtime.
 *
 * Wave 2 expands this with role-based gating (owner-only routes etc.).
 */
const { auth } = NextAuth(authConfig);

export default auth((request) => {
  // The `authorized` callback in authConfig already handles redirects.
  // Returning undefined lets the request continue.
  return undefined;
});

export const config = {
  // Run on all paths except Next.js internals and static files.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
