import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Holiday Treats",
  description: "Hampers, grocery boxes, fresh-baked bread on arrival.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Add-ons"
      title="Holiday Treats"
      description="Hampers, grocery boxes, fresh-baked bread on arrival."
    />
  );
}
