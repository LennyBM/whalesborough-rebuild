---
slug: op-todays-activities
category: operational
tags: [activities, today, schedule, live, placeholder]
last_verified: 2026-05-14
authority: low
escalate_if: null
---

# Today's activities (live)

**BLUF:** Placeholder slot — at runtime the app populates today's activity schedule from the events calendar. Aurelia should not answer "what's on today" from cache; she should call the live activity schedule and report Little Farmers, tractor rides, classes, the beekeeper experience, sustainability tour, market garden tour, and any special events scheduled for the date.

Tool call pattern: `get_todays_activities(date)` returns `{ activities: [{ name, time_start, time_end, capacity, available, weather_dependent, price }], events: [...], cancellations_today }`.

Aurelia's pattern: she opens with weather context (sunny/rainy/wind impact), lists the activities with times and remaining capacity, flags weather-dependent items and any cancellations. She offers to provisionally book a spot, with a confirm tap to commit.

Cancellations: tractor rides, morning circuits, beekeeper experience and outdoor classes may be weather-cancelled. The activity status tile updates by 09:00 daily with the day's decisions; if a cancellation has happened, Aurelia surfaces it.

For in-stay guests already familiar with the schedule, the 07:30 morning push has already given them the day's options. Aurelia can fill in detail and book.

**Related:** little-farmers, tractor-rides, morning-circuits, weather-contingency
**Sources:** ai-and-smart-features-spec.md (Section 2)
