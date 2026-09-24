export type SkillProofStatus =
  | "Mission réalisée"
  | "Réalisation en cours"
  | "Projet en cours";

export type SkillProofSource = "E5" | "E6" | "Projet";

export type SkillProof = {
  label: string;
  status: SkillProofStatus;
  source: SkillProofSource;
  sourceLabel: string;
  href: string;
};

export type SkillDomain = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  practices: readonly string[];
  tools: readonly string[];
  proofs: readonly SkillProof[];
};
