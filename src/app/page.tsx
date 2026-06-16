'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { BottomNav, NavTab } from '@/components/layout/BottomNav';
import { SearchBar } from '@/components/layout/SearchBar';
import { CategoryTabs } from '@/components/layout/CategoryTabs';
import { SpraysHeroGrid } from '@/components/home/SpraysHeroGrid';
import { SurfacesGrid } from '@/components/home/SurfacesGrid';
import { EssentielsSection } from '@/components/home/EssentielsSection';
import { EntretienSection } from '@/components/home/EntretienSection';
import { LeSaviezVousSection } from '@/components/home/LeSaviezVousSection';
import { AstucesSection } from '@/components/home/AstucesSection';
import { ImpactStrip } from '@/components/home/ImpactStrip';
import { AppareilsPage } from '@/components/appareils/AppareilsPage';
import { SprayModal } from '@/components/modals/SprayModal';
import { SurfaceModal } from '@/components/modals/SurfaceModal';
import { IngredientModal } from '@/components/modals/IngredientModal';
import { ElectromenagerModal } from '@/components/modals/ElectromenagerModal';
import { AstuceModal } from '@/components/modals/AstuceModal';
import { RecipeModal } from '@/components/modals/RecipeModal';
import { AccountMenu } from '@/components/layout/AccountMenu';
import { RecipesPage } from '@/components/recipes/RecipesPage';
import { IngredientsPage } from '@/components/ingredients/IngredientsPage';
import { FavoritesPage } from '@/components/favorites/FavoritesPage';
import { IngredientDetailModal } from '@/components/modals/IngredientDetailModal';
import { PWAInstallPrompt } from '@/components/ui/PWAInstallPrompt';
import { PWAUpdatePrompt } from '@/components/ui/PWAUpdatePrompt';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { WhatsNewModal } from '@/components/ui/WhatsNewModal';
import { SURFACES, SURFACES_POPULAIRES } from '@/data/surfaces';
import { RECETTES } from '@/data/recettes';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { ASTUCES_DU_JOUR } from '@/data/astuces';
import { parseFicheParam } from '@/utils/sprayUtils';
import { Surface, Spray, Ingredient, Electromenager, Astuce, RecetteComplete, IngredientComplet } from '@/types';

// Fonction pour générer un slug à partir du nom
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Fonction pour trouver une recette par slug
const findRecipeBySlug = (slug: string): RecetteComplete | undefined => {
  return RECETTES.find(r => generateSlug(r.nom) === slug);
};

// Fonction pour trouver une astuce par slug
const findAstuceBySlug = (slug: string): Astuce | undefined => {
  return ASTUCES_DU_JOUR.find(a => generateSlug(a.titre) === slug);
};

