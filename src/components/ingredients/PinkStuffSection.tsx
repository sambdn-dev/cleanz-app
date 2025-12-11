'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { ExternalLink, Star, Sparkles } from 'lucide-react';

interface PinkStuffProduct {
  id: number;
  nom: string;
  description: string;
  image: string;
  prix: string;
  badge?: string;
  url: string;
}

const PINKSTUFF_PRODUCTS: PinkStuffProduct[] = [
  {
    id: 1,
    nom: 'La Pâte Nettoyante Miracle',
    description: 'Pâte abrasive douce multi-usages qui fonctionne instantanément sur toutes les surfaces.',
    image: '/partners/pinkstuff/paste.png',
    prix: '5,99€',
    badge: 'Best-seller',
    url: 'https://www.pinkstuff.fr/'
  },
  {
    id: 2,
    nom: 'La Crème Nettoyante Miracle',
    description: 'Nettoyant liquide polyvalent et efficace pour toutes les surfaces dures.',
    image: '/partners/pinkstuff/cream.png',
    prix: '4,99€',
    url: 'https://www.pinkstuff.fr/'
  },
  {
    id: 3,
    nom: 'Le Nettoyant Multi-Usages Miracle',
    description: 'Spray polyvalent efficace pour enlever la graisse et la crasse avec facilité.',
    image: '/partners/pinkstuff/spray.png',
    prix: '4,49€',
    badge: 'Populaire',
    url: 'https://www.pinkstuff.fr/'
  },
  {
    id: 4,
    nom: 'Nettoyant Vitres au Vinaigre de Rose',
    description: 'Brillance sans traces grâce à la puissance du vinaigre de rose.',
    image: '/partners/pinkstuff/glass.png',
    prix: '4,99€',
    url: 'https://www.pinkstuff.fr/'
  }
];

// Couleurs Pink Stuff
const PINKSTUFF_COLORS = {
  pink: '#E91E8C',
  lightPink: '#FCE4EC',
  yellow: '#FFC107',
  greyPink: '#F8BBD9',
  white: '#FFFFFF'
};

export const PinkStuffSection = () => {
  const { theme, darkMode } = useTheme();

  const handleProductClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-8 mb-6">
      {/* Header avec logo partenaire */}
      <div
        className="p-4 rounded-t-2xl"
        style={{
          background: `linear-gradient(135deg, ${PINKSTUFF_COLORS.pink} 0%, ${PINKSTUFF_COLORS.greyPink} 100%)`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white text-xs font-medium uppercase tracking-wider">
              Partenaire
            </span>
          </div>
          <a
            href="https://www.pinkstuff.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/80 text-[10px] hover:text-white transition-colors"
          >
            Voir le site
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg"
            style={{
              background: PINKSTUFF_COLORS.white,
              color: PINKSTUFF_COLORS.pink
            }}
          >
            PS
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">The Pink Stuff</h3>
            <p className="text-white/80 text-xs">99% d'ingrédients naturels</p>
          </div>
        </div>
      </div>

      {/* Produits */}
      <div
        className="p-4 rounded-b-2xl"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.05)' : PINKSTUFF_COLORS.lightPink,
          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : PINKSTUFF_COLORS.greyPink}`,
          borderTop: 'none'
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          {PINKSTUFF_PRODUCTS.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.url)}
              className="p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.08)' : PINKSTUFF_COLORS.white,
                boxShadow: darkMode
                  ? '0 2px 8px rgba(0,0,0,0.2)'
                  : '0 2px 8px rgba(233,30,140,0.1)'
              }}
            >
              {/* Image placeholder */}
              <div
                className="w-full aspect-square rounded-lg mb-2 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${PINKSTUFF_COLORS.lightPink} 0%, ${PINKSTUFF_COLORS.greyPink} 100%)`
                }}
              >
                {/* Badge */}
                {product.badge && (
                  <div
                    className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold"
                    style={{
                      background: PINKSTUFF_COLORS.yellow,
                      color: '#000'
                    }}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Placeholder icon */}
                <div
                  className="text-3xl font-black"
                  style={{ color: PINKSTUFF_COLORS.pink }}
                >
                  {product.id === 1 && '🫧'}
                  {product.id === 2 && '🧴'}
                  {product.id === 3 && '✨'}
                  {product.id === 4 && '🪟'}
                </div>
              </div>

              {/* Nom du produit */}
              <h4
                className="font-bold text-[11px] leading-tight mb-1 line-clamp-2"
                style={{ color: darkMode ? theme.textPrimary : '#333' }}
              >
                {product.nom}
              </h4>

              {/* Prix */}
              <div className="flex items-center justify-between">
                <span
                  className="font-bold text-sm"
                  style={{ color: PINKSTUFF_COLORS.pink }}
                >
                  {product.prix}
                </span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-2.5 h-2.5"
                      style={{
                        color: PINKSTUFF_COLORS.yellow,
                        fill: PINKSTUFF_COLORS.yellow
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://www.pinkstuff.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all hover:opacity-90"
          style={{
            background: `linear-gradient(135deg, ${PINKSTUFF_COLORS.pink} 0%, #C2185B 100%)`,
            color: PINKSTUFF_COLORS.white
          }}
        >
          Découvrir tous les produits
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
