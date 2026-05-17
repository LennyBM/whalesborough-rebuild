"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, Gift, Dog, Sparkles, UtensilsCrossed, Clock, Waves } from "lucide-react";

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
                className={`flex h-8 w-8 items-center justify-center font-body text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : isComplete
                      ? "bg-sage text-white"
                      : "bg-surface-container text-on-surface-muted"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? <Check className="h-4 w-4" /> : step}
              </span>
              <span
                className={`hidden sm:inline font-body text-sm uppercase tracking-wide ${
                  isActive ? "text-on-surface" : "text-on-surface-muted"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-2 h-px w-4 bg-on-surface/10 sm:w-8" aria-hidden="true" />
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
  name: string;
  description: string;
  includes: string;
  price: number;
  unit: string;
  icon: React.ElementType;
}

const addOns: AddOn[] = [
  {
    id: "welcome-hamper",
    name: "Cornish Welcome Hamper",
    description: "A taste of Cornwall waiting in your kitchen on arrival.",
    includes: "Local cheeses, crackers, wine, chutney",
    price: 45,
    unit: "per stay",
    icon: ShoppingBag,
  },
  {
    id: "dog-kit",
    name: "Dog Welcome Kit",
    description: "Everything your four-legged friend needs to settle in.",
    includes: "Bed, bowls, treats, towel",
    price: 25,
    unit: "per stay",
    icon: Dog,
  },
  {
    id: "celebration",
    name: "Celebration Package",
    description: "Mark a special occasion with style.",
    includes: "Prosecco, flowers, chocolates, card",
    price: 75,
    unit: "per stay",
    icon: Sparkles,
  },
  {
    id: "grocery-box",
    name: "Premium Grocery Box",
    description: "Skip the supermarket — breakfast sorted from day one.",
    includes: "Breakfast essentials, fresh bread, milk, eggs, orange juice",
    price: 65,
    unit: "per stay",
    icon: UtensilsCrossed,
  },
  {
    id: "hot-tub",
    name: "Hot Tub Private Session",
    description: "Exclusive use of the shared hot tub for your group.",
    includes: "For properties with shared hot tub access",
    price: 35,
    unit: "per night",
    icon: Waves,
  },
  {
    id: "early-checkin",
    name: "Early Check-in (2pm)",
    description: "Arrive two hours earlier and start your holiday sooner.",
    includes: "Standard check-in is 4pm",
    price: 30,
    unit: "per stay",
    icon: Clock,
  },
  {
    id: "late-checkout",
    name: "Late Check-out (12pm)",
    description: "No rush on your last morning — enjoy a leisurely departure.",
    includes: "Standard check-out is 10am",
    price: 30,
    unit: "per stay",
    icon: Clock,
  },
  {
    id: "spa-pass",
    name: "Spa Day Pass",
    description: "Full access to our award-winning wellness facilities.",
    includes: "Pool, thermal suite, gym",
    price: 55,
    unit: "per person",
    icon: Gift,
  },
];

/* ─── Add-on Card ─── */
function AddOnCard({
  addon,
  isSelected,
  onToggle,
}: {
  addon: AddOn;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const Icon = addon.icon;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group relative w-full text-left p-6 transition-all duration-300 ${
        isSelected
          ? "bg-sage/8 ring-2 ring-sage"
          : "bg-surface-container-low hover:bg-surface-container"
      }`}
    >
      {/* Selected indicator */}
      <div
        className={`absolute top-4 right-4 flex h-6 w-6 items-center justify-center transition-all duration-300 ${
          isSelected ? "bg-sage text-white scale-100" : "bg-surface-container text-transparent scale-90"
        }`}
      >
        <Check className="h-3.5 w-3.5" />
      </div>

      <div className="flex items-start gap-4 pr-8">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-300 ${
            isSelected ? "bg-sage/15 text-sage" : "bg-surface-container text-on-surface-muted"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base text-on-surface leading-snug">
            {addon.name}
          </h3>
          <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
            {addon.description}
          </p>
          <p className="mt-2 text-xs text-on-surface-muted italic">
            {addon.includes}
          </p>
        </div>

        {/* Price */}
        <div className="shrink-0 text-right">
          <span className="font-display text-lg text-on-surface">
            &pound;{addon.price}
          </span>
          <span className="block text-xs text-on-surface-muted mt-0.5">
            {addon.unit}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ─── Main Page ─── */
export default function BookingAddOnsPage() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggleAddon = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedAddons = addOns.filter((a) => selected[a.id]);
  const totalExtras = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const basePrice = 1280;

  return (
    <article className="bg-background min-h-screen">
      {/* Header */}
      <header className="mx-auto max-w-content px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={3} />

        {/* Summary bar */}
        <div className="mb-10 p-4 bg-surface-container-low">
          <p className="text-sm text-on-surface-muted font-body">
            <span className="text-on-surface font-medium">The Farmhouse</span>
            {" · "}4 nights · 12 Jul – 16 Jul 2026 · &pound;1,280
          </p>
        </div>

        <p className="eyebrow text-on-surface-muted">Step 3 of 5</p>
        <h1 className="heading-editorial mt-4 text-on-surface">
          Make it special
        </h1>
        <p className="mt-6 max-w-2xl text-body text-on-surface-variant">
          Enhance your stay with handpicked extras — from welcome hampers filled
          with Cornish produce to private hot tub sessions under the stars.
        </p>
      </header>

      {/* Add-on Grid */}
      <section className="mx-auto max-w-content px-6 pb-32 pt-12 lg:px-12">
        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {addOns.map((addon) => (
            <motion.div
              key={addon.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
            >
              <AddOnCard
                addon={addon}
                isSelected={selected[addon.id] || false}
                onToggle={() => toggleAddon(addon.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Running Total + CTA */}
        <motion.div
          className="sticky bottom-0 mt-16 -mx-6 px-6 py-6 bg-background/95 backdrop-blur-sm border-t border-on-surface/5 lg:-mx-12 lg:px-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Total */}
            <div>
              <p className="text-sm text-on-surface-muted font-body">
                {selectedAddons.length === 0
                  ? "No extras selected"
                  : `${selectedAddons.length} extra${selectedAddons.length > 1 ? "s" : ""} selected`}
              </p>
              <p className="mt-1 font-display text-2xl text-on-surface">
                &pound;{(basePrice + totalExtras).toLocaleString()}
                {totalExtras > 0 && (
                  <span className="ml-2 text-sm text-sage font-body">
                    (+&pound;{totalExtras} extras)
                  </span>
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/stay/booking/select">
                <Button variant="ghost" size="sm">
                  Back
                </Button>
              </Link>
              <Link href="/stay/booking/guest-details">
                <Button variant="primary" size="lg">
                  Continue to Guest Details
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
