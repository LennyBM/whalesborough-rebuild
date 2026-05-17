"use client";

import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    label: "Breakfast",
    time: "7:30–10:00am",
    note: "Included for guests",
  },
  {
    label: "Lunch",
    time: "12:00–3:00pm",
    note: "Open to all",
  },
  {
    label: "Sunday Lunch",
    time: "12:00–3:00pm",
    note: "Booking recommended",
  },
  {
    label: "Private Dining",
    time: "Groups of 8–20",
    note: "By arrangement",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0">
          <Image
            src="/images/restaurant/weir-restaurant-exterior.webp"
            alt="The Weir Restaurant"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-on-surface">
            The Weir
          </h1>
          <p className="text-sm text-on-surface-muted">Restaurant &amp; Bar</p>
        </div>
      </div>

      {/* Status / Hours */}
      <div className="bg-surface-container-low rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-on-surface">
            Open for lunch &middot; 12:00–3:00pm
          </span>
        </div>
        <p className="text-xs text-on-surface-muted">
          Breakfast: 7:30–10:00am (guests only)
        </p>
      </div>

      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link
          href="/dine/reserve"
          className="flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white text-center"
        >
          Reserve a table
        </Link>
        <Link
          href="/dine/menus"
          className="flex items-center justify-center rounded-xl border border-primary px-4 py-3 text-sm font-semibold text-primary text-center"
        >
          View menu
        </Link>
      </div>

      {/* Today's Specials */}
      <div className="bg-surface-container rounded-xl p-4 mb-6">
        <h2 className="font-display text-sm font-semibold text-on-surface mb-3">
          Today&apos;s specials
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-sm font-medium text-on-surface">
                Catch of the day
              </p>
              <p className="text-xs text-on-surface-muted">
                Pan-fried sea bass, samphire, new potatoes
              </p>
            </div>
            <span className="text-sm font-semibold text-on-surface shrink-0">
              £24
            </span>
          </div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-sm font-medium text-on-surface">Soup</p>
              <p className="text-xs text-on-surface-muted">
                Roasted butternut squash
              </p>
            </div>
            <span className="text-sm font-semibold text-on-surface shrink-0">
              £8
            </span>
          </div>
        </div>
      </div>

      {/* Menu Highlights */}
      <div className="mb-6">
        <h2 className="font-display text-sm font-semibold text-on-surface mb-3">
          Menus
        </h2>
        <div className="divide-y divide-surface-container">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href="/dine/menus"
              className="flex items-center justify-between py-3 group"
            >
              <div>
                <p className="text-sm font-medium text-on-surface group-hover:text-primary">
                  {item.label}
                </p>
                <p className="text-xs text-on-surface-muted">
                  {item.time} &middot; {item.note}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-on-surface-variant shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 gap-2 mb-6">
        <div className="bg-surface-container-low rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-lg">🐕</span>
          <span className="text-sm text-on-surface">
            Dog-friendly seating available
          </span>
        </div>
        <div className="bg-surface-container-low rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-lg">👋</span>
          <span className="text-sm text-on-surface">
            Non-guests welcome for lunch
          </span>
        </div>
        <div className="bg-surface-container-low rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-lg">📞</span>
          <a
            href="tel:01288361363"
            className="text-sm text-primary font-medium"
          >
            01288 361363
          </a>
        </div>
      </div>

      {/* Food Image */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <Image
          src="/images/restaurant/breakfast-coffee.webp"
          alt="Fresh food at The Weir"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
