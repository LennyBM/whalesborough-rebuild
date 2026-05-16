import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions governing your use of the Whalesborough website.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Use"
      description="Terms and conditions governing your use of this website."
    >
      <div className="prose-legal max-w-3xl space-y-12 text-on-surface-variant">
        <p className="text-body-sm text-on-surface-muted">
          Last updated: 14 May 2026
        </p>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">1. Introduction</h2>
          <p className="text-body">
            These terms of use govern your access to and use of the
            Whalesborough Farm Resort &amp; Spa website
            (whalesborough.co.uk). By using this website, you accept these
            terms in full. If you disagree with any part of these terms, you
            must not use this website.
          </p>
          <p className="text-body">
            This website is operated by Whalesborough Farm Resort &amp; Spa Ltd,
            a company registered in England &amp; Wales. Registered address:
            Whalesborough Farm, Marhamchurch, Bude, Cornwall EX23 0JD.
          </p>
        </section>

        {/* 2. Intellectual Property */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">2. Intellectual Property</h2>
          <p className="text-body">
            All content on this website — including but not limited to text,
            images, photography, graphics, logos, icons, design, layout, and
            software — is the property of Whalesborough Farm Resort &amp; Spa
            Ltd or its licensors and is protected by UK and international
            copyright, trademark, and intellectual property laws.
          </p>
          <p className="text-body">You may:</p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>View pages for personal, non-commercial use</li>
            <li>
              Print or download pages for personal reference, provided you do
              not modify the content
            </li>
          </ul>
          <p className="text-body">You must not:</p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              Reproduce, duplicate, or copy material from this website for
              commercial purposes without written permission
            </li>
            <li>
              Redistribute content from this website (unless content is
              specifically made available for redistribution)
            </li>
            <li>
              Use any content in a manner that infringes our intellectual
              property rights or the rights of any third party
            </li>
          </ul>
        </section>

        {/* 3. Acceptable Use */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">3. Acceptable Use</h2>
          <p className="text-body">
            You must not use this website in any way that causes, or may cause,
            damage to the website or impairs its availability or accessibility.
            You must not use this website:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              In any way that is unlawful, fraudulent, or harmful, or in
              connection with any unlawful, fraudulent, or harmful purpose or
              activity
            </li>
            <li>
              To send, knowingly receive, upload, download, use, or re-use any
              material which does not comply with these terms
            </li>
            <li>
              To transmit or procure the sending of any unsolicited or
              unauthorised advertising or promotional material
            </li>
            <li>
              To knowingly transmit any data, send or upload any material that
              contains viruses, Trojan horses, worms, spyware, or any other
              harmful programs
            </li>
            <li>
              To attempt to gain unauthorised access to our systems or any
              server, computer, or database connected to our website
            </li>
          </ul>
        </section>

        {/* 4. Accuracy of Information */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">4. Accuracy of Information</h2>
          <p className="text-body">
            While we endeavour to ensure that information on this website is
            correct, we do not warrant its completeness or accuracy. The
            material on this website is provided for general information only
            and does not constitute professional advice.
          </p>
          <p className="text-body">
            Prices, availability, and descriptions of services are subject to
            change without notice. Specific terms for accommodation, spa, and
            dining bookings are provided at the point of booking and form a
            separate contract.
          </p>
        </section>

        {/* 5. Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">5. Limitation of Liability</h2>
          <p className="text-body">
            To the extent permitted by law, we exclude all conditions,
            warranties, representations, or other terms that may apply to this
            website or any content on it, whether express or implied.
          </p>
          <p className="text-body">
            We will not be liable to any user for any loss or damage, whether in
            contract, tort (including negligence), breach of statutory duty, or
            otherwise, even if foreseeable, arising under or in connection with:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>Use of, or inability to use, this website</li>
            <li>
              Use of or reliance on any content displayed on this website
            </li>
          </ul>
          <p className="text-body">
            Nothing in these terms excludes or limits our liability for death or
            personal injury arising from our negligence, for fraud or fraudulent
            misrepresentation, or for any other liability that cannot be
            excluded or limited by English law.
          </p>
        </section>

        {/* 6. Third-Party Links */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">6. Third-Party Links</h2>
          <p className="text-body">
            This website may contain links to third-party websites. These links
            are provided for your convenience only. We have no control over the
            content of those sites and accept no responsibility for them or for
            any loss or damage arising from your use of them.
          </p>
        </section>

        {/* 7. Linking to Our Site */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">7. Linking to Our Site</h2>
          <p className="text-body">
            You may link to our homepage provided you do so in a way that is
            fair and legal and does not damage our reputation or take advantage
            of it. You must not establish a link in such a way as to suggest any
            form of association, approval, or endorsement on our part where none
            exists. We reserve the right to withdraw linking permission without
            notice.
          </p>
        </section>

        {/* 8. Variation */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">8. Variation</h2>
          <p className="text-body">
            We may revise these terms of use at any time by amending this page.
            You are expected to check this page from time to time to take notice
            of any changes we make, as they are binding on you.
          </p>
        </section>

        {/* 9. Governing Law */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            9. Governing Law &amp; Jurisdiction
          </h2>
          <p className="text-body">
            These terms of use, their subject matter, and their formation are
            governed by the laws of England &amp; Wales. You and we both agree
            that the courts of England &amp; Wales will have exclusive
            jurisdiction, except that if you are a consumer resident in another
            part of the United Kingdom, you may also bring proceedings in your
            local courts.
          </p>
        </section>

        {/* 10. Contact */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">10. Contact</h2>
          <p className="text-body">
            If you have any questions about these terms, please contact us at{" "}
            <a
              href="mailto:hello@whalesborough.co.uk"
              className="underline hover:text-primary"
            >
              hello@whalesborough.co.uk
            </a>{" "}
            or write to us at Whalesborough Farm, Marhamchurch, Bude, Cornwall
            EX23 0JD.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
