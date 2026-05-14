/**
 * ============================================================================
 *  Whalesborough Farm Resort & Spa — Production Zod Schemas
 *  Single shared client + server validation source of truth.
 *
 *  Compliance basis: UK GDPR / DPA 2018 / DUAA 2025 / PECR / WCAG 2.2 AA /
 *  PCI DSS v4.0.1 / OWASP Top 10:2025 / Hotel Records Order 1972 /
 *  Limitation Act 1980 / Equality Act 2010 / Consumer Contracts Regs 2013 /
 *  Package Travel Regs 2018 / FCA financial promotion rules.
 *
 *  Author: Peake Management — May 2026
 *
 *  IMPORTANT — read before editing:
 *  - Every schema is `.strict()` so unknown keys are rejected. This is
 *    deliberate: it prevents prototype-pollution-style attacks via JSON
 *    bodies and forces explicit additions when forms grow.
 *  - Inputs that hit identity, marketing or health surfaces ALWAYS use the
 *    primitive helpers near the top of this file. Do not redefine them.
 *  - Health data on the spa intake form is Article 9 UK GDPR (special
 *    category). The data shape is here; encryption at rest, segregated
 *    storage, and explicit consent capture are responsibilities of the
 *    handler — see /server/spa/intake.handler.ts.
 *  - PECR-compliant marketing consent is captured as separate booleans by
 *    channel × topic. Never collapse to a single "marketingConsent" boolean.
 *  - The default ZodError messages are overridden with plain-English text
 *    so they can be rendered to a user without translation. Keep them
 *    plain-English when you add new fields.
 *
 *  Route hand-off map (for the API hardening layer):
 *  - /api/auth/*                              → authentication forms
 *  - /api/booking/*                           → accommodation flow
 *  - /api/spa/*                               → spa flow
 *  - /api/restaurant/*                        → restaurant + events
 *  - /api/sales/*                             → lodge sales funnel
 *  - /api/account/*                           → guest portal
 *  - /api/gdpr/*                              → data subject rights
 *  - /api/contact/*                           → contact + complaints
 *  - /api/newsletter/*                        → mailing list
 *  - /api/owner/*                             → lodge owner portal
 *  - /api/admin/*                             → staff/admin (basic only)
 * ============================================================================
 */

import { z } from "zod";

/* ============================================================================
 *  SECTION 1 — Reusable primitives
 *  Use these everywhere. Do NOT redefine.
 * ============================================================================
 */

/**
 * RFC-5321-shaped email with required TLD.
 * - Trims surrounding whitespace.
 * - Lowercases the address (canonical form for de-duplication).
 * - Caps at 254 chars (RFC-5321 §4.5.3.1.3).
 * - Refuses plus-only addresses with no local part.
 *
 * Used by: every auth / contact / marketing / commerce form.
 */
export const emailSchema = z
  .string({ required_error: "Email is required.", invalid_type_error: "Email must be text." })
  .trim()
  .toLowerCase()
  .min(5, { message: "That email is too short." })
  .max(254, { message: "That email is too long." })
  .regex(
    /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/,
    { message: "Please enter a valid email address." },
  )
  .refine((v) => !v.startsWith("+") && !v.startsWith("."), {
    message: "Email cannot start with that character.",
  });

/**
 * UK phone number. Accepts:
 *   - International form starting "+44" (preferred, stored as-is)
 *   - National form starting "0"   (stored as entered — server may normalise)
 * Strips whitespace, parentheses and hyphens before validation.
 */
export const ukPhoneSchema = z
  .string({ required_error: "Phone number is required." })
  .trim()
  .transform((v) => v.replace(/[\s()\-]/g, ""))
  .pipe(
    z
      .string()
      .regex(
        /^(\+44\d{9,10}|0\d{9,10})$/,
        {
          message:
            "Please enter a UK phone number starting with +44 or 0 (10 or 11 digits).",
        },
      ),
  );

/** Optional UK phone — empty string treated as undefined. */
export const ukPhoneOptionalSchema = z
  .union([z.literal(""), ukPhoneSchema])
  .transform((v) => (v === "" ? undefined : v))
  .optional();

/**
 * UK postcode (e.g. EX23 0JD). Accepts with or without the inner space and
 * any case; canonicalised on output to upper-case with the standard space.
 */
export const ukPostcodeSchema = z
  .string({ required_error: "Postcode is required." })
  .trim()
  .toUpperCase()
  .regex(
    /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/,
    { message: "Please enter a valid UK postcode (e.g. EX23 0JD)." },
  )
  .transform((v) => {
    const compact = v.replace(/\s+/g, "");
    return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
  });

/** ISO 8601 calendar date — YYYY-MM-DD. */
export const dateSchema = z
  .string({ required_error: "Date is required." })
  .regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in YYYY-MM-DD format.",
  })
  .refine((v) => !Number.isNaN(Date.parse(v)), {
    message: "That date is not valid.",
  });

/** ISO 8601 date-time with timezone — used for slot bookings. */
export const dateTimeSchema = z
  .string({ required_error: "Date and time are required." })
  .datetime({
    offset: true,
    message: "Date must be a valid ISO 8601 timestamp with timezone.",
  });

/**
 * Stay window: arrival, departure, with the business rule that
 * checkOut > checkIn, both dates not in the past, and max 60 nights
 * (long-stay residential at Whalesborough is a separate product).
 */
export const dateRangeSchema = z
  .object({
    checkIn: dateSchema,
    checkOut: dateSchema,
  })
  .strict()
  .refine(
    (v) => new Date(v.checkOut).getTime() > new Date(v.checkIn).getTime(),
    {
      message: "Check-out must be after check-in.",
      path: ["checkOut"],
    },
  )
  .refine(
    (v) => {
      const nights =
        (new Date(v.checkOut).getTime() - new Date(v.checkIn).getTime()) /
        (1000 * 60 * 60 * 24);
      return nights <= 60;
    },
    {
      message: "Stays are capped at 60 nights — please contact reception for longer stays.",
      path: ["checkOut"],
    },
  )
  .refine(
    (v) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(v.checkIn).getTime() >= today.getTime();
    },
    {
      message: "Check-in cannot be in the past.",
      path: ["checkIn"],
    },
  );

/**
 * Personal name — Unicode letters, hyphens, apostrophes, full stops and
 * spaces only. Catches the common injection vectors and obvious test data.
 */
export const nameSchema = z
  .string({ required_error: "Name is required." })
  .trim()
  .min(1, { message: "Please tell us your name." })
  .max(100, { message: "Name must be 100 characters or fewer." })
  .regex(/^[\p{L}][\p{L}\s'.\-]{0,99}$/u, {
    message:
      "Name can contain letters, spaces, hyphens and apostrophes only.",
  });

/** Money in pence/minor unit — non-negative integer, max £100k. */
export const currencyPenceSchema = z
  .number({ invalid_type_error: "Amount must be a number." })
  .int({ message: "Amount must be a whole number of pence." })
  .nonnegative({ message: "Amount cannot be negative." })
  .max(10_000_000, { message: "Amount is unusually large — please check." });

/** HTTPS URL only. No http://, no javascript:, no data: — anti-XSS. */
export const urlSchema = z
  .string({ required_error: "URL is required." })
  .trim()
  .url({ message: "Please enter a valid URL." })
  .startsWith("https://", { message: "URL must start with https://" });

/** kebab-case slug — used for content references. */
export const slugSchema = z
  .string({ required_error: "Slug is required." })
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be kebab-case (e.g. my-page-name).",
  })
  .max(120, { message: "Slug is too long." });

/** Lowercase ULID (26 chars Crockford base32). */
export const ulidSchema = z
  .string()
  .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/i, { message: "Invalid ULID." });

/** UUID v4 — case insensitive. */
export const uuidSchema = z
  .string()
  .uuid({ message: "Invalid identifier." });

/**
 * PECR-compliant marketing consent. PECR requires SEPARATE consent per
 * channel and per topic — never collapse to one boolean.
 *
 * Lodge sales is intentionally a separate flag: per the spec, lodge sales
 * marketing is NOT "similar" to holiday bookings and cannot rely on
 * soft opt-in. It needs explicit consent.
 */
export const marketingConsentSchema = z
  .object({
    /** Email about holidays, spa, restaurant and events. */
    emailMarketing: z.boolean().default(false),
    /** SMS marketing — needs explicit opt-in (separate from email). */
    smsMarketing: z.boolean().default(false),
    /** Direct mail / post. Lawful basis: legitimate interest, opt-out. */
    postMarketing: z.boolean().default(false),
    /** Lodge sales — explicit opt-in only, per PECR §22. */
    lodgeSalesEmail: z.boolean().default(false),
    /** Lodge sales SMS — explicit opt-in only. */
    lodgeSalesSms: z.boolean().default(false),
    /** Membership / wellness offers. */
    wellnessMarketing: z.boolean().default(false),
    /** Restaurant events and chef's table. */
    restaurantMarketing: z.boolean().default(false),
  })
  .strict();

/**
 * UK 14 statutory allergens — Food Information Regulations 2014.
 * Order maintained from regulation Schedule II for FSA mapping.
 */
export const ukAllergenEnum = z.enum([
  "celery",
  "cereals-containing-gluten",
  "crustaceans",
  "eggs",
  "fish",
  "lupin",
  "milk",
  "molluscs",
  "mustard",
  "tree-nuts",
  "peanuts",
  "sesame",
  "soybeans",
  "sulphur-dioxide-and-sulphites",
]);

/** Dietary preferences (not legally required but standard hospitality). */
export const dietaryPreferenceEnum = z.enum([
  "vegetarian",
  "vegan",
  "pescatarian",
  "gluten-free",
  "dairy-free",
  "low-fodmap",
  "halal",
  "kosher",
  "no-preference",
]);

/** Combined dietary block used across booking / spa / restaurant. */
export const dietaryRestrictionsSchema = z
  .object({
    allergens: z.array(ukAllergenEnum).max(14).default([]),
    preferences: z.array(dietaryPreferenceEnum).max(9).default([]),
    /** Free-text notes — sanitised server-side, capped to 500. */
    notes: z
      .string()
      .trim()
      .max(500, { message: "Please keep dietary notes under 500 characters." })
      .optional(),
  })
  .strict();

/** Species enum kept tight so we don't promise dog-friendly logic that breaks. */
export const petSpeciesEnum = z.enum(["dog", "assistance-dog"]);

/**
 * Dog profile — recorded on the pre-arrival form and the account.
 * Used to gate dog-free units (Arvor Suite 1.0, Penthouse 2.0, Eagle's Nest)
 * and to seed the dog welcome pack.
 */
