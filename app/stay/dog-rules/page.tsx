import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Bringing your dog",
  description: "Twenty-three of our properties are dog-friendly. Here's how it works.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Dog policy"
      title="Bringing your dog"
      description="Twenty-three of our properties are dog-friendly. Here's how it works."
    />
  );
}
