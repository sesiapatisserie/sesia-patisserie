import Image from "next/image";
import type { Photo } from "@/content/site";
import { cn } from "@/lib/utils";

/** Bandeau d'ouverture des pages intérieures : photo pleine largeur, titre en surimpression. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  position = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: Photo;
  position?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[68svh] items-end overflow-hidden bg-ink pt-40 pb-16 lg:min-h-[74svh] lg:pb-24",
        className,
      )}
    >
      <Image
        src={image.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 animate-ken-burns object-cover opacity-70"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/30"
      />

      <div className="container-page">
        <p
          className="eyebrow flex items-center gap-4 text-gold-light"
          style={{ animation: "fade-up 1s cubic-bezier(0.22,1,0.36,1) 100ms both" }}
        >
          <span aria-hidden className="h-px w-10 bg-current opacity-60" />
          {eyebrow}
        </p>
        <h1
          className="mt-6 max-w-4xl text-[clamp(2.9rem,8vw,6.2rem)] leading-[0.98] text-cream"
          style={{ animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) 220ms both" }}
        >
          {title}
        </h1>
        {intro ? (
          <p
            className="mt-8 max-w-xl text-[1.0625rem] leading-[1.8] text-cream/75"
            style={{ animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) 360ms both" }}
          >
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
