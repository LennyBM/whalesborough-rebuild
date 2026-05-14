---
slug: op-ev-charger-status
category: operational
tags: [ev, charger, status, live, placeholder]
last_verified: 2026-05-14
authority: low
escalate_if: null
---

# EV charger availability (live)

**BLUF:** Placeholder slot — at runtime the app populates the number of free EV charging bays from the charger provider's API. Aurelia should not answer "is the charger free" from a cached value; she should call the live charger status API and report the count of free vs occupied bays.

Tool call pattern: `get_ev_charger_status()` returns `{ total_bays, free_bays, occupied_bays, charging_rates_kw, provider_name, last_updated_iso }`.

Live message: "Three of the four bays are free now." If all are in use, Aurelia notes the typical session length and offers to suggest a return time.

Spec caveat: the chargers historically marketed as "super-fast" are most likely 22 kW rapid AC chargers — Aurelia uses the accurate language unless the verified spec is "≥50 kW DC ultra-rapid." See the ev-charging chunk for the broader context.

For guests arriving with low charge who need certainty, Aurelia recommends booking a specific charging slot ahead via the provider's app, and falling back to a local public charger (e.g. Pod Point at Bude Sainsbury's, 10 minutes away).

**Related:** ev-charging, parking, getting-here, slow-travel
**Sources:** ai-and-smart-features-spec.md
