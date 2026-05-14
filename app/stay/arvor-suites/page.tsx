import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Arvor Suites",
  description: "Contemporary suites with sea-air balconies and private parking.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Accommodation · 22 suites"
      title="Arvor Suites"
      description="Contemporary suites with sea-air balconies and private parking."
    />
  );
}
