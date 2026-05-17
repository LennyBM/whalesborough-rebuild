"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/marketing/site-header";
import { BottomTabs } from "@/components/app-shell/bottom-tabs";

/**
 * Layout Shell — conditionally renders marketing chrome (header + footer)
 * or the bare app shell depending on the current route.
 *
 * Routes under the (app) group (/today, /book, /my-stay, /club, /explore)
 * get NO header/footer — their own layout handles navigation.
 *
 * All other routes get the standard SiteHeader + SiteFooter.
 */
const APP_ROUTES = ["/today", "/book", "/my-stay", "/club", "/explore"];

function isAppRoute(pathname: string): boolean {
  return APP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApp = isAppRoute(pathname);

  if (isApp) {
    // App routes — no marketing chrome. The (app)/layout.tsx handles its own shell.
    return <>{children}</>;
  }

  // All non-app routes — header + bottom tabs (app layout)
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-toast focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="min-h-[60vh] pb-20">
        {children}
      </main>
      <BottomTabs />
    </>
  );
}
