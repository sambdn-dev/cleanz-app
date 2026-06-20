import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Permet à Turbopack d'utiliser le magasin de certificats système
    // (nécessaire derrière certains proxys TLS pour récupérer next/font).
    turbopackUseSystemTlsCerts: true,
  },
  env: {
    // Identifiant de build (SHA du commit Vercel) exposé au client.
    // Sert à « buster » le service worker à chaque déploiement → déclenche
    // la détection de mise à jour (prompt « Nouvelle version disponible »).
    NEXT_PUBLIC_BUILD_ID:
      process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ||
      process.env.NEXT_PUBLIC_BUILD_ID ||
      'dev',
  },
};

export default nextConfig;
