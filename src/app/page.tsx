'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { BottomNav, NavTab } from '@/components/layout/BottomNav';
import { SmartSearch } from '@/components/layout/SmartSearch';
import { CategoryTabs } from '@/components/layout/CategoryTabs';
import { SpraysHeroGrid } from '@/components/home/SpraysHeroGrid';
import { SurfacesGrid } from '@/components/home/SurfacesGrid';
import { EssentielsSection } from '@/components/home/EssentielsSection';
import { EntretienSection } from '@/components/home/EntretienSection';
import { LeSaviezVousSection } from '@/components/home/LeSaviezVousSection';
import { GuidesCarousel } from '@/components/home/GuidesCarousel';
import { CreateursSection } from '@/components/home/CreateursSection';
import { CaniculeBanner } from '@/components/home/CaniculeBanner';
import { AstucesSection } from '@/components/home/AstucesSection';
import { ImpactStrip } from '@/components/home/ImpactStrip';

/**
 * PERFORMANCE — chargement à la demande.
 *
 * Seul l'accueil est nécessaire au démarrage. Les autres onglets et toutes les
 * modales ne sont téléchargés qu'au moment où ils s'affichent réellement, ce
 * qui allège d'autant le premier chargement (leur code ET leurs données, comme
 * les 200 Ko du catalogue de recettes).
 */
const AppareilsPage = dynamic(() => import('@/components/appareils/AppareilsPage').then((m) => m.AppareilsPage), { ssr: false });
const RecipesPage = dynamic(() => import('@/components/recipes/RecipesPage').then((m) => m.RecipesPage), { ssr: false });
const MaterielPage = dynamic(() => import('@/components/materiel/MaterielPage').then((m) => m.MaterielPage), { ssr: false });
const PlanningPage = dynamic(() => import('@/components/planning/PlanningPage').then((m) => m.PlanningPage), { ssr: false });
const FavoritesPage = dynamic(() => import('@/components/favorites/FavoritesPage').then((m) => m.FavoritesPage), { ssr: false });
const AccountPage = dynamic(() => import('@/components/account/AccountPage').then((m) => m.AccountPage), { ssr: false });
const ShoppingListPage = dynamic(() => import('@/components/account/ShoppingListPage').then((m) => m.ShoppingListPage), { ssr: false });
const MyDevicesPage = dynamic(() => import('@/components/account/MyDevicesPage').then((m) => m.MyDevicesPage), { ssr: false });
const AccountMenu = dynamic(() => import('@/components/layout/AccountMenu').then((m) => m.AccountMenu), { ssr: false });

const SprayModal = dynamic(() => import('@/components/modals/SprayModal').then((m) => m.SprayModal), { ssr: false });
const SurfaceModal = dynamic(() => import('@/components/modals/SurfaceModal').then((m) => m.SurfaceModal), { ssr: false });
const IngredientModal = dynamic(() => import('@/components/modals/IngredientModal').then((m) => m.IngredientModal), { ssr: false });
const ElectromenagerModal = dynamic(() => import('@/components/modals/ElectromenagerModal').then((m) => m.ElectromenagerModal), { ssr: false });
const AstuceModal = dynamic(() => import('@/components/modals/AstuceModal').then((m) => m.AstuceModal), { ssr: false });
const RecipeModal = dynamic(() => import('@/components/modals/RecipeModal').then((m) => m.RecipeModal), { ssr: false });
const IngredientDetailModal = dynamic(() => import('@/components/modals/IngredientDetailModal').then((m) => m.IngredientDetailModal), { ssr: false });
const CaniculeModal = dynamic(() => import('@/components/home/CaniculeModal').then((m) => m.CaniculeModal), { ssr: false });
const MeteoDebugCard = dynamic(() => import('@/components/home/MeteoDebugCard').then((m) => m.MeteoDebugCard), { ssr: false });
const WhatsNewModal = dynamic(() => import('@/components/ui/WhatsNewModal').then((m) => m.WhatsNewModal), { ssr: false });
import { PWAInstallPrompt } from '@/components/ui/PWAInstallPrompt';
import { PWAUpdatePrompt } from '@/components/ui/PWAUpdatePrompt';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { PageTransition } from '@/components/ui/PageTransition';
import { SURFACES, SURFACES_POPULAIRES } from '@/data/surfaces';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { ASTUCES_DU_JOUR } from '@/data/astuces';
import { parseFicheParam } from '@/utils/sprayUtils';
import { useHeatAlert } from '@/hooks/useHeatAlert';
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