function HomePageContent() {
  const { theme, darkMode } = useTheme();
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('Accueil');
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSurfaces, setShowAllSurfaces] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // États pour les modals
  const [selectedSurface, setSelectedSurface] = useState<Surface | null>(null);
  const [selectedSpray, setSelectedSpray] = useState<Spray | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [selectedIngredientComplet, setSelectedIngredientComplet] = useState<IngredientComplet | null>(null);
  const [selectedAppliance, setSelectedAppliance] = useState<Electromenager | null>(null);
  const [selectedAstuce, setSelectedAstuce] = useState<Astuce | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<RecetteComplete | null>(null);

  // Handle URL parameters for shared links
  useEffect(() => {
    setIsLoaded(true);

    // QR code d'un flacon "Mes Sprays" : ?fiche=spray-3 ou ?fiche=recette-12
    const fiche = parseFicheParam(searchParams.get('fiche'));
    if (fiche) {
      if (fiche.type === 'spray') {
        const spray = SPRAYS_INDISPENSABLES.find(s => s.id === fiche.id);
        if (spray) { setSelectedSpray(spray); return; }
      } else {
        const recipe = RECETTES.find(r => r.id === fiche.id);
        if (recipe) { setSelectedRecipe(recipe); return; }
      }
    }

    // Clean slug: extract only the valid slug part (before any space or invalid characters)
    const cleanSlug = (slug: string): string => {
      // Take only the part that matches a valid slug pattern (letters, numbers, hyphens)
      const match = slug.match(/^[a-z0-9-]+/);
      return match ? match[0] : slug;
    };

    const recipeSlug = searchParams.get('recette');
    if (recipeSlug) {
      const cleanedSlug = cleanSlug(recipeSlug.toLowerCase());
      const recipe = findRecipeBySlug(cleanedSlug);
      if (recipe) {
        setSelectedRecipe(recipe);
        return;
      }
    }

    const astuceSlug = searchParams.get('astuce');
    if (astuceSlug) {
      const cleanedSlug = cleanSlug(astuceSlug.toLowerCase());
      const astuce = findAstuceBySlug(cleanedSlug);
      if (astuce) {
        setSelectedAstuce(astuce);
      }
    }
  }, [searchParams]);

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

  // Handle nav tab change with scroll to top
  const handleNavTabChange = (tab: NavTab) => {
    setActiveNavTab(tab);
    // Scroll to top - use both methods for better iOS compatibility
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <>
      {/* Splash screen avec image de fond */}
      <SplashScreen />

      {/* Nouveautés (s'affiche après le splash si features non vues) */}
      <WhatsNewModal />

      <div className="min-h-screen relative">
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

      {/* Content with safe area padding */}
      <div
        className="relative z-10 max-w-md mx-auto px-4 pb-24"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
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

            {/* Sprays Section - hero + mini grid */}
            <SpraysHeroGrid onSprayClick={setSelectedSpray} />

            {/* Surfaces Grid */}
            <SurfacesGrid
              surfaces={getFilteredSurfaces()}
              showAll={showAllSurfaces}
              onToggleShowAll={() => setShowAllSurfaces(!showAllSurfaces)}
              onSurfaceClick={setSelectedSurface}
              searchQuery={searchQuery}
            />

            {/* Entretien électroménager */}
            <EntretienSection onApplianceClick={setSelectedAppliance} />

            {/* Le saviez-vous ? - Tips carousel */}
            <LeSaviezVousSection />

            {/* Les 8 Essentiels */}
            <EssentielsSection
              onIngredientClick={setSelectedIngredient}
              onViewAll={() => setActiveNavTab('Ingrédients')}
            />

            {/* Astuces du jour */}
            <AstucesSection onAstuceClick={setSelectedAstuce} />

            {/* Impact (version compacte, sans carrousel animé) */}
            {!searchQuery && <ImpactStrip />}
          </>
        )}

        {activeNavTab === 'Appareils' && (
          <AppareilsPage onApplianceClick={setSelectedAppliance} />
        )}

        {activeNavTab === 'Astuces' && (
          <RecipesPage onRecipeClick={setSelectedRecipe} />
        )}

        {activeNavTab === 'Ingrédients' && (
          <IngredientsPage onIngredientClick={setSelectedIngredientComplet} />
        )}

        {activeNavTab === 'Favoris' && (
          <FavoritesPage onRecipeClick={setSelectedRecipe} onSprayClick={setSelectedSpray} />
        )}
      </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeNavTab} onTabChange={handleNavTabChange} />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* PWA Update Prompt */}
      <PWAUpdatePrompt />

      {/* Modals */}
      {selectedSpray && (
        <SprayModal spray={selectedSpray} onClose={() => setSelectedSpray(null)} />
      )}

      {selectedSurface && (
        <SurfaceModal
          surface={selectedSurface}
          onClose={() => setSelectedSurface(null)}
          onRecipeClick={(recipe) => {
            setSelectedSurface(null);
            setSelectedRecipe(recipe);
          }}
        />
      )}

      {selectedIngredient && (
        <IngredientModal ingredient={selectedIngredient} onClose={() => setSelectedIngredient(null)} />
      )}

      {selectedAppliance && (
        <ElectromenagerModal appliance={selectedAppliance} onClose={() => setSelectedAppliance(null)} />
      )}

      {selectedAstuce && (
        <AstuceModal astuce={selectedAstuce} onClose={() => setSelectedAstuce(null)} />
      )}

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}

      {selectedIngredientComplet && (
        <IngredientDetailModal
          ingredient={selectedIngredientComplet}
          onClose={() => setSelectedIngredientComplet(null)}
          onRecipeClick={(recipe) => {
            setSelectedIngredientComplet(null);
            setSelectedRecipe(recipe);
          }}
        />
      )}

      {/* Account Menu */}
      <AccountMenu
        isOpen={showAccountMenu}
        onClose={() => setShowAccountMenu(false)}
        onNavigate={(page) => {
          // Handle navigation based on page
          if (page === 'favoris') {
            setActiveNavTab('Favoris');
            setShowAccountMenu(false);
          }
        }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
