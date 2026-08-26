import { NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY } from "@/lib/site";
import {
  EMAIL_RE,
  FIELD_LIMITS,
  MAX_BODY_BYTES,
  validateEnquiry,
  type EnquiryField,
} from "@/lib/enquiry";

/**
 * Enquiry endpoint — the site's only conversion, so losing one is the worst
 * thing this code can do.
 *
 * Two independent sinks:
 *   1. Email via Resend, so a counsellor is notified immediately.
 *   2. A row appended to the client's Google Sheet, so there is a durable,
 *      browsable record they can filter and share. See
 *      docs/enquiry-sheet-setup.md.
 *
 * They are attempted together and the request succeeds if EITHER lands. Only
 * if both fail do we return an error — and in that case the full enquiry is
 * written to the server log so it can still be recovered by hand.
 *
 * The sheet is optional: with SHEETS_WEBHOOK_URL unset, email alone is used
 * and nothing here changes.
 *
 * Spam defence: honeypot field + timing check. No CAPTCHA — it costs
 * conversions. Both reject silently with a 200 so bots learn nothing.
 */

type Enquiry = {
  receivedAt: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  travellers: string;
  planning: string;
  details: string;
  sourcePath: string;
};

/** Nothing here may hang: a stuck sink must not hold the request open. */
function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms),
    ),
  ]);
}

/**
 * Best-effort per-IP rate limit.
 *
 * In-memory, so on serverless it is per-instance rather than global — a
 * distributed flood could still get through. It is still worth having: it
 * stops the common case, a single script hammering the endpoint, at zero
 * cost and with no extra service. Fluid Compute keeps instances warm and
 * shared, which makes it more effective here than on cold-start-per-request
 * platforms.
 *
 * If abuse ever becomes real, swap this for Vercel KV / Upstash so the
 * counter is shared across instances.
 */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 5;
const recentHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;

  // Prune stale keys so the map cannot grow without bound.
  for (const [key, times] of recentHits) {
    const live = times.filter((t) => t > cutoff);
    if (live.length === 0) recentHits.delete(key);
    else recentHits.set(key, live);
  }

  const times = recentHits.get(ip) ?? [];
  if (times.length >= RATE_MAX_PER_WINDOW) return true;
  recentHits.set(ip, [...times, now]);
  return false;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

async function sendEmail(e: Enquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  // The destination inbox is a verified fact, so it needs no configuration.
  // ENQUIRY_TO_EMAIL only exists to redirect enquiries elsewhere.
  const to = process.env.ENQUIRY_TO_EMAIL?.trim() || COMPANY.email;
  // No default: the sender must sit on a domain verified in Resend, and
  // guessing it would fail silently at send time instead of loudly here.
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim();
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  if (!from) throw new Error("ENQUIRY_FROM_EMAIL is not set");

  const dash = (v: string) => v || "—";
  const body = [
    `Name: ${e.name}`,
    `Phone / WhatsApp: ${dash(e.phone)}`,
    `Email: ${dash(e.email)}`,
    `Travelling around: ${dash(e.destination)}`,
    `Number of travellers: ${dash(e.travellers)}`,
    `What they're planning: ${dash(e.planning)}`,
    `Anything specific: ${dash(e.details)}`,
    ``,
    `Enquired from: ${dash(e.sourcePath)}`,
    `Received: ${e.receivedAt}`,
  ].join("\n");

  const { error } = await withTimeout(
    new Resend(apiKey).emails.send({
      from,
      to,
      // Hitting Reply should reach the traveller. When they gave only a phone
      // number — common, since the form deliberately does not require both —
      // fall back to the real shared inbox rather than leaving Reply-To unset:
      // otherwise Reply goes to ENQUIRY_FROM_EMAIL, which is only a sending
      // identity and may not be a mailbox at all, so the reply would bounce.
      replyTo: EMAIL_RE.test(e.email) ? e.email : COMPANY.email,
      subject: `Enquiry from ${e.name} — tourglobe.in`,
      text: body,
    }),
    8000,
    "Resend",
  );
  if (error) throw error;
}

