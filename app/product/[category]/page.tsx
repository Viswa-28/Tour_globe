import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, getPlacesForCategory } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PlaceCard } from "@/components/PlaceCard";
import { Reveal } from "@/components/Reveal";

export const dynamic = "error";
export const dynamicParams = false;

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const description =
    `${cat.name} tours planned by Tourglobe, travel consultants in Madurai, Tamil Nadu. ${cat.descriptor}.`.slice(
      0,
      155,
    );
  return {
    title: `${cat.name} Tours & Packages`,
    description,
    alternates: { canonical: `${SITE_URL}/product/${cat.slug}` },
    openGraph: { title: `${cat.name} Tours & Packages`, description },
  };
}

/** "Cultural Tourism" → ["Cultural", "Tourism"] so the last word can be set
 *  in Fraunces italic, as the comp does. Single-word names go fully italic. */
function splitHeading(name: string): [string, string] {
  const i = name.lastIndexOf(" ");
  return i === -1 ? ["", name] : [name.slice(0, i), name.slice(i + 1)];
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const places = getPlacesForCategory(cat.slug);
  const [lead, tail] = splitHeading(cat.name);

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
    ],
  };

  return (
    <>
      <Nav />
      <main className="bg-sand-deep pb-28 pt-32 md:pt-36">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-7 border-b border-[#DCD1C3] pb-8">
            <div>
              <nav aria-label="Breadcrumb">
                <ol className="eyebrow flex flex-wrap gap-2 text-brown">
                  <li>
                    <Link
                      href="/"
                      className="underline-offset-4 hover:underline"
                    >
                      Tourglobe
                    </Link>
                  </li>
                  <li aria-hidden="true">·</li>
                  <li>
                    <Link
                      href="/#themes"
                      className="underline-offset-4 hover:underline"
                    >
                      Aspiration &amp; focus
                    </Link>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-[clamp(38px,4.6vw,66px)] font-semibold leading-[1.02] tracking-[-0.02em] text-navy">
                {lead && `${lead} `}
                <em className="text-brown">{tail}</em>
              </h1>
            </div>
            {places.length > 0 && (
              <p className="text-sm text-ink-body">
                {places.length} programmes
              </p>
            )}
          </div>

          <p className="body-copy mt-8">{cat.intro}</p>

          {/* Cards */}
          {places.length === 0 ? (
            <p className="body-copy mt-12 border border-dashed border-[#DCD1C3] p-8">
              Programmes for this theme are being prepared. Tell us where
              you&apos;re dreaming of and a counsellor will plan from there.
            </p>
          ) : (
            <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {places.map((p, i) => (
                <li key={p.slug} className="flex">
                  <Reveal
                    stagger={i % 3}
                    className="flex w-full [&>a]:w-full"
                  >
                    <PlaceCard
                      place={p}
                      invert={i === places.length - 1 && places.length > 2}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}

          {/* Footer CTA */}
          <div className="mt-14 flex flex-wrap items-center gap-5">
            <Link
              href="/#enquire"
              className="rounded-full bg-gold px-8 py-4 font-bold text-navy transition-colors hover:bg-gold-hover"
            >
              Enquire now
            </Link>
            <p className="text-sm text-ink-body">
              No payment needed to get a plan. A counsellor replies within one
              working day.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
