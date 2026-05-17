"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CalendarDays, Compass, KeyRound, User } from "lucide-react"

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/stay/booking/dates", label: "Book", icon: CalendarDays },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/my-stay", label: "My Stay", icon: KeyRound },
  { href: "/account", label: "Account", icon: User },
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
        {tabs.map(({ href, label, icon: Icon }) => {
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
                <Icon
                  className={`h-5 w-5 ${active ? "stroke-[2.5]" : "stroke-[1.75]"}`}
                />
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