export const petProfileSchema = z
  .object({
    id: ulidSchema.optional(),
    name: z
      .string()
      .trim()
      .min(1, { message: "Please tell us your dog's name." })
      .max(40, { message: "Pet name must be 40 characters or fewer." }),
    species: petSpeciesEnum.default("dog"),
    breed: z
      .string()
      .trim()
      .max(60, { message: "Breed must be 60 characters or fewer." })
      .optional(),
    ageYears: z
      .number()
      .int()
      .min(0, { message: "Age cannot be negative." })
      .max(30, { message: "Please check your dog's age." })
      .optional(),
    weightKg: z
      .number()
      .positive({ message: "Weight must be more than zero." })
      .max(120, { message: "Please check your dog's weight." })
      .optional(),
    allergies: z
      .string()
      .trim()
      .max(300, { message: "Allergy notes must be 300 characters or fewer." })
      .optional(),
    behaviourNotes: z
      .string()
      .trim()
      .max(500, { message: "Behaviour notes must be 500 characters or fewer." })
      .optional(),
    /** Required for assistance-dog claims — Equality Act 2010 §189. */
    assistanceDogId: z
      .string()
      .trim()
      .max(50)
      .optional(),
  })
  .strict()
  .refine(
    (v) => v.species !== "assistance-dog" || !!v.assistanceDogId,
    {
      message: "Assistance dogs need a registration number or training body name.",
      path: ["assistanceDogId"],
    },
  );

/**
 * UK postal address. Line 1 + town + postcode are required;
 * county is optional (London / one-line addresses).
 */
export const addressSchema = z
  .object({
    label: z
      .string()
      .trim()
      .max(40, { message: "Address label must be 40 characters or fewer." })
      .optional(),
    line1: z
      .string()
      .trim()
      .min(1, { message: "Address line 1 is required." })
      .max(100, { message: "Address line 1 must be 100 characters or fewer." }),
    line2: z
      .string()
      .trim()
      .max(100, { message: "Address line 2 must be 100 characters or fewer." })
      .optional(),
    town: z
      .string()
      .trim()
      .min(1, { message: "Town is required." })
      .max(60, { message: "Town must be 60 characters or fewer." }),
    county: z
      .string()
      .trim()
      .max(60, { message: "County must be 60 characters or fewer." })
      .optional(),
    postcode: ukPostcodeSchema,
    country: z
      .string()
      .trim()
      .default("United Kingdom"),
  })
  .strict();

/**
 * Password — minimum 12 chars (PCI DSS v4.0.1 §8.3.6, plus OWASP 2025).
 * Mixes case, digit and symbol. Refuses the obvious bad-passwords list
 * (handled server-side via haveibeenpwned k-anonymity check too).
 */
export const passwordSchema = z
  .string({ required_error: "Password is required." })
  .min(12, { message: "Password must be at least 12 characters." })
  .max(128, { message: "Password is too long (128 character max)." })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
  .regex(/\d/, { message: "Password must contain at least one digit." })
  .regex(/[^\w\s]/, { message: "Password must contain at least one symbol." })
  .refine(
    (v) =>
      ![
        "password",
        "12345678",
        "qwerty",
        "letmein",
        "welcome",
        "monkey",
        "iloveyou",
        "whalesborough",
      ].some((b) => v.toLowerCase().includes(b)),
    { message: "Please choose a less common password." },
  );

/**
 * Anti-spam honeypot — a hidden field that real users never fill in.
 * If present and non-empty, validation should fail silently server-side.
 * We model it explicitly here so every route validates the same way.
 */
export const honeypotSchema = z
  .string()
  .max(0, { message: "Spam guard triggered." })
  .optional()
  .or(z.undefined());

/** Cloudflare Turnstile / hCaptcha token shape — opaque string. */
export const captchaTokenSchema = z
  .string()
  .trim()
  .min(20, { message: "Please complete the security check." })
  .max(2048);

/** Whether the user accepted T&Cs (must be true to submit). */
export const termsAcceptedSchema = z
  .literal(true, {
    errorMap: () => ({ message: "Please accept the terms to continue." }),
  });

/** Plain language confirmation that the customer was told they have no
 *  14-day cancellation right under Consumer Contracts Regs 2013 §28(1)(g).
 *  Must be true at point of accommodation booking, or the cooling-off
 *  exemption is lost (extends to 12 months — see compliance brief §4). */
export const ccrAcknowledgementSchema = z
  .literal(true, {
    errorMap: () => ({
      message:
        "Please confirm you understand this booking is exempt from the 14-day cooling-off period.",
    }),
  });

/* ============================================================================
 *  SECTION 2 — Authentication forms
 *  Routes: /api/auth/sign-up, /api/auth/sign-in, /api/auth/magic-link,
 *          /api/auth/password-reset, /api/auth/password-change,
 *          /api/auth/2fa/setup, /api/account/delete
 * ============================================================================
 */

/**
 * Sign-up form.
 * PECR: marketing consents are EXPLICIT and SEPARATE — there is no
 * soft opt-in for lodge sales (per compliance brief §1).
 * GDPR: lawful basis for the account itself is contract necessity;
 * marketing flags use consent.
 */
export const signUpSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    phone: ukPhoneOptionalSchema,
    marketingConsent: marketingConsentSchema,
    /** Privacy policy + T&Cs acceptance — required, not pre-ticked. */
    acceptTerms: termsAcceptedSchema,
    /** Honeypot. */
    botField: honeypotSchema,
    /** Turnstile token. */
    captchaToken: captchaTokenSchema.optional(),
  })
  .strict();

/**
 * Sign-in — supports password OR magic link request via the same endpoint.
 * The discriminator is `mode`. The server should rate-limit at
 * 5 attempts per 15 minutes per email + IP (compliance brief §7).
 */
export const signInSchema = z.discriminatedUnion("mode", [
  z
    .object({
      mode: z.literal("password"),
      email: emailSchema,
      password: z
        .string({ required_error: "Password is required." })
        .min(1, { message: "Password is required." })
        .max(128),
      /** Optional TOTP code — required after 2FA enrolment. */
      totpCode: z
        .string()
        .regex(/^\d{6}$/, { message: "Two-factor code must be 6 digits." })
        .optional(),
      /** "Remember me" sets a longer-lived refresh token. */
      rememberMe: z.boolean().default(false),
      botField: honeypotSchema,
      captchaToken: captchaTokenSchema.optional(),
    })
    .strict(),
  z
    .object({
      mode: z.literal("magic-link"),
      email: emailSchema,
      /** Where to send the user after they click the link. */
      redirectTo: z
        .string()
        .trim()
        .startsWith("/", { message: "Redirect must be a relative path." })
        .max(200)
        .optional(),
      botField: honeypotSchema,
      captchaToken: captchaTokenSchema.optional(),
    })
    .strict(),
]);

/** Magic-link only request (forgot password alternative). */
export const magicLinkRequestSchema = z
  .object({
    email: emailSchema,
    redirectTo: z
      .string()
      .trim()
      .startsWith("/", { message: "Redirect must be a relative path." })
      .max(200)
      .optional(),
    botField: honeypotSchema,
    captchaToken: captchaTokenSchema.optional(),
  })
  .strict();

/** Password reset request — sends an email with a reset token. */
export const passwordResetRequestSchema = z
  .object({
    email: emailSchema,
    botField: honeypotSchema,
    captchaToken: captchaTokenSchema.optional(),
  })
  .strict();

/** Password reset confirmation — actually changes the password. */
export const passwordResetSchema = z
  .object({
    token: z
      .string()
      .min(20, { message: "Reset link is invalid or expired." })
      .max(512),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .strict()
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

/** Logged-in password change — checks current password. */
export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Please enter your current password." })
      .min(1, { message: "Please enter your current password." })
      .max(128),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .strict()
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((v) => v.currentPassword !== v.newPassword, {
    message: "New password must be different from your current password.",
    path: ["newPassword"],
  });

/** TOTP set-up step — confirms the user can read the QR. */
export const twoFactorSetupSchema = z
  .object({
    /** Server-issued secret echoed back, used to bind the verify call. */
    secret: z.string().min(16).max(64),
    code: z
      .string()
      .regex(/^\d{6}$/, { message: "Two-factor code must be 6 digits." }),
  })
  .strict();

/** Disable / unbind 2FA — requires password re-check. */
export const twoFactorDisableSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required." }).max(128),
    code: z
      .string()
      .regex(/^\d{6}$/, { message: "Two-factor code must be 6 digits." }),
  })
  .strict();

/**
 * Account deletion — GDPR Article 17 right to erasure.
 * Optional reason captured for product analytics (lawful basis: legit interest).
 * The actual erasure is asynchronous; the response is queued, not immediate.
 */
export const accountDeletionSchema = z
  .object({
    /** Confirms the user typed "DELETE" in the field — UX safeguard. */
    confirmation: z.literal("DELETE", {
      errorMap: () => ({
        message: "Type DELETE in capitals to confirm.",
      }),
    }),
    /** Re-auth password — defence against session hijack. */
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .max(128),
    reason: z
      .enum([
        "no-longer-using",
        "privacy-concerns",
        "moving-providers",
        "had-a-bad-experience",
        "other",
      ])
      .optional(),
    reasonNotes: z
      .string()
      .trim()
      .max(1000, { message: "Notes must be 1000 characters or fewer." })
      .optional(),
    acceptIrreversible: termsAcceptedSchema,
  })
  .strict();

/* ============================================================================
 *  SECTION 3 — Booking (accommodation) forms
 *  Routes: /api/booking/search, /api/booking/filters,
 *          /api/booking/create, /api/booking/[id]/modify,
 *          /api/booking/[id]/cancel, /api/booking/[id]/pre-arrival
 * ============================================================================
 */

/** Unit category — keeps the search filter contract tight. */
export const unitCategoryEnum = z.enum([
  "arvor-studio",
  "arvor-wetroom-studio",
  "arvor-suite",
  "arvor-duplex",
  "arvor-penthouse",
  "cottage-couples",
  "cottage-standard",
  "cottage-spa",
  "cottage-premium",
  "cottage-large-spa",
  "cottage-signature",
  "cottage-signature-villa",
  "cottage-signature-10",
]);

/**
 * Accommodation search (top of the funnel). All filters optional except
 * dates. The guest-count refinement makes sure infants count toward the
 * lap-children rules (Whalesborough policy: under 2s do not count as
 * occupants but must be declared for safety/towel/cot provisioning).
 */
export const accommodationSearchSchema = z
  .object({
    dates: dateRangeSchema,
    adults: z
      .number()
      .int()
      .min(1, { message: "At least one adult is required." })
      .max(10, { message: "Please contact us for groups of more than 10." }),
    children: z
      .number()
      .int()
      .nonnegative()
      .max(10, { message: "Please contact us for larger family groups." })
      .default(0),
    infants: z
      .number()
      .int()
      .nonnegative()
      .max(4, { message: "Please contact us about additional cots." })
      .default(0),
    dogs: z
      .number()
      .int()
      .nonnegative()
      .max(2, { message: "Up to 2 dogs per cottage — please contact us for more." })
      .default(0),
    unitType: unitCategoryEnum.optional(),
  })
  .strict();

/**
 * Full filter superset for the listings page. Extends search with the
 * facet filters described in unit-inventory-complete.md.
 */
export const accommodationFiltersSchema = accommodationSearchSchema
  .innerType()
  .extend({
    hotTub: z.boolean().optional(),
    accessible: z.boolean().optional(),
    /** Sleeps 8+ — the "large group" filter. */
    largeGroup: z.boolean().optional(),
    /** Has a woodburner / wood stove. */
    woodburner: z.boolean().optional(),
    /** Sea / valley / canal view filter. */
    view: z.enum(["sea", "valley", "canal", "garden", "any"]).optional(),
    /** Pool/spa proximity (within 5 min walk). */
    nearSpa: z.boolean().optional(),
    /** EV charging on-plot. */
    evCharging: z.boolean().optional(),
    /** Single-storey only — accessibility implication. */
    singleStorey: z.boolean().optional(),
    /** Sort preference. */
    sortBy: z
      .enum(["price-asc", "price-desc", "sleeps-asc", "sleeps-desc", "popularity"])
      .default("popularity"),
    /** Pagination. */
    page: z.number().int().min(1).default(1),
    perPage: z.number().int().min(1).max(48).default(12),
  })
  .strict();

