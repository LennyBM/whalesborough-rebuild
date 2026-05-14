# Whalesborough Farm Resort & Spa — SMS Templates

**Sender ID:** `WHALESBORO` (10-char alphanumeric, UK)
**Short link domain:** `wbo.uk`
**Voice:** Coastal Editorial — restrained, warm, never shouty. No emoji. No exclamation marks. Lowercase product names ("bella", "the lookout"). Sentence case throughout.

---

## Compliance summary

Every template below is classified as **transactional**, **service**, **operational**, or **marketing** under PECR. Only marketing-classified templates require prior opt-in consent (separate from email consent) and must carry the `STOP to opt out` footer. Transactional and service SMS go only to authenticated users with a live booking, sale, or active account.

- **Transactional:** legally or contractually required (confirmation, refund, OTP). No consent needed. No STOP footer required, but provided for goodwill on inbound-capable numbers.
- **Service:** operationally necessary touchpoints attached to a live booking (gate code, reminder, plate-confirm). No consent needed. No STOP footer.
- **Marketing:** all promotional content. Requires explicit opt-in checkbox at signup, separate from email consent. Must include `STOP to opt out`. Honour STOP within 24 hours.
- **Operational (staff/owner):** internal alerts to staff or unit owners. Treat as transactional; consent captured in employment or owner agreement.

Every body identifies sender within first 30 characters with the prefix `Whalesborough:`. First name used where available; if absent, the booking reference is used as the personalisation anchor.

GSM-7 single segment = 160 characters. Where a template runs over 160, the segment count is shown; concatenated SMS is acceptable for transactional bodies where the gate code or reference must be unambiguous, but marketing bodies are constrained to a single segment to control unit cost.

---

## 1. Booking lifecycle

### sms.booking_confirmation
**Trigger:** `booking.created` (status: confirmed, payment captured or deposit taken)
**Audience:** lead guest
**Consent:** transactional
**Body:**
"Whalesborough: {{first_name}}, booking {{booking_ref}} confirmed for {{check_in_date}} at {{property_name}}. Manage your stay: wbo.uk/b/{{short_token}}"
**Chars:** 138 (single segment)
**Notes:** Short link resolves to the magic-link sign-in page that drops the guest straight into their booking. Token is single-use, 30-minute TTL, then auto-rotates to require login. Falls back to "your booking" if first_name missing — body becomes 134 chars.

---

### sms.pre_arrival_24h
**Trigger:** `T-24h` cron relative to check-in (15:00 the prior day)
**Audience:** lead guest
**Consent:** service
**Body:**
"Whalesborough: arrival tomorrow from 16:00. Gate code {{gate_code}}. Park at {{property_name}}, the door opens with the same code. Full details: wbo.uk/b/{{short_token}}"
**Chars:** 167 (2 segments)
**Notes:** Two-segment by design — gate code must be in the SMS body, not behind a link, in case the guest arrives with no signal. Gate code is a rotating 4-digit per-booking PIN, expires at 11:00 on the day after check-out. If property uses smart lock instead of keypad, body swaps "Gate code" for "Check-in passcode" — same character count.

---

### sms.pre_arrival_4h
**Trigger:** `T-4h` cron, gated to 09:00–17:00 send window
**Audience:** lead guest
**Consent:** service
**Body:**
"Whalesborough: we're ready for you. Confirm your number plate so the gate opens automatically: wbo.uk/p/{{short_token}}. Reply with the plate if easier."
**Chars:** 152 (single segment)
**Notes:** Captures ANPR enrolment for frictionless gate entry. Short link goes to a one-tap form prefilled with the booking; if the guest replies with the plate as inbound SMS, an MO webhook stores it against the booking. Suppressed if plate already on file.

---

### sms.arrival_window_today
**Trigger:** `T-2h` cron, only if guest has not yet completed online check-in
**Audience:** lead guest
**Consent:** service
**Body:**
"Whalesborough: arrival window opens at 16:00. Skip the desk by checking in online: wbo.uk/c/{{short_token}}. Any questions, call 01237 000000."
**Chars:** 143 (single segment)
**Notes:** Phone number is the resort reception, not a personal mobile. Body suppressed entirely once online check-in is complete. Skip rule: do not send if the property is a self-catering cottage where there is no desk to skip.

