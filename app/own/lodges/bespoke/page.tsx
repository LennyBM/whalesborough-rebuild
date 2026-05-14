import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Bespoke Lodges",
  description: "Design your own from £399,000.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge · Bespoke"
      title="Bespoke Lodges"
      description="Design your own from £399,000."
    />
  );
}
