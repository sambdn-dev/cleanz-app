'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { BottomNav, NavTab } from '@/components/layout/BottomNav';
import { SmartSearch } from '@/components/layout/SmartSearch';
import { CategoryTabs } from '@/components/layout/CategoryTabs';
import { SpraysHeroGrid } from '@/components/home/SpraysHeroGrid';
import { SurfacesGrid } from '@/components/home/SurfacesGrid';
import { CaniculeBanner } from '@/components/home/CaniculeBanner';

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
// Sections de l'accueil situées sous la ligne de flottaison : leur code n'est
// téléchargé qu'au moment où l'on fait défiler jusqu'à elles (cf. LazySection).
const EntretienSection = dynamic(() => import('@/components/home/EntretienSection').then((m) => m.EntretienSection), { ssr: false });
const LeSaviezVousSection = dynamic(() => import('@/components/home/LeSaviezVousSection').then((m) => m.LeSaviezVousSection), { ssr: false });
const GuidesCarousel = dynamic(() => import('@/components/home/GuidesCarousel').then((m) => m.GuidesCarousel), { ssr: false });
const CreateursSection = dynamic(() => import('@/components/home/CreateursSection').then((m) => m.CreateursSection), { ssr: false });
const EssentielsSection = dynamic(() => import('@/components/home/EssentielsSection').then((m) => m.EssentielsSection), { ssr: false });
const AstucesSection = dynamic(() => import('@/components/home/AstucesSection').then((m) => m.AstucesSection), { ssr: false });
const ImpactStrip = dynamic(() => import('@/components/home/ImpactStrip').then((m) => m.ImpactStrip), { ssr: false });

const WhatsNewModal = dynamic(() => import('@/components/ui/WhatsNewModal').then((m) => m.WhatsNewModal), { ssr: false });
import { PWAInstallPrompt } from '@/components/ui/PWAInstallPrompt';
import { PWAUpdatePrompt } from '@/components/ui/PWAUpdatePrompt';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { LazySection } from '@/components/ui/LazySection';
import { LiensPartages } from '@/components/layout/LiensPartages';
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
  const heat = useHeatAlert();
  const [isLoaded, setIsLoaded] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('Accueil');
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSurfaces, setShowAllSurfaces] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [accountPage, setAccountPage] = useState<null | 'compte' | 'courses' | 'appareils'>(null);
  const [caniculeModalOpen, setCaniculeModalOpen] = useState(false);
  const [meteoDebug, setMeteoDebug] = useState(false);

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

  // Les liens partagés sont traités par <LiensPartages/> (voir le rendu) :
  // il isole `useSearchParams`, qui sinon empêcherait le pré-rendu de l'accueil.

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
      {/* Isolé dans sa propre frontière : `useSearchParams` ne doit pas
          désactiver le pré-rendu de tout l'accueil. */}
      <Suspense fallback={null}>
        <LiensPartages
          onSpray={setSelectedSpray}
          onRecette={setSelectedRecipe}
          onAstuce={setSelectedAstuce}
          onMeteoDebug={setMeteoDebug}
        />
      </Suspense>

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
            {meteoDebug && <MeteoDebugCard heat={heat} />}

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

            {/* PERFORMANCE — tout ce qui suit est sous la ligne de flottaison :
                chaque section n'est téléchargée et assemblée qu'à l'approche du
                défilement, au lieu d'alourdir le démarrage. */}

            {/* Entretien électroménager */}
            <LazySection minHeight={260}>
              <EntretienSection onApplianceClick={setSelectedAppliance} />
            </LazySection>

            {/* Le saviez-vous ? - Tips carousel */}
            <LazySection minHeight={190}>
              <LeSaviezVousSection />
            </LazySection>

            {/* Les guides Cleanz — Saison, Piscine & Spa, Detailing Auto
                en carrousel coulissant (contenu complet en plein écran) */}
            {!searchQuery && (
              <LazySection minHeight={300}>
                <GuidesCarousel heatActive={heat.isHeat} />
              </LazySection>
            )}

            {/* Les stars du clean — vitrine créateurs */}
            {!searchQuery && (
              <LazySection minHeight={280}>
                <CreateursSection />
              </LazySection>
            )}

            {/* Les 8 Essentiels */}
            <LazySection minHeight={230}>
              <EssentielsSection
                onIngredientClick={setSelectedIngredient}
                onViewAll={() => handleNavTabChange('Recettes')}
              />
            </LazySection>

            {/* Astuces du jour */}
            <LazySection minHeight={270}>
              <AstucesSection onAstuceClick={setSelectedAstuce} />
            </LazySection>

            {/* Impact (version compacte, sans carrousel animé) */}
            {!searchQuery && (
              <LazySection minHeight={210}>
                <ImpactStrip />
              </LazySection>
            )}
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
  // Plus de <Suspense> autour de l'accueil : il ne lit plus les paramètres
  // d'URL, il est donc pré-rendu et visible dès la première image.
  return <HomePageContent />;
}
