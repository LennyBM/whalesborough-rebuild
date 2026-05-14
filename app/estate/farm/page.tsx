import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "The Farm",
  description: "How a working estate produces what arrives on the table.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Estate"
      title="The Farm"
      description="How a working estate produces what arrives on the table."
    />
  );
}
