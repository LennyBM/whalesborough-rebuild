import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Whalesborough Farm Resort & Spa, Cornwall",
  description:
    "Explore the estate through our gallery — rolling countryside, heritage cottages, lakeside suites, spa and restaurant imagery from five hundred acres above Widemouth Bay.",
};

const galleryItems = [
  { aspect: "aspect-[4/3]", label: "Estate aerial — rolling pasture and woodland" },
  { aspect: "aspect-[3/4]", label: "Heritage cottage exterior — stone and slate" },
  { aspect: "aspect-[4/3]", label: "Arvor Suites — lake-facing glazing" },
  { aspect: "aspect-[16/9]", label: "Spa hydrotherapy pool" },
  { aspect: "aspect-[3/4]", label: "Restaurant interior — evening setting" },
  { aspect: "aspect-[4/3]", label: "Cottage living room — log burner" },
  { aspect: "aspect-[3/4]", label: "Lakeside walking trail — autumn" },
  { aspect: "aspect-[4/3]", label: "Spa lodge — private hot tub at dusk" },
  { aspect: "aspect-[16/9]", label: "Widemouth Bay — clifftop view" },
  { aspect: "aspect-[4/3]", label: "Market garden — seasonal produce" },
  { aspect: "aspect-[3/4]", label: "Dog-friendly garden — enclosed lawn" },
  { aspect: "aspect-[4/3]", label: "Penthouse suite — panoramic balcony" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Gallery</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Five hundred acres{" "}
            <span className="italic">in pictures</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Rolling countryside, heritage farmhouses, lakeside suites, spa
            interiors and the Cornish coast — a glimpse of what awaits on the
            estate.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="break-inside-avoid"
              >
                <div
                  className={`${item.aspect} bg-surface-container relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="text-body-sm text-on-surface-muted">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
