# Tourglobe — Project Instructions

Marketing site for **Tourglobe**, a travel counselling and consultancy firm in
Madurai, Tamil Nadu, operating worldwide. Informational — the only conversion
is the enquiry form. Organic search is the only traffic source.

Being ported from a static Claude Design export (`Tourglobe Hero.dc.html`,
`Cultural Tourism.dc.html`) to a production Next.js app.

**Positioning:** counsellors, not a booking engine. The site leads with *why*
someone is travelling, not *where*.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15**, App Router, full SSG | Static HTML is the best SEO substrate. Not `output: 'export'` — that cannot run the enquiry Route Handler. Every page is still prerendered; see next.config.ts |
| Styling | **Tailwind CSS v4** | Tokens as CSS vars, no runtime cost |
| All animation | **Motion** (`motion/react`) in `LazyMotion` | Hero intro, reveals, tab transitions, hovers |
| Smooth scroll | **Lenis** — desktop only | Native momentum is better on touch |
| Content | **Sanity** | 110+ destination records need a real schema |
| Forms | **Resend** via a Route Handler | No third-party form branding |
| Host | **Vercel** | Edge CDN, preview deploys, image optimisation |

```bash
npm run dev
npm run build          # emits ./.next — NOT ./out.
                       # Vercel's Output Directory must be left at the
                       # Next.js default. Setting it to "out" fails the deploy.
npm run lint
npx sanity dev
```

**One animation library.** Motion owns everything. GSAP was removed on
2026-08-22: it was carrying ~50KB for the single hero intro, which Motion
already had to be in the bundle for. If a future section genuinely needs
pinning or scrubbing, reach for CSS `animation-timeline`/`view-timeline`
first, and only reconsider GSAP if that cannot do it.

**Do not add:** jQuery, Bootstrap, AOS, Swiper, or a UI kit. Everything needed
is above.

**About ReactBits:** copy-paste the one or two effects you actually want into
`components/effects/` and delete the rest. Do not install it as a dependency —
it pulls three.js and a large surface you will not use, and this site has a
hard performance budget.

---

## Non-negotiables

1. **Never invent facts about the company.** No founding year, no awards, no
   client names, no statistics, no route or country counts. A previous draft
   shipped "EST. 2006" — invented. Not in Verified Facts below? Write
   `TODO(client)`.
2. **Gold is a dark-ground colour only.** `--gold` on cream measures **2.54:1**
   and fails WCAG AA badly. The export uses it for every eyebrow and every
   `01`–`11` number on light sections. All of those must move to `--brown` or
   `--gold-ink`.
3. **Visible focus ring on every interactive element.** The export has none.
4. **Reduced motion needs a real fallback**, not just disabled animation.
5. **Nav must exist.** The export has only a logo and one button — there is no
   navigation on the page at all.

---

## Design tokens

Lifted from the export, with the two contrast failures corrected.

```css
/* dark grounds */
--navy:        #0F1E2E;   /* hero, dark bands, footer */
--navy-soft:   #243447;   /* raised surfaces on navy */
--gold:        #C8924A;   /* accent on DARK only — 6.16:1 on navy */
--gold-hover:  #D9A25B;
--gold-link:   #E8C9A0;   /* links on navy — 10.67:1 */
--on-navy:     #F8F6F2;
--on-navy-mut: #BFC3C8;   /* 9.52:1 */

/* light grounds */
--cream:       #F8F6F2;   /* cards */
--sand:        #FBF8F4;   /* alternating sections */
--sand-deep:   #F4EFE8;   /* category pages */
--ink:         #1C1C1C;   /* headings on light */
--ink-body:    #3A3A38;   /* body on light — 10.77:1 */
--brown:       #70452F;   /* accent on LIGHT — 7.54:1 */
--gold-ink:    #8A5E1E;   /* gold-ish accent that passes on light — 5.26:1 */
--rule:        #E2D9CE;   /* hairlines — decorative, never text */
```

**Measured contrast** (AA: 4.5:1 normal, 3:1 large):

| Pair | Ratio | |
|---|---|---|
| `--gold` on `--navy` | 6.16 | pass |
| `--gold` on `--cream` | **2.54** | **fail — this is the bug to fix** |
| `--brown` on `--cream` | 7.54 | pass |
| `--gold-ink` on `--cream` | 5.26 | pass |
| `--on-navy-mut` on `--navy` | 9.52 | pass |
| `--ink-body` on `--sand` | 10.77 | pass |
| `--navy` on `--gold` (button) | 6.16 | pass |

One rule: **gold on navy, brown or gold-ink on cream.**

---

## Typography

The export loads **six families** — Montserrat, Poppins, Instrument Serif,
Instrument Sans, Fraunces, Archivo — several at full weight ranges. That is
roughly half a megabyte of fonts. Ship two.

```
Display   Fraunces      weights 300, 500 + italic 500
Body      Archivo       weights 400, 600
```