/** Add-on attached to a booking (hamper, cot, dog pack, etc.). */
export const bookingAddOnSchema = z
  .object({
    sku: slugSchema,
    quantity: z.number().int().min(1).max(20),
    /** Free-text instructions for hamper personalisation, age of cot, etc. */
    notes: z.string().trim().max(280).optional(),
  })
  .strict();

/** Lead guest contact block — required at booking creation. */
export const leadGuestSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: ukPhoneSchema,
    address: addressSchema.optional(),
    /** Estimated arrival hour (24h) — populates the ANPR window. */
    estimatedArrivalHour: z
      .number()
      .int()
      .min(0)
      .max(23)
      .optional(),
  })
  .strict();

/**
 * Booking create — the master payload sent to the booking engine.
 * Server enforces inventory, pricing and dog-friendly rules; client
 * validates shape. The unitId is a Landal type-code or internal slug;
 * we accept both forms via a union.
 */
export const bookingCreateSchema = z
  .object({
    unitId: z.union([
      z.string().regex(/^\d{1,2}[A-Z]{1,5}\d?$/, {
        message: "Invalid unit code.",
      }),
      slugSchema,
    ]),
    dates: dateRangeSchema,
    adults: z.number().int().min(1).max(10),
    children: z.number().int().nonnegative().max(10).default(0),
    infants: z.number().int().nonnegative().max(4).default(0),
    pets: z.array(petProfileSchema).max(4).default([]),
    leadGuest: leadGuestSchema,
    addOns: z.array(bookingAddOnSchema).max(20).default([]),
    /** Optional promo code — alphanumeric, dash, 4-32. */
    promoCode: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z0-9\-]{4,32}$/, { message: "Promo code is not valid." })
      .optional(),
    /** Optional gift voucher code, separate from promo. */
    voucherCode: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z0-9\-]{8,32}$/, { message: "Voucher code is not valid." })
      .optional(),
    /** Special occasions trigger anniversary/birthday extras. */
    specialOccasion: z
      .enum(["birthday", "anniversary", "honeymoon", "babymoon", "other", "none"])
      .default("none"),
    occasionNotes: z.string().trim().max(280).optional(),
    /** Required acknowledgement of CCR 2013 §28 exemption. */
    acknowledgeNoCoolingOff: ccrAcknowledgementSchema,
    /** Acceptance of booking T&Cs. */
    acceptTerms: termsAcceptedSchema,
    /** Optional account binding — if user is logged in. */
    guestUserId: ulidSchema.optional(),
  })
  .strict()
  .superRefine((v, ctx) => {
    // Dogs must be declared in `pets`, count must agree with the search.
    const dogCount = v.pets.filter((p) => p.species === "dog").length;
    if (dogCount > 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Maximum of 2 dogs per cottage. Assistance dogs are not capped — please flag them as 'assistance-dog'.",
        path: ["pets"],
      });
    }
    // Occasion notes only meaningful if occasion is set.
    if (v.specialOccasion === "none" && v.occasionNotes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tell us the occasion if you'd like us to do something special.",
        path: ["specialOccasion"],
      });
    }
  });

/**
 * Modify an existing booking. Only certain fields are mutable post-confirmation
 * (dates and unit are not — that's a cancellation + rebook). We enforce
 * the allow-list at the schema level for defence in depth.
 */
export const bookingModifySchema = z
  .object({
    bookingId: ulidSchema,
    /** What the guest is changing. */
    changes: z
      .object({
        adults: z.number().int().min(1).max(10).optional(),
        children: z.number().int().nonnegative().max(10).optional(),
        infants: z.number().int().nonnegative().max(4).optional(),
        pets: z.array(petProfileSchema).max(4).optional(),
        addOns: z.array(bookingAddOnSchema).max(20).optional(),
        leadGuest: leadGuestSchema.partial().optional(),
        specialOccasion: z
          .enum(["birthday", "anniversary", "honeymoon", "babymoon", "other", "none"])
          .optional(),
        occasionNotes: z.string().trim().max(280).optional(),
        estimatedArrivalHour: z.number().int().min(0).max(23).optional(),
      })
      .strict()
      .refine((v) => Object.keys(v).length > 0, {
        message: "Please change at least one detail.",
      }),
  })
  .strict();

/**
 * Cancellation request.
 * Note: the cancellation policy (30%/50%/75%/100% sliding scale) is a
 * server-side calculation. The schema only captures intent + reason.
 */
export const cancellationSchema = z
  .object({
    bookingId: ulidSchema,
    reason: z.enum([
      "change-of-plans",
      "illness",
      "bereavement",
      "weather",
      "travel-disruption",
      "found-a-better-option",
      "site-issue",
      "other",
    ]),
    reasonNotes: z.string().trim().max(500).optional(),
    /** Confirms the user has read the cancellation policy. */
    acknowledgeCancellationFee: termsAcceptedSchema,
  })
  .strict();

/**
 * UK car-registration format (current style + older NI). Used by the
 * ANPR pre-arrival capture so the front gate opens automatically.
 */
export const ukVrmSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(
    /^([A-Z]{2}\d{2}\s?[A-Z]{3}|[A-Z]\d{1,3}\s?[A-Z]{3}|[A-Z]{3}\s?\d{1,3}[A-Z]|[A-Z]{1,3}\s?\d{1,4})$/,
    { message: "Please enter a valid UK number plate." },
  );

/**
 * Pre-arrival form — sent 14 days before arrival. Confirms party,
 * captures accessibility needs, dietary, dog profile, ANPR plate.
 */
export const preArrivalFormSchema = z
  .object({
    bookingId: ulidSchema,
    /** Confirmed ETA window — 24h format, hour granularity. */
    eta: z
      .object({
        arrivalDate: dateSchema,
        arrivalHour: z.number().int().min(0).max(23),
      })
      .strict(),
    /** Guest list — names only; passport details are NOT collected here. */
    partyMembers: z
      .array(
        z
          .object({
            firstName: nameSchema,
            lastName: nameSchema,
            isLead: z.boolean().default(false),
            ageBand: z.enum(["adult", "child-2-12", "infant-under-2"]),
          })
          .strict(),
      )
      .min(1, { message: "At least one guest is required." })
      .max(12, { message: "Please contact reception for larger parties." }),
    /** Accessibility flags — feed the housekeeping pre-stay brief. */
    accessibility: z
      .object({
        stepFreeRequired: z.boolean().default(false),
        groundFloorBedroom: z.boolean().default(false),
        wetroomRequired: z.boolean().default(false),
        hearingLoop: z.boolean().default(false),
        largePrintInfo: z.boolean().default(false),
        notes: z.string().trim().max(500).optional(),
      })
      .strict()
      .optional(),
    dietary: dietaryRestrictionsSchema.optional(),
    pets: z.array(petProfileSchema).max(4).default([]),
    specialOccasion: z
      .enum(["birthday", "anniversary", "honeymoon", "babymoon", "other", "none"])
      .default("none"),
    occasionNotes: z.string().trim().max(280).optional(),
    /** ANPR — primary plate; optional second plate for two-car arrivals. */
    vehicleRegistration: ukVrmSchema,
    secondVehicleRegistration: ukVrmSchema.optional(),
    /** Pre-stay marketing opt-in for the in-stay welcome WhatsApp. */
    optInWelcomeMessage: z.boolean().default(false),
  })
  .strict();

/* ============================================================================
 *  SECTION 4 — Spa forms
 *  Routes: /api/spa/search, /api/spa/book, /api/spa/intake,
 *          /api/spa/membership/*, /api/spa/voucher
 * ============================================================================
 */

/** Spa treatment slug shape — matches the published menu in spa-treatments.md. */
export const spaTreatmentSlugSchema = slugSchema;

/** Treatment duration in minutes — the published menu uses these only. */
export const spaDurationEnum = z.union([
  z.literal(25),
  z.literal(30),
  z.literal(45),
  z.literal(50),
  z.literal(60),
  z.literal(75),
  z.literal(90),
  z.literal(120),
  z.literal(150),
  z.literal(180),
  z.literal(240),
]);

/**
 * Spa availability search. Therapist preference is captured per Equality Act
 * (some guests have legitimate gender-of-therapist preferences — particularly
 * common on intimate / post-natal treatments).
 */
export const spaSearchSchema = z
  .object({
    treatmentSlug: spaTreatmentSlugSchema.optional(),
    date: dateSchema,
    /** Optional flex window — search up to N days either side. */
    flexDays: z.number().int().min(0).max(14).default(0),
    durationMin: spaDurationEnum.optional(),
    therapistPreference: z
      .enum(["no-preference", "female", "male", "specific"])
      .default("no-preference"),
    therapistId: ulidSchema.optional(),
    /** Couple-treatment search returns side-by-side slots. */
    couple: z.boolean().default(false),
  })
  .strict()
  .refine(
    (v) => v.therapistPreference !== "specific" || !!v.therapistId,
    {
      message: "Please choose a therapist.",
      path: ["therapistId"],
    },
  );

/**
 * Spa booking creation — written against the Try.be booking partner API
 * (per reference_external_systems.md). Validation here is the client-side
 * shape; server bridges to Try.be.
 */
export const spaBookingCreateSchema = z
  .object({
    treatmentSlug: spaTreatmentSlugSchema,
    slotId: ulidSchema,
    therapistId: ulidSchema.optional(),
    durationMin: spaDurationEnum,
    /** Lead guest is the booker; companion is the second seat on a couple. */
    leadGuest: leadGuestSchema,
    companionGuest: leadGuestSchema.partial().optional(),
    /** Optional pre-paid voucher applied at checkout. */
    voucherCode: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z0-9\-]{8,32}$/, { message: "Voucher code is not valid." })
      .optional(),
    /** Attach to an active accommodation booking for in-stay billing. */
    accommodationBookingId: ulidSchema.optional(),
    /** Member ID — applies 15% member discount per spa-treatments.md. */
    memberId: ulidSchema.optional(),
    acceptTerms: termsAcceptedSchema,
    /** Guests under 13 are not admitted (adults-only spa). */
    confirmAdultsOnly: z.literal(true, {
      errorMap: () => ({
        message: "Please confirm all guests are 13 or over.",
      }),
    }),
  })
  .strict();

/**
 * Spa health intake — Article 9 special category data.
 * Must be handled with explicit consent, encrypted at rest, and segregated
 * from the main booking record. This schema captures the shape only — the
 * handler must wrap each write in an explicit consent receipt.
 */
