import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={cn("max-w-2xl", isCentered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Reveal>
          <p
            className={cn(
              "eyebrow flex items-center gap-4",
              isCentered && "justify-center",
              tone === "light" ? "text-gold-light" : "text-gold-dark",
            )}
          >
            <span aria-hidden className="h-px w-10 bg-current opacity-60" />
            {eyebrow}
            {isCentered ? <span aria-hidden className="h-px w-10 bg-current opacity-60" /> : null}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={80}>
        <Heading
          className={cn(
            "mt-6 text-[2.6rem] leading-[1.04] sm:text-5xl lg:text-[3.75rem]",
            tone === "light" ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </Heading>
      </Reveal>

      {intro ? (
        <Reveal delay={150}>
          <p
            className={cn(
              "mt-7 text-[1.0625rem] leading-[1.8]",
              tone === "light" ? "text-cream/70" : "text-ink-500",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
