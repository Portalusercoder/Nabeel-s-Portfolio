import { LocaleLink } from "@/components/layout/LocaleLink";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "blue";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

const variants = {
  primary: "bg-white text-black hover:bg-white/90",
  secondary: "bg-card text-foreground border border-border hover:bg-card-hover",
  ghost: "text-muted hover:text-foreground hover:bg-card",
  outline: "border border-border bg-transparent text-foreground hover:bg-card",
  blue: "bg-white text-black hover:bg-white/90",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <LocaleLink href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </LocaleLink>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