export const spaIntakeFormSchema = z
  .object({
    bookingId: ulidSchema,
    /** Explicit consent to process health data — required. */
    article9Consent: z.literal(true, {
      errorMap: () => ({
        message:
          "Please confirm you consent to us processing this health information for your safety during treatment.",
      }),
    }),
    pregnancyStatus: z.enum([
      "not-applicable",
      "not-pregnant",
      "first-trimester",
      "second-trimester",
      "third-trimester",
      "post-partum-under-6w",
      "prefer-not-to-say",
    ]),
    medicalConditions: z
      .object({
        cardiovascular: z.boolean().default(false),
        highBloodPressure: z.boolean().default(false),
        lowBloodPressure: z.boolean().default(false),
        diabetes: z.boolean().default(false),
        epilepsy: z.boolean().default(false),
        cancerActive: z.boolean().default(false),
        cancerInRemission: z.boolean().default(false),
        recentSurgery: z.boolean().default(false),
        thrombosisHistory: z.boolean().default(false),
        skinCondition: z.boolean().default(false),
        backInjury: z.boolean().default(false),
        otherConditions: z
          .string()
          .trim()
          .max(500, { message: "Please keep notes under 500 characters." })
          .optional(),
      })
      .strict(),
    medications: z
      .string()
      .trim()
      .max(500, { message: "Please keep notes under 500 characters." })
      .optional(),
    allergies: z
      .object({
        nuts: z.boolean().default(false),
        latex: z.boolean().default(false),
        fragrance: z.boolean().default(false),
        essentialOils: z.boolean().default(false),
        plantBased: z.boolean().default(false),
        other: z
          .string()
          .trim()
          .max(300)
          .optional(),
      })
      .strict(),
    pressurePreference: z.enum(["light", "medium", "firm", "deep", "no-preference"]),
    therapistGenderPreference: z.enum(["female", "male", "no-preference"]),
    contraindicationsAcknowledged: z.literal(true, {
      errorMap: () => ({
        message:
          "Please confirm you have read the contraindications for your booked treatment.",
      }),
    }),
    /** Signature data URI — present if the spa requires a wet signature. */
    signature: z
      .string()
      .startsWith("data:image/", { message: "Signature image is invalid." })
      .max(150_000, { message: "Signature image is too large." })
      .optional(),
    signedOn: dateTimeSchema.optional(),
  })
  .strict();

/** Membership tier enum — keeps the cancellation/freeze logic honest. */
export const membershipTierEnum = z.enum([
  "w-club-essential",
  "w-club-classic",
  "w-club-signature",
  "w-club-patron",
]);

/** Billing interval — monthly DD or annual upfront. */
export const billingIntervalEnum = z.enum(["monthly", "annual"]);

/**
 * Membership sign-up. We collect BACS data shape here (sort code + account)
 * but the actual DD mandate is created via the Stripe BACS / GoCardless
 * handler — we never persist raw bank data ourselves.
 */
export const membershipSignupSchema = z
  .object({
    tier: membershipTierEnum,
    billingInterval: billingIntervalEnum,
    leadGuest: leadGuestSchema,
    /** Direct Debit mandate details (UK BACS). */
    directDebit: z
      .object({
        accountHolderName: nameSchema,
        sortCode: z
          .string()
          .trim()
          .regex(/^\d{2}-?\d{2}-?\d{2}$/, {
            message: "Sort code must be 6 digits (e.g. 11-22-33).",
          })
          .transform((v) => v.replace(/\D/g, "")),
        accountNumber: z
          .string()
          .trim()
          .regex(/^\d{8}$/, { message: "Account number must be 8 digits." }),
        /** Service User Number echoed back from the handler. */
        sun: z.string().trim().max(10).optional(),
      })
      .strict()
      .optional(),
    /** Stripe payment method ID — alternative to BACS for annual billing. */
    stripePaymentMethodId: z
      .string()
      .trim()
      .startsWith("pm_", { message: "Invalid payment method." })
      .max(100)
      .optional(),
    /** Joining fee acknowledgement (per loyalty spec §2). */
    acceptJoiningFee: termsAcceptedSchema,
    acceptTerms: termsAcceptedSchema,
    marketingConsent: marketingConsentSchema,
  })
  .strict()
  .refine(
    (v) => !!v.directDebit || !!v.stripePaymentMethodId,
    {
      message: "Please choose a payment method.",
      path: ["directDebit"],
    },
  );

/**
 * Membership freeze — max 3 months per rolling year (per loyalty spec).
 * The 3-month cap is checked against history on the server; the schema
 * caps the SINGLE freeze duration here.
 */
export const membershipFreezeSchema = z
  .object({
    membershipId: ulidSchema,
    startDate: dateSchema,
    endDate: dateSchema,
    reason: z
      .enum(["travel", "medical", "personal", "financial", "other"])
      .optional(),
    notes: z.string().trim().max(500).optional(),
  })
  .strict()
  .refine(
    (v) => new Date(v.endDate).getTime() > new Date(v.startDate).getTime(),
    { message: "Freeze end must be after the start date.", path: ["endDate"] },
  )
  .refine(
    (v) => {
      const days =
        (new Date(v.endDate).getTime() - new Date(v.startDate).getTime()) /
        (1000 * 60 * 60 * 24);
      return days <= 92; // ~3 months
    },
    { message: "Freezes cap at 3 months at a time.", path: ["endDate"] },
  )
  .refine(
    (v) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(v.startDate).getTime() >= today.getTime();
    },
    { message: "Freeze cannot start in the past.", path: ["startDate"] },
  );

/**
 * Membership cancellation — 30-day minimum notice (per loyalty spec).
 * Effective date must be at least 30 days from today; server validates
 * against the latest billing anchor.
 */
export const membershipCancellationSchema = z
  .object({
    membershipId: ulidSchema,
    effectiveDate: dateSchema,
    reason: z.enum([
      "no-longer-using",
      "moving-area",
      "cost",
      "service-quality",
      "lifestyle-change",
      "other",
    ]),
    reasonNotes: z.string().trim().max(500).optional(),
    /** Opt-in to win-back voucher offers (PECR consent). */
    acceptWinBackContact: z.boolean().default(false),
  })
  .strict()
  .refine(
    (v) => {
      const minDate = new Date();
      minDate.setHours(0, 0, 0, 0);
      minDate.setDate(minDate.getDate() + 30);
      return new Date(v.effectiveDate).getTime() >= minDate.getTime();
    },
    {
      message: "Please give at least 30 days' notice.",
      path: ["effectiveDate"],
    },
  );

/** Gift voucher denominations — the published tiers + custom range. */
export const giftVoucherDenominationEnum = z.union([
  z.literal(25),
  z.literal(50),
  z.literal(100),
  z.literal(150),
  z.literal(250),
  z.literal(500),
]);

/**
 * Gift voucher purchase. Three delivery modes — email PDF, postal printed
 * card, or self-print at checkout.
 */
export const giftVoucherPurchaseSchema = z
  .object({
    /** Either fixed denomination OR custom amount in pence (£10-£2000). */
    denomination: giftVoucherDenominationEnum.optional(),
    customAmountPence: z
      .number()
      .int()
      .min(1000, { message: "Minimum voucher value is £10." })
      .max(200_000, { message: "Maximum voucher value is £2,000." })
      .optional(),
    /** Voucher product type. */
    voucherType: z.enum([
      "monetary",
      "spa-day",
      "lodge-night",
      "dinner-for-two",
      "tractor-tour-and-lunch",
      "afternoon-tea",
    ]),
    quantity: z.number().int().min(1).max(20).default(1),
    purchaser: z
      .object({
        firstName: nameSchema,
        lastName: nameSchema,
        email: emailSchema,
        phone: ukPhoneOptionalSchema,
      })
      .strict(),
    recipient: z
      .object({
        firstName: nameSchema,
        lastName: nameSchema.optional(),
        email: emailSchema.optional(),
        deliveryAddress: addressSchema.optional(),
      })
      .strict(),
    deliveryMethod: z.enum(["email", "postal-card", "self-print"]),
    /** Optional date to delay delivery (e.g. for birthdays). */
    deliveryDate: dateSchema.optional(),
    /** Personal message — appears on the voucher; max 280 chars. */
    message: z
      .string()
      .trim()
      .max(280, { message: "Message must be 280 characters or fewer." })
      .optional(),
    acceptTerms: termsAcceptedSchema,
  })
  .strict()
  .refine(
    (v) => !!v.denomination || !!v.customAmountPence,
    {
      message: "Please choose a voucher amount.",
      path: ["denomination"],
    },
  )
  .refine(
    (v) => v.deliveryMethod !== "email" || !!v.recipient.email,
    {
      message: "Recipient email is required for email delivery.",
      path: ["recipient", "email"],
    },
  )
  .refine(
    (v) => v.deliveryMethod !== "postal-card" || !!v.recipient.deliveryAddress,
    {
      message: "Recipient address is required for postal delivery.",
      path: ["recipient", "deliveryAddress"],
    },
  );

/* ============================================================================
 *  SECTION 5 — Restaurant + events forms
 *  Routes: /api/restaurant/reserve, /api/restaurant/event,
 *          /api/restaurant/private-dining, /api/restaurant/locals-signup
 * ============================================================================
 */

/** Restaurant service period — gates allowed slot windows. */
export const restaurantServiceEnum = z.enum([
  "breakfast",
  "brunch",
  "lunch",
  "afternoon-tea",
  "dinner",
  "tasting-menu",
]);

/** Seating preference — terrace allows dogs; main room is dog-free. */
export const restaurantSeatingEnum = z.enum([
  "no-preference",
  "indoor",
  "terrace",
  "bar",
  "chefs-table",
  "fireside",
  "garden",
]);

/**
 * Reservation — covers The Weir + W Club bistro. Dog covers count toward
 * outdoor-only seating logic. Party of 8+ is the private-dining threshold;
 * the server will route those to the enquiry handler.
 */
export const restaurantReservationSchema = z
  .object({
    venue: z.enum(["the-weir", "w-club-bistro"]),
    service: restaurantServiceEnum,
    date: dateSchema,
    /** Slot in HH:mm 24-h format. */
    slotTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: "Slot time must be in HH:mm format.",
      }),
    partySize: z
      .number()
      .int()
      .min(1, { message: "At least one guest is required." })
      .max(20, { message: "Please contact us for parties of more than 20." }),
    childCount: z.number().int().nonnegative().max(10).default(0),
    /** Dogs are welcome on the terrace / bar at The Weir. */
    dogCount: z.number().int().nonnegative().max(2).default(0),
    occasion: z
      .enum([
        "none",
        "birthday",
        "anniversary",
        "engagement",
        "wedding-celebration",
        "business",
        "celebration",
        "other",
      ])
      .default("none"),
    seatingPreference: restaurantSeatingEnum.default("no-preference"),
    dietary: dietaryRestrictionsSchema.optional(),
    specialRequests: z
      .string()
      .trim()
      .max(500, { message: "Notes must be 500 characters or fewer." })
      .optional(),
    leadGuest: leadGuestSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    }),
    /** Card hold — used for no-show penalty on tasting menus. */
    stripePaymentMethodId: z
      .string()
      .trim()
      .startsWith("pm_")
      .max(100)
      .optional(),
    acceptTerms: termsAcceptedSchema,
  })
  .strict()
  .superRefine((v, ctx) => {
    if (v.dogCount > 0 && (v.seatingPreference === "indoor" || v.seatingPreference === "chefs-table")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Dogs are welcome on the terrace or in the bar, not in the main dining room.",
        path: ["seatingPreference"],
      });
    }
    if (v.partySize > 8 && v.service === "dinner") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Dinner parties of 9+ go through Private Dining — please use that form so we can plan properly.",
        path: ["partySize"],
      });
    }
  });

