"use client"

import { motion } from "framer-motion"
import { Copy, Check, Shield, User, Sparkles, Home, Crown } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const accounts = [
  {
    role: "Director",
    name: "Stuart Lobb",
    email: "stuart@whalesborough.co.uk",
    password: "admin123",
    icon: Crown,
    color: "#703a1d",
    bgColor: "#703a1d15",
    description: "Full access — revenue, occupancy, staff management",
    link: "/staff/dashboard",
  },
  {
    role: "Reception Staff",
    name: "Sarah Reynolds",
    email: "sarah.r@whalesborough.co.uk",
    password: "staff123",
    icon: Shield,
    color: "#4a6457",
    bgColor: "#4a645715",
    description: "Arrivals, departures, guest requests",
    link: "/staff",
  },
  {
    role: "Housekeeping",
    name: "Mike Thomas",
    email: "mike.t@whalesborough.co.uk",
    password: "staff123",
    icon: Home,
    color: "#4a6457",
    bgColor: "#4a645715",
    description: "Turnaround schedule, cottage status",
    link: "/staff/housekeeping",
  },
  {
    role: "W Club Member",
    name: "James Thornton",
    email: "james.thornton@email.com",
    password: "member123",
    icon: Sparkles,
    color: "#b45309",
    bgColor: "#b4530915",
    description: "Spa credits, loyalty tier Gold, member perks",
    link: "/account",
  },
  {
    role: "Guest",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    password: "guest123",
    icon: User,
    color: "#6b7280",
    bgColor: "#6b728015",
    description: "Standard guest — has upcoming booking",
    link: "/my-stay",
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex h-6 w-6 items-center justify-center rounded-md bg-surface-container active:scale-95 transition-transform"
    >
      {copied ? (
        <Check className="h-3 w-3 text-emerald-500" />
      ) : (
        <Copy className="h-3 w-3 text-on-surface-muted" />
      )}
    </button>
  )
}

export default function DemoInfoPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-14 pb-4">
        <p className="font-body text-xs text-on-surface-muted">
          Whalesborough App Demo
        </p>
        <h1 className="font-display text-2xl italic text-on-surface">
          Login Credentials
        </h1>
        <p className="font-body text-sm text-on-surface-muted mt-2">
          Tap any role to see their view. All accounts are pre-loaded with demo
          data.
        </p>
      </div>

      <div className="flex flex-col gap-3 px-4">
        {accounts.map((account, i) => {
          const Icon = account.icon
          return (
            <motion.div
              key={account.role}
              initial={{ opacity: 1, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="rounded-2xl bg-surface-container-low p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: account.bgColor }}
                >
                  <Icon className="h-5 w-5" style={{ color: account.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-base italic text-on-surface">
                      {account.role}
                    </h2>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                      style={{ backgroundColor: account.color }}
                    >
                      {account.name.split(" ")[0]}
                    </span>
                  </div>
                  <p className="font-body text-xs text-on-surface-muted mt-0.5">
                    {account.description}
                  </p>
                </div>
              </div>

              {/* Credentials */}
              <div className="mt-3 rounded-xl bg-surface-container p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-wider text-on-surface-muted">
                      Email
                    </p>
                    <p className="font-body text-sm text-on-surface font-medium">
                      {account.email}
                    </p>
                  </div>
                  <CopyButton text={account.email} />
                </div>
                <div className="h-px bg-on-surface/5" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-wider text-on-surface-muted">
                      Password
                    </p>
                    <p className="font-body text-sm text-on-surface font-medium font-mono">
                      {account.password}
                    </p>
                  </div>
                  <CopyButton text={account.password} />
                </div>
              </div>

              {/* Quick link */}
              <Link
                href={account.link}
                className="mt-3 block rounded-xl bg-primary/10 px-4 py-2.5 text-center font-body text-xs font-semibold text-primary active:scale-[0.98] transition-transform"
              >
                Preview {account.role} view
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Quick nav back */}
      <div className="px-4 mt-6">
        <Link
          href="/login"
          className="block rounded-2xl bg-primary px-4 py-3.5 text-center font-body text-sm font-semibold text-white active:scale-[0.98] transition-transform"
        >
          Go to Login Page
        </Link>
      </div>

      {/* Note */}
      <div className="px-4 mt-4">
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
          <p className="font-body text-xs text-amber-800 font-medium">
            Demo Mode
          </p>
          <p className="font-body text-xs text-amber-700 mt-1">
            This is a demonstration app. No real payments are processed, no real
            data is stored. All bookings and guest data shown are fictional.
          </p>
        </div>
      </div>
    </main>
  )
}
