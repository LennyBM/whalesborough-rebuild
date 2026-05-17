"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  BedDouble,
  Wifi,
  PawPrint,
  Flame,
  Car,
  Check,
  SlidersHorizontal,
} from "lucide-react";

/* ─── Booking Stepper ─── */
const steps = ["Dates", "Select", "Add-ons", "Details", "Payment"];

function BookingStepper({ current }: { current: number }) {
  return (
    <nav aria-label="Booking progress" className="mb-12">
      <ol className="flex items-center gap-1 sm:gap-2">
        {steps.map((label, i) => {
          const step = i + 1;
          const isActive = step === current;
          const isComplete = step < current;
          return (
            <li key={label} className="flex items-center gap-1 sm:gap-2">
              <span
                className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center font-body text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : isComplete
                      ? "bg-sage/20 text-sage"
                      : "bg-surface-container text-on-surface-muted"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step
                )}
              </span>
              <span
                className={`hidden sm:inline font-body text-xs uppercase tracking-widest ${
                  isActive
                    ? "text-on-surface font-medium"
                    : "text-on-surface-muted"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-1 h-px w-3 bg-on-surface-muted/20 sm:mx-2 sm:w-6" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ─── Filter Bar ─── */
function FilterBar({
  filters,
  setFilters,
}: {
  filters: { beds: string; guests: string; sort: string };
  setFilters: (f: { beds: string; guests: string; sort: string }) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-on-surface-muted/10">
      <SlidersHorizontal className="h-4 w-4 text-on-surface-muted" />
      <span className="font-body text-sm text-on-surface-muted uppercase tracking-wide mr-2">
        Filter
      </span>

      <select
        value={filters.beds}
        onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
        className="bg-surface-container-low px-3 py-2 font-body text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-sage/40 appearance-none cursor-pointer"
      >
        <option value="all">All bedrooms</option>
        <option value="2">2 bedrooms</option>
        <option value="3">3 bedrooms</option>
        <option value="5">5+ bedrooms</option>
      </select>

      <select
        value={filters.guests}
        onChange={(e) => setFilters({ ...filters, guests: e.target.value })}
        className="bg-surface-container-low px-3 py-2 font-body text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-sage/40 appearance-none cursor-pointer"
      >
        <option value="all">Any guests</option>
        <option value="4">Up to 4</option>
        <option value="6">Up to 6</option>
        <option value="12">Up to 12</option>
      </select>

      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        className="bg-surface-container-low px-3 py-2 font-body text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-sage/40 appearance-none cursor-pointer"
      >
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="sleeps-desc">Most guests first</option>
      </select>
    </div>
  );
}

/* ─── Property Data ─── */
const properties = [
  {
    id: "the-farmhouse",
    name: "The Farmhouse",
    sleeps: 12,
    bedrooms: 5,
    price: 320,
    image: "/images/cottages/the-farmhouse.webp",
    amenities: ["wifi", "parking", "dogs", "fireplace"],
    description: "Our flagship property — a grand Cornish farmhouse with sweeping estate views.",
  },
  {
    id: "eagles-nest",
    name: "Eagles Nest",
    sleeps: 6,
    bedrooms: 3,
    price: 195,
    image: "/images/cottages/eagles-nest.webp",
    amenities: ["wifi", "parking", "dogs"],
    description: "Elevated position with panoramic countryside and coastal views.",
  },
  {
    id: "trelowen",
    name: "Trelowen",
    sleeps: 4,
    bedrooms: 2,
    price: 165,
    image: "/images/cottages/trelowen.webp",
    amenities: ["wifi", "parking", "fireplace"],
    description: "A characterful cottage with exposed beams and a crackling wood burner.",
  },
  {
    id: "nettlecoombe",
    name: "Nettlecoombe",
    sleeps: 6,
    bedrooms: 3,
    price: 185,
    image: "/images/cottages/nettlecoombe.webp",
    amenities: ["wifi", "dogs", "parking"],
    description: "Tucked into a quiet valley, perfect for families with dogs.",
  },
  {
    id: "medlands",
    name: "Medlands",
    sleeps: 4,
    bedrooms: 2,
    price: 155,
    image: "/images/cottages/medlands.webp",
    amenities: ["wifi", "parking"],
    description: "Light-filled interiors with direct garden access and countryside calm.",
  },
  {
    id: "barley-park",
    name: "Barley Park",
    sleeps: 5,
    bedrooms: 2,
    price: 175,
    image: "/images/cottages/barley-park.webp",
    amenities: ["wifi", "dogs", "parking"],
    description: "Open-plan living with generous outdoor space for the whole family.",
  },
  {
    id: "sand-parks",
    name: "Sand Parks",
    sleeps: 4,
    bedrooms: 2,
    price: 160,
    image: "/images/cottages/sand-parks.webp",
    amenities: ["wifi", "parking", "fireplace"],
    description: "Cosy retreat just minutes from the North Cornwall coastline.",
  },
  {
    id: "trevelyan",
    name: "Trevelyan",
    sleeps: 4,
    bedrooms: 2,
    price: 170,
    image: "/images/cottages/trevelyan.webp",
    amenities: ["wifi", "parking", "dogs"],
    description: "Contemporary comforts wrapped in traditional Cornish stone.",
  },
];

/* ─── Amenity Icons ─── */
function AmenityIcon({ type }: { type: string }) {
  const iconClass = "h-4 w-4 text-on-surface-variant";
  switch (type) {
    case "wifi":
      return <Wifi className={iconClass} aria-label="WiFi" />;
    case "dogs":
      return <PawPrint className={iconClass} aria-label="Dog friendly" />;
    case "fireplace":
      return <Flame className={iconClass} aria-label="Wood burner" />;
    case "parking":
      return <Car className={iconClass} aria-label="Parking" />;
    default:
      return null;
  }
}

/* ─── Property Card ─── */
function PropertyCard({
  property,
  isSelected,
  onSelect,
  index,
}: {
  property: (typeof properties)[0];
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onSelect}
      className={`group cursor-pointer bg-surface-container-low flex flex-col transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-sage shadow-lg scale-[1.01]"
          : "hover:shadow-md hover:scale-[1.005]"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center bg-sage text-white"
          >
            <Check className="h-4 w-4" />
          </motion.div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="font-display text-h3 text-on-surface italic">
          {property.name}
        </h2>
        <p className="mt-2 text-body text-on-surface-variant line-clamp-2">
          {property.description}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex items-center gap-4 text-sm text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" />
            Sleeps {property.sleeps}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4" aria-hidden="true" />
            {property.bedrooms} bed
          </span>
        </div>

        {/* Amenities */}
        <div className="mt-3 flex items-center gap-2">
          {property.amenities.map((amenity) => (
            <span
              key={amenity}
              className="flex h-7 w-7 items-center justify-center bg-surface-container"
            >
              <AmenityIcon type={amenity} />
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="mt-auto pt-5 flex items-end justify-between">
          <div>
            <span className="font-display text-h2 text-on-surface">
              &pound;{property.price}
            </span>
            <span className="ml-1 text-sm text-on-surface-muted font-body">
              /night
            </span>
          </div>
          <Button
            variant={isSelected ? "secondary" : "primary"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function BookingSelectPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    beds: "all",
    guests: "all",
    sort: "price-asc",
  });

  /* Filter & sort logic */
  const filtered = properties
    .filter((p) => {
      if (filters.beds !== "all" && p.bedrooms < parseInt(filters.beds)) return false;
      if (filters.guests !== "all" && p.sleeps > parseInt(filters.guests)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "price-desc":
          return b.price - a.price;
        case "sleeps-desc":
          return b.sleeps - a.sleeps;
        default:
          return a.price - b.price;
      }
    });

  return (
    <article className="bg-background min-h-screen">
      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={2} />

        <p className="eyebrow text-on-surface-muted">Step 2 of 5</p>
        <h1 className="heading-editorial mt-4 text-on-surface max-w-3xl">
          Choose your property
        </h1>
        <p className="mt-5 max-w-2xl text-body-lg text-on-surface-variant">
          Browse available cottages for your selected dates. Select a property to continue.
        </p>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 pb-32 pt-10 lg:px-12">
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Results count */}
        <p className="mb-6 font-body text-sm text-on-surface-muted">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"} available
        </p>

        {/* Property Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSelected={selectedId === property.id}
              onSelect={() =>
                setSelectedId(selectedId === property.id ? null : property.id)
              }
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-display text-h3 text-on-surface-muted italic">
              No properties match your filters
            </p>
            <p className="mt-2 text-body text-on-surface-variant">
              Try adjusting your bedroom or guest requirements.
            </p>
          </div>
        )}

        {/* Bottom navigation */}
        <div className="mt-12 flex items-center justify-between border-t border-on-surface-muted/10 pt-8">
          <Link href="/stay/booking/dates">
            <Button variant="ghost" size="sm">
              &larr; Change dates
            </Button>
          </Link>

          <Link
            href="/stay/booking/add-ons"
            className={!selectedId ? "pointer-events-none opacity-40" : ""}
            aria-disabled={!selectedId}
          >
            <Button variant="primary" size="lg" disabled={!selectedId}>
              Continue to Add-ons &rarr;
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}
