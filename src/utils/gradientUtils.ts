/**
 * Utilitaires pour la gestion des gradients et la détection de couleurs claires/foncées
 * Utilisé pour déterminer si le texte doit être clair ou foncé sur un fond dégradé
 */

/**
 * Détermine si une couleur hexadécimale est claire
 * @param hex - Couleur au format hexadécimal (avec ou sans #)
 * @returns true si la couleur est claire, false sinon
 */
export const isLightColor = (hex: string): boolean => {
  // Retirer le # si présent
  const color = hex.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  // Formule de luminance relative (perception humaine)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7; // Seuil pour considérer la couleur comme claire
};

/**
 * Extrait les couleurs d'un gradient CSS et détermine si le texte doit être sombre
 * @param gradient - Chaîne CSS du gradient (ex: "linear-gradient(135deg, #E8E8E8 0%, #D4D4D4 100%)")
 * @returns true si le texte doit être sombre (fond clair), false sinon
 */
export const shouldUseDarkText = (gradient: string): boolean => {
  // Extraire les couleurs hex du gradient
  const hexColors = gradient.match(/#[A-Fa-f0-9]{6}/g);
  if (!hexColors || hexColors.length === 0) return false;

  // Vérifier si toutes les couleurs sont claires
  return hexColors.every(color => isLightColor(color));
};
