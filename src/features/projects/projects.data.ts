import type { PortfolioProject } from "./project.types";

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    slug: "portfolio-professionnel",
    title: "Portfolio professionnel multipage",
    kind: "Projet personnel",
    status: "En cours",
    problem:
      "Rassembler mon parcours, mes compétences, mes preuves BTS et ma veille dans une expérience claire pour un recruteur comme pour un jury.",
    contribution: [
      "Cadrage du besoin et définition du parcours recruteur",
      "Conception de l’architecture par feature et du système visuel",
      "Développement des pages et des composants accessibles",
      "Versionnement, tests et déploiement continu",
    ],
    approach: [
      "Formaliser le brief, la spécification et un plan AIDD vérifiable",
      "Construire le site par phases autonomes",
      "Tester les parcours critiques et la confidentialité des preuves",
      "Déployer les versions validées sur Vercel",
    ],
    result:
      "Le site est consultable pendant sa construction. Les rubriques sont publiées progressivement avec leur état réel.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GitHub", "Vercel"],
    evidence: [
      {
        label: "Dépôt GitHub",
        href: "https://github.com/yanix2445/Portfolio-Student",
      },
      {
        label: "Déploiement Vercel",
        href: "https://portfolio-student-ten.vercel.app",
      },
    ],
    visual: {
      src: "/images/projects/portfolio-overview.webp",
      alt: "Aperçu réel de l’accueil du portfolio de Yanis Harrat",
      width: 1600,
      height: 1000,
    },
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
