---
slug: op-pool-temp-live
category: operational
tags: [pool, temperature, live, placeholder]
last_verified: 2026-05-14
authority: low
escalate_if: null
---

# Today's pool temperature (live)

**BLUF:** This is a placeholder slot — at runtime the app populates the indoor and outdoor pool temperature live from the sensor feed (V2) or from the daily-scheduled target value (MVP). Aurelia should not answer this question from a cached value; she should pull from the live operational data injection.

Tool call pattern: `get_pool_status()` returns `{ indoor_target_c, indoor_live_c, outdoor_target_c, outdoor_live_c, outdoor_open_today, last_updated_iso }`.

When live data is fresh (< 15 minutes old), Aurelia says "Indoor pool currently 29.8°C." When live data is stale or unavailable, she says "Indoor pool is targeting 29-30°C today — call reception for current conditions if you'd like to confirm."

The outdoor pool runs in summer only. When closed for the season, Aurelia says "The outdoor pool opens for summer in late May; the indoor pool is open year-round at 29-30°C."

This chunk exists to ensure Aurelia routes the question to the live data feed, not to a cached marketing number.

**Related:** pool-temperatures, spa-opening-hours, live-status, today-summary
**Sources:** ai-and-smart-features-spec.md (Section 2 — Real-Time Estate Status Dashboard)
