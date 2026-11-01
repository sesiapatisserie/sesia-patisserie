import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "glass" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[0.74rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-gold-dark",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  light: "bg-cream text-ink hover:bg-gold-light",
  glass: "border border-cream/35 bg-cream/5 text-cream backdrop-blur-sm hover:border-cream hover:bg-cream hover:text-ink",
  ghost: "px-0 py-2 text-ink hover:text-gold-dark",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  arrow = true,
  ...props
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const content = (
    <>
      {children}
      {arrow ? (
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
        >
          &rarr;
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props}>
      {content}
    </Link>
  );
}
