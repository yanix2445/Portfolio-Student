import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[70svh] place-items-center px-5 py-20 sm:px-8 lg:px-12">
      <div className="w-full max-w-3xl border border-white/12 bg-[#0b0b0b] p-8 sm:p-12">
        <Search aria-hidden="true" className="size-8 text-brand" />
        <p className="section-label mt-8">Erreur 404</p>
        <h1 className="mt-6 text-5xl font-medium tracking-[-0.05em] sm:text-7xl">
          Cette page n’existe pas.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">
          Le contenu a peut-être été déplacé. L’accueil permet de retrouver les compétences, les épreuves BTS, les projets et la veille.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center gap-2 bg-brand px-5 text-sm font-semibold text-brand-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Revenir à l’accueil
        </Link>
      </div>
    </main>
  );
}
