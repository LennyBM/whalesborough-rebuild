/**
 * 21 · EventTicketConfirmation
 * Sent: immediately on event ticket purchase.
 * Purpose: confirm ticket(s), QR code, dress code, parking.
 * Type: transactional.
 */

import * as React from 'react';
import { Img, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  BulletList,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  TwoColumnInfo,
  tokens,
} from './_components';

export interface EventTicketConfirmationProps {
  guestFirstName: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  numberOfTickets: number;
  ticketReference: string;
  qrCodeUrl: string; // PNG URL for the QR
  dressCode: string;
  parkingInfo: string;
  walletPassUrl: string;
  manageBookingUrl: string;
  totalPaid: string;
  viewInBrowserUrl?: string;
}

export const EventTicketConfirmation: React.FC<EventTicketConfirmationProps> = ({
  guestFirstName,
  eventName,
  eventDate,
  eventTime,
  numberOfTickets,
  ticketReference,
  qrCodeUrl,
  dressCode,
  parkingInfo,
  walletPassUrl,
  manageBookingUrl,
  totalPaid,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Your ${eventName} tickets — ${eventDate}`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Tickets confirmed</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, we will see you at {eventName}.
    </Heading>
    <Paragraph>
      Your {numberOfTickets}{' '}
      {numberOfTickets === 1 ? 'ticket' : 'tickets'} for{' '}
      {eventName} on {eventDate} are confirmed. The QR code below admits
      your party — saved to a wallet pass for safekeeping.
    </Paragraph>

    <Section
      style={{
        backgroundColor: tokens.color.surfaceLow,
        padding: tokens.space.lg,
        textAlign: 'center',
        margin: `${tokens.space.md} 0`,
      }}
    >
      <Img
        src={qrCodeUrl}
        alt={`QR code for ticket ${ticketReference}`}
        width="160"
        height="160"
        style={{ display: 'inline-block', margin: '0 auto' }}
      />
      <Paragraph muted size="sm">
        Reference: {ticketReference}
      </Paragraph>
    </Section>

    <Section style={{ textAlign: 'center', margin: `${tokens.space.md} 0` }}>
      <Button href={walletPassUrl}>Add to Apple or Google Wallet</Button>
    </Section>

    <TwoColumnInfo
      rows={[
        { label: 'Event', value: eventName },
        { label: 'Date', value: eventDate },
        { label: 'Doors', value: eventTime },
        { label: 'Tickets', value: String(numberOfTickets) },
        { label: 'Dress code', value: dressCode },
        { label: 'Total paid', value: totalPaid },
      ]}
    />

    <SoftRule />

    <Heading level={3}>Arrival</Heading>
    <BulletList
      items={[
        parkingInfo,
        'Welcome drinks are served from doors-open for thirty minutes.',
        'Coats may be left at the Welcome Pavilion.',
        'Last orders depend on the service; we will guide you on the night.',
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={manageBookingUrl} variant="ghost">
        Manage tickets
      </Button>
    </Section>

    <SoftRule />
    <Signature name="The Weir Restaurant" role="Events team" />
  </EmailLayout>
);

export default EventTicketConfirmation;
