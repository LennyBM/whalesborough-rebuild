import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Gwelva Lodges",
  description: "Coastal-view lodges from £525,000.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge · The Gwelva Collection"
      title="Gwelva Lodges"
      description="Coastal-view lodges from £525,000."
    />
  );
}
