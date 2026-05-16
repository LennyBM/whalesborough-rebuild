import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spa Gift Vouchers | The W Club | Whalesborough",
  description:
    "Gift a spa day, a treatment or a monetary voucher. Delivered by email or as a physical card. The W Club Spa at Whalesborough Farm Resort.",
};

const experienceVouchers = [
  {
    name: "The Estate Day",
    description:
      "A full spa day including pool access, a 55-minute treatment and two-course lunch. Our most gifted package.",
  },
  {
    name: "The Ritual Day",
    description:
      "Our most indulgent spa day — two treatments, three-course lunch and Cornish sparkling wine on arrival.",
  },
  {
    name: "Twilight Spa",
    description:
      "An evening spa session with pool access, express treatment and light supper. A thoughtful mid-week gift.",
  },
  {
    name: "Signature Facial",
    description:
      "The 80-minute Estate Facial using Gaia Natural Skincare. Deep cleansing, serums, mask work and scalp massage.",
  },
  {
    name: "Deep Tissue Massage",
    description:
      "A 90-minute targeted massage for someone who carries tension. Heated stones, firm pressure and stretching.",
  },
];

const monetaryOptions = [
  { value: "£50", note: "Enough for an express treatment" },
  { value: "£100", note: "A full facial or massage" },
  { value: "£150", note: "Treatment plus lunch" },
  { value: "£250", note: "A full spa day experience" },
  { value: "Custom", note: "Choose any amount" },
];

export default function GiftVouchersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club · Gifting</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Give stillness as{" "}
            <span className="italic">a gift</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            A spa voucher is not a last resort — it is permission to stop.
            Choose a specific experience or let the recipient decide with a
            monetary voucher. Delivered digitally or as a physical card.
          </p>
          <div className="mt-10">
            <Link href="/spa/booking">
              <LinkArrow>Purchase a voucher</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Vouchers */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Experience vouchers</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Choose their experience
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
            Gift a specific spa day or treatment. The recipient books a date
            that works for them — vouchers are valid for twelve months.
          </p>
          <div className="mt-12 space-y-8">
            {experienceVouchers.map((v) => (
              <div
                key={v.name}
                className="border-b border-outline-variant pb-8 last:border-0"
              >
                <h3 className="text-h3 text-on-surface">{v.name}</h3>
                <p className="mt-2 max-w-2xl text-body text-on-surface-variant">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monetary Vouchers */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Monetary vouchers</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Let them choose
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
            A monetary voucher can be redeemed against any treatment, spa day
            or product in the spa shop. Valid for twelve months from purchase.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
            {monetaryOptions.map((opt) => (
              <div key={opt.value} className="bg-surface-container-low p-6 text-center">
                <p className="text-h2 text-on-surface">{opt.value}</p>
                <p className="mt-2 text-body-sm text-on-surface-muted">
                  {opt.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-h3 text-on-surface">Digital delivery</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Instant email delivery with a personalised message. Ideal for
                last-minute gifts or recipients who live far away. A beautifully
                designed PDF they can print or show on their phone.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Physical card</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                A printed voucher card in a branded envelope, posted first-class.
                Allow 3–5 working days for delivery. Something tangible to
                unwrap — particularly good for birthdays and Christmas.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/spa/booking">
              <LinkArrow>Purchase a voucher</LinkArrow>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
