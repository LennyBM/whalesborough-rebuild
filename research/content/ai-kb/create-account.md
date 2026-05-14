---
slug: create-account
category: account
tags: [account, signup, register, profile]
last_verified: 2026-05-14
authority: high
escalate_if: null
---

# Creating a Whalesborough account

**BLUF:** Create an account in the app or on the website with your email and a password (or via Apple/Google sign-in). Saved preferences (dietary, accessibility, dog profile), booking history, loyalty programme points and gift vouchers all live in your account. Single sign-on (Supabase Auth) across all features.

What you need: an email address, a strong password (minimum 12 characters), or an Apple ID or Google account for SSO sign-in.

What we ask: name, email, phone (optional but recommended for arrival comms), home address (for any printed correspondence — gift cards, brochures), date of birth (we only check that you are 18+; we do not store full DOB), marketing consent preferences (separate for email and SMS, PECR-compliant).

What we do with it: store the booking and stay history for the loyalty programme, hold your preferences for personalised service, send the messages you've consented to receive, surface relevant offers, allow you to sign in across all four booking engines (accommodation, spa, restaurant, lodges) without a fresh login.

What we don't ask: bank details (these go through Stripe at booking time, not into the account), social-security or national-insurance numbers, financial-product information, anything covered by Special Category personal data unless you actively opt in (dietary requirements for the kitchen, accessibility flags for housekeeping — held only by those teams).

The account is yours. You can delete it at any time (see account-deletion chunk).

**Related:** sign-in, password-reset, marketing-preferences, privacy-policy
**Sources:** WHALESBOROUGH-APP-PROJECT-BRIEF.md, uk-compliance-security.md
