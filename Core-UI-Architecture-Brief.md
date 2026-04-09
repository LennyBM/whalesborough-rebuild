# Core UI Architecture Brief: Front-End Design and Implementation

This briefing document outlines the architectural requirements and design standards for front-end development, incorporating best-in-class luxury hospitality trends and strict compliance mandates. The objective is to translate the "digital lobby" concept into a high-performing, accessible, and aesthetically superior user interface.

---

## 1. Global UI Rules

The user interface must balance "Quiet Luxury" with high-utility functionality, ensuring the digital experience reflects the sophisticated minimalism of high-end properties.

### Layout Patterns and Grid Systems

- **Sophisticated Minimalism:** Follow a "less is more" graphical approach. Use well-defined white space and evocative imagery to communicate serenity and exclusivity rather than overt opulence.
- **Magazine-Style/Bento Layouts:** For content-heavy homepages, utilise a magazine-style layout where diverse offerings (amenities, galleries, itineraries) are displayed in clean, distinct blocks. This allows for an intriguing, non-linear scroll while maintaining organisation.
- **Horizontal Scrolling:** Implement horizontal scrolls specifically for photo galleries or thematic paths. This adds an interactive, unexpected touch to the browsing experience, particularly when showcasing rooms and services.
- **Dynamic Elements:** Use elegant page animations and micro-interactions (e.g., animated fish or subtle hover effects) to lead the user through content without being distracting.

### Navigation Structure

- **Mega-Menu Architecture:** For complex sites (3+ levels of information architecture), utilise a mega-menu pattern.
  - **Columns:** Panels should hold three to five columns on large screens.
  - **Group Labels:** Divide navigation into clusters with descriptive, non-clickable titles to enhance scannability.
  - **Trigger Rules:** To meet ADA requirements, mega-menus must open on-click, not on-hover.
  - **Visual Indicators:** Use carets to distinguish between top-level items that link to pages and those that open panels.
- **Sticky Header:** An omnipresent header is mandatory. The lowest level of navigation must remain sticky upon scroll to ensure the "Book Now" option is always accessible.
- **Mobile Navigation:** Use a standard hamburger menu for small screens. Ensure the Section Title in the mobile menu houses sub-navigation in a functional drop-down format.

---

## 2. Accessibility (WCAG) Mandates

Accessibility is a core requirement for ADA compliance (Title III) and is essential for broadening audience reach and mitigating legal risk. The system must conform to WCAG 2.1/2.2 Level AA.

### Contrast and Typography

| Element | Minimum Contrast Ratio | Implementation Rule |
|---|---|---|
| Normal Text | 4.5:1 | Applies to all body copy and standard UI text. |
| Large Text | 3:1 | Defined as 24px regular or 19px bold. |
| UI Components | 3:1 | Includes focus indicators, hit areas, and borders. |
| Custom States | 3:1 | Required for hover, active, and focus states. |

- **Scalable Typography:** Define all text and containers in relative units (em, rem, or percentages) rather than fixed pixels to ensure seamless resizing up to 200%.

### Semantic Markup and ARIA Labels

- **ARIA Landmarks:** Use ARIA landmarks (e.g., `<nav>`, `<main>`, `<header>`) to identify page regions.
- **List vs. Grid Roles:** Do not use the `role="grid"` attribute for simple lists. Invalid grid markup (missing row/cell children) confuses screen readers. Use a generic `role="region"` or standard `<ul>`/`<li>` tags for simple lists.
- **Descriptive Links:** Avoid ambiguous link text like "click here." Ensure the purpose of each link is clear from its text alone or the immediate context.

### Video and Media Compliance

- **Mandatory Assets:** Every video must include accurate, synchronised closed captions, a descriptive text transcript, and audio descriptions for visual-only content (e.g., scene changes, actions).
- **Keyboard Operation:** The video player must be fully operable via keyboard (Tab, Space, Enter, and arrow keys) for volume, playback, and captions.

---

## 3. Dark Mode and Responsiveness

The luxury aesthetic must remain consistent regardless of the device or user system preferences.

### Adaptive Interfacing (Day/Night Switch)

- **Time-Based Customisation:** Implement an interface "switch" on the homepage that allows the UI to adapt based on the time of day or season.
  - **Day Mode:** Highlights sun-drenched views and bright, airy aesthetics.
  - **Dark/Night Mode:** Adapts to moonlight views or night-time property activities, utilising softer colour palettes and illuminated imagery.
- **User Preference:** The site should respect the user's system-level dark mode settings while providing a manual override button.

### Mobile-First Design

- **Responsive Fluidity:** The design must be "viewable across devices without losing functionality or breaking." Content must reflow at a width of 320px without requiring horizontal scrolling.
- **Visual Continuity:** Adapt high-impact visuals and short, social-style video clips (mini-reels) for mobile screens to convey room atmosphere immediately.
- **Functional Parity:** Fundamental features, such as the booking engine, must remain simplified and efficient on mobile, requiring only basic information (room type, name, payment) to prevent conversion loss.

### Luxury Adaptations

- **High-Impact Footers:** The footer should not just be a repository for links but a "real design element." Use high-impact video or evocative, neutral-coloured imagery to bring the property's story to a close as the user reaches the bottom of the page.
- **Sustainable Visuals:** Incorporate "conscious creativity" by highlighting local materials and sustainable practices (e.g., living walls, recycled materials) through professional photography and storytelling blocks.
