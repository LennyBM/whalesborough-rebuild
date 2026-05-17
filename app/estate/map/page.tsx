"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Waves,
  Trees,
  UtensilsCrossed,
  Sparkles,
  Home,
  Fish,
  Dog,
  Car,
  X,
  Navigation,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { BackButton } from "@/components/app-shell/back-button"

/* ─── Map Locations ─── */

interface MapLocation {
  id: string
  name: string
  icon: React.ElementType
  x: number // percentage from left
  y: number // percentage from top
  color: string
  walk: string
  description: string
  href: string
  category: string
}

const locations: MapLocation[] = [
  {
    id: "reception",
    name: "Reception",
    icon: Home,
    x: 48,
    y: 45,
    color: "#703a1d",
    walk: "Start here",
    description: "Check-in, concierge, key collection and local tips.",
    href: "/my-stay",
    category: "facilities",
  },
  {
    id: "spa",
    name: "The W Club Spa",
    icon: Sparkles,
    x: 62,
    y: 35,
    color: "#4a6457",
    walk: "5 min from reception",
    description: "Indoor pool, thermal suite, treatment rooms, gym.",
    href: "/spa",
    category: "facilities",
  },
  {
    id: "restaurant",
    name: "The Weir",
    icon: UtensilsCrossed,
    x: 40,
    y: 38,
    color: "#703a1d",
    walk: "3 min from reception",
    description: "Estate-to-plate dining. Breakfast, lunch & dinner.",
    href: "/dine",
    category: "facilities",
  },
  {
    id: "lake",
    name: "Fishing Lake",
    icon: Fish,
    x: 72,
    y: 55,
    color: "#2563eb",
    walk: "8 min from reception",
    description: "Stocked lake. Rod hire at reception. Catch & release.",
    href: "/estate/activities",
    category: "nature",
  },
  {
    id: "farm",
    name: "Farm & Animals",
    icon: Dog,
    x: 30,
    y: 55,
    color: "#4a6457",
    walk: "4 min from reception",
    description: "Alpacas, goats, pigs, chickens, donkeys and ducks.",
    href: "/estate/farm",
    category: "nature",
  },
  {
    id: "woodland",
    name: "Woodland Trails",
    icon: Trees,
    x: 22,
    y: 30,
    color: "#166534",
    walk: "10 min to trailhead",
    description: "50 acres of native woodland with marked routes.",
    href: "/estate/activities",
    category: "nature",
  },
  {
    id: "cottages",
    name: "Heritage Cottages",
    icon: Home,
    x: 55,
    y: 58,
    color: "#703a1d",
    walk: "2-8 min from reception",
    description: "27 stone cottages set among barns and courtyards.",
    href: "/stay/cottages",
    category: "accommodation",
  },
  {
    id: "suites",
    name: "Arvor Suites",
    icon: Home,
    x: 68,
    y: 42,
    color: "#703a1d",
    walk: "6 min from reception",
    description: "22 contemporary suites overlooking the lakes.",
    href: "/stay/arvor-suites",
    category: "accommodation",
  },
  {
    id: "beach",
    name: "Widemouth Bay",
    icon: Waves,
    x: 85,
    y: 72,
    color: "#0891b2",
    walk: "15 min walk / 2 min drive",
    description: "Sandy beach, surf school, rock pools. 1 mile.",
    href: "/estate/local-area",
    category: "local",
  },
  {
    id: "ev",
    name: "EV Charging",
    icon: Car,
    x: 45,
    y: 52,
    color: "#6b7280",
    walk: "2 min from reception",
    description: "4 super-fast chargers. Free for guests.",
    href: "/estate/map",
    category: "facilities",
  },
]

const categories = [
  { id: "all", label: "All" },
  { id: "facilities", label: "Facilities" },
  { id: "accommodation", label: "Stays" },
  { id: "nature", label: "Nature" },
  { id: "local", label: "Local" },
]

/* ─── Component ─── */

