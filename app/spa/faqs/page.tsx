import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Spa questions",
  description: "Pregnancy, contraindications, dress code, what's included.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The W Club · FAQs"
      title="Spa questions"
      description="Pregnancy, contraindications, dress code, what's included."
    />
  );
}
