# Whalesborough Farm Resort & Spa — Component Library & Design Token Specification

**Version:** 1.0
**Date:** 2026-05-14
**Audience:** Engineering, design, and QA leads scaffolding the £500k booking application.
**Foundation:** Coastal Editorial design system ("The Digital Curator")
**Stack assumption:** Next.js 15 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + Radix UI primitives + Framer Motion.

This document specifies **every** UI primitive, molecule, organism, and pattern the Whalesborough application requires. It is intended as the single canonical reference for engineers, designers, and QA — sufficient to scaffold a Storybook from cold start.

---

## 1. Foundation: Token System

### 1.1 Token Architecture

Tokens flow through three layers:

1. **Reference tokens** — raw values, never used in components directly.
2. **System tokens** — semantic aliases mapped to reference tokens (these are what components consume).
3. **Component tokens** — overrides per component (rare, mostly for button variants).

All tokens live in `tokens/` as a TypeScript module, are emitted as CSS custom properties on `:root`, and are consumed via Tailwind utility classes. The Figma library mirrors the same names.

### 1.2 Color Tokens (Full Ramp)

```css
:root {
  /* === Brand === */
  --color-primary: #703a1d;          /* Cognac. CTAs only. */
  --color-primary-hover: #5e3018;    /* 6% darker for hover */
  --color-primary-pressed: #4d2613;  /* 12% darker for pressed */
  --color-primary-disabled: #b69783; /* 50% mix with surface */
  --color-on-primary: #ffffff;

  --color-secondary: #4a6457;        /* Deep sage. Nav/structural. */
  --color-secondary-hover: #3e564a;
  --color-secondary-pressed: #324839;
  --color-on-secondary: #ffffff;

  /* === Surfaces (tonal layering, no borders) === */
  --color-background: #fbf9f6;       /* Page canvas */
  --color-surface: #fbf9f6;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f5f3f0;
  --color-surface-container: #efeeeb;
  --color-surface-container-high: #eae8e5;
  --color-surface-container-highest: #e4e2df;

  /* === Text on surfaces === */
  --color-on-surface: #1b1c1a;       /* Body text — never pure black */
  --color-on-surface-variant: #424844;
  --color-on-surface-muted: #6b7370;
  --color-on-surface-disabled: #a8aeaa;

  /* === Outline (use sparingly, ghost only) === */
  --color-outline: #c2c8c3;
  --color-outline-variant: rgba(194, 200, 195, 0.15); /* The "felt not seen" line */

  /* === Semantic === */
  --color-success: #4a6e4f;          /* Sage-tinted green — stays in family */
  --color-on-success: #ffffff;
  --color-success-container: #e8efe9;
  --color-on-success-container: #1f3322;

  --color-warning: #a86b2a;          /* Burnt amber, harmonises with cognac */
  --color-on-warning: #ffffff;
  --color-warning-container: #f4e6d4;
  --color-on-warning-container: #4a2f10;

  --color-error: #8a3324;            /* Dark terracotta — never bright red */
  --color-on-error: #ffffff;
  --color-error-container: #f1dad5;
  --color-on-error-container: #3d160f;

  --color-info: #3e5562;             /* Dusk slate */
  --color-on-info: #ffffff;
  --color-info-container: #dde4e8;
  --color-on-info-container: #1a2730;

  /* === Decorative / accents === */
  --color-accent-gold: #b89968;      /* For 5★ badges, voucher cards */
  --color-accent-bone: #ece5d6;      /* For sustainability dashboard */

  /* === Overlays === */
  --color-overlay-glass: rgba(251, 249, 246, 0.05);
  --color-overlay-scrim: rgba(27, 28, 26, 0.6);     /* Modal scrim */
  --color-overlay-image-tint: rgba(74, 100, 87, 0.2); /* Hero darken */
}
```

**Critical rule:** Cognac (`--color-primary`) is reserved for **calls to action only** — booking buttons, active nav, primary form submit. Never use it for body text, headings, icons, or decoration. The scarcity is what gives it gravity.

### 1.3 Typography Scale

Two families: **Newsreader** (display/headline, the romantic voice) and **Plus Jakarta Sans** (body/UI, the concierge voice). Type defined in `rem` so users scaling to 200% remains seamless (WCAG 1.4.4).

| Token | Family | Size | Line height | Weight | Letter-spacing | Use |
|---|---|---|---|---|---|---|
| `display-2xl` | Newsreader | 6.5rem (104px) | 1.0 | 300 | -0.03em | Hero panoramic moments only |
| `display-xl` | Newsreader | 5rem (80px) | 1.05 | 300 | -0.02em | Section heroes |
| `display-lg` | Newsreader | 4rem (64px) | 1.1 | 400 | -0.02em | Page heroes |
| `display-md` | Newsreader | 3rem (48px) | 1.15 | 400 | -0.02em | Sub-hero |
| `display-sm` | Newsreader italic | 2.25rem (36px) | 1.2 | 400 | -0.015em | Editorial pullquotes |
| `h1` | Newsreader | 2.5rem (40px) | 1.2 | 400 | -0.015em | Page H1 |
| `h2` | Newsreader | 2rem (32px) | 1.25 | 400 | -0.01em | Section heading |
| `h3` | Newsreader | 1.5rem (24px) | 1.3 | 400 | -0.005em | Sub-section |
| `h4` | Newsreader | 1.25rem (20px) | 1.35 | 500 | 0 | Card titles |
| `h5` | Plus Jakarta Sans | 1.125rem (18px) | 1.4 | 500 | 0 | Form section heads |
| `h6` | Plus Jakarta Sans | 1rem (16px) | 1.5 | 600 | 0.01em | Inline headers |
| `body-lg` | Plus Jakarta Sans | 1.125rem (18px) | 1.7 | 400 | 0 | Lead paragraphs |
| `body` | Plus Jakarta Sans | 1rem (16px) | 1.65 | 400 | 0 | Default body |
| `body-sm` | Plus Jakarta Sans | 0.875rem (14px) | 1.55 | 400 | 0 | Secondary text |
| `caption` | Plus Jakarta Sans | 0.75rem (12px) | 1.45 | 400 | 0.01em | Image captions, meta |
| `label` | Plus Jakarta Sans | 0.75rem (12px) | 1.4 | 500 | 0.05em | UPPERCASE tracked labels |
| `label-lg` | Plus Jakarta Sans | 0.875rem (14px) | 1.4 | 500 | 0.05em | UPPERCASE section eyebrows |
| `button` | Plus Jakarta Sans | 0.8125rem (13px) | 1.0 | 500 | 0.12em | UPPERCASE button text |
| `overline` | Plus Jakarta Sans | 0.6875rem (11px) | 1.3 | 600 | 0.15em | UPPERCASE eyebrow text |

