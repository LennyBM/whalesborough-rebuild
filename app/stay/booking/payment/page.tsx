"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ShieldCheck } from "lucide-react";

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
                className={`flex h-8 w-8 items-center justify-center font-body text-sm ${
                  isActive
                    ? "bg-primary text-white"
                    : isComplete
                      ? "bg-on-surface text-white"
                      : "bg-surface-container text-on-surface-muted"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? "✓" : step}
              </span>
              <span
                className={`hidden sm:inline font-body text-sm uppercase tracking-wide ${
                  isActive ? "text-on-surface" : "text-on-surface-muted"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-2 h-px w-4 bg-on-surface-muted/20 sm:w-8" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ─── Accepted Payment Methods ─── */
function AcceptedPayments() {
  const methods = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"];
  return (
    <div className="flex flex-wrap items-center gap-3">
      {methods.map((method) => (
        <span
          key={method}
          className="bg-surface-container px-3 py-1.5 font-body text-xs uppercase tracking-wide text-on-surface-muted"
        >
          {method}
        </span>
      ))}
    </div>
  );
}

/* ─── Order Summary ─── */
function OrderSummary() {
  return (
    <div className="bg-surface-container-low p-8 lg:p-10">
      <h2 className="font-display text-2xl text-on-surface mb-6">
        Order summary
      </h2>

      {/* Property */}
      <div className="space-y-1 pb-6">
        <p className="font-body text-on-surface font-medium">The Farmhouse</p>
        <p className="font-body text-sm text-on-surface-muted">
          12 Jul – 16 Jul 2026 · 4 nights
        </p>
        <p className="font-body text-sm text-on-surface-muted">
          8 adults, 2 children
        </p>
      </div>

      {/* Base rate */}
      <div className="space-y-3 py-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex justify-between font-body text-sm">
          <span className="text-on-surface">£320/night × 4</span>
          <span className="text-on-surface">£1,280</span>
        </div>
      </div>

      {/* Add-ons */}
      <div className="space-y-3 py-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <p className="font-body text-xs uppercase tracking-wide text-on-surface-muted mb-3">
          Add-ons
        </p>
        <div className="flex justify-between font-body text-sm">
          <span className="text-on-surface">Cornish Welcome Hamper</span>
          <span className="text-on-surface">£45</span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-on-surface">Dog Welcome Kit</span>
          <span className="text-on-surface">£25</span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-on-surface">Spa Day Pass × 2</span>
          <span className="text-on-surface">£110</span>
        </div>
      </div>

      {/* Subtotal & Discount */}
      <div className="space-y-3 py-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex justify-between font-body text-sm">
          <span className="text-on-surface-muted">Subtotal</span>
          <span className="text-on-surface">£1,460</span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-on-surface-muted">Early booking discount</span>
          <span className="text-green-700">-£65</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline pt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <span className="font-display text-lg text-on-surface">Total</span>
        <span className="font-display text-3xl text-on-surface">£1,395</span>
      </div>

      {/* Cancellation policy */}
      <p className="mt-6 font-body text-xs text-on-surface-muted leading-relaxed">
        Free cancellation until 14 days before arrival
      </p>
    </div>
  );
}

export default function BookingPaymentPage() {
  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-5xl px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={5} />
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-32 pt-4 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* LEFT: Payment form */}
          <div className="space-y-10">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-on-surface mb-2">
                Pay securely
              </h1>
              <p className="font-body text-on-surface-variant">
                Your card details are encrypted and processed by Stripe. We never store your payment information.
              </p>
            </div>

            {/* Mock Stripe Payment Element */}
            <div className="bg-surface-container-low p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-on-surface-muted" aria-hidden="true" />
                <span className="font-body text-xs uppercase tracking-wide text-on-surface-muted">
                  Card details
                </span>
              </div>

              {/* Card Number */}
              <div>
                <label className="block font-body text-sm text-on-surface mb-2">
                  Card number
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="h-12 bg-background font-body text-on-surface placeholder:text-on-surface-muted/50"
                  readOnly
                />
              </div>

              {/* Expiry + CVC row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-sm text-on-surface mb-2">
                    Expiry date
                  </label>
                  <Input
                    type="text"
                    placeholder="MM / YY"
                    className="h-12 bg-background font-body text-on-surface placeholder:text-on-surface-muted/50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-on-surface mb-2">
                    CVC
                  </label>
                  <Input
                    type="text"
                    placeholder="123"
                    className="h-12 bg-background font-body text-on-surface placeholder:text-on-surface-muted/50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Accepted payments */}
            <div className="space-y-3">
              <p className="font-body text-xs uppercase tracking-wide text-on-surface-muted">
                Accepted payment methods
              </p>
              <AcceptedPayments />
            </div>

            {/* Pay button */}
            <div>
              <Link href="/stay/booking/confirmation/demo">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  Pay £1,395
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <p className="font-body text-xs text-on-surface-muted tracking-wide">
              256-bit encryption · PCI DSS compliant · Instant confirmation
            </p>

            {/* Back link */}
            <div className="pt-4">
              <Link
                href="/stay/booking/guest-details"
                className="font-body text-sm text-on-surface-muted hover:text-on-surface transition-colors"
              >
                ← Back to guest details
              </Link>
            </div>
          </div>

          {/* RIGHT: Order summary */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <OrderSummary />
          </aside>
        </div>
      </section>
    </article>
  );
}
