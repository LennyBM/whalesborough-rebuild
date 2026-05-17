import type { Metadata } from "next";
import Image from "next/image";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Heritage Cottages | 5★ Gold Dog-Friendly Cottages, Bude Cornwall",
  description:
    "Twenty-seven individually designed cottages across 500 acres. Grade II listed farmhouse, private hot tubs, enclosed gardens, all dog-friendly. VisitEngland 5-Star Gold.",
};

interface Cottage {
  name: string;
  slug: string;
  image: string;
  sleeps: number;
  bedrooms: number;
  features: string[];
  price: number;
}

const cottages: Cottage[] = [
  { name: "The Farmhouse", slug: "the-farmhouse", image: "/images/cottages/the-farmhouse.webp", sleeps: 12, bedrooms: 5, features: ["Log fire", "Games room", "Garden"], price: 320 },
  { name: "Eagles Nest", slug: "eagles-nest", image: "/images/cottages/eagles-nest.webp", sleeps: 6, bedrooms: 3, features: ["Sea views", "Hot tub"], price: 195 },
  { name: "Trelowen", slug: "trelowen", image: "/images/cottages/trelowen.webp", sleeps: 4, bedrooms: 2, features: ["Open fire", "Dog friendly"], price: 165 },
  { name: "Trevelyan", slug: "trevelyan", image: "/images/cottages/trevelyan.webp", sleeps: 4, bedrooms: 2, features: ["Courtyard", "Dog friendly"], price: 170 },
  { name: "Nettlecoombe", slug: "nettlecoombe", image: "/images/cottages/nettlecoombe.webp", sleeps: 6, bedrooms: 3, features: ["Hot tub", "Garden"], price: 185 },
  { name: "Barley Park", slug: "barley-park", image: "/images/cottages/barley-park.webp", sleeps: 5, bedrooms: 2, features: ["Garden", "Parking"], price: 175 },
  { name: "Sand Parks", slug: "sand-parks", image: "/images/cottages/sand-parks.webp", sleeps: 4, bedrooms: 2, features: ["Sea views", "Coastal"], price: 160 },
  { name: "Medlands", slug: "medlands", image: "/images/cottages/medlands.webp", sleeps: 4, bedrooms: 2, features: ["Wood burner", "Dog friendly"], price: 155 },
  { name: "Moleyns", slug: "moleyns", image: "/images/cottages/moleyns.webp", sleeps: 4, bedrooms: 2, features: ["Cosy", "Dog friendly"], price: 155 },
  { name: "Beachcombers", slug: "beachcombers", image: "/images/cottages/beachcombers.webp", sleeps: 6, bedrooms: 3, features: ["Open plan", "Garden"], price: 190 },
  { name: "Chapel Park", slug: "chapel-park", image: "/images/cottages/chapel-park.webp", sleeps: 4, bedrooms: 2, features: ["Character", "Beams"], price: 160 },
  { name: "Jack’s House", slug: "jacks-house", image: "/images/cottages/jacks-house.webp", sleeps: 4, bedrooms: 2, features: ["Hot tub", "Private"], price: 175 },
  { name: "Long Down", slug: "long-down", image: "/images/cottages/long-down.webp", sleeps: 6, bedrooms: 3, features: ["Hot tub", "Valley views"], price: 210 },
  { name: "Westcotts", slug: "westcotts", image: "/images/cottages/westcotts.webp", sleeps: 6, bedrooms: 3, features: ["Family", "Garden"], price: 185 },
  { name: "Warrens", slug: "warrens", image: "/images/cottages/warrens.webp", sleeps: 4, bedrooms: 2, features: ["Dog friendly", "Cosy"], price: 155 },
  { name: "Middle Hill", slug: "middle-hill", image: "/images/cottages/middle-hill.webp", sleeps: 4, bedrooms: 2, features: ["Views", "Peaceful"], price: 160 },
  { name: "Little Main", slug: "little-main", image: "/images/cottages/little-main.webp", sleeps: 2, bedrooms: 1, features: ["Romantic", "Compact"], price: 155 },
  { name: "Windy Hills", slug: "windy-hills", image: "/images/cottages/windy-hills.webp", sleeps: 6, bedrooms: 3, features: ["Hot tub", "Clifftop"], price: 215 },
  { name: "Woodyplatt", slug: "woodyplatt", image: "/images/cottages/woodyplatt.webp", sleeps: 4, bedrooms: 2, features: ["Woodland", "Quiet"], price: 165 },
  { name: "Calf House", slug: "calf-house", image: "/images/cottages/calf-house.webp", sleeps: 4, bedrooms: 2, features: ["Vaulted ceiling", "Barn conversion"], price: 170 },
  { name: "Venners", slug: "venners", image: "/images/cottages/venners.webp", sleeps: 4, bedrooms: 2, features: ["Dog friendly", "Garden"], price: 160 },
  { name: "Arundell", slug: "arundell", image: "/images/cottages/arundell.webp", sleeps: 4, bedrooms: 2, features: ["Historic", "Stone walls"], price: 165 },
  { name: "Whalesborough Cottage", slug: "whalesborough-cottage", image: "/images/cottages/whalesborough-cottage.webp", sleeps: 6, bedrooms: 3, features: ["Hot tub", "South-facing"], price: 205 },
  { name: "Sheep’s House", slug: "sheeps-house", image: "/images/cottages/sheeps-house.webp", sleeps: 4, bedrooms: 2, features: ["Hot tub", "Meadow views"], price: 180 },
  { name: "Gwari Spa Barn", slug: "gwari-spa-barn", image: "/images/cottages/gwari-spa-barn.webp", sleeps: 8, bedrooms: 4, features: ["Spa bath", "Barn conversion"], price: 260 },
];

