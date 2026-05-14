/**
 * Shared TypeScript types.
 * Wave 2 will export booking types, guest types, schema types here.
 */

/** ISO 8601 date string (YYYY-MM-DD). */
export type DateString = string & { readonly __brand: "DateString" };

/** ULID — used for all primary keys. */
export type Ulid = string & { readonly __brand: "Ulid" };

/** GBP money in minor units (pence). */
export type PenceAmount = number & { readonly __brand: "PenceAmount" };
