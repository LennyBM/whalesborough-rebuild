# UK Compliance & Security Requirements: Whalesborough Booking Platform (2026)

## 1. GDPR / UK Data Protection Act 2018 / PECR

### Cookie Consent (Post-DUAA 2025)
- **Law changed 5 February 2026** - fines raised to £17.5M or 4% global turnover
- Cookie banner must present "Accept all" and "Reject all" with equal prominence
- No pre-ticked boxes; consent must be freely given, specific, informed, unambiguous
- **New DUAA exemption:** Analytics cookies exempt from consent IF sole purpose is aggregate statistics AND third-party provider acts solely on your behalf
- Google Analytics default config likely does NOT qualify - consider Plausible/Matomo or server-proxied GA4
- Even exempt cookies need clear information and opt-out mechanism

### Privacy Policy (Required from day one)
- Controller identity/contact, DPO if appointed, purposes + lawful basis, data categories
- Recipients (Stripe, Klarna, Sykes, Booking.com, email/SMS providers, Landal parent)
- International transfer details (Landal Netherlands, US processors) and safeguards
- Retention periods per category, all data subject rights, right to complain to ICO

### Data Subject Rights
- SAR: 1 month response (DUAA added "stop the clock" for clarification)
- Rectification, erasure, restriction, portability, object (marketing = immediate)
- Automated decision-making rights if using dynamic pricing

### Data Retention Schedule
- **Immigration records:** 12 months minimum (Hotel Records Order 1972)
- **Booking/contract:** 6 years (Limitation Act 1980)
- **Financial/tax:** 6 years (HMRC)
- **Marketing consent:** Duration of consent + reasonable period
- **CCTV/ANPR:** 30 days typical
- **Analytics:** Max 26 months, pseudonymise

### Marketing Consent (PECR)
- Email: Prior consent OR soft opt-in (collected during sale, similar products, opt-out provided)
- **Critical:** Lodge SALES marketing ≠ "similar" to holiday bookings - needs explicit consent
- SMS: Same rules, separate consent from email
- Formal complaints procedure required by **19 June 2026** (new DUAA requirement)

## 2. PCI DSS Compliance

### Standard: PCI DSS v4.0.1 (all requirements mandatory since 31 March 2025)
- If using Stripe tokenization (no raw card data): likely **SAQ A**
- SAQ A now requires confirming site "not susceptible to script attacks"

### Key Requirements
- **Req 6.4.3:** Inventory ALL JavaScript on payment pages, authorize each, monitor integrity
- **Req 11.6.1:** Detect unauthorized HTTP header/payment page changes (minimum weekly)
- **MFA:** Required for CDE access and all remote/admin access
- **Passwords:** Minimum 12 characters
- **Network segmentation:** Guest Wi-Fi, EPOS, back-office, POS must be isolated

### Payment Methods
- Apple Pay / Google Pay: Device tokenization reduces PCI scope
- **Klarna:** FCA-regulated from 15 July 2026. Must be FCA-authorized. Consumer Duty compliance required

## 3. Accessibility (UK Equality Act 2010)

### Target: WCAG 2.2 Level AA
- Focus indicators: minimum 2px outline
- Interactive targets: minimum 24x24 CSS pixels
- Date pickers must work without drag/mouse
- Colour contrast: 4.5:1 text, 3:1 large text/UI
- All images need meaningful alt text
- Payment flow must be screen-reader compatible
- Video content needs captions + audio descriptions
- PDF brochures must be tagged/accessible or have HTML alternatives
- Publish accessibility statement

## 4. Consumer Protection

### Package Travel Regulations 2018
- **Applies if combining** accommodation + spa/restaurant at inclusive price
- Requires Package Travel Information Form, financial protection, organiser liability
- **Recommendation:** Design booking flow with SEPARATE transactions unless deliberately offering packages

### Consumer Contracts Regulations 2013
- Pre-contract info: trader identity, total price, payment arrangements, cancellation policy
- Holiday accommodation for specific dates is EXEMPT from 14-day cooling-off
- **Must inform customer** they don't have cancellation right BEFORE booking - failure extends to 12 months

