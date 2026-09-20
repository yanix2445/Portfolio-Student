import type { Experience } from "./experience.types";

export const experiences: readonly Experience[] = [
  {
    slug: "edlearn",
    organization: "EDLearn",
    period: "Février — avril 2026",
    role: "Technicien support systèmes et réseaux",
    location: "Île-de-France",
    summary:
      "Support utilisateurs, administration de Google Workspace, audit Wi-Fi et participation à la migration de services d’impression.",
    missionSlugs: [
      "migration-serveur-impression-cloud",
      "audit-reseau-wifi",
      "support-n1-n2-google-workspace",
    ],
  },
  {
    slug: "secours-catholique",
    organization: "Secours Catholique-Caritas France",
    period: "Juin — septembre 2026",
    role: "Technicien support systèmes et réseaux",
    location: "Île-de-France",
    summary:
      "Gestion du parc, accès distant et participation à la migration de services de fichiers dans un contexte associatif national.",
    missionSlugs: [
      "enrolement-postes-suivi-parc",
      "vpn-acces-distant",
      "migration-serveur-fichiers-cloud",
    ],
  },
];
