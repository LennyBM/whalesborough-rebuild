import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { properties } from "@/lib/data/properties";
import { BackButton } from "@/components/app-shell/back-button";
import { PropertyPriceDisplay } from "./property-price-display";

export function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const property = properties.find((p) => p.slug === params.slug);
  if (!property) return {};
  return {
    title: `${property.name} | Whalesborough`,
    description: `Book ${property.name} — sleeps ${property.sleeps}, ${property.bedrooms} bedrooms. From £${property.price}/night on the Whalesborough estate.`,
  };
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = properties.find((p) => p.slug === params.slug);

  if (!property) {
    notFound();
  }

  const similarProperties = properties
    .filter((p) => p.slug !== property.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Back button */}
      <div className="px-4 pt-4">
        <BackButton label="Back" href="/stay" />
      </div>

      {/* Hero image */}
      <div className="relative w-full h-[250px]">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Property header card */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-surface-container-low p-5">
          <h1 className="font-display text-2xl italic text-on-surface mb-2">
            {property.name}
          </h1>
          <p className="text-sm text-on-surface-muted font-body">
            Sleeps {property.sleeps} · {property.bedrooms} bedrooms · From <PropertyPriceDisplay price={property.price} />
          </p>
          {/* Feature tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {property.features.map((feature) => (
              <span
                key={feature}
                className="inline-block px-3 py-1 text-xs font-body bg-secondary/15 text-secondary"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dog-friendly callout */}
      {(property.features as readonly string[]).includes("Dog friendly") && (
        <div className="px-4 mt-4">
          <div className="flex items-center gap-3 rounded-xl bg-[#4a6457]/10 border border-[#4a6457]/20 px-4 py-3">
            <PawPrint className="h-5 w-5 shrink-0 text-[#4a6457]" />
            <div>
              <p className="text-sm font-semibold font-body text-[#4a6457]">Dog friendly property</p>
              <p className="text-xs font-body text-[#4a6457]/80 mt-0.5">Up to 2 well-behaved dogs welcome. Charges may apply.</p>
            </div>
          </div>
        </div>
      )}

      {/* Book this property button */}
      <div className="px-4 mt-4">
        <Link
          href={`/stay/booking/dates?property=${property.slug}`}
          className="block w-full text-center py-3.5 bg-primary text-white font-body font-semibold text-sm tracking-wide"
        >
          Book this property
        </Link>
      </div>

      {/* Details section */}
      <div className="px-4 mt-6">
        <h2 className="font-display text-lg italic text-on-surface mb-3">Details</h2>
        <div className="bg-surface-container-low divide-y divide-surface-container">
          <DetailRow label="Check-in" value="4:00pm" />
          <DetailRow label="Check-out" value="10:00am" />
          <DetailRow label="Parking" value="Dedicated space included" />
          <DetailRow label="Wi-Fi" value="Complimentary high-speed" />
          <DetailRow label="Dogs" value="Welcome (most properties) · max 2" />
        </div>
      </div>

      {/* What's included */}
      <div className="px-4 mt-6">
        <h2 className="font-display text-lg italic text-on-surface mb-3">What&apos;s included</h2>
        <div className="bg-surface-container-low p-4">
          <ul className="space-y-2.5">
            {[
              "Estate access (500 acres)",
              "Spa pool access",
              "Breakfast at The Weir",
              "Welcome pack on arrival",
              "Bed linen & towels",
              "Firewood (log fire properties)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-body text-on-surface">
                <span className="text-secondary mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Location */}
      <div className="px-4 mt-6">
        <h2 className="font-display text-lg italic text-on-surface mb-3">Location</h2>
        <div className="bg-surface-container-low p-4 space-y-2">
          <p className="text-sm font-body text-on-surface">
            On the estate · 1 mile from Widemouth Bay
          </p>
          <p className="text-sm font-body text-on-surface-muted">
            5 min walk to The Weir Restaurant
          </p>
          <p className="text-sm font-body text-on-surface-muted">
            2 min walk to The W Club Spa
          </p>
        </div>
      </div>

      {/* Similar properties */}
      <div className="mt-6">
        <h2 className="font-display text-lg italic text-on-surface mb-3 px-4">Similar properties</h2>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {similarProperties.map((p) => (
            <Link
              key={p.slug}
              href={`/stay/${p.slug}`}
              className="flex-shrink-0 w-[200px] bg-surface-container-low"
            >
              <div className="relative h-[120px] w-full">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="font-display text-sm italic text-on-surface">{p.name}</p>
                <p className="text-xs text-on-surface-muted font-body mt-1">
                  Sleeps {p.sleeps} · From £{p.price}/night
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-background border-t border-surface-container px-4 py-3">
        <Link
          href={`/stay/booking/dates?property=${property.slug}`}
          className="block w-full text-center py-3.5 bg-primary text-white font-body font-semibold text-sm tracking-wide"
        >
          Book from <PropertyPriceDisplay price={property.price} />
        </Link>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center px-4 py-3">
      <span className="text-sm font-body text-on-surface-muted">{label}</span>
      <span className="text-sm font-body text-on-surface">{value}</span>
    </div>
  );
}