---

### sms.mid_stay_touchpoint
**Trigger:** night 2 of stay, 10:30 send window (stays of 3+ nights only)
**Audience:** lead guest
**Consent:** service
**Body:**
"Whalesborough: hope the stay is going well. A note from the team — fresh towels at reception any time, and bella has tables tonight. Reply HELP if anything."
**Chars:** 158 (single segment)
**Notes:** Light-touch only. Not a marketing message — it's a service availability note. Reply HELP routes to the on-duty manager via the staff inbox. Suppressed if mid-stay survey already returned.

---

### sms.check_out_reminder
**Trigger:** `T-2h` relative to check-out time
**Audience:** lead guest
**Consent:** service
**Body:**
"Whalesborough: check-out is 10:00. Late check-out and a final coffee at the lookout: wbo.uk/o/{{short_token}}. Safe onward travel."
**Chars:** 133 (single segment)
**Notes:** Short link goes to a one-tap upsell (late check-out £35, breakfast hamper £18). If guest has already booked late check-out, body changes to "Late check-out confirmed until {{late_time}}. Safe onward travel" — 102 chars.

---

### sms.post_stay_review
**Trigger:** check-out date + 18h (so it lands the evening of travel-home day)
**Audience:** lead guest
**Consent:** service (transactional review request, not marketing)
**Body:**
"Whalesborough: thank you for staying with us. A one-tap review helps us a great deal: wbo.uk/r/{{short_token}}. The team is grateful."
**Chars:** 136 (single segment)
**Notes:** Short link goes to a single-screen NPS picker (1–10), then routes 9–10 to a Google review prompt and 0–8 to a private feedback form. One send only; no follow-up nudge. PECR-safe because it is solicited feedback tied to a transaction.

---

### sms.booking_modified
**Trigger:** `booking.updated` where check-in date, property, or guest count has changed
**Audience:** lead guest
**Consent:** transactional
**Body:**
"Whalesborough: booking {{booking_ref}} updated. New dates {{check_in_date}} to {{check_out_date}}, {{property_name}}. Full summary: wbo.uk/b/{{short_token}}"
**Chars:** 156 (single segment)
**Notes:** If the only change is guest count, body simplifies to "booking {{booking_ref}} updated to {{adults}} adults, {{children}} children. Summary: wbo.uk/b/{{short_token}}".

---

### sms.booking_cancelled
**Trigger:** `booking.cancelled`
**Audience:** lead guest
**Consent:** transactional
**Body:**
"Whalesborough: booking {{booking_ref}} cancelled. Refund of £{{refund_amount}} processing to your card, 3 to 5 working days. Confirmation: wbo.uk/b/{{short_token}}"
**Chars:** 161 (2 segments)
**Notes:** Two-segment is acceptable here — financial detail must be precise. If cancellation is inside the no-refund window, body changes to "cancelled per terms. No refund applies on this date. Details: wbo.uk/b/{{short_token}}" — 144 chars single segment.

---

### sms.refund_processed
**Trigger:** Stripe refund webhook `charge.refunded`
**Audience:** lead guest
**Consent:** transactional
**Body:**
"Whalesborough: refund of £{{refund_amount}} sent to the card ending {{card_last4}}. It should land in 3 to 5 working days. Ref {{booking_ref}}."
**Chars:** 142 (single segment)
**Notes:** Triggered only when Stripe confirms the refund has cleared their side. Card last4 displayed for guest reconciliation. No short link — nothing to action.

---

## 2. Spa

### sms.spa_booking_confirmation
**Trigger:** `spa_booking.created`
**Audience:** spa guest
**Consent:** transactional
**Body:**
"Whalesborough spa: {{first_name}}, {{treatment_name}} confirmed for {{spa_date}} at {{spa_time}}. Arrive 20 min early. Manage: wbo.uk/s/{{short_token}}"
**Chars:** 153 (single segment)
**Notes:** Whalesborough uses Try.be for spa bookings — this template fires from the integration webhook, not from the core booking system. Treatment names kept short by design ("Coastal facial", "Deep tissue 60"). Suppress for in-resort guests if spa is already in stay itinerary.

---

