import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Spa Lodges",
  description: "Trelowen and Gwari — our two spa-equipped retreat lodges, each with a hot tub.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Accommodation · 2 lodges"
      title="Spa Lodges"
      description="Trelowen and Gwari — our two spa-equipped retreat lodges, each with a hot tub."
    />
  );
}
