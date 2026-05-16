import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge middleware for Whalesborough booking platform.
 *
 * 1. Protects /account/* routes (redirect to sign-in if no session)
 * 2. Adds security headers to all responses
 * 3. Sets CSP in report-only mode
 */

const protectedPaths = ["/account"];

const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://js.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://imagedelivery.net https://*.supabase.co https://whalesboroughliving.co.uk https://cdn.sanity.io https://images.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://plausible.io https://api.stripe.com https://*.sentry.io",
  "frame-src 'self' https://js.stripe.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected route
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    // Check for Auth.js session cookie (v5 uses __Secure- prefix in production)
    const sessionCookie =
      request.cookies.get("__Secure-authjs.session-token") ??
      request.cookies.get("authjs.session-token") ??
      request.cookies.get("next-auth.session-token") ??
      request.cookies.get("__Secure-next-auth.session-token");

    if (!sessionCookie) {
      const signInUrl = new URL("/auth/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Continue with response and add security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // CSP in report-only mode — monitor without breaking anything
  response.headers.set("Content-Security-Policy-Report-Only", CSP_POLICY);

  return response;
}

export const config = {
  // Run on all paths except static files, _next internals, and api routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
