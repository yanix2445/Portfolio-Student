import { E6List } from "@/features/bts-e6";

export default function E6Page() {
  return (
    <main>
      <header className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <p className="section-label">BTS SIO SISR · E6</p>
          <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            Administration des systèmes et des réseaux.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">
            Deux réalisations professionnelles documentées selon leur état réel. Elles restent marquées en cours tant que leurs tests et leurs preuves ne sont pas terminés.
          </p>
        </div>
      </header>
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-label="Réalisations E6">
        <div className="mx-auto w-full max-w-[90rem]">
          <E6List />
        </div>
      </section>
    </main>
  );
}