Load with `next/font/google`, `subsets: ['latin']`, `display: 'swap'`.
**Delete Montserrat, Poppins, Instrument Serif and Instrument Sans.**

Fraunces is chosen because the design depends on a true italic accent —
`<em>` in the second half of every heading, in `--gold` on navy or `--brown`
on cream. Never browser-slanted roman.

Scale, carried over from the export:

- H1 `clamp(52px, 7.2vw, 104px)` / line-height 0.98 / tracking -0.02em
- H2 `clamp(34px, 3.6vw, 52px)` / 1.05 / -0.015em
- Body `clamp(16px, 1.15vw, 18px)` / 1.78, `max-width: 62ch`
- Eyebrow 12px, `letter-spacing: 0.18em`, uppercase

---

## Page structure

| # | Section | Ground | Notes |
|---|---|---|---|
| 1 | Hero | navy + `air 2.png` | Headline, sub, two CTAs, marquee strip |
| 2 | Behind this globe | navy + `tent.png` | Cream card overlaps the image, `margin-top: -9vw` |
| 3 | Aspiration & focus | sand | 11 travel themes + "& much more" |
| 4 | What we handle | navy | 8 services |
| 5 | Paramount importance | sand-deep | 7 commitments |
| 6 | Co-brands | brown | Three sister brands |
| 7 | Footer | navy | Logo, contact, address |

One `<h1>` (hero). Every other section needs an `<h2>` — several are missing
one in the export.

**Category pages:** `/product/[category]` following `Cultural Tourism.dc.html`
— sand-deep ground, cream cards with country eyebrow, place name in Fraunces
italic, region list, nights/days footer.

---

## Fix list — port these deliberately

The export is a design comp, not production code. Do not copy it verbatim.

**Accessibility**
- Gold eyebrows and `01`–`11` numbers on light sections → `--brown`
- Add focus rings site-wide
- Marquee needs a `prefers-reduced-motion` guard *and* a pause control — an
  infinite auto-scrolling strip with no stop is a WCAG 2.2.2 failure
- Category and service tiles are `<div>`s; make them links or buttons
- All CTAs are `href="#"`. Wire them or remove them.

**Content**
- Remove the `01`–`11` and `01`–`08` numbering. The order carries no meaning,
  so numbering is decoration and it clutters the grid.
- Raw client copy is still live: "mavens," "incompatible theory of ours,"
  "even-minded people," "agonizing ourselves towards price determinants,"
  "All smiles to our financiers." Replace with the approved rewrite.
- "even-minded" is a typo for "like-minded"
- "Archeology" → "Archaeology"
- `© 2026` is hardcoded — make it dynamic
- "Astrology & Natural Science" — proposed rename to "Astronomy & Sacred
  Sciences", not yet client-approved

**Performance**
- `air 2.png` is 1.9MB, `tent.png` 2.4MB, both 1536×1024. Convert to AVIF at
  ~120KB. They are 4MB of a 13MB project.
- Logos are 3921px-wide PNGs. Export SVG, or resize to 2× display size.
- Six font families → two

**Structure**
- Fixed `min-height: 780px` on the hero → `min(94vh, 980px)`
- Category grid is `auto-fill minmax(230px,1fr)`; pin the column count per
  breakpoint so 12 items don't produce an orphan row

---

## Animation

**Hero (Motion):** on load, eyebrow fades, headline lines rise out of their
masks in a 70ms stagger, paragraph and CTAs follow. The only load animation
on the site.

**Everywhere else (Motion), four patterns. Do not add a fifth:**

1. Scroll reveal — 24px rise + fade. **CSS only** (`animation-timeline:
   view()` on `[data-reveal]`), never JS. Content must be visible on the
   first painted frame: a JS-gated reveal ships `opacity: 0` and leaves the
   page blank until hydration, which wrecks LCP and strands content if the
   bundle fails.
2. Card hover — `translateY(-4px)`, border to accent
3. Tab / panel change — `AnimatePresence mode="wait"`, crossfade + 8px rise
4. Nav background opacity on scroll

**Marquee:** CSS `translateX` only, `will-change: transform`, duplicated track
for a seamless loop. Pause on hover and focus. Disabled under reduced motion.

**Hard rules:** animate `transform` and `opacity` only — never width, height,
top or `background-size`. Honour `prefers-reduced-motion` in CSS *and* in JS
(`useReducedMotion()`), and make the fallback real: offsets collapse to zero
so nothing travels, but fades still run.

---

## SEO

Search is the only traffic source. Treat this as functional.

- Static export. No client-only content rendering.
- One `<h1>`; every section an `<h2>` containing real search terms. "Quality
  Tourism" ranks for nothing — "Travel Consultants in Madurai" does.
- **"Madurai" and "Tamil Nadu" must appear** in the title tag, the About copy
  and the footer. Strongest signal the site has.
- Per-place URLs: `/product/[category]/[place]`. 110 places is 110 indexable
  pages — the main SEO asset.
