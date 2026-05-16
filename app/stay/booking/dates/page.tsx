"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

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

/* ─── Stepper Control ─── */
function NumberStepper({
  label,
  value,
  min = 0,
  max = 10,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-outline-variant/30">
      <div>
        <span className="font-body text-base text-on-surface">{label}</span>
        {hint && (
          <span className="block text-body-sm text-on-surface-muted">{hint}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-10 w-10 items-center justify-center bg-surface-container text-on-surface disabled:opacity-30 transition-colors hover:bg-surface-container-high"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-body text-lg text-on-surface" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-10 w-10 items-center justify-center bg-surface-container text-on-surface disabled:opacity-30 transition-colors hover:bg-surface-container-high"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function BookingDatesPage() {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(2);
  const [dogs, setDogs] = useState(0);

  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-content px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={1} />
        <p className="eyebrow text-on-surface-muted">Step 1 of 5</p>
        <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg max-w-3xl text-on-surface">
          When are you coming?
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
          Choose your dates and party size. Sea-view cottages book quickest.
        </p>
      </header>

      <section className="mx-auto max-w-content px-6 pb-32 pt-12 lg:px-12">
        <div className="max-w-xl">
          {/* Date inputs */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <Label htmlFor="arrival">Arrival date</Label>
              <Input
                id="arrival"
                type="date"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-body-sm text-on-surface-muted">
                Arrivals: Friday, Monday or Saturday
              </p>
            </div>
            <div>
              <Label htmlFor="departure">Departure date</Label>
              <Input
                id="departure"
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-body-sm text-on-surface-muted">
                3, 4 or 7 night stays
              </p>
            </div>
          </div>

          {/* Guest & dog steppers */}
          <div className="mt-12">
            <NumberStepper
              label="Guests"
              value={guests}
              min={1}
              max={8}
              onChange={setGuests}
              hint="Maximum varies by property (2–8)"
            />
            <NumberStepper
              label="Dogs"
              value={dogs}
              min={0}
              max={2}
              onChange={setDogs}
              hint="Up to 2 dogs per property"
            />
          </div>

          {/* Search button */}
          <div className="mt-12 flex items-center gap-4">
            <Link href="/stay/booking/select">
              <Button variant="primary" size="lg">
                Search available stays
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
