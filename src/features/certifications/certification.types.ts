export type CertificationKind =
  | "Certificat professionnel"
  | "Certificat de cours"
  | "Formation";

export type CertificationBadge =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "text";
      mark: string;
    };

export type Certification = {
  slug: string;
  title: string;
  issuer: "Google" | "Cisco Networking Academy" | "Anthropic";
  kind: CertificationKind;
  featured: boolean;
  issued: string;
  description: string;
  badge: CertificationBadge;
};
