import Image from "next/image";

export function HomeProfilePortrait() {
  return (
    <div className="order-2">
      <figure className="relative mx-auto aspect-[4/5] max-w-xl">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio-hero.webp"
            alt="Yanis Harrat de profil dans une lumière orange"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 92vw"
            className="object-cover object-[68%_center]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "linear-gradient(to right, var(--home-bg) 0%, rgba(5,5,5,0.82) 7%, transparent 22%, transparent 78%, rgba(5,5,5,0.82) 93%, var(--home-bg) 100%)",
                "linear-gradient(to bottom, var(--home-bg) 0%, rgba(5,5,5,0.74) 7%, transparent 20%, transparent 62%, rgba(5,5,5,0.86) 82%, var(--home-bg) 100%)",
              ].join(", "),
            }}
            aria-hidden="true"
          />
        </div>
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-8">
          <div className="max-w-xs">
            <p className="text-xs font-medium text-white/60">Poste recherché</p>
            <p className="mt-2 text-base leading-6 font-semibold text-white text-pretty">
              Technicien support systèmes &amp; réseaux
            </p>
          </div>
          <span className="mb-0.5 inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-white">
            <span className="size-2 rounded-full bg-[var(--home-accent)] shadow-[0_0_0_4px_rgba(255,122,0,0.16)]" aria-hidden="true" />
            Disponible
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
