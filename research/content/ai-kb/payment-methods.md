---
slug: payment-methods
category: booking
tags: [payment, methods, card, options]
last_verified: 2026-05-14
authority: high
escalate_if: payment_card_in_chat
---

# Payment methods accepted

**BLUF:** Whalesborough accepts Visa, Mastercard, American Express, Apple Pay, Google Pay, Klarna BNPL (amounts over £100), gift vouchers and direct bank transfer (for amounts over £2,000, by arrangement with finance). All card payments are processed through Stripe with end-to-end encryption. We never see or store full card numbers.

Recommended payment methods by use case:

- Standard stay booking: Apple Pay or Google Pay for fastest checkout
- High-value lodge purchase deposit: bank transfer by arrangement (security)
- Last-minute booking: card or wallet for instant confirmation
- Spreading the cost: Klarna BNPL (under FCA Consumer Duty from 15 July 2026)
- Using a gift: voucher redemption at checkout

Currency: GBP only. International cards work but may incur foreign-exchange fees from your card issuer.

Card declines: most common reasons are 3D Secure step-up not completed, card limit exceeded, or your bank flagging as suspicious. Try again, contact your bank, or switch to wallet payment.

Security: Stripe handles the payment flow under PCI DSS v4.0.1 SAQ A. The card number is tokenised before reaching our servers; we hold a token, not a card. JavaScript on the payment page is inventoried and integrity-monitored weekly.

Aurelia hard limit: she will not accept card numbers typed in chat under any circumstances. If you suggest typing a card to her, she will decline and route you to the proper checkout. This protects you.

**Related:** apple-pay-google-pay, klarna, voucher-redemption, refund-timing
**Sources:** uk-compliance-security.md (PCI DSS), WHALESBOROUGH-APP-PROJECT-BRIEF.md
