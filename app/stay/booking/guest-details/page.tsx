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
                className={`flex h-8 w-8 items-center justify-center font-body text-sm ${
                  isActive
                    ? "bg-primary text-white"
                    : isComplete
                      ? "bg-on-surface text-white"
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
                <span className="mx-2 h-px w-4 bg-on-surface-muted/30 sm:w-8" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ─── Arrival Time Options ─── */
function generateArrivalSlots() {
  const slots: string[] = [];
  for (let hour = 14; hour <= 20; hour++) {
    slots.push(`${hour}:00`);
    if (hour < 20) slots.push(`${hour}:30`);
  }
  return slots;
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
    country: "United Kingdom",
    adults: "2",
    children: "0",
    infants: "0",
    bringingDog: false,
    dogBreed: "",
    dogName: "",
    specialRequests: "",
    arrivalTime: "",
    marketingConsent: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const arrivalSlots = generateArrivalSlots();

  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-3xl px-6 pt-24 lg:pt-32">
        <BookingStepper current={4} />
      </header>

      {/* ─── Summary Bar ─── */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="bg-surface-container px-6 py-4">
          <p className="font-body text-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">The Farmhouse</span>
            {" · "}4 nights{" · "}12 Jul &ndash; 16 Jul 2026{" · "}
            <span className="font-semibold text-on-surface">&pound;1,395</span>
            {" "}
            <span className="text-on-surface-muted">(inc. add-ons)</span>
          </p>
        </div>
      </div>

      {/* ─── Form ─── */}
      <section className="mx-auto max-w-3xl px-6 pb-32 pt-10">
        <h1 className="font-display text-3xl md:text-4xl text-on-surface mb-2">
          Guest details
        </h1>
        <p className="text-on-surface-variant font-body text-base mb-10">
          Tell us who is arriving so we can prepare everything for your stay.
        </p>

        <form
          className="space-y-12"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* ─── Lead Guest ─── */}
          <div className="bg-surface-container-low p-6 md:p-8 space-y-6">
            <h2 className="font-display text-xl text-on-surface">Lead guest</h2>
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
          </div>

          {/* ─── Address ─── */}
          <div className="bg-surface-container-low p-6 md:p-8 space-y-6">
            <h2 className="font-display text-xl text-on-surface">Address</h2>
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
            <div className="grid gap-6 sm:grid-cols-2">
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
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
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
              <div>
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  className="mt-2 block w-full bg-transparent px-3 py-2.5 font-body text-base text-on-surface border-0 border-b-2 border-on-surface-variant/30 focus:outline-none focus:border-primary"
                  autoComplete="country-name"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Ireland">Ireland</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* ─── Party Details ─── */}
          <div className="bg-surface-container-low p-6 md:p-8 space-y-6">
            <h2 className="font-display text-xl text-on-surface">Party details</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <Label htmlFor="adults">Adults</Label>
                <select
                  id="adults"
                  value={form.adults}
                  onChange={(e) => updateField("adults", e.target.value)}
                  className="mt-2 block w-full bg-transparent px-3 py-2.5 font-body text-base text-on-surface border-0 border-b-2 border-on-surface-variant/30 focus:outline-none focus:border-primary"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={String(n)}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="children">Children (2–17)</Label>
                <select
                  id="children"
                  value={form.children}
                  onChange={(e) => updateField("children", e.target.value)}
                  className="mt-2 block w-full bg-transparent px-3 py-2.5 font-body text-base text-on-surface border-0 border-b-2 border-on-surface-variant/30 focus:outline-none focus:border-primary"
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={String(n)}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="infants">Infants (under 2)</Label>
                <select
                  id="infants"
                  value={form.infants}
                  onChange={(e) => updateField("infants", e.target.value)}
                  className="mt-2 block w-full bg-transparent px-3 py-2.5 font-body text-base text-on-surface border-0 border-b-2 border-on-surface-variant/30 focus:outline-none focus:border-primary"
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={String(n)}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ─── Dogs ─── */}
          <div className="bg-surface-container-low p-6 md:p-8 space-y-6">
            <h2 className="font-display text-xl text-on-surface">Dogs</h2>
            <div className="flex items-center gap-3">
              <Checkbox
                id="bringingDog"
                checked={form.bringingDog}
                onCheckedChange={(checked) =>
                  updateField("bringingDog", checked === true)
                }
              />
              <Label
                htmlFor="bringingDog"
                className="normal-case tracking-normal text-base text-on-surface cursor-pointer"
              >
                I am bringing a dog
              </Label>
            </div>
            {form.bringingDog && (
              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <div>
                  <Label htmlFor="dogBreed">Breed</Label>
                  <Input
                    id="dogBreed"
                    value={form.dogBreed}
                    onChange={(e) => updateField("dogBreed", e.target.value)}
                    className="mt-2"
                    placeholder="e.g. Labrador Retriever"
                  />
                </div>
                <div>
                  <Label htmlFor="dogName">Dog&apos;s name</Label>
                  <Input
                    id="dogName"
                    value={form.dogName}
                    onChange={(e) => updateField("dogName", e.target.value)}
                    className="mt-2"
                    placeholder="e.g. Monty"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ─── Special Requests ─── */}
          <div className="bg-surface-container-low p-6 md:p-8 space-y-6">
            <h2 className="font-display text-xl text-on-surface">Special requests</h2>
            <div>
              <Label htmlFor="specialRequests">
                Allergies, accessibility needs, celebrations, or anything else
              </Label>
              <textarea
                id="specialRequests"
                value={form.specialRequests}
                onChange={(e) => updateField("specialRequests", e.target.value)}
                rows={4}
                className="mt-2 block w-full bg-transparent px-0 py-3 font-body text-base text-on-surface placeholder:text-on-surface-muted border-0 border-b-2 border-on-surface-variant/30 focus:outline-none focus:ring-0 focus:border-primary resize-none"
                placeholder="Let us know if there is anything we can do to make your stay more comfortable..."
              />
            </div>
          </div>

          {/* ─── Arrival Time ─── */}
          <div className="bg-surface-container-low p-6 md:p-8 space-y-6">
            <h2 className="font-display text-xl text-on-surface">Arrival time</h2>
            <div>
              <Label htmlFor="arrivalTime">Estimated arrival</Label>
              <select
                id="arrivalTime"
                value={form.arrivalTime}
                onChange={(e) => updateField("arrivalTime", e.target.value)}
                className="mt-2 block w-full bg-transparent px-3 py-2.5 font-body text-base text-on-surface border-0 border-b-2 border-on-surface-variant/30 focus:outline-none focus:border-primary"
              >
                <option value="">Select a time</option>
                {arrivalSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              <p className="mt-2 text-sm text-on-surface-muted font-body">
                Check-in is from 2:00 pm. Please let us know if you expect to arrive after 8:00 pm.
              </p>
            </div>
          </div>

          {/* ─── Marketing Consent ─── */}
          <div className="flex items-start gap-3 px-1">
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
              Keep me updated about offers and events at Whalesborough Farm Resort &amp; Spa. You can unsubscribe at any time.
            </Label>
          </div>

          {/* ─── Submit ─── */}
          <div className="pt-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/stay/booking/payment">
                <Button variant="primary" size="lg" type="button">
                  Continue to payment
                </Button>
              </Link>
              <Link href="/stay/booking/add-ons">
                <Button variant="ghost" size="sm" type="button">
                  &larr; Back
                </Button>
              </Link>
            </div>
            <p className="text-xs text-on-surface-muted font-body flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
                <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Zm-1 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
              </svg>
              Your details are encrypted and stored securely.
            </p>
          </div>
        </form>
      </section>
    </article>
  );
}
