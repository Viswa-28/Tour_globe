import Image from "next/image";
import { COMPANY, WHATSAPP_URL } from "@/lib/site";

/**
 * Footer, following the export's three-column layout.
 * "Madurai" and "Tamil Nadu" must appear here — strongest SEO signal
 * the site has (claude.md § SEO).
 *
 * The tagline is not repeated as text: the logo artwork already carries
 * "Buenas Memorias".
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-ground="dark" className="bg-navy pb-10 pt-20 text-on-navy">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
          <div>
            <Image
              src="/images/logo-white.png"
              alt="Tourglobe"
              width={720}
              height={242}
              className="h-14 w-auto"
            />
            <p className="mt-5 text-sm text-on-navy-mut">
              Travel counselling and consultancy in Madurai, Tamil Nadu —
              inbound, outbound and domestic journeys, worldwide.
            </p>
            <a
              href={COMPANY.website}
              className="mt-4 inline-block text-gold-link underline-offset-4 hover:underline"
            >
              www.tourglobe.in
            </a>
          </div>

          <div>
            <h2 className="eyebrow text-on-navy-mut">Contact us</h2>
            <ul className="mt-4 space-y-2">
              {COMPANY.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="text-gold-link underline-offset-4 hover:underline"
                  >
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-gold-link underline-offset-4 hover:underline"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-gold-link underline-offset-4 hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-on-navy-mut">
              We are available physically @
            </h2>
            <address className="mt-4 not-italic leading-relaxed text-on-navy-mut">
              {COMPANY.address.street},
              <br />
              {COMPANY.address.locality}, {COMPANY.address.region}, India
              <br />
              PO Code: {COMPANY.address.postalCode}
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-on-navy/15 pt-7 text-xs uppercase tracking-[0.08em] text-on-navy-mut">
          {/* TODO(client): Privacy Policy and Terms must be live and linked
              here before launch. */}
          <p>© {year} Tourglobe · Buenas Memorias</p>
          <p>Madurai · Tamil Nadu · India</p>
        </div>
      </div>
    </footer>
  );
}
