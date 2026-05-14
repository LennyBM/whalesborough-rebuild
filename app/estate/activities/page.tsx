import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Activities",
  description: "Farm tours, fishing, mountain biking, swimming, foraging.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Estate · Activities"
      title="Activities"
      description="Farm tours, fishing, mountain biking, swimming, foraging."
    />
  );
}
