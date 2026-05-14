/**
 * 24 · ViewingConfirmation
 * Sent: immediately on lodge viewing day RSVP.
 * Purpose: confirm date, agenda, parking, accommodation upsell.
 * Type: transactional (lead nurture — RSVP fulfilment).
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
  TwoColumnInfo,
  tokens,
} from './_components';

export interface ViewingConfirmationProps {
  prospectFirstName: string;
  viewingDate: string;
  arrivalTime: string;
  partySize: number;
  agendaItems: string[];
  parkingNote: string;
  accommodationOfferUrl: string;
  manageBookingUrl: string;
  consentId: string;
  viewInBrowserUrl?: string;
}

export const ViewingConfirmation: React.FC<ViewingConfirmationProps> = ({
  prospectFirstName,
  viewingDate,
  arrivalTime,
  partySize,
  agendaItems,
  parkingNote,
  accommodationOfferUrl,
  manageBookingUrl,
  consentId,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Your viewing day at Whalesborough — ${viewingDate}`}
    consentId={consentId}
    isMarketing
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Your viewing day</Eyebrow>
    <Heading level={1}>
      {prospectFirstName}, we will see you on {viewingDate}.
    </Heading>
    <Paragraph>
      Thank you for accepting. We have a small group of {partySize}{' '}
      {partySize === 1 ? 'guest' : 'guests'} joining us. The day is
      unrushed — please plan to be with us until early afternoon.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Date', value: viewingDate },
        { label: 'Arrival', value: arrivalTime },
        { label: 'Party size', value: String(partySize) },
        { label: 'Duration', value: 'Roughly four hours, including lunch' },
        { label: 'Parking', value: parkingNote },
      ]}
    />

    <SoftRule />

    <Heading level={3}>The morning, broadly</Heading>
    <BulletList items={agendaItems} />

    <Callout title="Stay the night before?">
      Many viewers travel from London and the Midlands. We hold a small
      number of complimentary cottage stays for the evening preceding a
      viewing — first come, first served.{' '}
      <Link
        href={accommodationOfferUrl}
        style={{ color: tokens.color.primary }}
      >
        Ask about a complimentary stay
      </Link>
      .
    </Callout>

    <SoftRule />

    <Heading level={3}>Worth thinking about</Heading>
    <BulletList
      items={[
        'Layers — the estate walk takes us across open ground.',
        'Sensible shoes — there is some unmade path on the lake walk.',
        'A camera, if you would like; the lodges photograph beautifully in February light.',
        'A few questions you are unsure how to ask — we welcome them.',
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={manageBookingUrl} variant="ghost">
        Manage your RSVP
      </Button>
    </Section>

    <Paragraph muted size="sm">
      Plans change. If you can no longer attend, please let us know by
      replying to this email — it allows us to offer the place to someone
      on the waiting list.
    </Paragraph>

    <SoftRule />
    <Signature
      name="Catherine Pollard"
      role="Director of Property, Whalesborough"
    />
  </EmailLayout>
);

export default ViewingConfirmation;