async function appendToSheet(e: Enquiry): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) throw new Error("SHEETS_WEBHOOK_URL not configured");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...e, secret: process.env.SHEETS_WEBHOOK_SECRET }),
    // Apps Script can be slow to wake; cap it so the form never hangs.
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Sheet webhook returned ${res.status}`);

  // Apps Script always answers 200, so the real verdict is in the body.
  const text = await res.text();
  if (!text.includes('"ok":true')) {
    throw new Error(`Sheet webhook rejected the row: ${text.slice(0, 200)}`);
  }
}

/**
 * GET /api/enquiry — configuration health check.
 *
 * When the form fails on a deployment the visitor only sees "Could not send
 * your enquiry", and the real reason sits in the server log. This reports
 * what the running deployment actually has configured so the cause is
 * obvious without digging.
 *
 * Deliberately leaks nothing: the API key is reported as a boolean, never a
 * value. The addresses are already public — info@tourglobe.in is in the
 * footer and the JSON-LD.
 */
export async function GET() {
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim() || null;
  const toOverride = process.env.ENQUIRY_TO_EMAIL?.trim() || null;
  const to = toOverride || COMPANY.email;

  // The sandbox sender only reaches the address that owns the Resend account,
  // so pairing it with any other recipient always fails.
  const sandboxSender = from === "onboarding@resend.dev";
  const problems: string[] = [];
  if (!process.env.RESEND_API_KEY) problems.push("RESEND_API_KEY is not set");
  if (!from) problems.push("ENQUIRY_FROM_EMAIL is not set");
  if (sandboxSender && to === COMPANY.email) {
    problems.push(
      "ENQUIRY_FROM_EMAIL is Resend's sandbox sender, which can only deliver to the address that owns the Resend account. Either set ENQUIRY_TO_EMAIL to that address, or verify tourglobe.in at resend.com/domains and send from a tourglobe.in address.",
    );
  }
  // Resend recommends verifying a subdomain (send.tourglobe.in) rather than
  // the root, so the marketing sender cannot damage the reputation of the
  // mailbox the business actually reads. Accept either.
  const fromDomain = from?.split("@")[1]?.toLowerCase() ?? "";
  const onOwnDomain =
    fromDomain === "tourglobe.in" || fromDomain.endsWith(".tourglobe.in");
  if (from && !sandboxSender && !onOwnDomain) {
    problems.push(
      `ENQUIRY_FROM_EMAIL (${from}) is neither the sandbox sender nor an address on tourglobe.in.`,
    );
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    resendKeyPresent: Boolean(process.env.RESEND_API_KEY),
    from,
    to,
    toIsDefault: !toOverride,
    sheetConfigured: Boolean(process.env.SHEETS_WEBHOOK_URL),
    ready: problems.length === 0,
    problems,
  });
}

export async function POST(req: Request) {
  // 1. Refuse an oversized body before parsing it, so a large payload cannot
  //    be turned into work for this function.
  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  // 2. Rate limit before any parsing or I/O.
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    console.warn(`Enquiry rate limit hit by ${ip}`);
    return NextResponse.json(
      { error: "Too many enquiries from this connection. Please wait a minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      throw new Error("not an object");
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Truncate rather than reject: the caps are far beyond any real enquiry,
  // so anything hitting them is abuse — but truncating means an over-long
  // paste can never cost a genuine enquiry either.
  const field = (k: EnquiryField) => {
    const value = String(body[k] ?? "").trim();
    if (value.length <= FIELD_LIMITS[k]) return value;
    console.warn(`Enquiry field "${k}" truncated from ${value.length} chars`);
    return value.slice(0, FIELD_LIMITS[k]);
  };

  // Honeypot filled or form submitted inhumanly fast → pretend success.
  const elapsedMs = Number(body.elapsedMs ?? 0);
  const honeypot = String(body.company ?? "").trim();
  if (honeypot !== "" || (elapsedMs > 0 && elapsedMs < 3000)) {
    return NextResponse.json({ ok: true });
  }

  const enquiry: Enquiry = {
    receivedAt: new Date().toISOString(),
    name: field("name"),
    phone: field("phone"),
    email: field("email"),
    destination: field("destination"),
    travellers: field("travellers"),
    planning: field("planning"),
    details: field("details"),
    sourcePath: field("sourcePath"),
  };

  // The same rules the browser applied — re-run here, because the browser is
  // not a security boundary and anyone can POST straight to this endpoint.
  // Field-keyed messages go back so the form can show each beside its input.
  const fieldErrors = validateEnquiry(enquiry);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        fields: fieldErrors,
      },
      { status: 400 },
    );
  }

  const sheetConfigured = Boolean(process.env.SHEETS_WEBHOOK_URL);
  const [emailResult, sheetResult] = await Promise.allSettled([
    sendEmail(enquiry),
    sheetConfigured
      ? appendToSheet(enquiry)
      : Promise.reject(new Error("sheet not configured")),
  ]);

  const emailed = emailResult.status === "fulfilled";
  const stored = sheetResult.status === "fulfilled";

  if (!emailed) console.error("Enquiry email failed:", emailResult.reason);
  if (sheetConfigured && !stored) {
    console.error("Enquiry sheet append failed:", sheetResult.reason);
  }

  if (!emailed && !stored) {
    // Local development with nothing configured: print the enquiry to the
    // terminal and treat it as delivered, so the form — validation, success
    // state, the lot — can be exercised without credentials.
    //
    // Deliberately narrow. It requires a non-production build AND that no
    // sink is configured at all, so once a real key is present a genuine
    // delivery failure still surfaces as an error instead of hiding here.
    const nothingConfigured = !process.env.RESEND_API_KEY && !sheetConfigured;
    if (process.env.NODE_ENV !== "production" && nothingConfigured) {
      console.info(
        `\n[dev] No delivery configured (see .env.local). Enquiry captured here instead:\n${JSON.stringify(
          enquiry,
          null,
          2,
        )}\n`,
      );
      return NextResponse.json({ ok: true, emailed: false, stored: false });
    }

    // Last resort: make the enquiry recoverable from the Vercel logs rather
    // than dropping it silently.
    console.error("ENQUIRY LOST — both sinks failed:", JSON.stringify(enquiry));
    return NextResponse.json(
      { error: "Could not send your enquiry." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, emailed, stored });
}
