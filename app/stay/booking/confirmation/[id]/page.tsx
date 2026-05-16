"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Calendar, Home, PawPrint } from "lucide-react";

export default function BookingConfirmationPage() {
  const params = useParams();
  const bookingRef = params.id as string;

  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-content px-6 pt-24 lg:px-12 lg:pt-32">
        {/* Success indicator */}
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="h-8 w-8 text-secondary" aria-hidden="true" />
          <p className="eyebrow text-secondary">Booking confirmed</p>
        </div>
        <h1 className="heading-editorial text-display-md md:text-display-lg max-w-3xl text-on-surface">
          You&apos;re booked
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
          Your coastal escape is confirmed. We can&apos;t wait to welcome you to
          Whalesborough.
        </p>
      </header>

      <section className="mx-auto max-w-content px-6 pb-32 pt-12 lg:px-12">
        <div className="max-w-2xl space-y-10">
          {/* Booking reference */}
          <div className="bg-surface-container-low p-8">
            <p className="text-body-sm text-on-surface-muted uppercase tracking-wide mb-2">
              Booking reference
            </p>
            <p className="font-display text-display-md text-on-surface">
              {bookingRef || "WB-2026-001"}
            </p>
          </div>

          {/* Booking details */}
          <div className="bg-surface-container-low p-8 space-y-6">
            <h2 className="font-display text-h3 text-on-surface">
              Your stay
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-on-surface-muted mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-body-sm text-on-surface-muted">Property</p>
                  <p className="text-body text-on-surface">Trevose Cottage</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-on-surface-muted mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-body-sm text-on-surface-muted">Dates</p>
                  <p className="text-body text-on-surface">
                    Fri 20 Jun — Mon 23 Jun 2026
                  </p>
                  <p className="text-body-sm text-on-surface-muted">3 nights</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-on-surface-muted mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-body-sm text-on-surface-muted">Location</p>
                  <p className="text-body text-on-surface">
                    Whalesborough Farm, Bude, Cornwall
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PawPrint className="h-5 w-5 text-on-surface-muted mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-body-sm text-on-surface-muted">
                    Guests & Dogs
                  </p>
                  <p className="text-body text-on-surface">2 guests, 1 dog</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons confirmed */}
          <div className="bg-surface-container-low p-8">
            <h2 className="font-display text-h3 text-on-surface mb-4">
              Extras included
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between text-body text-on-surface">
                <span>Relaxation Massage x2</span>
                <span>&pound;170</span>
              </li>
              <li className="flex justify-between text-body text-on-surface">
                <span>Cornish Welcome Hamper</span>
                <span>&pound;65</span>
              </li>
              <li className="flex justify-between text-body text-on-surface">
                <span>Dog Welcome Pack x1</span>
                <span>&pound;25</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex justify-between">
              <span className="font-display text-h3 text-on-surface">
                Total paid
              </span>
              <span className="font-display text-h2 text-on-surface">
                &pound;1,155
              </span>
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-surface-container-low p-8">
            <h2 className="font-display text-h3 text-on-surface mb-6">
              What happens next
            </h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-secondary text-secondary-fg font-body text-sm">
                  1
                </span>
                <div>
                  <p className="text-body text-on-surface">
                    Confirmation email sent
                  </p>
                  <p className="text-body-sm text-on-surface-muted">
                    Check your inbox for full booking details and directions.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-secondary text-secondary-fg font-body text-sm">
                  2
                </span>
                <div>
                  <p className="text-body text-on-surface">
                    7 days before arrival
                  </p>
                  <p className="text-body-sm text-on-surface-muted">
                    We will send your welcome pack with key collection details,
                    WiFi codes and local recommendations.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-secondary text-secondary-fg font-body text-sm">
                  3
                </span>
                <div>
                  <p className="text-body text-on-surface">Arrival day</p>
                  <p className="text-body-sm text-on-surface-muted">
                    Check-in from 4pm. Your cottage will be ready and waiting,
                    hamper chilled, fire laid.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to homepage
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="secondary" size="lg">
                Explore the estate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
