/**
 * The W Club — Spa & Wellness sub-brand of Whalesborough.
 *
 * Position
 * --------
 * A cooler, quieter, water-led counter to the parent Coastal Editorial system.
 * Less farm, more pool / sauna / candle. Adult-only by default.
 *
 * Identity rules
 * --------------
 *  - Italic Newsreader "W" is the standalone mark.
 *  - "The W Club" is the full lockup; "Spa & Wellness" is the subtitle.
 *  - Cool accent (#5a7a82 — glacial grey-blue, evokes pool water) for
 *    in-spa secondary actions, dividers and underlines.
 *  - Parent cognac (#703a1d) is retained for cross-brand "Book" CTAs to
 *    keep the transactional moment recognisable across the estate.
 *  - Background is cooler than parent: #f7f6f4 vs the estate's #fbf9f6.
 *  - Type stack is unchanged — same Newsreader + Plus Jakarta Sans — but
 *    H1s on spa pages are italic (where the parent is roman). Single,
 *    unmistakable register shift.
 *  - Texture vocabulary: basalt, sea kelp, jade, warm stone, lavender,
 *    cold-plunge contrast.
 */

export const wClubBrand = {
  name: "The W Club",
  wordmark: "W", // italic Newsreader
  full: "The W Club",
  subtitle: "Spa & Wellness",
  parent: "Whalesborough",
  lockup: "The W Club · Spa & Wellness",

  // The palette
  colors: {
    /** Cool counter to the parent cognac — glacial grey-blue, pool-water. */
    accent: "#5a7a82",
    accentHover: "#4d6970",
    accentPressed: "#3f5860",
    /** A still-cooler shade for hairline rules and divider washes. */
    accentMuted: "#dbe3e5",
    /** Slightly cooler background than parent #fbf9f6. */
    tint: "#f7f6f4",
    /** Background card surfaces inside the spa register. */
    card: "#ffffff",
    /** Adult-quiet hours and water-status strip background. */
    deep: "#2f4148",
  },

  // Type — same families, italic display register at H1.
  fonts: {
    display: "var(--font-newsreader), Georgia, serif",
    body: "var(--font-jakarta), system-ui, sans-serif",
    /** H1 only — italic Newsreader; body & sub-headings remain roman. */
    displayItalic: "var(--font-newsreader), Georgia, serif",
  },

  // Voice rules (applied at spa scope only)
  voice: {
    /** Always "rituals" — never "treatments" in user-facing copy. */
    preferredNouns: { treatments: "rituals" },
    /** Words we never write. */
    forbidden: [
      "indulge",
      "pamper",
      "treat yourself",
      "spa experience",
      "me time",
      "guilt-free",
    ],
    /** Sensory anchors — use these instead of filler. */
    anchors: [
      "warm basalt",
      "the dry-down of rose otto",
      "sea kelp",
      "cold-plunge contrast",
      "jade roller",
      "lavender from the market garden",
    ],
  },

  // Operational facts (used on the live status strip)
  facilities: {
    indoorPoolTemp: "29.4°C",
    outdoorPoolTemp: "26.0°C",
    saunaStatus: "at temperature",
    adultQuietHours: {
      weekday: { am: "7-9am", pm: "5-7pm" },
      weekend: { am: "8-9am", pm: "6-7pm" },
    },
  },
} as const;

/**
 * CSS custom properties applied to `<body data-brand="w-club">`.
 * Pair with the `data-brand="w-club"` selectors in globals.css.
 */
export const wClubTokens = {
  "--w-club-accent": wClubBrand.colors.accent,
  "--w-club-accent-hover": wClubBrand.colors.accentHover,
  "--w-club-accent-pressed": wClubBrand.colors.accentPressed,
  "--w-club-accent-muted": wClubBrand.colors.accentMuted,
  "--w-club-tint": wClubBrand.colors.tint,
  "--w-club-card": wClubBrand.colors.card,
  "--w-club-deep": wClubBrand.colors.deep,
} as const;

/** Convenience: convert tokens to a React style object. */
export function wClubStyle(): React.CSSProperties {
  return wClubTokens as unknown as React.CSSProperties;
}

export type WClubBrand = typeof wClubBrand;