### 1.4 Spacing Scale (4px base)

```
--space-0: 0;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
--space-40: 160px;
--space-48: 192px;
--space-56: 224px;
--space-64: 256px;
```

**Editorial rule:** Section vertical padding starts at `--space-24` on mobile, `--space-40` on tablet, `--space-56` on desktop. Per Manifesto: "double your white space instinct."

### 1.5 Border Radius

```
--radius-none: 0;       /* DEFAULT — everywhere */
--radius-full: 9999px;  /* Avatars, pills only */
```

Two values. That is the entire set. Anything else is a rejection in code review.

### 1.6 Shadows

```css
--shadow-none: none;
--shadow-float: 0 20px 50px rgba(74, 100, 87, 0.05);  /* Modals, sticky cart */
--shadow-float-md: 0 30px 80px rgba(74, 100, 87, 0.07); /* Mega menu reveal */
--shadow-focus: 0 0 0 3px rgba(112, 58, 29, 0.25);    /* Focus ring (a11y) */
```

Decorative card shadows are **forbidden**. The only legitimate shadows are floating UI (modals, popovers, sheets) and the focus ring.

### 1.7 Z-index Scale

```
--z-base: 0;
--z-raised: 10;
--z-sticky: 100;            /* Sticky header, floating CTA bar */
--z-popover: 200;
--z-tooltip: 300;
--z-drawer: 400;
--z-modal: 500;
--z-scrim: 499;             /* Sits behind modal */
--z-toast: 600;
--z-mega-menu: 550;
--z-concierge: 700;          /* AI concierge floats above all */
```

### 1.8 Motion Tokens

Per the Manifesto: "Luxury motion is deliberate and theatrical." All motion must respect `prefers-reduced-motion`.

```css
/* Duration */
--motion-duration-instant: 100ms;
--motion-duration-fast: 200ms;
--motion-duration-base: 400ms;     /* Default UI */
--motion-duration-slow: 700ms;     /* Cards, reveals */
--motion-duration-deliberate: 1200ms; /* Mega menu, hero fade */
--motion-duration-theatrical: 2000ms; /* Ken Burns, page transitions */

/* Easing */
--motion-ease-out-luxury: cubic-bezier(0.16, 1, 0.3, 1);    /* Decelerate, "settles" */
--motion-ease-in-luxury: cubic-bezier(0.7, 0, 0.84, 0);     /* Accelerate, "departs" */
--motion-ease-in-out-silk: cubic-bezier(0.65, 0, 0.35, 1);  /* Symmetric, glides */
--motion-ease-organic: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Gentle overshoot — use sparingly */
```

Defaults: `400ms` + `ease-out-luxury` for everything UI; bump to `700ms` for card reveals and `1200ms` for the mega menu.

### 1.9 Breakpoints (Mobile-First)

```
--bp-xs: 320px;   /* iPhone SE — must render without horizontal scroll */
--bp-sm: 480px;   /* Large phones */
--bp-md: 768px;   /* Tablet portrait */
--bp-lg: 1024px;  /* Tablet landscape / small laptop */
--bp-xl: 1440px;  /* Desktop standard */
--bp-2xl: 1920px; /* Wide desktop, cinematic hero */
```

Tailwind config aligns: `xs / sm / md / lg / xl / 2xl`.

### 1.10 Grid System

Two grids, both 12-column:

- **Standard editorial:** `repeat(12, 1fr)`, gap `var(--space-6)` (24px). Most content.
- **Asymmetric editorial:** Page-level layouts use named column tracks `[gutter] 1fr [content-start] minmax(0, 1100px) [content-end] 1fr [gutter]` with intentional 20% offset blocks per F25 Section Header pattern.
- **Container max-width:** `1280px` for content, `1440px` for hero/gallery, edge-to-edge for photography.

---

## 2. Components — Atoms

Each component below specifies: **props**, **states**, **a11y**, **motion**, **mobile/desktop**, **brand fit**, **do/don't**.

### 2.1 Button

**Variants:** `primary` (cognac) · `secondary` (sage outline) · `tertiary` (ghost) · `icon` · `link-arrow`

**Primary (cognac):**
- Background `--color-primary`, text `--color-on-primary`, 0px radius, padding `14px 32px`, `button` type token, uppercase.
- Hover: background → `--color-primary-hover`, no scale, no shadow.
- Active: `--color-primary-pressed`.
- Focus: `--shadow-focus` ring.
- Disabled: `--color-primary-disabled`, `cursor: not-allowed`, no hover state.
- Motion: 200ms ease-out-luxury for background transition only. No bounce.

**Tertiary (ghost):**
- Transparent background, `--color-secondary` text, ghost border at 15% opacity.
- Hover: background → `--color-surface-container-low`. Text colour unchanged.

**Link-arrow** (per F25 brand book):
- Inline text + `→` glyph. Underline appears on hover with a 300ms slide-in from left. Arrow nudges right `4px` on hover.

**Props:** `variant`, `size` (sm/md/lg), `disabled`, `loading`, `iconLeft`, `iconRight`, `as` (polymorphic — accepts `Link` for Next.js).

