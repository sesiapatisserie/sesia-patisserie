import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { contact, legal, photoCredit, photos, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales et informations éditeur du site ${site.name}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

/** « Données personnelles » → « donnees-personnelles », pour les ancres. */
const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

const sections = [
  {
    title: "Éditeur du site",
    body: [
      `${legal.publisher}, ${contact.addressStreet}, ${contact.addressPostalCode} ${contact.addressLocality}, France.`,
      `Téléphone : ${contact.phoneDisplay} — E-mail : ${contact.email}`,
      "Entreprise individuelle (auto-entreprise). Numéro SIRET : 927 889 030 00015.",
    ],
  },
  {
    title: "Hébergement",
    body: [legal.hostingNote],
  },
  {
    title: "Propriété intellectuelle",
    body: [
      "L'ensemble des contenus de ce site (textes, illustrations, photographies, identité visuelle) est la propriété de l'éditeur, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
      `Photographies : ${photoCredit.name}.`,
    ],
  },
  {
    title: "Données personnelles",
    body: [
      "Les informations transmises via le formulaire de commande sont utilisées uniquement pour répondre à votre demande et ne font l'objet d'aucune cession à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données : il s'exerce par simple e-mail à l'adresse ci-dessus.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Ce site ne dépose aucun cookie publicitaire ni traceur de mesure d'audience. Seules les fonctionnalités techniques strictement nécessaires à son affichage sont utilisées.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader eyebrow="Informations" title="Mentions légales" image={photos.tarteCitronDetail} className="min-h-[52svh] lg:min-h-[56svh]" />
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-page max-w-3xl">
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title} id={slugify(section.title)} className="scroll-mt-32">
                <h2 className="text-2xl text-ink">{section.title}</h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-[0.95rem] leading-relaxed text-ink-500">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
