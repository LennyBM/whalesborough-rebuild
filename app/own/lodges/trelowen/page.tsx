import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Trelowen Lodges",
  description: "Two-bedroom lodges from £425,000.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge · The Trelowen Collection"
      title="Trelowen Lodges"
      description="Two-bedroom lodges from £425,000."
    />
  );
}
