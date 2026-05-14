/**
 * 34 · WinBack
 * Sent: 18 - 24 months since last stay; no recent engagement.
 * Purpose: re-introduce; warm not pushy; offer a gentle reason to return.
 * Type: marketing (PECR — explicit consent; offers single-click unsubscribe).
 *
 * Note: if the contact does not engage with this, the next system step is
 *       to auto-suppress marketing for them and request fresh consent only
 *       if they initiate contact. Aligns with ICO win-back guidance.
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  BulletList,
  Callout,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  tokens,
} from './_components';

export interface WinBackProps {
  guestFirstName: string;
  yearsSinceLastStay: number;
  whatHasChanged: string[]; // 2-3 short, specific things
  exploreUrl: string;
  preferencesUrl: string;
  consentId: string;
  viewInBrowserUrl?: string;
}

export const WinBack: React.FC<WinBackProps> = ({
  guestFirstName,
  yearsSinceLastStay,
  whatHasChanged,
  exploreUrl,
  preferencesUrl,
  consentId,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`It has been ${yearsSinceLastStay} years`}
    consentId={consentId}
    isMarketing
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>It has been a while</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, a quiet hello.
    </Heading>
    <Paragraph>
      It has been about {yearsSinceLastStay}{' '}
      {yearsSinceLastStay === 1 ? 'year' : 'years'} since you last stayed
      with us. We thought we would write — partly to say we have been
      thinking of you, partly to mention a few things you may not have
      seen.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>What has changed</Heading>
    <BulletList items={whatHasChanged.map((c) => <>{c}</>)} />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={exploreUrl}>See what is different</Button>
    </Section>

    <SoftRule />

    <Callout title="And if not">
      We would rather your inbox stayed peaceful than crowded. If
      Whalesborough is no longer for you, this is the right moment to
      step back from our messages — without losing your guest profile.
      Use the unsubscribe link below, or{' '}
      <Link href={preferencesUrl} style={{ color: tokens.color.primary }}>
        choose fewer messages
      </Link>{' '}
      instead.
    </Callout>

    <Paragraph muted size="sm">
      We have always treated time as expensive. Yours is no exception.
    </Paragraph>

    <SoftRule />
    <Signature name="Tania Tregenna" role="Director of Guest Experience" />
  </EmailLayout>
);

export default WinBack;