### sms.spa_reminder_24h
**Trigger:** `T-24h` cron relative to spa appointment
**Audience:** spa guest
**Consent:** service
**Body:**
"Whalesborough spa: {{treatment_name}} tomorrow at {{spa_time}}. Arrive 20 min early for the steam suite. Change or cancel: wbo.uk/s/{{short_token}}"
**Chars:** 151 (single segment)
**Notes:** Cancellation through the link enforces the 24h policy automatically — anything inside the window shows the no-refund warning before confirming.

---

### sms.spa_walkin_availability
**Trigger:** on-demand, sent by spa manager when a slot opens inside next 4 hours
**Audience:** members and stay guests who opted in to spa availability alerts
**Consent:** marketing (opt-in required)
**Body:**
"Whalesborough spa: {{treatment_name}} available today at {{spa_time}}, £{{price}}. Book in one tap: wbo.uk/w/{{short_token}}. STOP to opt out."
**Chars:** 150 (single segment)
**Notes:** Manager-triggered with throttling — same recipient receives at most 2 walk-in alerts per 7 days, regardless of slot count. Audience filtered by `consent_spa_availability = true`.

---

### sms.spa_cancellation
**Trigger:** `spa_booking.cancelled` (guest-initiated or therapist-initiated)
**Audience:** spa guest
**Consent:** transactional
**Body:**
"Whalesborough spa: {{treatment_name}} on {{spa_date}} cancelled. {{refund_status_line}}. Rebook any time: wbo.uk/s/new"
**Chars:** 119 (single segment, assuming refund_status_line ~25 chars)
**Notes:** `refund_status_line` resolves to one of: "Full refund of £{{amount}} on the way" / "Within cancellation window, credit issued" / "No refund per terms".

---

## 3. Restaurant (bella)

### sms.restaurant_table_confirmed
**Trigger:** `table_booking.created`
**Audience:** diner
**Consent:** transactional
**Body:**
"bella: {{first_name}}, table for {{covers}} on {{dining_date}} at {{dining_time}}. Manage your booking: wbo.uk/d/{{short_token}}"
**Chars:** 124 (single segment)
**Notes:** Sender prefix is "bella" not "Whalesborough" — the restaurant has its own brand within the group and SMS treats it as such, while sender ID stays WHALESBORO at the network level. First 30 chars still identify the brand cluster ("bella:" + the recipient knows the sender ID).

---

### sms.restaurant_reminder_4h
**Trigger:** `T-4h` cron relative to dining slot, send only 10:00–20:00
**Audience:** diner
**Consent:** service
**Body:**
"bella: table for {{covers}} tonight at {{dining_time}}. Allergies or changes: wbo.uk/d/{{short_token}}. Parking on site, the lookout signposted."
**Chars:** 150 (single segment)
**Notes:** "Tonight" swaps to "today" if booking is lunchtime (12:00–16:00). Suppressed if guest is already in-resort (stay overlaps date).

---

### sms.restaurant_walkin_table_ready
**Trigger:** waitlist promotion event from EPOS
**Audience:** diner on live walk-in waitlist
**Consent:** service (implicit — they joined the waitlist for this purpose)
**Body:**
"bella: your table is ready. Please come to the host stand within 10 minutes or the table releases. Position {{waitlist_ref}}."
**Chars:** 124 (single segment)
**Notes:** 10-minute hold matches host-stand policy. No short link — there is nothing to action online; the guest is physically on premises or moments away. Auto-followup at T+8min if guest hasn't checked in.

---

### sms.event_ticket_confirmation
**Trigger:** `event_booking.created` (private dining, supper club, wine night)
**Audience:** ticket holder
**Consent:** transactional
**Body:**
"bella: {{event_name}} on {{event_date}} at {{event_time}} confirmed. {{ticket_count}} tickets, ref {{booking_ref}}. Details and dress code: wbo.uk/e/{{short_token}}"
**Chars:** 163 (2 segments)
**Notes:** Two segments acceptable — event SMS must contain all the orienting detail in body since events sometimes occur where the guest has no Wi-Fi to reach the link. Dress code link is critical for the supper club series.

---

## 4. Sales (lodge viewings)

