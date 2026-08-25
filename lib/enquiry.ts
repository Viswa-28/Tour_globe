/**
 * Shared contract for the enquiry form.
 *
 * Imported by both the client form and the route handler so the two cannot
 * drift apart — a field the browser allows must be a field the server
 * accepts, and vice versa.
 */

/**
 * Maximum accepted length per field, in characters.
 *
 * Generous enough that no real enquiry is affected — the longest realistic
 * name is nowhere near 120 characters — but small enough that the endpoint
 * cannot be used to push megabytes into the inbox or the client's Sheet.
 * The server truncates rather than rejects, so an over-long paste can never
 * cost a genuine enquiry.
 */
export const FIELD_LIMITS = {
  name: 120,
  phone: 40,
  email: 160,
  destination: 200,
  travellers: 40,
  planning: 300,
  details: 4000,
  sourcePath: 300,
} as const;

export type EnquiryField = keyof typeof FIELD_LIMITS;

/** Largest request body accepted, before parsing. */
export const MAX_BODY_BYTES = 32 * 1024;

/**
 * Deliberately permissive: this only needs to catch obvious typos, because
 * an address that looks valid can still bounce and one that looks odd can
 * still be real. Over-strict email regexes reject legitimate addresses, and
 * on this form a rejected address means a lost enquiry.
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A phone number long enough to plausibly be dialled. */
export const MIN_PHONE_DIGITS = 6;

export function hasUsableContact(phone: string, email: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= MIN_PHONE_DIGITS || EMAIL_RE.test(email.trim());
}
