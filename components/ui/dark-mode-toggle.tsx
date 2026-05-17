"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("whalesborough-theme")
    if (stored === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else if (stored === "light") {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    } else {
      // Respect system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)
      if (prefersDark) {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("whalesborough-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("whalesborough-theme", "light")
    }
  }

  if (!mounted) return null

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center justify-between gap-4 w-full px-5 py-4 transition-colors hover:bg-surface-container"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="flex items-center gap-4">
        {isDark ? (
          <Moon className="h-5 w-5 text-on-surface-variant shrink-0" />
        ) : (
          <Sun className="h-5 w-5 text-on-surface-variant shrink-0" />
        )}
        <span className="font-body text-sm text-on-surface">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
      <div
        className={`relative h-6 w-11 rounded-full transition-colors ${
          isDark ? "bg-primary" : "bg-surface-container-highest"
        }`}
      >
        <div
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            isDark ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  )
}
