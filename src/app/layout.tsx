import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CookieConsent } from "../components/CookieConsent";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.klampiarfidler.sk'),
  title: "Klampiarstvo Fidler | Profesionálne klampiarske a pokrývačské práce",
  description: "Vykonávame predaj, montáž a servis klampiarskeho materiálu. Špecializujeme sa na drážkovú krytinu a opravy striech po celom Slovensku s vyše 20-ročnými skúsenosťami.",
  keywords: ["klampiarstvo", "strechy", "pozinok", "medené strechy", "titán-zinok", "pokrývačské práce", "Fidler", "Sereď"],
  authors: [{ name: "Klampiarstvo Fidler" }],
  creator: "Klampiarstvo Fidler",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://www.klampiarfidler.sk",
    title: "Klampiarstvo Fidler",
    description: "Profesionálne klampiarske a pokrývačské práce. Predaj, montáž a servis klampiarskeho materiálu.",
    siteName: "Klampiarstvo Fidler",
    images: [{
      url: "/hero.jpg",
      width: 1200,
      height: 630,
      alt: "Klampiarstvo Fidler"
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Klampiarstvo Fidler",
  "image": "https://www.klampiarfidler.sk/hero.jpg",
  "url": "https://www.klampiarfidler.sk",
  "telephone": "+421905869408",
  "email": "jana@klampiarfidler.sk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Čepenská 3081/119",
    "addressLocality": "Sereď",
    "postalCode": "92601",
    "addressCountry": "SK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.2885,
    "longitude": 17.7346
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
    ],
    "opens": "07:00",
    "closes": "17:00"
  },
  "priceRange": "$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
