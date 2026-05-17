"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

/* ─── Property Data ─── */

interface Property {
  name: string;
  slug: string;
  image: string;
  priceFrom: number;
  sleeps: number;
  features: string[];
}

const heritageCottages: Property[] = [
  {
    name: "The Farmhouse",
    slug: "the-farmhouse",
    image: "/images/cottages/the-farmhouse.webp",
    priceFrom: 350,
    sleeps: 12,
    features: ["Hot tub", "5 bedrooms", "Enclosed garden"],
  },
  {
    name: "Eagles Nest",
    slug: "eagles-nest",
    image: "/images/cottages/eagles-nest.webp",
    priceFrom: 220,
    sleeps: 6,
    features: ["Sea views", "3 bedrooms", "Dog-friendly"],
  },
  {
    name: "Trelowen",
    slug: "trelowen",
    image: "/images/cottages/trelowen.webp",
    priceFrom: 150,
    sleeps: 4,
    features: ["Hot tub", "2 bedrooms", "Lake views"],
  },
  {
    name: "Trevelyan",
    slug: "trevelyan",
    image: "/images/cottages/trevelyan.webp",
    priceFrom: 180,
    sleeps: 4,
    features: ["Period features", "2 bedrooms", "Enclosed garden"],
  },
  {
    name: "Nettlecoombe",
    slug: "nettlecoombe",
    image: "/images/cottages/nettlecoombe.webp",
    priceFrom: 200,
    sleeps: 6,
    features: ["Woodland setting", "3 bedrooms", "Log burner"],
  },
  {
    name: "Barley Park",
    slug: "barley-park",
    image: "/images/cottages/barley-park.webp",
    priceFrom: 175,
    sleeps: 5,
    features: ["Hot tub", "3 bedrooms", "Rural views"],
  },
];

const arvorSuites: Property[] = [
  {
    name: "Arvor Suite",
    slug: "arvor-suite",
    image: "/images/arvor/arvor-exterior.webp",
    priceFrom: 150,
    sleeps: 2,
    features: ["Open-plan", "Spa access", "Lake views"],
  },
];

const spaLodges: Property[] = [
  {
    name: "Gwari Spa Barn",
    slug: "gwari-spa-barn",
    image: "/images/spa/spa-barn-full.webp",
    priceFrom: 400,
    sleeps: 6,
    features: ["Private hot tub", "3 bedrooms", "Direct spa access"],
  },
];

/* ─── Animation Variants ─── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ─── Property Card ─── */

function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.div variants={cardVariants} className="group">
      <Link href={`/stay/cottages/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={property.name}
            width={640}
            height={480}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-h3 italic text-on-surface group-hover:text-primary transition-colors duration-200">
              {property.name}
            </h3>
            <p className="font-body text-body-sm text-on-surface-muted">
              from £{property.priceFrom}/night
            </p>
          </div>
          <p className="mt-1 font-body text-body-sm text-on-surface-variant">
            Sleeps {property.sleeps}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {property.features.map((feature) => (
              <span
                key={feature}
                className="font-body text-body-sm text-on-surface-muted"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Category Section ─── */

function CategorySection({
  eyebrow,
  title,
  subtitle,
  properties,
  columns = 3,
  href,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  properties: Property[];
  columns?: 1 | 2 | 3;
  href: string;
  ctaLabel: string;
}) {
  const gridCols =
    columns === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1";

  return (
    <div>
      <p className="eyebrow text-on-surface-muted">{eyebrow}</p>
      <h2 className="heading-editorial mt-4 text-h1 text-on-surface">{title}</h2>
      <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
        {subtitle}
      </p>
      <motion.div
        className={`mt-12 grid ${gridCols} gap-8 lg:gap-10`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {properties.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </motion.div>
      <div className="mt-10">
        <LinkArrow href={href}>{ctaLabel}</LinkArrow>
      </div>
    </div>
  );
}

/* ─── Exported Grid Component ─── */

export default function AccommodationGrid() {
  return (
    <>
      {/* Heritage Cottages */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <CategorySection
            eyebrow="27 properties · from £150/night"
            title="Heritage Cottages"
            subtitle="Grade II farmhouses, stone barns and coastal retreats — each individually designed with enclosed gardens and luxury interiors. Seven with private hot tubs."
            properties={heritageCottages}
            columns={3}
            href="/stay/cottages"
            ctaLabel="View all 27 cottages"
          />
        </div>
      </section>

      {/* Arvor Suites */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <CategorySection
            eyebrow="22 suites · from £150/night"
            title="Arvor Suites"
            subtitle="Contemporary open-plan suites with floor-to-ceiling glazing, overlooking the estate lakes. Ideal for couples seeking spa access and low-maintenance luxury."
            properties={arvorSuites}
            columns={1}
            href="/stay/arvor-suites"
            ctaLabel="Explore the Arvor"
          />
        </div>
      </section>

      {/* Spa Lodges */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <CategorySection
            eyebrow="2 properties · from £400/night"
            title="Spa Lodges"
            subtitle="Architect-designed lodges with private hot tubs, underfloor heating and direct spa access. Two and three-bedroom layouts for families and groups."
            properties={spaLodges}
            columns={1}
            href="/stay/spa-lodges"
            ctaLabel="Discover the spa lodges"
          />
        </div>
      </section>
    </>
  );
}
