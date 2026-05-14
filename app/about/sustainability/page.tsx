import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Our wind turbine, our bees, our microplastic filters — measured and published.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="About · B Corp pending"
      title="Sustainability"
      description="Our wind turbine, our bees, our microplastic filters — measured and published."
    />
  );
}
