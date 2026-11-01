import type { Flavor } from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Pastille de couleur évoquant les ingrédients d'un parfum. */
export function FlavorSwatch({ colors, className }: { colors: Flavor["colors"]; className?: string }) {
  return (
    <span aria-hidden className={cn("flex shrink-0 items-center", className)}>
      {colors.map((color, index) => (
        <span
          key={color + index}
          className={cn(
            "block h-11 w-11 rounded-full shadow-[inset_0_-6px_12px_rgba(0,0,0,0.12),0_6px_14px_-6px_rgba(27,22,19,0.35)] ring-[3px] ring-cream-50",
            index > 0 && "-ml-3.5",
          )}
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}

export function FlavorGrid({ flavors, accentInk }: { flavors: Flavor[]; accentInk: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {flavors.map((flavor, index) => (
        <Reveal as="li" key={flavor.name} delay={(index % 3) * 90}>
          <article className="group flex h-full flex-col rounded-[1.6rem] border border-ink/[0.07] bg-cream-50 p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_28px_50px_-30px_rgba(27,22,19,0.4)] lg:p-8">
            <div className="flex items-start justify-between">
              <FlavorSwatch colors={flavor.colors} />
              <span className="font-display text-lg italic" style={{ color: accentInk }}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-7 text-[1.85rem] leading-[1.1] text-ink">{flavor.name}</h3>

            {flavor.notes?.length ? (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {flavor.notes.map((note) => (
                  <li
                    key={note}
                    className="rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em]"
                    style={{ color: accentInk, backgroundColor: `${accentInk}14` }}
                  >
                    {note}
                  </li>
                ))}
              </ul>
            ) : null}

            {flavor.description ? (
              <p className="mt-5 text-[1rem] leading-[1.75] text-ink-700/85">{flavor.description}</p>
            ) : null}
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
