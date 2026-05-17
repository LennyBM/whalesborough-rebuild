import type { Metadata } from "next";

import { OwnPageContent } from "./own-page-content";

export const metadata: Metadata = {
  title: "Own a Lodge | Whalesborough Farm Resort & Spa",
  description:
    "A small number of architect-designed lodges across four collections on a 500-acre Cornish estate. Lifestyle ownership with projected rental yields of 5-7% net.",
  openGraph: {
    title: "Own a Lodge | Whalesborough Farm Resort & Spa",
    description:
      "Four collections of architect-designed lodges on the North Cornwall coast. From £285,000.",
    images: ["/images/general/estate-aerial.webp"],
  },
};

export default function Page() {
  return <OwnPageContent />;
}
