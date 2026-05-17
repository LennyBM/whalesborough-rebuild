"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = [
  { label: "Cottages", slug: "cottages" },
  { label: "Suites", slug: "suites" },
  { label: "Spa Lodges", slug: "spa-lodges" },
  { label: "Spa", slug: "spa" },
  { label: "Restaurant", slug: "restaurant" },
  { label: "Estate", slug: "estate" },
  { label: "Dog-Friendly", slug: "dog-friendly" },
  { label: "Activities", slug: "activities" },
];

const featured = [
  {
    image: "/images/spa/pool.webp",
    title: "Spa Day Escape",
    subtitle: "From £95/person",
    href: "/spa/spa-days",
  },
  {
    image: "/images/restaurant/weir-restaurant-exterior.webp",
    title: "Sunday Lunch",
    subtitle: "12-3pm, from £18",
    href: "/dine",
  },
];

const properties = [
  { image: "/images/cottages/the-farmhouse.webp", name: "The Farmhouse", sleeps: 8, price: 295 },
  { image: "/images/cottages/eagles-nest.webp", name: "Eagle's Nest", sleeps: 2, price: 175 },
  { image: "/images/cottages/trelowen.webp", name: "Trelowen", sleeps: 6, price: 245 },
  { image: "/images/cottages/nettlecoombe.webp", name: "Nettlecoombe", sleeps: 4, price: 210 },
  { image: "/images/cottages/medlands.webp", name: "Medlands", sleeps: 4, price: 220 },
  { image: "/images/cottages/barley-park.webp", name: "Barley Park", sleeps: 6, price: 260 },
];

const quickLinks = [
  { label: "View all cottages", href: "/stay/cottages" },
  { label: "Spa treatments", href: "/spa/treatments" },
  { label: "Estate walks", href: "/estate/dog-friendly" },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Page Title */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="font-display text-2xl font-semibold text-on-surface">
          Explore
        </h1>
      </div>

      {/* Search Bar */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-3 rounded-full bg-surface-container-low px-4 py-3">
          <Search className="h-5 w-5 text-on-surface-muted" />
          <span className="text-sm text-on-surface-muted">
            Search properties, spa, dining...
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 pb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
              }
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "bg-secondary text-white"
                  : "bg-surface-container text-on-surface"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <section className="px-5 pb-6">
        <h2 className="font-display text-lg font-semibold text-on-surface mb-3">
          Popular this season
        </h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {featured.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="shrink-0 w-[72%] max-w-[300px]"
            >
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="overflow-hidden rounded-2xl bg-surface-container-low"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="font-display text-base font-semibold text-on-surface">
                    {item.title}
                  </p>
                  <p className="text-sm text-on-surface-muted mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Properties Grid */}
      <section className="px-5 pb-6">
        <h2 className="font-display text-lg font-semibold text-on-surface mb-3">
          Properties
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {properties.map((prop) => (
            <Link key={prop.name} href="/stay/cottages">
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="overflow-hidden rounded-xl bg-surface-container-low"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={prop.image}
                    alt={prop.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2.5">
                  <p className="font-body text-sm font-semibold text-on-surface leading-tight">
                    {prop.name}
                  </p>
                  <p className="text-xs text-on-surface-muted mt-0.5">
                    Sleeps {prop.sleeps} · £{prop.price}/night
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-5 pb-8">
        <div className="flex flex-col gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between rounded-xl bg-surface-container-low px-4 py-3.5"
            >
              <span className="text-sm font-medium text-on-surface">
                {link.label}
              </span>
              <svg
                className="h-4 w-4 text-on-surface-muted"
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
      </section>
    </main>
  );
}
