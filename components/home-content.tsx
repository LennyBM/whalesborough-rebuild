"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { LinkArrow } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const entryPoints = [
  {
    href: "/stay",
    eyebrow: "01 — Accommodation",
    title: "Stay",
    description:
      "Twenty-seven cottages, twenty-two Arvor Suites and a pair of spa lodges. Slow returns, sea air, dogs welcome on most properties.",
    image: "/images/general/cottages-exterior.webp",
  },
  {
    href: "/spa",
    eyebrow: "02 — Wellness",
    title: "The W Club",
    description:
      "A spa shaped by the estate. Rituals drawn from Cornish botanicals, an indoor pool, and a gym overlooking the lakes.",
    image: "/images/spa/pool.webp",
  },
  {
    href: "/dine",
    eyebrow: "03 — Restaurant",
    title: "The Weir",
    description:
      "Cornish suppliers, open fires, an estate that grows much of what arrives on the plate. Breakfast through to long lunches.",
    image: "/images/restaurant/weir-restaurant-exterior.webp",
  },
  {
    href: "/own",
    eyebrow: "04 — Ownership",
    title: "Own a lodge",
    description:
      "A small number of architect-designed lodges across three collections. Lifestyle purchases with rental income potential.",
    image: "/images/general/estate-aerial.webp",
  },
];

export function HomeContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-background">
        <Image
          src="/images/hero/cottages-hero.webp"
          alt="Whalesborough estate cottages overlooking the Cornish coastline"
          width={2400}
          height={1350}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto w-full max-w-content px-6 pb-16 lg:px-12 lg:pb-24"
          >
            <motion.p
              variants={fadeUp}
              className="eyebrow text-white/70"
            >
              A working estate · Bude, Cornwall
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="heading-editorial mt-6 max-w-4xl text-display-md text-white md:text-display-lg lg:text-display-xl"
            >
              Five hundred acres of{" "}
              <span className="italic">quiet grandeur</span>.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-body-lg text-white/80"
            >
              Holiday cottages, wellness, estate dining and a small number
              of lodges to call your own — on the clifftops above Widemouth Bay.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10">
              <LinkArrow href="/stay">Begin your stay</LinkArrow>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Entry Points ─── */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-24 lg:px-12 lg:py-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-x-12 gap-y-20 lg:grid-cols-12"
          >
            {/* Stay — large, top-left */}
            <motion.div variants={fadeUp} className="lg:col-span-7 lg:row-span-2">
              <EntryCard item={entryPoints[0]} aspect="aspect-[4/5]" />
            </motion.div>

            {/* Spa — top-right, offset down */}
            <motion.div variants={fadeUp} className="lg:col-span-5 lg:col-start-8 lg:mt-32">
              <EntryCard item={entryPoints[1]} aspect="aspect-[3/2]" />
            </motion.div>

            {/* Dine — bottom-right */}
            <motion.div variants={fadeUp} className="lg:col-span-5 lg:col-start-8">
              <EntryCard item={entryPoints[2]} aspect="aspect-[3/2]" />
            </motion.div>

            {/* Own — full-width */}
            <motion.div variants={fadeUp} className="lg:col-span-12 lg:mt-16">
              <EntryCardWide item={entryPoints[3]} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Award Strip ─── */}
      <section className="bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="mx-auto max-w-content px-6 py-20 lg:px-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
            {[
              "5★ Gold — VisitEngland",
              "NPS 83.3 — Cornwall #1",
              "Feefo 4.5 / 5",
              "500 acres · 30+ units",
            ].map((award) => (
              <motion.p
                key={award}
                variants={fadeUp}
                className="eyebrow text-on-surface-muted"
              >
                {award}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}

/* ─── Entry Card (default) ─── */
function EntryCard({
  item,
  aspect,
}: {
  item: (typeof entryPoints)[number];
  aspect: string;
}) {
  return (
    <Link
      href={item.href}
      className="group block"
      aria-label={`Explore ${item.title}`}
    >
      <div className={`${aspect} relative overflow-hidden`}>
        <Image
          src={item.image}
          alt={item.title}
          width={1200}
          height={800}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-8">
        <p className="eyebrow text-on-surface-muted">{item.eyebrow}</p>
        <h2 className="heading-editorial mt-3 text-h1 text-on-surface transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h2>
        <p className="mt-4 max-w-md text-body text-on-surface-variant">
          {item.description}
        </p>
        <div className="mt-6">
          <LinkArrow href={item.href}>Explore {item.title}</LinkArrow>
        </div>
      </div>
    </Link>
  );
}

/* ─── Entry Card (wide variant for "Own") ─── */
function EntryCardWide({ item }: { item: (typeof entryPoints)[number] }) {
  return (
    <Link
      href={item.href}
      className="group block"
      aria-label={`Explore ${item.title}`}
    >
      <div className="aspect-[16/7] relative overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={2400}
          height={1050}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-on-surface-muted">{item.eyebrow}</p>
          <h2 className="heading-editorial mt-3 text-h1 text-on-surface transition-colors duration-300 group-hover:text-primary">
            {item.title}
          </h2>
        </div>
        <div className="lg:col-span-6 lg:pt-8">
          <p className="max-w-md text-body text-on-surface-variant">
            {item.description}
          </p>
          <div className="mt-6">
            <LinkArrow href={item.href}>Explore {item.title}</LinkArrow>
          </div>
        </div>
      </div>
    </Link>
  );
}
