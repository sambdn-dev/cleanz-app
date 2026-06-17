import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Permet à Turbopack d'utiliser le magasin de certificats système
    // (nécessaire derrière certains proxys TLS pour récupérer next/font).
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
