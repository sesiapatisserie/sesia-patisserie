import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FlavorSwatch } from "@/components/FlavorGrid";
import { GoodToKnow } from "@/components/GoodToKnow";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { categories, photos, productsIntro } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos créations",
  description:
    "Découvrez notre sélection de produits gourmands : number cakes (3,80 € la part), tartes et pavlova (dès 19,20 €) et mignardises (1,20 € pièce). Créations faites maison, sur devis.",
  alternates: { canonical: "/creations" },
};

export default function CreationsPage() {
  return (
    <>
      <PageHeader
        eyebrow={productsIntro.eyebrow}
        title="Nos créations"
        intro={productsIntro.text}
        image={photos.tartesFraises}
        position="center 45%"
      />

      <section className="bg-cream py-20 lg:py-28">
        <div className="container-page space-y-5 lg:space-y-6">
          {categories.map((category, index) => (
            <Reveal key={category.slug}>
              <Link
                href={category.href}
                className="group grid overflow-hidden rounded-[2rem] transition-shadow duration-700 hover:shadow-[0_40px_80px_-50px_rgba(27,22,19,0.5)] lg:grid-cols-2"
                style={{ backgroundColor: category.accent.bg }}
              >
                <div className={cn("relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[34rem]", index % 2 === 1 && "lg:order-2")}>
                  <Image
                    src={category.cover.src}
                    alt={category.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 font-display text-xl italic text-ink backdrop-blur">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                  <p className="eyebrow" style={{ color: category.accent.ink }}>
                    {category.eyebrow}
                  </p>
                  <h2 className="mt-5 text-[2.8rem] leading-[1] text-ink sm:text-6xl">{category.title}</h2>
                  <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.8] text-ink-700/80">{category.teaser}</p>

                  <div className="mt-9 flex items-center gap-4">
                    <span className="flex -space-x-2" aria-hidden>
                      {category.flavors.slice(0, 6).map((flavor) => (
                        <FlavorSwatch key={flavor.name} colors={[flavor.colors[0]]} className="[&>span]:h-8 [&>span]:w-8 [&>span]:ring-2" />
                      ))}
                    </span>
                    <span className="text-sm text-ink-500">
                      {category.flavors.length} {category.slug === "number-cake" ? "parfums" : "créations"}
                    </span>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-ink/12 pt-7">
                    <span>
                      <span className="block text-xs uppercase tracking-[0.16em] text-ink-500">Tarif</span>
                      <span className="mt-1 block font-display text-3xl text-ink">{category.priceFrom}</span>
                    </span>
                    <span className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-500 group-hover:bg-gold-dark">
                      Découvrir
                      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <GoodToKnow />
    </>
  );
}
