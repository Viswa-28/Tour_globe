import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        data-ground="dark"
        className="flex min-h-[70vh] flex-col items-center justify-center bg-navy px-5 text-center text-on-navy"
      >
        <p className="eyebrow text-gold">404</p>
        <h1 className="h2 mt-4">
          This page has <em className="text-gold">wandered off</em>
        </h1>
        <p className="mt-4 max-w-md text-on-navy-mut">
          The page you&apos;re looking for doesn&apos;t exist. The journeys we
          plan are all reachable from the homepage.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-gold px-7 py-3 font-semibold text-navy transition-colors hover:bg-gold-hover"
        >
          Back to the homepage
        </Link>
      </main>
      <Footer />
    </>
  );
}