/** Attendee detail — used per-ticket where the event needs names. */
export const eventAttendeeSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    dietary: dietaryRestrictionsSchema.optional(),
    isLead: z.boolean().default(false),
  })
  .strict();

/** Event ticket purchase — supper clubs, tastings, chef nights. */
export const eventTicketPurchaseSchema = z
  .object({
    eventId: ulidSchema,
    quantity: z.number().int().min(1).max(20),
    attendees: z.array(eventAttendeeSchema).max(20),
    leadGuest: leadGuestSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    }),
    promoCode: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z0-9\-]{4,32}$/)
      .optional(),
    /** Member discount applies if memberId present and tier matches. */
    memberId: ulidSchema.optional(),
    accommodationBookingId: ulidSchema.optional(),
    acceptTerms: termsAcceptedSchema,
  })
  .strict()
  .refine((v) => v.attendees.length === v.quantity, {
    message: "Please add details for each ticket.",
    path: ["attendees"],
  });

/**
 * Private dining enquiry — high-touch, hand-finished by the events team.
 * Schema mirrors the brief in restaurant-copy.md.
 */
export const privateDiningEnquirySchema = z
  .object({
    leadGuest: leadGuestSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    }),
    preferredDate: dateSchema,
    /** Alternate date(s) in case the first isn't available. */
    alternateDates: z.array(dateSchema).max(5).default([]),
    partySize: z
      .number()
      .int()
      .min(6, { message: "Private dining starts at 6 covers." })
      .max(60, { message: "For 60+ please contact us by phone." }),
    occasion: z.enum([
      "birthday",
      "anniversary",
      "engagement",
      "wedding",
      "wake",
      "business-dinner",
      "corporate-away-day",
      "celebration",
      "other",
    ]),
    budgetPerPersonPence: z
      .number()
      .int()
      .min(2500, { message: "Minimum budget per person is £25." })
      .max(50_000, { message: "Please contact us for higher per-person budgets." })
      .optional(),
    venuePreference: z.enum([
      "no-preference",
      "the-snug",
      "private-dining-room",
      "chefs-table",
      "marquee-garden",
      "library",
    ]).default("no-preference"),
    dietary: dietaryRestrictionsSchema.optional(),
    requirements: z
      .string()
      .trim()
      .max(2000, { message: "Please keep brief under 2000 characters." })
      .optional(),
    requiresAccommodation: z.boolean().default(false),
    estimatedRoomsNeeded: z.number().int().nonnegative().max(20).optional(),
    marketingConsent: marketingConsentSchema.pick({
      emailMarketing: true,
      restaurantMarketing: true,
    }),
    acceptTerms: termsAcceptedSchema,
  })
  .strict();

/**
 * Lakeside Locals scheme signup — restricted to the Bude region by postcode.
 * Allowed postcode prefixes are checked against an allow-list; the schema
 * just validates the prefix shape so the route can do the look-up.
 */
export const lakesideLocalsSignupSchema = z
  .object({
    leadGuest: leadGuestSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    }),
    address: addressSchema,
    /** Card on file for the £35 annual fee. */
    stripePaymentMethodId: z
      .string()
      .trim()
      .startsWith("pm_")
      .max(100),
    /** Year of membership (auto-renews). */
    membershipYear: z
      .number()
      .int()
      .min(2026)
      .max(2035),
    marketingConsent: marketingConsentSchema.pick({
      emailMarketing: true,
      smsMarketing: true,
      restaurantMarketing: true,
    }),
    acceptTerms: termsAcceptedSchema,
    /** Confirms the address is the applicant's primary residence. */
    confirmPrimaryResidence: z.literal(true, {
      errorMap: () => ({
        message: "Please confirm this address is your main home.",
      }),
    }),
  })
  .strict()
  .superRefine((v, ctx) => {
    // Bude / North-Cornwall postcode prefixes only. The full list is
    // maintained server-side; this is a shape-level safety net.
    const eligiblePrefixes = ["EX22", "EX23", "PL15", "PL34", "PL35"];
    const prefix = v.address.postcode.split(" ")[0];
    if (!eligiblePrefixes.some((p) => prefix.startsWith(p))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Lakeside Locals is for postcodes in the Bude region (EX22, EX23, PL15, PL34, PL35). Please contact us if you think this is wrong.",
        path: ["address", "postcode"],
      });
    }
  });

/* ============================================================================
 *  SECTION 6 — Lodge sales forms
 *  Routes: /api/sales/brochure, /api/sales/viewing,
 *          /api/sales/viewing-feedback, /api/sales/enquiry,
 *          /api/sales/waitlist
 *
 *  COMPLIANCE BANNER — per lodge-sales-module-spec.md:
 *  Lodge sales marketing is NOT "similar" to holiday bookings and CANNOT
 *  rely on PECR soft opt-in. Marketing consent for lodge sales is always
 *  EXPLICIT and SEPARATE. Schema enforces this by requiring an explicit
 *  `lodgeSalesEmail` / `lodgeSalesSms` boolean.
 *
 *  Financial-promotion language (yields, guaranteed returns, ROI) is
 *  TBC pending FCA legal review and is intentionally NOT modelled here.
 * ============================================================================
 */

/** Lodge tier enum — matches the published four product tiers. */
export const lodgeTierEnum = z.enum([
  "trelowen-exclusive",
  "tevi-luxury",
  "gwelva-villa",
  "bespoke",
]);

/**
 * Brochure request — light gating (the "Mike Tuchen pattern").
 * Name + email only is the minimum; tier preference makes the brochure
 * personalised. PECR explicit consent required.
 */
export const brochureRequestSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema.optional(),
    email: emailSchema,
    phone: ukPhoneOptionalSchema,
    postcode: ukPostcodeSchema.optional(),
    tierPreference: lodgeTierEnum.optional(),
    /** EXPLICIT, NOT soft opt-in — see banner above. */
    lodgeSalesEmail: z.literal(true, {
      errorMap: () => ({
        message:
          "We need your consent to email you about lodge ownership. You can unsubscribe at any time.",
      }),
    }),
    /** Optional SMS — separate consent. */
    lodgeSalesSms: z.boolean().default(false),
    /** UTM and referrer captured server-side; client passes referrerSlug. */
    referrerSlug: slugSchema.optional(),
    botField: honeypotSchema,
    captchaToken: captchaTokenSchema.optional(),
  })
  .strict();

/** Viewing slot type. */
export const viewingTypeEnum = z.enum([
  "group-viewing-day",
  "private-viewing",
  "virtual-viewing",
]);

/**
 * Viewing booking — group day, 1:1 private (Graeme), or virtual (Zoom).
 * Accessibility needs are captured so the team can prep — required by the
 * Equality Act 2010 (reasonable adjustments).
 */
export const viewingBookingSchema = z
  .object({
    type: viewingTypeEnum,
    date: dateSchema,
    /** HH:mm slot for private/virtual. */
    slotTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: "Slot time must be in HH:mm format.",
      })
      .optional(),
    partySize: z
      .number()
      .int()
      .min(1, { message: "At least one guest is required." })
      .max(8, { message: "Please contact us for parties of more than 8." }),
    tiersOfInterest: z
      .array(lodgeTierEnum)
      .min(1, { message: "Please pick at least one tier you're interested in." })
      .max(4),
    leadGuest: leadGuestSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
    }),
    accessibility: z
      .object({
        stepFreeAccess: z.boolean().default(false),
        wheelchairUser: z.boolean().default(false),
        hearingLoop: z.boolean().default(false),
        largePrintMaterials: z.boolean().default(false),
        notes: z.string().trim().max(500).optional(),
      })
      .strict()
      .optional(),
    dietary: dietaryRestrictionsSchema.optional(),
    /** Indicative budget bracket — softer than asking the actual figure. */
    budgetBracket: z
      .enum([
        "under-450k",
        "450-550k",
        "550-750k",
        "over-750k",
        "prefer-not-to-say",
      ])
      .optional(),
    timeline: z
      .enum([
        "immediate",
        "next-3-months",
        "this-year",
        "next-12-24-months",
        "exploring",
      ])
      .default("exploring"),
    /** EXPLICIT lodge sales contact consent. */
    lodgeSalesEmail: z.literal(true, {
      errorMap: () => ({
        message: "Please confirm we can email you about your viewing.",
      }),
    }),
    lodgeSalesSms: z.boolean().default(false),
    acceptTerms: termsAcceptedSchema,
    botField: honeypotSchema,
    captchaToken: captchaTokenSchema.optional(),
  })
  .strict()
  .refine(
    (v) => v.type !== "private-viewing" || !!v.slotTime,
    {
      message: "Please choose a time for your private viewing.",
      path: ["slotTime"],
    },
  );

/**
 * Viewing feedback — captured immediately after a viewing for sales
 * qualification. Star rating + qualifying questions.
 */
export const viewingFeedbackSchema = z
  .object({
    viewingId: ulidSchema,
    overallRating: z
      .number()
      .int()
      .min(1, { message: "Please give a rating." })
      .max(5),
    rebeccaRating: z.number().int().min(1).max(5).optional(),
    graemeRating: z.number().int().min(1).max(5).optional(),
    likelyToProceed: z.enum([
      "very-likely",
      "likely",
      "uncertain",
      "unlikely",
      "very-unlikely",
    ]),
    tierMostInterested: lodgeTierEnum.optional(),
    blockers: z
      .array(
        z.enum([
          "price",
          "timing",
          "finance",
          "spouse-partner",
          "location",
          "specification",
          "running-costs",
          "other",
        ]),
      )
      .max(8)
      .default([]),
    notes: z
      .string()
      .trim()
      .max(2000, { message: "Notes must be 2000 characters or fewer." })
      .optional(),
    wantsCallback: z.boolean().default(false),
    preferredCallbackWindow: z
      .enum(["weekday-am", "weekday-pm", "weekend", "anytime"])
      .optional(),
  })
  .strict();

/**
 * Fuller lodge enquiry — used when the prospect skips the brochure and
 * asks for a direct conversation.
 */
export const lodgeEnquirySchema = z
  .object({
    leadGuest: leadGuestSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
    }),
    tiersOfInterest: z.array(lodgeTierEnum).min(1).max(4),
    /** Indicative budget bracket; we don't ask for finance status here. */
    budgetBracket: z.enum([
      "under-450k",
      "450-550k",
      "550-750k",
      "over-750k",
      "prefer-not-to-say",
    ]),
    timeline: z.enum([
      "immediate",
      "next-3-months",
      "this-year",
      "next-12-24-months",
      "exploring",
    ]),
    /** Why they want a lodge — drives the editorial follow-up. */
    usageIntent: z
      .array(
        z.enum([
          "second-home",
          "holiday-rental-investment",
          "family-gathering-base",
          "retirement-pivot",
          "remote-work",
          "creative-studio",
          "dog-friendly-getaway",
        ]),
      )
      .min(1, { message: "Tell us how you'd use it." })
      .max(7),
    preferredModels: z
      .array(slugSchema)
      .max(10)
      .default([]),
    plotPreference: z
      .enum([
        "no-preference",
        "secluded",
        "view-priority",
        "near-spa",
        "near-restaurant",
        "south-facing",
      ])
      .default("no-preference"),
    message: z
      .string()
      .trim()
      .max(2000, { message: "Please keep your message under 2000 characters." })
      .optional(),
    lodgeSalesEmail: z.literal(true, {
      errorMap: () => ({
        message: "Please confirm we can email you about lodge ownership.",
      }),
    }),
    lodgeSalesSms: z.boolean().default(false),
    acceptTerms: termsAcceptedSchema,
    botField: honeypotSchema,
    captchaToken: captchaTokenSchema.optional(),
  })
  .strict();

