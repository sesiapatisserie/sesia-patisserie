import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { photos, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Une sélection de créations Sesia Pâtisserie : number cakes, tartes, pavlovas et mignardises faites maison.",
  alternates: { canonical: "/portfolio" },
};

export default function GaleriePage() {
  const instagram = socials.find((social) => social.label === "Instagram");

  return (
    <>
      <PageHeader
        eyebrow="Mes créations"
        title="Portfolio"
        intro="Bienvenue sur mon portfolio. Vous trouverez ici une sélection de mes créations."
        image={photos.tarteDressageMains}
        position="center 60%"
      />

      <section className="bg-cream py-20 lg:py-28">
        <div className="container-page">
          <Gallery />

          {instagram ? (
            <Reveal>
              <div className="mt-20 flex flex-col items-center text-center">
                <p className="eyebrow text-gold-dark">Encore plus de douceurs</p>
                <p className="mt-5 font-display text-4xl text-ink">Suivez-nous sur Instagram</p>
                <Button href={instagram.href} variant="outline" className="mt-8">
                  {instagram.handle}
                </Button>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>
    </>
  );
}
