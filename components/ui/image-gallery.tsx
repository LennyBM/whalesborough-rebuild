"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "./image-lightbox";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  /** Maximum thumbnails to show before "View all" button. Default 5 (1 hero + 4 grid) */
  maxVisible?: number;
}

export function ImageGallery({ images, maxVisible = 5 }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (images.length === 0) return null;

  const visibleImages = images.slice(0, maxVisible);
  const hasMore = images.length > maxVisible;

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* First image — full width */}
        <button
          onClick={() => openLightbox(0)}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </button>

        {/* Grid of remaining thumbnails */}
        {visibleImages.length > 1 && (
          <div className="grid grid-cols-2 gap-2">
            {visibleImages.slice(1).map((image, i) => (
              <button
                key={image.src}
                onClick={() => openLightbox(i + 1)}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </button>
            ))}
          </div>
        )}

        {/* View all button */}
        {hasMore && (
          <button
            onClick={() => openLightbox(0)}
            className="mt-1 w-full rounded-xl border border-surface-container py-2.5 text-center font-body text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
          >
            View all {images.length} photos
          </button>
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
