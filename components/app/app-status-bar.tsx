"use client";

import * as React from "react";
import { Bell } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * App top bar — minimal. Greeting on the left, notification bell on the right.
 *
 * Time-aware greeting:
 *  - Before 12:00 → "Good morning"
 *  - 12:00–17:00 → "Good afternoon"
 *  - After 17:00 → "Good evening"
 *
 * Sticks to top. Transparent with blur — content scrolls beneath.
 */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function AppStatusBar({ className }: { className?: string }) {
  const [greeting, setGreeting] = React.useState("Good morning");

  React.useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "flex h-14 items-center justify-between px-5",
        "bg-app-surface/80 backdrop-blur-xl",
        "pt-[env(safe-area-inset-top)]",
        className,
      )}
    >
      <div>
        <p className="text-[13px] font-medium text-app-muted">{greeting}</p>
        <p className="font-display text-[15px] font-semibold italic leading-tight text-app-on-surface">
          Whalesborough
        </p>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-full",
          "bg-app-card text-app-muted",
          "transition-colors duration-150 hover:text-app-on-surface",
          "active:scale-95",
        )}
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
        {/* Notification dot — show when unread */}
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-app-accent" />
      </button>
    </header>
  );
}
