import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BackButton } from "@/components/app-shell/back-button";

export const metadata: Metadata = {
  title: "About Whalesborough | Farm Resort & Spa, Cornwall",
  description:
    "Five hundred acres, four generations. Discover the story of Whalesborough — a working estate above Widemouth Bay, Bude, Cornwall. Family-owned, award-winning, and committed to slow tourism.",
};

export default function AboutPage() {
  return (
    <div className="px-4 pt-4 pb-24">
      <BackButton label="Home" href="/" />

      {/* Header image */}
      <div className="relative h-56 w-full overflow-hidden rounded-2xl">
        <Image
          src="/images/general/estate-aerial.webp"
          alt="Aerial view of Whalesborough estate stretching across five hundred acres above the North Cornwall coast"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>

      {/* Title */}
      <div className="mt-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Our Story
        </p>
        <h1 className="mt-2 font-display text-2xl italic text-on-surface">
          Five hundred acres, four generations
        </h1>
        <p className="mt-3 font-body text-sm text-on-surface-variant leading-relaxed">
          Whalesborough is a family-owned working estate above Widemouth Bay on
          the North Cornwall coast. What began as a single farmstead has grown —
          carefully, over generations — into one of the South West&apos;s most
          celebrated hospitality destinations.
        </p>
      </div>

      {/* Heritage card */}
      <div className="mt-6 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Heritage
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          From working farm to quiet luxury
        </h2>
        <div className="mt-4 space-y-4 font-body text-sm text-on-surface-variant leading-relaxed">
          <p>
            The story of Whalesborough begins with the land itself — five
            hundred acres of rolling pasture, ancient woodland, and spring-fed
            lakes that slope gently towards the Atlantic. For centuries this was
            a working farm, tending rare-breed cattle, sheep, and goats across
            fields bordered by Cornish hedgerows.
          </p>
          <p>
            In the late twentieth century, the family began converting the
            estate&apos;s original farm buildings — barns, granaries, stables —
            into holiday cottages. Each conversion was handled with care,
            preserving the character of the structures while creating spaces
            worthy of the setting. Today those 27 heritage cottages sit alongside
            22 contemporary Arvor Suites and a collection of spa lodges, offering
            guests a choice between rustic warmth and modern calm.
          </p>
          <p>
            The farm never stopped working. Cattle still graze the pastures, the
            market garden still supplies The Weir Restaurant, and the estate&apos;s
            beekeeping programme pollinates newly planted woodland. Hospitality
            grew around the farming — not in place of it. That distinction shapes
            everything we do.
          </p>
        </div>
        <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl">
          <Image
            src="/images/general/farm-animals.webp"
            alt="Rare-breed cattle grazing on the Whalesborough estate pastures"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>

      {/* Values card */}
      <div className="mt-4 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Values
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          What guides us
        </h2>
        <div className="mt-4 space-y-5">
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

      {/* Awards card */}
      <div className="mt-4 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Recognition
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          Awards & accreditation
        </h2>
        <p className="mt-2 font-body text-sm text-on-surface-variant">
          Independent validation from the organisations that matter most to our
          guests.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <AwardCard label="VisitEngland" detail="5-Star Gold" />
          <AwardCard label="Cornwall Tourism" detail="Gold Award 2024" />
          <AwardCard label="Guest NPS" detail="83.3 — #1 in Cornwall" />
          <AwardCard label="500 Acres" detail="Working Estate" />
        </div>
      </div>

      {/* Team card */}
      <div className="mt-4 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          People
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          Our team of 85 looks after every detail
        </h2>
        <p className="mt-3 font-body text-sm text-on-surface-variant leading-relaxed">
          From spa therapists and chefs to groundskeepers and market gardeners —
          most live within fifteen miles of the estate. Many have been here for
          years. This is a place people stay, and that continuity shows in the
          care guests receive.
        </p>
        <div className="relative mt-4 h-44 w-full overflow-hidden rounded-xl">
          <Image
            src="/images/general/estate-view.webp"
            alt="View across the Whalesborough estate grounds"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
        <Link
          href="/contact"
          className="mt-4 inline-block font-body text-sm font-medium text-primary"
        >
          Meet the team &rarr;
        </Link>
      </div>

      {/* Explore links */}
      <div className="mt-6 space-y-3">
        <h2 className="font-display text-lg italic text-on-surface">
          Explore the estate
        </h2>
        <p className="font-body text-sm text-on-surface-variant">
          Five hundred acres of pasture, woodland, lakes, and coastline —
          waiting to be discovered at your own pace.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href="/estate"
            className="rounded-full bg-surface-container-low px-4 py-2 font-body text-sm text-on-surface"
          >
            The Estate
          </Link>
          <Link
            href="/stay"
            className="rounded-full bg-surface-container-low px-4 py-2 font-body text-sm text-on-surface"
          >
            Accommodation
          </Link>
          <Link
            href="/spa"
            className="rounded-full bg-surface-container-low px-4 py-2 font-body text-sm text-on-surface"
          >
            W Club Spa
          </Link>
        </div>
      </div>
    </div>
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
      <h3 className="font-body text-sm font-semibold text-on-surface">
        {title}
      </h3>
      <p className="mt-1 font-body text-sm text-on-surface-variant leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function AwardCard({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-xl bg-surface-container px-4 py-4 text-center">
      <p className="font-body text-sm font-semibold text-on-surface">{label}</p>
      <p className="mt-1 font-body text-xs text-on-surface-muted">{detail}</p>
    </div>
  );
}
