import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Whalesborough Estate",
  description: "Five hundred acres of pasture, woodland, lakes and clifftop.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Estate"
      title="Whalesborough Estate"
      description="Five hundred acres of pasture, woodland, lakes and clifftop."
    />
  );
}
