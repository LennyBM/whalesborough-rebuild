import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Eighty-minute rituals and ninety-minute journeys. Drawn from Cornish botanicals.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The W Club · Rituals"
      title="Treatments"
      description="Eighty-minute rituals and ninety-minute journeys. Drawn from Cornish botanicals."
    />
  );
}
