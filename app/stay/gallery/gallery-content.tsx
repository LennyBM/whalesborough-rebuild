"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  { src: "/images/gallery/gallery-001.webp", width: 800, height: 1200, caption: "The Farmhouse kitchen" },
  { src: "/images/gallery/gallery-002.webp", width: 1200, height: 800, caption: "Estate at golden hour" },
  { src: "/images/gallery/gallery-003.webp", width: 800, height: 1000, caption: null },
  { src: "/images/gallery/gallery-004.webp", width: 1200, height: 800, caption: "Morning light, Spa Lodge" },
  { src: "/images/general/indoor-pool.webp", width: 1200, height: 800, caption: "Indoor pool" },
  { src: "/images/gallery/gallery-005.webp", width: 800, height: 1200, caption: null },
  { src: "/images/gallery/gallery-006.webp", width: 1200, height: 900, caption: "Widemouth Bay from the clifftop" },
  { src: "/images/general/cottage-lounge.webp", width: 1200, height: 800, caption: "Cottage living room" },
  { src: "/images/gallery/gallery-007.webp", width: 800, height: 1100, caption: null },
  { src: "/images/gallery/gallery-008.webp", width: 1200, height: 800, caption: "Lakeside at dusk" },
  { src: "/images/spa/spa-interior.webp", width: 1200, height: 900, caption: "The spa — hydrotherapy suite" },
  { src: "/images/gallery/gallery-009.webp", width: 800, height: 1200, caption: null },
  { src: "/images/general/cottage-interior.webp", width: 1200, height: 800, caption: "Heritage cottage bedroom" },
  { src: "/images/gallery/gallery-010.webp", width: 800, height: 1000, caption: "Market garden in bloom" },
  { src: "/images/general/outdoor-pool.webp", width: 1200, height: 800, caption: "Outdoor pool" },
  { src: "/images/gallery/gallery-011.webp", width: 1200, height: 900, caption: null },
  { src: "/images/gallery/gallery-012.webp", width: 800, height: 1200, caption: "The estate from above" },
];

export function GalleryContent() {
  return (
    <>
      {/* Heading */}
      <section className="bg-background">
        <div className="mx-auto max-w-hero px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            A glimpse of life on the estate
          </p>
          <h1 className="heading-editorial mt-6 text-display-md text-on-surface">
            Gallery
          </h1>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {galleryImages.map((image, i) => (
              <motion.div
                key={image.src}
                className="break-inside-avoid mb-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 4) * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="group relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.caption || "Whalesborough estate"}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="p-4 font-sans text-sm text-white/90">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
