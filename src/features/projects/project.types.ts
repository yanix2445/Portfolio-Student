export type ProjectEvidence = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  kind: "Projet personnel" | "Projet étudiant";
  status: "En cours" | "Terminé";
  problem: string;
  contribution: readonly string[];
  approach: readonly string[];
  result: string;
  tools: readonly string[];
  evidence: readonly ProjectEvidence[];
};
