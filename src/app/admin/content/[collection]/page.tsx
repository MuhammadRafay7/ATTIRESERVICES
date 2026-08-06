import { notFound } from "next/navigation";
import { listMedia } from "../../actions";
import { schemas } from "../../schema";
import { adminClient } from "@/lib/supabase";
import { resolveMedia } from "@/lib/cms";
import { CollectionEditor } from "./CollectionEditor";

export const dynamic = "force-dynamic";

/**
 * The one list editor every collection uses.
 *
 * Rows are jsonb and each collection has a different shape, so the fields come
 * from `schema.ts` and are rendered as real controls — an upload box for
 * images, a picker for icons, one-per-line inputs for bullets.
 */
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const schema = schemas[collection];
  if (!schema) notFound();

  const supabase = adminClient();
  const { data } = (await supabase
    ?.from("content_items")
    .select("id, position, published, data")
    .eq("collection", collection)
    .order("position", { ascending: true })) ?? { data: [] };

  const library = await listMedia();

  const rows = await Promise.all(
    (data ?? []).map(async (r) => {
      const row = r.data as Record<string, unknown>;
      return {
        id: r.id as string,
        published: r.published as boolean,
        data: row,
        thumb:
          typeof row.image === "string" ? await resolveMedia(row.image) : "",
      };
    }),
  );

  return (
    <CollectionEditor
        collection={collection}
        schema={schema}
        rows={rows}
      library={library.map((m) => ({ name: m.name, url: m.url }))}
    />
  );
}
