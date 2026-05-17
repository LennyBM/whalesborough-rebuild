"use client";

import Image from "next/image";
import Link from "next/link";

const quickActions = [
  { label: "Book Treatment", href: "/spa/booking" },
  { label: "Spa Days", href: "/spa/spa-days" },
  { label: "Gift Vouchers", href: "/spa/gift-vouchers" },
  { label: "Memberships", href: "/spa/memberships" },
];

const treatments = [
  { name: "Massage & Body", price: "from £75" },
  { name: "Facials", price: "from £65" },
  { name: "Rituals & Journeys", price: "from £120" },
  { name: "Couples", price: "from £180" },
];

const facilities = [
  { src: "/images/spa/pool.webp", caption: "15m Pool" },
  { src: "/images/spa/spa-interior.webp", caption: "Thermal Suite" },
  { src: "/images/spa/spa-wellness.webp", caption: "Relaxation" },
  { src: "/images/spa/spa-exterior.webp", caption: "Garden" },
];

const hours = [
  { area: "Spa", time: "7am–9pm daily" },
  { area: "Pool", time: "7am–8pm" },
  { area: "Treatments", time: "9am–7pm" },
  { area: "Gym", time: "6am–9pm" },
];

export default function SpaPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 pt-6 pb-4">
        <div className="flex-1">
          <h1 className="font-display text-2xl font-semibold text-on-surface">
            The W Club
          </h1>
          <p className="text-sm text-on-surface-muted">Spa & Wellness</p>
        </div>
        <div className="relative h-[60px] w-[60px] overflow-hidden rounded-full">
          <Image
            src="/images/spa/pool.webp"
            alt="The W Club Spa pool"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Status card */}
      <div className="mx-4 rounded-xl bg-surface-container-low px-4 py-3">
        <p className="text-sm font-medium text-secondary">
          Open now{" "}
          <span className="text-on-surface-muted">
            · Pool until 8pm · Treatments until 7pm
          </span>
        </p>
      </div>

      {/* Quick actions */}
      <div className="mt-5 flex gap-3 overflow-x-auto px-4 scrollbar-hide">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex-shrink-0 rounded-xl bg-surface-container px-5 py-3 text-sm font-medium text-on-surface shadow-sm transition-colors active:bg-surface-container-low"
          >
            {action.label}
          </Link>
        ))}
      </div>

      {/* Treatment categories */}
      <div className="mt-6 px-4">
        <h2 className="mb-2 font-display text-lg font-semibold text-on-surface">
          Treatments
        </h2>
        <div className="divide-y divide-surface-container rounded-xl bg-surface-container-low">
          {treatments.map((t) => (
            <Link
              key={t.name}
              href="/spa/treatments"
              className="flex items-center justify-between px-4 py-3.5 active:bg-surface-container"
            >
              <span className="text-sm font-medium text-on-surface">
                {t.name}
              </span>
              <span className="text-xs text-on-surface-muted">{t.price}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Facilities grid */}
      <div className="mt-6 px-4">
        <h2 className="mb-2 font-display text-lg font-semibold text-on-surface">
          Facilities
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {facilities.map((f) => (
            <div key={f.caption} className="overflow-hidden rounded-xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={f.src}
                  alt={f.caption}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="bg-surface-container-low px-2 py-1.5 text-xs text-on-surface-muted">
                {f.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Opening hours */}
      <div className="mt-6 mx-4 rounded-xl bg-surface-container-low px-4 py-4">
        <h2 className="mb-2 font-display text-base font-semibold text-on-surface">
          Opening Hours
        </h2>
        <div className="space-y-1.5">
          {hours.map((h) => (
            <div key={h.area} className="flex justify-between text-sm">
              <span className="text-on-surface-muted">{h.area}</span>
              <span className="text-on-surface">{h.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Book CTA */}
      <div className="mt-6 px-4">
        <Link
          href="/spa/booking"
          className="block w-full rounded-xl bg-[#703a1d] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-opacity active:opacity-90"
        >
          Book a treatment
        </Link>
      </div>
    </div>
  );
}
