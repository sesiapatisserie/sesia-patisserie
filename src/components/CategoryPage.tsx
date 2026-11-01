import Image from "next/image";
import Link from "next/link";
import { categories, type Category } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { FlavorGrid, FlavorSwatch } from "./FlavorGrid";
import { GoodToKnow } from "./GoodToKnow";
import { Reveal } from "./Reveal";

/** Gabarit commun aux pages Number cakes, Gâteaux et Mignardises. */
export function CategoryPage({ category }: { category: Category }) {
  const { accent } = category;
  const others = categories.filter((item) => item.slug !== category.slug);

  return (
    <>
      {/* Ouverture, dans la teinte de la catégorie */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24" style={{ backgroundColor: accent.bg }}>
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <nav aria-label="Fil d'Ariane" className="text-xs tracking-[0.12em] text-ink-500" style={{ animation: "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) 80ms both" }}>
              <Link href="/creations" className="transition-colors hover:text-ink">
                Nos créations
              </Link>
              <span aria-hidden className="mx-2.5 opacity-50">/</span>
              <span className="text-ink">{category.label}</span>
            </nav>

            <p
              className="eyebrow mt-10 flex items-center gap-4"
              style={{ color: accent.ink, animation: "fade-up 1s cubic-bezier(0.22,1,0.36,1) 150ms both" }}
            >
              <span aria-hidden className="h-px w-10 bg-current opacity-60" />
              {category.eyebrow}
            </p>
            <h1
              className="mt-6 text-[clamp(3rem,8vw,6.2rem)] leading-[0.95] text-ink"
              style={{ animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) 250ms both" }}
            >
              {category.title}
            </h1>
            <div style={{ animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) 380ms both" }}>
              {category.intro.map((paragraph, index) => (
                <p key={paragraph} className={cn("max-w-xl text-[1.0625rem] leading-[1.8] text-ink-700/80", index === 0 ? "mt-8" : "mt-4")}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
              style={{ animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) 500ms both" }}
            >
              <Button href="/commander">Demander un devis</Button>
              <p className="text-sm text-ink-500">
                <span className="font-display text-3xl text-ink">{category.prices[0].value}</span>{" "}
                {category.prices.length > 1 ? `· ${category.prices[0].label}` : category.prices[0].unit}
              </p>
            </div>
          </div>

          <div className="relative lg:col-span-6" style={{ animation: "fade-in 1.4s cubic-bezier(0.22,1,0.36,1) 200ms both" }}>
            <div className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-[0_50px_90px_-50px_rgba(27,22,19,0.55)]">
              <Image src={category.cover.src} alt={category.cover.alt} fill preload sizes="(min-width: 1024px) 42vw, 86vw" className="object-cover" />
            </div>
            {category.gallery[0] ? (
              <div className="absolute bottom-[8%] left-0 aspect-square w-[38%] overflow-hidden rounded-full border-[6px] shadow-[0_30px_60px_-30px_rgba(27,22,19,0.6)]" style={{ borderColor: accent.bg }}>
                <Image src={category.gallery[0].src} alt={category.gallery[0].alt} fill sizes="(min-width: 1024px) 18vw, 36vw" className="object-cover" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Navigation entre catégories */}
      <nav aria-label="Catégories" className="sticky top-18 z-40 border-b border-ink/8 bg-cream/85 backdrop-blur-xl">
        <div className="container-page">
          <ul className="hide-scrollbar flex gap-1 overflow-x-auto py-3 sm:justify-center">
            {categories.map((item) => {
              const active = item.slug === category.slug;
              return (
                <li key={item.slug} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-all duration-300",
                      active ? "bg-ink text-cream" : "text-ink-500 hover:bg-ink/5 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Parfums */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: accent.soft }}>
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal>
                <p className="eyebrow flex items-center gap-4" style={{ color: accent.ink }}>
                  <span aria-hidden className="h-px w-10 bg-current opacity-60" />
                  {category.flavors.length} {category.slug === "number-cake" ? "parfums" : "créations"}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-6 text-[2.6rem] leading-[1.04] text-ink sm:text-5xl lg:text-[3.6rem]">{category.flavorsTitle}</h2>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <ul className="flex -space-x-2" aria-hidden>
                {category.flavors.map((flavor) => (
                  <li key={flavor.name}>
                    <FlavorSwatch colors={[flavor.colors[0]]} className="[&>span]:h-7 [&>span]:w-7 [&>span]:ring-2" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-14">
            <FlavorGrid flavors={category.flavors} accentInk={accent.ink} />
          </div>
        </div>
      </section>

      {/* Tarifs & photos */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="container-page grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="grain relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink p-9 text-cream sm:p-11">
              <div className="relative z-10 flex h-full flex-col">
                <p className="eyebrow text-gold-light">Nos tarifs</p>

                {category.prices.length > 1 ? (
                  <dl className="mt-8 divide-y divide-cream/12 border-y border-cream/12">
                    {category.prices.map((price) => (
                      <div key={price.label} className="flex items-baseline justify-between py-5">
                        <dt className="text-cream/70">{price.label}</dt>
                        <dd className="font-display text-4xl">{price.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-8">
                    <span className="block text-sm text-cream/60">{category.prices[0].label}</span>
                    <span className="mt-2 flex items-baseline gap-3">
                      <span className="font-display text-7xl leading-none">{category.prices[0].value}</span>
                      <span className="text-cream/60">{category.prices[0].unit}</span>
                    </span>
                  </p>
                )}

                {category.priceNote ? (
                  <p className="mt-6 inline-flex self-start rounded-full bg-cream/10 px-4 py-2 text-xs tracking-wide text-gold-light">
                    {category.priceNote}
                  </p>
                ) : null}

                <p className="mt-auto pt-10 text-[0.95rem] leading-relaxed text-cream/65">{category.outro}</p>
                <Button href="/commander" variant="light" className="mt-7 self-start">
                  Demander un devis
                </Button>
              </div>
            </div>
          </Reveal>

          <div className={cn("grid gap-5 lg:col-span-7", category.gallery.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
            {(category.gallery.length > 1 ? [category.hero, ...category.gallery.slice(1, 4)] : [category.hero]).map((photo, index) => (
              <Reveal key={photo.src} delay={index * 90}>
                <div className={cn("relative overflow-hidden rounded-[1.5rem] bg-sand", category.gallery.length > 1 ? "aspect-square" : "aspect-[4/3] h-full")}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover transition-transform duration-[1.2s] hover:scale-[1.04]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoodToKnow />

      {/* Autres catégories */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-center text-gold-dark">Découvrez aussi</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 100}>
                <Link href={item.href} className="group grid grid-cols-[7rem_1fr_auto] items-center gap-6 rounded-[1.75rem] p-4 pr-7 transition-colors duration-500 sm:grid-cols-[9rem_1fr_auto]" style={{ backgroundColor: item.accent.bg }}>
                  <span className="relative block aspect-square overflow-hidden rounded-[1.25rem]">
                    <Image src={item.cover.src} alt={item.cover.alt} fill sizes="144px" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                  </span>
                  <span>
                    <span className="eyebrow block text-[0.6rem]" style={{ color: item.accent.ink }}>
                      {item.eyebrow}
                    </span>
                    <span className="mt-2 block font-display text-3xl text-ink">{item.title}</span>
                    <span className="mt-1 block text-sm text-ink-500">{item.priceFrom}</span>
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:bg-ink group-hover:text-cream">
                    <span aria-hidden>&rarr;</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
