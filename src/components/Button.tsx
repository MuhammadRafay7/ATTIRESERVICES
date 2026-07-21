import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "on-deep" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary:
    "text-white border border-gold/60 bg-gradient-to-b from-gold-soft to-gold hover:from-gold-bright hover:to-gold-soft shadow-[0_14px_30px_-14px_rgba(184,134,59,0.95)]",
  outline:
    "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink/[0.04]",
  "on-deep":
    "bg-white/[0.04] text-on-deep border border-white/20 hover:border-gold-bright hover:bg-white/[0.08]",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-ink/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-5 py-2.5 gap-1.5",
  md: "text-[0.95rem] px-7 py-3.5 gap-2",
};

const base =
  "group/btn inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright";

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
