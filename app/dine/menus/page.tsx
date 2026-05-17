import type { Metadata } from "next";
import Image from "next/image";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menus | The Weir Restaurant",
  description:
    "Seasonal breakfast and lunch menus at The Weir. Estate-grown produce, Cornish suppliers, and a kitchen that follows the seasons.",
};

/* ─────────────────────────── Data ─────────────────────────── */

const breakfast = [
  { name: "Full Cornish", description: "Eggs, bacon, sausage, black pudding, mushrooms, toast", price: 16 },
  { name: "Smoked salmon & scrambled eggs", price: 14 },
  { name: "Granola, yoghurt & seasonal fruit", price: 9 },
  { name: "Eggs Benedict / Royale / Florentine", price: 12 },
  { name: "Toast & preserves", description: "Sourdough, farmhouse white", price: 5 },
  { name: "Pastries selection", price: 7 },
];

const starters = [
  { name: "Estate soup of the day", description: "Sourdough", price: 8 },
  { name: "Crab on toast", description: "Lemon, chive", price: 14 },
  { name: "Burrata", description: "Heritage tomato, basil oil", price: 12 },
  { name: "Chicken liver parfait", description: "Onion jam, toast", price: 11 },
];

const mains = [
  { name: "Beer-battered haddock", description: "Triple-cooked chips, mushy peas", price: 18 },
  { name: "8oz Whalesborough sirloin", description: "Fat chips, peppercorn", price: 28 },
  { name: "Pan-fried sea bass", description: "Samphire, new potatoes", price: 24 },
  { name: "Wild mushroom risotto", description: "Truffle, parmesan", price: 17 },
  { name: "Weir burger", description: "Bacon, cheddar, brioche, slaw", price: 16 },
];

const desserts = [
  { name: "Sticky toffee pudding", description: "Clotted cream", price: 9 },
  { name: "Cornish ice cream selection", description: "Three scoops", price: 8 },
  { name: "Dark chocolate torte", description: "Sea salt, raspberries", price: 11 },
  { name: "Cheese board", description: "Cornish selection, chutney", price: 14 },
];

/* ─────────────────────────── Helpers ─────────────────────────── */

function MenuItem({ name, description, price }: { name: string; description?: string; price: number }) {
  return (
    <li className="flex items-baseline justify-between gap-4 py-3">
      <div>
        <span className="text-body text-on-surface">{name}</span>
        {description && (
          <span className="ml-2 text-body text-on-surface-muted">{description}</span>
        )}
      </div>
      <span className="shrink-0 text-body text-on-surface-variant">£{price}</span>
    </li>
  );
}

function MenuSection({ title, items }: { title: string; items: { name: string; description?: string; price: number }[] }) {
  return (
    <div>
      <h3 className="heading-editorial text-h3 text-on-surface">{title}</h3>
      <ul className="mt-4 divide-y divide-on-surface/10">
        {items.map((item) => (
          <MenuItem key={item.name} {...item} />
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Weir · Menus</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Menus that follow the{" "}
            <span className="italic">seasons</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Our kitchen works to what the estate and its suppliers provide
            each day. Menus shift with the market garden, the weather, and
            whatever the boats have brought in from the Cornish coast.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/restaurant/breakfast-coffee.webp"
              alt="Morning coffee and pastries at The Weir"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Breakfast Menu */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow text-on-surface-muted">7:30am – 10:00am</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Breakfast
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Included for accommodation guests. Non-resident guests are welcome
              to join us — prices shown below.
            </p>

            <ul className="mt-10 divide-y divide-on-surface/10">
              {breakfast.map((item) => (
                <MenuItem key={item.name} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lunch Menu */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow text-on-surface-muted">12:00pm – 3:00pm · Open to all</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Lunch
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Cornish suppliers, estate-grown salads, and daily specials from
              whatever arrived that morning.
            </p>

            <div className="mt-12 space-y-12">
              <MenuSection title="Starters" items={starters} />
              <MenuSection title="Mains" items={mains} />
              <MenuSection title="Desserts" items={desserts} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note + CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-body text-on-surface-muted italic">
              Menu changes seasonally. Please inform us of any allergies.
            </p>
            <div className="mt-10">
              <LinkArrow href="/dine/reserve">Reserve a table</LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
