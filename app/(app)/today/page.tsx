import { TodayHero } from "@/components/app/today-hero";
import { LiveMetrics } from "@/components/app/live-metrics";
import { UpNext } from "@/components/app/up-next";
import { QuickBook } from "@/components/app/quick-book";
import { WhatsOn } from "@/components/app/whats-on";

/**
 * Today tab — the Whoop-style glanceable home screen.
 *
 * Information hierarchy (progressive disclosure):
 *  Tier 1: Three live metrics (weather, pool temp, next service) — visible at a glance
 *  Tier 2: Up Next card (your next booking), What's On (today's activities)
 *  Tier 3: Quick Book grid (spa, restaurant, activity — 3-tap booking)
 *
 * Context-aware:
 *  - On-site: shows live pool temp, restaurant availability, today's activities
 *  - Remote: shows next visit countdown, what's on this week, plan-ahead prompts
 *
 * Dark background. Colour = state (green available, amber limited, red full).
 */
export default function TodayPage() {
  return (
    <div className="space-y-5 px-5 pt-4">
      {/* Hero — location + weather */}
      <TodayHero />

      {/* Live metrics strip — Whoop's three dials equivalent */}
      <LiveMetrics />

      {/* Up Next — your nearest booking */}
      <UpNext />

      {/* Quick Book — 3 shortcuts to book spa/restaurant/activity */}
      <QuickBook />

      {/* What's On — today's schedule cards */}
      <WhatsOn />
    </div>
  );
}
