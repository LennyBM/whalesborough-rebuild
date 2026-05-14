import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Estate Map",
  description: "An interactive 3D map of the estate. Walking distances and times included.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Estate"
      title="Estate Map"
      description="An interactive 3D map of the estate. Walking distances and times included."
    />
  );
}
