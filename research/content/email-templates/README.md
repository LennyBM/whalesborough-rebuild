# Whalesborough Email Templates

Production-ready React Email TSX templates for every transactional and lifecycle email the Whalesborough booking platform sends. Built on `@react-email/components`, designed to render reliably across Gmail, Outlook (Windows + Mac + Web), Apple Mail, iOS Mail, Yahoo, ProtonMail and HEY.

## Tech

- React 19 + TypeScript 5
- [`@react-email/components`](https://react.email/) for primitives
- Inline styles only — no Tailwind classes inside templates (email clients strip them)
- Tokens mirror the Coastal Editorial design system, inlined per-message
- Plus Jakarta Sans (body) with Helvetica fallback; Newsreader (heading) with Georgia fallback
- 0px corner radius (no rounded edges, per brand)
- Single 600px centred container, brand cognac CTAs, warm-white surface

## Folder structure

```
email-templates/
  _layout.tsx                          ← <EmailLayout> wrapper (head/header/footer)
  _components.tsx                      ← Primitives: Button, Heading, TwoColumnInfo, ...
  index.ts                             ← Barrel export

  BookingConfirmation.tsx              01  Transactional
  PaymentReceipt.tsx                   02  Transactional (statutory VAT receipt)
  PreArrival30Days.tsx                 03  Lifecycle
  PreArrival14Days.tsx                 04  Lifecycle
  PreArrival7Days.tsx                  05  Lifecycle
  PreArrival24Hours.tsx                06  Lifecycle
  CheckInToday.tsx                     07  Lifecycle
  MidStayCheckIn.tsx                   08  Lifecycle
  CheckOutInstructions.tsx             09  Lifecycle
  PostStayReview.tsx                   10  Lifecycle
  BookingModified.tsx                  11  Transactional
  BookingCancelled.tsx                 12  Transactional

  SpaBookingConfirmation.tsx           13  Transactional
  SpaPreArrivalForm.tsx                14  Transactional
  SpaReminder24h.tsx                   15  Transactional
  MembershipWelcome.tsx                16  Transactional (account creation)
  MembershipBilling.tsx                17  Transactional (statutory VAT receipt)
  MembershipFrozen.tsx                 18  Transactional

  RestaurantReservationConfirmation.tsx 19  Transactional
  RestaurantReminder24h.tsx            20  Transactional
  EventTicketConfirmation.tsx          21  Transactional
  LakesideLocalsWelcome.tsx            22  Transactional (account creation)

  BrochureDelivery.tsx                 23  Marketing (sales-track consent)
  ViewingConfirmation.tsx              24  Marketing (RSVP fulfilment)
  ViewingFollowUp.tsx                  25  Marketing
  WaitlistJoined.tsx                   26  Transactional

  MagicLink.tsx                        27  Transactional security
  EmailVerification.tsx                28  Transactional security
  PasswordReset.tsx                    29  Transactional security
  AccountDeletionConfirmation.tsx      30  Transactional (UK GDPR Art. 17)

  NewsletterWelcome.tsx                31  Marketing (PECR explicit consent)
  BirthdaySurprise.tsx                 32  Marketing
  AnniversaryRecognition.tsx           33  Marketing
  WinBack.tsx                          34  Marketing
```

## Usage

### Rendering with the React Email renderer

```ts
import { render } from '@react-email/render';
import { BookingConfirmation } from '@/emails';

const html = await render(
  <BookingConfirmation
    guestFirstName="Eleanor"
    bookingReference="WB-2026-0815"
    propertyName="Calf House"
    propertyType="Cottage"
    arrivalDate="Saturday, 15 August 2026"
    departureDate="Saturday, 22 August 2026"
    nights={7}
    guests={{ adults: 2, children: 2, babies: 0, pets: 1 }}
    totalPaid="£2,840.00"
    walletPassUrl="https://whalesborough.co.uk/wallet/WB-2026-0815"
    manageBookingUrl="https://whalesborough.co.uk/account/bookings/WB-2026-0815"
    viewInBrowserUrl="https://email.whalesborough.co.uk/v/abc123"
  />
);
```

### Sending via Resend (recommended)

```ts
import { Resend } from 'resend';
import { BookingConfirmation } from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Whalesborough <reservations@whalesborough.co.uk>',
  to: guest.email,
  replyTo: 'reservations@whalesborough.co.uk',
  subject: `Your stay at ${booking.property.name} is confirmed`,
  react: <BookingConfirmation {...bookingProps} />,
  headers: {
    'List-Unsubscribe': '<https://whalesborough.co.uk/email/unsubscribe?consent_id=' + booking.consentId + '>',
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  },
  tags: [
    { name: 'category', value: 'booking-confirmation' },
    { name: 'consent_id', value: booking.consentId ?? 'transactional' },
  ],
});
```

## Voice — Coastal Editorial concierge

Every message follows these rules:

- First-person plural ("we have prepared", never "I have")
- Names the guest by first name in the salutation
- Specific not generic ("Your cottage, Calf House, is ready" — not "Your room is ready")
- No exclamation marks
- No emoji
- No "exciting news", "amazing", "incredible" or other marketing inflation
- Calm, unhurried sentences. Quiet humour, where natural.
- Honesty about constraints (e.g. "free to cancel up to 48 hours, after which...")

## UK compliance — PECR, DUAA, UK GDPR

### Transactional vs marketing

| Type | Examples | Unsubscribe required? |
|---|---|---|
| Transactional | Booking confirmation, receipt, password reset, check-in | No |
| Service lifecycle | Pre-arrival, post-stay review, mid-stay | No |
| Marketing | Newsletter, win-back, birthday, viewing follow-up | **Yes — PECR Reg 22** |

### Consent records

Every marketing template accepts a `consentId` prop. The layout footer renders this in the unsubscribe URL as `?consent_id=<id>` — this is the PECR audit-trail reference. Store the consent record in your `consent_records` table with timestamp, IP, source page, wording shown to the user, and the lawful basis claimed.

Lodge sales (BrochureDelivery, ViewingConfirmation, ViewingFollowUp) require **separate explicit consent** — they are *not* "similar products" to holiday bookings under the soft opt-in.

### Footer contents (every email)

Composed in `_components.tsx → EmailFooter`:

- Registered company name, number, registered office (Companies Act 2006)
- VAT registration number
- ICO registration number (UK GDPR Art. 13 transparency)
- Privacy, Cookies, Accessibility, Complaints links
- Unsubscribe link with `consent_id` query param (marketing only)
- Wording stating "you can withdraw consent at any time" and the consent reference

Replace the placeholder values in `_components.tsx → company` on go-live:

```ts
companyNumber: '00000000',  // ← Companies House number
vatNumber: 'GB 000 0000 00', // ← VAT registration
icoNumber: 'ZA000000',       // ← ICO registration
```

### List-Unsubscribe header

For marketing emails, always include the RFC 8058 one-click unsubscribe header (required by Gmail / Yahoo as of Feb 2024 for any sender over 5,000/day):

```
List-Unsubscribe: <https://whalesborough.co.uk/email/unsubscribe?consent_id=...>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

The endpoint should suppress all marketing without confirmation, and respond within 200ms.

### Complaints procedure (DUAA 2025 — in force 19 June 2026)

Footer links to `/complaints` on every email. The page must explain the route to ICO complaint, response timeframe (max 30 days for marketing objections in practice; 7 days is best practice and stated in our footer).

## Wallet passes

`BookingConfirmation` and `EventTicketConfirmation` surface an "Add to Apple or Google Wallet" CTA. Generate `.pkpass` (Apple) and Google Wallet JWT objects server-side; the URL pattern used in these templates is `https://whalesborough.co.uk/wallet/{reference}`. The destination page should sniff User-Agent and serve the appropriate pass file.

## Image hosting

Logo and QR images load from `https://whalesborough.co.uk/...`. Replace with your image CDN host (Cloudinary / Bunny / Vercel) in `_components.tsx → company.logo`. Use:
- 2x resolution PNGs (320x80 for the logo, displayed at 160x40)
- Hosted at a permanent URL — never base64 (Outlook strips inline data URIs)
- Served with `Cache-Control: public, max-age=31536000, immutable`

## Accessibility

- Every interactive element has `min-height: 44px` via padding
- Colour contrast ratios meet WCAG 2.2 AA on `#fbf9f6` surface
- View-in-browser link available at top of every email
- All images have descriptive `alt` attributes
- HTML language attribute set to `en-GB`
- No reliance on colour alone for state

## Testing checklist

Before any template is enabled in production:

- [ ] Render to HTML via `@react-email/render` and validate against [html-validate](https://html-validate.org)
- [ ] Send to [Litmus](https://litmus.com) (or [Email on Acid](https://emailonacid.com)) — verify Gmail Desktop, Gmail iOS, Outlook 365 Desktop (Windows), Outlook Mac, Apple Mail Desktop, Apple Mail iOS
- [ ] Check dark-mode behaviour (we declare `light only` but Gmail occasionally inverts anyway)
- [ ] Verify `List-Unsubscribe` header is parsed correctly by Gmail (look for the unsubscribe link next to the sender)
- [ ] Preview the plain-text fallback (most ESPs auto-generate; check Resend's output)
- [ ] Confirm preheader text appears correctly in the mailbox preview
- [ ] Run a spam-score test ([Mail-Tester](https://www.mail-tester.com/) — aim for 10/10)
- [ ] Verify SPF, DKIM, DMARC for `whalesborough.co.uk` — DMARC must be at least `p=quarantine`

## Locale and currency

All dates, amounts and addresses are en-GB. Format dates as "Saturday, 15 August 2026" (long weekday, day, month name in full, year). Currency is always £ with two decimal places (e.g. `£2,840.00`, not `£2840`).

## Conventions

Each template:

1. Has a leading docstring describing trigger event, purpose, and type
2. Exports a typed React.FC + named props interface
3. Wraps content in `<EmailLayout>` with explicit `preview` text
4. Marks marketing messages with `isMarketing` and `consentId`
5. Uses primitives from `_components.tsx` exclusively — never inline raw HTML

## Token map (cheat sheet)

| Use | Token |
|---|---|
| CTA button background | `tokens.color.primary` (`#703a1d`) |
| Page background / canvas | `tokens.color.background` (`#fbf9f6`) |
| Body card surface | `tokens.color.surface` (`#ffffff`) |
| Quiet info card | `tokens.color.surfaceLow` (`#f5f3f0`) |
| Highlighted info card | `tokens.color.surfaceMid` (`#efeeeb`) |
| Body text | `tokens.color.onSurfaceVariant` (`#424844`) |
| Muted helper text | `tokens.color.onSurfaceMuted` (`#6b7370`) |
| Heading text | `tokens.color.onSurface` (`#1b1c1a`) |
| Heading font | `tokens.font.heading` (Newsreader → Georgia) |
| Body font | `tokens.font.body` (Plus Jakarta Sans → Helvetica) |
| Container width | `tokens.containerWidth` (`600px`) |
| Border radius | `tokens.radius` (`0px`) |

## Future work

- Add Spanish and French locales for international guests (i18n keys are inline strings today)
- Add a `<PreheaderText>` invisible block before the visible preheader to push trailing content out of the preview
- Add a "winter mode" colour palette (deeper surfaces) toggle via prop
- A/B test concierge name on signature ("Tania" vs "Anya" vs anonymous "Concierge")
- Plain-text counterparts for legacy clients that strip HTML (Resend auto-generates; verify quality)
