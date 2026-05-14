import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Cornish suppliers, open fires, an estate that grows much of what arrives on the plate.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir"
      title="Restaurant"
      description="Cornish suppliers, open fires, an estate that grows much of what arrives on the plate."
    />
  );
}
