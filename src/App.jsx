import React, { useRef } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import GlobalHubView from './components/GlobalHubView';
import DepartmentStoreView from './components/DepartmentStoreView';
import HeroShowcase from './components/HeroShowcase';
import QuickStatsBar from './components/QuickStatsBar';
import FilterBar from './components/FilterBar';
import GameCard from './components/GameCard';
import GameDetailModal from './components/GameDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ProfileModal from './components/ProfileModal';
import SearchModal from './components/SearchModal';
import ToastContainer from './components/ToastContainer';
import BountiesSection from './components/BountiesSection';
import LootCratesModal from './components/LootCratesModal';
import Footer from './components/Footer';
import { 
  Flame, 
  Sparkles, 
  Zap, 
  History, 
  ArrowRight, 
  Percent, 
  Compass,
  Trophy,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

function MarketplaceContent() {
  const { 
    games, 
    searchQuery, 
    selectedCategory, 
    selectedPlatform, 
    sortBy, 
    maxPrice, 
    onlyDiscounted,
    recentlyViewed,
    setSelectedCategory,
    openGameDetail,
    activeDepartment,
    setActiveDepartment
  } = useStore();

  const catalogRef = useRef(null);
  const dealsRef = useRef(null);
  const bountiesRef = useRef(null);

  const handleNavigateSection = (sec) => {
    if (sec === 'featured') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sec === 'catalog') {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'deals') {
      dealsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'bounties') {
      bountiesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter Catalog logic
  const filteredCatalog = games.filter(g => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchCat = g.category.toLowerCase().includes(q);
      const matchStudio = g.studio.toLowerCase().includes(q);
      const matchTag = g.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCat && !matchStudio && !matchTag) return false;
    }

    // Category
    if (selectedCategory !== 'all' && g.category !== selectedCategory) {
      return false;
    }

    // Platform
    if (selectedPlatform !== 'All Platforms' && !g.platforms.includes(selectedPlatform)) {
      return false;
    }

    // Price
    if (g.price > maxPrice) {
      return false;
    }

    // Only discounted
    if (onlyDiscounted && g.discountPercent <= 0) {
      return false;
    }

    return true;
  });

  // Sort Catalog logic
  const sortedCatalog = [...filteredCatalog].sort((a, b) => {
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'discount-desc') return b.discountPercent - a.discountPercent;
    if (sortBy === 'release-desc') return new Date(b.releaseDate) - new Date(a.releaseDate);
    return 0; // 'featured' keeps default order
  });

  // Trending Section Games
  const trendingGames = games.filter(g => g.isTrending);

  // Flash Deals Games
  const dealGames = games.filter(g => g.discountPercent >= 25);

  // Recently Viewed game objects
  const recentGameObjects = recentlyViewed
    .map(id => games.find(g => g.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      
      {/* Red ambient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/[0.04] blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <Navbar onNavigateSection={handleNavigateSection} />

      {/* Main Body */}
      <main className="flex-1">
        
        {/* Active Department Routing in Global Universal Shell */}
        {activeDepartment === 'hub' ? (
          <GlobalHubView onEnterStore={(deptId) => setActiveDepartment(deptId)} />
        ) : activeDepartment !== 'gaming' ? (
          <DepartmentStoreView 
            departmentId={activeDepartment} 
            onBackToHub={() => setActiveDepartment('hub')} 
          />
        ) : (
          <>
            {/* Gaming Showcase */}
            <section id="featured">
              <HeroShowcase />
            </section>

        {/* Quick Value Props & Ticker */}
        <QuickStatsBar />

        {/* SECTION 1: FLASH SALES & EXCLUSIVE DEALS */}
        <section id="deals" ref={dealsRef} className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-red-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-xs font-cyber font-bold tracking-widest text-red-400 uppercase">
                  LIMITED TIME RED PROTOCOL
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-wide">
                FLASH DROPS & MEGA SALES
              </h2>
            </div>

            <button
              onClick={() => {
                catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-cyber font-bold tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors group"
            >
              <span>VIEW FULL DEALS DISPATCH</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealGames.slice(0, 4).map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* SECTION 2: FULL TACTICAL CATALOG WITH LIVE FILTERING */}
        <section id="catalog" ref={catalogRef} className="py-12 bg-[#0a0a0f] border-y border-zinc-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500" />
                <span className="text-xs font-cyber font-bold tracking-widest text-red-400 uppercase">
                  ARMORY DATABASE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-wide">
                EXPLORE ALL TITLES
              </h2>
              <p className="text-xs text-zinc-400 max-w-xl">
                Filter by combat genre, target gaming platform, maximum price ceiling, or real-time search queries.
              </p>
            </div>

            {/* Filter Controls Bar */}
            <FilterBar resultCount={sortedCatalog.length} />

            {/* Games Grid */}
            {sortedCatalog.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-2xl bg-[#0e0f18] border border-zinc-800 space-y-3">
                <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/40 mx-auto flex items-center justify-center text-red-500">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white font-cyber">No Titles Matching Query</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try adjusting the maximum price slider, resetting genre filters, or clearing search keywords.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedCatalog.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* SECTION 3: TRENDING OPERATIVE RELEASES */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-red-500" />
                <span className="text-xs font-cyber font-bold tracking-widest text-red-400 uppercase">
                  GLOBAL NETWORK HEATMAP
                </span>
              </div>
              <h2 className="text-3xl font-black font-heading text-white tracking-wide">
                TRENDING & TOP PICKS
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingGames.slice(0, 3).map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* SECTION 3.5: OPERATIVE BOUNTIES & EARN DISCOUNT COUPONS */}
        <div ref={bountiesRef}>
          <BountiesSection />
        </div>

        {/* SECTION 4: RECENTLY VIEWED GAMES */}
        {recentGameObjects.length > 0 && (
          <section id="recently-viewed" className="py-12 bg-[#09090e] border-t border-zinc-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-cyber font-bold tracking-widest text-zinc-300 uppercase">
                  RECENTLY VIEWED DOSSIERS
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {recentGameObjects.map(game => (
                  <div
                    key={game.id}
                    onClick={() => openGameDetail(game)}
                    className="p-2 rounded-xl bg-[#10111a] hover:bg-[#161724] border border-zinc-800 hover:border-red-500/50 cursor-pointer transition-all group"
                  >
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="w-full aspect-[4/3] rounded-lg object-cover border border-zinc-800"
                    />
                    <div className="mt-2">
                      <span className="text-xs font-bold text-white group-hover:text-red-400 truncate block transition-colors">
                        {game.title}
                      </span>
                      <span className="text-xs font-mono font-bold text-red-400 block mt-0.5">
                        ${game.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
          </>
        )}

      </main>

      {/* Global Modals & Overlays */}
      <GameDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <ProfileModal />
      <SearchModal />
      <LootCratesModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MarketplaceContent />
    </StoreProvider>
  );
}
