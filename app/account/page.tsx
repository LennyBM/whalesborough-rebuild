"use client";

import Link from "next/link";
import {
  CalendarDays,
  Heart,
  ChevronRight,
  CreditCard,
  Bell,
  Phone,
  HelpCircle,
  FileText,
  LogOut,
  ClipboardList,
} from "lucide-react";

const quickActions = [
  {
    label: "My Bookings",
    icon: CalendarDays,
    href: "/account/bookings",
  },
  {
    label: "Saved Properties",
    icon: Heart,
    href: "#",
  },
  {
    label: "Guest Preferences",
    icon: ClipboardList,
    href: "#",
  },
  {
    label: "Payment Methods",
    icon: CreditCard,
    href: "#",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "#",
  },
];

const supportLinks = [
  {
    label: "Contact Reception",
    icon: Phone,
    href: "tel:01288361361",
  },
  {
    label: "Help & FAQs",
    icon: HelpCircle,
    href: "#",
  },
  {
    label: "Cancellation Policy",
    icon: FileText,
    href: "/legal/terms-of-use",
  },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-5 pt-10">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <span className="font-display text-2xl text-white">LM</span>
          </div>
          <h1 className="mt-4 font-display text-2xl text-on-surface">
            Leonard Millard
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-muted">
            Member since 2024
          </p>
          <Link
            href="#"
            className="mt-3 font-body text-sm font-medium text-primary underline underline-offset-2"
          >
            Edit profile
          </Link>
        </section>

        {/* Upcoming Bookings */}
        <section className="mb-6">
          <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
            Upcoming Booking
          </h2>
          <div className="rounded-2xl bg-surface-container-low p-5">
            <p className="font-display text-lg text-on-surface">
              The Farmhouse
            </p>
            <p className="mt-1 font-body text-sm text-on-surface-variant">
              12–16 Jul 2026 · 4 nights
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="#"
                className="font-body text-sm font-medium text-primary underline underline-offset-2"
              >
                View booking
              </Link>
              <Link
                href="#"
                className="font-body text-sm font-medium text-secondary underline underline-offset-2"
              >
                Book again
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-6">
          <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
            Quick Actions
          </h2>
          <div className="rounded-2xl bg-surface-container-low overflow-hidden divide-y divide-on-surface/5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-container"
                >
                  <Icon className="h-5 w-5 text-on-surface-variant shrink-0" />
                  <span className="flex-1 font-body text-sm text-on-surface">
                    {action.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-on-surface-muted shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Loyalty / Membership */}
        <section className="mb-6">
          <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
            Membership
          </h2>
          <div className="rounded-2xl bg-surface-container-low p-5">
            <p className="font-display text-lg text-on-surface">
              Whalesborough Club
            </p>
            <p className="mt-1 font-body text-sm text-on-surface-variant">
              3 stays completed · Next reward at 5
            </p>
            <div className="mt-4 h-2 w-full rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full rounded-full bg-secondary transition-all"
                style={{ width: "60%" }}
              />
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="mb-8">
          <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
            Support
          </h2>
          <div className="rounded-2xl bg-surface-container-low overflow-hidden divide-y divide-on-surface/5">
            {supportLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-container"
                >
                  <Icon className="h-5 w-5 text-on-surface-variant shrink-0" />
                  <span className="flex-1 font-body text-sm text-on-surface">
                    {link.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-on-surface-muted shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Sign Out */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-on-surface/10 px-5 py-4 font-body text-sm text-on-surface-variant transition-colors hover:bg-surface-container-low"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </main>
  );
}
