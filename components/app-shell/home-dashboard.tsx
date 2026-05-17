"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BedDouble,
  Sparkles,
  UtensilsCrossed,
  Map,
  Bell,
  Calendar,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { properties as allProperties } from "@/lib/data/properties"
import { AnimatedNumber } from "@/components/ui/animated-number"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

const quickActions = [
  { label: "Book a Stay", icon: BedDouble, href: "/stay/booking/dates" },
  { label: "The W Club", icon: Sparkles, href: "/spa" },
  { label: "The Weir", icon: UtensilsCrossed, href: "/dine" },
  { label: "Explore Estate", icon: Map, href: "/estate" },
]

const properties = allProperties.slice(0, 5)

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
}

const notifications = [
  { id: 1, icon: Calendar, text: "Your booking is in 26 days", color: "text-primary" },
  { id: 2, icon: Sparkles, text: "New: Summer spa packages available", color: "text-secondary" },
  { id: 3, icon: UtensilsCrossed, text: "The Weir: Book Sunday lunch", color: "text-primary" },
]

export function HomeDashboard() {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Pull-down hint */}
      <motion.div
        className="flex justify-center pt-10 pb-0"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <ChevronDown className="h-4 w-4 text-on-surface-muted animate-bounce" />
      </motion.div>

      {/* Header */}
      <header className="relative flex items-center justify-between px-4 pt-4 pb-4">
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
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-container"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-on-surface-variant" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* Notification dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-4 z-50 w-[calc(100%-2rem)] max-w-sm mt-1"
            >
              <div className="bg-surface-container rounded-2xl shadow-lg border border-black/5 overflow-hidden">
                <div className="px-4 py-3 border-b border-black/5">
                  <p className="font-body text-xs font-semibold text-on-surface-muted uppercase tracking-wide">
                    Notifications
                  </p>
                </div>
                <ul className="divide-y divide-black/5">
                  {notifications.map((n) => (
                    <li key={n.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <n.icon className={`h-4 w-4 ${n.color}`} />
                      </div>
                      <p className="font-body text-sm text-on-surface">{n.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex flex-col gap-5 px-4">
        {/* Quick Book Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
                    From <AnimatedNumber value={155} prefix="£" suffix="/night" /> · 30+ properties
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
          whileTap={{ scale: 0.98 }}
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

        {/* Weather at Whalesborough */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="rounded-2xl bg-surface-container-low p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-secondary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <span className="eyebrow text-secondary">Weather · Bude Coast</span>
            </div>
            <span className="font-body text-xs text-on-surface-muted">Now</span>
          </div>

          {/* Current conditions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="Partly cloudy">
                ⛅
              </span>
              <div>
                <p className="font-display text-2xl italic text-on-surface">
                  16°C
                </p>
                <p className="font-body text-xs text-on-surface-muted">
                  Partly cloudy · Light breeze
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-body text-xs text-on-surface-muted">
                Feels like 14°C
              </p>
              <p className="font-body text-xs text-on-surface-muted">
                Wind: 12 mph SW
              </p>
            </div>
          </div>

          {/* Perfect for suggestion */}
          <div className="rounded-xl bg-surface-container p-3 mb-4">
            <p className="font-body text-xs font-medium text-secondary mb-0.5">
              Perfect for
            </p>
            <p className="font-body text-sm text-on-surface">
              A coastal walk along the cliffs — mild with clearing skies this afternoon
            </p>
          </div>

          {/* 3-day forecast */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center gap-1 rounded-xl bg-surface-container p-2.5">
              <span className="font-body text-[11px] text-on-surface-muted">
                Tomorrow
              </span>
              <span className="text-lg" role="img" aria-label="Sunny">
                ☀️
              </span>
              <span className="font-body text-sm font-medium text-on-surface">
                18°C
              </span>
              <span className="font-body text-[10px] text-on-surface-muted">
                Beach day
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-surface-container p-2.5">
              <span className="font-body text-[11px] text-on-surface-muted">
                Thursday
              </span>
              <span className="text-lg" role="img" aria-label="Cloudy">
                🌥️
              </span>
              <span className="font-body text-sm font-medium text-on-surface">
                15°C
              </span>
              <span className="font-body text-[10px] text-on-surface-muted">
                Spa day
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-surface-container p-2.5">
              <span className="font-body text-[11px] text-on-surface-muted">
                Friday
              </span>
              <span className="text-lg" role="img" aria-label="Light rain">
                🌦️
              </span>
              <span className="font-body text-sm font-medium text-on-surface">
                14°C
              </span>
              <span className="font-body text-[10px] text-on-surface-muted">
                Cosy pub lunch
              </span>
            </div>
          </div>
        </motion.div>

        {/* Property Highlights */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
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
          <div className="relative -mx-4">
            <div className="flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory scrollbar-hide">
              {properties.map((property) => (
                <motion.div
                  key={property.name}
                  whileTap={{ scale: 0.98 }}
                  className="flex-shrink-0 snap-start"
                >
                  <Link
                    href="/stay"
                    className="block"
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
                </motion.div>
              ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent" />
          </div>
        </motion.div>

        {/* Upcoming */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          whileTap={{ scale: 0.98 }}
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