- Meta title ≤60 chars, description ≤155, unique per page, from Sanity.
- JSON-LD: `TravelAgency` on the homepage (name, address, geo, phone, sameAs);
  `FAQPage` wherever FAQs exist; `BreadcrumbList` on category pages.
- Real alt text on destination photos; decorative images `alt=""`.
- `sitemap.xml` and `robots.txt` generated at build.
- OG and Twitter tags with a 1200×630 image.

---

## Enquiry form — the only conversion

The export has no form. Every CTA is `href="#"` or `mailto:`. This is the
single biggest functional gap.

**Fields:** Name · Phone/WhatsApp · Email (optional if phone given) ·
Travelling around · Number of travellers · What you're planning · Anything
specific

**Rules**
- Real `<label>` on every field, never placeholder-only
- Do not require both phone and email
- Inline validation on blur, not on keystroke
- Success replaces the form in place; never navigate away
- Honeypot + timing check for spam. No CAPTCHA — it costs conversions.
- POST to a Route Handler; Resend key in an env var, never client-side

**Copy that stays** (each removes a specific reason not to enquire):
- "No payment needed to get a plan."
- "A counsellor replies within one working day."

**WhatsApp click-to-chat** — persistent button plus one in the footer.
`https://wa.me/<number>?text=<prefilled>`. Converts better than email in this
market. The number must be real; a previous build shipped `href="#"`.

---

## Images

1. Source at 2× display size
2. AVIF with WebP fallback via `next/image`
3. Explicit `width` and `height` — prevents layout shift
4. `loading="lazy"` below the fold; hero is `priority`
5. Reject client-supplied files over 2MB or under 1600×900

**Licensing is a legal requirement.** Never use images from Pinterest, Google
Images, or another company's site. Every image records `imageSource` and
`imageLicence` in Sanity. Acceptable: the client's own archive, licensed
stock, Wikimedia Commons (licence checked per file), tourism board media
libraries.

The current hero images are AI-generated. Fine for build and client approval;
replace with real photography before launch.

---

## Breakpoints

```
mobile    < 768px    single column, hamburger nav, no pinning
tablet    768–1023   two columns
desktop   >= 1024    full layout, three columns
```

768 is the nav and pin boundary. Don't introduce others without a reason.

---

## Content model (Sanity)

**`place`** — name, country, region, continent, coordinates, hook (<=12 words),
description (40–60 words), bestSeason, duration ("05 Nights / 06 Days"),
image, metaTitle, metaDescription, category ref, imageSource, imageLicence

**`category`** — name, slug, shortLabel, descriptor, intro (25–35 words),
specialist, credential, bannerImage, order

**`service`** — name, description, image, order

`imageSource` and `imageLicence` are required on every image-bearing type.

---

## Verified facts

Use only these.

- Travel counselling and consultancy firm, Madurai, Tamil Nadu
- Worldwide — inbound, outbound, domestic
- "Over two decades" — **scope unconfirmed** (company or founders' careers?)
- Coordinates 9.9252° N, 78.1198° E
- 7/826, GVN Complex, Theni Main Road, Opp. SVN College,
  Nagamalaipudukottai, Madurai, Tamil Nadu 625 019
- +91 95000 78189 · +91 93334 93333 · info@tourglobe.in · www.tourglobe.in
- Tagline in the export: "Buenas Memorias" — **confirm this is intentional**
- Co-brands: Tourindias.com, Pathfinders.in, Zerospacekreativ
- Services: Tours — Outbound, Incoming, Domestic; MICE; Events; Vehicle
  Rentals; Destination Weddings; Concept Holidays
- 11 themes as listed in Aspiration & Focus, plus "& much more"

**Open with the client:** founding year · "Buenas Memorias" · Brazil /
Indonesia / Fiji (offices or destinations?) · co-brand one-liners ·
certifications (IATA, IATO, TAAI) · Privacy Policy and Terms.

---

## Copy voice

Plain, confident, specific. Short sentences. Never claim a capability,
statistic or response time the client hasn't confirmed.

---

## Before any deploy

- [ ] Tab through the whole page — everything reachable, focus visible
- [ ] Reduced motion on — page usable, marquee stopped
- [ ] Throttled 4G — LCP under 2.5s
- [ ] Real phone, not a browser resize
- [ ] Contrast checked on any new colour pairing
- [ ] No `TODO(client)` strings in shipped copy
- [ ] Form submits; success state renders
- [ ] WhatsApp link opens a real chat
- [ ] No invented facts — cross-check Verified Facts

## Before launch

- [ ] Privacy Policy and Terms live and linked
- [ ] Real photography replacing AI placeholders
- [ ] Every image has a recorded source and licence
- [ ] `sitemap.xml` and `robots.txt` generated
- [ ] Search Console verified, sitemap submitted
- [ ] Analytics firing
- [ ] Enquiry emails confirmed arriving in the client's real inbox
- [ ] Founding year confirmed, or the claim removed