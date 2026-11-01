import type { Metadata } from "next";
import { OrderForm } from "@/components/OrderForm";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { contact, orderPage, photos, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Commander",
  description:
    "Commandez votre number cake, tarte, pavlova ou vos mignardises : remplissez le formulaire et recevez un devis personnalisé de Sesia Pâtisserie.",
  alternates: { canonical: "/commander" },
};

export default function CommanderPage() {
  return (
    <>
      <PageHeader
        eyebrow={orderPage.eyebrow}
        title="Votre commande, sur mesure"
        intro={orderPage.intro}
        image={photos.dressagePoche}
        position="center 55%"
      />

      {/* Étapes */}
      <section className="border-b border-ink/8 bg-cream-50">
        <div className="container-page">
          <ol className="grid divide-y divide-ink/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {orderPage.steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 100} className="py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <p className="font-display text-sm italic text-gold">Étape 0{index + 1}</p>
                <p className="mt-2 font-display text-2xl text-ink">{step.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="rounded-[2rem] bg-cream-50 p-6 shadow-[0_30px_80px_-50px_rgba(27,22,19,0.35)] sm:p-10 lg:p-14">
                <h2 className="text-4xl text-ink sm:text-5xl">{orderPage.title}</h2>
                <p className="mt-4 text-[0.95rem] text-ink-500">Les champs marqués d&apos;un * sont obligatoires.</p>
                <div className="mt-12">
                  <OrderForm />
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-32">
              <Reveal delay={100}>
                <div className="rounded-[1.75rem] bg-ink p-8 text-cream lg:p-10">
                  <p className="eyebrow text-gold-light">Contact direct</p>
                  <ul className="mt-8 space-y-7">
                    <li>
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cream/45">Téléphone</p>
                      <a href={`tel:${contact.phoneHref}`} className="mt-1.5 block font-display text-[1.7rem] transition-colors hover:text-gold-light">
                        {contact.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cream/45">E-mail</p>
                      <a href={`mailto:${contact.email}`} className="mt-1.5 block break-all font-display text-[1.45rem] transition-colors hover:text-gold-light">
                        {contact.email}
                      </a>
                    </li>
                    <li>
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cream/45">Adresse</p>
                      <address className="mt-1.5 font-display text-[1.45rem] not-italic leading-snug">
                        {contact.addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="rounded-[1.75rem] border border-ink/10 p-8 lg:p-10">
                  <p className="eyebrow text-gold-dark">Suivez-nous</p>
                  <ul className="mt-6 divide-y divide-ink/8">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between py-3.5 text-ink-700 transition-colors hover:text-ink"
                        >
                          <span>
                            <span className="block text-sm font-medium">{social.label}</span>
                            <span className="block text-xs text-ink-400">{social.handle}</span>
                          </span>
                          <span aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            &#8599;
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
