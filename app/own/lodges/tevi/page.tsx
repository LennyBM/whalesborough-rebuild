import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Tevi Lodges",
  description: "Three-bedroom waterside lodges from £750,000.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge · The Tevi Collection"
      title="Tevi Lodges"
      description="Three-bedroom waterside lodges from £750,000."
    />
  );
}
