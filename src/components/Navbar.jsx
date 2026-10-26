import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Flame, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ShieldAlert, 
  Compass, 
  Zap,
  Sparkles,
  Command,
  Ticket
} from 'lucide-react';

export default function Navbar({ onNavigateSection }) {
  const { 
    cart, 
    wishlist, 
    userProfile, 
    bountyState,
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsProfileOpen, 
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08080c]/90 backdrop-blur-xl border-b border-red-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-gradient-to-b from-[#08080c]/95 via-[#08080c]/60 to-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4 xl:gap-6 shrink-0">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group cursor-pointer shrink-0"
            >
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-950 p-[1px] shadow-[0_0_15px_rgba(255,26,53,0.5)] group-hover:shadow-[0_0_25px_rgba(255,26,53,0.8)] transition-all">
                <div className="w-full h-full bg-[#0d0e14] rounded-lg flex items-center justify-center">
                  <Flame className="w-6 h-6 text-red-500 animate-pulse group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-2xl tracking-wider text-white group-hover:text-red-400 transition-colors">
                    IGNIS
                  </span>
                  <span className="text-[10px] font-cyber px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                    2.0
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase -mt-1">
                  Gaming Syndicate
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 pl-3 xl:pl-4 border-l border-zinc-800">
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  onNavigateSection?.('featured');
                }}
                className="px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-red-500 shrink-0" />
                <span>Featured</span>
              </button>
              <button 
                onClick={() => onNavigateSection?.('catalog')}
                className="px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Zap className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-red-500 shrink-0" />
                <span><span className="hidden xl:inline">Browse </span>Catalog</span>
              </button>
              <button 
                onClick={() => onNavigateSection?.('deals')}
                className="px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-red-500 shrink-0" />
                <span><span className="hidden xl:inline">Flash </span>Sales</span>
              </button>
              <button 
                onClick={() => onNavigateSection?.('bounties')}
                className="px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md transition-all flex items-center gap-1.5 border border-red-500/40 shadow-[0_0_12px_rgba(255,26,53,0.2)] whitespace-nowrap"
              >
                <Ticket className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-red-500 animate-pulse shrink-0" />
                <span><span className="hidden xl:inline">Earn </span>Coupons</span>
                {bountyState?.unlockedCoupons?.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-bold">
                    {bountyState.unlockedCoupons.length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Quick Search Bar trigger */}
          <div className="flex-1 min-w-[180px] max-w-sm xl:max-w-md hidden md:block mx-2 xl:mx-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#0f1018]/90 hover:bg-[#151624] border border-zinc-800/80 hover:border-red-500/50 text-zinc-400 text-sm transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:shadow-[0_0_15px_rgba(255,26,53,0.18)] group flex items-center justify-between gap-2.5 overflow-hidden text-left focus:outline-none focus:ring-1 focus:ring-red-500/50"
              title="Quick Search (Ctrl + K)"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                <Search className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors shrink-0" />
                {searchQuery ? (
                  <span className="font-sans text-xs xl:text-sm text-red-400 font-medium truncate whitespace-nowrap">
                    Active: <span className="text-white font-semibold">"{searchQuery}"</span>
                  </span>
                ) : (
                  <span className="font-sans text-xs xl:text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors truncate whitespace-nowrap">
                    <span className="hidden xl:inline">Search 4,500+ games, genres, tags...</span>
                    <span className="xl:hidden">Search games & tags...</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {searchQuery && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery('');
                    }}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </span>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-400 group-hover:text-red-400 bg-[#161722] border border-zinc-700/60 group-hover:border-red-500/30 rounded shadow-sm shrink-0">
                  <Command className="w-3 h-3 inline" />
                  <span>K</span>
                </kbd>
              </div>
            </button>
          </div>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-lg text-zinc-300 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-500/30 transition-all group"
              title="Tactical Wishlist"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-[0_0_8px_#ff1a35]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg text-zinc-300 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-500/30 transition-all group"
              title="Checkout Cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-[0_0_8px_#ff1a35] animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#14151f] hover:bg-[#1a1b28] border border-red-500/20 hover:border-red-500/50 transition-all text-left group shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.gamertag}
                  className="w-8 h-8 rounded-md object-cover border border-red-500/40 group-hover:border-red-500 transition-colors"
                />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0d0e14]" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-semibold text-white tracking-wide group-hover:text-red-400 transition-colors">
                  {userProfile.gamertag}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                  <span className="text-red-400 font-bold">LVL {userProfile.level}</span>
                  <span>•</span>
                  <span>{userProfile.xp.toLocaleString()} XP</span>
                </div>
              </div>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0d13]/98 border-b border-red-500/30 px-6 py-5 shadow-2xl space-y-3 animate-fade-in backdrop-blur-xl">
          <button
            onClick={() => {
              setSelectedCategory('all');
              onNavigateSection?.('featured');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded text-zinc-300 hover:text-white hover:bg-white/5 font-medium flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-red-500" />
            Featured Showcase
          </button>
          <button
            onClick={() => {
              onNavigateSection?.('catalog');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded text-zinc-300 hover:text-white hover:bg-white/5 font-medium flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-red-500" />
            Browse Full Catalog
          </button>
          <button
            onClick={() => {
              onNavigateSection?.('deals');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded text-zinc-300 hover:text-white hover:bg-white/5 font-medium flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-red-500" />
            Flash Sales & Discounts
          </button>
          <button
            onClick={() => {
              onNavigateSection?.('bounties');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded text-red-400 hover:text-red-300 hover:bg-red-950/20 font-medium flex items-center gap-2"
          >
            <Ticket className="w-4 h-4 text-red-500" />
            Earn Discount Coupons ({bountyState?.unlockedCoupons?.length || 0} Unlocked)
          </button>
          <div className="pt-3 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
            <span>Demo Session // Authenticated</span>
            <span className="font-mono text-red-400">CREDITS: {userProfile.ignisCredits}</span>
          </div>
        </div>
      )}
    </header>
  );
}
