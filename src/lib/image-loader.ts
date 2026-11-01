/**
 * Loader d'images pour l'export statique : en production, les photos sont
 * servies dans leurs versions WebP pré-générées par scripts/optimize-images.mjs
 * (public/img) ; en local, les fichiers de /public sont servis tels quels.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (process.env.NODE_ENV === "development" || !src.startsWith("/photos/")) return src;
  const name = src.replace(/^\/photos\//, "").replace(/\.[a-z]+$/i, "");
  return `/img/${name}-${width}.webp`;
}
