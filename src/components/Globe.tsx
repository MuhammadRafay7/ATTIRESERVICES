"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary for the WebGL chart.
 *
 * `ssr: false` is only permitted inside a Client Component, so the hero (a
 * Server Component) imports this wrapper rather than the scene directly. It
 * also keeps three.js out of the initial payload — the placeholder below is
 * what renders until the scene arrives, and it is what a no-JS or no-WebGL
 * visitor keeps.
 */
const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => <GlobePlaceholder />,
});

function GlobePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        aria-hidden="true"
        className="h-[62%] w-[62%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_32%_28%,rgba(58,141,192,0.22),transparent_58%)]"
      />
    </div>
  );
}

export function Globe({ className = "" }: { className?: string }) {
  return <GlobeScene className={className} />;
}
