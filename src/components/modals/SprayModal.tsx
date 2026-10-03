'use client';

import type { Spray } from '@/types';
import { RecipeModal } from '@/components/modals/RecipeModal';

/** Même contenu et même garde que le catalogue, avec identité QR historique. */
export const SprayModal = ({ spray, onClose }: { spray: Spray; onClose: () => void }) => (
  <RecipeModal recipeId={spray.id} recipeType="spray" onClose={onClose} />
);
