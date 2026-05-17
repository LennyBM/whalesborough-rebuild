import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Journal — Whalesborough Farm",
  description:
    "Seasonal writing from the estate, the kitchen and the spa. Recipes, local guides, estate news, and stories from 500 acres of North Cornwall.",
};

const articles = [
  {
    slug: "a-season-of-wild-swimming",
    tag: "Estate Life",
    title: "A Season of Wild Swimming",
    date: "15 May 2026",
    excerpt:
      "The outdoor pool reopens and the lake warms to swimmable temperatures. We trace the quiet joy of open-water mornings on the estate.",
    image: "/images/general/estate-aerial.webp",
  },
  {
    slug: "meet-the-herd-rare-breed-cattle",
    tag: "Farm",
    title: "Meet the Herd: Our Rare-Breed Cattle",
    date: "3 May 2026",
    excerpt:
      "A portrait of the Ruby Reds and Belted Galloways that graze our 500 acres — and why heritage breeds matter.",
    image: "/images/general/farm-animals.webp",
  },
  {
    slug: "the-art-of-doing-nothing",
    tag: "Wellness",
    title: "The Art of Doing Nothing",
    date: "22 Apr 2026",
    excerpt:
      "Our spa therapists on the lost discipline of rest — and how slow living is the real luxury.",
    image: "/images/spa/spa-wellness.webp",
  },
  {
    slug: "whats-on-the-pass-this-spring",
    tag: "Food & Drink",
    title: "What's on the Pass This Spring",
    date: "10 Apr 2026",
    excerpt:
      "Purple sprouting broccoli, salt-marsh lamb and the first forced rhubarb — the seasonal menu explained by our head chef.",
    image: "/images/restaurant/breakfast-coffee.webp",
  },
  {
    slug: "six-walks-from-your-door",
    tag: "Outdoors",
    title: "Six Walks from Your Door",
    date: "28 Mar 2026",
    excerpt:
      "From clifftop circuits to woodland loops, these routes start at the estate gate and return you wind-blown and ready for supper.",
    image: "/images/general/outdoor-activities.webp",
  },
  {
    slug: "why-dogs-love-it-here",
    tag: "Dog Friendly",
    title: "Why Dogs Love It Here",
    date: "12 Mar 2026",
    excerpt:
      "Off-lead fields, dog-wash stations, and beaches where four legs are always welcome. A canine's guide to Whalesborough.",
    image: "/images/dog-friendly/bude-beach-dog-walk.webp",
  },
];

export default function JournalPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      {/* Header */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-16 pt-24 lg:px-12 lg:pb-20 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Journal</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Stories from{" "}
            <span className="italic">500 acres</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Seasonal writing from the estate, the kitchen and the spa. Recipes,
            local guides, estate news, and the quieter stories of life in North
            Cornwall.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 lg:px-12 lg:pb-32">
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow text-primary">{featured.tag}</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface group-hover:text-primary transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                {featured.excerpt}
              </p>
              <p className="mt-4 text-body text-on-surface-muted">
                {featured.date}
              </p>
              <div className="mt-8">
                <span className="text-primary text-body font-medium group-hover:underline">
                  Read more
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Latest</p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
            Recent writing
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {rest.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-on-surface-muted">Stay informed</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              The estate newsletter
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Seasonal updates from the farm, new menu announcements, spa offers,
              and ownership news — delivered to your inbox once a month.
            </p>
            <div className="mt-10">
              <LinkArrow href="/contact">Subscribe</LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({
  slug,
  tag,
  title,
  date,
  excerpt,
  image,
}: {
  slug: string;
  tag: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}) {
  return (
    <Link
      href={`/journal/${slug}`}
      className="group block"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="pt-5">
        <p className="eyebrow text-primary">{tag}</p>
        <h3 className="mt-2 text-h3 font-display text-on-surface group-hover:text-primary transition-colors duration-300 leading-snug">
          {title}
        </h3>
        <p className="mt-3 text-body text-on-surface-variant line-clamp-2">
          {excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-body-sm text-on-surface-muted">{date}</span>
          <span className="text-primary text-body-sm font-medium group-hover:underline">
            Read more
          </span>
        </div>
      </div>
    </Link>
  );
}
