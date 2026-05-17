"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { LinkArrow } from "@/components/ui/button";

/* ─── Animation variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Data ─── */

const estateFeatures = [
  {
    title: "The Working Farm",
    description: "Rare-breed cattle, goats, sheep and free-range poultry across rolling pasture.",
    image: "/images/general/farm-animals.webp",
    href: "/estate/farm",
  },
  {
    title: "Walks & Trails",
    description: "Woodland loops, clifftop paths and lakeside strolls — up to 12 miles on the estate alone.",
    image: "/images/general/estate-view.webp",
    href: "/estate/map",
  },
  {
    title: "Three Lakes",
    description: "Coarse fishing, kayaking or simply sitting with a flask watching the moorhens.",
    image: "/images/general/outdoor-pool.webp",
    href: "/estate/activities",
  },
  {
    title: "Dog-Friendly",
    description: "Enclosed fields, wash stations, welcome packs. Every cottage and suite welcomes dogs.",
    image: "/images/dog-friendly/dogs-on-estate.webp",
    href: "/estate/dog-friendly",
  },
  {
    title: "Kids & Families",
    description: "Animal feeding, nature trails, seasonal crafts. Little Farmers sessions twice weekly.",
    image: "/images/general/kids-activities.webp",
    href: "/estate/activities",
  },
  {
    title: "The W Club Spa",
    description: "Indoor pool, thermal suite, treatment rooms. Cornish botanicals and Atlantic views.",
    image: "/images/general/outdoor-pool.webp",
    href: "/spa",
  },
  {
    title: "The Weir Restaurant",
    description: "Estate-to-plate dining overlooking the lakes. Seasonal menus, local wines.",
    image: "/images/general/front-garden.webp",
    href: "/dine",
  },
];

const localDistances = [
  { place: "Widemouth Bay", distance: "1 mile", note: "Surfing, rock pools, sand" },
  { place: "Bude town centre", distance: "2 miles", note: "Harbour, canal, shops" },
  { place: "Bude Canal", distance: "1.5 miles", note: "Flat walking, wildlife" },
  { place: "Summerleaze Beach", distance: "2.5 miles", note: "Sea pool, lifeguards" },
  { place: "Crackington Haven", distance: "6 miles", note: "Dramatic cliffs, National Trust" },
  { place: "Tintagel Castle", distance: "18 miles", note: "Arthurian legend, coastal drama" },
  { place: "Boscastle", distance: "14 miles", note: "Harbour village, witchcraft museum" },
  { place: "Padstow", distance: "28 miles", note: "Rick Stein, Camel Trail" },
];

/* ─── Component ─── */

export function EstateContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative h-[90vh] min-h-[640px] w-full overflow-hidden">
        <Image
          src="/images/general/estate-aerial.webp"
          alt="Aerial view of Whalesborough estate — 500 acres above Widemouth Bay"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-hero px-6 pb-16 lg:px-12 lg:pb-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="eyebrow text-white/80"
            >
              The Estate · North Cornwall
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="heading-editorial mt-5 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-white"
            >
              Five hundred acres <span className="italic">above the Atlantic</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-6 max-w-xl text-body-lg text-white/90"
            >
              A working estate where pasture rolls to clifftop, lakes mirror the sky, and every path leads somewhere worth finding.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── Editorial Introduction ─── */}
      <section className="bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-36"
        >
          <motion.p variants={fadeUp} custom={0} className="eyebrow text-on-surface-muted">
            Since 1972
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="heading-editorial mt-5 text-h1 md:text-display-md text-on-surface max-w-4xl"
          >
            Whalesborough sits high on the North Cornwall coast, a mile inland from Widemouth Bay. The land has been farmed for generations — and opened to guests for over fifty years.
          </motion.h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.p variants={fadeUp} custom={2} className="text-body-lg text-on-surface-variant max-w-lg">
              Twenty-seven heritage cottages sit among stone barns and courtyards. Twenty-two contemporary Arvor Suites overlook the lakes. The W Club Spa offers thermal journeys and Cornish botanical treatments. The Weir Restaurant serves what the estate grows.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-body-lg text-on-surface-variant max-w-lg">
              Between them: three fishing lakes, rare-breed livestock, twelve miles of walking trails, clifftop views that stretch to Lundy, and the kind of silence you forgot existed. This is not a holiday park. It is a landscape you are invited to inhabit.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ─── Estate Features Grid ─── */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-24 lg:px-12 lg:py-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} custom={0} className="eyebrow text-on-surface-muted">
              On the estate
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="heading-editorial mt-5 text-h1 md:text-display-md text-on-surface max-w-3xl"
            >
              Everything within walking distance
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {estateFeatures.map((feature, i) => (
              <motion.div key={feature.title} variants={fadeUp} custom={i}>
                <Link href={feature.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-5 text-h3 font-display text-on-surface group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-body text-on-surface-variant">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Landscape Break ─── */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/general/estate-rooftops-view.webp"
          alt="Whalesborough estate rooftops with rolling countryside beyond"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto w-full max-w-hero px-6 pb-12 lg:px-12 lg:pb-20"
          >
            <p className="heading-editorial text-display-md md:text-display-lg text-white italic">
              Quiet enough to hear the sea.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Local Area ─── */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} custom={0} className="eyebrow text-on-surface-muted">
              Local area
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="heading-editorial mt-5 text-h1 md:text-display-md text-on-surface max-w-3xl"
            >
              Bude, beaches and beyond
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-2xl text-body-lg text-on-surface-variant"
            >
              The estate sits between Bude and Widemouth Bay on the North Cornwall coast. The South West Coast Path passes within a mile. Surf beaches, harbour towns and dramatic headlands are all within easy reach.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="mt-14 grid grid-cols-1 gap-px bg-on-surface/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {localDistances.map((item, i) => (
              <motion.div
                key={item.place}
                variants={fadeUp}
                custom={i}
                className="bg-background p-6 lg:p-8"
              >
                <p className="text-h3 font-display text-on-surface">{item.place}</p>
                <p className="mt-2 text-body-lg text-primary font-medium">{item.distance}</p>
                <p className="mt-1 text-body text-on-surface-muted">{item.note}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            <LinkArrow href="/estate/local-area">Explore the local area</LinkArrow>
            <LinkArrow href="/estate/dog-friendly">Dog-friendly guide</LinkArrow>
          </motion.div>
        </div>
      </section>

      {/* ─── Beach Image + CTA ─── */}
      <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src="/images/dog-friendly/bude-beach-dog-walk.webp"
          alt="Dog walking on the beach near Bude, Cornwall"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto w-full max-w-hero px-6 pb-14 lg:px-12 lg:pb-24"
          >
            <p className="eyebrow text-white/80">Widemouth Bay · 1 mile</p>
            <h2 className="heading-editorial mt-4 text-display-md md:text-display-lg text-white max-w-2xl">
              The beach is <span className="italic">always</span> close.
            </h2>
            <div className="mt-8">
              <LinkArrow href="/estate/local-area">
                Distances & directions
              </LinkArrow>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
