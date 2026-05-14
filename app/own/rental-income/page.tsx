import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Rental income potential",
  description: "Subletting your lodge — what's possible, what's not guaranteed.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership"
      title="Rental income potential"
      description="Subletting your lodge — what's possible, what's not guaranteed."
    />
  );
}
