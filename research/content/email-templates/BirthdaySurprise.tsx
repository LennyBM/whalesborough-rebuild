/**
 * 32 · BirthdaySurprise
 * Sent: on guest's birthday.
 * Purpose: acknowledge with a small, tasteful gesture (not a discount blast).
 * Type: marketing (PECR — requires consent, captured at account creation).
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  tokens,
} from './_components';

export interface BirthdaySurpriseProps {
  guestFirstName: string;
  giftDescription: string; // "A bottle of Camel Valley on your next stay"
  giftCode: string;
  expiryDate: string;
  bookStayUrl: string;
  consentId: string;
  viewInBrowserUrl?: string;
}

export const BirthdaySurprise: React.FC<BirthdaySurpriseProps> = ({
  guestFirstName,
  giftDescription,
  giftCode,
  expiryDate,
  bookStayUrl,
  consentId,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`A small gesture for your birthday, ${guestFirstName}`}
    consentId={consentId}
    isMarketing
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Today</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, a small gesture, with our love.
    </Heading>
    <Paragraph>
      Happy birthday from Cornwall. We keep this short, knowing your
      inbox is heavier than usual today.
    </Paragraph>

    <Section
      style={{
        backgroundColor: tokens.color.surfaceMid,
        padding: tokens.space.lg,
        margin: `${tokens.space.md} 0`,
        textAlign: 'center',
      }}
    >
      <Eyebrow>Your birthday gift</Eyebrow>
      <Heading level={3} align="center">
        {giftDescription}
      </Heading>
      <Paragraph muted size="sm">
        Code{' '}
        <span
          style={{
            fontFamily: 'Menlo, Consolas, monospace',
            fontWeight: 600,
            color: tokens.color.onSurface,
          }}
        >
          {giftCode}
        </span>{' '}
        — valid until {expiryDate}
      </Paragraph>
    </Section>

    <Paragraph>
      Add the code to any cottage booking made through your guest
      account. We will lay it out on the kitchen island for you.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={bookStayUrl}>Book a stay</Button>
    </Section>

    <SoftRule />
    <Paragraph muted size="sm">
      No catch, no minimum spend. One per guest, once a year.
    </Paragraph>
    <Signature />
  </EmailLayout>
);

export default BirthdaySurprise;
