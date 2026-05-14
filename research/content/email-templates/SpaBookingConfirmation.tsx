/**
 * 13 · SpaBookingConfirmation
 * Sent: immediately on spa treatment / spa day booking.
 * Purpose: confirm treatment, surface arrival ritual, prompt health intake.
 * Type: transactional.
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

export interface SpaBookingConfirmationProps {
  guestFirstName: string;
  bookingReference: string;
  treatmentName: string;
  duration: string; // "60 minutes"
  therapistName?: string;
  dateTime: string;
  arrivalTime: string; // "15 minutes before treatment"
  intakeFormUrl: string;
  manageBookingUrl: string;
  totalPaid: string;
  viewInBrowserUrl?: string;
}

export const SpaBookingConfirmation: React.FC<SpaBookingConfirmationProps> = ({
  guestFirstName,
  bookingReference,
  treatmentName,
  duration,
  therapistName,
  dateTime,
  arrivalTime,
  intakeFormUrl,
  manageBookingUrl,
  totalPaid,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`${treatmentName} at The W Club Spa is reserved`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>The W Club Spa</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, your ritual is held.
    </Heading>
    <Paragraph>
      {treatmentName} is reserved for you on {dateTime}
      {therapistName ? ` with ${therapistName}` : ''}. Below are the small
      practicalities — and one important thing we will need from you
      before your arrival.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Reference', value: bookingReference },
        { label: 'Treatment', value: treatmentName },
        { label: 'Duration', value: duration },
        ...(therapistName ? [{ label: 'Therapist', value: therapistName }] : []),
        { label: 'Date and time', value: dateTime },
        { label: 'Arrival', value: arrivalTime },
        { label: 'Paid in full', value: totalPaid },
      ]}
    />

    <SoftRule />

    <Heading level={3}>Before you arrive</Heading>
    <Paragraph>
      Please complete the spa health intake form. It takes three minutes
      and helps our therapists tailor your treatment safely.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={intakeFormUrl}>Complete the intake form</Button>
    </Section>
    <Paragraph muted size="sm">
      Your responses are held confidentially under our medical-data
      handling policy and are accessible only to the therapist treating
      you.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>What to expect</Heading>
    <BulletList
      items={[
        'A robe, slippers and a private locker are laid out when you arrive.',
        'The relaxation room opens an hour before your treatment — herbal teas, sea-view loungers.',
        'The pool, steam room and sauna are yours for the day; you may stay until 9pm.',
        'Mobile phones politely silenced once you step beyond the lobby.',
      ]}
    />

    <Callout title="Cancellations">
      Free of charge until 48 hours before. After that we charge fifty per
      cent of the treatment, since therapist time has been held for you.
      You can rearrange any time via your{' '}
      <Link href={manageBookingUrl} style={{ color: tokens.color.primary }}>
        guest portal
      </Link>
      .
    </Callout>

    <SoftRule />
    <Signature name="The W Club Spa" role="Treatment reservations" />
  </EmailLayout>
);

export default SpaBookingConfirmation;