### sms.viewing_confirmed
**Trigger:** `lodge_viewing.confirmed` by sales team
**Audience:** prospective buyer
**Consent:** transactional
**Body:**
"Whalesborough sales: viewing of {{lodge_model}} on {{viewing_date}} at {{viewing_time}}. {{agent_name}} will meet you at the sales lodge. wbo.uk/v/{{short_token}}"
**Chars:** 160 (single segment, exactly at the boundary)
**Notes:** Tight on length — if `agent_name` exceeds 12 chars or `lodge_model` exceeds 14, body tips to 2 segments. Acceptable. No "guaranteed return" language anywhere (FCA risk per compliance note).

---

### sms.viewing_reminder_24h
**Trigger:** `T-24h` cron relative to viewing
**Audience:** prospective buyer
**Consent:** service
**Body:**
"Whalesborough sales: viewing tomorrow at {{viewing_time}}, meeting {{agent_name}} at the sales lodge. Postcode EX39 5AB. Reschedule: wbo.uk/v/{{short_token}}"
**Chars:** 156 (single segment)
**Notes:** Postcode included so satnav works. No marketing copy in the body — viewings sit under the FCA shadow and tone restraint matters.

---

### sms.viewing_day_note
**Trigger:** `T-2h` cron on viewing day, gated by weather lookup
**Audience:** prospective buyer
**Consent:** service
**Body:**
"Whalesborough sales: rain forecast for your viewing. Bring a coat — much of the tour is outdoors. Parking signposted from the main gate. See you at {{viewing_time}}."
**Chars:** 164 (2 segments)
**Notes:** Sent only when met-office API returns >40% precipitation for the slot. On clear weather, swap to "fair weather forecast for your viewing — most of the tour is outdoors, comfortable shoes recommended. Parking signposted. See you at {{viewing_time}}." Both versions exceed 160; acceptable, two segments per viewing day is negligible cost.

---

## 5. Auth and security

### sms.magic_link_otp
**Trigger:** sign-in with magic-link OTP method selected
**Audience:** account holder
**Consent:** transactional
**Body:**
"Whalesborough: your sign-in code is {{otp_code}}. It expires in 10 minutes. If you did not request this, ignore."
**Chars:** 109 (single segment)
**Notes:** 6-digit numeric OTP. No short link — pasted into the sign-in form on the device the user was already on. Rate-limited at 5 OTPs per 15 minutes per phone number.

---

### sms.password_changed
**Trigger:** `account.password_changed` event
**Audience:** account holder
**Consent:** transactional (security)
**Body:**
"Whalesborough: your password was changed at {{change_time}} from {{location_summary}}. Not you? Lock the account: wbo.uk/sec/{{short_token}}."
**Chars:** 143 (single segment)
**Notes:** `location_summary` resolves to a coarse city ("London" / "Plymouth") never a precise address — privacy and accuracy both improve. Short link launches the credential-reset and active-session-revoke flow.

---

### sms.new_device_signin
**Trigger:** sign-in from a fingerprint never seen on this account
**Audience:** account holder
**Consent:** transactional (security)
**Body:**
"Whalesborough: new sign-in from {{device_summary}}, {{location_summary}}, at {{signin_time}}. Not you? Lock the account: wbo.uk/sec/{{short_token}}."
**Chars:** 154 (single segment)
**Notes:** `device_summary` is one of "iPhone", "Android phone", "Mac", "Windows PC", "browser" — never the raw user-agent. Sent at most once per device per 90 days to avoid alert fatigue.

---

### sms.two_factor_code
**Trigger:** 2FA challenge on high-risk action (payment over £500, refund, lodge enquiry submission, admin sign-in)
**Audience:** account holder
**Consent:** transactional (security)
**Body:**
"Whalesborough: your verification code is {{otp_code}}. It expires in 5 minutes. Never share this code with anyone."
**Chars:** 112 (single segment)
**Notes:** Distinct copy from magic-link OTP so a user can tell at a glance which flow they are in. Shorter expiry (5 min vs 10) reflects higher-risk context. Same rate limits.

---

## 6. Operations (staff and owner)

### sms.p1_maintenance_page
**Trigger:** P1 incident raised in maintenance system (e.g. boiler down, no water, security door fault)
**Audience:** on-call engineer
**Consent:** operational (employment)
**Body:**
"Whalesborough P1: {{property_name}}, {{issue_summary}}. Guest on site. Acknowledge in 5 min: wbo.uk/m/{{short_token}}. Operator {{operator_name}}."
**Chars:** 147 (single segment)
**Notes:** Short link opens the incident in the maintenance app and starts the acknowledgement clock. If unacknowledged at T+5min, escalates to duty manager. `issue_summary` capped at 40 chars by the ticket form.

