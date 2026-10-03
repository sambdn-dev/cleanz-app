import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  images: {
    // Next 16 n'autorise que les qualités explicitement listées. On garde 75 par
    // défaut et on ouvre des paliers plus légers pour les images décoratives
    // (fond du splash, bannières floutées) où la différence est invisible.
    qualities: [45, 55, 65, 75],
  },
  env: {
    // Identifiant de build (SHA du commit Vercel) exposé au client.
    // Sert à « buster » le service worker à chaque déploiement → déclenche
    // la détection de mise à jour (prompt « Nouvelle version disponible »).
    NEXT_PUBLIC_BUILD_ID:
      process.env.VERCEL_GIT_COMMIT_SHA ||
      process.env.NEXT_PUBLIC_BUILD_ID ||
      'dev',
    // La branche d'essai se met à jour aussi depuis l'écran d'accueil du téléphone.
    NEXT_PUBLIC_PREVIEW_AUTO_UPDATE:
      process.env.VERCEL_GIT_COMMIT_REF === 'codex/apercu-iphone' ? '1' : '0',
  },
};

export default nextConfig;
