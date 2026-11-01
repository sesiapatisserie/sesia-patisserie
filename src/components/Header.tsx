"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, contact, nav, socials } from "@/content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Logo";

/** Pages qui s'ouvrent sur un fond clair : l'en-tête y reste foncé dès le haut de page. */
const lightTopRoutes = ["/", "/a-propos", ...categories.map((category) => category.href)];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled && !open;
  const tone = open ? "light" : solid || lightTopRoutes.includes(pathname) ? "dark" : "light";

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : href === "/creations"
        ? pathname === href || categories.some((category) => category.href === pathname)
        : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
        solid ? "border-b border-ink/8 bg-cream/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between transition-[height] duration-500",
          solid ? "h-18" : "h-22",
        )}
      >
        <Link href="/" aria-label="Sesia Pâtisserie — accueil" className="relative z-10 shrink-0">
          <Wordmark tone={tone} />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            const linkClass = cn(
              "relative flex items-center gap-1.5 py-2 text-[0.74rem] font-normal uppercase tracking-[0.2em] transition-colors duration-300",
              tone === "light"
                ? active
                  ? "text-cream"
                  : "text-cream/70 hover:text-cream"
                : active
                  ? "text-ink"
                  : "text-ink-500 hover:text-ink",
            );
            const underline = (
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  tone === "light" ? "bg-gold-light" : "bg-gold",
                  active ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            );

            if (!("children" in item) || !item.children) {
              return (
                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("group", linkClass)}>
                  {item.label}
                  {underline}
                </Link>
              );
            }

            return (
              <div key={item.href} className="group relative">
                <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass}>
                  {item.label}
                  <svg aria-hidden viewBox="0 0 10 6" className="h-1.5 w-2.5 transition-transform duration-300 group-hover:rotate-180">
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  {underline}
                </Link>

                {/* Sous-menu */}
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="w-72 rounded-[1.4rem] border border-ink/8 bg-cream-50 p-2 shadow-[0_30px_60px_-30px_rgba(27,22,19,0.4)]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors hover:bg-sand"
                        >
                          <span>
                            <span className="block font-display text-xl text-ink">{child.label}</span>
                            <span className="block text-xs text-ink-400">{child.text}</span>
                          </span>
                          <span aria-hidden className="text-ink-400">&rarr;</span>
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-ink/8 pt-1">
                      <Link
                        href="/creations"
                        className="block rounded-2xl px-4 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-gold-dark transition-colors hover:bg-sand"
                      >
                        Voir toutes nos créations
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/commander"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-all duration-500",
              tone === "light"
                ? "border border-cream/35 text-cream hover:border-cream hover:bg-cream hover:text-ink"
                : "bg-ink text-cream hover:bg-gold-dark",
            )}
          >
            Commander
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span aria-hidden className="relative block h-3 w-7">
            <span
              className={cn(
                "absolute right-0 h-px w-7 transition-all duration-500",
                tone === "light" ? "bg-cream" : "bg-ink",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute right-0 h-px transition-all duration-500",
                tone === "light" ? "bg-cream" : "bg-ink",
                open ? "top-1.5 w-7 -rotate-45" : "top-3 w-5",
              )}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile & tablette, plein écran */}
      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-0 overflow-y-auto bg-ink transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Navigation mobile" className="container-page flex min-h-full flex-col justify-between gap-12 pt-28 pb-10">
          <ul>
            {[...nav, { label: "Commander", href: "/commander" }].map((item, index) => (
              <li
                key={item.href}
                className="border-b border-cream/10"
                style={open ? { animation: `fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${120 + index * 70}ms both` } : undefined}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 font-display text-[2.2rem] leading-none text-cream"
                >
                  {item.label}
                  <span className="text-xs tracking-[0.2em] text-gold-light/60">0{index + 1}</span>
                </Link>
                {"children" in item && item.children ? (
                  <ul className="-mt-1 flex flex-wrap gap-2 pb-5">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/75"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="space-y-4 text-sm text-cream/60">
            <a href={`tel:${contact.phoneHref}`} className="block text-cream">
              {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`} className="block">
              {contact.email}
            </a>
            <div className="flex gap-6 pt-2">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="eyebrow text-gold-light">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
