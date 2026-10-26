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
    <div className="relative w-full min-h-[580px] lg:h-[720px] overflow-hidden pt-28 pb-12 flex items-center bg-[#070709]">
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
          className="w-full h-full object-cover object-center scale-105 animate-fade-in transition-all duration-1000 filter brightness-[0.4] contrast-125"
        />
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/70 to-[#070709]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,26,53,0.18)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070709] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Big Epic Intel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Badges & Live Deal Ticker */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-cyber font-bold tracking-wider bg-red-600/30 text-red-400 border border-red-500/50 shadow-[0_0_12px_rgba(255,26,53,0.4)]">
                <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                SPOTLIGHT SHOWCASE
              </span>

              {game.discountPercent > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 border border-zinc-800 text-xs text-zinc-300 font-mono">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-zinc-400">Offer Ends:</span>
                  <span className="text-red-400 font-semibold font-mono">
                    {formatDigits(countdown.hours)}:{formatDigits(countdown.minutes)}:{formatDigits(countdown.seconds)}
                  </span>
                </div>
              )}

              <span className="text-xs text-zinc-400 border-l border-zinc-700 pl-3 hidden sm:inline">
                {game.studio} • {game.category}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white leading-none">
                {game.title}
              </h1>
              <p className="mt-3 text-lg text-zinc-300 font-medium max-w-2xl line-clamp-2">
                {game.subtitle}
              </p>
            </div>

            {/* Tags & Platforms */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#13141f] border border-red-500/20 text-yellow-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>{game.rating}</span>
                <span className="text-zinc-500 font-normal">({game.reviewCount.toLocaleString()})</span>
              </div>

              {game.platforms.map(plat => (
                <span 
                  key={plat}
                  className="px-2.5 py-1 rounded bg-[#13141f] border border-zinc-800 text-zinc-300 text-xs font-mono"
                >
                  {plat}
                </span>
              ))}

              {game.tags.slice(0, 3).map(tag => (
                <span 
                  key={tag}
                  className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#10111a] border border-zinc-800/80 text-zinc-400 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Pricing and Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              
              {/* Price Tag */}
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
                  <span className="text-3xl font-black text-white font-heading tracking-wide">
                    ${game.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(game)}
                  className="px-6 py-3.5 rounded-lg font-cyber font-bold tracking-wider text-sm text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_20px_rgba(255,26,53,0.5)] hover:shadow-[0_0_30px_rgba(255,26,53,0.8)] transition-all flex items-center gap-2 group transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {inCart ? 'ADD ANOTHER KEY' : 'BUY INSTANT KEY'}
                </button>

                <button
                  onClick={() => toggleWishlist(game)}
                  className={`p-3.5 rounded-lg border transition-all flex items-center justify-center ${
                    inWish 
                      ? 'bg-red-600/20 border-red-500 text-red-500 shadow-[0_0_15px_rgba(255,26,53,0.3)]' 
                      : 'bg-[#12131b] border-zinc-800 text-zinc-300 hover:border-red-500/50 hover:text-white'
                  }`}
                  title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-red-500' : ''}`} />
                </button>

                <button
                  onClick={() => openGameDetail(game)}
                  className="px-4 py-3.5 rounded-lg border border-zinc-800 bg-[#12131b]/80 hover:bg-[#191b26] hover:border-zinc-600 text-zinc-300 hover:text-white font-medium text-sm transition-all flex items-center gap-1.5"
                >
                  <Info className="w-4 h-4 text-red-400" />
                  <span className="hidden sm:inline">Inspect Intel</span>
                </button>
              </div>

            </div>

            {/* Instant Guarantee Badges */}
            <div className="pt-4 flex items-center gap-6 text-xs text-zinc-400 border-t border-zinc-800/60 max-w-xl">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Authorized Publisher Key
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-400" />
                Zero-Latency Digital Activation
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Slide Selector Cards */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-3">
            <span className="text-xs font-cyber tracking-widest text-zinc-400 uppercase">
              Featured Lineup ({currentIdx + 1}/{heroGames.length})
            </span>

            {heroGames.map((item, idx) => {
              const isActive = idx === currentIdx;
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`cursor-pointer group relative p-3 rounded-xl border transition-all duration-300 flex items-center gap-3.5 ${
                    isActive
                      ? 'bg-[#151622] border-red-500/80 shadow-[0_0_20px_rgba(255,26,53,0.25)] translate-x-1'
                      : 'bg-[#0d0e14]/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#12131c]'
                  }`}
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-24 h-16 rounded-lg object-cover object-center shrink-0 border border-zinc-800 group-hover:border-red-500/50 transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate group-hover:text-red-400 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block truncate mt-0.5">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      {item.discountPercent > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                          -{item.discountPercent}%
                        </span>
                      )}
                      <span className="text-xs font-bold text-white font-mono">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <div className="w-1.5 self-stretch rounded-full bg-red-500 shadow-[0_0_8px_#ff1a35]" />
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Carousel controls indicator */}
        <div className="mt-8 flex items-center justify-between border-t border-zinc-800/50 pt-4">
          <div className="flex items-center gap-2">
            {heroGames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIdx ? 'w-10 bg-red-500 shadow-[0_0_8px_#ff1a35]' : 'w-3 bg-zinc-700 hover:bg-zinc-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentIdx((currentIdx - 1 + heroGames.length) % heroGames.length)}
              className="p-2 rounded-lg bg-[#12131b] border border-zinc-800 text-zinc-300 hover:text-white hover:border-red-500/40 transition-colors"
              aria-label="Previous featured game"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIdx((currentIdx + 1) % heroGames.length)}
              className="p-2 rounded-lg bg-[#12131b] border border-zinc-800 text-zinc-300 hover:text-white hover:border-red-500/40 transition-colors"
              aria-label="Next featured game"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
