/**
 * 12 · BookingCancelled
 * Sent: when a booking is cancelled.
 * Purpose: confirm cancellation, surface refund amount and timing.
 * Type: transactional.
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  Callout,
  DividerSection,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  TwoColumnInfo,
  company,
  tokens,
} from './_components';

export interface BookingCancelledProps {
  guestFirstName: string;
  bookingReference: string;
  propertyName: string;
  cancelledOn: string;
  arrivalDate: string;
  refundAmount: string;
  retainedAmount: string;
  retainedReason: string; // e.g. "Cancellation outside 28-day refund window"
  refundTiming: string; // "5 working days to your original card"
  rebookUrl: string;
  viewInBrowserUrl?: string;
}

export const BookingCancelled: React.FC<BookingCancelledProps> = ({
  guestFirstName,
  bookingReference,
  propertyName,
  cancelledOn,
  arrivalDate,
  refundAmount,
  retainedAmount,
  retainedReason,
  refundTiming,
  rebookUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Your booking ${bookingReference} has been cancelled.`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Booking cancelled</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, your cancellation is confirmed.
    </Heading>
    <Paragraph>
      We are sorry not to see you on {arrivalDate}. Booking{' '}
      {bookingReference} for {propertyName} was cancelled on {cancelledOn}.
      Below is the refund summary.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Booking reference', value: bookingReference },
        { label: 'Property', value: propertyName },
        { label: 'Cancelled on', value: cancelledOn },
        { label: 'Refund to your card', value: refundAmount },
        { label: 'Retained', value: retainedAmount },
        { label: 'Reason retained', value: retainedReason },
      ]}
    />

    <Callout title="Refund timing">
      {refundTiming}. If it has not appeared after that, please contact{' '}
      <Link
        href={`mailto:${company.reservationsEmail}`}
        style={{ color: tokens.color.primary }}
      >
        {company.reservationsEmail}
      </Link>{' '}
      and we will trace it with your bank.
    </Callout>

    <SoftRule />

    <Heading level={3}>If circumstances change</Heading>
    <Paragraph>
      Should the situation that caused this cancellation alter, we would
      welcome you back. Your guest profile, preferences and any pet
      details remain saved.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={rebookUrl} variant="ghost">
        Browse available dates
      </Button>
    </Section>

    <DividerSection />
    <Signature />
  </EmailLayout>
);

export default BookingCancelled;