export default function EstateMapPage() {
  const [activePin, setActivePin] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  const filteredLocations =
    filter === "all"
      ? locations
      : locations.filter((l) => l.category === filter)

  const activeLocation = locations.find((l) => l.id === activePin)

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-3">
        <BackButton href="/estate" />
        <h1 className="font-display text-xl italic text-on-surface">
          Estate Map
        </h1>
      </div>

      {/* Filter Pills */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id)
                setActivePin(null)
              }}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === cat.id
                  ? "bg-secondary text-white"
                  : "bg-surface-container text-on-surface-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="px-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container-low">
          {/* Background terrain SVG */}
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base landscape */}
            <rect width="400" height="300" fill="#e8e4df" />

            {/* Rolling hills */}
            <path
              d="M0 200 Q50 180 100 190 Q150 170 200 185 Q250 175 300 180 Q350 170 400 190 V300 H0Z"
              fill="#d4cfc7"
              opacity="0.5"
            />

            {/* Woodland area */}
            <ellipse cx="90" cy="90" rx="50" ry="40" fill="#4a6457" opacity="0.15" />

            {/* Lake */}
            <ellipse cx="290" cy="165" rx="35" ry="20" fill="#93c5fd" opacity="0.4" />

            {/* Paths */}
            <path
              d="M192 135 L248 105 M192 135 L160 114 M192 135 L288 165 M192 135 L120 165 M192 135 L220 174 M192 135 L180 156"
              stroke="#703a1d"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.3"
              fill="none"
            />

            {/* Fields */}
            <rect x="100" y="140" width="60" height="40" rx="4" fill="#4a6457" opacity="0.08" />
            <rect x="240" y="110" width="50" height="35" rx="4" fill="#4a6457" opacity="0.08" />

            {/* Coast indicator */}
            <path
              d="M340 200 Q360 195 380 210 Q390 220 400 215"
              stroke="#0891b2"
              strokeWidth="2"
              opacity="0.3"
              fill="none"
            />
            <path
              d="M350 215 Q370 210 390 225 Q395 230 400 228"
              stroke="#0891b2"
              strokeWidth="1.5"
              opacity="0.2"
              fill="none"
            />
          </svg>

          {/* Compass */}
          <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm">
            <Navigation className="h-4 w-4 text-on-surface-muted" />
          </div>

          {/* Scale indicator */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <div className="h-px w-10 bg-on-surface-muted/50" />
            <span className="text-[9px] text-on-surface-muted">~200m</span>
          </div>

          {/* Map Pins */}
          {filteredLocations.map((location) => {
            const Icon = location.icon
            const isActive = activePin === location.id
            return (
              <motion.button
                key={location.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() =>
                  setActivePin(isActive ? null : location.id)
                }
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
              >
                <motion.div
                  animate={isActive ? { scale: 1.3 } : { scale: 1 }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-colors ${
                    isActive ? "ring-2 ring-white" : ""
                  }`}
                  style={{ backgroundColor: location.color }}
                >
                  <Icon className="h-4 w-4 text-white" />
                </motion.div>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 1, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-0.5 text-[10px] text-white"
                  >
                    {location.name}
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Active Location Detail Card */}
      <AnimatePresence mode="wait">
        {activeLocation && (
          <motion.div
            key={activeLocation.id}
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-4 rounded-2xl bg-surface-container p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${activeLocation.color}15` }}
                >
                  <activeLocation.icon
                    className="h-5 w-5"
                    style={{ color: activeLocation.color }}
                  />
                </div>
                <div>
                  <h3 className="font-display text-base italic text-on-surface">
                    {activeLocation.name}
                  </h3>
                  <p className="font-body text-xs text-on-surface-muted">
                    {activeLocation.walk}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-low"
              >
                <X className="h-3.5 w-3.5 text-on-surface-muted" />
              </button>
            </div>
            <p className="mt-3 font-body text-sm text-on-surface-variant">
              {activeLocation.description}
            </p>
            <Link
              href={activeLocation.href}
              className="mt-3 flex items-center gap-1 font-body text-xs font-medium text-primary"
            >
              View details <ChevronRight className="h-3 w-3" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location List */}
      <div className="mt-6 px-4">
        <h2 className="font-display text-base italic text-on-surface mb-3">
          All locations
        </h2>
        <div className="flex flex-col gap-2">
          {filteredLocations.map((location) => {
            const Icon = location.icon
            return (
              <button
                key={location.id}
                onClick={() => setActivePin(location.id)}
                className={`flex items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                  activePin === location.id
                    ? "bg-surface-container"
                    : "bg-surface-container-low"
                }`}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${location.color}15` }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: location.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-on-surface">
                    {location.name}
                  </p>
                  <p className="font-body text-xs text-on-surface-muted">
                    {location.walk}
                  </p>
                </div>
                <MapPin className="h-4 w-4 shrink-0 text-on-surface-muted" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="mt-6 px-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-surface-container-low p-4">
            <Car className="h-5 w-5 text-secondary mb-2" />
            <p className="font-body text-sm font-medium text-on-surface">
              ANPR Gates
            </p>
            <p className="font-body text-xs text-on-surface-muted mt-1">
              Auto entry 24/7. Register at check-in.
            </p>
          </div>
          <div className="rounded-2xl bg-surface-container-low p-4">
            <Navigation className="h-5 w-5 text-secondary mb-2" />
            <p className="font-body text-sm font-medium text-on-surface">
              Walking Paths
            </p>
            <p className="font-body text-xs text-on-surface-muted mt-1">
              12 miles of marked trails on estate.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
