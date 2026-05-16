"use client";

import Link from "next/link";
import { CalendarDays, User, Settings } from "lucide-react";

const quickLinks = [
  {
    title: "My Bookings",
    description: "View upcoming stays, spa treatments, and restaurant reservations",
    href: "/account/bookings",
    icon: CalendarDays,
  },
  {
    title: "Profile Settings",
    description: "Update your name, email, and contact preferences",
    href: "/account/profile",
    icon: User,
  },
  {
    title: "Preferences",
    description: "Manage communication preferences and notification settings",
    href: "/account/preferences",
    icon: Settings,
  },
];

export default function AccountDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          {/* Welcome header */}
          <div className="mb-12">
            <p className="eyebrow text-secondary mb-3">Your Account</p>
            <h1 className="font-display text-h1 text-on-surface">
              Welcome Back
            </h1>
            <p className="mt-4 font-body text-body-lg text-on-surface-variant max-w-2xl">
              Manage your bookings, update your details, and personalise your
              experience at Whalesborough Farm Resort &amp; Spa.
            </p>
          </div>

          {/* Quick links grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group bg-surface p-8 transition-colors duration-fast hover:bg-surface-container-low"
                >
                  <Icon
                    className="h-6 w-6 text-secondary mb-4"
                    aria-hidden="true"
                  />
                  <h2 className="font-display text-h3 text-on-surface mb-2">
                    {link.title}
                  </h2>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    {link.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
