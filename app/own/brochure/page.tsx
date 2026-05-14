import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Request the brochure",
  description: "Sixty pages. Site plans, floor plans, finishes, costs.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership"
      title="Request the brochure"
      description="Sixty pages. Site plans, floor plans, finishes, costs."
    />
  );
}
