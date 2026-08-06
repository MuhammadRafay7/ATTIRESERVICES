"use client";

import Image from "next/image";
import { Upload } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { uploadMedia } from "../actions";
import { AdminButton, AdminStatus } from "../ui";

/** Logo upload with live preview, writing its result into a hidden field. */
export function LogoPicker({
  value,
  library,
}: {
  value: string;
  library: { name: string; url: string }[];
}) {
  const [current, setCurrent] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    const body = new FormData();
    body.set("file", file);
    startTransition(async () => {
      const result = await uploadMedia(null, body);
      if (result.ok && result.url) setCurrent(result.url);
      else setError(result.message);
    });
  }

  return (
    <div className="flex flex-wrap items-start gap-5">
      <input type="hidden" name="logoUrl" value={current} />

      <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-canvas">
        {current ? (
          <Image src={current} alt="" width={72} height={72} className="object-contain" unoptimized />
        ) : (
          <span className="text-xs text-fg-subtle">Default</span>
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex flex-wrap gap-2">
          <AdminButton type="button" size="sm" busy={pending} onClick={() => fileRef.current?.click()}>
            <Upload size={14} aria-hidden />
            Upload logo
          </AdminButton>
          {current && (
            <AdminButton type="button" size="sm" variant="ghost" onClick={() => setCurrent("")}>
              Use built-in mark
            </AdminButton>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])} />

        {library.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {library.slice(0, 8).map((item) => (
              <button key={item.url} type="button" onClick={() => setCurrent(item.url)}
                title={item.name}
                className="h-11 w-11 cursor-pointer overflow-hidden rounded-md border border-line hover:border-accent">
                <Image src={item.url} alt={item.name} width={44} height={44} className="h-full w-full object-cover" unoptimized />
              </button>
            ))}
          </div>
        )}

        {error && <AdminStatus state="error" message={error} />}
      </div>
    </div>
  );
}
