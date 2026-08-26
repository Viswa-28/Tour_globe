"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_URL } from "@/lib/site";
import {
  FIELD_LIMITS,
  validateEnquiry,
  type FieldErrors,
} from "@/lib/enquiry";

/** Which input a given error should send focus to, in reading order. */
const FOCUS_ORDER: { key: keyof FieldErrors; input: string }[] = [
  { key: "name", input: "name" },
  { key: "phone", input: "phone" },
  { key: "email", input: "email" },
  { key: "contact", input: "phone" },
  { key: "travellers", input: "travellers" },
  { key: "planning", input: "planning" },
];

/**
 * The only conversion on the site, so it is built to lose nothing.
 *
 * Validation behaviour follows the convention people expect from a good
 * form:
 *   - nothing is flagged while you are still typing in a fresh field;
 *   - a field is checked when you leave it;
 *   - once a field HAS an error, it re-checks on every keystroke, so the
 *     message disappears the moment you fix it rather than nagging until the
 *     next blur;
 *   - submitting checks everything and moves focus to the first problem.
 *
 * The rules themselves live in lib/enquiry.ts and are shared with the route
 * handler, so the browser and the server can never disagree.
 */
export function EnquiryForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "rateLimited"
  >("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  /** Fields the user has finished with — only these may show an error. */
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const readFields = (form: HTMLFormElement) => {
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "");
    return {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      travellers: get("travellers"),
      planning: get("planning"),
    };
  };

  const recheck = (form: HTMLFormElement) => {
    const all = validateEnquiry(readFields(form));
    setErrors(all);
    return all;
  };

  /** Show an error only for fields the user has already left. */
  const visible = (key: keyof FieldErrors): string | undefined => {
    if (!errors[key]) return undefined;
    if (key === "contact") {
      return touched.has("phone") || touched.has("email")
        ? errors.contact
        : undefined;
    }
    return touched.has(key) ? errors[key] : undefined;
  };

  const onBlur = (field: string) => () => {
    setTouched((t) => new Set(t).add(field));
    if (formRef.current) recheck(formRef.current);
  };

  // Only re-check while typing if this field is already showing a problem —
  // otherwise we would flag a half-typed email on the second keystroke.
  const onChange = (field: string) => () => {
    if (!touched.has(field)) return;
    if (formRef.current) recheck(formRef.current);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const all = recheck(form);

    if (Object.keys(all).length > 0) {
      // Everything is now eligible to display, and focus goes to the first
      // problem so its message is announced.
      setTouched(new Set(["name", "phone", "email", "travellers", "planning"]));
      const first = FOCUS_ORDER.find((f) => all[f.key]);
      if (first) {
        form
          .querySelector<HTMLInputElement>(`[name="${first.input}"]`)
          ?.focus();
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
          sourcePath: window.location.pathname + window.location.hash,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 429) {
        setStatus("rateLimited");
        return;
      }
      // The server may have caught something the browser did not.
      const payload = await res.json().catch(() => null);
      if (res.status === 400 && payload?.fields) {
        setErrors(payload.fields as FieldErrors);
        setTouched(
          new Set(["name", "phone", "email", "travellers", "planning"]),
        );
        setStatus("idle");
        return;
      }
      setStatus("error");
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

  /** Everything an input needs to be wired up correctly and accessibly. */
  const field = (name: string, errKey: keyof FieldErrors = name as keyof FieldErrors) => {
    const message = visible(errKey);
    return {
      id: name,
      name,
      className: inputCls,
      maxLength: FIELD_LIMITS[name as keyof typeof FIELD_LIMITS],
      onBlur: onBlur(name),
      onChange: onChange(name),
      "aria-invalid": Boolean(message),
      "aria-describedby": message ? `${name}-error` : undefined,
    };
  };

  const Message = ({
    name,
    errKey,
  }: {
    name: string;
    errKey?: keyof FieldErrors;
  }) => {
    const message = visible(errKey ?? (name as keyof FieldErrors));
    return message ? (
      <p id={`${name}-error`} className={errCls}>
        {message}
      </p>
    ) : null;
  };

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
          <input type="text" required autoComplete="name" {...field("name")} />
          <Message name="name" />
        </div>

        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+91 95000 78189"
            {...field("phone")}
          />
          <Message name="phone" />
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email{" "}
            <span className="font-normal text-ink-body">
              (optional if phone given)
            </span>
          </label>
          <input type="email" autoComplete="email" {...field("email")} />
          <Message name="email" />
          {/* The "give us at least one way to reach you" message belongs
              under the pair, not under either field alone. */}
          {visible("contact") && (
            <p id="phone-error" className={errCls}>
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
            type="text"
            inputMode="numeric"
            placeholder="2"
            {...field("travellers")}
          />
          <Message name="travellers" />
        </div>

        <div>
          <label htmlFor="planning" className={labelCls}>
            What you&apos;re planning <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="A honeymoon, a pilgrimage, a conference…"
            {...field("planning")}
          />
          <Message name="planning" />
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
