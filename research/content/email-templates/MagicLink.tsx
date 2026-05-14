/**
 * 27 · MagicLink
 * Sent: on passwordless sign-in request.
 * Purpose: deliver a single-use, time-limited sign-in link.
 * Type: transactional security.
 */

import * as React from 'react';
import { Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  Callout,
  Eyebrow,
  Heading,
  Paragraph,
  SoftRule,
  company,
  tokens,
} from './_components';

export interface MagicLinkProps {
  signInUrl: string;
  expiresInMinutes: number;
  requestIpHint?: string; // "from London"
  deviceHint?: string; // "Safari on macOS"
  viewInBrowserUrl?: string;
}

export const MagicLink: React.FC<MagicLinkProps> = ({
  signInUrl,
  expiresInMinutes,
  requestIpHint,
  deviceHint,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Your Whalesborough sign-in link"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Sign in</Eyebrow>
    <Heading level={1}>Sign in to Whalesborough</Heading>
    <Paragraph>
      Tap the button below to sign in. The link is single-use and
      expires in {expiresInMinutes} minutes.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={signInUrl}>Sign in</Button>
    </Section>

    <Paragraph muted size="sm">
      Or copy this link into your browser:
      <br />
      <span
        style={{
          fontFamily: 'Menlo, Consolas, monospace',
          fontSize: tokens.size.xs,
          wordBreak: 'break-all',
          color: tokens.color.onSurface,
        }}
      >
        {signInUrl}
      </span>
    </Paragraph>

    <SoftRule />

    {(requestIpHint || deviceHint) && (
      <Paragraph size="sm" muted>
        Requested {requestIpHint && `${requestIpHint} `}
        {deviceHint && `on ${deviceHint}`}.
      </Paragraph>
    )}

    <Callout title="If this was not you">
      Ignore this email — the link cannot be used without your
      confirmation. If you receive these messages and have not requested
      them, please contact {company.email}. We will check the activity on
      your account and offer to reset access.
    </Callout>
  </EmailLayout>
);

export default MagicLink;
