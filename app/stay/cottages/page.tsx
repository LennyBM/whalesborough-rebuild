import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Cottages",
  description: "Traditional Cornish cottages, each individually furnished, set across the estate.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Accommodation · 27 properties"
      title="Cottages"
      description="Traditional Cornish cottages, each individually furnished, set across the estate."
    />
  );
}
