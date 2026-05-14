import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Your bookings",
  description: "Upcoming, past and cancelled bookings.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Account"
      title="Your bookings"
      description="Upcoming, past and cancelled bookings."
    />
  );
}
