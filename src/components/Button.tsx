import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "on-deep" | "inverse" | "ghost";
type Size = "sm" | "md";

/**
 * Institutional button set: solid ink for the primary action, hairline
 * outline for the secondary. No gradients, no glow, no lift on hover —
 * state is communicated by colour and border weight only.
 */
const variants: Record<Variant, string> = {
  primary: "bg-ink text-bg border border-ink hover:bg-deep-2 hover:border-deep-2",
  outline:
    "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-bg-subtle",
  "on-deep":
    "bg-transparent text-on-deep border border-white/25 hover:border-on-deep hover:bg-white/8",
  // Primary action when sitting on a dark panel.
  inverse:
    "bg-bg text-ink border border-bg hover:bg-bg-muted hover:border-bg-muted",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-bg-muted",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.8125rem] px-4 py-2 gap-2",
  md: "text-sm px-6 py-3 gap-2.5",
};

const base =
  "group/btn inline-flex items-center justify-center rounded-brand font-medium tracking-[-0.005em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    return (
      <Link className={classes} {...(rest as ComponentPropsWithoutRef<typeof Link>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
