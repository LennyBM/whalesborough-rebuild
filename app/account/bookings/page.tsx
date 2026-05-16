"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          {/* Header */}
          <div className="mb-12">
            <p className="eyebrow text-secondary mb-3">Your Account</p>
            <h1 className="font-display text-h1 text-on-surface">
              My Bookings
            </h1>
          </div>

          {/* Empty state */}
          <div className="bg-surface p-12 md:p-16 text-center">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center bg-surface-container-low">
              <CalendarDays
                className="h-8 w-8 text-on-surface-variant"
                aria-hidden="true"
              />
            </div>

            <h2 className="font-display text-h3 text-on-surface mb-3">
              No Upcoming Bookings
            </h2>
            <p className="font-body text-body text-on-surface-variant max-w-md mx-auto mb-8">
              You don&apos;t have any upcoming reservations. Explore our
              accommodation, spa, and dining options to plan your next visit.
            </p>

            <Button asChild variant="primary" size="lg">
              <Link href="/accommodation">
                Browse Accommodation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
