/**
 * Loader d'images pour l'export statique : en production, Netlify redimensionne
 * et convertit les photos à la demande (Netlify Image CDN) ; en local, les
 * fichiers de /public sont servis tels quels.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (process.env.NODE_ENV === "development" || !src.startsWith("/")) return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}
