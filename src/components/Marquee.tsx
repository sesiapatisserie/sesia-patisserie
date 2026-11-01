export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink/8 bg-cream-50 py-7" aria-hidden>
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap will-change-transform">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-14 font-display text-[1.75rem] italic leading-none text-ink-700"
          >
            {item}
            <span className="text-sm not-italic text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
