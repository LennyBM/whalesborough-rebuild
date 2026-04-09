# Geo-Personalisation & Local SEO Technical Brief

This document outlines the technical requirements and strategic framework for implementing geo-targeting and local SEO enhancements. The objective is to transition from a static web experience to a dynamic, location-aware platform that reduces friction, builds trust, and increases conversion rates by serving relevant, context-specific content.

---

## Dynamic Content Rules

Technical logic for website personalisation must rely on real-time signals to tailor content, layout, and offers. The following rules govern how the site should alter content based on the visitor's detected location.

### 1. IP-Based Localisation Logic

The system must automatically detect a visitor's IP address to establish geolocation and apply the following primary adaptations:

- **Currency and Pricing:** Automatically display relevant currency based on region (e.g., GBP for UK visitors, USD for US visitors).
- **Logistics and Shipping:** Surface regional shipping rates and availability immediately to eliminate checkout friction.
- **Language and Transliteration:** Use the language parameter to return readable addresses. Addresses should be provided in the local language, transliterated to a script readable by the user if necessary.

### 2. Personalisation Funnel Stages

Dynamic content should be triggered based on the visitor's stage in the customer journey:

- **Awareness (First-Time Visitors):** Use light, non-intrusive signals (geolocation, referral source) to tailor headlines. For example, a hero banner may greet a visitor by their city name or reference the specific campaign that referred them.
- **Consideration (Returning Visitors):** Adapt hero images and content blocks to show products or content related to previous browsing history (e.g., "Because you liked [Category X]").
- **Retention (Post-Purchase):** Use lifecycle-based messaging to show tailored re-engagement offers or milestone rewards, such as location-specific event invitations.

### 3. Dynamic UI Components

| Component | Logic/Trigger | Expected Content Change |
|---|---|---|
| Hero Banners | Geolocation / Referral Source | Swap images and headlines to reflect local landmarks or industry-specific imagery. |
| Call-to-Action (CTA) | Visitor Profile / Intent | Swap "Book Now" for first-timers with "Use code WELCOME" or "Find a Location Near You." |
| Navigation Menus | Past Behaviour | Surface "My Trips" or "Local Services" for returning users while keeping a standard menu for new arrivals. |
| Content Blocks | Real-Time Browsing | Insert "Top Picks for [User's City]" or related articles based on session clicks. |

---

## Google Business Profile Integration

Seamlessly mapping and embedding Google Business Profile (GBP) data is critical for establishing local authority and providing social proof.

### 1. Mapping and Hierarchy (Nested Departments)

For organisations with multiple operational areas (e.g., a hotel with an onsite spa or restaurant), use the "Nested Departments" strategy:

- **Parent Listing:** The main entity (Whalesborough Farm Resort & Spa).
- **Nested Profiles:** Individual profiles for departments — "The W Club Spa" and "The Weir Restaurant."
- **UI Indication:** Each nested department must display the "Located in: [Main Listing]" icon to clarify the connection to Google and users.
- **Specific Attributes:** Each nested department should maintain unique categories, hours, and contact information to improve search relevance for specific queries like "spa near me" vs. "accommodation near me."

### 2. Social Proof and Review Embedding

- **Review Mapping:** Map and embed GBP reviews directly into the UI. High-quality user feedback is significantly more trusted than traditional marketing.
- **Reputation Management:** Responses to reviews should be highlighted where possible, as active engagement increases the visibility of the listing and demonstrates brand responsiveness.
- **Structured Attributes:** Sync and display star ratings, amenities (e.g., Wi-Fi, Pool, Pet-friendly), and sustainability practices directly from the GBP data to the website UI.

### 3. Maps and Booking Integration

- **Seamless Map Embedding:** Use the Maps Embed API or Static API to display the physical location. Preferred method is using Place IDs rather than addresses to ensure coordinates snap to the correct building entrance rather than a building centre.
- **Real-Time Inventory Sync:** Integrate the website booking engine with GBP's free booking links. This ensures that pricing and availability displayed on Google search results are accurate and link directly to the site's conversion funnel.

---

## Location-Based Prompts

Proximity-based "nudges" utilise contextual data to create urgency and relevance for local traffic.

### 1. Distance and Duration Logic

Utilise the Distance Matrix API to calculate real-time travel estimates for visitors.

- **Required Parameters:** `origins` (user's location via browser GPS or IP) and `destinations` (business location).
- **Travel Mode:** Set to `driving`, `walking`, or `transit` based on the user's likely context.
- **Traffic Models:** Use the `duration_in_traffic` field with the `traffic_model` set to `best_guess`. This provides a travel estimate based on historical averages and live traffic conditions.

### 2. Design Rules for Nudges

- **Proximity Alerts:** For local traffic, trigger a non-intrusive notification or sidebar prompt such as: "You're only 2 hours away — visit us today for [Local Event]!"
- **Transit Modifiers:** If a user is within walking distance, the prompt should adjust to show walking time instead of driving time.
- **Contextual Chat Prompts:** Trigger a localised chat prompt if a user spends prolonged time on a "Directions" or "Location" page (e.g., "Need help finding our entrance at Whalesborough Farm?").

### 3. Implementation Best Practices

- **Real-Time Interaction:** Use AI-driven agents to detect intent shifts. If a user's behaviour suggests they are looking for local availability (e.g., viewing several local experience pages), surface a "Nearby Destinations" or "Local Experiences" module.
- **Exit-Intent Interventions:** If a local visitor moves to exit the site while having items in a cart or an uncompleted booking, trigger an abandonment-based nudge: "Still interested in a getaway? We're just a short drive from [User's Detected City]."
- **Privacy and Opt-Out:** Ensure all location-based tracking allows for user opt-out and maintains privacy standards, using anonymised segments where possible.
