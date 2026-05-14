import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Restaurant questions",
  description: "Dietary requirements, accessibility, dogs, dress code.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir · FAQs"
      title="Restaurant questions"
      description="Dietary requirements, accessibility, dogs, dress code."
    />
  );
}
