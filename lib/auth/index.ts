import NextAuth from "next-auth";

import { authConfig } from "./config";

/**
 * Auth.js v5 root.
 *
 * Server-side: `import { auth } from "@/lib/auth"`.
 * API route: re-export `handlers` in app/api/auth/[...nextauth]/route.ts.
 */
export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
