import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { FlavorSwatch } from "@/components/FlavorGrid";
import { GoodToKnow } from "@/components/GoodToKnow";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";
import { about, categories, hero, numberCakes, photos, productsIntro, site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: site.homeTitle },
  alternates: { canonical: "/" },
};

const covers = {
  "number-cake": photos.numberCakesFleurs,
  "nos-gateaux": photos.tarteCitronMeringuee,
  "nos-migniardises": photos.mignardisesCoffret,
} as const;

export default function HomePage() {
  return (
    <>
      {/* Ouverture */}
      <section className="relative overflow-hidden bg-cream pt-32 pb-20 lg:flex lg:min-h-svh lg:items-center lg:pt-28 lg:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-48 -top-40 h-[46rem] w-[46rem] rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(234,216,207,0.9), rgba(248,244,238,0) 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-60 -left-40 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(220,196,162,0.55), rgba(248,244,238,0) 70%)" }}
        />

        <div className="container-page relative">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <p
                className="eyebrow flex items-center gap-4 text-gold-dark"
                style={{ animation: "fade-up 1s cubic-bezier(0.22,1,0.36,1) 150ms both" }}
              >
                <span aria-hidden className="h-px w-10 bg-current opacity-60" />
                {hero.eyebrow}
              </p>
              <h1
                className="mt-7 text-[clamp(2.9rem,6.4vw,5.9rem)] leading-[0.98] text-ink"
                style={{ animation: "fade-up 1.2s cubic-bezier(0.22,1,0.36,1) 280ms both" }}
              >
                Créations personnalisées pour tous vos{" "}
                <em className="text-gold-dark">événements spéciaux</em>
              </h1>
              <p
                className="mt-8 max-w-md text-[1.0625rem] leading-[1.8] text-ink-500"
                style={{ animation: "fade-up 1.2s cubic-bezier(0.22,1,0.36,1) 420ms both" }}
              >
                {hero.text}
              </p>
              <div
                className="mt-11 flex flex-col gap-4 sm:flex-row"
                style={{ animation: "fade-up 1.2s cubic-bezier(0.22,1,0.36,1) 540ms both" }}
              >
                <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
                <Button href={hero.secondaryCta.href} variant="outline">
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </div>

            <div
              className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none"
              style={{ animation: "fade-in 1.6s cubic-bezier(0.22,1,0.36,1) 250ms both" }}
            >
              <div className="relative ml-auto aspect-[4/5] w-[78%] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-[0_60px_100px_-60px_rgba(27,22,19,0.6)]">
                <Image
                  src={photos.numberCake50.src}
                  alt={photos.numberCake50.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 38vw, 78vw"
                  className="animate-ken-burns object-cover object-[35%_center]"
                />
              </div>

              <div className="absolute bottom-[6%] left-0 aspect-[3/4] w-[40%] overflow-hidden rounded-[1.5rem] border-[6px] border-cream shadow-[0_40px_70px_-40px_rgba(27,22,19,0.6)]">
                <Image
                  src={photos.chloeTarte.src}
                  alt={photos.chloeTarte.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Sceau tournant */}
              <div className="absolute left-[30%] top-[4%] hidden h-32 w-32 sm:block lg:left-[8%] lg:top-[10%]">
                <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full animate-[spin_28s_linear_infinite] text-gold-dark">
                  <defs>
                    <path id="cercle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                  </defs>
                  <text fontSize="9.4" letterSpacing="3.2" fill="currentColor" style={{ textTransform: "uppercase" }}>
                    <textPath href="#cercle">Fait maison · Sur mesure · Vendée ·</textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-2xl italic text-gold-light">
                  S
                </span>
              </div>

              <Link
                href={numberCakes.href}
                className="group absolute -bottom-6 right-[4%] flex items-center gap-4 rounded-full bg-cream-50/95 py-2 pl-2 pr-6 shadow-[0_20px_40px_-20px_rgba(27,22,19,0.45)] backdrop-blur transition-transform duration-500 hover:-translate-y-0.5 sm:right-[10%]"
              >
                <span className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={photos.numberCakesChocolat.src} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span>
                  <span className="eyebrow block text-[0.55rem] text-gold-dark">Notre best-seller</span>
                  <span className="mt-0.5 block font-display text-lg text-ink">Number cake · {numberCakes.priceFrom}</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={numberCakes.flavors.map((flavor) => flavor.name)} />

      {/* Nos produits */}
      <section className="bg-cream py-24 lg:py-36">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <SectionHeading eyebrow={productsIntro.eyebrow} title={productsIntro.title} className="lg:col-span-7" />
            <Reveal delay={150} className="lg:col-span-5">
              <p className="text-[1.0625rem] leading-[1.8] text-ink-500">{productsIntro.text}</p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 120} className={index === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <Link
                  href={category.href}
                  className={cn(
                    "group relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-sand",
                    index === 2 && "sm:aspect-[16/9] lg:aspect-[3/4]",
                  )}
                >
                  <Image
                    src={covers[category.slug].src}
                    alt={covers[category.slug].alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

                  {category.slug === "number-cake" ? (
                    <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink backdrop-blur">
                      Best-seller
                    </span>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                    <p className="eyebrow text-[0.6rem] text-gold-light">{category.eyebrow}</p>
                    <h3 className="mt-3 text-[2.2rem] leading-none text-cream">{category.title}</h3>
                    <div className="mt-6 flex items-center justify-between border-t border-cream/20 pt-5">
                      <span className="text-sm text-cream/80">{category.priceFrom}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition-all duration-500 group-hover:border-cream group-hover:bg-cream group-hover:text-ink">
                        <span aria-hidden>&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Best-seller */}
      <section className="overflow-hidden bg-cream-50 py-24 lg:py-36">
        <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-6">
            <Reveal>
              <div className="relative aspect-[4/5] w-[82%] overflow-hidden rounded-t-full rounded-b-[1.75rem]">
                <Image
                  src={photos.numberCakeChocolatCitron.src}
                  alt={photos.numberCakeChocolatCitron.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={200} className="absolute -bottom-10 right-0 w-[46%]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border-[6px] border-cream-50 shadow-[0_30px_60px_-30px_rgba(27,22,19,0.5)]">
                <Image
                  src={photos.numberCakeCaramel.src}
                  alt={photos.numberCakeCaramel.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-6 lg:col-span-6 lg:mt-0">
            <SectionHeading eyebrow={numberCakes.eyebrow} title="Le Number Cake, une explosion de saveurs" />
            <Reveal delay={150}>
              <p className="mt-7 text-[1.0625rem] leading-[1.8] text-ink-500">{numberCakes.intro[1]}</p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-9 flex flex-wrap gap-2">
                {numberCakes.flavors.map((flavor) => (
                  <li
                    key={flavor.name}
                    className="flex items-center gap-2.5 rounded-full border border-ink/10 bg-cream py-1.5 pl-1.5 pr-4 text-[0.85rem] text-ink-700"
                  >
                    <FlavorSwatch colors={flavor.colors} className="[&>span]:h-5 [&>span]:w-5 [&>span]:ring-2 [&>span+span]:-ml-2" />
                    {flavor.name}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-11 flex flex-wrap items-center gap-x-10 gap-y-6">
                <p>
                  <span className="font-display text-5xl text-ink">{numberCakes.prices[0].value}</span>
                  <span className="ml-2 text-sm text-ink-400">la part</span>
                </p>
                <Button href={numberCakes.href} variant="outline">
                  Voir les parfums
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* La pâtissière */}
      <section className="grain relative overflow-hidden bg-ink py-24 text-cream lg:py-36">
        <div className="container-page relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[1.75rem] lg:max-w-none">
              <Image
                src={photos.chloeSourire.src}
                alt={photos.chloeSourire.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow={about.title} title="Chloé, la main derrière chaque création" tone="light" />
            <Reveal delay={150}>
              <p className="mt-8 font-display text-[1.7rem] italic leading-snug text-cream/90">« {about.signature} »</p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 max-w-xl text-[1.0625rem] leading-[1.8] text-cream/65">
                {about.lead} CAP pâtissier, CAP chocolatier-confiseur et une année en Italie dans de grands hôtels.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Button href="/a-propos" variant="glass" className="mt-11">
                Découvrir son parcours
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Aperçu du portfolio */}
      <section className="bg-cream py-24 lg:py-36">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Mes créations" title="Quelques douceurs récentes" />
            <Reveal delay={150}>
              <Button href="/portfolio" variant="outline">
                Tout le portfolio
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:grid-rows-2">
            {[
              { photo: photos.chloeDressage, className: "row-span-2 lg:col-span-2" },
              { photo: photos.tartesFraises, className: "aspect-square" },
              { photo: photos.numberCakesChocolat, className: "aspect-square" },
              { photo: photos.partTarteCitron, className: "aspect-square" },
              { photo: photos.mignardisesPlateau, className: "aspect-square" },
            ].map(({ photo, className }, index) => (
              <Reveal key={photo.src} delay={index * 90} className={className}>
                <Link href="/portfolio" className="group relative block h-full overflow-hidden rounded-2xl bg-sand">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoodToKnow />
    </>
  );
}
