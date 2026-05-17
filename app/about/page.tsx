import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Whalesborough | Farm Resort & Spa, Cornwall",
  description:
    "Five hundred acres, four generations. Discover the story of Whalesborough — a working estate above Widemouth Bay, Bude, Cornwall. Family-owned, award-winning, and committed to slow tourism.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Our Story</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Five hundred acres,{" "}
            <span className="italic">four generations</span>
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whalesborough is a family-owned working estate above Widemouth Bay
            on the North Cornwall coast. What began as a single farmstead has
            grown — carefully, over generations — into one of the South West's
            most celebrated hospitality destinations.
          </p>
        </div>
      </section>

      {/* Estate Image */}
      <section className="bg-background">
        <div className="mx-auto max-w-hero px-6 lg:px-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/general/estate-aerial.webp"
              alt="Aerial view of Whalesborough estate stretching across five hundred acres above the North Cornwall coast"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Heritage</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            From working farm to quiet luxury
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="max-w-prose space-y-6">
              <p className="text-body-lg text-on-surface-variant">
                The story of Whalesborough begins with the land itself — five
                hundred acres of rolling pasture, ancient woodland, and
                spring-fed lakes that slope gently towards the Atlantic. For
                centuries this was a working farm, tending rare-breed cattle,
                sheep, and goats across fields bordered by Cornish hedgerows.
              </p>
              <p className="text-body text-on-surface-variant">
                In the late twentieth century, the family began converting the
                estate's original farm buildings — barns, granaries, stables —
                into holiday cottages. Each conversion was handled with care,
                preserving the character of the structures while creating spaces
                worthy of the setting. Today those 27 heritage cottages sit
                alongside 22 contemporary Arvor Suites and a collection of spa
                lodges, offering guests a choice between rustic warmth and
                modern calm.
              </p>
              <p className="text-body text-on-surface-variant">
                The farm never stopped working. Cattle still graze the pastures,
                the market garden still supplies The Weir Restaurant, and the
                estate's beekeeping programme pollinates newly planted woodland.
                Hospitality grew around the farming — not in place of it. That
                distinction shapes everything we do.
              </p>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto">
              <Image
                src="/images/general/farm-animals.webp"
                alt="Rare-breed cattle grazing on the Whalesborough estate pastures"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Values</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            What guides us
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <ValuePillar
              title="Sustainability"
              description="Fifteen thousand Cornish Black Bees, fifty acres of new native woodland, biomass heating across the estate, and a commitment to net zero. We measure everything and publish the results — no greenwashing, no inflated claims."
            />
            <ValuePillar
              title="Local First"
              description="We source from within thirty miles wherever possible. Our chefs cook with produce from our own market garden. Our suppliers are our neighbours. When the estate thrives, the community around it thrives too."
            />
            <ValuePillar
              title="Slow Tourism"
              description="We do not rush guests through experiences. The estate sets the tempo — seasonal, tidal, unhurried. Stay longer, do less, notice more. That is the Whalesborough way."
            />
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Recognition</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Awards & accreditation
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Independent validation from the organisations that matter most to
            our guests.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            <AwardCard
              label="VisitEngland"
              detail="5-Star Gold"
            />
            <AwardCard
              label="Cornwall Tourism"
              detail="Gold Award 2024"
            />
            <AwardCard
              label="Guest NPS"
              detail="83.3 — #1 in Cornwall"
            />
            <AwardCard
              label="500 Acres"
              detail="Working Estate"
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">People</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Our team of 85 looks after every detail
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                From spa therapists and chefs to groundskeepers and market
                gardeners — most live within fifteen miles of the estate. Many
                have been here for years. This is a place people stay, and that
                continuity shows in the care guests receive.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <LinkArrow>Meet the team</LinkArrow>
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/general/estate-view.webp"
                alt="View across the Whalesborough estate grounds"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 text-center lg:px-12 lg:py-32">
          <h2 className="heading-editorial text-h1 text-on-surface">
            Explore the estate
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-on-surface-variant">
            Five hundred acres of pasture, woodland, lakes, and coastline —
            waiting to be discovered at your own pace.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link href="/estate">
              <LinkArrow>The Estate</LinkArrow>
            </Link>
            <Link href="/accommodation">
              <LinkArrow>Accommodation</LinkArrow>
            </Link>
            <Link href="/spa">
              <LinkArrow>W Club Spa</LinkArrow>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ValuePillar({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-h3 text-on-surface">{title}</h3>
      <p className="mt-3 text-body text-on-surface-variant">{description}</p>
    </div>
  );
}

function AwardCard({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="bg-surface-container-low px-6 py-8 text-center">
      <p className="text-h3 text-on-surface">{label}</p>
      <p className="mt-2 text-body text-on-surface-muted">{detail}</p>
    </div>
  );
}
