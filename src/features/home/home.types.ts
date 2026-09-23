export type HomeProof = {
  value: string;
  label: string;
};

export type HomeSkillProof = {
  label: string;
  status: "Mission réalisée" | "Réalisation en cours" | "Projet en cours";
  href: string;
};

export type HomeSkill = {
  title: string;
  context: string;
  summary: string;
  practices: readonly string[];
  tools: readonly string[];
  proofs: readonly HomeSkillProof[];
};

export type HomeE6Project = {
  slug: string;
  title: string;
  status: "En cours";
  summary: string;
  proofs: readonly string[];
};
