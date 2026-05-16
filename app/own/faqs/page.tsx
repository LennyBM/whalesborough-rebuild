import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Ownership FAQs | Own at Whalesborough",
  description:
    "Common questions about lodge ownership: licence terms, subletting, running costs, pets, modifications and resale.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Lodge Ownership</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Questions we hear{" "}
            <span className="italic">most often</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Straightforward answers to the questions prospective owners ask
            during viewings and enquiry calls. If yours is not here, call
            Rebecca on 01288 361940.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="space-y-0">
            <FaqItem
              question="What type of ownership is this?"
              answer="You purchase a 125-year licence to occupy a specific plot on the estate. This is not a timeshare, fractional ownership or a holiday let investment scheme. You own the lodge structure outright and hold the licence for the plot it sits on."
            />
            <FaqItem
              question="Can I live in my lodge full-time?"
              answer="The lodges are built to BS3632 residential specification and are suitable for year-round occupation. However, the estate operates a managed rental programme and your licence includes a six-week personal use allocation per year during the initial three-year guarantee period. After that, arrangements are more flexible."
            />
            <FaqItem
              question="Can I sublet my lodge privately?"
              answer="During the guaranteed rental period, your lodge must remain in our managed programme when not in personal use. After the three-year guarantee expires, you may discuss alternative arrangements with the estate management team."
            />
            <FaqItem
              question="What are the running costs?"
              answer="Annual charges include ground rent, an estate service charge covering grounds maintenance and communal areas, and a management fee deducted from rental income. Utilities are metered separately. Full details are provided at reservation and are available on our running costs page."
            />
            <FaqItem
              question="Are dogs allowed?"
              answer="Yes. Dogs are welcome in all lodges and across the estate. There are no breed or size restrictions. The estate provides five hundred acres of walking space."
            />
            <FaqItem
              question="Can I make modifications to my lodge?"
              answer="Internal cosmetic changes are generally permitted with prior written approval from the estate management. Structural alterations, external modifications and additions to decking or outbuildings require formal consent and may incur additional charges."
            />
            <FaqItem
              question="Can I sell my lodge?"
              answer="Yes. Your 125-year licence is transferable. You may sell your lodge at any time subject to the estate&rsquo;s standard transfer process. There is no lock-in period after the initial guarantee term."
            />
            <FaqItem
              question="Is there a residents' community?"
              answer="Yes. Owners form part of a growing community on the estate. Seasonal events, an owners&rsquo; newsletter and shared use of the spa, restaurant and estate facilities create natural connections between residents."
            />
            <FaqItem
              question="What happens if I want to exit the rental programme?"
              answer="After the three-year guaranteed period, you may reduce your rental availability, increase personal use or exit the programme entirely with standard notice. Your lodge remains yours regardless of rental participation."
            />
            <FaqItem
              question="Is this a leasehold property?"
              answer="Technically, the 125-year licence is similar to a long lease but specific to holiday park and leisure estate structures. It provides security of tenure and the right to occupy, modify (with approval) and transfer your lodge."
            />
            <FaqItem
              question="What warranty comes with a new lodge?"
              answer="All new-build lodges come with a manufacturer&rsquo;s structural warranty, typically ten years. Fixtures, appliances and systems carry individual manufacturer warranties. The estate management team coordinates all warranty claims on your behalf."
            />
            <FaqItem
              question="How is the 8% rental income calculated?"
              answer="Eight percent of your purchase price per annum, paid quarterly in arrears. For a lodge purchased at £475,000, that is £38,000 per year or £9,500 per quarter, gross of any applicable charges."
            />
            <FaqItem
              question="Can I leave my lodge to family?"
              answer="Yes. The 125-year licence can be transferred through inheritance. Standard estate transfer processes apply but there is no prohibition on passing the lodge to family members."
            />
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <p className="eyebrow text-on-surface-muted">Need more detail?</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Speak to Rebecca directly
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-body text-on-surface-variant">
            Our ownership coordinator is available Monday to Friday and can
            answer any question not covered here. No scripts, no sales
            pressure — just straightforward conversation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkArrow href="tel:01288361940">01288 361940</LinkArrow>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            Ready to see it for yourself?
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            Most questions are best answered in person. Book a private viewing
            and walk the estate with our team.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/own/viewing/book">
              <Button variant="secondary" size="lg" className="border-primary-fg text-primary-fg hover:bg-primary-fg hover:text-primary">
                Book a Viewing
              </Button>
            </Link>
            <Link href="/own/brochure">
              <Button variant="ghost" size="lg" className="text-primary-fg hover:bg-primary-fg/10">
                Request Brochure
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="border-b border-outline-variant/30 py-8 first:pt-0 last:border-b-0">
      <h3 className="text-h3 font-display text-on-surface">{question}</h3>
      <p className="mt-3 text-body text-on-surface-variant max-w-3xl">
        {answer}
      </p>
    </div>
  );
}
