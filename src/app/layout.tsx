import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

// Inter carries both display and body — tight, neutral, institutional.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Monospace for data labels, reference codes, figures and eyebrows.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Contract Leather & Textile Manufacturing`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "contract manufacturing",
    "private label manufacturing",
    "OEM leather goods",
    "textile manufacturing",
    "footwear manufacturing",
    "apparel production",
    "supplier audit",
    "AQL inspection",
    "OEKO-TEX",
    "Leather Working Group",
    "export documentation",
    "incoterms",
  ],
  authors: [{ name: site.name }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Contract Leather & Textile Manufacturing`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Contract Leather & Textile Manufacturing`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1a2b",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-bg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-brand focus:bg-deep focus:px-4 focus:py-2 focus:text-on-deep"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
