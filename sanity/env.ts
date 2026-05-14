/**
 * Sanity client config — feeds both the embedded Studio (Wave 2 at /studio)
 * and the public read-only client used in server components.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-12-01";
