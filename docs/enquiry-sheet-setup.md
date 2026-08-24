# Enquiries → Google Sheet

Every enquiry is delivered twice: emailed to the counsellors, and appended as
a row to a Google Sheet the client can open, filter and share. The two are
independent — if one fails the other still records the enquiry, and only if
**both** fail does the visitor see an error.

The sheet is optional. With `SHEETS_WEBHOOK_URL` unset, the form emails as
normal and nothing breaks.

## Why Apps Script rather than the Sheets API

A Google Cloud service account would also work, but it means creating a GCP
project, downloading a JSON key, and pasting a multi-line private key into an
environment variable. Apps Script needs no credentials at all — the script
runs as the sheet's owner, so the only secret is the webhook URL. It is also
owned by the client outright: if we disappear, they still control it.

---

## Setup — about ten minutes, done by the client

### 1. Create the sheet

Make a new Google Sheet named something like **Tourglobe Enquiries**. Leave it
empty; the script creates the tab and headers on the first enquiry.

### 2. Add the script

In the sheet: **Extensions → Apps Script**. Delete whatever is there and paste
this in:

```javascript
// Must match SHEETS_WEBHOOK_SECRET in the Vercel environment variables.
const SECRET = 'PASTE_THE_SAME_SECRET_HERE';

const HEADERS = [
  'Received',
  'Name',
  'Phone / WhatsApp',
  'Email',
  'Travelling around',
  'Travellers',
  'What they are planning',
  'Anything specific',
  'Enquired from',
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (!SECRET || body.secret !== SECRET) {
      return reply({ ok: false, error: 'unauthorised' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Enquiries') || ss.insertSheet('Enquiries');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      body.receivedAt ? new Date(body.receivedAt) : new Date(),
      body.name || '',
      body.phone || '',
      body.email || '',
      body.destination || '',
      body.travellers || '',
      body.planning || '',
      body.details || '',
      body.sourcePath || '',
    ]);

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Replace `PASTE_THE_SAME_SECRET_HERE` with a long random string. Generate one
with:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

Keep that value — it goes into Vercel in step 4.

### 3. Deploy it

**Deploy → New deployment → Select type → Web app**, then:

| Field | Value |
|---|---|
| Description | `Tourglobe enquiries` |
| Execute as | **Me** |
| Who has access | **Anyone** |

Click **Deploy** and approve the permission prompt (it is asking to edit this
one sheet).

> "Anyone" means anyone who knows the URL can call it. That is why the script
> checks `SECRET` and rejects anything without it. Treat the URL as a
> credential — do not paste it into a public issue or chat.

Copy the **Web app URL**. It looks like
`https://script.google.com/macros/s/AKfy…/exec`.

### 4. Add the environment variables in Vercel

**Project → Settings → Environment Variables**, for Production *and* Preview:

| Name | Value |
|---|---|
| `SHEETS_WEBHOOK_URL` | the Web app URL from step 3 |
| `SHEETS_WEBHOOK_SECRET` | the same random string as in the script |

Redeploy for them to take effect.

### 5. Test it

Submit a real enquiry on the live site. Within a few seconds you should see
the email arrive *and* a new row in the sheet. The API response says which
sinks succeeded:

```json
{ "ok": true, "emailed": true, "stored": true }
```

If `stored` is `false`, check the Vercel function logs — the reason is logged
there — and confirm the secret matches on both sides.

---

## Changing the script later

Editing the Apps Script is not enough on its own. Use **Deploy → Manage
deployments → Edit (pencil) → Version: New version → Deploy** so the existing
URL keeps working. Creating a *new deployment* issues a different URL and
`SHEETS_WEBHOOK_URL` would need updating too.

## Privacy note

The sheet holds personal data — names, phone numbers, email addresses. Share
it only with staff who need it, and keep it consistent with the retention
period stated in the Privacy Policy, which is still `TODO(client)`.
