import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { ThemeTokens } from "@/components/ThemeTokens";
import { getSettings } from "@/lib/cms";
import { organizationSchema, websiteSchema } from "@/lib/schema";

// Archivo carries every heading and figure — a wide industrial grotesque
// that holds authority at large sizes without tipping into fashion.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Source Sans 3 runs the body: quieter and more readable than the display
// face at paragraph length.
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

// Monospace for data labels, reference codes, HS-style figures and eyebrows —
// the register trade documents are already written in.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Metadata is generated so brand fields edited in the admin panel reach the
// document head, not just the rendered body.
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const headline = `${s.name} — Apparel & Textile Import, Export and Sourcing`;

  return {
  metadataBase: new URL(s.url),
  title: {
    default: headline,
    template: `%s | ${s.name}`,
  },
  description: s.description,
  applicationName: s.name,
  keywords: [
    "apparel import export",
    "textile trading company",
    "garment sourcing",
    "apparel export house",
    "customs and trade compliance",
    "incoterms 2020",
    "DDP apparel delivery",
    "freight consolidation",
    "private label manufacturing",
    "supplier audit",
    "AQL inspection",
    "OEKO-TEX",
  ],
  authors: [{ name: s.name }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: s.name,
    title: headline,
    description: s.description,
    // No `url` here on purpose — a hardcoded one makes every route advertise
    // the homepage. Next derives og:url from each page's canonical instead.
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: headline,
    description: s.description,
  },
  };
}

export const viewport: Viewport = {
  themeColor: "#061727",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-bg">
        <ThemeTokens />
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
