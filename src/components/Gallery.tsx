"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { gallery, galleryCategories } from "@/content/site";
import { cn } from "@/lib/utils";

type Category = (typeof galleryCategories)[number];

/** Galerie filtrable en mosaïque, avec visionneuse plein écran (clavier et swipe). */
export function Gallery() {
  const [category, setCategory] = useState<Category>("Tout");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (category === "Tout" ? gallery : gallery.filter((item) => item.category === category)),
    [category],
  );

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((current) => (current === null ? null : (current + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const [touchX, setTouchX] = useState<number | null>(null);
  const current = index === null ? null : items[index];

  return (
    <>
      <div className="hide-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {galleryCategories.map((name) => {
          const count = name === "Tout" ? gallery.length : gallery.filter((item) => item.category === name).length;
          const active = name === category;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={active}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-all duration-300",
                active
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/15 text-ink-500 hover:border-ink/40 hover:text-ink",
              )}
            >
              {name}
              <span className={cn("text-[0.62rem]", active ? "text-gold-light" : "text-ink-400")}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-12 columns-2 gap-3 sm:gap-5 lg:columns-3">
        {items.map((item, i) => (
          <li
            key={`${category}-${item.src}`}
            className="mb-3 break-inside-avoid sm:mb-5"
            style={{ animation: `fade-up 0.8s cubic-bezier(0.22,1,0.36,1) ${Math.min(i, 8) * 60}ms both` }}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-sand text-left"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 30vw, 48vw"
                className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span>
                  <span className="eyebrow block text-[0.58rem] text-gold-light">{item.category}</span>
                  <span className="mt-1 block font-display text-xl text-cream">{item.title}</span>
                </span>
                <span aria-hidden className="text-lg text-cream">
                  +
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/96 backdrop-blur-sm"
          style={{ animation: "fade-in 0.4s ease-out both" }}
          onClick={close}
          onTouchStart={(event) => setTouchX(event.touches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchX === null) return;
            const delta = event.changedTouches[0].clientX - touchX;
            if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          <div className="flex items-center justify-between px-5 py-5 text-cream sm:px-8">
            <p className="text-xs tracking-[0.2em] text-cream/60">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-xl transition-colors hover:bg-cream hover:text-ink"
            >
              <span className="sr-only">Fermer</span>
              <span aria-hidden>&times;</span>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-24">
            <div className="relative h-full w-full" onClick={(event) => event.stopPropagation()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                style={{ animation: "fade-in 0.5s ease-out both" }}
              />
            </div>

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-ink sm:flex"
                >
                  <span className="sr-only">Photo précédente</span>
                  <span aria-hidden>&larr;</span>
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-ink sm:flex"
                >
                  <span className="sr-only">Photo suivante</span>
                  <span aria-hidden>&rarr;</span>
                </button>
              </>
            ) : null}
          </div>

          <div className="px-5 pb-7 text-center" onClick={(event) => event.stopPropagation()}>
            <p className="eyebrow text-[0.6rem] text-gold-light">{current.category}</p>
            <p className="mt-2 font-display text-2xl text-cream">{current.title}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
