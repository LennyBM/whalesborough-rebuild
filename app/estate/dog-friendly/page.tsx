import type { Metadata } from "next";
import Image from "next/image";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dog-Friendly Holidays | The Estate | Whalesborough",
  description:
    "Your dog's holiday too. Most cottages welcome dogs at no extra charge — enclosed exercise fields, wash stations, dog welcome kits, and 500 acres of walks from the door.",
  openGraph: {
    title: "Dog-Friendly Holidays | Whalesborough Estate",
    description:
      "Most cottages welcome dogs at no extra charge. Enclosed fields, wash stations, welcome kits, and 500 acres of walks.",
    images: ["/images/dog-friendly/dogs-on-estate.webp"],
  },
};

const walks = [
  {
    name: "Estate Loop Trail",
    distance: "2.5 miles",
    difficulty: "Easy",
    description:
      "A gentle circuit through pasture and woodland, with lake views and plenty of off-lead sections away from livestock. Perfect for an afternoon amble.",
  },
  {
    name: "Bude Canal Towpath",
    distance: "4 miles one way",
    difficulty: "Easy",
    description:
      "Flat towpath running from the sea lock at Bude harbour inland through the valley. Dogs can cool off in the canal along the way. Mostly off-lead friendly.",
  },
  {
    name: "Widemouth to Crackington Cliff Path",
    distance: "6 miles",
    difficulty: "Moderate",
    description:
      "Dramatic coastal scenery along the South West Coast Path. Some steep sections and stiles — keep dogs on lead near cliff edges. Rewarded with quiet coves.",
  },
  {
    name: "Marhamchurch & Helebridge Circular",
    distance: "3 miles",
    difficulty: "Easy to moderate",
    description:
      "Country lanes and field paths through quiet farmland. Passes the historic village of Marhamchurch with its Norman church. Some livestock fields — leads required.",
  },
];

