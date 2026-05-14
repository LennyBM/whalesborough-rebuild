import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe/server";

/**
 * Stripe webhook handler — signature-verified ingestion of payment events.
 *
 * Wave 2 will dispatch to Inngest handlers for:
 *  - payment_intent.succeeded → finalise booking
 *  - payment_intent.payment_failed → release inventory hold
 *  - charge.refunded → adjust booking + accounting
 *  - customer.subscription.* → spa membership lifecycle
 */
export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  // Wave 2: dispatch event.type to typed handlers.
  // For now, just acknowledge so the Stripe CLI / dashboard reports success.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[stripe] received ${event.type} (${event.id})`);
  }

  return NextResponse.json({ received: true, type: event.type });
}
