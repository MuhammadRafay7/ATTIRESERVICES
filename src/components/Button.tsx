import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "on-deep" | "inverse" | "ghost";
type Size = "sm" | "md";

/**
 * Marine button set: the accent blue carries every primary action, a hairline
 * outline carries the secondary. Hover shifts colour and lifts the shadow a
 * fraction — enough to feel responsive, not enough to look like a toy.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-accent shadow-[0_1px_2px_rgba(11,27,43,0.10)] hover:bg-accent-strong hover:border-accent-strong hover:shadow-[0_6px_18px_-8px_rgba(14,92,140,0.6)]",
  outline:
    "bg-transparent text-ink border border-line-strong hover:border-accent hover:text-accent hover:bg-accent-wash",
  "on-deep":
    "bg-transparent text-on-deep border border-white/25 hover:border-on-deep hover:bg-white/10",
  // Primary action when sitting on a dark panel.
  inverse:
    "bg-bg text-ink border border-bg hover:bg-bg-muted hover:border-bg-muted",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-bg-muted",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.8125rem] px-4 py-2.5 gap-2",
  md: "text-sm px-6 py-3.5 gap-2.5",
};

const base =
  "group/btn inline-flex cursor-pointer items-center justify-center rounded-brand-sm font-medium tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

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
