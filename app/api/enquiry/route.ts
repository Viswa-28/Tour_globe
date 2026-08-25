import { NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY } from "@/lib/site";

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

const EMAIL_RE = /\S+@\S+\.\S+/;

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
  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    // Hitting Reply should reach the traveller. When they gave only a phone
    // number — common, since the form deliberately does not require both —
    // fall back to the real shared inbox rather than leaving Reply-To unset:
    // otherwise Reply goes to ENQUIRY_FROM_EMAIL, which is only a sending
    // identity and may not be a mailbox at all, so the reply would bounce.
    replyTo: EMAIL_RE.test(e.email) ? e.email : COMPANY.email,
    subject: `Enquiry from ${e.name} — tourglobe.in`,
    text: [
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
    ].join("\n"),
  });
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

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const field = (k: string) => String(body[k] ?? "").trim();

  // Honeypot filled or form submitted inhumanly fast → pretend success.
  const elapsedMs = Number(body.elapsedMs ?? 0);
  if (field("company") !== "" || (elapsedMs > 0 && elapsedMs < 3000)) {
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

  if (
    enquiry.name.length < 2 ||
    (enquiry.phone.length < 6 && !EMAIL_RE.test(enquiry.email))
  ) {
    return NextResponse.json(
      { error: "Name and a phone number or email are required." },
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
