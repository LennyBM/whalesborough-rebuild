---
slug: sign-in
category: account
tags: [sign-in, login, sso, passkey]
last_verified: 2026-05-14
authority: high
escalate_if: null
---

# Signing into your account

**BLUF:** Sign in with your email and password, or use Apple Sign In or Google Sign In if you set up SSO. Passkeys (WebAuthn) are supported on compatible devices for passwordless biometric sign-in. Sessions stay signed in on trusted devices for 30 days unless you sign out.

Sign-in methods:

- Email + password
- Apple Sign In (one-tap on iOS / iPadOS / macOS)
- Google Sign In (one-tap on Android, Chrome on desktop)
- Passkey (Face ID, Touch ID, Windows Hello on supported devices)

Forgotten password: tap "Forgot password" on the sign-in screen. We email a reset link to the registered address; the link expires in 60 minutes.

Two-factor authentication (2FA): not required for guest accounts but recommended if you have a stored booking history. Available via the Settings screen — TOTP app (Authy, Google Authenticator, 1Password) or SMS.

Session length: 30 days on a trusted device unless you sign out manually or change password. 15 minutes idle timeout on admin-level accounts (not relevant for guest accounts).

If you can't sign in: try password reset, check the email is the one you signed up with, then contact reception (01288 361940) or the in-app help. We cannot share account information without verifying identity first — please be patient with the verification.

Aurelia is read-only access to your account if you are signed in — she can see your booking and preferences, but cannot change account settings without your tap.

**Related:** create-account, password-reset, account-deletion
**Sources:** WHALESBOROUGH-APP-PROJECT-BRIEF.md, uk-compliance-security.md (auth)
