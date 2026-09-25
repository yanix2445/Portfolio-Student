export type Experience = {
  slug: string;
  organization: string;
  period: string;
  role: string;
  location?: string;
  type: "Stage" | "Projet universitaire" | "Emploi";
  domain: "Support informatique" | "Systèmes et réseaux" | "Système d’information" | "Service client" | "Réseaux télécoms";
  context: string;
  summary: string;
  highlights: readonly string[];
  tools: readonly string[];
  missionSlugs?: readonly string[];
  evidenceNote?: string;
};
