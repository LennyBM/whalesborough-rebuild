/**
 * 10 · PostStayReview
 * Sent: 3 days after departure.
 * Purpose: collect Feefo and Google reviews — separate, dedicated links so
 *          we control review surface mix.
 * Type: lifecycle (transactional — tied to recent stay).
 *
 * Note: not marketing, so no unsubscribe required. Review requests are a
 *       legitimate-interest follow-up to a paid service.
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  Callout,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  tokens,
} from './_components';

export interface PostStayReviewProps {
  guestFirstName: string;
  propertyName: string;
  feefoReviewUrl: string;
  googleReviewUrl: string;
  privateFeedbackUrl: string;
  viewInBrowserUrl?: string;
}

export const PostStayReview: React.FC<PostStayReviewProps> = ({
  guestFirstName,
  propertyName,
  feefoReviewUrl,
  googleReviewUrl,
  privateFeedbackUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="If you had a moment, a few words about your stay."
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>A small request</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, a few words, if you have them.
    </Heading>
    <Paragraph>
      We hope you are home, settled, with a good cup of tea. {propertyName}{' '}
      already feels different without you. If you had the time, a short
      review helps us in two distinct ways.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>For other guests</Heading>
    <Paragraph>
      Most of our visitors find us through Feefo or Google. Your words
      shape what they expect — and what we are accountable to.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={feefoReviewUrl}>Leave a Feefo review</Button>
    </Section>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={googleReviewUrl} variant="ghost">
        Leave a Google review
      </Button>
    </Section>

    <Paragraph muted size="sm">
      Feefo is independently verified; Google reaches a wider audience.
      Both, neither, one — it is entirely up to you. They take about three
      minutes each.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>For us, privately</Heading>
    <Paragraph>
      If something didn't sit right and you would rather raise it with us
      directly, please do. We take quiet feedback as seriously as a public
      review — perhaps more so.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link
        href={privateFeedbackUrl}
        style={{ color: tokens.color.primary }}
      >
        Send a private note →
      </Link>
    </Section>

    <Callout title="Thank you, sincerely">
      Every review is read by Tania and the team. When you mention a
      housekeeper, a chef or a concierge by name, we make sure they hear
      about it the same day.
    </Callout>

    <SoftRule />
    <Signature name="Tania Tregenna" role="Director of Guest Experience" />
  </EmailLayout>
);

export default PostStayReview;
