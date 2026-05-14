import * as React from "react";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { NewsletterForm } from "@/components/marketing/newsletter-form";

/**
 * Site Footer — five-column editorial footer.
 *
 * Per spec:
 *  - Award badges row
 *  - Newsletter with SEPARATE email + SMS opt-in (PECR)
 *  - Social icons
 *  - Short-term let registration number block (mandatory April 2026)
 *  - Legal links + ICO registration + company info (Companies Act 2006)
 */
const FOOTER_NAV = {
  stay: {
    title: "Stay",
    links: [
      { label: "Cottages", href: "/stay/cottages" },
      { label: "Arvor Suites", href: "/stay/arvor-suites" },
      { label: "Spa Lodges", href: "/stay/spa-lodges" },
      { label: "Availability", href: "/stay/availability" },
      { label: "Gallery", href: "/stay/gallery" },
    ],
  },
  resort: {
    title: "Resort",
    links: [
      { label: "Spa", href: "/spa" },
      { label: "Restaurant", href: "/dine" },
      { label: "Estate", href: "/estate" },
      { label: "Activities", href: "/estate/activities" },
      { label: "Dog Friendly", href: "/estate/dog-friendly" },
    ],
  },
  own: {
    title: "Own",
    links: [
      { label: "Why Own", href: "/own/why-own" },
      { label: "Lodges", href: "/own" },
      { label: "Process", href: "/own/process" },
      { label: "Brochure", href: "/own/brochure" },
      { label: "Book Viewing", href: "/own/viewing/book" },
    ],
  },
  visit: {
    title: "Visit",
    links: [
      { label: "Local Area", href: "/estate/local-area" },
      { label: "Finding Us", href: "/contact/finding-us" },
      { label: "Contact", href: "/contact" },
      { label: "Journal", href: "/journal" },
      { label: "About", href: "/about" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Terms of Use", href: "/legal/terms-of-use" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Complaints", href: "/legal/complaints" },
    ],
  },
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-surface-container-low text-on-surface">
      {/* Award badges */}
      <div className="border-b border-outline/20">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-8 px-6 py-10 lg:gap-16">
          <Badge variant="gold">5★ Gold VisitEngland</Badge>
          <Badge variant="default">NPS 83.3 — #1 in Cornwall</Badge>
          <Badge variant="default">Feefo 4.5 / 5</Badge>
          <Badge variant="default">B Corp Pending</Badge>
        </div>
      </div>

      {/* Main grid: 5 columns of nav + newsletter */}
      <div className="mx-auto max-w-content px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <p className="font-display text-h3 italic text-on-surface">
              Whalesborough
            </p>
            <p className="mt-4 max-w-sm text-body-sm text-on-surface-variant">
              A 450-acre working estate on the Cornish coast. Holiday cottages,
              spa, restaurant and lodges — designed for slow returns.
            </p>

            {/* Newsletter (separate email + SMS opt-in per PECR) */}
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          {/* Nav columns */}
          {(Object.values(FOOTER_NAV) as Array<(typeof FOOTER_NAV)[keyof typeof FOOTER_NAV]>).map(
            (column) => (
              <div key={column.title}>
                <p className="eyebrow text-on-surface-muted">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-body-sm text-on-surface-variant hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Bottom legal row — sage background */}
      <div className="bg-secondary text-secondary-fg">
        <div className="mx-auto max-w-content px-6 py-10 lg:px-12">
          {/* Top: social + short-term let registration */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/whalesboroughfarm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whalesborough on Instagram"
                className="text-secondary-fg/90 hover:text-white"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/whalesboroughfarm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whalesborough on Facebook"
                className="text-secondary-fg/90 hover:text-white"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@whalesboroughfarm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whalesborough on YouTube"
                className="text-secondary-fg/90 hover:text-white"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            {/* Short-Term Let Registration block (mandatory April 2026) */}
            <div className="max-w-md text-caption text-secondary-fg/85">
              <p className="eyebrow text-secondary-fg/70">Registration</p>
              <p className="mt-2">
                Short-Term Let Registration Number:{" "}
                <span className="text-secondary-fg">STL-CORN-2026-00000</span>
                <br />
                ICO Registration: ZA000000 · Company No. 00000000
                <br />
                Whalesborough Farm Resort &amp; Spa Ltd, registered in England
                &amp; Wales.
              </p>
            </div>
          </div>

          {/* Copyright row */}
          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-caption text-secondary-fg/70 md:flex-row md:items-center md:justify-between">
            <p>© {year} Whalesborough Farm Resort &amp; Spa. All rights reserved.</p>
            <p>
              Marhamchurch, Bude EX23 0JD, Cornwall · Site by Peake Management
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
