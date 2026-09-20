import { siteConfig } from "@/shared/config/site.config";

export function ProfileJsonLd() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Technicien support systèmes et réseaux",
    address: {
      "@type": "PostalAddress",
      addressRegion: siteConfig.location,
      addressCountry: "FR",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Fénelon Sup Paris",
    },
    sameAs: [siteConfig.githubUrl, siteConfig.linkedInUrl],
    knowsAbout: [
      "Support informatique",
      "Administration système",
      "Réseaux informatiques",
      "Windows Server",
      "Linux",
      "Cybersécurité",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(profile).replace(/</g, "\\u003c"),
      }}
    />
  );
}
