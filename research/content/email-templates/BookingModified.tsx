/**
 * 11 · BookingModified
 * Sent: when a booking is changed (dates, occupancy, add-on).
 * Purpose: confirm the change, show old vs new, surface refund or upcharge.
 * Type: transactional.
 */

import * as React from 'react';
import { Section, Row, Column } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  DividerSection,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  TwoColumnInfo,
  tokens,
} from './_components';

export interface BookingModifiedProps {
  guestFirstName: string;
  bookingReference: string;
  propertyName: string;
  changesSummary: string; // e.g. "Departure date moved from 17 June to 19 June"
  before: { label: string; value: string }[];
  after: { label: string; value: string }[];
  balanceAction: 'refund' | 'charge' | 'none';
  balanceAmount: string;
  balanceTiming: string; // "Refund to your Visa within 5 working days"
  manageBookingUrl: string;
  viewInBrowserUrl?: string;
}

export const BookingModified: React.FC<BookingModifiedProps> = ({
  guestFirstName,
  bookingReference,
  propertyName,
  changesSummary,
  before,
  after,
  balanceAction,
  balanceAmount,
  balanceTiming,
  manageBookingUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Your booking has been updated — ${changesSummary}`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Booking updated</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, your changes are confirmed.
    </Heading>
    <Paragraph>
      We have adjusted booking {bookingReference} for {propertyName}.{' '}
      {changesSummary}. Below is the before-and-after — please check it
      reflects what you asked for.
    </Paragraph>

    <Row style={{ marginTop: tokens.space.md }}>
      <Column style={{ width: '50%', verticalAlign: 'top', paddingRight: '6px' }}>
        <Eyebrow>Before</Eyebrow>
        <TwoColumnInfo rows={before} />
      </Column>
      <Column style={{ width: '50%', verticalAlign: 'top', paddingLeft: '6px' }}>
        <Eyebrow>After</Eyebrow>
        <TwoColumnInfo rows={after} />
      </Column>
    </Row>

    <SoftRule />

    {balanceAction !== 'none' && (
      <>
        <Heading level={3}>
          {balanceAction === 'refund' ? 'Refund' : 'Additional charge'}
        </Heading>
        <Paragraph>
          {balanceAction === 'refund'
            ? `${balanceAmount} will be returned to your original payment method. ${balanceTiming}.`
            : `${balanceAmount} has been taken from your original payment method. ${balanceTiming}.`}
        </Paragraph>
        <SoftRule />
      </>
    )}

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={manageBookingUrl}>View updated booking</Button>
    </Section>

    <Paragraph muted size="sm">
      If anything looks off, reply to this email within seven days and we
      will rectify it.
    </Paragraph>

    <DividerSection />
    <Signature />
  </EmailLayout>
);

export default BookingModified;
