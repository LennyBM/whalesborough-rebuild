import "server-only";
import Stripe from "stripe";

/**
 * Stripe server SDK. Pinned API version per Stripe-recommended discipline.
 *
 * Lazily constructed so that build-time route collection doesn't blow up
 * when STRIPE_SECRET_KEY is unset (e.g. CI deploy preview without secrets).
 *
 * Wave 2 will wire:
 *  - Payment Element for accommodation bookings
 *  - Connect for spa / dine cross-sell revenue routing
 *  - Stripe Tax (UK VAT 20% on dine, exempt on accommodation/spa)
 *  - Klarna PMs after FCA approval (15 July 2026)
 */
let _stripe: Stripe | null = null;

function getStripeInstance(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local before calling Stripe.",
    );
  }
  _stripe = new Stripe(key, {
    // Pinned to the API version shipped with the installed `stripe` SDK.
    // When upgrading the SDK, also bump this string deliberately.
    apiVersion: "2025-02-24.acacia",
    typescript: true,
    appInfo: {
      name: "Whalesborough Booking Platform",
      version: "1.0.0",
    },
  });
  return _stripe;
}

/**
 * Proxy-based export so callers can `import { stripe } from "@/lib/stripe/server"`
 * and use it like the SDK — but instantiation only happens on first use.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getStripeInstance();
    const value = Reflect.get(instance, prop, instance);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
