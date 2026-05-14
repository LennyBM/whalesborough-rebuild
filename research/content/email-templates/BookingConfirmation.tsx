/**
 * 01 · BookingConfirmation
 * Sent: immediately on payment success.
 * Purpose: confirm booking, surface key facts, offer wallet pass.
 * Type: transactional (no unsubscribe required).
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  BulletList,
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

export interface BookingConfirmationProps {
  guestFirstName: string;
  bookingReference: string;
  propertyName: string;
  propertyType: string;
  arrivalDate: string;
  departureDate: string;
  nights: number;
  guests: { adults: number; children: number; babies: number; pets: number };
  totalPaid: string;
  walletPassUrl: string;
  manageBookingUrl: string;
  viewInBrowserUrl?: string;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  guestFirstName,
  bookingReference,
  propertyName,
  propertyType,
  arrivalDate,
  departureDate,
  nights,
  guests,
  totalPaid,
  walletPassUrl,
  manageBookingUrl,
  viewInBrowserUrl,
}) => {
  const guestString = [
    `${guests.adults} ${guests.adults === 1 ? 'adult' : 'adults'}`,
    guests.children > 0 &&
      `${guests.children} ${guests.children === 1 ? 'child' : 'children'}`,
    guests.babies > 0 &&
      `${guests.babies} ${guests.babies === 1 ? 'baby' : 'babies'}`,
    guests.pets > 0 &&
      `${guests.pets} ${guests.pets === 1 ? 'dog' : 'dogs'}`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <EmailLayout
      preview={`Your stay at ${propertyName} is confirmed for ${arrivalDate}`}
      viewInBrowserUrl={viewInBrowserUrl}
    >
      <Eyebrow>Booking confirmed</Eyebrow>
      <Heading level={1}>
        {guestFirstName}, your stay is held in your name.
      </Heading>
      <Paragraph>
        Thank you for choosing Whalesborough. {propertyName}, your{' '}
        {propertyType.toLowerCase()}, is reserved for you from {arrivalDate}.
        We will write again in the days before your arrival with everything you
        need to know.
      </Paragraph>

      <TwoColumnInfo
        rows={[
          { label: 'Reference', value: bookingReference },
          { label: 'Property', value: propertyName },
          { label: 'Arrival', value: arrivalDate },
          { label: 'Departure', value: departureDate },
          { label: 'Nights', value: String(nights) },
          { label: 'Guests', value: guestString },
          { label: 'Paid in full', value: totalPaid },
        ]}
      />

      <Section style={{ textAlign: 'center', margin: `${tokens.space.lg} 0` }}>
        <Button href={walletPassUrl}>Add to Apple or Google Wallet</Button>
      </Section>

      <Paragraph muted size="sm">
        Need to change something? You can adjust dates, add a hamper or invite
        a dog at any time from your{' '}
        <Link
          href={manageBookingUrl}
          style={{ color: tokens.color.primary }}
        >
          guest portal
        </Link>
        .
      </Paragraph>

      <SoftRule />

      <Heading level={3}>What happens next</Heading>
      <BulletList
        items={[
          'Thirty days before arrival, a checklist arrives with restaurant and spa booking windows.',
          'Fourteen days before, a gentle reminder to reserve your table and any treatments.',
          'Twenty-four hours before, gate codes, parking and arrival instructions.',
        ]}
      />

      <Callout title="Lost the email?">
        Sign in at{' '}
        <Link
          href={`${company.website}/account`}
          style={{ color: tokens.color.primary }}
        >
          whalesborough.co.uk/account
        </Link>{' '}
        to view your booking, download invoices and add experiences.
      </Callout>

      <DividerSection />
      <Signature />
    </EmailLayout>
  );
};

export default BookingConfirmation;
