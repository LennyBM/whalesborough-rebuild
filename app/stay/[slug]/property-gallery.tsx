"use client";

import { ImageGallery } from "@/components/ui/image-gallery";

interface PropertyGalleryProps {
  propertyName: string;
  heroImage: string;
}

/**
 * Generates a set of gallery images for a property.
 * Uses the property hero image plus shared estate/interior shots.
 */
function buildGalleryImages(propertyName: string, heroImage: string) {
  return [
    { src: heroImage, alt: `${propertyName} exterior` },
    { src: "/images/general/cottage-interior.webp", alt: `${propertyName} bedroom` },
    { src: "/images/general/cottage-lounge.webp", alt: `${propertyName} living area` },
    { src: "/images/general/indoor-pool.webp", alt: "Estate indoor pool" },
    { src: "/images/general/outdoor-pool.webp", alt: "Estate outdoor pool" },
    { src: "/images/gallery/gallery-001.webp", alt: `${propertyName} kitchen` },
    { src: "/images/gallery/gallery-002.webp", alt: "Estate at golden hour" },
    { src: "/images/gallery/gallery-004.webp", alt: "Morning light on the estate" },
    { src: "/images/spa/spa-interior.webp", alt: "The W Club Spa" },
    { src: "/images/gallery/gallery-006.webp", alt: "Widemouth Bay from the clifftop" },
    { src: "/images/gallery/gallery-008.webp", alt: "Lakeside at dusk" },
    { src: "/images/gallery/gallery-010.webp", alt: "Market garden in bloom" },
  ];
}

export function PropertyGallery({ propertyName, heroImage }: PropertyGalleryProps) {
  const images = buildGalleryImages(propertyName, heroImage);

  return (
    <div className="px-4 mt-6">
      <h2 className="font-display text-lg italic text-on-surface mb-3">Photos</h2>
      <ImageGallery images={images} maxVisible={5} />
    </div>
  );
}
