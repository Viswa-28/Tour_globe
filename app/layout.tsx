import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";
import { COMPANY, SITE_URL } from "@/lib/site";
import { MotionProvider } from "@/components/MotionProvider";
import { LenisProvider } from "@/components/LenisProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tourglobe — Travel Consultants in Madurai, Tamil Nadu",
    template: "%s | Tourglobe",
  },
  description:
    "Tourglobe is a travel counselling and consultancy firm in Madurai, Tamil Nadu, planning inbound, outbound and domestic journeys worldwide.",
  openGraph: {
    type: "website",
    siteName: "Tourglobe",
    title: "Tourglobe — Travel Consultants in Madurai, Tamil Nadu",
    description:
      "Travel counselling and consultancy in Madurai, Tamil Nadu — journeys planned worldwide, starting from why you travel.",
    url: SITE_URL,
    // TODO(client): supply a real 1200×630 OG image before launch.
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const travelAgencyJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: COMPANY.name,
  url: COMPANY.website,
  email: COMPANY.email,
  telephone: COMPANY.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.locality,
    addressRegion: COMPANY.address.region,
    postalCode: COMPANY.address.postalCode,
    addressCountry: COMPANY.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY.geo.lat,
    longitude: COMPANY.geo.lng,
  },
  sameAs: ["https://www.tourindias.com", "https://www.pathfinders.in"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      {/* Browser extensions (ColorZilla's cz-shortcut-listen, Grammarly,
          password managers) stamp attributes onto <body> before React
          hydrates, which reads as a mismatch. This suppresses the warning for
          <body>'s own attributes only — children still hydrate strictly. */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencyJsonLd) }}
        />
        <LenisProvider>
          <MotionProvider>{children}</MotionProvider>
        </LenisProvider>
        {/* Real-user Core Web Vitals. Only reports on Vercel; inert locally.
            Gives us the LCP number claude.md's <2.5s-on-4G target needs,
            measured on real devices rather than this machine. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
