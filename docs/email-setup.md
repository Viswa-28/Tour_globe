# Enquiry email — Resend + Vercel setup

Everything needed to get the enquiry form delivering to `info@tourglobe.in`.

**Two independent jobs.** Verifying the domain in Resend has nothing to do
with attaching the domain to Vercel. They just happen to use the same DNS
panel. You can do Part 1 today while the site still lives at
`tourglobe.vercel.app`.

---

## What already exists

| Fact | Value |
|---|---|
| Enquiry inbox | `info@tourglobe.in`, a live **Zoho** mailbox |
| Existing MX | `mx.zoho.com`, `mx2`, `mx3` |
| Existing SPF | `v=spf1 include:zohomail.com ~all` |
| Site | `tourglobe.vercel.app` (domain not attached yet) |

That existing SPF record matters — see the warning in step 1.4.

---

## Part 1 — Verify tourglobe.in in Resend

### 1.1 Add the domain

Go to **resend.com/domains → Add Domain**. Enter `tourglobe.in` and pick the
region closest to India.

If Resend offers to use a **subdomain** (`send.tourglobe.in`), take it. It
keeps automated form mail separate from the reputation of the mailbox your
staff read, so a spam problem with one can never affect the other.

### 1.2 Copy the records Resend shows you

Resend will display two or three DNS records — normally an `MX`, an SPF
`TXT`, and a DKIM `TXT` at `resend._domainkey`. **Copy exactly what the
screen shows**, not what you expect; the host names and values differ per
account and region.

### 1.3 Add them to your DNS

Open wherever `tourglobe.in`'s DNS is managed — your registrar's control
panel, or Zoho if you use Zoho DNS. Add each record exactly as shown.

Leave your existing Zoho `MX` records alone. Resend's `MX` should be on the
`send.` subdomain, so both coexist.

### 1.4 ⚠️ Do not create a second SPF record

A domain may have **only one** `v=spf1` TXT record. You already have one:

```
v=spf1 include:zohomail.com ~all
```

- If Resend's SPF is on a **subdomain** (`send.tourglobe.in`) — add it as a
  new record. No conflict. This is the normal case.
- If Resend asks for an SPF at the **root** — do **not** add a second one.
  Edit the existing record to merge the includes:

```
v=spf1 include:zohomail.com include:amazonses.com ~all
```

Getting this wrong breaks delivery of your normal Zoho mail, not just the
form.

The DKIM record never conflicts and is always safe to add.

### 1.5 Verify

Back in Resend, click **Verify**. Propagation is usually minutes but can take
a few hours. The domain must read **Verified** before continuing.

---

## Part 2 — Configure Vercel

**Project → Settings → Environment Variables.** Set each for **Production**
and **Preview**.

| Key | Value | Type |
|---|---|---|
| `RESEND_API_KEY` | your `re_…` key | **Secret** |
| `ENQUIRY_FROM_EMAIL` | `enquiry@tourglobe.in` (or `@send.tourglobe.in` if you used the subdomain) | **Config** |
| `NEXT_PUBLIC_SITE_URL` | `https://tourglobe.vercel.app` now; the real domain once attached | **Config** |

**Delete `ENQUIRY_TO_EMAIL`.** The code defaults to `info@tourglobe.in`, so
once the domain is verified the variable is no longer needed.

Two things that catch people out:

- **Type matters.** Choose *Config*, not *Secret*, for anything that is not a
  credential. Secrets are write-only and **cannot be converted to Config
  later** — you would have to delete and recreate.
- **`ENQUIRY_FROM_EMAIL` does not need to be a real mailbox.** It is only the
  sending identity. Replies go to the traveller via `Reply-To`.

### Redeploy

Environment variables apply only to **new** builds. Saving them changes
nothing about the deployment already running.

**Deployments → most recent → ⋯ → Redeploy.**

---

## Part 3 — Confirm it works

### 3.1 Check the configuration

Open in a browser:

```
https://tourglobe.vercel.app/api/enquiry
```

That is a health check, and it reports what the running deployment actually
has. You want:

```json
{ "resendKeyPresent": true,
  "from": "enquiry@tourglobe.in",
  "to": "info@tourglobe.in",
  "ready": true,
  "problems": [] }
```

If `ready` is `false`, `problems` names the cause.

### 3.2 Send a real one

Submit the form on the live site. You should see the success state, and the
enquiry should arrive in `info@tourglobe.in` within seconds. Hit **Reply** —
it should address the traveller, not yourself.

---

## Before the domain is verified

If you want the form working during the DNS wait, Resend's sandbox sender can
be used — but it delivers **only** to the address that owns the Resend
account:

| Key | Value |
|---|---|
| `ENQUIRY_FROM_EMAIL` | `onboarding@resend.dev` |
| `ENQUIRY_TO_EMAIL` | `viswadiago28@gmail.com` |

Remove both once the domain verifies.

---

## Troubleshooting

| Symptom | Cause |
|---|---|
| `The tourglobe.in domain is not verified` | Part 1 incomplete, or DNS not propagated |
| `You can only send testing emails to your own email address` | Using `onboarding@resend.dev` with any recipient other than the account owner |
| Form still fails after setting variables | Not redeployed — variables only apply to new builds |
| Works on production, fails on a preview URL | Variables scoped to Production only |
| `GET /api/enquiry` returns `405` | Deployment predates the health check; push and redeploy |
| Preview URL returns `302` to a login | Vercel Deployment Protection; test on the production URL |
| Zoho mail stops arriving after DNS edits | A second `v=spf1` record was created — see 1.4 |

The real error is always in **Vercel → Deployments → Functions → Logs**; the
route logs the provider's exact message.
