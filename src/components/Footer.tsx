import Link from "next/link";
import { categories, contact, nav, photoCredit, site, socials } from "@/content/site";
import { Wordmark } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink text-cream">
      <div className="container-page relative z-10">
        {/* Appel à l'action */}
        <div className="flex flex-col items-start justify-between gap-10 border-b border-cream/10 py-20 lg:flex-row lg:items-end lg:py-28">
          <div>
            <p className="eyebrow text-gold-light">Une envie, un événement ?</p>
            <p className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02]">
              Créons ensemble la pâtisserie <em className="text-gold-light">de votre moment</em>.
            </p>
          </div>
          <Link
            href="/commander"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-cream px-9 py-5 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:bg-gold-light"
          >
            Demander un devis
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        <div className="grid gap-14 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <Wordmark tone="light" />
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-cream/55">{site.tagline}. Créations personnalisées pour tous vos événements spéciaux, en Vendée.</p>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-gold-light/80">Navigation</p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                nav[0],
                ...categories.map((category) => ({ label: category.title, href: category.href })),
                ...nav.slice(2),
                { label: "Commander", href: "/commander" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/65 transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-gold-light/80">Contact</p>
            <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed text-cream/65">
              <p>
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p>
                <a href={`tel:${contact.phoneHref}`} className="transition-colors hover:text-cream">
                  {contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-cream">
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-gold-light/80">Suivez-nous</p>
            <ul className="mt-6 space-y-3 text-sm">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-cream/10 pb-3 text-cream/65 transition-colors hover:text-cream"
                  >
                    {social.label}
                    <span aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      &#8599;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 py-8 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <p>
              Photos&nbsp;:{" "}
              <a href={photoCredit.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-cream">
                {photoCredit.name}
              </a>
            </p>
            <Link href="/mentions-legales" className="transition-colors hover:text-cream">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
