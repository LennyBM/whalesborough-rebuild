import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Book a treatment",
  description: "Choose your ritual, your therapist and your moment.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The W Club · Booking"
      title="Book a treatment"
      description="Choose your ritual, your therapist and your moment."
    />
  );
}
