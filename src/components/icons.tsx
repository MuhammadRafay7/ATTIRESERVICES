/**
 * Inline SVG icons (BUILD_BRIEF §9 — no icon fonts / CDN).
 * All icons inherit `currentColor` and accept standard SVG props.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ShipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 15.5 4.5 10h15L21 15.5" />
      <path d="M12 10V5H8" />
      <path d="M12 5h3l1.5 5" />
      <path d="M2.5 15.5c1.2 1 2 1 3.2 0 1.2 1 2 1 3.2 0 1.2 1 2 1 3.2 0 1.2 1 2 1 3.2 0 1.2 1 2 1 3.2 0" />
      <path d="M12 10v5.5" />
    </svg>
  );
}

export function PlaneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10.5 13.5 3 12l-1-3 2 .5 2 1.5 3-.5-4-6 2.5-.5L14 9l4.5-1c1 0 2 .5 2 1.5s-1 1.5-2 1.75L14 13l1.5 6-2 .5-3.5-5-3 .5.5 2.5-2 .5-.5-3z" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 6.5h10.5V16H2z" />
      <path d="M12.5 9.5H17l3 3V16h-7.5z" />
      <circle cx="6" cy="17.5" r="1.75" />
      <circle cx="16.5" cy="17.5" r="1.75" />
    </svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 18 4h-2" />
      <path d="M8.5 3h7v3h-7z" />
      <path d="M8 11h8M8 14.5h5" />
    </svg>
  );
}

export function WarehouseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20V8.5L12 4l9 4.5V20" />
      <path d="M6.5 20v-7h11v7" />
      <path d="M6.5 16.5h11" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.5-4.5" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function RouteIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H14a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-5h6.5" strokeDasharray="1 3" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.25 3.25 0 0 1 0 6.1" />
      <path d="M17 14.2A5.5 5.5 0 0 1 20.5 19" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4S8 4 5 12c-1.5 4 1 7 4 7 8 0 11-15 11-15Z" />
      <path d="M11 13c2-3 5-4 5-4" />
    </svg>
  );
}

export function BeakerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h6M10 3v6l-5 8.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3L14 9V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

export function CpuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" />
    </svg>
  );
}

export function CogIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </svg>
  );
}

export function ShirtIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3 4 6l2 3 2-1v10h8V8l2 1 2-3-4-3-2 2h-4z" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16v-3l2-5.5A2 2 0 0 1 7.9 6h8.2a2 2 0 0 1 1.9 1.5L20 13v3" />
      <path d="M3.5 16h17" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4h2l1.5 10.5h10L18.5 7H6" />
      <circle cx="8.5" cy="18.5" r="1.3" />
      <circle cx="15.5" cy="18.5" r="1.3" />
    </svg>
  );
}

export function WheatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21V9" />
      <path d="M12 9c0-2 1.5-3.5 3-4-1.5 2-1 4-3 4Zm0 0c0-2-1.5-3.5-3-4 1.5 2 1 4 3 4Z" />
      <path d="M12 14c0-1.5 1.3-2.6 2.6-3-1.2 1.6-.8 3-2.6 3Zm0 0c0-1.5-1.3-2.6-2.6-3 1.2 1.6.8 3 2.6 3Z" />
      <path d="M12 5c0-1.3 1-2.3 2-2.7-.8 1.4-.5 2.7-2 2.7Zm0 0c0-1.3-1-2.3-2-2.7.8 1.4.5 2.7 2 2.7Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5 9 4l1 3.5-1.8 1.3a11 11 0 0 0 5 5L14.5 15l3.5 1 .5 2.5c-.2 1-1 1.6-2 1.5A15.5 15.5 0 0 1 4 6c-.1-1 .5-1.8 1.5-2z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}



export function ScissorsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="6" cy="17" r="2.5" />
      <path d="M8 8.5 20 17M8 15.5 20 7M8.2 8.4 14 12" />
    </svg>
  );
}

export function SpoolIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h10M7 21h10" />
      <path d="M8 3v18M16 3v18" />
      <path d="M8 8h8M8 12h8M8 16h8" />
    </svg>
  );
}

export function HangerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 7a2 2 0 1 1 1.4-3.4" />
      <path d="M12 7v2l8 5.5c1 .7.5 2.5-.8 2.5H4.8c-1.3 0-1.8-1.8-.8-2.5L12 9" />
    </svg>
  );
}

export function SofaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11V8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5V11" />
      <path d="M4 11a2 2 0 0 0-2 2v4h20v-4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2H6v-2a2 2 0 0 0-2-2Z" />
      <path d="M5 19v1.5M19 19v1.5" />
    </svg>
  );
}

/**
 * Name → component registry.
 *
 * Content is stored in the database, where an icon can only be a string. This
 * is the single place that turns one back into a component, so the admin panel
 * can offer a picker and the renderer never has to trust arbitrary input.
 */
export const iconMap = {
  ShipIcon,
  PlaneIcon,
  TruckIcon,
  ClipboardIcon,
  WarehouseIcon,
  SearchIcon,
  ShieldIcon,
  RouteIcon,
  GlobeIcon,
  EyeIcon,
  UsersIcon,
  LayersIcon,
  LeafIcon,
  BeakerIcon,
  CpuIcon,
  CogIcon,
  ShirtIcon,
  CarIcon,
  CartIcon,
  WheatIcon,
  ArrowIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  CheckIcon,
  ScissorsIcon,
  SpoolIcon,
  HangerIcon,
  SofaIcon,
} as const;

export type IconName = keyof typeof iconMap;

export function isIconName(value: unknown): value is IconName {
  return typeof value === "string" && value in iconMap;
}

/** Resolves a stored icon name, falling back so bad data never breaks a page. */
export function resolveIcon(name: unknown, fallback: IconName = "LayersIcon") {
  return isIconName(name) ? iconMap[name] : iconMap[fallback];
}
