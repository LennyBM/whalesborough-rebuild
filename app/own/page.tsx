import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Own a lodge at Whalesborough",
  description: "A small number of architect-designed lodges. Lifestyle purchases with rental income potential.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership"
      title="Own a lodge at Whalesborough"
      description="A small number of architect-designed lodges. Lifestyle purchases with rental income potential."
    />
  );
}