// Fonction pour trouver une astuce par slug
const findAstuceBySlug = (slug: string): Astuce | undefined => {
  return ASTUCES_DU_JOUR.find(a => generateSlug(a.titre) === slug);
};

function HomePageContent() {
  const { theme, darkMode } = useTheme();
  const searchParams = useSearchParams();
  const heat = useHeatAlert();
  const [isLoaded, setIsLoaded] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('Accueil');
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSurfaces, setShowAllSurfaces] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [accountPage, setAccountPage] = useState<null | 'compte' | 'courses' | 'appareils'>(null);
  const [caniculeModalOpen, setCaniculeModalOpen] = useState(false);

  // Ouverture auto de la grande alerte canicule : une fois par jour tant qu'il fait chaud.
  useEffect(() => {
    if (!heat.isHeat) return;
    try {
      const today = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem('cleanz_canicule_seen') !== today) {
        setCaniculeModalOpen(true);
      }
    } catch {
      setCaniculeModalOpen(true);
    }
  }, [heat.isHeat]);

  const closeCaniculeModal = () => {
    setCaniculeModalOpen(false);
    try {
      localStorage.setItem('cleanz_canicule_seen', new Date().toISOString().slice(0, 10));
    } catch {
      /* mode privé : tant pis, elle pourra se rouvrir */
    }
  };

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

    // Clean slug: extract only the valid slug part (before any space or invalid characters)
    const cleanSlug = (slug: string): string => {
      // Take only the part that matches a valid slug pattern (letters, numbers, hyphens)
      const match = slug.match(/^[a-z0-9-]+/);
      return match ? match[0] : slug;
    };

    // QR code d'un flacon "Mes Sprays" : ?fiche=spray-3 ou ?fiche=recette-12
    const fiche = parseFicheParam(searchParams.get('fiche'));
    const recipeSlug = searchParams.get('recette');
    const astuceSlug = searchParams.get('astuce');

    let annule = false;

    // PERFORMANCE : le catalogue de recettes (~200 Ko) n'est chargé que si le
    // lien ouvert en désigne une. Un démarrage normal ne le télécharge pas.
    const ouvrirDepuisLien = async () => {
      if (fiche) {
        if (fiche.type === 'spray') {
          const spray = SPRAYS_INDISPENSABLES.find(s => s.id === fiche.id);
          if (spray) { setSelectedSpray(spray); return; }
        } else {
          const { RECETTES } = await import('@/data/recettes');
          if (annule) return;
          const recipe = RECETTES.find(r => r.id === fiche.id);
          if (recipe) { setSelectedRecipe(recipe); return; }
        }
      }

      if (recipeSlug) {
        const { RECETTES } = await import('@/data/recettes');
        if (annule) return;
        const cleanedSlug = cleanSlug(recipeSlug.toLowerCase());
        const recipe = RECETTES.find(r => generateSlug(r.nom) === cleanedSlug);
        if (recipe) { setSelectedRecipe(recipe); return; }
      }

      if (astuceSlug) {
        const cleanedSlug = cleanSlug(astuceSlug.toLowerCase());
        const astuce = findAstuceBySlug(cleanedSlug);
        if (astuce) setSelectedAstuce(astuce);
      }
    };

    ouvrirDepuisLien();
    return () => { annule = true; };
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

  // Encart canicule → défile vers les conseils saisonniers (déjà calés sur Été/Canicule)
  const openCanicule = () => {
    setActiveNavTab('Accueil');
    requestAnimationFrame(() => {
      document.getElementById('saison-cleanz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
        {/* Blur progressif tout en haut : évite que le contenu défilé se
            superpose à la barre d'état (heure, réseau, batterie). */}
        <div
          className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
          style={{
            height: 'calc(env(safe-area-inset-top, 0px) + 14px)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
            background: darkMode
              ? 'linear-gradient(to bottom, rgba(30,16,56,0.55) 0%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 100%)',
          }}
        />

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

        <PageTransition key={activeNavTab}>
        {activeNavTab === 'Accueil' && (
          <>
            {/* Diagnostic météo (uniquement avec ?meteo=debug) */}
            {searchParams.get('meteo') === 'debug' && <MeteoDebugCard heat={heat} />}

            {/* Encart canicule : visible UNIQUEMENT en période de forte chaleur (>= seuil). */}
            {heat.isHeat && !searchQuery && (
              <CaniculeBanner tempMax={heat.tempMax} city={heat.city} onOpen={() => setCaniculeModalOpen(true)} />
            )}

            {/* Search Bar intelligente (dropdown : surfaces, recettes, ingrédients)
                relative z-[70] : indispensable pour que le dropdown passe AU-DESSUS
                du carrousel/pilules qui suivent (sinon piégé par le contexte
                d'empilement créé par le transform de l'animation d'entrée). */}
            <div className={`relative z-[70] mb-4 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <SmartSearch
                value={searchQuery}
                onChange={setSearchQuery}
                onSelectSurface={setSelectedSurface}
                onSelectRecipe={setSelectedRecipe}
                onSelectIngredient={setSelectedIngredientComplet}
              />
            </div>

            {/* Sprays Section - hero + mini grid (juste sous la recherche) */}
            <SpraysHeroGrid onSprayClick={setSelectedSpray} />

            {/* Category Tabs (pilules sous Les Indispensables) */}
            <div className={`mb-4 transition-all duration-700 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CategoryTabs activeTab={activeCategory} onTabChange={handleCategoryChange} />
            </div>

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

            {/* Les guides Cleanz — Saison, Piscine & Spa, Detailing Auto
                en carrousel coulissant (contenu complet en plein écran) */}
            {!searchQuery && <GuidesCarousel heatActive={heat.isHeat} />}

            {/* Les stars du clean — vitrine créateurs */}
            {!searchQuery && <CreateursSection />}

            {/* Les 8 Essentiels */}
            <EssentielsSection
              onIngredientClick={setSelectedIngredient}
              onViewAll={() => handleNavTabChange('Recettes')}
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

        {activeNavTab === 'Recettes' && (
          <RecipesPage
            onRecipeClick={setSelectedRecipe}
            onSurfaceClick={setSelectedSurface}
            onIngredientClick={setSelectedIngredientComplet}
          />
        )}

        {activeNavTab === 'Planning' && (
          <PlanningPage onSurfaceClick={setSelectedSurface} />
        )}

        {activeNavTab === 'Matériel' && (
          <MaterielPage onSurfaceClick={setSelectedSurface} />
        )}

        {activeNavTab === 'Favoris' && (
          <FavoritesPage
            onRecipeClick={setSelectedRecipe}
            onSprayClick={setSelectedSpray}
            onIngredientClick={setSelectedIngredientComplet}
            onExploreRecipes={() => handleNavTabChange('Recettes')}
          />
        )}
        </PageTransition>
      </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeNavTab} onTabChange={handleNavTabChange} />

      {/* Grande alerte canicule (auto pendant les fortes chaleurs + via l'encart) */}
      {heat.isHeat && caniculeModalOpen && (
        <CaniculeModal
          tempMax={heat.tempMax}
          nightMin={heat.nightMin ?? null}
          city={heat.city}
          onClose={closeCaniculeModal}
          onSeeAll={() => { closeCaniculeModal(); openCanicule(); }}
        />
      )}

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
          setShowAccountMenu(false);
          if (page === 'favoris') {
            setActiveNavTab('Favoris');
            window.scrollTo(0, 0);
          } else if (page === 'compte' || page === 'courses' || page === 'appareils') {
            setAccountPage(page);
          }
        }}
      />

      {/* Pages du menu (overlays plein écran) */}
      {accountPage === 'compte' && (
        <AccountPage
          onClose={() => setAccountPage(null)}
          onOpenFavoris={() => { setAccountPage(null); setActiveNavTab('Favoris'); window.scrollTo(0, 0); }}
        />
      )}
      {accountPage === 'courses' && (
        <ShoppingListPage onClose={() => setAccountPage(null)} />
      )}
      {accountPage === 'appareils' && (
        <MyDevicesPage
          onClose={() => setAccountPage(null)}
          onApplianceClick={(a) => { setAccountPage(null); setSelectedAppliance(a); }}
        />
      )}
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
