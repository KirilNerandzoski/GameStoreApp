import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Flame, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Compass, 
  Zap, 
  Sparkles, 
  Command, 
  Ticket,
  Globe2,
  Cpu,
  Shirt,
  Trophy,
  Cloud,
  ChevronDown,
  Package,
  FlaskConical,
  LogOut
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
    setSelectedCategory,
    activeDepartment,
    setActiveDepartment,
    departments,
    openLootCrate,
    openFormulaLab,
    openBattlestationBuilder,
    currentUser,
    openAuthModal,
    signOut
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const currentDeptObj = departments.find(d => d.id === activeDepartment);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08080c]/95 backdrop-blur-xl border-b border-red-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-gradient-to-b from-[#08080c]/98 via-[#08080c]/85 to-transparent border-b border-white/5'
      }`}
    >
      {/* Global Universal Shell Ecosystem Strip */}
      <div className="bg-[#05060a]/95 border-b border-white/5 py-1 px-4 sm:px-6 lg:px-8 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden xl:inline">
              OMNI PROTOCOL:
            </span>

            <button
              onClick={() => {
                setActiveDepartment('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                activeDepartment === 'hub'
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(255,26,53,0.5)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Universal Hub</span>
            </button>

            {departments.map(dept => {
              const isActive = activeDepartment === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setActiveDepartment(dept.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={isActive ? {
                    backgroundColor: `${dept.accentColor}25`,
                    border: `1px solid ${dept.accentColor}80`,
                    color: dept.accentColor
                  } : {}}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dept.accentColor }} />
                  <span>{dept.shortName}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-[10px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              1 Shared Cart
            </span>
            <span>•</span>
            <span className="text-zinc-300">Pay via Global Shell</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4 xl:gap-6 shrink-0">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setActiveDepartment('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group cursor-pointer shrink-0"
              title="Return to Global Universal Shell"
            >
              <div 
                className="relative w-10 h-10 rounded-lg p-[1px] shadow-lg transition-all"
                style={{
                  background: currentDeptObj ? `linear-gradient(135deg, ${currentDeptObj.accentColor}, #000)` : 'linear-gradient(135deg, #ff1a35, #3b0000)'
                }}
              >
                <div className="w-full h-full bg-[#0d0e14] rounded-lg flex items-center justify-center">
                  <Flame 
                    className="w-6 h-6 animate-pulse group-hover:scale-110 transition-transform" 
                    style={{ color: currentDeptObj ? currentDeptObj.accentColor : '#ff1a35' }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-2xl tracking-wider text-white group-hover:text-red-400 transition-colors">
                    {activeDepartment === 'hub' ? 'OMNI' : (currentDeptObj ? currentDeptObj.shortName.toUpperCase() : 'IGNIS')}
                  </span>
                  <span 
                    className="text-[10px] font-cyber px-1.5 py-0.5 rounded border"
                    style={{
                      backgroundColor: currentDeptObj ? `${currentDeptObj.accentColor}20` : 'rgba(255,26,53,0.2)',
                      borderColor: currentDeptObj ? `${currentDeptObj.accentColor}40` : 'rgba(255,26,53,0.3)',
                      color: currentDeptObj ? currentDeptObj.accentColor : '#ff4d66'
                    }}
                  >
                    SHELL
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase -mt-1">
                  {activeDepartment === 'hub' ? 'Universal Marketplace' : `${currentDeptObj?.name || 'Syndicate'}`}
                </span>
              </div>
            </a>

            {/* Sub-Store Fast Navigation (Gaming Specific) */}
            {activeDepartment === 'gaming' && (
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
            )}

            {/* Non-gaming department link */}
            {activeDepartment !== 'gaming' && activeDepartment !== 'hub' && (
              <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-zinc-800">
                <button
                  onClick={() => setActiveDepartment('hub')}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Back to Ecosystem Hub
                </button>
                {activeDepartment === 'hardware' && (
                  <button
                    onClick={() => openBattlestationBuilder()}
                    className="px-2.5 py-1 rounded-md text-[11px] font-cyber font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.3)] animate-pulse cursor-pointer"
                  >
                    <Cpu className="w-3 h-3" />
                    <span>Rig Builder</span>
                  </button>
                )}
                {activeDepartment === 'fuel' && (
                  <button
                    onClick={() => openFormulaLab()}
                    className="px-2.5 py-1 rounded-md text-[11px] font-cyber font-bold tracking-wider uppercase bg-orange-500/20 text-orange-400 border border-orange-500/40 hover:bg-orange-500/30 flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(255,85,0,0.3)] animate-pulse cursor-pointer"
                  >
                    <FlaskConical className="w-3 h-3" />
                    <span>Formula Lab</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Search Bar trigger */}
          <div className="flex-1 min-w-[180px] max-w-sm xl:max-w-md hidden md:block mx-2 xl:mx-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#0f1018]/90 hover:bg-[#151624] border border-zinc-800/80 hover:border-red-500/50 text-zinc-400 text-sm transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:shadow-[0_0_15px_rgba(255,26,53,0.18)] group flex items-center justify-between gap-2.5 overflow-hidden text-left focus:outline-none focus:ring-1 focus:ring-red-500/50 cursor-pointer"
              title="Search across all 6 stores (Ctrl + K)"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                <Search className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors shrink-0" />
                {searchQuery ? (
                  <span className="font-sans text-xs xl:text-sm text-red-400 font-medium truncate whitespace-nowrap">
                    Active: <span className="text-white font-semibold">"{searchQuery}"</span>
                  </span>
                ) : (
                  <span className="font-sans text-xs xl:text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors truncate whitespace-nowrap">
                    <span className="hidden xl:inline">Search across all 5 storefronts...</span>
                    <span className="xl:hidden">Search 5 stores...</span>
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

            {/* Loot Crates Unboxing Button */}
            <button
              onClick={() => openLootCrate()}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:text-amber-300 transition-all shadow-[0_0_12px_rgba(255,183,0,0.2)] group cursor-pointer"
              title="Open Cyber Crate Terminal"
            >
              <Package className="w-4 h-4 text-amber-400 animate-pulse group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-xs font-bold font-cyber tracking-wider">
                LOOT CRATES
              </span>
            </button>

            {/* Battlestation Rig Builder Button */}
            <button
              onClick={() => openBattlestationBuilder()}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all shadow-[0_0_12px_rgba(0,240,255,0.25)] group cursor-pointer"
              title="Open Interactive PC Battlestation Studio"
            >
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-xs font-bold font-cyber tracking-wider">
                RIG BUILDER
              </span>
            </button>

            {/* CyberFuel Custom Formula Lab Button */}
            <button
              onClick={() => openFormulaLab()}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 text-orange-400 hover:text-orange-300 transition-all shadow-[0_0_12px_rgba(255,85,0,0.25)] group cursor-pointer"
              title="Open CyberFuel Custom Formula Lab (Mix Energy Tub)"
            >
              <FlaskConical className="w-4 h-4 text-orange-400 animate-pulse group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-xs font-bold font-cyber tracking-wider">
                FORMULA LAB
              </span>
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

            {/* Universal Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-red-600/15 hover:bg-red-600/25 border border-red-500/40 hover:border-red-500 text-white transition-all shadow-[0_0_15px_rgba(255,26,53,0.15)] group"
              title="Global Universal Cart"
            >
              <ShoppingBag className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold font-cyber tracking-wider">
                CART
              </span>
              {totalCartCount > 0 && (
                <span className="flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white shadow-[0_0_10px_#ff1a35]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Pill with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {currentUser ? (
                <div className="flex items-center gap-1 bg-[#14151f] hover:bg-[#1a1b28] border border-red-500/20 hover:border-red-500/50 rounded-lg p-1 sm:px-2.5 sm:py-1.5 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  <button
                    onClick={() => setProfileDropdownOpen(prev => !prev)}
                    className="flex items-center gap-2 cursor-pointer text-left"
                    title="Operative Menu"
                  >
                    <div className="relative">
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.gamertag}
                        className="w-8 h-8 rounded-md object-cover border border-red-500/40"
                      />
                      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
                    </div>
                    <div className="hidden sm:flex flex-col">
                      <span className="text-xs font-semibold text-white tracking-wide truncate max-w-[110px]">
                        {userProfile.gamertag}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        ONLINE • LVL {userProfile.level}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Direct Logout Button */}
                  <button
                    onClick={() => signOut()}
                    className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/15 transition-colors cursor-pointer"
                    title="Sign Out (Disconnect Session)"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal()}
                  className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600/20 via-cyan-500/20 to-red-600/20 hover:from-red-600/30 hover:to-cyan-500/30 border border-cyan-500/40 text-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] group cursor-pointer"
                  title="Sign In with Google, iCloud, Facebook, or Email"
                >
                  <User className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs font-cyber font-bold tracking-wider uppercase text-cyan-300">
                    LOGIN / JOIN
                  </span>
                </button>
              )}

              {/* Profile Dropdown Menu */}
              {currentUser && profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[#0e101a] border border-red-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.9)] py-2 z-50 animate-fade-in backdrop-blur-xl">
                  {/* User Header */}
                  <div className="px-3.5 py-2.5 border-b border-zinc-800 flex items-center gap-2.5">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.gamertag}
                      className="w-9 h-9 rounded-md object-cover border border-red-500/40"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate font-cyber">
                        {userProfile.gamertag}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate font-mono">
                        {currentUser.email || 'Operative Session'}
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="p-1.5 space-y-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
                    >
                      <User className="w-4 h-4 text-cyan-400" />
                      <span>View Dossier & Vault</span>
                    </button>

                    <button
                      onClick={() => {
                        signOut();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left border-t border-zinc-800/80 mt-1 pt-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sign Out (Disconnect)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

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
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-2">
            SELECT STOREFRONT:
          </div>
          <button
            onClick={() => {
              setActiveDepartment('hub');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded text-zinc-200 hover:text-white hover:bg-white/5 font-medium flex items-center gap-2"
          >
            <Globe2 className="w-4 h-4 text-red-500" />
            Global Universal Hub
          </button>
          <button
            onClick={() => {
              openLootCrate();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium flex items-center gap-2"
          >
            <Package className="w-4 h-4 text-amber-400" />
            Cyber Loot Crates (Unbox Drops)
          </button>
          <button
            onClick={() => {
              openBattlestationBuilder();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            PC Battlestation Studio (Build Rig)
          </button>
          <button
            onClick={() => {
              openFormulaLab();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 font-medium flex items-center gap-2"
          >
            <FlaskConical className="w-4 h-4 text-orange-400" />
            CyberFuel Formula Lab (Mix Tub)
          </button>
          {departments.map(dept => (
            <button
              key={dept.id}
              onClick={() => {
                setActiveDepartment(dept.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded text-zinc-300 hover:text-white hover:bg-white/5 font-medium flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.accentColor }} />
              <span>{dept.name}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