---

### sms.booking_received_staff
**Trigger:** booking created via direct channel (resort website, not OTA)
**Audience:** reservations team (rota-aware — sends only to on-shift number)
**Consent:** operational (employment)
**Body:**
"Whalesborough: new booking {{booking_ref}}, {{property_name}}, {{check_in_date}}, {{guest_count}}, £{{total_value}}. wbo.uk/admin/{{short_token}}"
**Chars:** 144 (single segment)
**Notes:** Suppress for bookings via Booking.com, Airbnb, Sykes — those land in the OTA inbox not the SMS rota. Direct bookings are the high-margin channel and warrant the alert.

---

### sms.payment_failed
**Trigger:** Stripe `payment_intent.payment_failed` for a pending booking
**Audience:** lead guest
**Consent:** transactional
**Body:**
"Whalesborough: payment for booking {{booking_ref}} did not go through. Hold expires in 60 minutes. Retry: wbo.uk/pay/{{short_token}}."
**Chars:** 132 (single segment)
**Notes:** 60-minute soft hold on the inventory before release. Single retry SMS only — escalation after that is email plus reservations team callback during office hours.

---

### sms.owner_rental_statement
**Trigger:** monthly statement run, 5th of month at 09:00
**Audience:** lodge owner enrolled in rental management
**Consent:** operational (owner agreement)
**Body:**
"Whalesborough owners: your {{statement_month}} rental statement is available. £{{net_earnings}} net, {{occupancy_pct}}% occupancy. View: wbo.uk/own/{{short_token}}."
**Chars:** 161 (2 segments)
**Notes:** Two segments acceptable for a monthly send. Statement portal requires re-auth — short link drops to magic-link, not a logged-in view. Numbers are net of management fee.

---

### sms.owner_maintenance_update
**Trigger:** maintenance work order on owner-occupied lodge moves to "completed" or "rescheduled"
**Audience:** lodge owner
**Consent:** operational (owner agreement)
**Body:**
"Whalesborough owners: {{lodge_name}} — {{work_order_title}} {{status_verb}}. Notes and photos: wbo.uk/own/{{short_token}}."
**Chars:** 119 (single segment, depending on title length)
**Notes:** `status_verb` resolves to "completed", "rescheduled to {{new_date}}", or "delayed pending parts". If "delayed", body extends slightly; still fits one segment unless the lodge name and title are unusually long.

---

## 7. Marketing (consent-gated)

All templates in this section require an active marketing-SMS consent record, captured separately from email consent at account creation or in account settings. The consent record stores timestamp, source, and the exact wording shown to the user. `STOP to opt out` footer is mandatory and routes to a STOP handler that processes the opt-out within 24 hours and writes back to the CRM.

### sms.seasonal_newsletter_pointer
**Trigger:** monthly, first Thursday at 11:00, manual approval step
**Audience:** marketing-SMS consented members
**Consent:** marketing (opt-in required)
**Body:**
"Whalesborough: the May edition is out — what's on, who's cooking, what to book. Read in two minutes: wbo.uk/n/may. STOP to opt out."
**Chars:** 131 (single segment)
**Notes:** SMS is a pointer to the email newsletter, not a replacement — keeps unit cost low and respects SMS as an interruption channel. Frequency cap: 1 marketing SMS per recipient per 14 days regardless of campaign.

---

### sms.last_minute_availability
**Trigger:** on-demand, sent by revenue manager when occupancy <50% for a date <14 days out
**Audience:** marketing-SMS consented members who have stayed at least once
**Consent:** marketing (opt-in required)
**Body:**
"Whalesborough: a quiet weekend coming up. From {{rate_from}}/night, {{start_date}} to {{end_date}}. Members rate. wbo.uk/lm/{{slug}}. STOP to opt out."
**Chars:** 153 (single segment)
**Notes:** Audience must have a prior stay — protects the brand against discount-only behaviour. Rate shown is per night, not total. Frequency cap: max 2 last-minute SMS per recipient per month.

