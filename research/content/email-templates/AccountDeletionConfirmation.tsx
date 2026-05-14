/**
 * 30 · AccountDeletionConfirmation
 * Sent: on account deletion request — final confirmation of right-to-erasure.
 * Purpose: confirm deletion, explain retention exceptions, audit trail.
 * Type: transactional (statutory — UK GDPR Article 17).
 */

import * as React from 'react';
import { Link } from '@react-email/components';
import EmailLayout from './_layout';
import {
  BulletList,
  Callout,
  Eyebrow,
  Heading,
  Paragraph,
  SoftRule,
  TwoColumnInfo,
  company,
  tokens,
} from './_components';

export interface AccountDeletionConfirmationProps {
  accountFirstName: string;
  deletedAt: string;
  retainedItems: { item: string; durationReason: string }[];
  finalDeletionDate: string;
  caseReference: string;
  viewInBrowserUrl?: string;
}

export const AccountDeletionConfirmation: React.FC<
  AccountDeletionConfirmationProps
> = ({
  accountFirstName,
  deletedAt,
  retainedItems,
  finalDeletionDate,
  caseReference,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Your account has been deleted"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Account deleted</Eyebrow>
    <Heading level={1}>
      {accountFirstName}, your account has been deleted.
    </Heading>
    <Paragraph>
      We confirmed your request to delete the personal data we hold
      about you on {deletedAt}. Below is a complete record of what was
      removed today, what we are legally required to keep, and for how
      long.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Case reference', value: caseReference },
        { label: 'Request received', value: deletedAt },
        { label: 'Account access', value: 'Closed immediately' },
        {
          label: 'Final erasure date',
          value: `${finalDeletionDate} (when retention obligations expire)`,
        },
      ]}
    />

    <SoftRule />

    <Heading level={3}>Removed today</Heading>
    <BulletList
      items={[
        'Your guest profile, preferences and saved cards.',
        'Communications history (chat, support tickets, marketing engagement).',
        'Behavioural data (browsing, recommendations, app activity).',
        'Marketing consents and audit references.',
        'Wallet passes and downloadable receipts in your account.',
      ]}
    />

    <Heading level={3}>Retained, lawfully</Heading>
    {retainedItems.map((row, i) => (
      <Paragraph key={i} size="sm">
        <strong style={{ color: tokens.color.onSurface }}>{row.item}.</strong>{' '}
        {row.durationReason}
      </Paragraph>
    ))}

    <SoftRule />

    <Callout title="Your rights from here">
      You retain every data-subject right under UK GDPR over data we
      continue to hold. You may request access, correction, restriction
      or further erasure at any point.{' '}
      <Link
        href={`mailto:${company.email}`}
        style={{ color: tokens.color.primary }}
      >
        Contact us
      </Link>
      , quoting case {caseReference}, or complain to the ICO at ico.org.uk.
    </Callout>

    <Paragraph muted size="sm">
      This email is the only copy of this notice that we will send. We
      have retained a copy of this confirmation under our retention
      schedule. The Whalesborough customer service team can no longer
      see your guest history.
    </Paragraph>
  </EmailLayout>
);

export default AccountDeletionConfirmation;
