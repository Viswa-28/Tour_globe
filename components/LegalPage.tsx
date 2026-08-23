import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/**
 * Shared shell for Privacy and Terms. Narrow measure, navy header band so
 * the fixed header keeps a dark ground, then long-form prose.
 */
export function LegalPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="bg-sand-deep">
        <div
          data-ground="dark"
          className="bg-navy pb-14 pt-32 text-on-navy md:pt-36"
        >
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="eyebrow flex flex-wrap gap-2 text-on-navy-mut">
                <li>
                  <Link
                    href="/"
                    className="text-gold-link underline-offset-4 hover:underline"
                  >
                    Tourglobe
                  </Link>
                </li>
                <li aria-hidden="true">·</li>
                <li aria-current="page">{title}</li>
              </ol>
            </nav>
            <h1 className="h2 mt-6">{title}</h1>
            <p className="mt-4 max-w-xl text-on-navy-mut">{lead}</p>
          </div>
        </div>

        <article className="legal-prose mx-auto px-5 py-16 md:px-8">
          {children}
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

/**
 * A gap only the client can fill. Rendered visibly on the page on purpose:
 * claude.md forbids shipping `TODO(client)` in live copy, so an unfinished
 * legal page cannot quietly go public.
 */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-[#F6E2B8] px-1.5 py-0.5 font-semibold text-ink">
      TODO(client): {children}
    </mark>
  );
}
