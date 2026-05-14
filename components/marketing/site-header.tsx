"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Site Header — sticky deep-sage nav.
 *
 * Per Coastal Editorial spec (component-library-spec §4.1):
 *  - Sage #4a6457 background, full-width
 *  - 80px desktop / 64px mobile
 *  - Logo + center nav + Book CTA
 *  - Mobile: hamburger → full-screen overlay (700ms slide-in)
 */
const PRIMARY_NAV = [
  { label: "Stay", href: "/stay" },
  { label: "Spa", href: "/spa" },
  { label: "Dine", href: "/dine" },
  { label: "Own", href: "/own" },
  { label: "Estate", href: "/estate" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile nav is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-sticky w-full",
          "bg-secondary text-secondary-fg",
          scrolled && "bg-secondary/95 backdrop-blur-md",
          "transition-colors duration-fast ease-out-luxury",
        )}
      >
        <div className="mx-auto flex h-16 max-w-hero items-center justify-between px-6 lg:h-20 lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-lg uppercase tracking-[0.15em] text-secondary-fg hover:text-white/90"
            aria-label="Whalesborough Farm Resort and Spa — Home"
          >
            Whalesborough
          </Link>

          {/* Center nav — desktop only */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex lg:items-center lg:gap-10"
          >
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-display italic text-base text-secondary-fg/95",
                  "relative py-1",
                  "hover:text-white",
                  "after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-primary",
                  "after:w-0 hover:after:w-full focus-visible:after:w-full",
                  "after:transition-[width] after:duration-base after:ease-out-luxury",
                  "focus-visible:outline-none",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions — desktop */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link
              href="/auth/sign-in"
              className="font-body text-button uppercase text-secondary-fg/90 hover:text-white"
            >
              Sign In
            </Link>
            <Button asChild size="sm" variant="primary">
              <Link href="/stay/booking">Book</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center text-secondary-fg lg:hidden",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-drawer bg-secondary text-secondary-fg lg:hidden",
          "transition-transform duration-slow ease-out-luxury",
          mobileOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="font-display text-lg uppercase tracking-[0.15em]">
            Whalesborough
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav
          aria-label="Mobile primary"
          className="flex flex-col gap-8 px-6 pt-8"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-display-sm italic text-secondary-fg hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8">
            <Link
              href="/auth/sign-in"
              onClick={() => setMobileOpen(false)}
              className="font-body text-button uppercase text-secondary-fg/90"
            >
              Sign In
            </Link>
            <Button asChild size="lg" variant="primary" onClick={() => setMobileOpen(false)}>
              <Link href="/stay/booking">Book your stay</Link>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
