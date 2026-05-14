import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Journal",
  description: "Seasonal writing from the estate, the kitchen and the spa.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Journal"
      title="Journal"
      description="Seasonal writing from the estate, the kitchen and the spa."
    />
  );
}
