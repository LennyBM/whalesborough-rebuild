import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Spa",
  description: "An indoor pool, a gym overlooking the lakes, and a treatment menu drawn from the estate.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The W Club"
      title="Spa"
      description="An indoor pool, a gym overlooking the lakes, and a treatment menu drawn from the estate."
    />
  );
}
