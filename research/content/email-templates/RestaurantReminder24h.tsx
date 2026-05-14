/**
 * 20 · RestaurantReminder24h
 * Sent: 24 hours before the table.
 * Purpose: confirm the cover is still wanted; surface a way to adjust.
 * Type: transactional.
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  TwoColumnInfo,
  tokens,
} from './_components';

export interface RestaurantReminder24hProps {
  guestFirstName: string;
  service: string;
  dateTime: string;
  covers: number;
  modifyUrl: string;
  cancelUrl: string;
  viewInBrowserUrl?: string;
}

export const RestaurantReminder24h: React.FC<RestaurantReminder24hProps> = ({
  guestFirstName,
  service,
  dateTime,
  covers,
  modifyUrl,
  cancelUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Tomorrow at The Weir — ${dateTime}`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Tomorrow</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, your table tomorrow.
    </Heading>
    <Paragraph>
      A quick word to confirm we are expecting you tomorrow,{' '}
      {dateTime.toLowerCase()}, for {service.toLowerCase()}.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Service', value: service },
        { label: 'Date and time', value: dateTime },
        { label: 'Covers', value: String(covers) },
      ]}
    />

    <Paragraph>
      If your plans have changed or your numbers have shifted, please let
      us know. We can rearrange without charge until midnight tonight.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link href={modifyUrl} style={{ color: tokens.color.primary, marginRight: tokens.space.md }}>
        Change reservation
      </Link>
      <Link href={cancelUrl} style={{ color: tokens.color.onSurfaceMuted }}>
        Cancel reservation
      </Link>
    </Section>

    <SoftRule />
    <Signature name="The Weir Restaurant" role="Reservations" />
  </EmailLayout>
);

export default RestaurantReminder24h;
