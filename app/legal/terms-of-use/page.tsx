import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Whalesborough website and booking platform.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Use"
      description="Terms for using the Whalesborough website and booking platform."
    />
  );
}
