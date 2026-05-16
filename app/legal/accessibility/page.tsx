import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Our commitment to making this website accessible to everyone — WCAG 2.2 Level AA conformance.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Accessibility Statement"
      description="Our commitment to making this website accessible to everyone, in line with WCAG 2.2 Level AA."
    >
      <div className="prose-legal max-w-3xl space-y-12 text-on-surface-variant">
        <p className="text-body-sm text-on-surface-muted">
          Last updated: May 2026
        </p>

        {/* 1. Our Commitment */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">1. Our Commitment</h2>
          <p className="text-body">
            Whalesborough Farm Resort &amp; Spa is committed to ensuring digital
            accessibility for people with disabilities. We are continually
            improving the user experience for everyone and applying the relevant
            accessibility standards.
          </p>
          <p className="text-body">
            We aim to conform to the Web Content Accessibility Guidelines (WCAG)
            2.2 at Level AA. These guidelines explain how to make web content
            more accessible to people with a wide range of disabilities,
            including visual, auditory, physical, speech, cognitive, language,
            learning, and neurological disabilities.
          </p>
        </section>

        {/* 2. What We Have Done */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">2. What We Have Done</h2>
          <p className="text-body">
            We have taken the following steps to ensure accessibility across our
            website:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              Semantic HTML structure throughout, using appropriate heading
              levels, landmarks, and ARIA labels
            </li>
            <li>
              Sufficient colour contrast ratios meeting WCAG 2.2 AA minimum
              requirements (4.5:1 for normal text, 3:1 for large text)
            </li>
            <li>
              All interactive elements are keyboard accessible and have visible
              focus indicators
            </li>
            <li>
              Images include descriptive alternative text; decorative images are
              hidden from assistive technology
            </li>
            <li>
              Forms include associated labels, clear error messages, and
              instructions
            </li>
            <li>
              Responsive design that works across screen sizes and supports text
              resizing up to 200%
            </li>
            <li>
              Skip navigation links to bypass repetitive content
            </li>
            <li>
              No content that flashes more than three times per second
            </li>
            <li>
              Touch targets meet the minimum 24x24 CSS pixel requirement (WCAG
              2.2 Target Size criterion)
            </li>
            <li>
              Consistent navigation and help mechanisms across all pages
            </li>
            <li>
              No reliance on dragging movements as the sole means of operation
            </li>
          </ul>
        </section>

        {/* 3. Known Limitations */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">3. Known Limitations</h2>
          <p className="text-body">
            Despite our best efforts, some areas of the website may not yet be
            fully accessible. Known limitations include:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Third-party booking widgets:</strong> Some embedded booking
              systems (Landal accommodation, Try.be spa) are operated by third
              parties and may not fully conform to WCAG 2.2 AA. We work with
              these providers to improve accessibility and offer alternative
              booking methods (telephone, email) where their interfaces fall
              short.
            </li>
            <li>
              <strong>PDF documents:</strong> Some older PDF documents may not be
              fully accessible. We are working to replace these with accessible
              HTML alternatives or remediated PDFs.
            </li>
            <li>
              <strong>Maps:</strong> Interactive maps may be difficult to use
              with assistive technology. Text-based directions are provided as an
              alternative.
            </li>
          </ul>
          <p className="text-body">
            We are actively working to resolve these issues. If you encounter
            any barriers, please contact us and we will provide the information
            or service in an alternative format.
          </p>
        </section>

        {/* 4. Compatibility */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            4. Browser &amp; Assistive Technology Compatibility
          </h2>
          <p className="text-body">
            This website is designed to be compatible with the following
            assistive technologies:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
            <li>Screen magnification software</li>
            <li>Speech recognition software (Dragon NaturallySpeaking)</li>
            <li>Keyboard-only navigation</li>
          </ul>
          <p className="text-body">
            The website is designed to be compatible with recent versions of
            Chrome, Firefox, Safari, and Edge.
          </p>
        </section>

        {/* 5. Reporting Issues */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            5. How to Report Accessibility Issues
          </h2>
          <p className="text-body">
            We welcome your feedback on the accessibility of this website. If
            you experience any difficulty accessing content or functionality,
            please contact us:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:accessibility@whalesborough.co.uk"
                className="underline hover:text-primary"
              >
                accessibility@whalesborough.co.uk
              </a>
            </li>
            <li>
              <strong>Telephone:</strong> 01288 361378
            </li>
            <li>
              <strong>Post:</strong> Accessibility Team, Whalesborough Farm,
              Marhamchurch, Bude, Cornwall EX23 0JD
            </li>
          </ul>
          <p className="text-body">
            When reporting an issue, please include:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>The web address (URL) of the page where you found the issue</li>
            <li>A description of the problem you encountered</li>
            <li>
              The assistive technology and browser you were using (if applicable)
            </li>
          </ul>
          <p className="text-body">
            We aim to respond to accessibility feedback within 5 working days
            and to resolve issues within 28 days where possible.
          </p>
        </section>

        {/* 6. Enforcement Procedure */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">6. Enforcement Procedure</h2>
          <p className="text-body">
            If you are not satisfied with our response to your accessibility
            concern, you can contact the Equality and Human Rights Commission
            (EHRC):
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              Website:{" "}
              <a
                href="https://www.equalityhumanrights.com"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                equalityhumanrights.com
              </a>
            </li>
            <li>Telephone: 0808 800 0082</li>
          </ul>
          <p className="text-body">
            The Equality Act 2010 protects people from discrimination in the
            workplace and in wider society, and places a duty on service
            providers to make reasonable adjustments to ensure their services are
            accessible to disabled people.
          </p>
        </section>

        {/* 7. Technical Specifications */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            7. Technical Specifications
          </h2>
          <p className="text-body">
            This website relies upon the following technologies for conformance
            with WCAG 2.2 Level AA:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>HTML5</li>
            <li>WAI-ARIA 1.2</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
        </section>

        {/* 8. Assessment Approach */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">8. Assessment Approach</h2>
          <p className="text-body">
            Whalesborough Farm Resort &amp; Spa assesses the accessibility of
            this website through:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>Automated accessibility testing tools (axe, Lighthouse)</li>
            <li>Manual testing with keyboard navigation</li>
            <li>Testing with screen readers (VoiceOver, NVDA)</li>
            <li>Ongoing code reviews against WCAG 2.2 success criteria</li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
