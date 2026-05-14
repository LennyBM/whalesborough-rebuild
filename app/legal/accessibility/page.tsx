import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Our commitment to WCAG 2.2 Level AA conformance.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Accessibility Statement"
      description="Our commitment to WCAG 2.2 Level AA conformance."
    />
  );
}
