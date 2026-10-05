import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/veille/nextjs-mcp-agents-developpement",
        destination: "/veille/ia-diagnostic-reseau-cisco-catalyst",
        permanent: true,
      },
      {
        source: "/veille/integrer-ia-frontieres-serveur",
        destination: "/veille/security-copilot-intune-administration",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
