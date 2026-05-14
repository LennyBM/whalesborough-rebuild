/**
 * 02 · PaymentReceipt
 * Sent: immediately on payment success (separate from booking confirmation).
 * Purpose: itemised VAT receipt — Consumer Contracts Regs 2013 requirement.
 * Type: transactional (statutory).
 */

import * as React from 'react';
import { Link, Section, Row, Column } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Eyebrow,
  Heading,
  Paragraph,
  ReceiptLine,
  SoftRule,
  TwoColumnInfo,
  company,
  tokens,
} from './_components';

export interface PaymentReceiptProps {
  guestFirstName: string;
  receiptNumber: string;
  bookingReference: string;
  issuedDate: string;
  paymentMethod: string; // e.g. "Visa ending 4242", "Apple Pay", "Klarna Pay in 3"
  lineItems: { description: string; amount: string }[];
  subtotal: string;
  vatRate: string; // "20%"
  vatAmount: string;
  total: string;
  invoicePdfUrl: string;
  viewInBrowserUrl?: string;
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  guestFirstName,
  receiptNumber,
  bookingReference,
  issuedDate,
  paymentMethod,
  lineItems,
  subtotal,
  vatRate,
  vatAmount,
  total,
  invoicePdfUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Receipt ${receiptNumber} from Whalesborough · ${total}`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>VAT receipt</Eyebrow>
    <Heading level={2}>Receipt {receiptNumber}</Heading>
    <Paragraph>
      Thank you, {guestFirstName}. This is the official VAT receipt for your
      booking. Please retain it for your records.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Issued', value: issuedDate },
        { label: 'Booking reference', value: bookingReference },
        { label: 'Receipt number', value: receiptNumber },
        { label: 'Payment method', value: paymentMethod },
      ]}
    />

    <SoftRule />

    <Heading level={3}>Itemisation</Heading>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      {lineItems.map((item, i) => (
        <ReceiptLine key={i} label={item.description} amount={item.amount} />
      ))}
      <Section
        style={{
          borderTop: `1px solid ${tokens.color.outline}`,
          paddingTop: tokens.space.sm,
          marginTop: tokens.space.sm,
        }}
      >
        <ReceiptLine label="Subtotal (excluding VAT)" amount={subtotal} />
        <ReceiptLine label={`VAT at ${vatRate}`} amount={vatAmount} />
        <Section
          style={{
            borderTop: `1px solid ${tokens.color.outline}`,
            paddingTop: tokens.space.sm,
            marginTop: tokens.space.sm,
          }}
        >
          <ReceiptLine label="Total paid" amount={total} bold />
        </Section>
      </Section>
    </Section>

    <Paragraph size="sm" muted>
      Issued by {company.legalName}, registered in England and Wales no.{' '}
      {company.companyNumber}. VAT registration no. {company.vatNumber}.
      Registered office: {company.registeredOffice}.
    </Paragraph>

    <SoftRule />

    <Paragraph size="sm">
      <Link href={invoicePdfUrl} style={{ color: tokens.color.primary }}>
        Download a PDF copy of this receipt
      </Link>
      {' '}— available for seven years to comply with HMRC retention rules.
    </Paragraph>

    <Paragraph size="sm" muted>
      A discrepancy on this receipt? Reply to this email or contact{' '}
      {company.reservationsEmail} within fourteen days.
    </Paragraph>
  </EmailLayout>
);

export default PaymentReceipt;
