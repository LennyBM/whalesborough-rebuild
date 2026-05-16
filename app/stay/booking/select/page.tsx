"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, PawPrint, Waves } from "lucide-react";

/* ─── Progress Stepper ─── */
function BookingStepper({ current }: { current: number }) {
  const steps = ["Dates", "Select", "Add-ons", "Details", "Payment"];
  return (
    <nav aria-label="Booking progress" className="mb-12">
      <ol className="flex items-center gap-2">
        {steps.map((label, i) => {
          const step = i + 1;
          const isActive = step === current;
          const isComplete = step < current;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center font-body text-button text-sm ${
                  isActive
                    ? "bg-primary text-primary-fg"
                    : isComplete
                      ? "bg-secondary text-secondary-fg"
                      : "bg-surface-container text-on-surface-muted"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {step}
              </span>
              <span
                className={`hidden sm:inline font-body text-sm uppercase tracking-wide ${
                  isActive ? "text-on-surface" : "text-on-surface-muted"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-2 h-px w-4 bg-outline-variant sm:w-8" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ─── Mock accommodation data ─── */
const accommodations = [
  {
    id: "trevose-cottage",
    name: "Trevose Cottage",
    type: "Sea-view Cottage",
    sleeps: 4,
    dogs: 2,
    price: 895,
    features: ["Sea view", "Hot tub", "Wood burner", "Garden"],
  },
  {
    id: "meadow-lodge",
    name: "Meadow Lodge",
    type: "Countryside Lodge",
    sleeps: 6,
    dogs: 2,
    price: 1195,
    features: ["Countryside view", "Open plan", "Pet friendly", "BBQ"],
  },
  {
    id: "barn-retreat",
    name: "The Barn Retreat",
    type: "Converted Barn",
    sleeps: 8,
    dogs: 1,
    price: 1495,
    features: ["Vaulted ceilings", "Games room", "Garden", "Parking"],
  },
  {
    id: "coastal-studio",
    name: "Coastal Studio",
    type: "Compact Studio",
    sleeps: 2,
    dogs: 1,
    price: 595,
    features: ["Sea view", "Couples retreat", "Walk to beach"],
  },
  {
    id: "harbour-house",
    name: "Harbour House",
    type: "Premium Cottage",
    sleeps: 6,
    dogs: 2,
    price: 1350,
    features: ["Sea view", "Hot tub", "Premium kitchen", "Terrace"],
  },
  {
    id: "woodland-cabin",
    name: "Woodland Cabin",
    type: "Woodland Cabin",
    sleeps: 4,
    dogs: 2,
    price: 795,
    features: ["Forest setting", "Fire pit", "Dog friendly", "Quiet"],
  },
];

export default function BookingSelectPage() {
  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-content px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={2} />
        <p className="eyebrow text-on-surface-muted">Step 2 of 5</p>
        <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg max-w-3xl text-on-surface">
          Choose your stay
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
          Available properties for your selected dates. All prices are per stay.
        </p>
      </header>

      <section className="mx-auto max-w-content px-6 pb-32 pt-12 lg:px-12">
        {/* Results grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accommodations.map((acc) => (
            <div
              key={acc.id}
              className="bg-surface-container-low flex flex-col"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-surface-container flex items-center justify-center">
                <Waves className="h-8 w-8 text-on-surface-muted/40" aria-hidden="true" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow text-on-surface-muted">{acc.type}</p>
                <h2 className="mt-2 font-display text-h3 text-on-surface">
                  {acc.name}
                </h2>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {acc.features.map((f) => (
                    <span
                      key={f}
                      className="bg-surface-container px-3 py-1 text-body-sm text-on-surface-variant"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    Sleeps {acc.sleeps}
                  </span>
                  <span className="flex items-center gap-1">
                    <PawPrint className="h-4 w-4" aria-hidden="true" />
                    {acc.dogs} {acc.dogs === 1 ? "dog" : "dogs"}
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="mt-auto pt-6 flex items-end justify-between">
                  <div>
                    <span className="font-display text-h2 text-on-surface">
                      &pound;{acc.price}
                    </span>
                    <span className="ml-1 text-body-sm text-on-surface-muted">
                      per stay
                    </span>
                  </div>
                  <Link href="/stay/booking/add-ons">
                    <Button variant="primary" size="sm">
                      Select
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link href="/stay/booking/dates">
            <Button variant="ghost" size="sm">
              &larr; Change dates
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}
