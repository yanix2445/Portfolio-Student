export type HomeProof = {
  value: string;
  label: string;
};

export type HomeSkill = {
  title: string;
  level: "Autonome" | "Opérationnel" | "En cours d’approfondissement";
  summary: string;
  tools: readonly string[];
};

export type HomeExperience = {
  organization: string;
  period: string;
  role: string;
  missions: readonly string[];
};

export type HomeE6Project = {
  title: string;
  status: "En cours";
  summary: string;
};

export type HomeProject = {
  title: string;
  kind: string;
  summary: string;
  evidence: string;
};

export type HomeCertification = {
  title: string;
  issuer: string;
  kind: "Certificat professionnel" | "Certification" | "Formation";
};