/** Waitlist join — when no plots in the chosen tier are released. */
export const waitlistJoinSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: ukPhoneOptionalSchema,
    tierPreference: lodgeTierEnum,
    plotPreference: z
      .enum([
        "no-preference",
        "secluded",
        "view-priority",
        "near-spa",
        "near-restaurant",
        "south-facing",
      ])
      .default("no-preference"),
    lodgeSalesEmail: z.literal(true, {
      errorMap: () => ({
        message: "Please confirm we can email you when a plot becomes available.",
      }),
    }),
    lodgeSalesSms: z.boolean().default(false),
    botField: honeypotSchema,
  })
  .strict();

/* ============================================================================
 *  SECTION 7 — Account / guest portal forms
 *  Routes: /api/account/profile, /api/account/addresses,
 *          /api/account/pets, /api/account/special-dates,
 *          /api/account/marketing-preferences
 * ============================================================================
 */

/** Profile update — partial; only sent fields are touched. */
export const profileUpdateSchema = z
  .object({
    firstName: nameSchema.optional(),
    lastName: nameSchema.optional(),
    phone: ukPhoneOptionalSchema,
    /** Preferred language — only languages with full translation. */
    language: z.enum(["en-GB", "en-US", "fr-FR", "de-DE", "nl-NL"]).optional(),
    preferredVenue: z
      .enum(["the-weir", "w-club-bistro", "no-preference"])
      .optional(),
    preferredRoomType: unitCategoryEnum.optional(),
    /** Communication preferences (separate from marketing consent). */
    transactionalChannel: z
      .enum(["email-only", "email-and-sms", "email-and-whatsapp"])
      .optional(),
  })
  .strict()
  .refine((v) => Object.keys(v).length > 0, {
    message: "Please change at least one field.",
  });

/** Address management — add / edit / delete. */
export const addressManagementSchema = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("add"),
      address: addressSchema,
      isPrimary: z.boolean().default(false),
    })
    .strict(),
  z
    .object({
      action: z.literal("update"),
      addressId: ulidSchema,
      address: addressSchema.partial(),
      isPrimary: z.boolean().optional(),
    })
    .strict(),
  z
    .object({
      action: z.literal("delete"),
      addressId: ulidSchema,
    })
    .strict(),
]);

/** Pet profile management — add / edit / delete. */
export const petProfileManagementSchema = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("add"),
      pet: petProfileSchema,
    })
    .strict(),
  z
    .object({
      action: z.literal("update"),
      petId: ulidSchema,
      pet: petProfileSchema.innerType().partial(),
    })
    .strict(),
  z
    .object({
      action: z.literal("delete"),
      petId: ulidSchema,
    })
    .strict(),
]);

/**
 * Special dates (anniversary / birthday / etc.) — powers the anniversary
 * recognition perk on Member+ tiers.
 */
export const specialDateTypeEnum = z.enum([
  "birthday",
  "anniversary",
  "wedding-anniversary",
  "first-visit-anniversary",
  "remembrance",
  "other",
]);

export const specialDatesSchema = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("add"),
      type: specialDateTypeEnum,
      label: z.string().trim().min(1).max(60).optional(),
      /** MM-DD format — year not stored to avoid age inference. */
      monthDay: z
        .string()
        .regex(/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
          message: "Date must be in MM-DD format.",
        }),
      notifyMe: z.boolean().default(true),
    })
    .strict(),
  z
    .object({
      action: z.literal("update"),
      dateId: ulidSchema,
      type: specialDateTypeEnum.optional(),
      label: z.string().trim().min(1).max(60).optional(),
      monthDay: z
        .string()
        .regex(/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
        .optional(),
      notifyMe: z.boolean().optional(),
    })
    .strict(),
  z
    .object({
      action: z.literal("delete"),
      dateId: ulidSchema,
    })
    .strict(),
]);

/**
 * GDPR Article 15 — Subject Access Request.
 * 1-month SLA (with the new DUAA "stop the clock" extension). User picks
 * a delivery preference.
 */
export const gdprExportRequestSchema = z
  .object({
    /** Re-auth password — defence against session hijack. */
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .max(128),
    deliveryMethod: z.enum(["secure-download", "email-attachment"]),
    format: z.enum(["json", "csv", "pdf"]).default("json"),
    /** Categories — empty array means "everything". */
    categories: z
      .array(
        z.enum([
          "profile",
          "bookings",
          "spa",
          "restaurant",
          "marketing-consents",
          "communications",
          "payments",
          "loyalty",
          "feedback",
          "support",
        ]),
      )
      .max(10)
      .default([]),
    confirmIdentity: z.literal(true, {
      errorMap: () => ({
        message: "Please confirm you are the data subject.",
      }),
    }),
  })
  .strict();

/**
 * GDPR Article 17 — Right to erasure. Distinct from account deletion in that
 * erasure removes everything we can lawfully remove (some data we MUST keep:
 * Hotel Records Order 12 months, financial records 6 years).
 */
export const gdprDeletionRequestSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .max(128),
    confirmation: z.literal("ERASE", {
      errorMap: () => ({
        message: "Type ERASE in capitals to confirm.",
      }),
    }),
    reason: z
      .enum([
        "no-longer-necessary",
        "withdraw-consent",
        "object-to-processing",
        "unlawful-processing",
        "legal-obligation",
        "other",
      ])
      .optional(),
    reasonNotes: z.string().trim().max(1000).optional(),
    /** Acknowledge that we retain some data by law. */
    acknowledgeLegalRetention: z.literal(true, {
      errorMap: () => ({
        message:
          "Please confirm you understand we are required to keep some records by law (booking and financial records for 6 years, immigration records for 12 months).",
      }),
    }),
  })
  .strict();

/**
 * Marketing preferences — full per-channel × topic matrix. PECR-compliant.
 */
export const marketingTopicEnum = z.enum([
  "holidays",
  "spa",
  "restaurant",
  "events",
  "estate-shop",
  "lodge-sales",
  "membership",
  "sustainability-news",
]);

export const marketingChannelEnum = z.enum([
  "email",
  "sms",
  "post",
  "whatsapp",
  "in-app-push",
]);

export const marketingPreferencesSchema = z
  .object({
    /** A matrix of {channel}_{topic} booleans. */
    preferences: z
      .array(
        z
          .object({
            channel: marketingChannelEnum,
            topic: marketingTopicEnum,
            enabled: z.boolean(),
          })
          .strict(),
      )
      .max(40),
    /** Global pause — overrides matrix for N days. */
    pauseUntil: dateSchema.optional(),
  })
  .strict();

/* ============================================================================
 *  SECTION 8 — Contact + complaints + accessibility feedback
 *  Routes: /api/contact, /api/contact/complaints, /api/contact/accessibility
 * ============================================================================
 */

/** General contact form — the top of every "Contact" page. */
export const generalContactSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema.optional(),
    email: emailSchema,
    phone: ukPhoneOptionalSchema,
    topic: z.enum([
      "general-enquiry",
      "booking-question",
      "spa-question",
      "restaurant-question",
      "lodge-sales",
      "events-and-weddings",
      "press-and-media",
      "careers",
      "other",
    ]),
    message: z
      .string({ required_error: "Please tell us how we can help." })
      .trim()
      .min(10, { message: "Please write at least 10 characters." })
      .max(5000, { message: "Message must be 5000 characters or fewer." }),
    /** Bookings context — opt-in to provide booking ID. */
    bookingReference: z
      .string()
      .trim()
      .max(40)
      .optional(),
    /** Preferred reply channel. */
    preferredReplyChannel: z
      .enum(["email", "phone", "either"])
      .default("email"),
    marketingConsent: marketingConsentSchema.pick({
      emailMarketing: true,
    }).default({ emailMarketing: false }),
    botField: honeypotSchema,
    captchaToken: captchaTokenSchema.optional(),
  })
  .strict();

/**
 * Formal complaints — DUAA 2025 mandatory from 19 June 2026.
 * Requires a clear audit trail (timestamps + acknowledgement). Schema captures
 * everything the ICO expects in a complaint handling record.
 */
export const complaintsSchema = z
  .object({
    /** Either the booking ID OR a free-form description for non-booking. */
    bookingReference: z
      .string()
      .trim()
      .max(40)
      .optional(),
    leadGuest: leadGuestSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
    }),
    category: z.enum([
      "stay-experience",
      "spa-experience",
      "restaurant-experience",
      "staff-conduct",
      "billing",
      "data-protection",
      "discrimination",
      "accessibility",
      "safety",
      "other",
    ]),
    severity: z.enum(["low", "medium", "high", "critical"]).default("medium"),
    incidentDate: dateSchema,
    incidentLocation: z
      .string()
      .trim()
      .max(100, { message: "Location must be 100 characters or fewer." })
      .optional(),
    description: z
      .string({ required_error: "Please describe what happened." })
      .trim()
      .min(20, { message: "Please give us at least a short description." })
      .max(10_000, { message: "Description must be 10,000 characters or fewer." }),
    /** What the complainant would consider a fair resolution. */
    desiredResolution: z
      .string()
      .trim()
      .max(2000, { message: "Please keep this under 2000 characters." })
      .optional(),
    /** Have they tried to resolve it already? Audit-trail field. */
    previouslyRaised: z.boolean().default(false),
    previouslyRaisedWith: z
      .string()
      .trim()
      .max(200, { message: "Please keep this under 200 characters." })
      .optional(),
    /** Witness / supporting person details. */
    witnesses: z
      .array(
        z
          .object({
            name: nameSchema,
            contact: z.union([emailSchema, ukPhoneSchema]).optional(),
            relationship: z.string().trim().max(60).optional(),
          })
          .strict(),
      )
      .max(10)
      .default([]),
    /** Up to 5 photos (file uploads — handled by /api/uploads). */
    evidenceUploadIds: z.array(uuidSchema).max(5).default([]),
    /** Right to escalate to the ICO acknowledgement. */
    acknowledgeIcoRight: z.literal(true, {
      errorMap: () => ({
        message:
          "Please confirm you understand you can escalate to the ICO if we don't resolve this to your satisfaction.",
      }),
    }),
    /** Permission to contact about the complaint. */
    permissionToContact: termsAcceptedSchema,
    botField: honeypotSchema,
  })
  .strict();

