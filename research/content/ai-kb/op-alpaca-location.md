---
slug: op-alpaca-location
category: operational
tags: [alpacas, location, live, placeholder]
last_verified: 2026-05-14
authority: low
escalate_if: null
---

# Where are the alpacas right now? (live)

**BLUF:** Placeholder slot — at runtime the app populates the alpacas' current paddock from the alpaca-cam (V2: GPS collar). Aurelia should not answer "where are the alpacas" from a cached value; she should pull the latest spot location from the live feed and offer the time of the last sighting.

Tool call pattern: `get_alpaca_location()` returns `{ alberto_paddock, alfonzo_paddock, last_spotted_iso, cam_url, walk_time_minutes_from_user_location }`.

Live message pattern: "Alberto was last spotted at 9:42 this morning near the apple orchard. The walk from your cottage takes about 6 minutes." If GPS data is stale (> 30 minutes), Aurelia falls back to "The alpacas roam the paddocks around the apple orchard, the upper field and the woodland edge — head down to the feeding paddock and they usually come up to greet visitors."

Names: Alberto and Alfonzo are the named pair on social channels — the kids' favourites. They are easily identifiable: Alberto is the slightly larger, slightly darker one; Alfonzo is whiter with a darker face mask.

For Little Farmers sessions (Tuesday and Saturday 10:30), the alpacas come to the central feeding paddock and stay 30 minutes.

**Related:** alpaca-feeding, little-farmers, tractor-rides, family-units
**Sources:** ai-and-smart-features-spec.md, premium-features-spec.md (Live Farm Cams)
