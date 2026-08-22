import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PLACES, formatDuration, getCategory, getPlace } from "@/lib/data";
import { getPlaceImage } from "@/lib/place-images";
import { SITE_URL } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PlaceCard } from "@/components/PlaceCard";

export const dynamic = "error";
export const dynamicParams = false;

type Props = { params: Promise<{ category: string; place: string }> };

export function generateStaticParams() {
  return PLACES.map((p) => ({ category: p.categorySlug, place: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, place } = await params;
  const p = getPlace(category, place);
  const cat = getCategory(category);
  if (!p || !cat) return {};

  const label = p.country ? `${p.name}, ${p.country}` : p.name;
  const title = `${label} Tour Package`;
  const stops = p.itinerary.length ? ` Covering ${p.itinerary.join(", ")}.` : "";
  const description =
    `${formatDuration(p.nights, p.days)}.${stops} A ${cat.name.toLowerCase()} programme planned by Tourglobe, travel consultants in Madurai.`.slice(
      0,
      155,
    );

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/product/${p.categorySlug}/${p.slug}`,
    },
    openGraph: { title, description },
  };
}

export default async function PlacePage({ params }: Props) {
  const { category, place } = await params;
  const cat = getCategory(category);
  const p = getPlace(category, place);
  if (!cat || !p) notFound();

  const duration = formatDuration(p.nights, p.days);
  const image = getPlaceImage(p);
  const related = PLACES.filter(
    (x) => x.categorySlug === cat.slug && x.slug !== p.slug,
  ).slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: cat.name,
        item: `${SITE_URL}/product/${cat.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.name,
        item: `${SITE_URL}/product/${cat.slug}/${p.slug}`,
      },
    ],
  };

  return (
    <>
      <Nav />
      <main className="bg-sand-deep">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
                    href={`/product/${cat.slug}`}
                    className="text-gold-link underline-offset-4 hover:underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              </ol>
            </nav>
            {p.country && (
              <p className="eyebrow mt-8 text-gold">{p.country}</p>
            )}
            <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-[clamp(44px,6vw,84px)] font-light leading-[1.0] tracking-[-0.02em]">
              <em className="text-gold">{p.name}</em>
            </h1>
            <p className="mt-5 text-lg text-on-navy-mut">{duration}</p>
          </div>
        </div>

        <article className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {image && (
                /* Kept inside the column rather than full-bleed: the source
                   tiles are upscaled and go soft above ~600px wide. */
                <div className="relative mb-12 aspect-[3/2] overflow-hidden bg-sand">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 780px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <h2 className="h2 text-ink">
                Where you&apos;ll <em className="text-brown">go</em>
              </h2>

              {p.itinerary.length > 0 ? (
                <ol className="mt-8 border-t border-[#DCD1C3]">
                  {p.itinerary.map((stop, i) => (
                    <li
                      key={stop}
                      className="flex items-baseline gap-5 border-b border-[#DCD1C3] py-5"
                    >
                      <span
                        aria-hidden="true"
                        className="text-[13px] font-semibold tracking-[0.1em] text-gold-ink"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-[family-name:var(--font-fraunces)] text-2xl text-ink">
                        {stop}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="body-copy mt-6">
                  This programme centres on {p.name}
                  {p.country ? `, ${p.country}` : ""}. A counsellor will build
                  the day-by-day route with you around how long you have and
                  what you want from the trip.
                </p>
              )}

              {/* TODO(client): a written description and licensed photography
                  for each programme. The catalogue supplies destination,
                  stops and duration only, so nothing further is stated. */}
              <p className="body-copy mt-8 text-sm">
                Our programmes are research-based and tailor-made to
                travellers&apos; interests, designed by different
                connoisseurs. The detailed day-by-day plan comes with your
                enquiry.
              </p>
            </div>

            <aside className="h-max border border-[#E5DCD0] bg-cream p-8">
              <h2 className="eyebrow text-gold-ink">At a glance</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Destination</dt>
                  <dd className="text-ink-body">
                    {p.country ? `${p.name}, ${p.country}` : p.name}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Duration</dt>
                  <dd className="text-ink-body">{duration}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Theme</dt>
                  <dd>
                    <Link
                      href={`/product/${cat.slug}`}
                      className="text-brown underline-offset-4 hover:underline"
                    >
                      {cat.name}
                    </Link>
                  </dd>
                </div>
                {p.itinerary.length > 0 && (
                  <div>
                    <dt className="font-semibold text-ink">Stops</dt>
                    <dd className="text-ink-body">{p.itinerary.join(", ")}</dd>
                  </div>
                )}
              </dl>
              <Link
                href="/#enquire"
                className="mt-8 block rounded-full bg-brown px-6 py-3 text-center font-semibold text-cream transition-colors hover:bg-ink"
              >
                Enquire about this trip
              </Link>
              <p className="mt-3 text-center text-xs text-ink-body">
                No payment needed to get a plan.
              </p>
            </aside>
          </div>

          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-20">
              <h2 id="related-heading" className="h2 text-ink">
                More in <em className="text-brown">{cat.name}</em>
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {related.map((r) => (
                  <li key={r.slug} className="flex [&>a]:w-full">
                    <PlaceCard place={r} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
