import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Spa Products",
  description: "Botanicals to take home. Our partners and our own line.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The W Club · Shop"
      title="Spa Products"
      description="Botanicals to take home. Our partners and our own line."
    />
  );
}
