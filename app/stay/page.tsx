import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Stay at Whalesborough",
  description: "Twenty-seven cottages, twenty-two Arvor Suites and a pair of spa lodges. Find your stay below.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Accommodation"
      title="Stay at Whalesborough"
      description="Twenty-seven cottages, twenty-two Arvor Suites and a pair of spa lodges. Find your stay below."
    />
  );
}
