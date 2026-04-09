# Design System: Coastal Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

We are not building a website; we are composing a high-end luxury travel monograph. This system rejects the "templated" look of modern booking engines in favor of the intentional, asymmetrical layouts found in *Condé Nast Traveller*. It prioritizes panoramic breathing room, allowing photography to function as architecture rather than mere decoration. By utilizing a "vanishing grid," we create a sense of infinite horizon, mirroring the coastal experience of Whalesborough Farm.

## 2. Colors & Tonal Depth
The color palette is a sophisticated dialogue between the organic coolness of the coast and the warm heritage of the farm.

*   **Primary (#703a1d - Cognac):** Reserved strictly for "The Call." It is the sunset on the horizon. Use this exclusively for primary CTAs and active navigation states.
*   **Secondary (#4a6457 - Deep Sage):** Our "Anchor." This color grounds the airy layout. Use it for header backgrounds, navigation blocks, and structural elements that require a sense of permanence.
*   **Neutral Surfaces:** We use a "High-Key" approach. `surface` (#fbf9f6) and `surface_container_lowest` (#ffffff) are your primary canvases.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited.** We define space through "Tonal Silhouettes." To separate a content block, shift the background from `surface` to `surface_container_low`. Boundaries must feel like the transition between sand and sea—natural and soft, not a hard line drawn in ink.

### Signature Textures & Glass
To elevate the "Editorial" feel, use **Glassmorphism** for floating navigation bars or photo captions. Use a semi-transparent `surface` color with a `backdrop-filter: blur(20px)`. This allows the breathtaking photography to bleed through the UI, creating a sense of immersion.

## 3. Typography: The Editorial Voice
Typography is the primary vehicle for luxury. We utilize a high-contrast scale that pits a romantic, oversized serif against a technical, airy sans-serif.

*   **Display & Headline (Newsreader):** Our "Hero" voice. These should be set with generous leading and occasionally negative letter-spacing (-0.02em) to mimic high-end print. Use `display-lg` for panoramic hero moments to create a "breathtaking" impact.
*   **Title & Body (Plus Jakarta Sans):** Our "Concierge" voice. Clean, legible, and modern. `body-lg` should be set with increased line-height (1.6 - 1.8) to ensure the text feels "breezy" and uncrowded.
*   **Labels:** Always uppercase with a slight letter spacing (0.05em) to denote a sense of curated categorization.

## 4. Elevation & Depth
In a "Coastal Editorial" aesthetic, depth is not achieved through shadows, but through **Tonal Layering.**

*   **The Layering Principle:** Treat the UI as stacked sheets of fine heavy-weight paper. A `surface_container_highest` card should sit atop a `surface` background. The shift in "whiteness" provides all the hierarchy necessary.
*   **Ambient Shadows:** If a floating element (like a booking modal) requires lift, use an ultra-diffused shadow: `box-shadow: 0 20px 50px rgba(74, 100, 87, 0.05)`. Note the use of the `secondary` (Sage) color in the shadow to keep the tone organic rather than "dirty" grey.
*   **The "Ghost Border" Fallback:** If a UI element (like an input field) risks disappearing, use a `1px` border of `outline_variant` at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons (The "Cognac" Signature)
*   **Primary:** Solid `primary` (Cognac) with `on_primary` (White) text. **Radius: 0px.** Sharp corners communicate architectural precision.
*   **Tertiary:** `secondary` (Sage) text with a 1px "Ghost Border" that transitions to a solid `surface_container_low` on hover.

### Cards & Panoramic Lists
*   **Forbid Divider Lines:** Use `24px` to `48px` of vertical white space to separate list items. 
*   **Image-First:** Cards should lead with a full-bleed image. Typography should sit below on a `surface_container_lowest` background, or overlay the image using a Glassmorphism treatment.

### Navigation & Headers
*   **The "Editorial Header":** Use a `secondary` (Sage) block for the top-level nav to provide a high-contrast "frame" for the pure white content below.

### Inputs & Forms
*   **Minimalist Fields:** Bottom-border only, or a subtle `surface_container_low` fill. No heavy boxes. Focus states should transition the bottom border to `primary` (Cognac).

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical grids. Place a headline on the left and the body text offset to the right with 20% empty space between them.
*   **Do** use "Edge-to-Edge" photography. If a photo can be full-width, make it full-width.
*   **Do** embrace white space. If you think there is enough space, double it.

### Don't:
*   **Don't** use rounded corners (`0px` everywhere). Rounded corners feel "app-like"; sharp corners feel "editorial."
*   **Don't** use drop shadows for decorative purposes. Only use them for functional "floating" elements.
*   **Don't** use icons for everything. In a luxury context, a well-set word in `label-md` is more sophisticated than a generic icon.
*   **Don't** use 100% black text. Use `on_surface` (#1b1c1a) to keep the contrast soft and readable.