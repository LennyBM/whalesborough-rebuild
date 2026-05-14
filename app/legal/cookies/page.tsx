import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Equal-prominence Accept and Reject — DUAA 2025 compliant.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      description="Equal-prominence Accept and Reject — DUAA 2025 compliant."
    />
  );
}
