import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { about, photos, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Chloé, 20 ans, pâtissière passionnée : CAP pâtissier, CAP chocolatier-confiseur et une année en Italie dans de grands hôtels. Découvrez l'univers de Sesia Pâtisserie.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      {/* Ouverture claire : portrait en arche */}
      <section className="relative overflow-hidden bg-blush/50 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-32 h-[38rem] w-[38rem] rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(248,244,238,0.95), rgba(248,244,238,0) 70%)" }}
        />
        <div className="container-page relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p
              className="eyebrow flex items-center gap-4 text-gold-dark"
              style={{ animation: "fade-up 1s cubic-bezier(0.22,1,0.36,1) 150ms both" }}
            >
              <span aria-hidden className="h-px w-10 bg-current opacity-60" />
              {about.eyebrow}
            </p>
            <h1
              className="mt-6 text-[clamp(3rem,7.5vw,6rem)] leading-[0.96] text-ink"
              style={{ animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) 250ms both" }}
            >
              Rencontrez notre <em className="text-gold-dark">pâtissière</em>
            </h1>
            <p
              className="mt-8 max-w-md text-[1.0625rem] leading-[1.8] text-ink-700/80"
              style={{ animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) 380ms both" }}
            >
              {about.lead}
            </p>
            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              style={{ animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) 500ms both" }}
            >
              <Button href="/commander">Commander</Button>
              <Button href="/creations" variant="outline">
                Nos créations
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-6" style={{ animation: "fade-in 1.4s cubic-bezier(0.22,1,0.36,1) 200ms both" }}>
            <div className="relative ml-auto aspect-[4/5] w-[80%] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-[0_50px_90px_-50px_rgba(27,22,19,0.55)]">
              <Image
                src={photos.chloeApropos.src}
                alt={photos.chloeApropos.alt}
                fill
                preload
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover object-[center_25%]"
              />
            </div>
            <div className="absolute bottom-[8%] left-0 aspect-square w-[36%] overflow-hidden rounded-full border-[6px] border-[#f2e7e1] shadow-[0_30px_60px_-30px_rgba(27,22,19,0.6)]">
              <Image src={photos.chloeTarte.src} alt={photos.chloeTarte.alt} fill sizes="(min-width: 1024px) 16vw, 36vw" className="object-cover object-[center_30%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="bg-cream py-24 lg:py-36">
        <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[1.75rem]">
                  <Image
                    src={photos.chloeDressage.src}
                    alt={photos.chloeDressage.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-10">
            <Reveal>
              <p className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.1] text-ink">
                Je m&apos;appelle Chloé, et la pâtisserie est bien plus qu&apos;un métier pour moi&nbsp;:{" "}
                <em className="text-gold-dark">c&apos;est une véritable passion.</em>
              </p>
            </Reveal>

            <div className="mt-12 space-y-6">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 80}>
                  <p className="text-[1.0625rem] leading-[1.9] text-ink-500">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={150}>
              <blockquote className="mt-14 border-l-2 border-gold pl-7">
                <p className="font-display text-[1.75rem] italic leading-snug text-ink-700">{about.signature}</p>
                <footer className="eyebrow mt-5 text-gold-dark">— Chloé</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="grain relative overflow-hidden bg-ink py-24 text-cream lg:py-32">
        <div className="container-page relative z-10">
          <SectionHeading eyebrow="Parcours" title="Une formation exigeante" tone="light" />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {about.journey.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 100} className="bg-ink">
                <div className="flex h-full flex-col p-8 lg:p-10">
                  <span className="font-display text-5xl italic text-gold-light/60">0{index + 1}</span>
                  <h3 className="mt-10 text-[1.75rem] leading-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* En images */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {[photos.dressagePoche, photos.chloeSourire, photos.tarteDressageMains, photos.tarteCitronDetail].map(
              (photo, index) => (
                <Reveal key={photo.src} delay={index * 90} className={index % 2 ? "lg:mt-16" : undefined}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
              ),
            )}
          </div>

          <Reveal>
            <div className="mx-auto mt-20 flex max-w-2xl flex-col items-center text-center">
              <p className="eyebrow text-gold-dark">Restons en contact</p>
              <p className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Suivez mes créations au quotidien
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                {socials.map((social) => (
                  <Button key={social.label} href={social.href} variant="outline" arrow={false}>
                    {social.label}
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
