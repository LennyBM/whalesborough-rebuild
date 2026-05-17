"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, CalendarDays, Compass, KeyRound, User } from "lucide-react"

const tabs = [
  { href: "/", label: "Home", icon: Home, badge: null as string | null },
  { href: "/stay/booking/dates", label: "Book", icon: CalendarDays, badge: null as string | null },
  { href: "/explore", label: "Explore", icon: Compass, badge: null as string | null },
  { href: "/my-stay", label: "My Stay", icon: KeyRound, badge: "1" as string | null },
  { href: "/account", label: "Account", icon: User, badge: "dot" as string | null },
]

export function BottomTabs() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-black/5 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80"
    >
      <ul className="flex items-center justify-around h-16 max-w-lg mx-auto px-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ href, label, icon: Icon, badge }) => {
          const active = isActive(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 py-2 text-xs font-body transition-colors ${
                  active
                    ? "text-primary"
                    : "text-on-surface-muted hover:text-on-surface"
                }`}
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="relative"
                >
                  <Icon
                    className={`h-5 w-5 ${active ? "stroke-[2.5]" : "stroke-[1.75]"}`}
                  />
                  {badge === "dot" && (
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                  {badge && badge !== "dot" && (
                    <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[16px] h-4 rounded-full bg-primary px-1 text-[9px] font-bold text-white ring-2 ring-white">
                      {badge}
                    </span>
                  )}
                </motion.div>
                <span className={active ? "font-semibold" : "font-medium"}>
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
