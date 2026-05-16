import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Lunch Menu",
  description:
    "Lunch at The Weir: Cornish suppliers, estate-grown salads, daily specials. Served 12:00pm to 3:00pm daily. Long lunches encouraged.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Weir · Menus</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Lunch
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Long lunches by the lake. Cornish suppliers, estate-grown leaves
            and herbs, daily specials shaped by whatever the boats brought in
            or the garden yielded that morning. Served daily from midday
            until 3:00pm.
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left column */}
            <div className="space-y-16">
              <MenuSection title="Small plates & starters">
                <MenuItem
                  name="Soup of the day"
                  description="Market garden vegetables, sourdough, estate butter"
                />
                <MenuItem
                  name="Estate salad"
                  description="Neetfield leaves, heritage tomatoes, cucumber, garden herbs, cider vinaigrette"
                />
                <MenuItem
                  name="Smoked mackerel pate"
                  description="Cornish mackerel, horseradish cream, pickled beetroot, toast"
                />
                <MenuItem
                  name="Halloumi & grain bowl"
                  description="Grilled halloumi, quinoa, roasted squash, pomegranate, tahini"
                />
              </MenuSection>

              <MenuSection title="Sandwiches & light">
                <MenuItem
                  name="Steak sandwich"
                  description="North Cornwall sirloin, caramelised onion, rocket, sourdough"
                />
                <MenuItem
                  name="Fish finger sandwich"
                  description="Newlyn haddock, tartare, baby gem, brioche bun"
                />
                <MenuItem
                  name="Cornish ploughman&apos;s"
                  description="Davidstow cheddar, Trealy ham, piccalilli, chutney, sourdough"
                />
                <MenuItem
                  name="Club sandwich"
                  description="Roast chicken, bacon, estate leaves, tomato, aioli"
                />
              </MenuSection>
            </div>

            {/* Right column */}
            <div className="space-y-16">
              <MenuSection title="Mains">
                <MenuItem
                  name="Beer-battered fish & chips"
                  description="Newlyn day-boat catch, triple-cooked chips, crushed peas, tartare"
                />
                <MenuItem
                  name="The Weir burger"
                  description="North Cornwall beef patty, Davidstow cheddar, brioche, slaw, fries"
                />
                <MenuItem
                  name="Pan-fried sea bass"
                  description="New potatoes, samphire, caper and lemon butter, estate leaves"
                />
                <MenuItem
                  name="Mushroom & truffle risotto"
                  description="Wild mushrooms, aged parmesan, truffle oil, garden herbs"
                />
                <MenuItem
                  name="Daily special"
                  description="Ask your server — shaped by the catch, the garden, and the season"
                />
              </MenuSection>

              <MenuSection title="Children&apos;s menu">
                <MenuItem
                  name="Fish goujons"
                  description="Newlyn haddock, chips, peas"
                />
                <MenuItem
                  name="Pasta & sauce"
                  description="Penne, tomato and basil sauce, parmesan"
                />
                <MenuItem
                  name="Mini burger"
                  description="Beef patty, brioche bun, fries"
                />
              </MenuSection>

              <MenuSection title="Puddings">
                <MenuItem
                  name="Sticky toffee pudding"
                  description="Clotted cream, toffee sauce"
                />
                <MenuItem
                  name="Estate fruit crumble"
                  description="Seasonal fruit, vanilla custard"
                />
                <MenuItem
                  name="Cornish ice cream"
                  description="Three scoops, Callestick Farm — ask for today&apos;s flavours"
                />
              </MenuSection>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-20 border-t border-outline-variant pt-8">
            <p className="text-body-sm text-on-surface-muted">
              Menu is representative and changes with the seasons. Daily
              specials are displayed on the board. Please inform your server
              of any allergies or dietary requirements — we are always happy
              to accommodate. Gluten-free options available.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="flex flex-wrap items-center gap-8">
            <LinkArrow href="/dine/menus/breakfast">
              View breakfast menu
            </LinkArrow>
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
