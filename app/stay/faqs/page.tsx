import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Stay questions",
  description: "Everything from check-in times to where the dog bowls are kept.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="FAQs"
      title="Stay questions"
      description="Everything from check-in times to where the dog bowls are kept."
    />
  );
}
