import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Begin your booking",
  description: "Five steps. Twelve minutes. Confirmed in one transaction.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Booking"
      title="Begin your booking"
      description="Five steps. Twelve minutes. Confirmed in one transaction."
    />
  );
}