**A11y:** `<button>` for actions, `<a>` for navigation. `aria-busy` when loading. Min hit target 44×44px (WCAG 2.2 SC 2.5.8). Loading state announces "Loading" via `aria-live`.

**Don't:** No gradient fills, no rounded corners, no drop shadows on hover, no scale transforms.

### 2.2 Text Input

Bottom-border-only field. Two visual modes: `default` (transparent bg) and `filled` (`--color-surface-container-low` bg).

- Bottom border `2px solid --color-outline-variant` (default), no top/side borders.
- Padding `12px 0` (default) or `12px 16px` (filled).
- Label sits above input, `label-lg` token, uppercase tracked.
- Focus: bottom border transitions to `--color-primary` over 200ms.
- Error: bottom border `--color-error`, error message in `body-sm` below.
- Disabled: text `--color-on-surface-disabled`, no focus state.

**Props:** `type`, `label`, `placeholder`, `value`, `onChange`, `error`, `helperText`, `prefix`, `suffix`, `required`, `disabled`, `autoComplete`, `inputMode`.

**A11y:** `<label>` always present (visually shown, not just `aria-label`). `aria-invalid` and `aria-describedby` link error/helper. `inputMode="numeric"` for phone/dates.

**Mobile:** Font-size must be `≥16px` to prevent iOS zoom-on-focus.

### 2.3 Textarea

Inherits text input styling. Resizes vertically only. Min-height 120px, max-height 320px. Character counter appears in `caption` token when `maxLength` set.

### 2.4 Select / Dropdown

Built on Radix `Select`. Trigger styled identically to text input. Options panel: `--color-surface-container-lowest` bg, `--shadow-float`, max-height 320px scrollable. Options use `body` token, padding `12px 16px`, hover `--color-surface-container-low`.

**A11y:** Full keyboard nav (Radix handles). Selected option announced via `aria-selected`.

### 2.5 Date Picker (Luxury)

**The hero of the booking flow.** Per Manifesto: "should feel like a calendar in a private residence, not a software tool."

- Custom build atop `react-day-picker` or Radix popover + custom calendar grid.
- Two-month side-by-side panel on desktop (1024px+), single month on mobile.
- Days laid out without grid lines — only tonal hover and selected state.
- Selected: `--color-primary` background, `--color-on-primary` text.
- Range hover: `--color-surface-container` between start/end.
- Disabled (unavailable) dates: 30% opacity, strike-through, `cursor: not-allowed`.
- Today: small cognac dot below the date number.
- Month names in `h3` Newsreader italic.
- Day numbers in `body` Plus Jakarta Sans.
- Animation: opens with 400ms fade + 8px translateY up.

**Props:** `mode` (`single` / `range`), `minDate`, `maxDate`, `disabledDates`, `value`, `onChange`, `unavailableMessage`.

**A11y:** ARIA grid with proper `role="gridcell"`. Arrow-key navigation. Date format announced in plain English ("Friday, 15 May 2026").

### 2.6 Time Picker

Used for spa/restaurant booking. 15-minute interval scroll wheel on mobile, dropdown on desktop. Same input shell as text input.

### 2.7 Number Stepper (Guest Counter)

For "Adults", "Children", "Dogs" counts.

- Inline label + minus button + count + plus button + sub-label ("Age 12+").
- Buttons are `36×36px` `icon` variant, `--color-secondary` text on transparent bg.
- Count uses `h4` token.
- Min/max enforced; disabled state on buttons when bounds hit.

**A11y:** Each button has `aria-label` ("Add adult", "Remove adult"). Count uses `aria-live="polite"` so SR announces changes.

### 2.8 Checkbox

**Critical:** Never pre-ticked except for required-by-default options. Per UK PECR/GDPR (DUAA 2025), marketing consent and cookies must be opt-in only.

- Custom-styled 18×18px square. Border `2px solid --color-outline`.
- Checked: fill `--color-primary`, white check glyph.
- Focus: `--shadow-focus`.
- Label sits to the right in `body` token, `body-sm` for fine print.

### 2.9 Radio

18×18px circle with same colour logic as checkbox. Selected: 6px filled cognac dot inside. Always grouped with `<fieldset>` + `<legend>`.

### 2.10 Toggle / Switch

40×24px track, 20×20px thumb. Off: `--color-outline` track, thumb left. On: `--color-secondary` track (not cognac — toggles are not CTAs), thumb right. 200ms ease-out-luxury for thumb slide.

### 2.11 Tag / Chip / Pill

Inline metadata: "Dog-friendly", "Hot tub", "Sea view".

- Padding `6px 12px`, `caption` token, uppercase tracked.
- Bg `--color-surface-container-low`, text `--color-on-surface-variant`.
- 0px radius (sharp chips, not pills) **unless** category badge — use `--radius-full` for status pills only.
- Removable variant has × icon button inside; click animates 200ms scale-down fade.

### 2.12 Badge

Distinct from tag — used for accolades and overlays on cards.

- **"5★ Gold" badge:** `--color-accent-gold` text on `--color-surface-container-lowest`, with a thin gold rule above and below. Newsreader italic.
- **"Dog-friendly" badge:** small pictogram + Plus Jakarta Sans `caption`.
- Overlays on cards positioned top-left, `--color-overlay-glass` background with `backdrop-filter: blur(10px)`.

### 2.13 Avatar

48×48 (default), 32×32 (compact), 80×80 (profile). `--radius-full`. Initials fallback in Newsreader italic on `--color-surface-container-high` bg.

### 2.14 Spinner

Editorial spinner: a single thin arc (1px stroke) rotating slowly (1.2s linear loop). Stroke `--color-secondary`. No multi-coloured tech spinners. Three sizes: 16, 24, 40px.

### 2.15 Skeleton

Image-shaped grey blocks at `--color-surface-container` with a slow 1.5s shimmer using a linear gradient sweep. Aspect ratios match the component being loaded (no jumpy CLS).

