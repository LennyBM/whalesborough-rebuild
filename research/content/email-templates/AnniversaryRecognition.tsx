/**
 * 33 · AnniversaryRecognition
 * Sent: anniversary of first stay (or wedding anniversary if shared).
 * Purpose: warmly recall the relationship; no overt sales pitch.
 * Type: marketing (PECR — requires consent).
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

export interface AnniversaryRecognitionProps {
  guestFirstName: string;
  anniversaryType: string; // "first stay with us", "wedding anniversary"
  yearsCount: number;
  memoryNote: string; // e.g. "You stayed in Calf House that May; the lake had wildflowers"
  bookStayUrl: string;
  consentId: string;
  viewInBrowserUrl?: string;
}

export const AnniversaryRecognition: React.FC<AnniversaryRecognitionProps> = ({
  guestFirstName,
  anniversaryType,
  yearsCount,
  memoryNote,
  bookStayUrl,
  consentId,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`${yearsCount} years on`}
    consentId={consentId}
    isMarketing
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>{yearsCount} years on</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, a small remembering.
    </Heading>
    <Paragraph>
      Today is the anniversary of your {anniversaryType} — {yearsCount}{' '}
      {yearsCount === 1 ? 'year' : 'years'} ago.
    </Paragraph>

    <Section
      style={{
        backgroundColor: tokens.color.surfaceLow,
        padding: tokens.space.lg,
        margin: `${tokens.space.md} 0`,
        borderLeft: `3px solid ${tokens.color.primary}`,
      }}
    >
      <Paragraph>{memoryNote}</Paragraph>
    </Section>

    <Paragraph>
      We thought of you and wanted to send a single message, with no
      strings — only to say that we remember.
    </Paragraph>

    <Paragraph>
      If you are in the mood for a return, we have set aside two midweek
      nights in your favourite cottage at residency rates for the next
      thirty days. No code needed; the offer is on your account.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={bookStayUrl} variant="ghost">
        See available dates
      </Button>
    </Section>

    <SoftRule />
    <Signature name="Tania Tregenna" role="Director of Guest Experience" />
  </EmailLayout>
);

export default AnniversaryRecognition;
