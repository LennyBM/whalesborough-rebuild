"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sun,
  CalendarCheck,
  Home,
  CreditCard,
  Map,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Bottom tab navigation — 5 tabs, always visible.
 *
 * Modelled on:
 *  - Soho House (membership + booking + events)
 *  - Whoop (minimal chrome, icon + label, active state via colour)
 *  - iOS HIG (safe area inset, 49pt minimum tap target)
 *
 * The active tab uses the brand accent (warm sage). Inactive tabs
 * use a muted tone. No badges yet — Wave 2.
 */

const TABS = [
  {
    href: "/today",
    label: "Today",
    icon: Sun,
  },
  {
    href: "/book",
    label: "Book",
    icon: CalendarCheck,
  },
  {
    href: "/my-stay",
    label: "Stay",
    icon: Home,
  },
  {
    href: "/club",
    label: "Club",
    icon: CreditCard,
  },
  {
    href: "/explore",
    label: "Estate",
    icon: Map,
  },
] as const;

export function AppBottomNav({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="App navigation"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50",
        "border-t border-app-border/10 bg-app-surface/95 backdrop-blur-xl",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {TABS.map((tab) => {
          const isActive =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "group flex flex-col items-center justify-center gap-0.5 px-3 py-2",
                "min-w-[3rem] rounded-xl transition-colors duration-200",
                isActive
                  ? "text-app-accent"
                  : "text-app-muted hover:text-app-on-surface",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive && "scale-110",
                )}
                strokeWidth={isActive ? 2.2 : 1.8}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "text-[10px] font-medium leading-tight tracking-wide",
                  isActive && "font-semibold",
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
