import type { Config } from "tailwindcss";

/**
 * Coastal Editorial Design System
 * See research/component-library-spec.md for the canonical token reference.
 *
 * Hard rules:
 *  - 0px border radius universally (sharp editorial corners)
 *  - No 1px borders — separate content by tonal background shifts only
 *  - No decorative shadows — sage-tinted floating shadows only
 *  - 16px min font on mobile to prevent iOS zoom
 *  - Cognac (#703a1d) is reserved for CTAs ONLY
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./emails/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2.5rem",
        lg: "4rem",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        // Brand
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          pressed: "var(--color-primary-pressed)",
          disabled: "var(--color-primary-disabled)",
          fg: "var(--color-on-primary)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondary-hover)",
          pressed: "var(--color-secondary-pressed)",
          fg: "var(--color-on-secondary)",
        },

        // Surfaces (tonal layering, no borders)
        background: "var(--color-background)",
        surface: {
          DEFAULT: "var(--color-surface)",
          "container-lowest": "var(--color-surface-container-lowest)",
          "container-low": "var(--color-surface-container-low)",
          container: "var(--color-surface-container)",
          "container-high": "var(--color-surface-container-high)",
          "container-highest": "var(--color-surface-container-highest)",
        },

        // Text on surfaces
        "on-surface": {
          DEFAULT: "var(--color-on-surface)",
          variant: "var(--color-on-surface-variant)",
          muted: "var(--color-on-surface-muted)",
          disabled: "var(--color-on-surface-disabled)",
        },

        // Outline (use sparingly, ghost only)
        outline: {
          DEFAULT: "var(--color-outline)",
          variant: "var(--color-outline-variant)",
        },

        // Semantic — all stay within the sage/cognac family
        success: {
          DEFAULT: "var(--color-success)",
          fg: "#ffffff",
          container: "#e8efe9",
          "container-fg": "#1f3322",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          fg: "#ffffff",
          container: "#f4e6d4",
          "container-fg": "#4a2f10",
        },
        error: {
          DEFAULT: "var(--color-error)",
          fg: "#ffffff",
          container: "#f1dad5",
          "container-fg": "#3d160f",
        },
        info: {
          DEFAULT: "var(--color-info)",
          fg: "#ffffff",
          container: "#dde4e8",
          "container-fg": "#1a2730",
        },

        // Decorative accents
        accent: {
          gold: "var(--color-accent-gold)",
          bone: "var(--color-accent-bone)",
        },

        // Overlays
        overlay: {
          glass: "var(--color-overlay-glass)",
          scrim: "var(--color-overlay-scrim)",
          "image-tint": "var(--color-overlay-image-tint)",
        },

        // App shell — dark theme palette (Whoop-inspired)
        // Used in the (app) route group for the PWA experience.
        // Dark surface, muted text, accent = estate sage.
        app: {
          surface: "#0f1210",
          card: "#1a1f1c",
          "card-hover": "#222823",
          border: "#2d3530",
          "on-surface": "#f0ede9",
          muted: "#7a847e",
          accent: "#7ba68b",
          "accent-hover": "#6b9479",
        },
      },

      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },

      fontSize: {
        // Display
        "display-2xl": ["6.5rem", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "300" }],
        "display-xl": ["5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "300" }],
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "400" }],

        // Headings
        h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "400" }],
        h2: ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "400" }],
        h3: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "400" }],
        h4: ["1.25rem", { lineHeight: "1.35", fontWeight: "500" }],
        h5: ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }],
        h6: ["1rem", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "600" }],

        // Body
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55", fontWeight: "400" }],

        // Labels / utility
        caption: ["0.75rem", { lineHeight: "1.45", letterSpacing: "0.01em", fontWeight: "400" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
        "label-lg": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
        button: ["0.8125rem", { lineHeight: "1.0", letterSpacing: "0.12em", fontWeight: "500" }],
        overline: ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.15em", fontWeight: "600" }],
      },

      spacing: {
        "0": "0",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
        "32": "128px",
        "40": "160px",
        "48": "192px",
        "56": "224px",
        "64": "256px",
      },

      borderRadius: {
        none: "0",
        DEFAULT: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },

      boxShadow: {
        none: "none",
        float: "0 20px 50px rgba(74, 100, 87, 0.05)",
        "float-md": "0 30px 80px rgba(74, 100, 87, 0.07)",
        focus: "0 0 0 3px rgba(112, 58, 29, 0.25)",
      },

      zIndex: {
        base: "0",
        raised: "10",
        sticky: "100",
        popover: "200",
        tooltip: "300",
        drawer: "400",
        scrim: "499",
        modal: "500",
        "mega-menu": "550",
        toast: "600",
        concierge: "700",
      },

      transitionDuration: {
        instant: "100ms",
        fast: "200ms",
        base: "400ms",
        slow: "700ms",
        deliberate: "1200ms",
        theatrical: "2000ms",
      },

      transitionTimingFunction: {
        "out-luxury": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-luxury": "cubic-bezier(0.7, 0, 0.84, 0)",
        "in-out-silk": "cubic-bezier(0.65, 0, 0.35, 1)",
        organic: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      maxWidth: {
        content: "1280px",
        hero: "1440px",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ken-burns": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },

      animation: {
        "fade-in": "fade-in 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in-up": "fade-in-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 1.5s linear infinite",
        "ken-burns": "ken-burns 20s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
