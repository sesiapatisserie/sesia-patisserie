import { goodToKnow } from "@/content/site";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function GoodToKnow() {
  return (
    <section className="bg-sand py-24 lg:py-36">
      <div className="container-page">
        <SectionHeading eyebrow={goodToKnow.eyebrow} title={goodToKnow.title} align="center" />

        <div className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20">
          {goodToKnow.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 110}>
              <article className="flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-9 lg:p-11">
                <span className="font-display text-5xl italic leading-none text-gold/70">
                  0{index + 1}
                </span>
                <h3 className="mt-10 text-[1.9rem] leading-tight text-ink">{item.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-[1.8] text-ink-500">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center text-center">
            <p className="font-display text-2xl italic leading-snug text-ink-700">
              {goodToKnow.closing}
            </p>
            <Button href="/commander" className="mt-10">
              Obtenir mon devis
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
