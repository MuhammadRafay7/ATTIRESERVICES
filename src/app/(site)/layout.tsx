import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getNav, getSettings } from "@/lib/cms";

/**
 * Chrome for the public site only.
 *
 * The masthead and footer used to live in the root layout, which meant the
 * admin panel inherited them. They belong to this route group instead, so
 * /admin renders on its own shell and the two never mix.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolved once here: the header is a client component and cannot await, and
  // this keeps both header and footer reading the same brand record.
  const settings = await getSettings();
  const nav = await getNav();
  const brand = {
    name: settings.name,
    wordmark: settings.wordmark,
    descriptor: settings.descriptor,
    logoUrl: (settings as { logoUrl?: string }).logoUrl,
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-brand-sm focus:bg-deep focus:px-4 focus:py-2 focus:text-on-deep"
      >
        Skip to content
      </a>
      <Header
        brand={brand}
        nav={nav}
        contactEmail={settings.contact.email}
        legalEntity={settings.legalEntity}
        duns={settings.duns}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer brand={brand} />
    </>
  );
}
