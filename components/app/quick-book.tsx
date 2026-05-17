"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, UtensilsCrossed, TreePine } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Quick Book — three shortcut cards for the primary booking flows.
 *
 * Soho House model: transaction-first, content-second.
 * Each card leads to a focused 3-tap booking flow (Wave 2).
 *
 * Cards use subtle gradient backgrounds that reference each sub-brand's
 * colour palette (spa teal, restaurant amber, estate sage).
 */
export function QuickBook({ className }: { className?: string }) {
  return (
    <section className={cn("", className)}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-app-muted">
        Quick book
      </p>
      <div className="grid grid-cols-3 gap-3">
        <BookCard
          href="/book?tab=spa"
          icon={Sparkles}
          label="Spa"
          sublabel="3 slots today"
          gradient="from-teal-900/60 to-teal-800/30"
          iconColor="text-teal-300"
        />
        <BookCard
          href="/book?tab=restaurant"
          icon={UtensilsCrossed}
          label="Restaurant"
          sublabel="Walk-in OK"
          gradient="from-amber-900/60 to-amber-800/30"
          iconColor="text-amber-300"
        />
        <BookCard
          href="/book?tab=activities"
          icon={TreePine}
          label="Activities"
          sublabel="5 available"
          gradient="from-emerald-900/60 to-emerald-800/30"
          iconColor="text-emerald-300"
        />
      </div>
    </section>
  );
}

function BookCard({
  href,
  icon: Icon,
  label,
  sublabel,
  gradient,
  iconColor,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  sublabel: string;
  gradient: string;
  iconColor: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl p-5",
        "bg-gradient-to-br",
        gradient,
        "transition-transform duration-150 active:scale-95",
      )}
    >
      <Icon className={cn("h-6 w-6", iconColor)} strokeWidth={1.6} />
      <span className="text-[12px] font-semibold text-app-on-surface">
        {label}
      </span>
      <span className="text-[10px] text-app-muted">{sublabel}</span>
    </Link>
  );
}
