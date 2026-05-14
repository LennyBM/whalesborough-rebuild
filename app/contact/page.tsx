import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Phone, email, address, opening hours.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Contact us"
      description="Phone, email, address, opening hours."
    />
  );
}
