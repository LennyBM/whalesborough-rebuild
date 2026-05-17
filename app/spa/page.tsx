import type { Metadata } from "next";

import { SpaContent } from "./spa-content";

export const metadata: Metadata = {
  title: "The W Club Spa | Whalesborough",
  description:
    "An indoor infinity pool, thermal suite, outdoor heated hot tubs and a treatment menu drawn from Cornish botanicals. The W Club Spa at Whalesborough Farm Resort, North Cornwall.",
  openGraph: {
    title: "The W Club Spa | Whalesborough",
    description:
      "Indoor pool overlooking the lakes, thermal suite, Cornish botanical treatments. Luxury wellness on a 500-acre estate.",
    images: ["/images/spa/pool-shoot.webp"],
  },
};

export default function SpaPage() {
  return <SpaContent />;
}
