export type SkillLevel =
  | "Autonome"
  | "Opérationnel"
  | "En cours d’approfondissement";

export type SkillDomain = {
  slug: string;
  title: string;
  level: SkillLevel;
  summary: string;
  practices: readonly string[];
  tools: readonly string[];
};
