import type { Metadata } from "next";
import Link from "next/link";
import {
  RAJASTHAN_ITINERARIES,
  TOUR_RAJASTHAN,
  tourWhatsAppUrl,
} from "@/lib/rajasthan-itineraries";
import { COMPANY, SITE_URL } from "@/lib/site";
import { pageOpenGraph } from "@/lib/seo";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ItineraryCard } from "@/components/ItineraryCard";
import { Reveal } from "@/components/Reveal";

export const dynamic = "error";

const title = "Tour Rajasthan — Rajasthan Tour Packages";
const description =
  "Rajasthan tour itineraries from 06 to 09 days — Jaipur, Jodhpur, Udaipur, Jaisalmer, Bikaner and Pushkar. Tour Rajasthan, Jaipur, with Tourglobe, Madurai.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}${TOUR_RAJASTHAN.path}` },
  openGraph: pageOpenGraph(TOUR_RAJASTHAN.path, title, description),
};

const whatsappMessage =
  "Hello Tourglobe — I'd like help planning a Rajasthan trip (Tour Rajasthan).";

const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function TourRajasthanPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: TOUR_RAJASTHAN.name,
        item: `${SITE_URL}${TOUR_RAJASTHAN.path}`,
      },
    ],
  };

  return (
    <>
      <Nav />
      <main id="main" className="bg-sand-deep pt-32 md:pt-36">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="mx-auto max-w-[1240px] px-5 pb-24 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-7 border-b border-[#DCD1C3] pb-8">
            <div>
              <nav aria-label="Breadcrumb">
                <ol className="eyebrow flex flex-wrap gap-2 text-brown">
                  <li>
                    <Link href="/" className="underline-offset-4 hover:underline">
                      Tourglobe
                    </Link>
                  </li>
                  <li aria-hidden="true">·</li>
                  <li>Our brands</li>
                </ol>
              </nav>
              <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-[clamp(38px,4.6vw,66px)] font-semibold leading-[1.02] tracking-[-0.02em] text-navy">
                Tour <em className="text-brown">Rajasthan</em>
              </h1>
            </div>
            <p className="text-sm text-ink-body">
              {RAJASTHAN_ITINERARIES.length} itineraries
            </p>
          </div>

          <p className="body-copy mt-8">
            Tour Rajasthan is Tourglobe&apos;s Rajasthan specialization, with
            a channel partner on the ground in Jaipur. Each route below is a starting
            point — a counsellor adjusts the pace, the stops and the hotels to
            suit your trip.
          </p>

          <section aria-labelledby="itineraries-heading" className="mt-14">
            <h2 id="itineraries-heading" className="h2 text-ink">
              Rajasthan tour <em className="text-brown">itineraries</em>
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-8 xl:grid-cols-4">
              {RAJASTHAN_ITINERARIES.map((t, i) => (
                <li key={t.slug} className="flex">
                  <Reveal stagger={i % 4} className="flex w-full [&>a]:w-full">
                    <ItineraryCard
                      tour={t}
                      invert={i === RAJASTHAN_ITINERARIES.length - 1}
                      priority={i < 2}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          {/* No enquiry form in the Tour Rajasthan section (removed
              2026-10-05 at the client's request). All enquiries are routed
              through Tourglobe (client, 2026-10-08): the buttons use
              Tourglobe's numbers. The partner's number is in the footer
              only. */}
          <section
            aria-labelledby="contact-heading"
            className="mt-16 border border-[#E5DCD0] bg-cream p-8 md:p-10"
          >
            <h2 id="contact-heading" className="h2 text-ink">
              Plan your Rajasthan <em className="text-brown">trip</em>
            </h2>
            <p className="body-copy mt-4">
              Talk to a Tourglobe counsellor. No payment needed to get a plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={tourWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener"
                className="rounded-full bg-brown px-7 py-3 font-semibold text-cream transition-colors hover:bg-ink"
              >
                Ask on WhatsApp
              </a>
              {COMPANY.phones.map((phone) => (
                <a
                  key={phone}
                  href={tel(phone)}
                  className="rounded-full border border-brown px-7 py-3 font-semibold text-brown transition-colors hover:bg-brown hover:text-cream"
                >
                  Call {phone}
                </a>
              ))}
            </div>
          </section>

          {/* CC BY-SA requires a visible credit for every photo shown on
              this page. */}
          <section aria-labelledby="credits-heading" className="mt-12">
            <h2 id="credits-heading" className="eyebrow text-brown">
              Photo credits
            </h2>
            <ul className="mt-3 space-y-1 text-xs leading-relaxed text-ink-body">
              {RAJASTHAN_ITINERARIES.map((t) => (
                <li key={t.slug}>
                  {t.name}:{" "}
                  <a
                    href={t.image.source}
                    target="_blank"
                    rel="noopener"
                    className="underline underline-offset-2 hover:text-brown"
                  >
                    {t.image.author}
                  </a>
                  ,{" "}
                  <a
                    href={t.image.licenceUrl}
                    target="_blank"
                    rel="noopener license"
                    className="underline underline-offset-2 hover:text-brown"
                  >
                    {t.image.licence}
                  </a>
                  , via Wikimedia Commons
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton href={tourWhatsAppUrl(whatsappMessage)} />
    </>
  );
}
