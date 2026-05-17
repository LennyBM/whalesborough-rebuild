import type { Metadata } from "next";
import { BackButton } from "@/components/app-shell/back-button";
import { GalleryContent } from "./gallery-content";

export const metadata: Metadata = {
  title: "Gallery | Whalesborough Farm Resort & Spa, Cornwall",
  description:
    "Explore the estate through our gallery — rolling countryside, heritage cottages, lakeside suites, spa and restaurant imagery from five hundred acres above Widemouth Bay.",
};

export default function GalleryPage() {
  return (
    <>
      <div className="mx-auto max-w-content px-6 pt-24 lg:px-12 lg:pt-40">
        <BackButton label="Back to Stay" href="/stay" />
      </div>
      <GalleryContent />
    </>
  );
}
