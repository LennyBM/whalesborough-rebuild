/**
 * 19 · RestaurantReservationConfirmation
 * Sent: immediately on Weir Restaurant reservation.
 * Purpose: confirm cover count, time, seating preference, dietary notes.
 * Type: transactional.
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
  TwoColumnInfo,
  tokens,
} from './_components';

export interface RestaurantReservationConfirmationProps {
  guestFirstName: string;
  reservationReference: string;
  service: string; // "Lunch", "Dinner", "Grill and Chill"
  dateTime: string;
  covers: number;
  seatingPreference: string; // "Terrace", "Lakeside booth", "Dog-friendly section"
  dietaryNotes?: string;
  occasionNote?: string;
  manageBookingUrl: string;
  viewInBrowserUrl?: string;
}

export const RestaurantReservationConfirmation: React.FC<
  RestaurantReservationConfirmationProps
> = ({
  guestFirstName,
  reservationReference,
  service,
  dateTime,
  covers,
  seatingPreference,
  dietaryNotes,
  occasionNote,
  manageBookingUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Your table at The Weir is reserved for ${dateTime}`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>The Weir Restaurant</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, your table is held.
    </Heading>
    <Paragraph>
      We have reserved a table for {covers}{' '}
      {covers === 1 ? 'guest' : 'guests'} for {service.toLowerCase()} on{' '}
      {dateTime}. Below is what we have noted; please let us know if
      anything has changed.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Reference', value: reservationReference },
        { label: 'Service', value: service },
        { label: 'Date and time', value: dateTime },
        { label: 'Covers', value: String(covers) },
        { label: 'Seating', value: seatingPreference },
        ...(dietaryNotes ? [{ label: 'Dietary notes', value: dietaryNotes }] : []),
        ...(occasionNote ? [{ label: 'Occasion', value: occasionNote }] : []),
      ]}
    />

    <SoftRule />

    <Heading level={3}>What to expect</Heading>
    <Paragraph>
      The Weir is a chef-led, lake-view dining room — vegetable-forward,
      Cornish-rooted, six courses by tasting menu or three by à la carte.
      Smart casual; dogs welcome in our garden section.
    </Paragraph>

    <Callout title="Running late?">
      We hold tables for fifteen minutes. After that we may need to seat
      another party, though we always try to find you a corner.
    </Callout>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={manageBookingUrl}>Manage this reservation</Button>
    </Section>

    <Paragraph muted size="sm">
      Free to cancel up to 24 hours ahead. After that we charge £25 per
      cover, which the kitchen has otherwise prepared for.
    </Paragraph>

    <SoftRule />
    <Signature name="The Weir Restaurant" role="Reservations" />
  </EmailLayout>
);

export default RestaurantReservationConfirmation;
