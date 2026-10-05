import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDuration } from "@/lib/data";
import {
  RAJASTHAN_ITINERARIES,
  TOUR_RAJASTHAN,
  getRajasthanItinerary,
  tourRajasthanWhatsAppUrl,
} from "@/lib/rajasthan-itineraries";
import { COMPANY, SITE_URL } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ItineraryCard } from "@/components/ItineraryCard";
import { EnquirySection } from "@/components/EnquiryForm";

export const dynamic = "error";
export const dynamicParams = false;

type Props = { params: Promise<{ itinerary: string }> };

export function generateStaticParams() {
  return RAJASTHAN_ITINERARIES.map((t) => ({ itinerary: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { itinerary } = await params;
  const t = getRajasthanItinerary(itinerary);
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `${SITE_URL}${TOUR_RAJASTHAN.path}/${t.slug}` },
    openGraph: { title: t.metaTitle, description: t.metaDescription },
  };
}

export default async function ItineraryPage({ params }: Props) {
  const { itinerary } = await params;
  const t = getRajasthanItinerary(itinerary);
  if (!t) notFound();

  const url = `${SITE_URL}${TOUR_RAJASTHAN.path}/${t.slug}`;
  const duration = formatDuration(t.nights, t.days);
  const others = RAJASTHAN_ITINERARIES.filter((x) => x.slug !== t.slug).slice(0, 3);
  const whatsappUrl = tourRajasthanWhatsAppUrl(
    `Hello Tour Rajasthan — I'd like help planning the ${t.days}-day Rajasthan tour (${t.name}).`,
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: `${t.name} — ${duration}`,
      description: t.metaDescription,
      url,
      itinerary: {
        "@type": "ItemList",
        itemListElement: t.route.map((city, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "City", name: city },
        })),
      },
      provider: { "@type": "TravelAgency", name: COMPANY.name, url: COMPANY.website },
    },
    {
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
        { "@type": "ListItem", position: 3, name: t.name, item: url },
      ],
    },
  ];

  return (
    <>
      <Nav />
      <main className="bg-sand-deep">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div data-ground="dark" className="bg-navy pb-14 pt-32 text-on-navy md:pt-36">
          <div className="mx-auto max-w-[1240px] px-5 md:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="eyebrow flex flex-wrap gap-2 text-on-navy-mut">
                <li>
                  <Link href="/" className="text-gold-link underline-offset-4 hover:underline">
                    Tourglobe
                  </Link>
                </li>
                <li aria-hidden="true">·</li>
                <li>
                  <Link
                    href={TOUR_RAJASTHAN.path}
                    className="text-gold-link underline-offset-4 hover:underline"
                  >
                    {TOUR_RAJASTHAN.name}
                  </Link>
                </li>
              </ol>
            </nav>
            <p className="eyebrow mt-8 text-gold">{duration}</p>
            <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-[clamp(40px,5.4vw,76px)] font-semibold leading-[1.0] tracking-[-0.02em]">
              <em className="text-gold">{t.name}</em>
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg text-on-navy-mut">{t.summary}</p>
          </div>
        </div>

        <article className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="h2 text-ink">
                Day by <em className="text-brown">day</em>
              </h2>

              {/* Day numbers stay: unlike the decorative 01–11 the fix list
                  removed, here the order is the content. */}
              <ol className="mt-8 border-t border-[#DCD1C3]">
                {t.itinerary.map((d, i) => (
                  <li
                    key={d.title}
                    className="grid gap-x-6 gap-y-2 border-b border-[#DCD1C3] py-7 sm:grid-cols-[88px_1fr]"
                  >
                    <span className="eyebrow pt-1.5 text-brown">
                      Day {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-snug text-ink">
                        {d.title}
                      </h3>
                      {d.drive && (
                        <p className="mt-1 text-sm font-semibold text-gold-ink">
                          Drive: {d.drive}
                        </p>
                      )}
                      <p className="body-copy mt-3">{d.text}</p>
                      {d.overnight && (
                        <p className="mt-3 text-sm text-ink-body">
                          <span className="font-semibold text-ink">Overnight:</span>{" "}
                          {d.overnight}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <p className="body-copy mt-8 text-sm">
                Every itinerary is a starting point. A counsellor adjusts the
                route, pace and hotels around your dates and who is travelling.
              </p>
            </div>

            <aside className="h-max border border-[#E5DCD0] bg-cream p-8 lg:sticky lg:top-28">
              <h2 className="eyebrow text-gold-ink">At a glance</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Duration</dt>
                  <dd className="text-ink-body">{duration}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Route</dt>
                  <dd className="text-ink-body">{t.route.join(" – ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Tour Rajasthan contact</dt>
                  <dd className="text-ink-body">
                    {TOUR_RAJASTHAN.contact.name},{" "}
                    <a
                      href={`tel:${TOUR_RAJASTHAN.contact.phone.replace(/[^\d+]/g, "")}`}
                      className="text-brown underline-offset-4 hover:underline"
                    >
                      {TOUR_RAJASTHAN.contact.phone}
                    </a>
                    , {TOUR_RAJASTHAN.contact.location}
                  </dd>
                </div>
              </dl>
              <a
                href="#enquire"
                className="mt-8 block rounded-full bg-brown px-6 py-3 text-center font-semibold text-cream transition-colors hover:bg-ink"
              >
                Enquire about this tour
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener"
                className="mt-3 block rounded-full border border-brown px-6 py-3 text-center font-semibold text-brown transition-colors hover:bg-brown hover:text-cream"
              >
                Ask on WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-ink-body">
                No payment needed to get a plan.
              </p>
            </aside>
          </div>

          {others.length > 0 && (
            <section aria-labelledby="more-heading" className="mt-20">
              <h2 id="more-heading" className="h2 text-ink">
                More Rajasthan <em className="text-brown">itineraries</em>
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {others.map((o) => (
                  <li key={o.slug} className="flex">
                    <ItineraryCard tour={o} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <EnquirySection />
      </main>
      <Footer />
      <WhatsAppButton
        href={whatsappUrl}
        label="Chat with Tour Rajasthan on WhatsApp"
      />
    </>
  );
}
