"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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

export default function BookingGuestDetailsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: "",
    specialRequests: "",
    marketingConsent: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-content px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={4} />
        <p className="eyebrow text-on-surface-muted">Step 4 of 5</p>
        <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg max-w-3xl text-on-surface">
          Guest details
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
          Tell us who is coming so we can prepare everything for your arrival.
        </p>
      </header>

      <section className="mx-auto max-w-content px-6 pb-32 pt-12 lg:px-12">
        <form
          className="max-w-2xl space-y-10"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Name */}
          <fieldset className="space-y-6">
            <legend className="font-display text-h3 text-on-surface mb-4">
              Lead guest
            </legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className="mt-2"
                  required
                  autoComplete="given-name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className="mt-2"
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset className="space-y-6">
            <legend className="font-display text-h3 text-on-surface mb-4">
              Contact
            </legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="mt-2"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="mt-2"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>
          </fieldset>

          {/* Address */}
          <fieldset className="space-y-6">
            <legend className="font-display text-h3 text-on-surface mb-4">
              Address
            </legend>
            <div>
              <Label htmlFor="addressLine1">Address line 1</Label>
              <Input
                id="addressLine1"
                value={form.addressLine1}
                onChange={(e) => updateField("addressLine1", e.target.value)}
                className="mt-2"
                required
                autoComplete="address-line1"
              />
            </div>
            <div>
              <Label htmlFor="addressLine2">Address line 2</Label>
              <Input
                id="addressLine2"
                value={form.addressLine2}
                onChange={(e) => updateField("addressLine2", e.target.value)}
                className="mt-2"
                autoComplete="address-line2"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <Label htmlFor="city">City / Town</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="mt-2"
                  required
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <Label htmlFor="county">County</Label>
                <Input
                  id="county"
                  value={form.county}
                  onChange={(e) => updateField("county", e.target.value)}
                  className="mt-2"
                  autoComplete="address-level1"
                />
              </div>
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  value={form.postcode}
                  onChange={(e) => updateField("postcode", e.target.value)}
                  className="mt-2"
                  required
                  autoComplete="postal-code"
                />
              </div>
            </div>
          </fieldset>

          {/* Special requests */}
          <fieldset className="space-y-6">
            <legend className="font-display text-h3 text-on-surface mb-4">
              Special requests
            </legend>
            <div>
              <Label htmlFor="specialRequests">
                Anything we should know?
              </Label>
              <textarea
                id="specialRequests"
                value={form.specialRequests}
                onChange={(e) => updateField("specialRequests", e.target.value)}
                rows={4}
                className="mt-2 block w-full bg-transparent px-0 py-3 font-body text-base text-on-surface placeholder:text-on-surface-muted border-0 border-b-2 border-on-surface-variant/30 focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-fast ease-out-luxury resize-none"
                placeholder="Dietary requirements, accessibility needs, celebration details..."
              />
            </div>
          </fieldset>

          {/* Marketing consent */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="marketing"
              checked={form.marketingConsent}
              onCheckedChange={(checked) =>
                updateField("marketingConsent", checked === true)
              }
              className="mt-0.5"
            />
            <Label
              htmlFor="marketing"
              className="normal-case tracking-normal text-sm text-on-surface-variant cursor-pointer"
            >
              I would like to receive news, offers and inspiration from
              Whalesborough Farm Resort & Spa. You can unsubscribe at any time.
            </Label>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 pt-6">
            <Link href="/stay/booking/payment">
              <Button variant="primary" size="lg" type="button">
                Continue to payment
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/stay/booking/add-ons">
              <Button variant="ghost" size="sm" type="button">
                &larr; Back to add-ons
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </article>
  );
}
