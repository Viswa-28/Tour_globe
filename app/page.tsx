import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Themes } from "@/components/Themes";
import { Services } from "@/components/Services";
import { Commitments } from "@/components/Commitments";
import { CoBrands } from "@/components/CoBrands";
import { EnquirySection } from "@/components/EnquiryForm";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Guarantee this page is statically generated at build time.
export const dynamic = "error";

// Title, description and Open Graph come from the root layout; the
// canonical has to be set here, or the homepage ships without one.
export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Themes />
        <Services />
        <Commitments />
        <CoBrands />
        <EnquirySection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
