import Image from "next/image";
import { Button } from "@/components/Button";
import { photos } from "@/content/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink py-32">
      <Image
        src={photos.partTarteCitron.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-35"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
      <div className="container-page text-center">
        <p className="eyebrow text-gold-light">Erreur 404</p>
        <h1 className="mt-6 text-[clamp(2.8rem,8vw,5.5rem)] leading-[1] text-cream">
          Cette page a été <em className="text-gold-light">dégustée</em>
        </h1>
        <p className="mx-auto mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-cream/70">
          La page que vous cherchez n&apos;existe plus ou a changé d&apos;adresse.
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="light">
            Retour à l&apos;accueil
          </Button>
          <Button href="/creations" variant="glass">
            Nos créations
          </Button>
        </div>
      </div>
    </section>
  );
}
