"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

/* ─── Add-on data ─── */
interface AddOn {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  hasQuantity?: boolean;
  maxQty?: number;
}

const addOns: AddOn[] = [
  {
    id: "spa-relax",
    category: "Spa Treatments",
    name: "Relaxation Massage",
    description: "60-minute full body massage at the Whalesborough Spa.",
    price: 85,
    unit: "per person",
    hasQuantity: true,
    maxQty: 4,
  },
  {
    id: "spa-facial",
    category: "Spa Treatments",
    name: "Coastal Facial",
    description: "Revitalising facial using locally sourced marine extracts.",
    price: 75,
    unit: "per person",
    hasQuantity: true,
    maxQty: 4,
  },
  {
    id: "spa-couples",
    category: "Spa Treatments",
    name: "Couples Spa Experience",
    description: "Side-by-side treatments with prosecco and afternoon tea.",
    price: 195,
    unit: "per couple",
  },
  {
    id: "hamper-welcome",
    category: "Welcome Hampers",
    name: "Cornish Welcome Hamper",
    description: "Local cheeses, chutney, fresh bread, wine and chocolates.",
    price: 65,
    unit: "per hamper",
  },
  {
    id: "hamper-breakfast",
    category: "Welcome Hampers",
    name: "Breakfast Hamper",
    description: "Fresh pastries, eggs, bacon, orange juice and coffee.",
    price: 45,
    unit: "per hamper",
  },
  {
    id: "celebration",
    category: "Celebrations",
    name: "Celebration Pack",
    description: "Prosecco, balloons, banner, cake and a personal message.",
    price: 85,
    unit: "per pack",
  },
  {
    id: "dog-welcome",
    category: "Dog Extras",
    name: "Dog Welcome Pack",
    description: "Treat bag, towel, poo bags, water bowl and local walks guide.",
    price: 25,
    unit: "per dog",
    hasQuantity: true,
    maxQty: 2,
  },
  {
    id: "dog-sitting",
    category: "Dog Extras",
    name: "Dog Sitting Service",
    description: "Professional sitter while you enjoy the spa or dinner.",
    price: 40,
    unit: "per session",
    hasQuantity: true,
    maxQty: 4,
  },
];

/* ─── Quantity Control ─── */
function QuantityControl({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
        className="flex h-8 w-8 items-center justify-center bg-surface-container text-on-surface disabled:opacity-30 transition-colors hover:bg-surface-container-high"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className="w-6 text-center font-body text-sm text-on-surface">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center bg-surface-container text-on-surface disabled:opacity-30 transition-colors hover:bg-surface-container-high"
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

export default function BookingAddOnsPage() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = [...new Set(addOns.map((a) => a.category))];

  const toggleAddon = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!selected[id]) {
      setQuantities((prev) => ({ ...prev, [id]: 1 }));
    }
  };

  const setQty = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
    if (qty === 0) {
      setSelected((prev) => ({ ...prev, [id]: false }));
    } else {
      setSelected((prev) => ({ ...prev, [id]: true }));
    }
  };

  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-content px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={3} />
        <p className="eyebrow text-on-surface-muted">Step 3 of 5</p>
        <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg max-w-3xl text-on-surface">
          Make it special
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
          Add spa treatments, welcome hampers, celebration packs and dog extras
          to your stay.
        </p>
      </header>

      <section className="mx-auto max-w-content px-6 pb-32 pt-12 lg:px-12">
        <div className="max-w-3xl space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="font-display text-h2 text-on-surface mb-6">
                {category}
              </h2>
              <div className="space-y-4">
                {addOns
                  .filter((a) => a.category === category)
                  .map((addon) => (
                    <div
                      key={addon.id}
                      className={`p-6 transition-colors ${
                        selected[addon.id]
                          ? "bg-surface-container-high"
                          : "bg-surface-container-low"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={addon.id}
                          checked={selected[addon.id] || false}
                          onCheckedChange={() => toggleAddon(addon.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={addon.id}
                            className="cursor-pointer normal-case tracking-normal text-base text-on-surface"
                          >
                            {addon.name}
                          </Label>
                          <p className="mt-1 text-body-sm text-on-surface-variant">
                            {addon.description}
                          </p>
                          <p className="mt-2 font-body text-sm text-on-surface-muted">
                            &pound;{addon.price} {addon.unit}
                          </p>
                        </div>
                        {addon.hasQuantity && selected[addon.id] && (
                          <QuantityControl
                            value={quantities[addon.id] || 1}
                            max={addon.maxQty || 4}
                            onChange={(v) => setQty(addon.id, v)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-16 flex items-center gap-4">
          <Link href="/stay/booking/guest-details">
            <Button variant="primary" size="lg">
              Continue to guest details
            </Button>
          </Link>
          <Link href="/stay/booking/guest-details">
            <Button variant="ghost" size="sm">
              Skip extras
            </Button>
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/stay/booking/select">
            <Button variant="ghost" size="sm">
              &larr; Back to selection
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}
