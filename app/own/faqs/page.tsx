import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Ownership questions",
  description: "Tax, restrictions, transfer, exit.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership · FAQs"
      title="Ownership questions"
      description="Tax, restrictions, transfer, exit."
    />
  );
}
