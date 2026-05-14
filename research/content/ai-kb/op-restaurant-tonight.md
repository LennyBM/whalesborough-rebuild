---
slug: op-restaurant-tonight
category: operational
tags: [restaurant, availability, live, placeholder]
last_verified: 2026-05-14
authority: low
escalate_if: null
---

# Restaurant availability tonight (live)

**BLUF:** Placeholder slot — at runtime the app populates current restaurant availability from the booking system. Aurelia should not answer "can we get a table tonight" from cache; she should call the live booking system and offer a real time-slot or join the waitlist.

Tool call pattern: `check_restaurant_availability(date, party_size, dietary_flags, dog)` returns `{ slots_available: [...], next_available_slot, waitlist_position_if_full }`.

Aurelia's pattern: she asks for the party size and any dietary or dog flags, then calls the tool. She presents available slots and offers to provisionally hold the best fit, with a confirm tap required to commit.

If the requested slot is unavailable, Aurelia offers (in order): a nearby alternative time slot, waitlist enrolment, an off-estate alternative from the local restaurant list.

The Weir doesn't serve dinner as standard — the live tool reflects this: weekday evenings return "dinner not served" with the events calendar as alternative. Grill and Chill Saturday evenings and long-table dinner nights return their own availability.

**Related:** restaurant-opening-hours, table-booking, walk-in-policy, dinner-events
**Sources:** ai-and-smart-features-spec.md
