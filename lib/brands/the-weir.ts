/**
 * The Weir — Restaurant sub-brand of Whalesborough.
 *
 * Position
 * --------
 * A warmer, kitchen-led counter to the parent Coastal Editorial system.
 * Lakeside fire, paddock-to-plate honesty, considered restraint.
 * The destination restaurant in its own right, but unmistakably part of
 * the estate.
 *
 * Identity rules
 * --------------
 *  - Italic Newsreader "The Weir" is the wordmark. A small underscore-rule
 *    line beneath the wordmark evokes the lake's surface and a menu-card
 *    rule.
 *  - "Restaurant at Whalesborough" is the subtitle.
 *  - Warm amber-copper accent (#a86b3d — evokes log-fire embers, the
 *    golden crust on a roast) for in-restaurant secondary actions,
 *    supplier highlights and signature underscores.
 *  - Parent cognac (#703a1d) is retained for the cross-brand "Reserve"
 *    transactional CTA so the booking moment stays recognisable.
 *  - Background is warmer than parent (#faf6ee) — softer cream, less
 *    clinical, evoking butter and old menu card.
 *  - Type stack is unchanged — same Newsreader + Plus Jakarta Sans — with
 *    menu item names rendered in italic Newsreader (especially when
 *    signature). Descriptions stay in Plus Jakarta Sans.
 *  - Texture vocabulary: slate roof, butter, charred edges, lake-surface
 *    ripple, oak smoke, fresh dough.
 *
 * Voice rules
 * -----------
 *  Paddock-to-plate, NEVER farm-to-table.
 *  Named producers with specific distances.
 *  No "delicious", "amazing", "mouth-watering", "indulge".
 *  Allergen language stays factual to UK Food Information Regulations 2014.
 *  "Reserve a table", not "Book your experience".
 */

export const theWeirBrand = {
  name: "The Weir",
  wordmark: "The Weir",
  full: "The Weir",
  subtitle: "Restaurant at Whalesborough",
  parent: "Whalesborough",
  lockup: "The Weir · Restaurant at Whalesborough",

  // Phone, email, address
  contact: {
    phone: "01288 362234",
    phoneDigits: "+441288362234",
    email: "theweir@whalesborough.co.uk",
    address: "The Weir, Whalesborough Farm, Marhamchurch, Bude, Cornwall",
    locality: "Marhamchurch, Bude, Cornwall",
  },

  // The palette
  colors: {
    /** Warm amber-copper — log-fire embers, golden roast crust. */
    accent: "#a86b3d",
    accentHover: "#8f5a31",
    accentPressed: "#754a28",
    /** Muted divider wash. */
    accentMuted: "#e8d8c5",
    /** Softer cream, warmer than parent #fbf9f6. */
    tint: "#faf6ee",
    /** Card surfaces inside the restaurant register. */
    card: "#ffffff",
    /** Deep slate-charcoal for the live status strip and supplier deep section. */
    deep: "#2b211a",
    /** Subtle warm cream for tonal layering. */
    tintDeep: "#f3eddf",
  },

  // Type — same families, italic display register for menu items + H1s.
  fonts: {
    display: "var(--font-newsreader), Georgia, serif",
    body: "var(--font-jakarta), system-ui, sans-serif",
    displayItalic: "var(--font-newsreader), Georgia, serif",
  },

  // Voice rules (applied at /dine scope only)
  voice: {
    /** The non-negotiable phrase. */
    preferredNouns: {
      "farm-to-table": "paddock-to-plate",
    },
    /** Words we never write. */
    forbidden: [
      "delicious",
      "amazing",
      "mouth-watering",
      "indulge",
      "treat yourself",
      "to-die-for",
      "tantalising",
    ],
    /** Sensory anchors — use these instead of filler. */
    anchors: [
      "lakeside terrace",
      "log fire",
      "duck-fat roast potatoes",
      "charred over the parilla",
      "warm scone, clotted cream",
      "Cornish smoked oak",
    ],
  },

  // Operational facts (used on the live status strip)
  service: {
    breakfast: { from: "08:30", to: "11:00", label: "Breakfast" },
    lunch: { from: "12:00", to: "16:00", label: "Lunch" },
    sundayRoast: { from: "12:00", to: "17:00", label: "Sunday Roast" },
    dinner: {
      from: "17:00",
      to: "21:00",
      label: "Dinner",
      note: "Summer Fridays and Saturdays only",
    },
    creamTeasUntil: "16:30",
  },

  // Headline trust / sourcing claims
  sourcing: {
    radiusMiles: 5,
    claimPercent: 90,
    suppliersNamed: 15,
  },

  // The six recurring event types
  events: [
    {
      slug: "grill-and-chill",
      title: "Grill and Chill",
      when: "Fortnightly Fridays · May to September",
      from_pence: 1800,
    },
    {
      slug: "supper-club",
      title: "Supper Club",
      when: "One Thursday a month · 24 covers",
      from_pence: 5500,
    },
    {
      slug: "galentines",
      title: "Galentine's: Sip, Spa, Paint",
      when: "Daily · 10th to 28th February",
      from_pence: 9500,
    },
    {
      slug: "easter",
      title: "Easter at The Weir",
      when: "Good Friday to Easter Monday",
      from_pence: null,
    },
    {
      slug: "music-with-yazzy",
      title: "Music with Yazzy",
      when: "Selected Saturdays · Summer",
      from_pence: 0,
    },
    {
      slug: "sunday-roast",
      title: "Sunday Roast",
      when: "Every Sunday · 12:00 to 17:00",
      from_pence: 1950,
    },
  ],

  // Lakeside Locals membership
  locals: {
    annualFeePence: 3500,
    discountPercent: 10,
    bookingWindowDays: { member: 60, public: 30 },
    benefits: [
      "10% off your bill, every visit, every day",
      "First refusal on event tickets · seven days before public release",
      "60-day booking window vs 30 days public",
      "A fresh Monday offer in the app every week",
      "Birthday treat: a free dessert or coffee on the day",
      "Digital card in Apple or Google Wallet",
    ],
  },
} as const;

/**
 * CSS custom properties applied to `<body data-brand="the-weir">`.
 * Pair with the `[data-brand="the-weir"]` selectors in globals.css.
 */
export const theWeirTokens = {
  "--weir-accent": theWeirBrand.colors.accent,
  "--weir-accent-hover": theWeirBrand.colors.accentHover,
  "--weir-accent-pressed": theWeirBrand.colors.accentPressed,
  "--weir-accent-muted": theWeirBrand.colors.accentMuted,
  "--weir-tint": theWeirBrand.colors.tint,
  "--weir-tint-deep": theWeirBrand.colors.tintDeep,
  "--weir-card": theWeirBrand.colors.card,
  "--weir-deep": theWeirBrand.colors.deep,
} as const;

/** Convenience: convert tokens to a React style object. */
export function theWeirStyle(): React.CSSProperties {
  return theWeirTokens as unknown as React.CSSProperties;
}

export type TheWeirBrand = typeof theWeirBrand;
