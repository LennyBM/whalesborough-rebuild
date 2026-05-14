import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Finding us",
  description: "Driving, parking, public transport, EV charging.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Finding us"
      description="Driving, parking, public transport, EV charging."
    />
  );
}
