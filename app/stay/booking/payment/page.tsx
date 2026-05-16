"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Lock } from "lucide-react";

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

/* ─── Order Summary (mock) ─── */
function OrderSummary() {
  return (
    <div className="bg-surface-container-low p-8">
      <h2 className="font-display text-h3 text-on-surface mb-6">
        Order summary
      </h2>

      <div className="space-y-4 border-b border-outline-variant/30 pb-6">
        <div className="flex justify-between">
          <div>
            <p className="text-body text-on-surface">Trevose Cottage</p>
            <p className="text-body-sm text-on-surface-muted">
              Fri 20 Jun — Mon 23 Jun 2026 (3 nights)
            </p>
          </div>
          <span className="font-body text-on-surface">&pound;895</span>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-body text-on-surface">Relaxation Massage x2</p>
            <p className="text-body-sm text-on-surface-muted">Spa treatment</p>
          </div>
          <span className="font-body text-on-surface">&pound;170</span>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-body text-on-surface">Cornish Welcome Hamper</p>
            <p className="text-body-sm text-on-surface-muted">Hamper</p>
          </div>
          <span className="font-body text-on-surface">&pound;65</span>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-body text-on-surface">Dog Welcome Pack x1</p>
            <p className="text-body-sm text-on-surface-muted">Dog extra</p>
          </div>
          <span className="font-body text-on-surface">&pound;25</span>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <span className="font-display text-h3 text-on-surface">Total</span>
        <span className="font-display text-h2 text-on-surface">
          &pound;1,155
        </span>
      </div>

      <p className="mt-4 text-body-sm text-on-surface-muted">
        Free cancellation until 13 Jun 2026
      </p>
    </div>
  );
}

export default function BookingPaymentPage() {
  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-content px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={5} />
        <p className="eyebrow text-on-surface-muted">Step 5 of 5</p>
        <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg max-w-3xl text-on-surface">
          Payment
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
          Secure checkout. Your card details are processed by Stripe and never
          stored on our servers.
        </p>
      </header>

      <section className="mx-auto max-w-content px-6 pb-32 pt-12 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Payment form area */}
          <div className="space-y-8">
            {/* Express checkout */}
            <div>
              <h2 className="font-display text-h3 text-on-surface mb-4">
                Express checkout
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex h-14 items-center justify-center gap-3 bg-black text-white font-body text-sm transition-opacity hover:opacity-90"
                >
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                  Apple Pay
                </button>
                <button
                  type="button"
                  className="flex h-14 items-center justify-center gap-3 bg-surface-container text-on-surface font-body text-sm transition-colors hover:bg-surface-container-high"
                >
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                  Google Pay
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <span className="flex-1 h-px bg-outline-variant/30" />
              <span className="text-body-sm text-on-surface-muted uppercase tracking-wide">
                Or pay with card
              </span>
              <span className="flex-1 h-px bg-outline-variant/30" />
            </div>

            {/* Stripe Elements placeholder */}
            <div className="space-y-6">
              <div className="bg-surface-container-low p-8 border border-dashed border-outline-variant/50">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-5 w-5 text-on-surface-muted" aria-hidden="true" />
                  <span className="font-body text-sm text-on-surface-muted uppercase tracking-wide">
                    Stripe Elements
                  </span>
                </div>
                <p className="text-body text-on-surface-variant">
                  Card number, expiry and CVC fields will render here via Stripe
                  Elements. This is a UI placeholder for development.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="h-12 bg-surface-container animate-pulse" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 bg-surface-container animate-pulse" />
                    <div className="h-12 bg-surface-container animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Klarna notice */}
              <div className="bg-surface-container-low p-4 flex items-start gap-3">
                <span className="text-body-sm text-on-surface-muted">
                  Klarna pay-in-3 available. Split your payment into 3
                  interest-free instalments.
                </span>
              </div>
            </div>

            {/* Pay button */}
            <div className="flex items-center gap-4">
              <Link href="/stay/booking/confirmation/WB-2026-001">
                <Button variant="primary" size="lg">
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  Pay &pound;1,155
                </Button>
              </Link>
            </div>

            {/* Security notice */}
            <div className="flex items-center gap-2 text-body-sm text-on-surface-muted">
              <Lock className="h-4 w-4" aria-hidden="true" />
              <span>
                256-bit SSL encrypted. PCI DSS Level 1 compliant via Stripe.
              </span>
            </div>

            {/* Back */}
            <div>
              <Link href="/stay/booking/guest-details">
                <Button variant="ghost" size="sm">
                  &larr; Back to guest details
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar: Order Summary */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <OrderSummary />
          </aside>
        </div>
      </section>
    </article>
  );
}
