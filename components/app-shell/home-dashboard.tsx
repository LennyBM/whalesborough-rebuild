"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BedDouble,
  Sparkles,
  UtensilsCrossed,
  Map,
  Bell,
  Calendar,
  ChevronRight,
} from "lucide-react"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

const quickActions = [
  { label: "Book a Stay", icon: BedDouble, href: "/stay/booking/dates" },
  { label: "Spa & Wellness", icon: Sparkles, href: "/spa" },
  { label: "Reserve a Table", icon: UtensilsCrossed, href: "/dine/reserve" },
  { label: "Explore Estate", icon: Map, href: "/estate" },
]

const properties = [
  { name: "The Farmhouse", image: "/images/properties/the-farmhouse.webp", sleeps: 10, price: 295 },
  { name: "Eagle's Nest", image: "/images/properties/eagles-nest.webp", sleeps: 6, price: 225 },
  { name: "Trelowen", image: "/images/properties/trelowen.webp", sleeps: 4, price: 175 },
  { name: "Nettlecoombe", image: "/images/properties/nettlecoombe.webp", sleeps: 2, price: 155 },
  { name: "Gwari Spa Barn", image: "/images/properties/gwari-spa-barn.webp", sleeps: 8, price: 265 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
}

export function HomeDashboard() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/whalesborough-logo.png"
            alt="Whalesborough"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <p className="font-body text-xs text-on-surface-muted">Whalesborough</p>
            <h1 className="font-display text-xl italic text-on-surface">
              {getGreeting()}
            </h1>
          </div>
        </div>
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-container"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-on-surface-variant" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </button>
      </header>

      <div className="flex flex-col gap-5 px-4">
        {/* Quick Book Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link href="/stay/booking/dates" className="block">
            <div className="relative h-40 overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/cottages-hero.webp"
                alt="Whalesborough cottages"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-lg italic text-white">
                  Plan your escape
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-body text-xs text-white/80">
                    From £155/night · 30+ properties
                  </span>
                  <span className="rounded-full bg-primary px-4 py-1.5 font-body text-xs font-semibold text-white">
                    Book now
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="grid grid-cols-4 gap-3"
        >
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container">
                <action.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-body text-[11px] leading-tight text-on-surface-muted text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </motion.div>

        {/* What's On Today */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="rounded-2xl bg-surface-container-low p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-secondary" />
            <span className="eyebrow text-secondary">What&apos;s on today</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-body text-sm text-on-surface">
              The Weir: Lunch 12&ndash;3pm
            </p>
            <p className="font-body text-sm text-on-surface">
              Pool: Open until 8pm
            </p>
            <p className="font-body text-sm text-on-surface">
              Farm feeding: 3:30pm
            </p>
          </div>
        </motion.div>

        {/* Property Highlights */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-base italic text-on-surface">
              Properties
            </h2>
            <Link
              href="/stay"
              className="flex items-center gap-0.5 font-body text-xs text-primary"
            >
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory scrollbar-hide">
            {properties.map((property) => (
              <Link
                key={property.name}
                href="/stay"
                className="flex-shrink-0 snap-start"
              >
                <div className="w-[180px] overflow-hidden rounded-xl bg-surface-container-low">
                  <div className="relative h-[120px]">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="font-body text-sm font-medium text-on-surface truncate">
                      {property.name}
                    </p>
                    <p className="font-body text-xs text-on-surface-muted">
                      Sleeps {property.sleeps} · from £{property.price}/night
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Upcoming */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="rounded-2xl bg-surface-container-low p-4"
        >
          <h2 className="font-display text-base italic text-on-surface mb-3">
            Upcoming
          </h2>
          <div className="flex items-center gap-3 rounded-xl bg-surface-container p-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BedDouble className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-medium text-on-surface">
                The Farmhouse
              </p>
              <p className="font-body text-xs text-on-surface-muted">
                12&ndash;16 Jul 2026 · 4 nights
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-on-surface-muted flex-shrink-0" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
