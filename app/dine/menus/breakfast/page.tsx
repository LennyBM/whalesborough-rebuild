import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Breakfast Menu",
  description:
    "Breakfast at The Weir: estate eggs, local sourdough, seasonal fruit from Neetfield Market Garden. Served 8:30am to 11:00am daily.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Weir · Menus</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Breakfast
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            A slow start. Estate eggs from hens a field away, sourdough from
            our Bude bakery, seasonal fruit gathered that morning from the
            market garden. Served daily from 8:30am until 11:00am.
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left column */}
            <div className="space-y-16">
              <MenuSection title="From the garden">
                <MenuItem
                  name="Seasonal fruit bowl"
                  description="Market garden fruit, honey from the estate bees, toasted seeds"
                />
                <MenuItem
                  name="Bircher muesli"
                  description="Overnight oats, apple, hazelnut, seasonal compote"
                />
                <MenuItem
                  name="Avocado & sourdough"
                  description="Bude bakery sourdough, chilli flakes, estate leaves, poached egg"
                />
              </MenuSection>

              <MenuSection title="Pastries & bread">
                <MenuItem
                  name="Croissant"
                  description="Butter croissant, Trewithen salted butter, local preserves"
                />
                <MenuItem
                  name="Pain au chocolat"
                  description="Dark chocolate, flaky pastry, dusted"
                />
                <MenuItem
                  name="Sourdough toast"
                  description="Bude bakery loaf, local butter, choice of preserves"
                />
              </MenuSection>
            </div>

            {/* Right column */}
            <div className="space-y-16">
              <MenuSection title="Hot dishes">
                <MenuItem
                  name="The Weir full Cornish"
                  description="Estate eggs, dry-cured bacon, sausage, field mushrooms, vine tomatoes, black pudding, sourdough"
                />
                <MenuItem
                  name="Eggs Benedict"
                  description="Toasted muffin, Trealy Farm ham, estate eggs, hollandaise"
                />
                <MenuItem
                  name="Eggs Royale"
                  description="Smoked salmon, estate eggs, hollandaise, sourdough muffin"
                />
                <MenuItem
                  name="Mushrooms on toast"
                  description="Wild and cultivated mushrooms, garlic butter, thyme, sourdough"
                />
                <MenuItem
                  name="Scrambled eggs"
                  description="Estate eggs, chives, sourdough toast"
                />
              </MenuSection>

              <MenuSection title="For smaller appetites">
                <MenuItem
                  name="Children&apos;s breakfast"
                  description="Scrambled egg, toast soldiers, fruit pot"
                />
                <MenuItem
                  name="Porridge"
                  description="Cornish oats, choice of toppings: honey, banana, berries"
                />
              </MenuSection>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-20 border-t border-outline-variant pt-8">
            <p className="text-body-sm text-on-surface-muted">
              Menu is representative and changes with the seasons. Please
              inform your server of any allergies or dietary requirements — we
              are always happy to accommodate. Gluten-free bread available on
              request.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="flex flex-wrap items-center gap-8">
            <LinkArrow href="/dine/menus/lunch">View lunch menu</LinkArrow>
            <LinkArrow href="/dine/reserve">Walk-in policy</LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function MenuSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="heading-editorial text-h2 text-on-surface">{title}</h2>
      <div className="mt-8 space-y-6">{children}</div>
    </div>
  );
}

function MenuItem({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="border-b border-outline-variant pb-6">
      <h3 className="text-body font-medium text-on-surface">{name}</h3>
      <p className="mt-1 text-body-sm text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}
