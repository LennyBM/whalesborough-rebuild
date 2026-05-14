import { serve } from "inngest/next";

import { inngest, functions } from "@/lib/inngest/client";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

export const runtime = "nodejs";
