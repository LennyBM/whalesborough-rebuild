"use client"

import { motion } from "framer-motion"
import { BackButton } from "@/components/app-shell/back-button"

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
}

function OccupancyRing({
  percent,
  label,
  occupied,
  total,
}: {
  percent: number
  label: string
  occupied: number
  total: number
}) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-surface-container"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-semibold text-on-surface">
            {percent}%
          </span>
        </div>
      </div>
      <p className="text-xs text-secondary">
        {label} &middot; {occupied}/{total}
      </p>
    </div>
  )
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = Math.min((value / max) * 100, 100)
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  )
}

function ChannelBar({
  label,
  percent,
  color,
}: {
  label: string
  percent: number
  color: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-xs text-secondary">{label}</span>
      <div className="flex-1">
        <div className="h-3 overflow-hidden rounded-full bg-surface-container">
          <motion.div
            className={`h-full rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          />
        </div>
      </div>
      <span className="w-8 text-right text-xs font-medium text-on-surface">
        {percent}%
      </span>
    </div>
  )
}

export default function DirectorDashboard() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const arrivals = [
    "Morrison family",
    "Dr & Mrs Patel",
    "J. Williams",
    "The Hendersons",
  ]

  const staffOnShift = [
    { name: "Sarah M.", role: "Reception", initials: "SM" },
    { name: "Tom B.", role: "Maintenance", initials: "TB" },
    { name: "Lucy H.", role: "Housekeeping Lead", initials: "LH" },
    { name: "James K.", role: "Spa Therapist", initials: "JK" },
  ]

  return (
    <div className="min-h-screen bg-background px-4 pb-24 pt-6">
      {/* Header */}
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="mb-6 flex items-start justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <BackButton />
            <h1 className="font-display text-2xl font-semibold italic text-on-surface">
              Director Dashboard
            </h1>
          </div>
          <p className="mt-1 text-sm text-secondary">{formattedDate}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Staff Portal
        </span>
      </motion.header>

      {/* Revenue Card */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="mb-4 rounded-2xl bg-surface-container-low p-5"
      >
        <h2 className="font-body text-xs font-medium uppercase tracking-wider text-secondary">
          Revenue
        </h2>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="font-display text-3xl font-semibold italic text-on-surface">
              &pound;12,450
            </p>
            <p className="text-xs text-secondary">This week</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
            8% vs last week
          </span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary">
              This month: <span className="font-medium text-on-surface">&pound;48,200</span>
            </span>
            <span className="text-secondary">Target &pound;55,000</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={48200} max={55000} />
          </div>
          <p className="mt-1 text-right text-[10px] text-secondary">
            &pound;6,800 remaining &middot; 88% of target
          </p>
        </div>
      </motion.section>

      {/* Occupancy Ring */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
        className="mb-4 rounded-2xl bg-surface-container-low p-5"
      >
        <h2 className="font-body text-xs font-medium uppercase tracking-wider text-secondary">
          Occupancy
        </h2>
        <div className="mt-4 flex justify-around">
          <OccupancyRing percent={78} label="Tonight" occupied={23} total={30} />
          <OccupancyRing percent={85} label="Tomorrow" occupied={25} total={30} />
        </div>
      </motion.section>

      {/* Today's Snapshot */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
        className="mb-4 rounded-2xl bg-surface-container-low p-5"
      >
        <h2 className="font-body text-xs font-medium uppercase tracking-wider text-secondary">
          Today&apos;s Snapshot
        </h2>

        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                4
              </span>
              <span className="text-sm font-medium text-on-surface">
                Arrivals today
              </span>
            </div>
            <ul className="ml-8 mt-1.5 space-y-0.5">
              {arrivals.map((name) => (
                <li key={name} className="text-xs text-secondary">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700">
              2
            </span>
            <span className="text-sm font-medium text-on-surface">
              Departures
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-700">
              3
            </span>
            <span className="text-sm font-medium text-on-surface">
              Cottages in turnaround
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs text-red-700">
              1
            </span>
            <span className="text-sm font-medium text-on-surface">
              Maintenance job open
            </span>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats Grid */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
        className="mb-4 grid grid-cols-2 gap-3"
      >
        {[
          { label: "Spa bookings today", value: "12", icon: "💆" },
          { label: "Restaurant covers", value: "34", icon: "🍽" },
          { label: "Farm sessions", value: "2/3 full", icon: "🌾" },
          { label: "EV chargers in use", value: "2/4", icon: "⚡" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-surface-container-low p-4"
          >
            <span className="text-lg">{stat.icon}</span>
            <p className="mt-2 font-display text-xl font-semibold italic text-on-surface">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[11px] text-secondary">{stat.label}</p>
          </div>
        ))}
      </motion.section>

      {/* Guest Feedback */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
        className="mb-4 rounded-2xl bg-surface-container-low p-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-body text-xs font-medium uppercase tracking-wider text-secondary">
            Guest Feedback
          </h2>
          <button className="text-xs font-medium text-primary">View all</button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="font-display text-3xl font-semibold italic text-on-surface">
            4.8
          </span>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < 5 ? (i < 4 ? "fill-current" : "fill-current opacity-60") : "fill-none"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-secondary">/5</span>
        </div>

        <div className="mt-3 rounded-xl bg-surface-container p-3">
          <p className="text-xs italic text-secondary">
            &ldquo;Absolutely stunning setting. The cottage was immaculate and
            the kids loved the farm animals. We&apos;ll definitely be
            back!&rdquo;
          </p>
          <p className="mt-1.5 text-[10px] text-secondary">
            &mdash; Morrison family, Trevose Cottage &middot; 2 days ago
          </p>
        </div>
      </motion.section>

      {/* Revenue by Channel */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={6}
        className="mb-4 rounded-2xl bg-surface-container-low p-5"
      >
        <h2 className="font-body text-xs font-medium uppercase tracking-wider text-secondary">
          Revenue by Channel
        </h2>
        <div className="mt-4 space-y-3">
          <ChannelBar label="Direct App" percent={45} color="bg-primary" />
          <ChannelBar label="Landal" percent={35} color="bg-[#4a6457]" />
          <ChannelBar label="Website" percent={12} color="bg-amber-500" />
          <ChannelBar label="Phone" percent={8} color="bg-surface-container" />
        </div>
      </motion.section>

      {/* Staff on Shift */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={7}
        className="rounded-2xl bg-surface-container-low p-5"
      >
        <h2 className="font-body text-xs font-medium uppercase tracking-wider text-secondary">
          Staff on Shift
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {staffOnShift.map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xs font-semibold text-primary">
                  {person.initials}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface">
                  {person.name}
                </p>
                <p className="text-[10px] text-secondary">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
