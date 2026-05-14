/**
 * 17 · MembershipBilling
 * Sent: monthly, on the day membership payment is taken.
 * Purpose: VAT receipt, usage summary, soft engagement.
 * Type: transactional (statutory receipt).
 */

import * as React from 'react';
import { Section } from '@react-email/components';
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

export interface MembershipBillingProps {
  memberFirstName: string;
  membershipTier: string;
  membershipNumber: string;
  billingPeriod: string; // "May 2026"
  paymentMethod: string; // "Direct debit, account ending 4521"
  subtotal: string;
  vatRate: string;
  vatAmount: string;
  total: string;
  visitsThisMonth: number;
  treatmentsThisMonth: number;
  nextBillingDate: string;
  viewInBrowserUrl?: string;
}

export const MembershipBilling: React.FC<MembershipBillingProps> = ({
  memberFirstName,
  membershipTier,
  membershipNumber,
  billingPeriod,
  paymentMethod,
  subtotal,
  vatRate,
  vatAmount,
  total,
  visitsThisMonth,
  treatmentsThisMonth,
  nextBillingDate,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Your ${billingPeriod} membership receipt`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Monthly receipt</Eyebrow>
    <Heading level={2}>{billingPeriod} membership</Heading>
    <Paragraph>
      {memberFirstName}, your {membershipTier} membership payment was
      taken today. Receipt below for your records.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Membership number', value: membershipNumber },
        { label: 'Tier', value: membershipTier },
        { label: 'Period', value: billingPeriod },
        { label: 'Payment method', value: paymentMethod },
      ]}
    />

    <SoftRule />

    <Section>
      <ReceiptLine label="Membership fee" amount={subtotal} />
      <ReceiptLine label={`VAT at ${vatRate}`} amount={vatAmount} />
      <Section
        style={{
          borderTop: `1px solid ${tokens.color.outline}`,
          paddingTop: tokens.space.sm,
          marginTop: tokens.space.sm,
        }}
      >
        <ReceiptLine label="Total" amount={total} bold />
      </Section>
    </Section>

    <SoftRule />

    <Heading level={3}>Your month</Heading>
    <TwoColumnInfo
      rows={[
        {
          label: 'Visits',
          value: `${visitsThisMonth} ${visitsThisMonth === 1 ? 'visit' : 'visits'}`,
        },
        {
          label: 'Treatments',
          value: `${treatmentsThisMonth} ${treatmentsThisMonth === 1 ? 'treatment' : 'treatments'}`,
        },
        { label: 'Next payment', value: nextBillingDate },
      ]}
    />

    <Paragraph muted size="sm">
      Issued by {company.legalName}. VAT registration {company.vatNumber}.
      Registered office: {company.registeredOffice}.
    </Paragraph>
  </EmailLayout>
);

export default MembershipBilling;
