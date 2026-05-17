"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Map,
  Trees,
  Fish,
  Sparkles,
  UtensilsCrossed,
  Dog,
  Baby,
  ChevronRight,
  Footprints,
} from "lucide-react"
import { BackButton } from "@/components/app-shell/back-button"

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
}

const features = [
  {
    icon: Trees,
    title: "Woodland Walks",
    subtitle: "12 miles of trails",
    href: "/estate/activities",
    color: "#166534",
  },
  {
    icon: Fish,
    title: "Three Lakes",
    subtitle: "Fishing & kayaking",
    href: "/estate/activities",
    color: "#2563eb",
  },
  {
    icon: Sparkles,
    title: "W Club Spa",
    subtitle: "Pool, thermal, treatments",
    href: "/spa",
    color: "#703a1d",
  },
  {
    icon: UtensilsCrossed,
    title: "The Weir",
    subtitle: "Estate-to-plate dining",
    href: "/dine",
    color: "#703a1d",
  },
  {
    icon: Dog,
    title: "Dog Friendly",
    subtitle: "Enclosed fields & wash stations",
    href: "/estate/dog-friendly",
    color: "#4a6457",
  },
  {
    icon: Baby,
    title: "Kids & Families",
    subtitle: "Farm feeding, nature trails",
    href: "/estate/activities",
    color: "#4a6457",
  },
]

const highlights = [
  {
    image: "/images/general/farm-animals.webp",
    title: "The Working Farm",
    description: "Rare-breed cattle, alpacas, goats and free-range poultry.",
    href: "/estate/farm",
  },
  {
    image: "/images/general/estate-view.webp",
    title: "Clifftop Views",
    description: "Paths that stretch to Lundy on clear days.",
    href: "/estate/activities",
  },
  {
    image: "/images/dog-friendly/dogs-on-estate.webp",
    title: "Dogs Welcome",
    description: "Every cottage welcomes dogs. Enclosed fields to roam.",
    href: "/estate/dog-friendly",
  },
]

const distances = [
  { place: "Widemouth Bay", distance: "1 mile", time: "15 min walk" },
  { place: "Bude Town", distance: "2 miles", time: "5 min drive" },
  { place: "Bude Canal", distance: "1.5 miles", time: "20 min walk" },
  { place: "Crackington Haven", distance: "6 miles", time: "12 min drive" },
]

export function EstateContent() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header with hero image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src="/images/general/estate-aerial.webp"
          alt="Aerial view of Whalesborough estate"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-14 left-4">
          <BackButton />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-body text-xs text-white/70">500 acres · North Cornwall</p>
          <h1 className="font-display text-2xl italic text-white">
            The Estate
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4 pt-5">
        {/* Interactive Map CTA */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <Link href="/estate/map" className="block">
            <div className="flex items-center gap-4 rounded-2xl bg-secondary/10 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/20">
                <Map className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-display text-base italic text-on-surface">
                  Interactive Map
                </p>
                <p className="font-body text-xs text-on-surface-muted">
                  Explore the estate with pins and walking times
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-secondary" />
            </div>
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="grid grid-cols-3 gap-3"
        >
          <div className="rounded-xl bg-surface-container-low p-3 text-center">
            <p className="font-display text-lg italic text-primary">500</p>
            <p className="font-body text-[10px] text-on-surface-muted">Acres</p>
          </div>
          <div className="rounded-xl bg-surface-container-low p-3 text-center">
            <p className="font-display text-lg italic text-primary">12</p>
            <p className="font-body text-[10px] text-on-surface-muted">Miles of trails</p>
          </div>
          <div className="rounded-xl bg-surface-container-low p-3 text-center">
            <p className="font-display text-lg italic text-primary">3</p>
            <p className="font-body text-[10px] text-on-surface-muted">Lakes</p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h2 className="font-display text-base italic text-on-surface mb-3">
            On the estate
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.title} href={feature.href}>
                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: feature.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-sm font-medium text-on-surface truncate">
                        {feature.title}
                      </p>
                      <p className="font-body text-[11px] text-on-surface-muted truncate">
                        {feature.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* Highlights Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h2 className="font-display text-base italic text-on-surface mb-3">
            Highlights
          </h2>
          <div className="relative -mx-4">
            <div className="flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory scrollbar-hide">
              {highlights.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex-shrink-0 snap-start w-[70%] max-w-[280px]"
                >
                  <div className="overflow-hidden rounded-xl bg-surface-container-low">
                    <div className="relative h-[140px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-display text-sm italic text-on-surface">
                        {item.title}
                      </p>
                      <p className="font-body text-xs text-on-surface-muted mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent" />
          </div>
        </motion.div>

        {/* Local Distances */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="rounded-2xl bg-surface-container-low p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Footprints className="h-4 w-4 text-secondary" />
            <h2 className="font-display text-base italic text-on-surface">
              Nearby
            </h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {distances.map((item) => (
              <div
                key={item.place}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-body text-sm text-on-surface">
                    {item.place}
                  </p>
                  <p className="font-body text-xs text-on-surface-muted">
                    {item.time}
                  </p>
                </div>
                <span className="font-body text-xs font-medium text-primary">
                  {item.distance}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About Estate */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="rounded-2xl bg-surface-container-low p-4"
        >
          <h2 className="font-display text-base italic text-on-surface mb-2">
            About the estate
          </h2>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Whalesborough sits high on the North Cornwall coast, a mile inland
            from Widemouth Bay. The land has been farmed for generations and
            opened to guests for over fifty years.
          </p>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed mt-2">
            Between heritage cottages, contemporary suites, three lakes,
            rare-breed livestock and twelve miles of walking trails — this is a
            landscape you are invited to inhabit.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
