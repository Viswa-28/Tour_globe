import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/**
 * Section 2 — "Behind this globe", following the export design:
 * full-width tent image with the eyebrow overlaid, and a cream card
 * overlapping the bottom of the image. Copy is the export's, verbatim,
 * per the client's direction (2026-08-22).
 *
 * TODO(client): aboutus.avif is AI-generated — replace with licensed
 * photography before launch, imageSource + imageLicence recorded.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-navy">
      <div className="relative" style={{ minHeight: "52vw" }}>
        <Image
          src="/images/aboutus.avif"
          alt="Safari tent bedroom opening onto a savannah at sunset"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,30,46,0.7), rgba(15,30,46,0))",
          }}
        />
      </div>

      <div className="bg-sand pb-24">
        <Reveal className="mx-auto max-w-6xl px-5 md:px-8">
          <div
            className="relative rounded-sm bg-cream p-8 shadow-sm md:p-16"
            style={{ marginTop: "-18vw" }}
          >
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
              <div className="md:col-span-5">
                <h2 id="about-heading" className="h2 text-ink">
                  Behind
                  <br />
                  this <em className="text-brown">globe</em>
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-8 h-0.5 w-12 bg-gold-ink"
                />
                <p className="mt-8 text-ink-body">
                  <em>Originating from Madurai</em>, we bring together expert
                  tourism consultation, holiday expertise, and professional
                  travel planning&mdash;where unforgettable holiday ideas take
                  shape
                </p>
                <Link
                  href="/#enquire"
                  className="mt-10 inline-block rounded-full bg-navy px-7 py-3 font-semibold text-on-navy transition-colors hover:bg-navy-soft"
                >
                  Speak to a consultant
                </Link>
              </div>

              <div className="body-copy space-y-6 text-lg md:col-span-7">
                <p>
                  Originating from the banks of Vaigai river and the city cited
                  as &ldquo;The Athens of the east&rdquo; &ndash; Madurai.
                </p>
                <p>
                  We are a team of mavens working unanimously towards focused
                  areas of our expertise. Our trendsetting nature, passion, up
                  to minute attitude, sophisticated, elegant and extravagant
                  approach towards our passengers, products, services keep us a
                  &ldquo;standout&rdquo; to our known customer database. We
                  also would like to get this incompatible theory of ours in
                  increasing our database of passengers globally.
                </p>
                <p>
                  We are watchful in our products and services and we keep
                  distilling our actions towards providing unique, memorable
                  and quality products and services rather agonizing ourselves
                  towards price determinants
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
