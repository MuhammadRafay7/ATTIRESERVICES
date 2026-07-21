import Image from "next/image";

/**
 * Image frame with an optional navy/gold duotone treatment so photography
 * from mixed sources reads as one cohesive, art-directed system.
 * The wrapper must set an aspect ratio / size via `className`.
 *
 * Photos in /public/photos are placeholders (see CREDITS.txt) — swap with
 * the client's own product & factory photography.
 */
export function Photo({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  duotone = false,
  overlay = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  duotone?: boolean;
  overlay?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-bg-sand ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${duotone ? "grayscale-[35%]" : ""} ${imageClassName}`}
      />
      {duotone && (
        <>
          {/* navy tint */}
          <div className="pointer-events-none absolute inset-0 bg-deep/45 mix-blend-multiply" />
          {/* warm gold lift */}
          <div className="pointer-events-none absolute inset-0 bg-gold/10 mix-blend-overlay" />
        </>
      )}
      {overlay && <div className={`pointer-events-none absolute inset-0 ${overlay}`} />}
    </div>
  );
}
