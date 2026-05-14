import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Payment",
  description: "Secure card payment, Apple Pay, Google Pay. Klarna available from Q2 2026.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Booking · Step 5 of 5"
      title="Payment"
      description="Secure card payment, Apple Pay, Google Pay. Klarna available from Q2 2026."
    />
  );
}