---

### sms.spa_late_availability
**Trigger:** on-demand by spa manager when treatment room utilisation <60% next 48h
**Audience:** marketing-SMS consented spa members
**Consent:** marketing (opt-in required)
**Body:**
"Whalesborough spa: tomorrow afternoon openings, treatments from £{{price_from}}. Book: wbo.uk/spa/late. STOP to opt out."
**Chars:** 121 (single segment)
**Notes:** Separate opt-in audience from generic marketing — spa members may consent to spa-specific availability without consenting to all-resort marketing. Frequency cap: max 2 per recipient per 14 days.

---

### sms.birthday_gift
**Trigger:** birthday + 0 days, send at 09:00 local
**Audience:** members who have provided birth date and marketing consent
**Consent:** marketing (opt-in required)
**Body:**
"Whalesborough: happy birthday from the team. A coffee and pastry at the lookout on us this month: wbo.uk/g/{{short_token}}. STOP to opt out."
**Chars:** 142 (single segment)
**Notes:** Short link redeems a single-use voucher tied to the member ID, valid 30 days. No purchase required. The voucher itself is the gift — no follow-up upsell SMS that month.

---

## Cross-template engineering notes

**Short link service.** All `wbo.uk/...` links are signed, single-use where appropriate (auth flows), and TTL-bound (typically 30 minutes for sensitive flows, 30 days for vouchers and statements). Click events are logged with timestamp and coarse user-agent for fraud detection; no PII is appended to the link path.

**Variable rendering.** Variables resolve from the booking, account, and CRM contexts at send time, not template-design time. Missing variables fail closed — the message is held and an operations alert is raised rather than sending "Hi {{first_name}}".

**Language fallbacks.** All copy is English-only at launch; the system stores a locale on the account, and a Welsh translation set is scaffolded but not yet authored — release blocked on translation review by a native speaker, since the Coastal Editorial register doesn't survive machine translation.

**Send-time windowing.** Service and marketing SMS are gated to 08:00–20:00 local for the recipient (using the account's stored timezone, defaulting to Europe/London). Transactional SMS — confirmations, OTPs, payment failures, refund notices — send at the time of trigger regardless of hour.

**Throttling and de-duplication.** A per-recipient send budget is enforced: at most 4 service SMS per booking, max 1 marketing SMS per 14 days regardless of which marketing template fires. Duplicate triggers within 5 minutes are deduplicated.

**STOP, START, HELP keyword handling.** All inbound STOP variants (STOP, UNSUBSCRIBE, END, CANCEL, QUIT) opt the recipient out of marketing SMS within 24 hours and log the event with timestamp. START reopens consent. HELP returns a single autoreply: "Whalesborough support: 01237 000000, 09:00 to 19:00. Reply STOP to opt out of marketing."

**Logging and retention.** Outbound SMS metadata (recipient hash, template ID, send time, delivery status) is retained 12 months. Body content is retained 30 days for incident triage then purged. Consent records are retained for the duration of consent plus 7 years per ICO guidance.

**Sender reputation.** Sender ID `WHALESBORO` is pre-registered with UK networks; SMS short codes are not used. Two-way conversational SMS uses a long-code reply path attached to the same sender ID, with auto-routing into the helpdesk queue.

**Failover.** SMS provider primary is one UK CPaaS vendor with a secondary failover provider configured. Health checks every 60 seconds; automatic cutover with no message loss. Transactional SMS that fail at the provider edge are retried 3 times with exponential backoff and then surface as a P2 ops alert.

**Cost discipline.** Single-segment SMS targeted across all marketing templates and most service templates. Multi-segment used only where the gate code, refund amount, or event detail must be unambiguous in-body. Budget assumption: £0.04 per single-segment, £0.06 per two-segment. At projected volume the SMS stack runs at roughly £1,400 per month at full occupancy.

**Accessibility.** SMS is text-only and works on every handset including text-to-speech readers. No reliance on visual formatting, emoji, or unicode tricks. All short-link destinations meet WCAG 2.2 AA per the broader platform standard.

**Audit trail.** Every send writes to the audit log with template ID, recipient hash (not raw phone number), trigger event ID, rendered body length, segment count, and consent class. Audit log is the source of truth for any data subject access request involving SMS history.
