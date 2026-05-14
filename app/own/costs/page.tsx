import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Costs & charges",
  description: "Pitch fees, utilities, service charges. Transparent and itemised.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership"
      title="Costs & charges"
      description="Pitch fees, utilities, service charges. Transparent and itemised."
    />
  );
}
