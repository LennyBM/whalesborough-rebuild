---
slug: apple-pay-google-pay
category: booking
tags: [apple-pay, google-pay, payment, mobile]
last_verified: 2026-05-14
authority: high
escalate_if: payment_card_in_chat
---

# Apple Pay and Google Pay

**BLUF:** Apple Pay and Google Pay are accepted across the app and the website. At checkout, tap the Apple Pay or Google Pay button — your device confirms via Face ID, Touch ID or passcode and the booking completes. Device tokenisation reduces PCI scope and means we never see your card details.

Apple Pay (iOS, iPadOS, watchOS): available on the booking screen, the spa checkout, the restaurant deposit and the Larder shop. Approve on your device. The transaction completes in seconds.

Google Pay (Android, Chrome on supported devices): same flow as Apple Pay. Approve on your device.

Why we recommend these: device tokenisation. Your physical card number is never sent to us. The transaction uses a one-time payment token specific to that transaction. If our payment provider's logs were ever compromised, the token cannot be used elsewhere.

Apple Pay accounts for roughly 30% of mobile booking volume across the platform.

Aurelia hard limit: payment card details typed in chat are not accepted. If you offer to share a card number with Aurelia, she will decline and route you to the proper checkout. This is industry-standard PCI safety.

**Related:** stripe, klarna, payment-methods, gift-vouchers
**Sources:** WHALESBOROUGH-APP-PROJECT-BRIEF.md, uk-compliance-security.md (PCI DSS v4.0.1)
