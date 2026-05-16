/**
 * Drizzle ORM schema for Whalesborough Farm Resort & Spa.
 *
 * Tables:
 *  - users / accounts / sessions / verificationTokens (Auth.js v5 adapter)
 *  - properties (accommodation inventory)
 *  - bookings + bookingAddOns + payments
 *  - spaBookings, restaurantReservations
 *  - lodgeLeads + viewings (sales pipeline)
 *  - newsletterSubscribers, contactEnquiries
 *  - auditLog (regulatory)
 *
 * Re-export from here as `import { ... } from "@/lib/db/schema"`.
 */
import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { ulid } from "ulid";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum("user_role", ["guest", "staff", "admin"]);

export const propertyTypeEnum = pgEnum("property_type", [
  "cottage",
  "suite",
  "spa-lodge",
  "barn",
]);

export const propertyStatusEnum = pgEnum("property_status", [
  "active",
  "maintenance",
  "hidden",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "checked-in",
  "checked-out",
  "cancelled",
]);

export const bookingSourceEnum = pgEnum("booking_source", [
  "direct",
  "booking-com",
  "sykes",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
  "partially-refunded",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "apple-pay",
  "google-pay",
  "klarna",
]);

export const spaBookingStatusEnum = pgEnum("spa_booking_status", [
  "confirmed",
  "cancelled",
  "completed",
  "no-show",
]);

export const reservationStatusEnum = pgEnum("reservation_status", [
  "confirmed",
  "cancelled",
  "no-show",
]);

export const lodgeCollectionEnum = pgEnum("lodge_collection", [
  "tevi",
  "gwelva",
  "trelowen",
  "bespoke",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "viewing-booked",
  "reserved",
  "lost",
]);

export const viewingStatusEnum = pgEnum("viewing_status", [
  "scheduled",
  "completed",
  "cancelled",
  "no-show",
]);

export const enquiryStatusEnum = pgEnum("enquiry_status", [
  "new",
  "responded",
  "closed",
]);

// ─── Auth.js Tables ───────────────────────────────────────────────────────────

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    email: text("email").notNull(),
    name: text("name"),
    phone: text("phone"),
    avatar: text("avatar"),
    role: userRoleEnum("role").notNull().default("guest"),
    emailVerified: timestamp("email_verified", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("users_email_idx").on(table.email)]
);

export const accounts = pgTable(
  "accounts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => [
    uniqueIndex("accounts_provider_account_idx").on(
      table.provider,
      table.providerAccountId
    ),
    index("accounts_user_id_idx").on(table.userId),
  ]
);

export const sessions = pgTable(
  "sessions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    sessionToken: text("session_token").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)]
);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => [
    uniqueIndex("verification_tokens_identifier_token_idx").on(
      table.identifier,
      table.token
    ),
  ]
);

// ─── Properties ───────────────────────────────────────────────────────────────

export const properties = pgTable(
  "properties",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    type: propertyTypeEnum("type").notNull(),
    description: text("description"),
    shortDescription: text("short_description"),
    sleeps: integer("sleeps").notNull(),
    bedrooms: integer("bedrooms").notNull(),
    bathrooms: integer("bathrooms").notNull(),
    hasDog: boolean("has_dog").notNull().default(false),
    hasHotTub: boolean("has_hot_tub").notNull().default(false),
    hasPool: boolean("has_pool").notNull().default(false),
    images: jsonb("images").$type<string[]>().default([]),
    amenities: jsonb("amenities").$type<string[]>().default([]),
    priceFrom: numeric("price_from", { precision: 10, scale: 2 }),
    status: propertyStatusEnum("status").notNull().default("active"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("properties_type_idx").on(table.type),
    index("properties_status_idx").on(table.status),
    uniqueIndex("properties_slug_idx").on(table.slug),
  ]
);

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const bookings = pgTable(
  "bookings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    propertyId: text("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "restrict" }),
    checkIn: date("check_in").notNull(),
    checkOut: date("check_out").notNull(),
    adults: integer("adults").notNull().default(1),
    children: integer("children").notNull().default(0),
    infants: integer("infants").notNull().default(0),
    dogs: integer("dogs").notNull().default(0),
    totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
    depositPaid: numeric("deposit_paid", { precision: 10, scale: 2 }),
    status: bookingStatusEnum("status").notNull().default("pending"),
    specialRequests: text("special_requests"),
    source: bookingSourceEnum("source").notNull().default("direct"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
  },
  (table) => [
    index("bookings_user_id_idx").on(table.userId),
    index("bookings_property_id_idx").on(table.propertyId),
    index("bookings_check_in_idx").on(table.checkIn),
    index("bookings_check_out_idx").on(table.checkOut),
    index("bookings_status_idx").on(table.status),
    index("bookings_dates_idx").on(table.propertyId, table.checkIn, table.checkOut),
  ]
);

export const bookingAddOns = pgTable(
  "booking_add_ons",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    bookingId: text("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    quantity: integer("quantity").notNull().default(1),
    unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
    totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  },
  (table) => [index("booking_add_ons_booking_id_idx").on(table.bookingId)]
);

// ─── Payments ─────────────────────────────────────────────────────────────────

export const payments = pgTable(
  "payments",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    bookingId: text("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "restrict" }),
    stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").notNull().default("gbp"),
    status: paymentStatusEnum("status").notNull().default("pending"),
    method: paymentMethodEnum("method"),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    refundedAt: timestamp("refunded_at", { withTimezone: true }),
  },
  (table) => [
    index("payments_booking_id_idx").on(table.bookingId),
    index("payments_stripe_intent_idx").on(table.stripePaymentIntentId),
  ]
);