### Deposit/Cancellation
- Deposits must be "reasonable" (20-30% typical)
- Non-refundable must be clearly stated before booking
- Sliding scale recommended: 30% (8+ weeks), 50% (4-8 weeks), 75% (2-4 weeks), 100% (<2 weeks)

## 5. Financial Promotion Rules (Lodge Sales) - HIGH RISK

### "8% Guaranteed Returns" Issue
- ASA upheld 4 complaints against Luxury Lodge Estates for similar "guaranteed returns" claims
- Claims found misleading: based on historical subletting, not actual financial guarantee

### FCA Risk
- Lodge sales at £425k-£525k with "8% guaranteed returns" COULD constitute a Collective Investment Scheme
- Promoting unregulated CIS is a **criminal offence** (up to 2 years imprisonment, unlimited fine)
- **Requirements:** Never use "guaranteed returns" without genuine legally binding guarantee
- Describe as lifestyle purchases with rental income potential
- Include risk warnings, disclose all fees/charges
- **Get specialist FCA legal advice before ANY marketing**

## 6. Short-Term Let Regulations

### National Registration Scheme - MANDATORY from April 2026
- ALL short-term lets must register on government digital portal
- Unique registration number on ALL listings
- Penalties up to £5,000 for non-registration
- Applies to every lettable unit at Whalesborough

### Planning: New C5 Use Class (expected 2026)
- Distinguishes short-term lets from residential (C3)
- Cornwall Council can apply Article 4 Direction to remove PD rights - monitor

### Fire Safety (mandatory now)
- Smoke alarms every floor, all must be **interlinked**
- Heat alarms in kitchens, CO detectors with gas/solid fuel appliances
- Documented fire risk assessment per property type

### EPC
- Minimum E rating for properties let 4+ months/year
- Government signalling tightening to minimum C (no confirmed date)

## 7. Security Standards

### OWASP Top 10:2025
| Risk | Whalesborough Specifics |
|------|------------------------|
| A01 Broken Access Control | Guest isolation, staff role segregation (resort/restaurant/spa) |
| A02 Cryptographic Failures | AES-256 at rest, TLS 1.2+ in transit, no PII in URLs |
| A03 Injection | Parameterized queries, sanitize search/dates/promo codes |
| A04 Insecure Design | Threat model booking, payment, and sales enquiry flows |
| A05 Security Misconfig | Remove defaults, disable directory listing, safe error pages |
| A06 Vulnerable Components | Dependabot/Snyk, patch critical CVEs within 30 days |
| A07 Auth Failures | MFA for admin, secure sessions, 12-char passwords |
| A08 Integrity Failures | CI/CD integrity, SRI for third-party scripts |
| A09 Logging Failures | Log auth/payment/admin events, retain 12 months, alert anomalies |
| A10 Exception Handling | Payment errors must not complete booking, timeout handling |

### Security Headers
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'nonce-{random}' 'strict-dynamic'; ...
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Session Management
- 128-bit entropy tokens, 30-min idle timeout (15-min admin)
- Secure + HttpOnly + SameSite flags on cookies

### Rate Limiting
- Login: 5/15min, API: 100/min, Booking: 10/hour, Payment: 5/hour

## Compliance Deadlines Summary

| Requirement | Deadline |
|------------|----------|
| GDPR/DPA 2018 | From launch |
| PECR marketing consent | From launch |
| Cookie consent (post-DUAA) | Already in force (5 Feb 2026) |
| Data protection complaints procedure | **19 June 2026** |
| PCI DSS v4.0.1 | Already in force |
| Klarna FCA regulation | **15 July 2026** |
| WCAG 2.2 AA | From launch |
| Consumer Contracts Regs | From launch |
| Package Travel Regs | From launch (if selling packages) |
| Short-term let registration | **April 2026** (register now) |
| Fire safety | Already in force |
| EPC | Already in force |
| Lodge sales financial promotion | From first advertisement |
| Security headers | From launch |
