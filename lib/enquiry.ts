/**
 * Shared contract and validation for the enquiry form.
 *
 * Imported by both the client form and the route handler so the two cannot
 * drift apart — the browser and the server apply exactly the same rules, and
 * the server is the one that actually enforces them.
 *
 * GUIDING PRINCIPLE: this form is the site's only conversion, and the
 * business serves travellers worldwide. A rejected enquiry is a lost
 * customer, so these rules catch things that are *definitely* wrong — an
 * empty field, a phone number of eleven identical digits — and deliberately
 * do NOT try to judge whether a name "looks real". Names, in particular,
 * accept any script: Tamil, Arabic, accented Latin and so on.
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
 * Deliberately permissive. It only needs to catch obvious typos: an address
 * that looks valid can still bounce, and one that looks odd can still be
 * real. Over-strict email regexes reject legitimate addresses, and here that
 * means a lost enquiry.
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** E.164 allows 7–15 digits worldwide. Indian mobiles are 10. */
const PHONE_MIN_DIGITS = 7;
const PHONE_MAX_DIGITS = 15;

const digitsOf = (v: string) => v.replace(/\D/g, "");

/** 1111111111, 0000000, and the like — never a real number. */
function isRepeatedDigits(digits: string): boolean {
  return digits.length > 3 && /^(\d)\1+$/.test(digits);
}

/**
 * 1234567890 or 9876543210 — keypad walks, never a real number.
 *
 * Steps are compared modulo 10 so the 9→0 wrap still counts: without that,
 * plain "1234567890" slips through, because its final step is -9.
 */
function isSequentialDigits(digits: string): boolean {
  if (digits.length < 6) return false;
  let ascending = true;
  let descending = true;
  for (let i = 1; i < digits.length; i++) {
    const a = Number(digits[i - 1]);
    const b = Number(digits[i]);
    if ((b - a + 10) % 10 !== 1) ascending = false;
    if ((a - b + 10) % 10 !== 1) descending = false;
  }
  return ascending || descending;
}

export type FieldErrors = Partial<Record<
  "name" | "phone" | "email" | "travellers" | "planning" | "contact",
  string
>>;

export function validateName(raw: string): string | null {
  const v = raw.trim();
  if (!v) return "Please tell us your name.";
  if (v.length < 2) return "That name looks too short.";
  // At least two letters, in any script — rejects "22", "...", "1234" while
  // accepting names in Tamil, Arabic, Cyrillic and so on.
  if ((v.match(/\p{L}/gu) ?? []).length < 2) {
    return "Please enter your name using letters.";
  }
  return null;
}

/** Only checks the format. Whether a contact was given at all is separate. */
export function validatePhone(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (/[^\d\s+()\-.]/.test(v)) {
    return "Use digits, spaces, and + ( ) - only.";
  }
  const digits = digitsOf(v);
  if (digits.length < PHONE_MIN_DIGITS) return "That number looks too short.";
  if (digits.length > PHONE_MAX_DIGITS) return "That number looks too long.";
  if (isRepeatedDigits(digits) || isSequentialDigits(digits)) {
    return "That doesn't look like a real number.";
  }
  return null;
}

export function validateEmail(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (!EMAIL_RE.test(v)) return "That email address doesn't look right.";
  return null;
}

export function validateTravellers(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (!/^\d{1,3}$/.test(v)) return "Please enter a number.";
  const n = Number(v);
  if (n < 1) return "At least one traveller.";
  if (n > 300) return "For groups this size, please call us instead.";
  return null;
}

export function validatePlanning(raw: string): string | null {
  const v = raw.trim();
  if (!v) return "A line about what you're planning helps us reply usefully.";
  if (v.length < 3) return "A few more words, so we can reply usefully.";
  return null;
}

/** True when at least one usable way to reach the traveller was supplied. */
export function hasUsableContact(phone: string, email: string): boolean {
  const phoneOk = phone.trim() !== "" && validatePhone(phone) === null;
  const emailOk = email.trim() !== "" && validateEmail(email) === null;
  return phoneOk || emailOk;
}

/**
 * The single source of truth. Returns one message per problem field, keyed so
 * the form can render each beside its own input.
 */
export function validateEnquiry(f: {
  name: string;
  phone: string;
  email: string;
  travellers: string;
  planning: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  const name = validateName(f.name);
  if (name) errors.name = name;

  const phone = validatePhone(f.phone);
  if (phone) errors.phone = phone;

  const email = validateEmail(f.email);
  if (email) errors.email = email;

  const travellers = validateTravellers(f.travellers);
  if (travellers) errors.travellers = travellers;

  const planning = validatePlanning(f.planning);
  if (planning) errors.planning = planning;

  // Only complain about a missing contact when neither field has usable
  // content — a badly formatted phone already reports its own error, and
  // saying both would be noise.
  if (!errors.phone && !errors.email && !hasUsableContact(f.phone, f.email)) {
    errors.contact = "A phone number or an email — whichever you prefer.";
  }

  return errors;
}