// ─── Spa Bookings ─────────────────────────────────────────────────────────────

export const spaBookings = pgTable(
  "spa_bookings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    treatmentName: text("treatment_name").notNull(),
    date: date("date").notNull(),
    time: time("time").notNull(),
    duration: integer("duration").notNull(), // minutes
    therapist: text("therapist"),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    status: spaBookingStatusEnum("status").notNull().default("confirmed"),
    trybeBookingId: text("trybe_booking_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("spa_bookings_user_id_idx").on(table.userId),
    index("spa_bookings_date_idx").on(table.date),
  ]
);

// ─── Restaurant Reservations ──────────────────────────────────────────────────

export const restaurantReservations = pgTable(
  "restaurant_reservations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    date: date("date").notNull(),
    time: time("time").notNull(),
    partySize: integer("party_size").notNull(),
    specialRequests: text("special_requests"),
    status: reservationStatusEnum("status").notNull().default("confirmed"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("restaurant_reservations_user_id_idx").on(table.userId),
    index("restaurant_reservations_date_idx").on(table.date),
  ]
);

// ─── Lodge Sales Pipeline ─────────────────────────────────────────────────────

export const lodgeLeads = pgTable(
  "lodge_leads",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    collection: lodgeCollectionEnum("collection").notNull(),
    message: text("message"),
    source: text("source"),
    status: leadStatusEnum("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("lodge_leads_status_idx").on(table.status),
    index("lodge_leads_collection_idx").on(table.collection),
    index("lodge_leads_email_idx").on(table.email),
  ]
);

export const viewings = pgTable(
  "viewings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    leadId: text("lead_id")
      .notNull()
      .references(() => lodgeLeads.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    time: time("time").notNull(),
    collection: lodgeCollectionEnum("collection").notNull(),
    assignedTo: text("assigned_to"),
    status: viewingStatusEnum("status").notNull().default("scheduled"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("viewings_lead_id_idx").on(table.leadId),
    index("viewings_date_idx").on(table.date),
  ]
);

// ─── Newsletter & Contact ─────────────────────────────────────────────────────

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    email: text("email").notNull(),
    emailOptIn: boolean("email_opt_in").notNull().default(true),
    smsOptIn: boolean("sms_opt_in").notNull().default(false),
    smsNumber: text("sms_number"),
    source: text("source"),
    subscribedAt: timestamp("subscribed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  },
  (table) => [uniqueIndex("newsletter_subscribers_email_idx").on(table.email)]
);

export const contactEnquiries = pgTable(
  "contact_enquiries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    subject: text("subject"),
    message: text("message").notNull(),
    status: enquiryStatusEnum("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    respondedAt: timestamp("responded_at", { withTimezone: true }),
  },
  (table) => [
    index("contact_enquiries_status_idx").on(table.status),
    index("contact_enquiries_email_idx").on(table.email),
  ]
);

// ─── Audit Log ────────────────────────────────────────────────────────────────

export const auditLog = pgTable(
  "audit_log",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => ulid()),
    userId: text("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    action: text("action").notNull(),
    resource: text("resource").notNull(),
    resourceId: text("resource_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("audit_log_user_id_idx").on(table.userId),
    index("audit_log_resource_idx").on(table.resource, table.resourceId),
    index("audit_log_created_at_idx").on(table.createdAt),
  ]
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  bookings: many(bookings),
  spaBookings: many(spaBookings),
  restaurantReservations: many(restaurantReservations),
  auditLogs: many(auditLog),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const propertiesRelations = relations(properties, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  property: one(properties, {
    fields: [bookings.propertyId],
    references: [properties.id],
  }),
  addOns: many(bookingAddOns),
  payments: many(payments),
}));

export const bookingAddOnsRelations = relations(bookingAddOns, ({ one }) => ({
  booking: one(bookings, {
    fields: [bookingAddOns.bookingId],
    references: [bookings.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
  }),
}));

export const spaBookingsRelations = relations(spaBookings, ({ one }) => ({
  user: one(users, { fields: [spaBookings.userId], references: [users.id] }),
}));

export const restaurantReservationsRelations = relations(
  restaurantReservations,
  ({ one }) => ({
    user: one(users, {
      fields: [restaurantReservations.userId],
      references: [users.id],
    }),
  })
);

export const lodgeLeadsRelations = relations(lodgeLeads, ({ many }) => ({
  viewings: many(viewings),
}));

export const viewingsRelations = relations(viewings, ({ one }) => ({
  lead: one(lodgeLeads, {
    fields: [viewings.leadId],
    references: [lodgeLeads.id],
  }),
}));

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  user: one(users, { fields: [auditLog.userId], references: [users.id] }),
}));

// ─── Type Exports ─────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

export type BookingAddOn = typeof bookingAddOns.$inferSelect;
export type NewBookingAddOn = typeof bookingAddOns.$inferInsert;

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export type SpaBooking = typeof spaBookings.$inferSelect;
export type NewSpaBooking = typeof spaBookings.$inferInsert;

export type RestaurantReservation = typeof restaurantReservations.$inferSelect;
export type NewRestaurantReservation =
  typeof restaurantReservations.$inferInsert;

export type LodgeLead = typeof lodgeLeads.$inferSelect;
export type NewLodgeLead = typeof lodgeLeads.$inferInsert;

export type Viewing = typeof viewings.$inferSelect;
export type NewViewing = typeof viewings.$inferInsert;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

export type ContactEnquiry = typeof contactEnquiries.$inferSelect;
export type NewContactEnquiry = typeof contactEnquiries.$inferInsert;

export type AuditLogEntry = typeof auditLog.$inferSelect;
export type NewAuditLogEntry = typeof auditLog.$inferInsert;
