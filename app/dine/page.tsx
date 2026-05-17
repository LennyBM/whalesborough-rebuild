import type { Metadata } from "next";

import { DineContent } from "./dine-content";

export const metadata: Metadata = {
  title: "The Weir Restaurant | Lakeside Dining at Whalesborough",
  description:
    "Lakeside restaurant on the Whalesborough estate. Open fire, Cornish suppliers, estate-grown produce. Lunch open to all — no reservation needed.",
  openGraph: {
    title: "The Weir Restaurant | Whalesborough Estate",
    description:
      "Honest Cornish food beside the lake. Open fire, market garden produce, day-boat fish. Lunch open to everyone.",
    images: ["/images/restaurant/weir-restaurant-exterior.webp"],
  },
};

export default function Page() {
  return <DineContent />;
}
