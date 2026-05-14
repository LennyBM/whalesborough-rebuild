import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "The process",
  description: "Reservation, design, build, completion — typically nine to twelve months.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership"
      title="The process"
      description="Reservation, design, build, completion — typically nine to twelve months."
    />
  );
}
