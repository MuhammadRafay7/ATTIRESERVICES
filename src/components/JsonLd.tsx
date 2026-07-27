/**
 * Renders a JSON-LD graph into the document.
 *
 * `<` is escaped to its unicode form so a stray angle bracket in the source
 * data can never close the script tag — the sanitisation Next's JSON-LD guide
 * calls for. A native <script> is correct here rather than next/script:
 * this is data, not executable code.
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
