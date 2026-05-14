import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Availability",
  description: "Search live availability across all units.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Accommodation"
      title="Availability"
      description="Search live availability across all units."
    />
  );
}
