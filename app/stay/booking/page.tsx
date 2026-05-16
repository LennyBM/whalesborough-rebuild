"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Home,
  Sparkles,
  UserRound,
  CreditCard,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Choose your dates",
    description: "Select arrival, departure, guests and dogs.",
    icon: Calendar,
  },
  {
    number: 2,
    title: "Select your accommodation",
    description: "Browse available cottages, lodges and barns.",
    icon: Home,
  },
  {
    number: 3,
    title: "Add extras",
    description: "Spa treatments, hampers, celebration packs.",
    icon: Sparkles,
  },
  {
    number: 4,
    title: "Guest details",
    description: "Tell us who is coming and any special requests.",
    icon: UserRound,
  },
  {
    number: 5,
    title: "Payment",
    description: "Secure checkout with Apple Pay, Google Pay or card.",
    icon: CreditCard,
  },
];

export default function BookingHubPage() {
  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-content px-6 pb-12 pt-24 lg:px-12 lg:pb-20 lg:pt-32">
        <p className="eyebrow text-on-surface-muted">Booking</p>
        <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg max-w-3xl text-on-surface">
          Begin your booking
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
          Five steps. Twelve minutes. Your 500-acre coastal escape, confirmed in
          one transaction.
        </p>
      </header>

      <section className="mx-auto max-w-content px-6 pb-32 lg:px-12">
        {/* Steps overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-surface-container-low p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center bg-secondary text-secondary-fg font-body text-button">
                  {step.number}
                </span>
                <step.icon className="h-5 w-5 text-on-surface-variant" aria-hidden="true" />
              </div>
              <h2 className="font-display text-h3 text-on-surface">
                {step.title}
              </h2>
              <p className="text-body text-on-surface-variant">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start gap-6">
          <Link href="/stay/booking/dates">
            <Button variant="primary" size="lg">
              Begin your booking
            </Button>
          </Link>
          <p className="text-body-sm text-on-surface-muted">
            No payment taken until step 5. Free cancellation up to 7 days before
            arrival.
          </p>
        </div>
      </section>
    </article>
  );
}