/** Accessibility feedback — keep low-friction so it actually gets used. */
export const accessibilityFeedbackSchema = z
  .object({
    firstName: nameSchema.optional(),
    email: emailSchema.optional(),
    /** Anonymous feedback is allowed — no required fields. */
    pageUrl: z
      .string()
      .trim()
      .startsWith("https://", { message: "URL must start with https://" })
      .max(500)
      .optional(),
    assistiveTechnology: z
      .array(
        z.enum([
          "screen-reader-jaws",
          "screen-reader-nvda",
          "screen-reader-voiceover",
          "screen-reader-talkback",
          "screen-reader-narrator",
          "screen-magnifier",
          "voice-control",
          "switch-control",
          "keyboard-only",
          "eye-tracker",
          "other",
        ]),
      )
      .max(11)
      .default([]),
    issueCategory: z.enum([
      "cannot-complete-task",
      "navigation-difficulty",
      "form-issue",
      "missing-alt-text",
      "colour-contrast",
      "keyboard-trap",
      "focus-management",
      "video-captions",
      "pdf-issue",
      "other",
    ]),
    description: z
      .string()
      .trim()
      .min(10, { message: "Please describe the issue briefly." })
      .max(5000, { message: "Description must be 5000 characters or fewer." }),
    /** Severity from the user's perspective. */
    impact: z.enum(["blocker", "major", "minor", "annoyance"]),
    botField: honeypotSchema,
  })
  .strict();

/* ============================================================================
 *  SECTION 9 — Newsletter
 *  Route: /api/newsletter
 *  PECR: separate consent per channel.
 * ============================================================================
 */

export const newsletterSignupSchema = z
  .object({
    email: emailSchema,
    firstName: nameSchema.optional(),
    smsNumber: ukPhoneOptionalSchema,
    interests: z
      .array(marketingTopicEnum)
      .max(8)
      .default([]),
    /** Email consent — required to subscribe. */
    emailConsent: z.literal(true, {
      errorMap: () => ({
        message:
          "Please confirm you'd like to receive emails. You can unsubscribe at any time.",
      }),
    }),
    /** SMS consent — only meaningful if smsNumber is given. */
    smsConsent: z.boolean().default(false),
    /** Source field for attribution — e.g. footer, exit-intent, blog. */
    source: slugSchema.optional(),
    botField: honeypotSchema,
    captchaToken: captchaTokenSchema.optional(),
  })
  .strict()
  .refine(
    (v) => !v.smsConsent || !!v.smsNumber,
    {
      message: "Please give us a mobile number for SMS updates.",
      path: ["smsNumber"],
    },
  );

/** Unsubscribe — one-click. Token from the link is the only auth. */
export const newsletterUnsubscribeSchema = z
  .object({
    token: z.string().min(20).max(512),
    /** Optional reason capture (free-form). */
    reason: z
      .enum([
        "too-many-emails",
        "not-relevant",
        "never-signed-up",
        "moving-providers",
        "other",
      ])
      .optional(),
    reasonNotes: z.string().trim().max(500).optional(),
  })
  .strict();

/* ============================================================================
 *  SECTION 10 — Lodge Owner Portal
 *  Routes: /api/owner/personal-use, /api/owner/maintenance,
 *          /api/owner/banking
 *
 *  Personal-use is capped at 6 weeks per ownership year (per lodge-sales-spec).
 *  Maintenance tickets feed the operations queue. Banking setup is a
 *  one-time payout config and only available to verified owners.
 * ============================================================================
 */

/**
 * Owner personal-use block — owners reserve their own lodge for self-use.
 * 6-week-per-year cap is enforced server-side against booked history; the
 * schema enforces the single-block max (no block longer than 28 days).
 */
export const ownerPersonalUseBlockSchema = z
  .object({
    lodgeId: ulidSchema,
    startDate: dateSchema,
    endDate: dateSchema,
    /** Owner-side notes for the housekeeping team. */
    notes: z
      .string()
      .trim()
      .max(500, { message: "Notes must be 500 characters or fewer." })
      .optional(),
    /** Which family / friends will be using it (visitor log). */
    visitors: z
      .array(
        z
          .object({
            firstName: nameSchema,
            lastName: nameSchema,
            relationship: z
              .enum([
                "spouse-partner",
                "child",
                "parent",
                "sibling",
                "extended-family",
                "friend",
                "other",
              ])
              .optional(),
          })
          .strict(),
      )
      .max(12)
      .default([]),
    /** Confirms the owner has read the personal-use policy. */
    acknowledgePolicy: z.literal(true, {
      errorMap: () => ({
        message:
          "Please confirm you have read the personal-use policy (6 weeks per year).",
      }),
    }),
  })
  .strict()
  .refine(
    (v) => new Date(v.endDate).getTime() > new Date(v.startDate).getTime(),
    { message: "End date must be after start date.", path: ["endDate"] },
  )
  .refine(
    (v) => {
      const days =
        (new Date(v.endDate).getTime() - new Date(v.startDate).getTime()) /
        (1000 * 60 * 60 * 24);
      return days <= 28;
    },
    {
      message: "Single personal-use block is capped at 28 nights.",
      path: ["endDate"],
    },
  );

/** Maintenance ticket priority — drives SLA. */
export const maintenancePriorityEnum = z.enum([
  "emergency",
  "urgent",
  "normal",
  "low",
]);

/**
 * Maintenance ticket — owner-raised. Photos help triage. Emergency tickets
 * (gas leak, water leak, no power, no heating in cold weather) escalate
 * immediately.
 */
export const ownerMaintenanceTicketSchema = z
  .object({
    lodgeId: ulidSchema,
    priority: maintenancePriorityEnum,
    category: z.enum([
      "plumbing",
      "electrical",
      "heating-cooling",
      "appliance",
      "structural",
      "garden-grounds",
      "hot-tub",
      "internet-wifi",
      "smart-home",
      "cleaning",
      "pest",
      "other",
    ]),
    title: z
      .string()
      .trim()
      .min(5, { message: "Please give a short title." })
      .max(120, { message: "Title must be 120 characters or fewer." }),
    description: z
      .string()
      .trim()
      .min(20, { message: "Please describe the issue (at least 20 characters)." })
      .max(5000, { message: "Description must be 5000 characters or fewer." }),
    /** Photo upload IDs from /api/uploads. */
    photoUploadIds: z.array(uuidSchema).max(10).default([]),
    /** Optional access window — when can the team enter? */
    accessWindow: z
      .object({
        startDate: dateSchema,
        endDate: dateSchema,
        notes: z.string().trim().max(280).optional(),
      })
      .strict()
      .optional(),
    /** Does it need access while owner is present? */
    requiresOwnerPresent: z.boolean().default(false),
    /** Permission for engineers to enter without owner. */
    permitEntryWhenAbsent: z.boolean().default(true),
  })
  .strict()
  .superRefine((v, ctx) => {
    if (v.priority === "emergency" && v.description.length < 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Emergencies need a fuller description so we can dispatch the right trade.",
        path: ["description"],
      });
    }
    if (v.accessWindow && new Date(v.accessWindow.endDate).getTime() <= new Date(v.accessWindow.startDate).getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Access window end must be after start.",
        path: ["accessWindow", "endDate"],
      });
    }
  });

/**
 * Owner banking setup — for rental-income payouts.
 * UK BACS only; sort-code + account-number with HMRC NI/SC support.
 * We never store these in plaintext — handler tokenises immediately.
 */
export const ownerBankingSetupSchema = z
  .object({
    accountHolderName: nameSchema,
    sortCode: z
      .string()
      .trim()
      .regex(/^\d{2}-?\d{2}-?\d{2}$/, {
        message: "Sort code must be 6 digits (e.g. 11-22-33).",
      })
      .transform((v) => v.replace(/\D/g, "")),
    accountNumber: z
      .string()
      .trim()
      .regex(/^\d{8}$/, { message: "Account number must be 8 digits." }),
    /** Reference to display on the owner's statement (optional). */
    payoutReference: z
      .string()
      .trim()
      .max(18, { message: "Reference must be 18 characters or fewer." })
      .regex(/^[A-Za-z0-9 .\-]*$/, {
        message: "Reference can contain letters, numbers, spaces, hyphens and dots only.",
      })
      .optional(),
    /** Acknowledges that the account is the owner's. */
    confirmOwnAccount: z.literal(true, {
      errorMap: () => ({
        message: "Please confirm this account is in your name.",
      }),
    }),
    /** Anti-money-laundering tick. */
    confirmAmlChecks: z.literal(true, {
      errorMap: () => ({
        message: "Please confirm you understand we will run identity checks.",
      }),
    }),
  })
  .strict();

/* ============================================================================
 *  SECTION 11 — Admin / staff (basic — full admin schemas are out of scope)
 *  Route: /api/admin/staff/invite
 * ============================================================================
 */

/** Staff role enum — coarse-grained; fine-grained scopes go on `scopes`. */
export const staffRoleEnum = z.enum([
  "owner",
  "general-manager",
  "front-of-house",
  "housekeeping",
  "maintenance",
  "spa-manager",
  "spa-therapist",
  "restaurant-manager",
  "restaurant-server",
  "chef",
  "sales-rebecca",
  "sales-graeme",
  "marketing",
  "accounts",
  "developer",
]);

/** Staff scope — what areas of the admin they can access. */
export const staffScopeEnum = z.enum([
  "bookings",
  "spa",
  "restaurant",
  "lodge-sales",
  "owner-portal",
  "guests",
  "marketing",
  "billing",
  "reports",
  "settings",
  "audit-log",
]);

export const staffInviteSchema = z
  .object({
    email: emailSchema,
    firstName: nameSchema,
    lastName: nameSchema,
    role: staffRoleEnum,
    scopes: z
      .array(staffScopeEnum)
      .min(1, { message: "Pick at least one scope for this staff member." })
      .max(11),
    /** Optional expiry — for temporary / seasonal staff. */
    expiresAt: dateSchema.optional(),
    /** Forces 2FA enrolment on first sign-in (PCI DSS for CDE access). */
    require2fa: z.boolean().default(true),
    /** Personal note included in the invite email. */
    inviteNote: z
      .string()
      .trim()
      .max(500, { message: "Note must be 500 characters or fewer." })
      .optional(),
  })
  .strict();

/* ============================================================================
 *  SECTION 12 — Cross-cutting search / filter / utility schemas
 *  These ride along with the main forms but are not themselves "forms".
 * ============================================================================
 */

/** Global search input — used by the site-wide search overlay. */
export const globalSearchSchema = z
  .object({
    query: z
      .string()
      .trim()
      .min(2, { message: "Please type at least 2 characters." })
      .max(120, { message: "Search query must be 120 characters or fewer." }),
    scope: z
      .enum(["all", "stay", "spa", "restaurant", "shop", "content"])
      .default("all"),
    page: z.number().int().min(1).default(1),
    perPage: z.number().int().min(1).max(48).default(12),
  })
  .strict();

/** Generic file-upload metadata. The bytes go via multipart; this is the
 *  prepare/finalise step. */
export const fileUploadMetadataSchema = z
  .object({
    filename: z
      .string()
      .trim()
      .min(1)
      .max(255)
      .regex(/^[\w\s.\-()]+\.[A-Za-z0-9]{2,8}$/, {
        message: "Filename contains characters that are not allowed.",
      }),
    /** MIME type — server enforces allow-list per route. */
    mimeType: z
      .string()
      .regex(/^[a-z]+\/[a-z0-9.\-+]+$/i, { message: "Invalid file type." }),
    /** Size in bytes — max 25MB. */
    sizeBytes: z
      .number()
      .int()
      .positive()
      .max(25 * 1024 * 1024, { message: "Files must be 25MB or smaller." }),
    /** What is this upload for? */
    purpose: z.enum([
      "complaint-evidence",
      "maintenance-photo",
      "spa-intake-signature",
      "owner-document",
      "profile-photo",
    ]),
  })
  .strict();

