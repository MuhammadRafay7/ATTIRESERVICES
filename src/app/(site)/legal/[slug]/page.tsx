import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { getCollection, type LegalDocument } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Footer policies — privacy, terms of trade, supplier code, modern slavery.
 *
 * They are content rows rather than hand-written routes, so the admin can edit
 * the wording, add a new policy, or retire one without a deploy. Bodies are
 * plain text: blank lines separate paragraphs, and a line ending in a colon is
 * treated as a run-in heading, which is all these documents need.
 */
async function getDocument(slug: string) {
  const documents = await getCollection<LegalDocument>("legal_documents");
  return documents.find((d) => d.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const documents = await getCollection<LegalDocument>("legal_documents");
  return documents.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocument(slug);
  if (!doc) return {};

  return pageMetadata({
    title: doc.title,
    description: doc.summary,
    path: `/legal/${doc.slug}`,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getDocument(slug);
  if (!doc) notFound();

  const paragraphs = doc.body.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: doc.title, href: `/legal/${doc.slug}` },
        ])}
      />

      <PageHero eyebrow={doc.title} title={doc.title} lead={doc.summary} />

      <Section background="default" divider={false}>
        <Reveal className="max-w-3xl">
          <div className="space-y-6">
            {paragraphs.map((text, i) => {
              // "Delivery and risk. Goods are supplied…" — lead with the label.
              const runIn = /^([A-Z][A-Za-z\s]{2,40})\.\s([\s\S]+)$/.exec(text);
              return (
                <p
                  key={i}
                  className="text-[0.9375rem] leading-relaxed text-ink-muted"
                >
                  {runIn ? (
                    <>
                      <strong className="font-medium text-ink">
                        {runIn[1]}.
                      </strong>{" "}
                      {runIn[2]}
                    </>
                  ) : (
                    text
                  )}
                </p>
              );
            })}
          </div>

          <p className="label-mono mt-14 border-t border-line pt-6 text-ink-faint">
            Issued by Attire Services B.V. · Available in full on request
          </p>
        </Reveal>
      </Section>
    </>
  );
}
