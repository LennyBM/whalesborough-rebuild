import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Complaints Procedure",
  description: "Formal data-protection complaints procedure (DUAA, in force 19 June 2026).",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Complaints Procedure"
      description="Formal data-protection complaints procedure (DUAA, in force 19 June 2026)."
    />
  );
}
