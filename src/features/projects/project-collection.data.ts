import { portfolioProjects } from "./projects.data";

export type ProjectCollectionItem = {
  slug: string;
  title: string;
  kind: "Projet personnel" | "Projet étudiant" | "Emplacement futur";
  status: "Publié" | "À documenter";
  year: string;
  summary: string;
  tools: readonly string[];
  visual: "portfolio" | "system" | "watch" | "network" | "automation" | "blank";
  href?: string;
};

const portfolioProject = portfolioProjects[0];

export const projectCollection: readonly ProjectCollectionItem[] = [
  {
    slug: portfolioProject.slug,
    title: portfolioProject.title,
    kind: portfolioProject.kind,
    status: "Publié",
    year: "2026",
    summary: "Centraliser mon parcours, mes compétences, mes preuves BTS et ma veille dans une expérience claire pour les recruteurs.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    visual: "portfolio",
    href: `/projets/${portfolioProject.slug}`,
  },
  {
    slug: "refonte-si-hybride",
    title: "Refonte d’un système d’information hybride",
    kind: "Projet étudiant",
    status: "À documenter",
    year: "2025",
    summary: "Projet mené à l’IUT de Meaux, de l’analyse du besoin jusqu’à la livraison et à la formation des utilisateurs.",
    tools: ["Airtable", "n8n", "JavaScript", "Python"],
    visual: "system",
  },
  {
    slug: "veille-ia",
    title: "Veille automatisée sur l’IA appliquée au développement",
    kind: "Projet personnel",
    status: "À documenter",
    year: "2026",
    summary: "Collecte de sources, alertes, qualification de l’information et publication de synthèses techniques.",
    tools: ["RSS", "Alertes", "Synthèses"],
    visual: "watch",
  },
  {
    slug: "futur-reseau",
    title: "Prochain projet réseau",
    kind: "Emplacement futur",
    status: "À documenter",
    year: "—",
    summary: "Emplacement prévu pour une réalisation personnelle documentée avec architecture, configuration et preuves de fonctionnement.",
    tools: ["Architecture", "Configuration", "Tests"],
    visual: "network",
  },
  {
    slug: "future-automatisation",
    title: "Prochain projet d’automatisation",
    kind: "Emplacement futur",
    status: "À documenter",
    year: "—",
    summary: "Emplacement prévu pour présenter un besoin, un script reproductible, son dépôt et les résultats obtenus.",
    tools: ["Script", "Git", "Documentation"],
    visual: "automation",
  },
  {
    slug: "futur-libre",
    title: "Projet libre à venir",
    kind: "Emplacement futur",
    status: "À documenter",
    year: "—",
    summary: "La collection peut grandir sans modifier la structure de la page ni perdre la hiérarchie des projets déjà publiés.",
    tools: ["Contexte", "Démarche", "Résultat"],
    visual: "blank",
  },
];
