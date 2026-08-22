import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Enquiry endpoint. Resend key lives server-side only (RESEND_API_KEY).
 * Spam defence: honeypot field + timing check — no CAPTCHA, it costs
 * conversions. Both reject silently with a 200 so bots learn nothing.
 */
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

  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  if (name.length < 2 || (phone.length < 6 && !/\S+@\S+\.\S+/.test(email))) {
    return NextResponse.json(
      { error: "Name and a phone number or email are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Enquiry email env vars missing");
    return NextResponse.json(
      { error: "Enquiries are temporarily unavailable." },
      { status: 503 },
    );
  }

  const lines = [
    `Name: ${name}`,
    `Phone / WhatsApp: ${phone || "—"}`,
    `Email: ${email || "—"}`,
    `Travelling around: ${field("destination") || "—"}`,
    `Number of travellers: ${field("travellers") || "—"}`,
    `What they're planning: ${field("planning") || "—"}`,
    `Anything specific: ${field("details") || "—"}`,
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: /\S+@\S+\.\S+/.test(email) ? email : undefined,
      subject: `Enquiry from ${name} — tourglobe.in`,
      text: lines.join("\n"),
    });
    if (error) throw error;
  } catch (err) {
    console.error("Resend send failed", err);
    return NextResponse.json(
      { error: "Could not send your enquiry." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
