# Design System: Coastal Editorial
## The Approved Design Direction for Whalesborough Farm Resort & Spa

---

## Creative North Star
**"The Digital Curator"** — We are composing a high-end luxury travel monograph, not building a booking website. Asymmetrical editorial layouts from *Condé Nast Traveller*. Photography as architecture. A "vanishing grid" that creates infinite horizon — mirroring the coastal experience of Whalesborough Farm.

---

## Colour Tokens

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#703a1d` | ALL CTAs, active nav states, "Book Now" buttons ONLY |
| `secondary` | `#4a6457` | Navigation bar, header backgrounds, structural anchors |
| `background` / `surface` | `#fbf9f6` | Primary page canvas — warm white |
| `surface-container-lowest` | `#ffffff` | Pure white for card overlays |
| `surface-container-low` | `#f5f3f0` | Tonal shift to separate sections (replaces borders) |
| `surface-container` | `#efeeeb` | Mid-tone surface |
| `surface-container-high` | `#eae8e5` | Elevated surfaces |
| `surface-container-highest` | `#e4e2df` | Highest elevation cards |
| `on-surface` | `#1b1c1a` | All body text — NOT pure black |
| `on-surface-variant` | `#424844` | Secondary/caption text |
| `outline-variant` | `#c2c8c3` | Ghost borders (15% opacity only) |

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited.** Separate content blocks by shifting background tones, never with lines. Boundaries must feel like the transition between sand and sea — natural and soft.

---

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Hero | Newsreader | 300–700 | Letter spacing: -0.02em. Generous leading. Oversized for hero moments. |
| Headlines | Newsreader | 400 italic | The "romantic" voice |
| Body | Plus Jakarta Sans | 300–400 | Line height 1.6–1.8. Airy and uncrowded. |
| Labels | Plus Jakarta Sans | 500–600 | UPPERCASE, letter-spacing: 0.05em |
| UI / Nav | Plus Jakarta Sans | 400–500 | Clean, concierge voice |

**Google Fonts links:**
- `https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,700;1,300;1,400`
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700`

---

## Border Radius
**0px everywhere.** Sharp corners throughout. Zero rounded corners. Rounded corners feel "app-like"; sharp corners feel "editorial."

---

## Elevation & Shadows
- No decorative shadows
- Floating elements only: `box-shadow: 0 20px 50px rgba(74, 100, 87, 0.05)` — sage-tinted, ultra-diffused
- Ghost border fallback: `1px solid rgba(194, 200, 195, 0.15)` — felt, not seen

---

## Glassmorphism (use sparingly)
For floating nav bars and photo captions only:
```css
background: rgba(251, 249, 246, 0.05);
backdrop-filter: blur(20px);
```
Allows photography to bleed through the UI. Creates immersion.

---

## Components

### Navigation
- Background: `#4a6457` (Deep Sage)
- Sticky, full-width, z-50
- Logo: Newsreader, light weight, tracked, uppercase, white
- Nav links: Newsreader italic, white/90 opacity, hover → primary cognac
- "Book Now" CTA: `#703a1d` background, white text, 0px radius, uppercase, tracked

### Buttons
- **Primary:** `#703a1d` fill, white text, `0px` radius, uppercase, letter-spacing: 0.1em
- **Tertiary:** `#4a6457` text, ghost border, hover → `surface-container-low` fill
- NO rounded corners. EVER.

### Cards
- Image-first, full-bleed
- Text below on `surface-container-lowest` background OR glassmorphism overlay on image
- No divider lines between list items — use 24px–48px vertical space instead
- No shadows for decoration

### Forms / Inputs
- Bottom-border only (or `surface-container-low` fill)
- No heavy boxes or rounded inputs
- Focus state: bottom border transitions to `#703a1d` cognac

### Section Separation
- Shift background from `surface` → `surface-container-low` to separate sections
- Never use a horizontal rule or border

---

## Layout Principles

- **Asymmetrical grids:** Headline left, body offset right with 20% empty space between
- **Edge-to-edge photography:** If a photo can be full-width, make it full-width
- **Double the white space:** If you think there's enough, double it
- **12-column editorial grid:** `.editorial-grid { display: grid; grid-template-columns: repeat(12, 1fr); }`
- **Horizontal scroll:** For galleries only — adds unexpected interactive touch

---

## Tailwind Config (copy into every page)

```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#703a1d",
        "on-primary": "#ffffff",
        "secondary": "#4a6457",
        "on-secondary": "#ffffff",
        "background": "#fbf9f6",
        "surface": "#fbf9f6",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f0",
        "surface-container": "#efeeeb",
        "surface-container-high": "#eae8e5",
        "surface-container-highest": "#e4e2df",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#424844",
        "outline-variant": "#c2c8c3",
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Newsreader"],
        "body": ["Plus Jakarta Sans"],
        "label": ["Plus Jakarta Sans"]
      }
    }
  }
}
```

---

## Files in This Design System

| File | Description |
|---|---|
| `coastal_editorial/DESIGN.md` | Full original design system from Stitch |
| `option_2_coastal_editorial_homepage_desktop/code.html` | Homepage desktop HTML |
| `option_2_coastal_editorial_homepage_desktop/screen.png` | Homepage desktop screenshot |
| `option_2_coastal_editorial_homepage_mobile/code.html` | Homepage mobile HTML |
| `option_2_coastal_editorial_homepage_mobile/screen.png` | Homepage mobile screenshot |
| `option_2_coastal_editorial_cottages_overview/code.html` | Cottages overview page HTML |
| `option_2_coastal_editorial_cottages_overview/screen.png` | Cottages overview screenshot |
| `option_2_coastal_editorial_the_farmhouse/code.html` | Individual cottage page HTML |
| `option_2_coastal_editorial_the_farmhouse/screen.png` | Cottage page screenshot |

---

## Do's and Don'ts

### Do
- Asymmetrical grids with intentional empty space
- Edge-to-edge, full-bleed photography everywhere possible
- Double your white space instinct
- Newsreader serif for all display and headline moments
- Uppercase tracked labels in Plus Jakarta Sans

### Don't
- No rounded corners (0px everywhere except `full` for pills if needed)
- No decorative drop shadows
- No icons for everything — a well-set word beats a generic icon in luxury
- No 100% black text — always use `#1b1c1a`
- No standard 1px borders — use tonal shifts only
- No dark mode (client decision — light only)
