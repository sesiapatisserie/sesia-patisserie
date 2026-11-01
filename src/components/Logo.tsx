import { cn } from "@/lib/utils";

/** Monogramme de la maison — dessin vectoriel, net à toutes les tailles. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={cn("h-full w-full", className)}>
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="24" cy="24" r="18.5" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
      <path
        d="M30.4 17.2c-1.5-1.9-3.6-2.9-6.3-2.9-3.6 0-6 1.8-6 4.6 0 2.4 1.6 3.8 5.2 4.9l1.8.6c3.9 1.2 6 3.1 6 6.3 0 3.6-3 6-7.4 6-3.1 0-5.6-1.1-7.3-3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "h-9 w-9 shrink-0 transition-colors duration-500",
          tone === "light" ? "text-gold-light" : "text-gold-dark",
        )}
      >
        <Monogram />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.65rem] leading-none tracking-[0.06em] transition-colors duration-500",
            tone === "light" ? "text-cream" : "text-ink",
          )}
        >
          Sesia
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5rem] font-medium uppercase tracking-[0.44em] transition-colors duration-500",
            tone === "light" ? "text-cream/60" : "text-ink-400",
          )}
        >
          Pâtisserie
        </span>
      </span>
    </span>
  );
}
