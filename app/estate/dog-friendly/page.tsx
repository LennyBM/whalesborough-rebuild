import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Dog Friendly",
  description: "Twenty-three dog-friendly cottages and the entire estate to roam.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Estate"
      title="Dog Friendly"
      description="Twenty-three dog-friendly cottages and the entire estate to roam."
    />
  );
}
