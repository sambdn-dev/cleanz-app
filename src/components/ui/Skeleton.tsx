'use client';

import React from 'react';

export const Skeleton = ({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => <div className={`skeleton rounded-xl ${className}`} style={style} aria-hidden />;

/* Squelette d'une carte recette (miroir de RecipeCard) */
export const RecipeCardSkeleton = () => (
  <div
    className="p-4 rounded-2xl flex items-start gap-3"
    style={{ background: 'rgba(255,255,255,0.5)' }}
    aria-hidden
  >
    <Skeleton className="w-14 h-14 rounded-2xl flex-shrink-0" />
    <div className="flex-1 space-y-2 pt-1">
      <Skeleton className="h-3.5 w-2/3" />
      <Skeleton className="h-3 w-1/3 rounded-full" />
      <div className="flex gap-1.5 pt-1">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
    </div>
  </div>
);

/* Squelette d'une ligne ingrédient (miroir de IngredientCard list) */
export const IngredientRowSkeleton = () => (
  <div
    className="flex items-center gap-4 p-4 rounded-2xl"
    style={{ background: 'rgba(255,255,255,0.5)' }}
    aria-hidden
  >
    <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-3.5 w-1/2" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  </div>
);
