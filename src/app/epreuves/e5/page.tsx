import { E5List } from "@/features/bts-e5";

export default function E5Page() {
  return (
    <main>
      <header className="border-b border-white/10 bg-[#0b0b0b] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <p className="section-label">BTS SIO SISR · E5</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            Support et mise à disposition de services informatiques.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">
            Six réalisations menées en stage, regroupées par organisation et reliées aux compétences mobilisées.
          </p>
        </div>
      </header>
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-label="Réalisations E5">
        <div className="mx-auto w-full max-w-[90rem]">
          <E5List />
        </div>
      </section>
    </main>
  );
}
