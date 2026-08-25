"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_URL } from "@/lib/site";
import { FIELD_LIMITS, hasUsableContact, EMAIL_RE } from "@/lib/enquiry";

type ErrorKey = "name" | "contact" | "planning";
type Errors = Partial<Record<ErrorKey, string>>;

/** The input a given error should send focus to. */
const FOCUS_TARGET: Record<ErrorKey, string> = {
  name: "name",
  contact: "phone",
  planning: "planning",
};

/**
 * The only conversion on the site, so it is built to lose nothing.
 *
 * - Real <label> on every field, never placeholder-only
 * - Phone OR email — never both required
 * - Inline validation on blur, not on keystroke
 * - Errors are linked to their input with aria-describedby, and a failed
 *   submit moves focus to the first one, so the reason is announced rather
 *   than just the fact that something is wrong
 * - Success replaces the form in place and takes focus, so it is announced
 * - Honeypot + timing check; no CAPTCHA (claude.md: it costs conversions)
 * - maxLength mirrors the server's caps in lib/enquiry.ts
 */
export function EnquiryForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "rateLimited"
  >("idle");
  const [errors, setErrors] = useState<Errors>({});
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users are
  // taken to it, rather than left on a button that no longer exists.
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const validate = (form: HTMLFormElement, only?: string): Errors => {
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = { ...errors };

    const check = (key: ErrorKey, ok: boolean, msg: string) => {
      // When validating one field on blur, leave the others alone — except
      // that phone and email jointly decide the single "contact" error.
      const relevant =
        !only ||
        only === key ||
        (key === "contact" && (only === "phone" || only === "email"));
      if (!relevant) return;
      if (ok) delete next[key];
      else next[key] = msg;
    };

    check("name", get("name").length > 1, "Please tell us your name.");
    check(
      "contact",
      hasUsableContact(get("phone"), get("email")),
      get("email") && !EMAIL_RE.test(get("email"))
        ? "That email address doesn't look right — or leave it blank and give us a phone number."
        : "A phone number or an email — whichever you prefer.",
    );
    check(
      "planning",
      get("planning").length > 0,
      "A line about what you're planning helps us reply usefully.",
    );

    setErrors(next);
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const remaining = validate(form);

    if (Object.keys(remaining).length > 0) {
      // Send focus to the first problem so its message is read out.
      const firstKey = (["name", "contact", "planning"] as ErrorKey[]).find(
        (k) => remaining[k],
      );
      if (firstKey) {
        form.querySelector<HTMLInputElement>(
          `[name="${FOCUS_TARGET[firstKey]}"]`,
        )?.focus();
      }
      return;
    }

    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          elapsedMs: Date.now() - startedAt.current,
          // Which page they enquired from — tells a counsellor whether this
          // came off a specific programme or the homepage.
          sourcePath: window.location.pathname + window.location.hash,
        }),
      });
      if (res.ok) setStatus("sent");
      else setStatus(res.status === 429 ? "rateLimited" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-rule bg-cream p-10 text-center"
      >
        <h3 className="font-[family-name:var(--font-fraunces)] text-3xl text-ink">
          Thank you — we have your enquiry.
        </h3>
        <p className="body-copy mx-auto mt-4">
          A counsellor replies within one working day. No payment is needed to
          get a plan.
        </p>
      </div>
    );
  }

  const labelCls = "block text-sm font-semibold text-ink";
  const inputCls =
    "mt-2 w-full rounded-lg border border-rule bg-cream px-4 py-3 text-ink placeholder:text-ink-body/50 aria-[invalid=true]:border-brown";
  const errCls = "mt-1 text-sm text-brown";
  const blur = (field: string) => () => {
    if (formRef.current) validate(formRef.current, field);
  };
  /** Point an input at its error message so the reason gets announced. */
  const describedBy = (key: ErrorKey) => (errors[key] ? `${key}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {/* Honeypot — hidden from real users, tempting to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            className={inputCls}
            onBlur={blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
          />
          {errors.name && (
            <p id="name-error" className={errCls}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            className={inputCls}
            onBlur={blur("phone")}
            aria-invalid={!!errors.contact}
            aria-describedby={describedBy("contact")}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email{" "}
            <span className="font-normal text-ink-body">
              (optional if phone given)
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            className={inputCls}
            onBlur={blur("email")}
            aria-invalid={!!errors.contact}
            aria-describedby={describedBy("contact")}
          />
          {errors.contact && (
            <p id="contact-error" className={errCls}>
              {errors.contact}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="destination" className={labelCls}>
            Travelling around
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            maxLength={FIELD_LIMITS.destination}
            className={inputCls}
            placeholder="A place, a region, or 'not sure yet'"
          />
        </div>

        <div>
          <label htmlFor="travellers" className={labelCls}>
            Number of travellers
          </label>
          <input
            id="travellers"
            name="travellers"
            type="text"
            inputMode="numeric"
            maxLength={FIELD_LIMITS.travellers}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="planning" className={labelCls}>
            What you&apos;re planning <span aria-hidden="true">*</span>
          </label>
          <input
            id="planning"
            name="planning"
            type="text"
            required
            maxLength={FIELD_LIMITS.planning}
            className={inputCls}
            placeholder="A honeymoon, a pilgrimage, a conference…"
            onBlur={blur("planning")}
            aria-invalid={!!errors.planning}
            aria-describedby={describedBy("planning")}
          />
          {errors.planning && (
            <p id="planning-error" className={errCls}>
              {errors.planning}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="details" className={labelCls}>
            Anything specific
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            maxLength={FIELD_LIMITS.details}
            className={inputCls}
          />
        </div>
      </div>

      {/* Announced when it appears, and offers a route that does not depend
          on the thing that just failed. */}
      <div aria-live="polite">
        {status === "error" && (
          <p className="mt-6 text-brown">
            Something went wrong sending your enquiry. Please try again, or
            reach us directly —{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="font-semibold underline underline-offset-4"
            >
              message us on WhatsApp
            </a>
            . The phone numbers are in the footer.
          </p>
        )}
        {status === "rateLimited" && (
          <p className="mt-6 text-brown">
            That&apos;s several enquiries in quick succession. Please wait a
            minute and try again, or{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="font-semibold underline underline-offset-4"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-brown px-8 py-3 font-semibold text-cream transition-colors hover:bg-ink disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-sm text-ink-body">
          No payment needed to get a plan. A counsellor replies within one
          working day.
        </p>
      </div>

      {/* Required by DPDP / GDPR practice: tell people what happens to the
          personal details they are about to hand over, at the point they
          hand them over. */}
      <p className="mt-6 text-sm text-ink-body">
        <span aria-hidden="true">*</span> Required. We use your details only to
        reply to this enquiry — see our{" "}
        <Link href="/privacy" className="text-brown underline underline-offset-4">
          Privacy Policy
        </Link>
        . We never sell your information.
      </p>
    </form>
  );
}

export function EnquirySection() {
  return (
    <section
      id="enquire"
      aria-labelledby="enquire-heading"
      className="bg-sand py-24"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-brown">Start a conversation</p>
          <h2 id="enquire-heading" className="h2 mt-4 text-ink">
            Tell us <em className="text-brown">why</em> you&apos;re travelling
          </h2>
          <p className="body-copy mt-5">
            Share a few details and a counsellor will come back to you with a
            plan — within one working day, no payment needed.
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
