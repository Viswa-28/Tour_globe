import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Commitments } from "@/components/Commitments";
import { CoBrands } from "@/components/CoBrands";
import { EnquirySection } from "@/components/EnquiryForm";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Guarantee this page is statically generated at build time.
export const dynamic = "error";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
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
