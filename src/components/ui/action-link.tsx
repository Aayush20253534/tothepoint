import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { Icon } from "./icons";

export type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "small";
  icon?: "arrow-right" | "arrow-up-right" | "message";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function ActionLink({
  href, children, variant = "primary", size = "default", icon, className = "", onClick,
}: ActionLinkProps) {
  const base = "inline-flex items-center justify-center gap-2.5 rounded-md text-center font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light";
  const sizes = size === "small" ? "min-h-10 px-4 py-2 text-xs sm:text-sm" : "min-h-12 px-6 py-3 text-sm";
  const variants = {
    primary: "bg-gold text-navy hover:bg-gold-light",
    outline: "border border-gold/60 bg-gold/5 text-gold-light hover:border-gold hover:bg-gold/15",
    ghost: "text-cream hover:bg-white/10",
  };
  const classes = [base, sizes, variants[variant], className].filter(Boolean).join(" ");
  const contents = <>{children}{icon && <Icon name={icon} size={16} />}</>;
  return href.startsWith("/") && !href.startsWith("//")
    ? <Link href={href} className={classes} onClick={onClick}>{contents}</Link>
    : <a href={href} className={classes} onClick={onClick} target={href.startsWith("https://") ? "_blank" : undefined} rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}>{contents}</a>;
}
