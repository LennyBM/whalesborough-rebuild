/**
 * Whalesborough Living — Lodge Sales sub-brand of Whalesborough.
 *
 * Position
 * --------
 * Property-deal grade. The serious, considered, ledger-paper register for
 * lodge ownership. NOT the warm hospitality register of the parent. Owners
 * are reading a 25-year decision — copy and surface treatment reflect that.
 *
 * Identity rules
 * --------------
 *  - Wordmark: "Whalesborough Living" in Newsreader **regular** (not italic).
 *    The roman register signals "property deal", not "holiday escape".
 *  - Subtitle: "Lodge Ownership at Whalesborough".
 *  - Forest deep-sage accent (#3d4a40) — architectural permanence,
 *    evergreen, weighted. Used for the sub-brand bar, in-section dividers
 *    and the secondary CTA outline.
 *  - Parent cognac (#703a1d) is retained for the primary "Book a viewing"
 *    CTA so the cross-estate transactional moment stays recognisable.
 *  - Background is warmer than parent (#f9f5ee) — paper-ledger feel,
 *    distinct from the parent #fbf9f6 and the cooler W Club #f7f6f4.
 *  - No "investment" language. Every figure that touches income carries
 *    the RiskPanel (FCA-compliant, ~150 words, capital-at-risk visible).
 *
 * Compliance
 * ----------
 *  Every income reference in lodge-sales-copy.md is marked
 *  [FCA REVIEW REQUIRED — specialist hospitality solicitor]. Pages that
 *  mention income render the FCAReviewPending banner in development and
 *  mount the <RiskPanel /> visibly (sticky on /own/rental-income).
 *  See: research/uk-compliance-security.md §5 — Financial Promotion Rules,
 *       research/content/lodge-sales-copy.md — full FCA-aware copy,
 *       research/lodge-sales-module-spec.md §0 compliance banner.
 */

export const whalesboroughLivingBrand = {
  name: "Whalesborough Living",
  wordmark: "Whalesborough Living", // Newsreader regular — NOT italic
  full: "Whalesborough Living",
  subtitle: "Lodge Ownership at Whalesborough",
  parent: "Whalesborough",
  lockup: "Whalesborough Living · Lodge Ownership",

  // The palette
  colors: {
    /** Forest deep-sage — architectural permanence, the weighted counter. */
    accent: "#3d4a40",
    accentHover: "#323d36",
    accentPressed: "#28312c",
    /** Muted divider wash. */
    accentMuted: "#d6dcd8",
    /** Slightly warmer paper-ledger background, distinct from parent. */
    tint: "#f9f5ee",
    /** Card surfaces inside the ownership register. */
    card: "#ffffff",
    /** Deep ink for the sub-brand bar and risk-panel headings. */
    deep: "#1f2622",
    /** Cream surface for the RiskPanel (per lodge-sales-copy.md spec). */
    riskPanelBg: "#f2ebe0",
    /** Deep brown for RiskPanel text. */
    riskPanelText: "#3d2614",
  },

  // Type — same families, roman display register at H1.
  fonts: {
    display: "var(--font-newsreader), Georgia, serif",
    body: "var(--font-jakarta), system-ui, sans-serif",
  },

  // Voice rules (applied at /own scope only)
  voice: {
    /** Words we never write. */
    forbidden: [
      "investment",
      "investment opportunity",
      "guaranteed return",
      "guaranteed yield",
      "guaranteed rental income",
      "guaranteed income",
      "secure investment",
      "high yield",
      "passive income stream",
    ],
    /** Safe substitutions. */
    preferredNouns: {
      investment: "purchase",
      yield: "rental income potential",
    },
    /** The legally safe framing. */
    framing: "Lifestyle purchase with rental income potential",
  },

  // The four ranges (lifted from lodge_models.json + lodge-sales-copy.md)
  ranges: [
    {
      slug: "trelowen",
      name: "Trelowen Exclusive Lodges",
      tagline: "The signature timber-frame range",
      fromPrice: 425000,
      bedroomRange: "2 / 3 / 4",
    },
    {
      slug: "tevi",
      name: "Tevi Luxury Lodges",
      tagline: "The eight-residence ultra-premium tier",
      fromPrice: 749950,
      bedroomRange: "3 / 4",
    },
    {
      slug: "gwelva",
      name: "Gwelva Luxury Villas",
      tagline: "Permanent-build four-bedroom villas",
      fromPrice: null, // POA
      bedroomRange: "4",
    },
    {
      slug: "bespoke",
      name: "Bespoke Lodges",
      tagline: "Designed to your brief",
      fromPrice: 399000,
      bedroomRange: "Design to spec",
    },
  ],
} as const;

/**
 * CSS custom properties applied to `<body data-brand="whalesborough-living">`.
 * Pair with the `[data-brand="whalesborough-living"]` selectors in globals.css.
 */
export const whalesboroughLivingTokens = {
  "--living-accent": whalesboroughLivingBrand.colors.accent,
  "--living-accent-hover": whalesboroughLivingBrand.colors.accentHover,
  "--living-accent-pressed": whalesboroughLivingBrand.colors.accentPressed,
  "--living-accent-muted": whalesboroughLivingBrand.colors.accentMuted,
  "--living-tint": whalesboroughLivingBrand.colors.tint,
  "--living-card": whalesboroughLivingBrand.colors.card,
  "--living-deep": whalesboroughLivingBrand.colors.deep,
  "--living-risk-bg": whalesboroughLivingBrand.colors.riskPanelBg,
  "--living-risk-text": whalesboroughLivingBrand.colors.riskPanelText,
} as const;

/** Convenience: convert tokens to a React style object. */
export function whalesboroughLivingStyle(): React.CSSProperties {
  return whalesboroughLivingTokens as unknown as React.CSSProperties;
}

export type WhalesboroughLivingBrand = typeof whalesboroughLivingBrand;
