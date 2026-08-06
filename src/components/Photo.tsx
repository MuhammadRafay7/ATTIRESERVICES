import Image from "next/image";
import { resolveMedia } from "@/lib/cms";

/**
 * Image frame. Photography is treated with a light, neutral desaturation
 * and a cool scrim so images from mixed sources sit together without the
 * warm duotone that reads as a lifestyle brand.
 *
 * The wrapper must set an aspect ratio / size via `className`.
 *
 * `src` is resolved through the media manifest, so a `/photos/…` path written
 * anywhere in the codebase or stored in the database points at whatever the
 * admin has uploaded. Unknown paths pass through untouched.
 */
export async function Photo({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  treated = true,
  overlay = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  treated?: boolean;
  overlay?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-bg-muted ${className}`}>
      <Image
        src={await resolveMedia(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${
          treated ? "grayscale-[55%] contrast-[1.04]" : ""
        } ${imageClassName}`}
      />
      {treated && (
        <div className="pointer-events-none absolute inset-0 bg-deep/12 mix-blend-multiply" />
      )}
      {overlay && <div className={`pointer-events-none absolute inset-0 ${overlay}`} />}
    </div>
  );
}
