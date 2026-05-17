"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/marketing/site-header";
import { BottomTabs } from "@/components/app-shell/bottom-tabs";
import { PageTransition } from "@/components/app-shell/page-transition";

/**
 * Layout Shell — renders the app shell with bottom tabs on all routes.
 * The SiteHeader is hidden on routes that have their own header
 * (most app pages handle their own header/back button).
 */

// Routes where we hide the top site header (they have their own headers)
const HIDE_HEADER_ROUTES = [
  "/",
  "/stay",
  "/spa",
  "/dine",
  "/explore",
  "/estate",
  "/my-stay",
  "/account",
  "/login",
  "/demo",
  "/staff",
];

function shouldHideHeader(pathname: string): boolean {
  return HIDE_HEADER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = shouldHideHeader(pathname);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-toast focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
      >
        Skip to content
      </a>
      {!hideHeader && <SiteHeader />}
      <main id="main" className="min-h-[60vh] pb-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomTabs />
    </>
  );
}
