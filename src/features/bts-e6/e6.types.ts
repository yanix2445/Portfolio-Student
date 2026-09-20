export type E6Realization = {
  slug: string;
  title: string;
  status: "En cours";
  summary: string;
  context: string;
  objective: string;
  plannedScope: readonly string[];
  currentWork: readonly string[];
  tools: readonly string[];
  competencies: readonly string[];
  availableEvidence: readonly string[];
  result: null;
};
