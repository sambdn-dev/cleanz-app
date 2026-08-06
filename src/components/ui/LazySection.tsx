'use client';

import { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface LazySectionProps {
  children: ReactNode;
  /**
   * Hauteur réservée tant que la section n'est pas montée. Elle évite que le
   * contenu situé en dessous ne saute au moment de l'affichage.
   */
  minHeight?: number;
  /** Distance d'anticipation : la section se monte avant d'être à l'écran. */
  marge?: string;
}

/**
 * PERFORMANCE — n'assemble une section qu'à l'approche du regard.
 *
 * L'accueil empile une dizaine de sections. Tout hydrater d'un bloc au
 * démarrage occupe le processeur pendant plus d'une seconde sur un téléphone
 * modeste, alors que l'utilisateur ne voit que le haut de l'écran. Chaque
 * section enveloppée ici n'est construite qu'au moment où l'on s'en approche,
 * ce qui étale ce travail au lieu de le concentrer au lancement.
 *
 * Associé à un `next/dynamic`, le code de la section n'est même pas téléchargé
 * avant d'être nécessaire.
 */
export const LazySection = ({ children, minHeight = 220, marge = '300px 0px' }: LazySectionProps) => {
  const [ref, visible] = useInView<HTMLDivElement>({
    threshold: 0,
    rootMargin: marge,
    triggerOnce: true,
  });

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }} aria-busy={!visible}>
      {visible ? children : null}
    </div>
  );
};
