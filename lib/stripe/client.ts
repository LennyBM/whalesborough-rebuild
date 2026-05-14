"use client";

import { type Stripe, loadStripe } from "@stripe/stripe-js";

import { env } from "@/lib/env";

/**
 * Memoised loadStripe — call once per session.
 * Use inside `<Elements stripe={getStripe()}>` at the booking root.
 */
let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
}
