import { serve } from "inngest/next";

import { inngest } from "@/lib/inngest/client";
import {
  bookingConfirmed,
  lodgeLeadCreated,
  newsletterSubscribed,
  preArrival,
  postStayReview,
} from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    bookingConfirmed,
    lodgeLeadCreated,
    newsletterSubscribed,
    preArrival,
    postStayReview,
  ],
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

export const runtime = "nodejs";
