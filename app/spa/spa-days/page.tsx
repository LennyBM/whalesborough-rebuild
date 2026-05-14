import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Spa Days",
  description: "Half-day, full-day and overnight spa packages.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The W Club · Packages"
      title="Spa Days"
      description="Half-day, full-day and overnight spa packages."
    />
  );
}