const galleryImages = [
  {
    src: "/images/dog-friendly/bude-beach-dog-walk.webp",
    alt: "Dog walking on the beach at Bude",
  },
  {
    src: "/images/dog-friendly/canal.webp",
    alt: "Dog walking along the Bude Canal towpath",
  },
  {
    src: "/images/dog-friendly/cornish-coast-dog-sunset.webp",
    alt: "Dog silhouetted against a Cornish coast sunset",
  },
  {
    src: "/images/dog-friendly/dog-pack.webp",
    alt: "A group of dogs playing together on the estate",
  },
  {
    src: "/images/dog-friendly/dog-shower.webp",
    alt: "Dog wash station with warm water for muddy paws",
  },
  {
    src: "/images/dog-friendly/garden.webp",
    alt: "Enclosed cottage garden — safe off-lead space",
  },
  {
    src: "/images/dog-friendly/ev-charging.webp",
    alt: "EV charging point at Whalesborough Estate",
  },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-background overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/dog-friendly/dogs-on-estate.webp"
            alt="Dogs running free across Whalesborough Estate"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="relative mx-auto max-w-content px-6 pb-24 pt-48 lg:px-12 lg:pb-36 lg:pt-64">
          <p className="eyebrow text-on-surface-muted">
            The Estate
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-3xl text-on-surface">
            Your dog&rsquo;s <span className="italic">holiday</span> too
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whalesborough was built with dogs in mind. Not as an afterthought,
            not a surcharge and a laminated list of rules, but as a genuine
            welcome. Most cottages, every trail, every acre is yours to share.
          </p>
        </div>
      </section>

      {/* What We Provide */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">What we provide</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Everything your dog needs
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            We have thought about the details so you do not have to. From
            enclosed fields for off-lead play to warm wash stations for muddy
            paws, your dog will feel as welcome as you do.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              title="Enclosed exercise fields"
              description="Fenced paddocks for safe off-lead play, away from roads and livestock. Let them run."
            />
            <FeatureCard
              title="Dog wash stations"
              description="Warm water wash-down stations at each property cluster. Open 24 hours for post-walk clean-ups."
            />
            <FeatureCard
              title="No extra charge"
              description="Dogs stay free. No pet supplement, no deposit, no hidden costs. Up to 2 dogs per property (some allow 3)."
            />
            <FeatureCard
              title="Dog Welcome Kit"
              description="Bed, bowls, treats and towel — available as a £25 add-on so you can travel light."
            />
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/dog-friendly/dog-shower.webp"
                alt="Warm dog wash station for muddy paws"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/dog-friendly/garden.webp"
                alt="Enclosed garden at a Whalesborough cottage"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Life on the estate</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Five hundred acres of adventure
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Walks Section */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Walks from the door</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Trails for every pace
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Step out of your cottage and straight onto a walk. The estate
            connects to the Bude Canal towpath and the South West Coast Path,
            with quiet lanes and field paths in every direction.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {walks.map((walk) => (
              <div key={walk.name} className="bg-background p-8">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-h3 font-display text-on-surface">
                    {walk.name}
                  </h3>
                </div>
                <div className="mt-3 flex gap-4">
                  <span className="text-body-sm text-on-surface-muted">
                    {walk.distance}
                  </span>
                  <span className="text-body-sm text-on-surface-muted">
                    {walk.difficulty}
                  </span>
                </div>
                <p className="mt-4 text-body text-on-surface-variant">
                  {walk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beach Rules */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <Image
                src="/images/dog-friendly/bude-beach-dog-walk.webp"
                alt="Dog walking on Bude beach at low tide"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow text-on-surface-muted">Beach access</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Beach rules made clear
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                The North Cornwall coast has generous dog-friendly beach access,
                but seasonal restrictions apply in summer. Here is what you need
                to know.
              </p>

              <div className="mt-8 space-y-6">
                <div className="bg-surface-container-low p-6">
                  <h3 className="text-h3 font-display text-on-surface">
                    Widemouth Bay — North Section
                  </h3>
                  <p className="mt-2 text-body text-on-surface-variant">
                    Dog-friendly all year round. The northern end of the beach
                    (beyond the rocks) has no seasonal restrictions. A ten-minute
                    drive from the estate.
                  </p>
                </div>

                <div className="bg-surface-container-low p-6">
                  <h3 className="text-h3 font-display text-on-surface">
                    Widemouth Bay — Main Beach
                  </h3>
                  <p className="mt-2 text-body text-on-surface-variant">
                    Dogs excluded from the main lifeguarded section between 1 May
                    and 30 September. Outside those months, dogs are welcome
                    across the full beach.
                  </p>
                </div>

                <div className="bg-surface-container-low p-6">
                  <h3 className="text-h3 font-display text-on-surface">
                    Crackington Haven & Sandymouth
                  </h3>
                  <p className="mt-2 text-body text-on-surface-variant">
                    Both beaches welcome dogs all year with no restrictions. Quieter
                    alternatives in high season. Sandymouth is National Trust and
                    has a seasonal cafe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Good to know</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Practical details
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-h3 font-display text-on-surface">
                How many dogs?
              </h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Most properties allow up to 2 dogs. Select larger cottages
                accommodate 3 — check the individual property listing for
                details. Well-behaved dogs of all breeds and sizes are welcome.
              </p>
            </div>

            <div>
              <h3 className="text-h3 font-display text-on-surface">
                Which properties?
              </h3>
              <p className="mt-3 text-body text-on-surface-variant">
                The majority of our cottages are dog-friendly. A small number are
                kept dog-free for guests with allergies. Filter by
                &ldquo;dog-friendly&rdquo; when browsing to see all available
                options.
              </p>
            </div>

            <div>
              <h3 className="text-h3 font-display text-on-surface">
                Nearest vet
              </h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Bude Veterinary Surgery is ten minutes away by car. Open Monday
                to Friday with an emergency out-of-hours service. We keep their
                details in every cottage welcome folder.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-background p-8">
            <h3 className="text-h3 font-display text-on-surface">
              Dog-friendly dining
            </h3>
            <p className="mt-3 text-body text-on-surface-variant">
              The Weir Restaurant has designated dog-friendly seating so you
              never have to leave your companion behind. Water bowls are provided
              and the kitchen offers a dog menu with locally sourced options.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-background overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/dog-friendly/cornish-coast-dog-sunset.webp"
            alt="Dog watching the sunset over the Cornish coast"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-36 text-center">
          <p className="eyebrow text-on-surface-muted">Ready to book?</p>
          <h2 className="heading-editorial mt-4 text-display-md text-on-surface">
            The whole family, together
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-on-surface-variant">
            Browse our dog-friendly cottages — no extra charge, enclosed gardens,
            wash stations and five hundred acres of adventure from the doorstep.
          </p>
          <div className="mt-10 flex justify-center">
            <LinkArrow href="/stay/availability">
              Book a dog-friendly cottage
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background p-6">
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-3 text-body text-on-surface-variant">{description}</p>
    </div>
  );
}
