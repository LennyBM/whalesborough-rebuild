import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "You're booked",
  description: "Confirmation reference and what happens next.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Booking confirmed"
      title="You're booked"
      description="Confirmation reference and what happens next."
    />
  );
}
