import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Resend from "next-auth/providers/resend";

/**
 * Auth.js v5 config.
 *
 * Providers:
 *  - Google OAuth
 *  - Apple OAuth (Sign in with Apple — requires JWT-signed client secret in prod)
 *  - Resend magic-link (email)
 *
 * Wave 2 will:
 *  - Add the Drizzle adapter (DrizzleAdapter from @auth/drizzle-adapter)
 *  - Wire role-based session callback (guest / owner / staff / admin)
 *  - Add custom sign-in / sign-up pages with editorial styling
 */
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Apple({
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: process.env.AUTH_APPLE_SECRET,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL ?? "hello@whalesborough.co.uk",
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAccount = nextUrl.pathname.startsWith("/account");
      const isOnOwners = nextUrl.pathname.startsWith("/owners");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnAccount || isOnOwners || isOnAdmin) {
        return isLoggedIn;
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 1 day
  },
} satisfies NextAuthConfig;
