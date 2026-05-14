/**
 * 31 · NewsletterWelcome
 * Sent: on newsletter sign-up (double-opt-in confirmed).
 * Purpose: welcome, set rhythm and content expectations.
 * Type: marketing (PECR — requires explicit consent, captured at signup).
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  BulletList,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  tokens,
} from './_components';

export interface NewsletterWelcomeProps {
  subscriberFirstName: string;
  preferencesUrl: string;
  archiveUrl: string;
  consentId: string;
  viewInBrowserUrl?: string;
}

export const NewsletterWelcome: React.FC<NewsletterWelcomeProps> = ({
  subscriberFirstName,
  preferencesUrl,
  archiveUrl,
  consentId,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Welcome to the Whalesborough Journal"
    consentId={consentId}
    isMarketing
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Welcome</Eyebrow>
    <Heading level={1}>
      {subscriberFirstName}, welcome to the Journal.
    </Heading>
    <Paragraph>
      Thank you for subscribing. The Whalesborough Journal arrives in
      your inbox once a month — usually the first Friday — and not at all
      otherwise.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>What to expect</Heading>
    <BulletList
      items={[
        'A note from the kitchen — what Chef Andy is cooking with this season.',
        'A walk worth taking — coast path, woodland, lake circuit, with a route map.',
        'A craft we are admiring — a Cornish maker, a small studio, an honest skill.',
        'Two or three pieces of estate news — quietly, no hard sell.',
      ]}
    />

    <Paragraph>
      The Journal is read by around six thousand people. We answer every
      reply ourselves.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>Tailored, if you would prefer</Heading>
    <Paragraph>
      We send three other small lists: spa events for members, restaurant
      events for diners, and lodge updates for those exploring ownership.
      You can opt into any or none.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={preferencesUrl} variant="ghost">
        Manage your preferences
      </Button>
    </Section>

    <Paragraph muted size="sm">
      Curious about back issues?{' '}
      <Link href={archiveUrl} style={{ color: tokens.color.primary }}>
        The Journal archive
      </Link>{' '}
      is open to all.
    </Paragraph>

    <SoftRule />
    <Signature
      name="Anya Tregenna"
      role="The Whalesborough Journal"
    />
  </EmailLayout>
);

export default NewsletterWelcome;