export default function CottagesPage() {
  return (
    <>
      {/* Editorial Header */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            Accommodation
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Heritage <span className="italic">Cottages</span>
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Twenty-seven cottages converted from farm buildings dating back to
            the 14th century. Stone barns, slate roofs and centuries of character
            — each one individually restored and set within five hundred acres of
            private Cornish estate.
          </p>
        </div>
      </section>

      {/* Key Info Bar */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            <div>
              <p className="heading-editorial text-h3 text-on-surface">27</p>
              <p className="text-body-sm text-on-surface-muted">Properties</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-on-surface/10" />
            <div>
              <p className="heading-editorial text-h3 text-on-surface">2–12</p>
              <p className="text-body-sm text-on-surface-muted">Sleeps</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-on-surface/10" />
            <div>
              <p className="heading-editorial text-h3 text-on-surface">£155</p>
              <p className="text-body-sm text-on-surface-muted">From / night</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-on-surface/10" />
            <div>
              <p className="heading-editorial text-h3 text-on-surface">Dogs</p>
              <p className="text-body-sm text-on-surface-muted">Welcome on most</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cottage Grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {cottages.map((cottage) => (
              <CottageCard key={cottage.slug} cottage={cottage} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <p className="eyebrow text-on-surface-muted">Ready to book?</p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
            Find your <span className="italic">perfect week</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-body text-on-surface-variant">
            Friday and Monday arrivals, with seven-night stays the most popular
            rhythm. Browse the full collection and secure your preferred dates.
          </p>
          <div className="mt-10 flex justify-center">
            <LinkArrow href="/stay/booking/dates">
              Check availability
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function CottageCard({ cottage }: { cottage: Cottage }) {
  return (
    <div className="group">
      <div className="aspect-[4/3] relative overflow-hidden bg-surface-container-low">
        <Image
          src={cottage.image}
          alt={cottage.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h3 className="heading-editorial mt-5 text-h3 text-on-surface">
        {cottage.name}
      </h3>
      <p className="mt-1.5 text-body-sm text-on-surface-muted">
        Sleeps {cottage.sleeps} · {cottage.bedrooms} {cottage.bedrooms === 1 ? "bedroom" : "bedrooms"}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {cottage.features.map((feature) => (
          <span
            key={feature}
            className="text-body-sm text-on-surface-variant"
          >
            {feature}
          </span>
        ))}
      </div>
      <p className="mt-3 text-body font-medium text-on-surface">
        From £{cottage.price}/night
      </p>
    </div>
  );
}
