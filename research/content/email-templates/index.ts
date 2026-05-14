/**
 * Whalesborough Email Templates — barrel export.
 * Import any template, layout, primitive or token from this single entry.
 *
 *   import { BookingConfirmation, EmailLayout, tokens } from './email-templates';
 */

// Shared layout + primitives
export { default as EmailLayout } from './_layout';
export * from './_components';

// 01 - 12 · Booking lifecycle
export { default as BookingConfirmation } from './BookingConfirmation';
export { default as PaymentReceipt } from './PaymentReceipt';
export { default as PreArrival30Days } from './PreArrival30Days';
export { default as PreArrival14Days } from './PreArrival14Days';
export { default as PreArrival7Days } from './PreArrival7Days';
export { default as PreArrival24Hours } from './PreArrival24Hours';
export { default as CheckInToday } from './CheckInToday';
export { default as MidStayCheckIn } from './MidStayCheckIn';
export { default as CheckOutInstructions } from './CheckOutInstructions';
export { default as PostStayReview } from './PostStayReview';
export { default as BookingModified } from './BookingModified';
export { default as BookingCancelled } from './BookingCancelled';

// 13 - 18 · Spa
export { default as SpaBookingConfirmation } from './SpaBookingConfirmation';
export { default as SpaPreArrivalForm } from './SpaPreArrivalForm';
export { default as SpaReminder24h } from './SpaReminder24h';
export { default as MembershipWelcome } from './MembershipWelcome';
export { default as MembershipBilling } from './MembershipBilling';
export { default as MembershipFrozen } from './MembershipFrozen';

// 19 - 22 · Restaurant
export { default as RestaurantReservationConfirmation } from './RestaurantReservationConfirmation';
export { default as RestaurantReminder24h } from './RestaurantReminder24h';
export { default as EventTicketConfirmation } from './EventTicketConfirmation';
export { default as LakesideLocalsWelcome } from './LakesideLocalsWelcome';

// 23 - 26 · Sales
export { default as BrochureDelivery } from './BrochureDelivery';
export { default as ViewingConfirmation } from './ViewingConfirmation';
export { default as ViewingFollowUp } from './ViewingFollowUp';
export { default as WaitlistJoined } from './WaitlistJoined';

// 27 - 30 · Auth + transactional
export { default as MagicLink } from './MagicLink';
export { default as EmailVerification } from './EmailVerification';
export { default as PasswordReset } from './PasswordReset';
export { default as AccountDeletionConfirmation } from './AccountDeletionConfirmation';

// 31 - 34 · Marketing (PECR consent required per send)
export { default as NewsletterWelcome } from './NewsletterWelcome';
export { default as BirthdaySurprise } from './BirthdaySurprise';
export { default as AnniversaryRecognition } from './AnniversaryRecognition';
export { default as WinBack } from './WinBack';
