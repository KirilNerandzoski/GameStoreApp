import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Flame, 
  ShoppingBag, 
  Heart, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Gamepad
} from 'lucide-react';

export default function HeroShowcase() {
  const { 
    games, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    isInCart, 
    openGameDetail 
  } = useStore();

  const heroGames = games.filter(g => g.isHero);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 7, minutes: 34, seconds: 48 });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance hero slides every 8 seconds
  useEffect(() => {
    if (heroGames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % heroGames.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroGames.length]);

  if (!heroGames.length) return null;
  const game = heroGames[currentIdx] || heroGames[0];
  const inWish = isInWishlist(game.id);
  const inCart = isInCart(game.id);

  const formatDigits = (num) => String(num).padStart(2, '0');

  return (
    <div className="relative w-full min-h-[620px] lg:h-[720px] overflow-hidden pt-28 sm:pt-32 pb-14 flex items-center bg-[#07070a]">
      {/* Background Hero Artwork with smooth transition */}
      <div className="absolute inset-0 z-0">
        <img
          key={game.id}
          src={game.heroBanner}
          alt={game.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop';
          }}
          className="w-full h-full object-cover object-center scale-105 animate-fade-in transition-all duration-1000 filter brightness-[0.38] contrast-125"
        />
        {/* Layered cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/75 to-[#07070a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] via-[#07070a]/90 via-50% to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(255,26,53,0.16)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#07070a] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Big Epic Hero Intel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Live Deal & Studio Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-cyber font-bold tracking-wider bg-red-600/25 text-red-400 border border-red-500/40 shadow-[0_0_12px_rgba(255,26,53,0.35)]">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span>SPOTLIGHT HEADLINER</span>
              </span>

              {game.discountPercent > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-xs text-zinc-300 font-mono shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-zinc-400">Offer Closes In:</span>
                  <span className="text-red-400 font-semibold font-mono">
                    {formatDigits(countdown.hours)}:{formatDigits(countdown.minutes)}:{formatDigits(countdown.seconds)}
                  </span>
                </div>
              )}

              <span className="text-xs text-zinc-400 border-l border-zinc-700/80 pl-3 hidden sm:inline font-mono">
                {game.studio} • {game.category}
              </span>
            </div>

            {/* Giant Title & Lead Subtitle */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white leading-none drop-shadow-md">
                {game.title}
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 font-medium max-w-2xl line-clamp-2 leading-relaxed">
                {game.subtitle}
              </p>
            </div>

            {/* Rating & Platforms */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{game.rating}</span>
                <span className="text-zinc-500 font-normal">({game.reviewCount.toLocaleString()})</span>
              </div>

              {game.platforms.map(plat => (
                <span 
                  key={plat}
                  className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 text-xs font-mono font-medium"
                >
                  {plat}
                </span>
              ))}

              {game.tags.slice(0, 3).map(tag => (
                <span 
                  key={tag}
                  className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-zinc-400 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Pricing and Primary Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6">
              
              {/* Bold Price Block */}
              <div className="flex items-center gap-3">
                {game.discountPercent > 0 && (
                  <span className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-cyber font-black text-sm tracking-wider shadow-[0_0_15px_rgba(255,26,53,0.6)]">
                    -{game.discountPercent}%
                  </span>
                )}
                <div className="flex flex-col">
                  {game.discountPercent > 0 && (
                    <span className="text-xs line-through text-zinc-500 font-mono">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
                    ${game.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(game)}
                  className="px-7 py-3.5 rounded-xl font-cyber font-bold tracking-wider text-sm text-white bg-red-600 hover:bg-red-500 shadow-[0_0_25px_rgba(255,26,53,0.45)] hover:shadow-[0_0_35px_rgba(255,26,53,0.7)] transition-all flex items-center gap-2.5 group cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{inCart ? 'ADD ANOTHER KEY' : 'BUY INSTANT KEY'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(game)}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-center cursor-pointer active:scale-90 ${
                    inWish 
                      ? 'bg-red-600/25 border-red-500 text-red-500 shadow-[0_0_15px_rgba(255,26,53,0.3)]' 
                      : 'bg-black/60 border-white/10 text-zinc-300 hover:border-red-500/50 hover:text-white'
                  }`}
                  title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-red-500' : ''}`} />
                </button>

                <button
                  onClick={() => openGameDetail(game)}
                  className="px-4 py-3.5 rounded-xl border border-white/10 bg-black/60 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-red-400" />
                  <span className="hidden sm:inline">Inspect Details</span>
                </button>
              </div>

            </div>

            {/* Security Guarantee Row */}
            <div className="pt-3 flex items-center gap-6 text-xs text-zinc-400 border-t border-white/10 max-w-xl">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Authorized Direct Publisher License</span>
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-400 shrink-0" />
                <span>Instant Digital Activation Under 2s</span>
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Lineup Selector */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-1">
              <span className="uppercase tracking-widest text-zinc-400 font-semibold">Featured Titles</span>
              <span>{currentIdx + 1} of {heroGames.length}</span>
            </div>

            <div className="space-y-2.5">
              {heroGames.map((hg, idx) => {
                const isActive = idx === currentIdx;
                return (
                  <button
                    key={hg.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center gap-3.5 border cursor-pointer ${
                      isActive 
                        ? 'bg-white/[0.08] border-red-500/80 shadow-[0_0_20px_rgba(255,26,53,0.25)] translate-x-1.5' 
                        : 'bg-black/40 hover:bg-white/[0.04] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <img
                      src={hg.coverImage}
                      alt={hg.title}
                      className="w-16 h-11 object-cover rounded-lg border border-white/10 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className={`text-xs font-bold font-heading truncate ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                        {hg.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-mono text-red-400 font-semibold">
                          ${hg.price.toFixed(2)}
                        </span>
                        {hg.discountPercent > 0 && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-600/40 text-red-300 font-mono">
                            -{hg.discountPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