### 2.16 Tooltip

Radix Tooltip. `--color-surface-container-highest` bg, `--color-on-surface` text in `caption`. No arrow (cleaner). 250ms delay before show, fades over 200ms. Always reachable via keyboard focus (`Tooltip.Trigger asChild`).

### 2.17 Image

Wrapper around `next/image` with mandatory:
- Aspect ratio prop (prevents CLS).
- `placeholder="blur"` with low-quality blur datasets.
- Theatrical fade-in: 800ms opacity 0 → 1 on load with `--motion-ease-out-luxury`.
- Lazy by default; `priority` only on LCP image.

**Variants:** `cover`, `contain`, `full-bleed`, `ken-burns` (slow 20s scale 1 → 1.05 loop on hero).

### 2.18 Video Player

Custom controls (don't use browser default). Play/pause, progress bar, mute, captions toggle, fullscreen. Controls fade in on hover (700ms ease-out-luxury) and auto-hide after 2s.

- Background autoplay videos: `muted`, `playsInline`, `loop`, `prefers-reduced-motion: reduce` → static poster image.
- All videos must ship with captions (WCAG SC 1.2.2) and transcripts.

### 2.19 Icon

Custom icon set, **24×24 stroke (1.5px)** style, drawn in Tabler-Icons or Lucide tradition but bespoke. No emoji-style fills. Heritage feel — slightly hand-drawn but technical. Icons used **sparingly** per Manifesto: "a well-set word beats a generic icon in luxury."

---

## 3. Components — Molecules

### 3.1 Form Field

Wrapper composing `<Label>` + input + `<HelperText>` + `<ErrorMessage>`. Vertical stack with `--space-2` gaps. The atomic building block of every form.

### 3.2 Card — Image-First

- Image full-bleed at top (16:10 or 4:5 aspect).
- Below: `eyebrow label` + `h4 title` + `body-sm body` + `link-arrow CTA`.
- Background `--color-surface-container-lowest`.
- Hover: image scales 1.02 over 700ms with `ease-out-luxury`. Text colour stays.
- **No card border or shadow.** Separation via tonal background of parent section.

### 3.3 Card — Image-Overlay (Glassmorphism)

- Full-bleed background image.
- Bottom-left: glass panel `rgba(251, 249, 246, 0.05)`, `backdrop-filter: blur(20px)`, padding `24px`.
- Title in white Newsreader, optional eyebrow label.
- Used for hero feature cards, mega menu imagery.

### 3.4 Search Field with Autocomplete

Text input + popover panel below. Recent searches in `caption`, suggestions in `body`. Keyboard navigable (Radix Combobox pattern). Loading state: thin progress line above input.

### 3.5 Price Display

Three layouts:
- **From price:** small `label` "FROM" + `h3` price + `caption` "per night".
- **Was/now:** strikethrough was-price in `body-sm`, then `h3` now-price, `caption` saving amount.
- **Total breakdown:** itemised list, totals in `h4`.

All currency formatted via `Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })`.

### 3.6 Rating Display

Feefo / Google / NPS scores. Format: large numeric score in Newsreader (e.g. `4.5`) + small `/5` + `label` source ("FEEFO INDEPENDENT SERVICE RATING") + review count in `caption`. No star clusters — too generic.

### 3.7 Breadcrumb

Inline `caption` text separated by `/` glyphs. Current page in `--color-on-surface`, ancestors in `--color-on-surface-variant`. Schema.org `BreadcrumbList` JSON-LD emitted.

### 3.8 Pagination

Editorial style: "01 / 12" counter centered, prev/next arrows on flanks. No numbered button row.

### 3.9 Tabs (Editorial)

Not the standard Material tab. Instead: horizontal row of `label-lg` UPPERCASE items separated by generous `--space-12` gaps. Active tab has cognac underline that **slides** between options on click (300ms ease-out-luxury). On mobile, becomes a horizontally scrollable rail with scroll-snap.

### 3.10 Accordion

For FAQ blocks. Each item: full-width clickable row, `h5` title + chevron icon. Closed → open animates over 500ms height transition with `ease-out-luxury`. Open content uses `body-lg`. Tonal separation between items via `--space-8` vertical gaps + alternating `--color-surface-container-low` backgrounds.

### 3.11 Toast / Snackbar

Radix Toast. Bottom-center on mobile, bottom-right on desktop. `--color-surface-container-highest` bg, `--shadow-float`. Max 4s display. Optional action button (link-arrow variant). Stacks vertically with `--space-2` gaps.

### 3.12 Modal / Dialog

Radix Dialog. **Full-screen on mobile** (slides up from bottom over 500ms), centered card on desktop (max-width 720px, `--shadow-float-md`). Scrim `--color-overlay-scrim`. Close (×) top-right, 48×48 hit target. Focus trapped, Esc closes, body scroll locked.

### 3.13 Sheet / Drawer

Radix Dialog with side anchoring. Bottom sheet on mobile (height 80vh), side drawer on desktop (width 480px). Used for: cart, filters, mobile nav. Drag-to-dismiss on mobile (gesture handler).

### 3.14 Popover

Radix Popover. `--color-surface-container-lowest` bg, `--shadow-float`. No arrow. 300ms fade + 6px Y translation on open.

### 3.15 Stepper (Booking Flow)

Horizontal row of step indicators: numbered circle + `label` text. Three states: completed (cognac fill, white check), current (cognac outline, cognac number, label below in bold), upcoming (sage outline at 40% opacity, sage number). Connecting line between steps is `2px` `--color-outline-variant`, becomes cognac when completed.

On mobile, collapses to "Step 2 of 5" text + thin cognac progress bar above content.

---

## 4. Components — Organisms

### 4.1 Top Nav / Header (Sticky)

- Background `--color-secondary` (deep sage), full-width, height 80px desktop / 64px mobile.
- Logo left, primary nav center, "BOOK NOW" CTA right + secondary actions (account, search, basket).
- Sticky on scroll, with subtle background change from `--color-secondary` to `--color-secondary` + 95% opacity + `backdrop-filter: blur(20px)` after 100px scroll.
- All nav items in Newsreader italic on the sage background.
- Active page indicator: thin cognac underline below the link.

### 4.2 Mega Menu

Triggered **on click** (per Core UI Architecture Brief — accessibility mandate, not hover). Panel slides down 600ms over the page with cognac scrim behind. 3–5 columns:

- Col 1–2: navigation links grouped under non-clickable `label-lg` group headers ("STAY", "EAT & DRINK", "WELLNESS", "ESTATE").
- Col 3–4: featured imagery — "Spotlight" cards (image + title + link-arrow).
- Col 5 (optional): live status / curated CTA (e.g. "This week at Whalesborough" + featured experience).

Background `--color-surface-container-lowest`, full-width, `--shadow-float-md`. Close (×) top-right or by clicking outside.

### 4.3 Mobile Nav

Hamburger trigger 44×44px, top-right. Opens **full-screen overlay** sliding from right, taking 700ms with `ease-out-luxury` ("once-in-a-generation" transition per Manifesto). Nav items in `display-sm` Newsreader, stacked. Tap reveals sub-nav drawer. Includes account/search/CTA at bottom.

### 4.4 Footer

High-impact. Per Core UI Brief: "not just a link repository — a real design element."

- Top section: full-width hero image or short looping video (15s) of Whalesborough at golden hour with audio off.
- Middle: 4-column link grid (Stay, Eat, Wellness, About) + newsletter signup.
- Bottom: legal row (privacy, terms, cookies, accessibility statement, company info per UK Companies Act 2006), copyright, social icons, ICO registration.
- Background `--color-secondary` for legal row, `--color-surface-container-low` for link grid.

### 4.5 Hero Block

Cinematic. Full-viewport (100svh on mobile, 90vh desktop).

- Background: looping silent video (~20s, .webm + .mp4, with poster) **or** static hero image with Ken Burns at 20s linear scale 1 → 1.05.
- Headline center-left in `display-2xl` Newsreader white with subtle text-shadow for legibility.
- Eyebrow label above headline.
- Single primary CTA below.
- Slow fade-in on page load: 1200ms `ease-out-luxury` for headline, 1500ms for CTA (staggered).
- Scroll cue chevron at bottom, gently bouncing (3s loop, halves with reduced-motion).

### 4.6 Booking Widget

Universal booking entry — appears in hero, sticky bar, and dedicated booking pages.

- Horizontal row on desktop (date range picker | guest stepper | dog count | search CTA).
- Stacks vertically on mobile.
- Background `--color-surface-container-lowest`, sits 40px below hero with `--shadow-float`.
- Three variants: `accommodation` (date range + guests), `spa` (date + time + treatment), `restaurant` (date + time + party size).

### 4.7 Unit / Property Cards

Multiple sub-variants but a shared base:
- **Cottage card:** image + name + sleeps + dog-friendly badge + from-price + link-arrow.
- **Treatment card:** illustration + name + duration + price + "Book treatment" CTA.
- **Menu item card:** name + description + price + dietary chips.
- **Lodge card:** image + plot number + bedrooms + from-price + 360° tour link.
- **Event card:** date block + title + body summary + link.

### 4.8 Gallery

Three modes:
- **Masonry:** asymmetric grid, varying column widths, photos as architecture.
- **Slider:** horizontal scroll-snap on mobile, custom slider with prev/next on desktop. Counter "03 / 18" in caption.
- **Lightbox:** full-screen overlay, swipe-dismiss on mobile, arrow keys + Esc on desktop, captions in caption token bottom-left.

### 4.9 360° Tour Viewer

Matterport iframe wrapper. Aspect ratio 16:9. Cover image with play overlay + label "TAKE THE TOUR". Loads iframe on click only (perf, GDPR — no third-party cookies until interaction).

### 4.10 Map Embed

Google Maps Embed API with custom JSON styling: muted greens for nature, warm sands for terrain, cognac pin marker. Click to expand to full-screen modal with directions. Above the embed: address + "GET DIRECTIONS" link-arrow.

### 4.11 Review Block

Rotating testimonial carousel. Single review at a time, large Newsreader italic quote, attribution in `label`. Dots below for pagination, auto-advance every 8s (pausable on hover/focus, full-stop on reduced motion). Schema.org `Review` JSON-LD per testimonial.

### 4.12 FAQ Block

Accordion molecule grouped under `h2` heading. Emits `FAQPage` JSON-LD with all Q&As exposed. Search-citable per the AI-LLM-Mega-Page skill standard.

### 4.13 Section Header (Asymmetric)

Per F25 brand book: 1fr 1fr grid. Left column: eyebrow `label` + `h2 title`. Right column (offset down 40px on desktop, stacked on mobile): `body-lg` paragraph + `link-arrow`.

### 4.14 WideRow (Reverse-Flip)

Alternating image/text rows. Even rows: image left, text right. Odd rows: text left, image right. Mobile: always image top, text below. 50/50 split at desktop, image 66% / text 33% with negative margin overlap when desired ("editorial overlap" technique).

### 4.15 Floating CTA Bar

Mobile-only sticky bottom bar (z-sticky). Shows on accommodation detail / spa treatment / restaurant pages once user scrolls past hero. Contains: price preview ("from £350/night") + "BOOK" primary button. Appears with 500ms slide-up.

### 4.16 Cart Drawer

Right-anchored sheet on desktop (480px wide), bottom sheet on mobile. Items grouped by category (Accommodation, Add-ons, Treatments). Each item: thumbnail + name + dates/details + price + remove. Total + taxes + "Proceed to checkout" CTA at bottom. Empty state: large `body-lg` italic, link-arrow to inspiration.

### 4.17 Filter Sidebar / Sheet

Desktop: left rail 280px, sticky. Mobile: bottom sheet trigger button "FILTERS (3)" with active count. Filters grouped: Price range slider, Bedrooms (number stepper), Features (checkbox group), Availability (date range). Each group collapsible accordion.

### 4.18 Availability Calendar

Per-unit calendar showing 2 months side-by-side desktop, 1 month mobile. Booked = grey strike-through, available = clear, selected = cognac fill. Hover on date shows tooltip with nightly rate. Range selection supported.

### 4.19 Step-by-Step Booking Flow

The five-step golden path organism (see Pattern 5.1). Sticky stepper at top, current step content, "Continue" CTA bottom-right, "Back" link-arrow bottom-left, total summary persistent in right rail (desktop) or collapsible drawer (mobile).

### 4.20 Lodge Plot Map (Interactive)

SVG site plan of lodge plots. Plots clickable: hover = cognac highlight + tooltip with plot number/status. Click = opens side sheet with full plot details + virtual tour + enquiry CTA. Legend (Available / Reserved / Sold) bottom-right.

### 4.21 Estate Map (Interactive)

Larger SVG of the full estate (cottages, spa, restaurant, walking trails, beach access). Hover regions reveal labels and link to relevant pages. Optional layer toggles for "Dog-friendly walks", "Wheelchair accessible".

### 4.22 Live Status Widget

Small floating widget (or inline panel). Shows: pool temperature (live from sensor), restaurant wait time, today's weather at Whalesborough, sunrise/sunset. Each row: `label` + value in `h5`. Updates via SWR every 60s.

### 4.23 Sustainability Dashboard Widget

`--color-accent-bone` background. Shows: kWh saved this year, food miles reduced, % of menu sourced within 10 miles. Uses animated counters that count up when scrolled into view (`IntersectionObserver`).

### 4.24 AI Concierge Chat

Two modes:
- **Floating bubble:** 56×56px circle bottom-right with concierge icon. Pulse animation every 30s.
- **Full-screen modal:** opened from bubble. Chat history scrollable, input pinned bottom. Conversational tone, suggestions as link-arrow chips below assistant messages.

z-concierge (700) — sits above everything. Hideable via × close button (sets `localStorage` to suppress on re-open). Respects `prefers-reduced-motion`.

### 4.25 Wallet Card (Digital Membership / Voucher)

Apple-Wallet inspired card. `--color-secondary` bg with subtle linen texture. White Newsreader title, member name in `h4`, voucher code in `label`, QR code right side. "ADD TO APPLE WALLET" / "ADD TO GOOGLE WALLET" buttons below. Animated reveal on issue.

---

## 5. Patterns

### 5.1 Five-Step Booking Checkout

The golden path organism in action:
1. **Dates & Guests** — booking widget with availability check.
2. **Choose Accommodation** — comparison grid of units, filtering, image gallery per unit.
3. **Personalise Your Stay** — add-ons row, upsell suggestions (room upgrades), cross-sells (spa, dining).
4. **Your Details** — guest checkout option, mandatory minimal fields (name, email, phone), pre-arrival preferences.
5. **Payment & Confirm** — itemised total, transparent fees, T&Cs checkbox (unticked), payment methods (cards + Apple Pay + Google Pay + PayPal). On submission → confirmation page with downloadable itinerary, "Add to calendar" buttons.

Step 4 is where most flows die — must support guest checkout (no forced account creation) and have realtime inline validation.

### 5.2 Multi-Property Comparison

Side-by-side comparison table (up to 4 properties on desktop, swipeable cards on mobile). Rows: Image, Sleeps, Bedrooms, Dog-friendly, Features, From price, CTA. Tonal alternating rows.

### 5.3 Cross-Sell / Upsell Row at Booking

After accommodation chosen, before checkout: horizontal scrolling row of "Complete your stay" suggestions (spa treatment, restaurant reservation, dog welcome pack, breakfast hamper). Each card has add-to-basket toggle that animates the cart count.

### 5.4 Pre-Arrival Form

Sent 14 days before stay. Fields: dietary requirements, arrival time, accessibility needs, dog details, parking, special occasions. Saved to guest profile for future stays. Progressive disclosure — only shows next section after current is completed.

### 5.5 Post-Stay Review Request

Triggered 24 hours after checkout. Email with one-tap rating (5-stars hover/tap on email itself), then redirects to detailed review form on site. On submission, prompts to share to Google / TripAdvisor / Feefo. See `review-collection-flow` skill for full GBP integration.

### 5.6 Gift Voucher Purchase Flow

Three steps: amount/treatment selection → recipient details → payment + delivery method (email PDF, printed card, e-card with personal message). Vouchers issued as wallet cards. Confirmation includes voucher code + redemption instructions.

### 5.7 Membership Signup Flow

Multi-step wizard: tier selection (cards comparing benefits) → personal details → payment → welcome confirmation with digital member card. Onboarding email sequence with concierge introduction.

### 5.8 Lodge Enquiry Flow

For ownership prospects. High-touch form: plot interest (from lodge plot map), contact preference, budget range, finance interest. Submission triggers human sales follow-up within 24h — confirmation makes that promise explicit.

### 5.9 Owner Portal Home

For lodge owners. Authenticated dashboard: this year's revenue (with chart), upcoming guest bookings (calendar), maintenance requests, statements (PDF download), in-app messaging with management. Uses dashboard variants of base components (compact density, more numeric data).

---

## 6. Component Priority (MVP / V1 / V2)

### MVP (launch-critical — block go-live)

Foundation tokens, Button, Text input, Textarea, Select, Date picker, Number stepper, Checkbox, Radio, Tag, Badge, Spinner, Image, Form field, Card (image-first), Price display, Stepper, Top nav, Mobile nav, Footer, Hero, Booking widget, Unit card, Gallery (masonry + lightbox), Modal, Sheet, Tabs, Accordion, Five-step booking checkout, Floating CTA bar, FAQ block, Section header, WideRow, Toast, Skeleton, Tooltip.

### V1 (3 months post-launch — high-value enhancements)

Time picker, Toggle, Avatar, Search field w/ autocomplete, Rating display, Breadcrumb, Pagination, Popover, Mega menu (replaces simpler nav), Cart drawer, Filter sidebar, Map embed, Review block, Cross-sell upsell row, Pre-arrival form, Post-stay review, Multi-property comparison.

### V2 (6+ months — differentiators)

Date picker (luxury two-panel variant if not in MVP), 360° tour viewer, Lodge plot map (interactive), Estate map (interactive), Live status widget, Sustainability dashboard, AI concierge chat (full-screen mode), Wallet card, Owner portal home, Gift voucher flow, Membership signup flow, Video player (custom controls if HTML5 default acceptable in MVP).

---

## 7. Tech Recommendation

**Recommended stack:** Radix UI primitives (unstyled, accessible) + custom Tailwind styling + Framer Motion for transitions.

**Why not shadcn/ui directly?** shadcn defaults to rounded corners, neutral grey palette, and Material/iOS conventions that fight the editorial brand. We can borrow shadcn's component **architecture** (copy-paste, no opaque dependency) but must restyle aggressively. Treat shadcn as a starting point, not a destination.

**Why Radix?** Battle-tested a11y on every interactive primitive (Dialog, Popover, Select, Tooltip, Dropdown, Tabs, Accordion, Toast, Toggle, Slider, Switch, Radio, Checkbox). Headless. Zero visual baggage. Avoids us re-implementing focus traps and ARIA from scratch.

**Headless UI** is acceptable but Radix has wider primitive coverage and stronger React 19 support as of 2026.

**Build-from-scratch:** Only for components Radix doesn't cover (luxury date picker, lodge plot map, estate map, AI concierge, wallet card, live status widget).

**Forms:** React Hook Form + Zod for validation. See `api-route-hardening` skill for the server side.

**Animation:** Framer Motion for entrance/exit and complex orchestrations. CSS for simple transitions (hover, focus).

---

## 8. Build Order (Dependency Graph)

1. **Tokens** (color, type, space, radius, shadow, z-index, motion, breakpoints, grid) — blocks everything.
2. **Atoms** that depend only on tokens: Button, Text input, Textarea, Checkbox, Radio, Tag, Badge, Spinner, Skeleton, Image, Icon, Avatar.
3. **Atoms** that depend on Radix: Select, Tooltip, Toggle.
4. **Composite atoms:** Date picker, Time picker, Number stepper.
5. **Molecules:** Form field, Card variants, Price display, Rating display, Breadcrumb, Pagination, Tabs, Accordion, Toast, Modal, Sheet, Popover, Stepper, Search field.
6. **Organisms (layout):** Top nav, Mobile nav, Footer, Section header, WideRow.
7. **Organisms (booking-critical):** Hero, Booking widget, Unit cards, Gallery, Floating CTA bar, Booking flow stepper, Availability calendar.
8. **Organisms (secondary):** Review block, FAQ block, Map embed, Filter sidebar, Cart drawer.
9. **Organisms (premium/V2):** Mega menu, 360° tour, Lodge plot map, Estate map, Live status, Sustainability dashboard, AI concierge, Wallet card.
10. **Patterns:** Assembled from organisms.

Critical path to MVP launch: Tokens → Atoms → Form field + Card + Stepper + Booking widget → Booking flow → Top nav + Footer + Hero → MVP launch.

---

## 9. Storybook Setup

- **Storybook 8** with `@storybook/nextjs` framework, Tailwind via PostCSS.
- One story per component per state (default, hover, focus, disabled, error, loading, empty).
- Required addons: `@storybook/addon-a11y` (axe-core in browser), `@storybook/addon-viewport` (mobile/tablet/desktop test), `@storybook/addon-interactions` (user-flow tests), `@storybook/test-runner` (CI a11y gate), `chromatic` (visual regression).
- Stories use real Whalesborough content where possible (Lorem-style placeholder text breaks the brand voice — use the `anthropic-skills:hospitality-copywriting` skill output instead).
- Required documentation per component: usage example, props table, do/don't, a11y notes, brand fit note.
- Token visualization: dedicated "Foundations" section with color swatches, type scale specimen, spacing visualizer, motion examples.

CI gate: All stories must pass axe-core with zero serious or critical violations before merge.

---

## 10. Accessibility (WCAG 2.2 AA Notes per Component)

| Component | Critical WCAG considerations |
|---|---|
| Button | SC 2.5.8 target size ≥ 24px (we ship 44×44). SC 1.4.11 non-text contrast ≥ 3:1. SC 2.4.7 focus visible. |
| Text input / Textarea | SC 1.3.1 label association. SC 4.1.3 status messages (error via `aria-live`). SC 1.3.5 autocomplete tokens (`autoComplete="email"`). |
| Select / Dropdown | Native `<select>` for forms (best mobile UX) or Radix Select with full keyboard nav. SC 2.1.1 keyboard. |
| Date picker | SC 2.1.1 arrow key navigation. SC 4.1.2 role/name/value for each cell. SC 2.4.7 focus visible. SC 1.3.5 `autocomplete="bday"` where applicable. |
| Checkbox / Radio | Native HTML elements styled via custom; `<fieldset>` + `<legend>` for groups. SC 3.3.2 visible label. |
| Number stepper | SC 4.1.2 `aria-label` per button. SC 4.1.3 announce count change via `aria-live="polite"`. |
| Toggle | SC 4.1.2 `role="switch"` + `aria-checked`. SC 1.4.1 don't use colour alone — include text or icon. |
| Tooltip | SC 2.1.1 keyboard focus reveals tooltip. SC 1.4.13 dismissible (Esc), hoverable, persistent (until trigger blurs). |
| Modal | SC 2.4.3 focus order trapped. SC 2.1.2 no keyboard trap on close. SC 4.1.2 `aria-modal`, `aria-labelledby`. |
| Sheet | Same as Modal + SC 2.5.4 motion: drag-dismiss has alternative (× close button). |
| Tabs | SC 2.1.1 arrow keys move tabs. SC 4.1.2 `role="tablist"` / `role="tab"` / `role="tabpanel"`. |
| Accordion | SC 4.1.2 `aria-expanded`. SC 2.4.7 focus visible on trigger. |
| Carousel (Gallery / Review) | SC 2.2.2 pause/stop/hide control. SC 2.3.3 auto-pause on `prefers-reduced-motion`. |
| Video | SC 1.2.2 captions. SC 1.2.5 audio description. SC 2.1.1 keyboard controls. SC 1.4.2 audio control. |
| Mega menu | SC 2.1.1 click-to-open (per brief). SC 2.1.2 Esc closes, focus returns to trigger. |
| Booking flow | SC 3.3.4 error prevention — confirm step before payment. SC 1.3.5 autocomplete on all guest fields. SC 3.3.7 redundant entry — don't re-ask info from previous step. |
| AI concierge | SC 4.1.3 announce new messages via `aria-live="polite"`. SC 2.1.1 keyboard input. SC 1.4.4 resizable text in chat. |

Global: All components must pass at 200% browser zoom (SC 1.4.4) and 400% reflow at 320px width (SC 1.4.10). Focus indicators meet SC 2.4.13 Focus Appearance (≥2px outline, ≥3:1 contrast against adjacent colours).

---

## 11. Motion Guidance per Component

| Component | Motion |
|---|---|
| Button hover | Background colour 200ms ease-out-luxury. No transform. |
| Card hover | Image scales 1.02 over 700ms. Text static. |
| Image load | Opacity 0 → 1 over 800ms ease-out-luxury (theatrical fade). |
| Hero load | Headline fades up 8px over 1200ms with 200ms stagger to CTA. |
| Mega menu open | Panel slides down 600ms; scrim fades 400ms. |
| Mobile nav | Full-screen slide right 700ms ease-out-luxury. |
| Modal open | Scale 0.98 → 1 + opacity 0 → 1 over 400ms. |
| Sheet (mobile) | Slide up from bottom 500ms ease-out-luxury. |
| Tabs underline | Slide between active tabs 300ms ease-out-luxury. |
| Accordion open | Height transition 500ms ease-out-luxury with content opacity stagger. |
| Date picker | Open with 400ms fade + 8px translateY. |
| Toast | Slide in from bottom (mobile) / right (desktop) 300ms, dismiss 200ms. |
| Skeleton | Continuous 1.5s shimmer sweep. |
| Spinner | 1.2s linear rotation, single arc. |
| Number stepper | Count change has 200ms scale 1.0 → 1.1 → 1.0 pulse. |
| Cart count badge | New item: 400ms scale 0.8 → 1.2 → 1.0 with ease-organic. |
| Animated counter (sustainability dashboard) | Count-up over 1500ms when in viewport. |
| AI concierge pulse | 30s loop, 600ms scale 1.0 → 1.05 → 1.0. |
| Ken Burns hero image | 20s linear scale 1.0 → 1.05 alternating. |

**Reduced motion override:** All motion >= 200ms duration must check `prefers-reduced-motion: reduce` and either disable or shorten to instant fades. Provide a single utility hook `useReducedMotion()` that returns boolean.

---

## 12. Mobile / Desktop Variants

Mobile-first build always. Desktop adds:
- More columns (1 → 2 → 3) for card grids.
- Persistent navigation (vs. hamburger).
- Side drawers (vs. bottom sheets).
- Hover states (vs. nothing — never use hover for critical info).
- Mega menus (vs. accordion mobile nav).
- Two-month date pickers (vs. single-month).
- Wider line-lengths but capped at 75ch for readability.

Touch targets across all viewports: ≥44×44px. Input font-size ≥16px to prevent iOS auto-zoom. No horizontal scroll at 320px width. See `audit-100-mobile-responsive` skill for the detailed gates.

---

## 13. Dark Mode

**Decision: Light mode only at MVP.**

The Coastal Editorial system DESIGN-REFERENCE explicitly states "No dark mode (client decision — light only)." The Core UI Architecture Brief mentions an aspirational "Day/Night switch" tied to time of day, but this is a V2+ feature and contradicts the approved direction.

The Elysium synthesis ("paper-and-timber dominant, dark accent only") indicates that when dark mode does ship in V2, it should:
- Use `--color-secondary` (deep sage) as a near-black foundation, not pure black.
- Invert the surface ramp: `surface-container-highest` becomes darkest, `surface` becomes a deep sage-tinted near-black (`#1a201d`).
- Keep cognac CTAs at the same hex value — they read beautifully on dark.
- Use `--color-accent-bone` for body text (warm off-white, not pure white) at 90% opacity.
- Swap hero imagery to twilight / fireside variants where assets exist.

But this is **future scope**. MVP ships `<html data-theme="light">` with no toggle. Build all components with CSS custom properties (not hard-coded hex) so the V2 dark theme swap is a single token-file change, not a component rewrite.

---

## 14. Closing

This specification is the contract between design and engineering. Any component not on this list requires a written brand-fit justification before being added. Conversely, every component on this list must be Storybook-documented, axe-passing, and brand-reviewed before being merged into the design system package.

Owners:
- **Design system librarian:** Approves all token changes, gates Storybook PR merges.
- **Engineering lead:** Owns build order, dependency hygiene, and the design system NPM package.
- **QA / a11y lead:** Owns the axe-core CI gate and manual screen-reader testing per release.

The goal is not a generic component library. The goal is the **only** component library that could only have been built for Whalesborough — sharp-cornered, sage-anchored, cognac-restrained, Newsreader-voiced, and breathing with editorial white space.

When in doubt: less. Slower. More space. Older typography. Less colour. Fewer rounded corners. More photograph. That is the brand.
