import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Journal — Whalesborough Farm",
  description:
    "Seasonal writing from the estate, the kitchen and the spa. Recipes, local guides, estate news, and stories from 500 acres of North Cornwall.",
};

/** Placeholder article data — replaced by CMS in production. */
const articles: {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}[] = [
  {
    slug: "spring-on-the-estate",
    category: "Estate life",
    title: "Spring on the estate: lambing, wildflowers, and longer evenings",
    excerpt:
      "As the clocks change and the hedgerows fill with stitchwort, the estate shifts gear. Our farm team welcomes the first lambs while the market garden bursts back into life.",
    date: "March 2026",
    readTime: "5 min read",
  },
  {
    slug: "neetfield-market-garden-seasonal-menu",
    category: "From the kitchen",
    title: "What the garden gave us this week: a mid-summer menu",
    excerpt:
      "Head chef walks through the garden with secateurs in hand. Today it is courgette flowers, ruby chard, and the first heritage tomatoes of the season.",
    date: "July 2026",
    readTime: "4 min read",
  },
  {
    slug: "cornish-coastal-walks-from-bude",
    category: "Local guide",
    title: "Five coastal walks within 20 minutes of the estate",
    excerpt:
      "From Crackington Haven to Sandymouth, the North Cornwall coast path offers some of the most dramatic clifftop walking in England. Here are our favourites.",
    date: "May 2026",
    readTime: "6 min read",
  },
  {
    slug: "spa-rituals-winter",
    category: "Wellness",
    title: "Winter spa rituals: how to make the most of the cold months",
    excerpt:
      "When the temperature drops and the rain sheets in from the Atlantic, a spa day becomes less indulgence and more necessity. Our therapists share their winter favourites.",
    date: "November 2025",
    readTime: "4 min read",
  },
  {
    slug: "lodge-owner-story-the-hendersons",
    category: "Owner stories",
    title: "Why we chose Whalesborough: the Henderson family",
    excerpt:
      "After years of holidaying in North Cornwall, the Hendersons decided to make it permanent. They share what ownership at Whalesborough means to their family.",
    date: "January 2026",
    readTime: "7 min read",
  },
  {
    slug: "foraging-with-the-chef",
    category: "From the kitchen",
    title: "Foraging on the estate: wild garlic, elderflower, and sea herbs",
    excerpt:
      "The hedgerows and coastline around Whalesborough offer a larder of wild ingredients. Join our head chef on a morning forage through the 500-acre estate.",
    date: "April 2026",
    readTime: "5 min read",
  },
];

const categories = [
  "All",
  "Estate life",
  "From the kitchen",
  "Local guide",
  "Wellness",
  "Owner stories",
];

export default function Page() {
  return (
    <>
      {/* Hero */}
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

      {/* Category Filter */}
      <section className="bg-background border-b border-outline-variant">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <nav className="flex gap-6 overflow-x-auto py-4 -mb-px" aria-label="Article categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`whitespace-nowrap text-button uppercase font-body transition-colors duration-fast ${
                  cat === "All"
                    ? "text-primary border-b-2 border-primary pb-3"
                    : "text-on-surface-variant hover:text-on-surface pb-3"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Featured Article */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Featured
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow text-secondary">{articles[0].category}</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                {articles[0].title}
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                {articles[0].excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-body-sm text-on-surface-muted">
                <span>{articles[0].date}</span>
                <span aria-hidden="true" className="h-1 w-1 bg-on-surface-muted" />
                <span>{articles[0].readTime}</span>
              </div>
              <div className="mt-8">
                <LinkArrow href={`/journal/${articles[0].slug}`}>
                  Read article
                </LinkArrow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Latest</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Recent writing
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(1).map((article) => (
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
              and ownership news — delivered to your inbox once a month. No spam,
              unsubscribe any time.
            </p>
            <div className="mt-10">
              <LinkArrow href="/contact">Subscribe via contact form</LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({
  slug,
  category,
  title,
  excerpt,
  date,
  readTime,
}: {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}) {
  return (
    <Link
      href={`/journal/${slug}`}
      className="group block bg-surface-container-lowest p-0 transition-colors duration-fast ease-out-luxury"
    >
      {/* Image placeholder */}
      <div className="aspect-[3/2] bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/30 group-hover:from-secondary/20 group-hover:to-secondary/40 transition-colors duration-fast" />
      </div>
      <div className="p-6">
        <p className="eyebrow text-secondary">{category}</p>
        <h3 className="mt-2 text-h3 font-display text-on-surface group-hover:text-primary transition-colors duration-fast ease-out-luxury leading-snug">
          {title}
        </h3>
        <p className="mt-3 text-body-sm text-on-surface-variant line-clamp-3">
          {excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3 text-body-sm text-on-surface-muted">
          <span>{date}</span>
          <span aria-hidden="true" className="h-1 w-1 bg-on-surface-muted" />
          <span>{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
