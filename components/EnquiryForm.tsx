"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

type Errors = Partial<Record<"name" | "contact" | "planning", string>>;

/**
 * The only conversion on the site.
 * - Real <label> on every field
 * - Phone OR email — never both required
 * - Inline validation on blur, not keystroke
 * - Success replaces the form in place
 * - Honeypot + timing check; no CAPTCHA
 */
export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Errors>({});
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (form: HTMLFormElement, field?: string): Errors => {
    const data = new FormData(form);
    const next: Errors = { ...errors };

    const check = (key: keyof Errors, ok: boolean, msg: string) => {
      if (field && field !== key && !(key === "contact" && (field === "phone" || field === "email"))) return;
      if (ok) delete next[key];
      else next[key] = msg;
    };

    check(
      "name",
      String(data.get("name") ?? "").trim().length > 1,
      "Please tell us your name.",
    );
    check(
      "contact",
      String(data.get("phone") ?? "").trim().length > 5 ||
        /\S+@\S+\.\S+/.test(String(data.get("email") ?? "")),
      "A phone number or an email — whichever you prefer.",
    );
    check(
      "planning",
      String(data.get("planning") ?? "").trim().length > 0,
      "A line about what you're planning helps us reply usefully.",
    );

    setErrors(next);
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const remaining = validateField(form);
    if (Object.keys(remaining).length > 0) return;

    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
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
    "mt-2 w-full rounded-lg border border-rule bg-cream px-4 py-3 text-ink placeholder:text-ink-body/50";
  const errCls = "mt-1 text-sm text-brown";
  const blur = (field: string) => () => {
    if (formRef.current) validateField(formRef.current, field);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {/* Honeypot — hidden from real users, tempting to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputCls} onBlur={blur("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} onBlur={blur("phone")} aria-invalid={!!errors.contact} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email{" "}
            <span className="font-normal text-ink-body">
              (optional if phone given)
            </span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputCls} onBlur={blur("email")} aria-invalid={!!errors.contact} />
          {errors.contact && <p className={errCls}>{errors.contact}</p>}
        </div>
        <div>
          <label htmlFor="destination" className={labelCls}>
            Travelling around
          </label>
          <input id="destination" name="destination" type="text" className={inputCls} placeholder="A place, a region, or 'not sure yet'" />
        </div>
        <div>
          <label htmlFor="travellers" className={labelCls}>
            Number of travellers
          </label>
          <input id="travellers" name="travellers" type="text" inputMode="numeric" className={inputCls} />
        </div>
        <div>
          <label htmlFor="planning" className={labelCls}>
            What you&apos;re planning
          </label>
          <input id="planning" name="planning" type="text" className={inputCls} placeholder="A honeymoon, a pilgrimage, a conference…" onBlur={blur("planning")} aria-invalid={!!errors.planning} />
          {errors.planning && <p className={errCls}>{errors.planning}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="details" className={labelCls}>
            Anything specific
          </label>
          <textarea id="details" name="details" rows={4} className={inputCls} />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-brown">
          Something went wrong sending your enquiry. Please try again, or call
          us — the numbers are in the footer.
        </p>
      )}

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
