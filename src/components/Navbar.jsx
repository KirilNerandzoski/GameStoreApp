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
  ChevronDown,
  Package,
  FlaskConical,
  LogOut,
  Volume2,
  VolumeX,
  Layers,
  Wrench,
  Boxes
} from 'lucide-react';
import { getAudioMuted, toggleAudioMuted } from '../utils/cyberAudio';

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
    activeDepartment,
    setActiveDepartment,
    departments,
    openLootCrate,
    openFormulaLab,
    openBattlestationBuilder,
    openBountiesModal,
    currentUser,
    openAuthModal,
    signOut
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [studiosDropdownOpen, setStudiosDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => getAudioMuted());

  const profileRef = useRef(null);
  const studiosRef = useRef(null);

  useEffect(() => {
    const handleMuteChange = (e) => {
      setIsMuted(e.detail);
    };
    window.addEventListener('ignis_audio_muted_change', handleMuteChange);
    return () => window.removeEventListener('ignis_audio_muted_change', handleMuteChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (studiosRef.current && !studiosRef.current.contains(e.target)) {
        setStudiosDropdownOpen(false);
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
          ? 'bg-[#07080d]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.85)]' 
          : 'bg-[#07080d]/85 backdrop-blur-xl border-b border-white/[0.05]'
      }`}
    >
      {/* Top Department Switcher Strip */}
      <div className="bg-[#050609]/95 border-b border-white/[0.06] py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          
          {/* Store Switcher Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setActiveDepartment('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                activeDepartment === 'hub'
                  ? 'bg-zinc-800 text-white border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-zinc-300" />
              <span>All Stores Hub</span>
            </button>

            <span className="text-zinc-700">|</span>

            {departments.map(dept => {
              const isActive = activeDepartment === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setActiveDepartment(dept.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1 rounded-lg text-xs tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white shadow-lg font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  style={isActive ? {
                    backgroundColor: `${dept.accentColor}30`,
                    border: `1px solid ${dept.accentColor}`,
                    color: '#ffffff',
                    boxShadow: `0 0 14px ${dept.accentColor}50`
                  } : {}}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dept.accentColor }} />
                  <span>{dept.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Perks Indicator */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>1 Unified Cart</span>
            </span>
          </div>

        </div>
      </div>

      {/* Main Command Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 lg:gap-8">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setActiveDepartment('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
              title="Return to Universal Hub"
            >
              <div 
                className="w-10 h-10 rounded-xl p-[1px] shadow-lg transition-transform group-hover:scale-105"
                style={{
                  background: currentDeptObj ? `linear-gradient(135deg, ${currentDeptObj.accentColor}, #000)` : 'linear-gradient(135deg, #ff1a35, #3b0000)'
                }}
              >
                <div className="w-full h-full bg-[#0d0e14] rounded-xl flex items-center justify-center">
                  <Flame 
                    className="w-5 h-5 transition-transform" 
                    style={{ color: currentDeptObj ? currentDeptObj.accentColor : '#ff1a35' }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-2xl tracking-wider text-white group-hover:text-red-400 transition-colors">
                    IGNIS
                  </span>
                  <span 
                    className="text-[10px] font-cyber px-1.5 py-0.5 rounded border"
                    style={{
                      backgroundColor: currentDeptObj && activeDepartment !== 'hub' ? `${currentDeptObj.accentColor}20` : 'rgba(255,26,53,0.2)',
                      borderColor: currentDeptObj && activeDepartment !== 'hub' ? `${currentDeptObj.accentColor}40` : 'rgba(255,26,53,0.3)',
                      color: currentDeptObj && activeDepartment !== 'hub' ? currentDeptObj.accentColor : '#ff4d66'
                    }}
                  >
                    {activeDepartment === 'hub' ? 'HUB' : (currentDeptObj ? currentDeptObj.shortName.toUpperCase() : 'STORE')}
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase -mt-0.5">
                  {activeDepartment === 'hub' ? 'Universal Marketplace' : (currentDeptObj?.name || 'Next-Gen Gaming')}
                </span>
              </div>
            </a>
          </div>

          {/* Central Omni-Search Bar */}
          <div className="flex-1 min-w-[200px] max-w-xl hidden md:block">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full h-11 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-red-500/50 text-zinc-400 text-sm transition-all group flex items-center justify-between gap-3 cursor-pointer shadow-inner"
              title="Global Omni-Search across all 6 stores (Ctrl + K)"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Search className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors shrink-0" />
                {searchQuery ? (
                  <span className="font-sans text-xs sm:text-sm text-red-400 font-medium truncate">
                    Active Search: <span className="text-white font-semibold">"{searchQuery}"</span>
                  </span>
                ) : (
                  <span className="font-sans text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors truncate">
                    Search across all 6 stores, titles, rigs, apparel...
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
                    title="Clear query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </span>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 rounded group-hover:text-red-400 group-hover:border-red-500/30">
                  <Command className="w-3 h-3 inline" />
                  <span>K</span>
                </kbd>
              </div>
            </button>
          </div>

          {/* Right Action Icons & Studios Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Consolidated Studios & Labs Dropdown */}
            <div className="relative" ref={studiosRef}>
              <button
                onClick={() => setStudiosDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-zinc-200 hover:text-white transition-all cursor-pointer font-cyber text-xs font-bold tracking-wider"
                title="Open Interactive Studios & Arcade Labs"
              >
                <Boxes className="w-4 h-4 text-red-500" />
                <span className="hidden sm:inline">STUDIOS</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${studiosDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Studios Dropdown Menu */}
              {studiosDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[#0e101a] border border-zinc-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-2.5 z-50 animate-fade-in space-y-1.5 ring-1 ring-white/10">
                  <div className="px-3 py-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-800 flex items-center justify-between">
                    <span>Interactive Studios & Labs</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>

                  {/* Loot Crates */}
                  <button
                    onClick={() => {
                      openLootCrate();
                      setStudiosDropdownOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all flex items-center gap-3 text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors font-cyber">
                        CYBER LOOT CRATES
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">
                        Spin & decrypt vouchers & drops
                      </div>
                    </div>
                  </button>

                  {/* PC Battlestation Studio */}
                  <button
                    onClick={() => {
                      openBattlestationBuilder();
                      setStudiosDropdownOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-cyan-500/40 transition-all flex items-center gap-3 text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors font-cyber">
                        RIG BUILDER STUDIO
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">
                        Configure custom PC & desk setup
                      </div>
                    </div>
                  </button>

                  {/* Formula Lab */}
                  <button
                    onClick={() => {
                      openFormulaLab();
                      setStudiosDropdownOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-orange-500/40 transition-all flex items-center gap-3 text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-105 transition-transform">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors font-cyber">
                        CYBERFUEL FORMULA LAB
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">
                        Mix custom energy drink tubs
                      </div>
                    </div>
                  </button>

                  {/* Bounties & Earn Coupons */}
                  <button
                    onClick={() => {
                      openBountiesModal ? openBountiesModal() : onNavigateSection?.('bounties');
                      setStudiosDropdownOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-emerald-500/40 transition-all flex items-center gap-3 text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors font-cyber">
                        EARN DISCOUNT COUPONS
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">
                        Complete quests for up to 40% OFF
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Audio Mute/Unmute Toggle Button */}
            <button
              onClick={() => toggleAudioMuted()}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isMuted 
                  ? 'text-zinc-500 border-white/[0.06] hover:text-zinc-300 hover:border-white/10 bg-white/[0.02]' 
                  : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500/50'
              }`}
              title={isMuted ? 'Audio Muted — Click to unmute sound effects' : 'Audio Active — Click to mute sound effects'}
              aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl text-zinc-300 hover:text-red-400 hover:bg-white/[0.05] border border-white/[0.08] hover:border-red-500/40 transition-all group cursor-pointer"
              title="Tactical Wishlist"
            >
              <Heart className="w-4 h-4 transition-transform group-hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-[0_0_8px_#ff1a35]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Universal Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all shadow-[0_0_20px_rgba(255,26,53,0.35)] hover:shadow-[0_0_25px_rgba(255,26,53,0.6)] cursor-pointer active:scale-95"
              title="Global Universal Cart"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold font-cyber tracking-wider">
                CART
              </span>
              {totalCartCount > 0 && (
                <span className="flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-black text-[11px] font-black text-white ml-0.5">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Pill */}
            <div className="relative" ref={profileRef}>
              {currentUser ? (
                <div className="flex items-center gap-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 rounded-xl p-1 sm:px-2.5 sm:py-1.5 transition-all">
                  <button
                    onClick={() => setProfileDropdownOpen(prev => !prev)}
                    className="flex items-center gap-2 cursor-pointer text-left"
                    title="User Account"
                  >
                    <div className="relative">
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.gamertag}
                        className="w-7 h-7 rounded-lg object-cover border border-white/20"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-black" />
                    </div>
                    <div className="hidden sm:flex flex-col">
                      <span className="text-xs font-semibold text-white tracking-wide truncate max-w-[100px]">
                        {userProfile.gamertag}
                      </span>
                      <span className="text-[9px] text-emerald-400 font-mono">
                        LVL {userProfile.level}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    onClick={() => signOut()}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal()}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/25 text-white transition-all cursor-pointer"
                  title="Sign In with Google or Email"
                >
                  <User className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-cyber font-bold tracking-wider uppercase text-zinc-200">
                    SIGN IN
                  </span>
                </button>
              )}

              {/* Profile Dropdown Menu */}
              {currentUser && profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#0e101a] border border-zinc-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-2 z-50 animate-fade-in ring-1 ring-white/10">
                  <div className="p-3 border-b border-white/[0.06] flex items-center gap-3">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.gamertag}
                      className="w-10 h-10 rounded-xl object-cover border border-white/20"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate font-cyber">
                        {userProfile.gamertag}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate font-mono">
                        {currentUser.email || 'Session Active'}
                      </div>
                    </div>
                  </div>

                  <div className="p-1 space-y-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
                    >
                      <User className="w-4 h-4 text-red-400" />
                      <span>View Account & Orders</span>
                    </button>

                    <button
                      onClick={() => {
                        signOut();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left border-t border-white/[0.06] mt-1 pt-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0b12] border-b border-zinc-800 px-5 py-4 shadow-2xl space-y-2.5 animate-fade-in">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest px-2 pb-1 border-b border-white/[0.06]">
            STOREFRONTS
          </div>

          <button
            onClick={() => {
              setActiveDepartment('hub');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-xl text-zinc-200 hover:text-white hover:bg-white/5 font-medium flex items-center gap-2.5 text-xs"
          >
            <Globe2 className="w-4 h-4 text-red-500" />
            <span>Universal Hub</span>
          </button>

          {departments.map(dept => (
            <button
              key={dept.id}
              onClick={() => {
                setActiveDepartment(dept.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 font-medium flex items-center gap-2.5 text-xs"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.accentColor }} />
              <span>{dept.name}</span>
            </button>
          ))}

          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest px-2 pt-2 border-t border-white/[0.06]">
            INTERACTIVE STUDIOS
          </div>

          <button
            onClick={() => {
              openLootCrate();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-xl bg-amber-500/10 text-amber-400 font-medium flex items-center gap-2.5 text-xs"
          >
            <Package className="w-4 h-4 text-amber-400" />
            <span>Cyber Loot Crates (Vouchers & Drops)</span>
          </button>

          <button
            onClick={() => {
              openBattlestationBuilder();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-xl bg-cyan-500/10 text-cyan-400 font-medium flex items-center gap-2.5 text-xs"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>PC Battlestation Studio</span>
          </button>

          <button
            onClick={() => {
              openFormulaLab();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-xl bg-orange-500/10 text-orange-400 font-medium flex items-center gap-2.5 text-xs"
          >
            <FlaskConical className="w-4 h-4 text-orange-400" />
            <span>CyberFuel Formula Lab</span>
          </button>
        </div>
      )}
    </header>
  );
}
