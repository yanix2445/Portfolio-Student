export type E5Evidence = {
  label: string;
  publication: "En préparation" | "Publiable";
};

export type E5Mission = {
  slug: string;
  title: string;
  organization: "EDLearn" | "Secours Catholique-Caritas France";
  period: string;
  status: "Réalisée";
  context: string;
  need: string;
  contribution: readonly string[];
  tools: readonly string[];
  approach: readonly string[];
  difficulties: readonly string[];
  result: string;
  evidence: readonly E5Evidence[];
  competencies: readonly string[];
};
