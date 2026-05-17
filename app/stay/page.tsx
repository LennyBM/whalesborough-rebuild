"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const filters = [
  { label: "All", count: null },
  { label: "Cottages", count: 27 },
  { label: "Suites", count: 22 },
  { label: "Spa Lodges", count: 2 },
];

const properties = [
  {
    name: "The Farmhouse",
    slug: "the-farmhouse",
    sleeps: 12,
    beds: 5,
    price: 320,
    features: ["Dog friendly", "Garden"],
    image: "/images/cottages/the-farmhouse.webp",
  },
  {
    name: "Eagles Nest",
    slug: "eagles-nest",
    sleeps: 6,
    beds: 3,
    price: 195,
    features: ["Sea views"],
    image: "/images/cottages/eagles-nest.webp",
  },
  {
    name: "Gwari Spa Barn",
    slug: "gwari-spa-barn",
    sleeps: 4,
    beds: 2,
    price: 285,
    features: ["Hot tub"],
    image: "/images/cottages/gwari-spa-barn.webp",
  },
  {
    name: "Arvor Suite",
    slug: "arvor-suite",
    sleeps: 2,
    beds: 1,
    price: 150,
    features: ["Contemporary"],
    image: "/images/arvor/arvor-exterior.webp",
  },
  {
    name: "Trelowen",
    slug: "trelowen",
    sleeps: 4,
    beds: 2,
    price: 165,
    features: ["Countryside views"],
    image: "/images/cottages/trelowen.webp",
  },
  {
    name: "Nettlecoombe",
    slug: "nettlecoombe",
    sleeps: 6,
    beds: 3,
    price: 185,
    features: ["Dog friendly"],
    image: "/images/cottages/nettlecoombe.webp",
  },
  {
    name: "Medlands",
    slug: "medlands",
    sleeps: 4,
    beds: 2,
    price: 155,
    features: ["Peaceful"],
    image: "/images/cottages/medlands.webp",
  },
  {
    name: "Barley Park",
    slug: "barley-park",
    sleeps: 5,
    beds: 2,
    price: 175,
    features: ["Family friendly"],
    image: "/images/cottages/barley-park.webp",
  },
];

export default function StayPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Compact header */}
      <div className="relative h-[150px] w-full overflow-hidden">
        <Image
          src="/images/hero/cottages-hero.webp"
          alt="Whalesborough cottages"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h1 className="font-display text-2xl font-semibold text-on-surface">
            Stay
          </h1>
          <p className="text-sm text-on-surface-muted">
            30+ properties on 500 acres
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === filter.label
                ? "bg-secondary text-white"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {filter.label}
            {filter.count !== null && (
              <span className="ml-1 opacity-70">{filter.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Quick book banner */}
      <div className="px-4 py-2">
        <Link
          href="/stay/booking/dates"
          className="flex items-center gap-3 rounded-xl bg-surface-container-low px-4 py-3 shadow-sm ring-1 ring-black/5 transition-shadow active:shadow-none"
        >
          <svg
            className="h-5 w-5 shrink-0 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          <span className="text-sm text-on-surface-muted">
            Check-in → Check-out · 2 guests
          </span>
          <span className="ml-auto shrink-0 text-sm font-semibold text-primary">
            Search
          </span>
        </Link>
      </div>

      {/* Property list */}
      <div className="mt-2 flex flex-col gap-3 px-4">
        {properties.map((property) => (
          <Link
            key={property.slug}
            href={`/stay/${property.slug}`}
            className="flex gap-3 rounded-xl bg-surface-container-low p-2 shadow-sm ring-1 ring-black/5 transition-all active:scale-[0.98] active:shadow-none"
          >
            <div className="relative h-24 w-[120px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src={property.image}
                alt={property.name}
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
              <h3 className="truncate font-display text-base font-semibold text-on-surface">
                {property.name}
              </h3>
              <p className="mt-0.5 text-xs text-on-surface-muted">
                Sleeps {property.sleeps} · {property.beds} bed
              </p>
              {property.features.length > 0 && (
                <p className="mt-1 text-xs text-on-surface-variant">
                  {property.features.join(" · ")}
                </p>
              )}
              <p className="mt-1.5 text-sm font-semibold text-primary">
                From £{property.price}
                <span className="font-normal text-on-surface-muted">
                  /night
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* View all link */}
      <div className="mt-6 px-4 text-center">
        <Link
          href="/stay/all"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          View all properties
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
