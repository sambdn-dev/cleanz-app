'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { BottomNav, NavTab } from '@/components/layout/BottomNav';
import { SearchBar } from '@/components/layout/SearchBar';
import { CategoryTabs } from '@/components/layout/CategoryTabs';
import { SpraysSection } from '@/components/home/SpraysSection';
import { SurfacesGrid } from '@/components/home/SurfacesGrid';
import { EssentielsSection } from '@/components/home/EssentielsSection';
import { SURFACES, SURFACES_POPULAIRES } from '@/data/surfaces';
import { Surface, Spray, Ingredient } from '@/types';

export default function HomePage() {
  const { theme, darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('Accueil');
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSurfaces, setShowAllSurfaces] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // États pour les modals (à implémenter)
  const [selectedSurface, setSelectedSurface] = useState<Surface | null>(null);
  const [selectedSpray, setSelectedSpray] = useState<Spray | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filtrage des surfaces
  const getFilteredSurfaces = () => {
    let surfaces = showAllSurfaces ? SURFACES : SURFACES_POPULAIRES;

    if (activeCategory !== 'Tout') {
      surfaces = SURFACES.filter(s => s.categorie === activeCategory);
    }

    if (searchQuery) {
      surfaces = SURFACES.filter(s =>
        s.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.piece?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return surfaces;
  };

  const handleCategoryChange = (tab: string) => {
    setActiveCategory(tab);
    if (tab !== 'Tout') setShowAllSurfaces(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: theme.bgPrimary }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!darkMode && (
          <>
            <div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.5) 0%, transparent 70%)', filter: 'blur(40px)' }}
            />
            <div
              className="absolute -top-10 right-0 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(173,216,230,0.5) 0%, transparent 70%)', filter: 'blur(35px)' }}
            />
            <div
              className="absolute top-20 left-1/2 w-56 h-56 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(221,160,221,0.4) 0%, transparent 70%)', filter: 'blur(45px)' }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-4 pb-24">
        {/* Header */}
        <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Header onAccountClick={() => setShowAccountMenu(true)} />
        </div>

        {activeNavTab === 'Accueil' && (
          <>
            {/* Search Bar */}
            <div className={`mb-4 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Category Tabs */}
            <div className={`mb-4 transition-all duration-700 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CategoryTabs activeTab={activeCategory} onTabChange={handleCategoryChange} />
            </div>

            {/* Sprays Section */}
            <SpraysSection onSprayClick={setSelectedSpray} />

            {/* Surfaces Grid */}
            <SurfacesGrid
              surfaces={getFilteredSurfaces()}
              showAll={showAllSurfaces}
              onToggleShowAll={() => setShowAllSurfaces(!showAllSurfaces)}
              onSurfaceClick={setSelectedSurface}
            />

            {/* Les 7 Essentiels */}
            <EssentielsSection
              onIngredientClick={setSelectedIngredient}
              onViewAll={() => setActiveNavTab('Ingrédients')}
            />
          </>
        )}

        {activeNavTab === 'Appareils' && (
          <div className="pt-4 text-center" style={{ color: theme.textMuted }}>
            <p>Page Appareils - À venir</p>
          </div>
        )}

        {activeNavTab === 'Scan IA' && (
          <div className="pt-4 text-center" style={{ color: theme.textMuted }}>
            <p>Page Scan IA - À venir</p>
          </div>
        )}

        {activeNavTab === 'Recettes' && (
          <div className="pt-4 text-center" style={{ color: theme.textMuted }}>
            <p>Page Recettes - À venir</p>
          </div>
        )}

        {activeNavTab === 'Ingrédients' && (
          <div className="pt-4 text-center" style={{ color: theme.textMuted }}>
            <p>Page Ingrédients - À venir</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeNavTab} onTabChange={setActiveNavTab} />

      {/* TODO: Modals */}
      {selectedSurface && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSurface(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <p className="text-2xl mb-2">{selectedSurface.emoji}</p>
            <h3 className="font-bold text-lg">{selectedSurface.nom}</h3>
            <p className="text-gray-500 text-sm">{selectedSurface.piece} • {selectedSurface.frequence}</p>
            <button onClick={() => setSelectedSurface(null)} className="mt-4 w-full py-2 bg-gray-100 rounded-xl">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
