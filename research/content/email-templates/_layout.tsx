/**
 * Whalesborough Email — Master Layout
 *
 * Wraps every transactional and lifecycle email. Compositional pattern:
 *
 *   <EmailLayout preview="..." consentId="..." isMarketing>
 *     ...your body...
 *   </EmailLayout>
 *
 * Includes:
 *   - HTML doctype + meta for proper rendering in Outlook/Gmail
 *   - Brand-coloured background
 *   - Centred 600px container (industry default — Litmus tested)
 *   - Header (logo) + body + footer (PECR/DUAA compliant)
 */

import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import {
  EmailFooter,
  EmailHeader,
  tokens,
  type FooterProps,
} from './_components';

export interface EmailLayoutProps extends FooterProps {
  /** Preview text shown next to the subject in mailbox inboxes. */
  preview: string;
  /** Email body — pass any of the primitives. */
  children: React.ReactNode;
  /** Override container width — defaults to 600px. */
  width?: string;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  preview,
  children,
  width = tokens.containerWidth,
  consentId,
  isMarketing = false,
  viewInBrowserUrl,
}) => (
  <Html lang="en-GB">
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta name="color-scheme" content="light only" />
      <meta name="supported-color-schemes" content="light only" />
      <title>Whalesborough</title>
    </Head>
    <Preview>{preview}</Preview>
    <Body
      style={{
        backgroundColor: tokens.color.background,
        fontFamily: tokens.font.body,
        margin: 0,
        padding: 0,
        WebkitTextSizeAdjust: '100%',
        msTextSizeAdjust: '100%',
      }}
    >
      <Container
        style={{
          backgroundColor: tokens.color.background,
          maxWidth: width,
          margin: '0 auto',
          padding: 0,
        }}
      >
        <EmailHeader />

        <Section
          style={{
            backgroundColor: tokens.color.surface,
            padding: `${tokens.space.lg} ${tokens.space.md}`,
          }}
        >
          {children}
        </Section>

        <EmailFooter
          consentId={consentId}
          isMarketing={isMarketing}
          viewInBrowserUrl={viewInBrowserUrl}
        />
      </Container>
    </Body>
  </Html>
);

export default EmailLayout;