/** Cookie consent submission — captured against the consent receipt log. */
export const cookieConsentSchema = z
  .object({
    /** ISO 8601 capture time. */
    submittedAt: dateTimeSchema,
    /** Each category individually toggled. */
    categories: z
      .object({
        strictlyNecessary: z.literal(true), // always on
        functional: z.boolean(),
        analytics: z.boolean(),
        marketing: z.boolean(),
        personalisation: z.boolean(),
      })
      .strict(),
    /** Version of the consent text the user saw — audit trail. */
    consentTextVersion: z.string().regex(/^\d+\.\d+\.\d+$/, {
      message: "Invalid consent text version.",
    }),
  })
  .strict();

/* ============================================================================
 *  SECTION 13 — TypeScript type exports
 *  One inferred type per schema for app-wide reuse.
 * ============================================================================
 */

/* Primitives */
export type Email = z.infer<typeof emailSchema>;
export type UkPhone = z.infer<typeof ukPhoneSchema>;
export type UkPostcode = z.infer<typeof ukPostcodeSchema>;
export type IsoDate = z.infer<typeof dateSchema>;
export type IsoDateTime = z.infer<typeof dateTimeSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
export type PersonName = z.infer<typeof nameSchema>;
export type CurrencyPence = z.infer<typeof currencyPenceSchema>;
export type Url = z.infer<typeof urlSchema>;
export type Slug = z.infer<typeof slugSchema>;
export type Ulid = z.infer<typeof ulidSchema>;
export type Uuid = z.infer<typeof uuidSchema>;
export type MarketingConsent = z.infer<typeof marketingConsentSchema>;
export type UkAllergen = z.infer<typeof ukAllergenEnum>;
export type DietaryPreference = z.infer<typeof dietaryPreferenceEnum>;
export type DietaryRestrictions = z.infer<typeof dietaryRestrictionsSchema>;
export type PetProfile = z.infer<typeof petProfileSchema>;
export type Address = z.infer<typeof addressSchema>;
export type UkVrm = z.infer<typeof ukVrmSchema>;
export type UnitCategory = z.infer<typeof unitCategoryEnum>;
export type SpaDuration = z.infer<typeof spaDurationEnum>;
export type MembershipTier = z.infer<typeof membershipTierEnum>;
export type BillingInterval = z.infer<typeof billingIntervalEnum>;
export type LodgeTier = z.infer<typeof lodgeTierEnum>;
export type ViewingType = z.infer<typeof viewingTypeEnum>;
export type StaffRole = z.infer<typeof staffRoleEnum>;
export type StaffScope = z.infer<typeof staffScopeEnum>;
export type MarketingTopic = z.infer<typeof marketingTopicEnum>;
export type MarketingChannel = z.infer<typeof marketingChannelEnum>;
export type SpecialDateType = z.infer<typeof specialDateTypeEnum>;
export type MaintenancePriority = z.infer<typeof maintenancePriorityEnum>;
export type RestaurantSeating = z.infer<typeof restaurantSeatingEnum>;
export type RestaurantService = z.infer<typeof restaurantServiceEnum>;

/* Auth */
export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type MagicLinkRequest = z.infer<typeof magicLinkRequestSchema>;
export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;
export type PasswordReset = z.infer<typeof passwordResetSchema>;
export type PasswordChange = z.infer<typeof passwordChangeSchema>;
export type TwoFactorSetup = z.infer<typeof twoFactorSetupSchema>;
export type TwoFactorDisable = z.infer<typeof twoFactorDisableSchema>;
export type AccountDeletion = z.infer<typeof accountDeletionSchema>;

/* Booking */
export type AccommodationSearch = z.infer<typeof accommodationSearchSchema>;
export type AccommodationFilters = z.infer<typeof accommodationFiltersSchema>;
export type BookingAddOn = z.infer<typeof bookingAddOnSchema>;
export type LeadGuest = z.infer<typeof leadGuestSchema>;
export type BookingCreate = z.infer<typeof bookingCreateSchema>;
export type BookingModify = z.infer<typeof bookingModifySchema>;
export type Cancellation = z.infer<typeof cancellationSchema>;
export type PreArrivalForm = z.infer<typeof preArrivalFormSchema>;

/* Spa */
export type SpaSearch = z.infer<typeof spaSearchSchema>;
export type SpaBookingCreate = z.infer<typeof spaBookingCreateSchema>;
export type SpaIntakeForm = z.infer<typeof spaIntakeFormSchema>;
export type MembershipSignup = z.infer<typeof membershipSignupSchema>;
export type MembershipFreeze = z.infer<typeof membershipFreezeSchema>;
export type MembershipCancellation = z.infer<typeof membershipCancellationSchema>;
export type GiftVoucherPurchase = z.infer<typeof giftVoucherPurchaseSchema>;

/* Restaurant */
export type RestaurantReservation = z.infer<typeof restaurantReservationSchema>;
export type EventAttendee = z.infer<typeof eventAttendeeSchema>;
export type EventTicketPurchase = z.infer<typeof eventTicketPurchaseSchema>;
export type PrivateDiningEnquiry = z.infer<typeof privateDiningEnquirySchema>;
export type LakesideLocalsSignup = z.infer<typeof lakesideLocalsSignupSchema>;

/* Lodge sales */
export type BrochureRequest = z.infer<typeof brochureRequestSchema>;
export type ViewingBooking = z.infer<typeof viewingBookingSchema>;
export type ViewingFeedback = z.infer<typeof viewingFeedbackSchema>;
export type LodgeEnquiry = z.infer<typeof lodgeEnquirySchema>;
export type WaitlistJoin = z.infer<typeof waitlistJoinSchema>;

/* Account */
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
export type AddressManagement = z.infer<typeof addressManagementSchema>;
export type PetProfileManagement = z.infer<typeof petProfileManagementSchema>;
export type SpecialDates = z.infer<typeof specialDatesSchema>;
export type GdprExportRequest = z.infer<typeof gdprExportRequestSchema>;
export type GdprDeletionRequest = z.infer<typeof gdprDeletionRequestSchema>;
export type MarketingPreferences = z.infer<typeof marketingPreferencesSchema>;

/* Contact + complaints */
export type GeneralContact = z.infer<typeof generalContactSchema>;
export type Complaints = z.infer<typeof complaintsSchema>;
export type AccessibilityFeedback = z.infer<typeof accessibilityFeedbackSchema>;

/* Newsletter */
export type NewsletterSignup = z.infer<typeof newsletterSignupSchema>;
export type NewsletterUnsubscribe = z.infer<typeof newsletterUnsubscribeSchema>;

/* Owner portal */
export type OwnerPersonalUseBlock = z.infer<typeof ownerPersonalUseBlockSchema>;
export type OwnerMaintenanceTicket = z.infer<typeof ownerMaintenanceTicketSchema>;
export type OwnerBankingSetup = z.infer<typeof ownerBankingSetupSchema>;

/* Admin */
export type StaffInvite = z.infer<typeof staffInviteSchema>;

/* Utility */
export type GlobalSearch = z.infer<typeof globalSearchSchema>;
export type FileUploadMetadata = z.infer<typeof fileUploadMetadataSchema>;
export type CookieConsent = z.infer<typeof cookieConsentSchema>;

/* ============================================================================
 *  SECTION 14 — Schema registry (helps the API hardening layer wire up
 *  the right schema to the right route without hard-coding strings).
 * ============================================================================
 */

export const schemaRegistry = {
  /* Auth */
  "POST /api/auth/sign-up": signUpSchema,
  "POST /api/auth/sign-in": signInSchema,
  "POST /api/auth/magic-link": magicLinkRequestSchema,
  "POST /api/auth/password-reset/request": passwordResetRequestSchema,
  "POST /api/auth/password-reset/confirm": passwordResetSchema,
  "POST /api/auth/password-change": passwordChangeSchema,
  "POST /api/auth/2fa/setup": twoFactorSetupSchema,
  "POST /api/auth/2fa/disable": twoFactorDisableSchema,
  "POST /api/account/delete": accountDeletionSchema,

  /* Booking */
  "POST /api/booking/search": accommodationSearchSchema,
  "POST /api/booking/filters": accommodationFiltersSchema,
  "POST /api/booking/create": bookingCreateSchema,
  "PATCH /api/booking/[id]/modify": bookingModifySchema,
  "POST /api/booking/[id]/cancel": cancellationSchema,
  "POST /api/booking/[id]/pre-arrival": preArrivalFormSchema,

  /* Spa */
  "POST /api/spa/search": spaSearchSchema,
  "POST /api/spa/book": spaBookingCreateSchema,
  "POST /api/spa/intake": spaIntakeFormSchema,
  "POST /api/spa/membership/signup": membershipSignupSchema,
  "POST /api/spa/membership/freeze": membershipFreezeSchema,
  "POST /api/spa/membership/cancel": membershipCancellationSchema,
  "POST /api/spa/voucher": giftVoucherPurchaseSchema,

  /* Restaurant */
  "POST /api/restaurant/reserve": restaurantReservationSchema,
  "POST /api/restaurant/event": eventTicketPurchaseSchema,
  "POST /api/restaurant/private-dining": privateDiningEnquirySchema,
  "POST /api/restaurant/locals-signup": lakesideLocalsSignupSchema,

  /* Lodge sales */
  "POST /api/sales/brochure": brochureRequestSchema,
  "POST /api/sales/viewing": viewingBookingSchema,
  "POST /api/sales/viewing-feedback": viewingFeedbackSchema,
  "POST /api/sales/enquiry": lodgeEnquirySchema,
  "POST /api/sales/waitlist": waitlistJoinSchema,

  /* Account */
  "PATCH /api/account/profile": profileUpdateSchema,
  "POST /api/account/addresses": addressManagementSchema,
  "POST /api/account/pets": petProfileManagementSchema,
  "POST /api/account/special-dates": specialDatesSchema,
  "POST /api/gdpr/export": gdprExportRequestSchema,
  "POST /api/gdpr/erase": gdprDeletionRequestSchema,
  "POST /api/account/marketing-preferences": marketingPreferencesSchema,

  /* Contact + complaints */
  "POST /api/contact": generalContactSchema,
  "POST /api/contact/complaints": complaintsSchema,
  "POST /api/contact/accessibility": accessibilityFeedbackSchema,

  /* Newsletter */
  "POST /api/newsletter/subscribe": newsletterSignupSchema,
  "POST /api/newsletter/unsubscribe": newsletterUnsubscribeSchema,

  /* Owner portal */
  "POST /api/owner/personal-use": ownerPersonalUseBlockSchema,
  "POST /api/owner/maintenance": ownerMaintenanceTicketSchema,
  "POST /api/owner/banking": ownerBankingSetupSchema,

  /* Admin */
  "POST /api/admin/staff/invite": staffInviteSchema,

  /* Utility */
  "POST /api/search": globalSearchSchema,
  "POST /api/uploads/metadata": fileUploadMetadataSchema,
  "POST /api/consent/cookies": cookieConsentSchema,
} as const;

export type SchemaRegistryRoute = keyof typeof schemaRegistry;

/* ============================================================================
 *  END
 * ============================================================================
 */
