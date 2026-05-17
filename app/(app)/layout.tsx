"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { AppBottomNav } from "@/components/app/app-bottom-nav";
import { AppStatusBar } from "@/components/app/app-status-bar";

/**
 * App shell layout — replaces SiteHeader + SiteFooter with:
 *  - Minimal top status bar (time, signal, battery — mimics native)
 *  - Full-bleed content area
 *  - Persistent bottom tab navigation (5 tabs)
 *
 * This layout renders for all /today, /book, /stay, /club, /estate routes
 * via the (app) route group.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-[100dvh] flex-col bg-app-surface text-app-on-surface">
      {/* App status bar — greeting + notification bell */}
      <AppStatusBar />

      {/* Scrollable content area */}
      <main className="flex-1 overflow-y-auto overscroll-y-contain scroll-smooth pb-[calc(env(safe-area-inset-bottom)+5rem)]">
        {children}
      </main>

      {/* Bottom tab navigation — always visible */}
      <AppBottomNav pathname={pathname} />
    </div>
  );
}
