import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star, Eye, Zap, ShieldCheck } from 'lucide-react';

export default function GameCard({ game }) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    isInCart, 
    openGameDetail 
  } = useStore();

  const inWish = isInWishlist(game.id);
  const inCart = isInCart(game.id);

  return (
    <article 
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0c0d16] border border-white/[0.08] hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(255,26,53,0.18)] hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-red-500/60"
    >
      {/* Cover Image & Interactive Art Container */}
      <div 
        className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer bg-[#08080d]"
        onClick={() => openGameDetail(game)}
      >
        <img
          src={game.coverImage}
          alt={game.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d16] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges (Discount + Rating) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5">
            {game.discountPercent > 0 ? (
              <span className="px-2.5 py-1 rounded-md font-cyber text-xs font-black bg-red-600 text-white shadow-[0_0_12px_rgba(255,26,53,0.7)] tracking-wider">
                -{game.discountPercent}%
              </span>
            ) : game.badge ? (
              <span className="px-2.5 py-1 rounded-md font-cyber text-[10px] font-bold bg-black/70 backdrop-blur-md text-red-400 border border-red-500/40">
                {game.badge}
              </span>
            ) : null}
          </div>

          {/* Quick Wishlist Button (Interactive) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(game);
            }}
            className={`pointer-events-auto p-2 rounded-xl backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
              inWish 
                ? 'bg-red-600 text-white shadow-[0_0_14px_rgba(255,26,53,0.7)]' 
                : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 border border-white/10'
            }`}
            title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 transition-transform ${inWish ? 'fill-white scale-110' : 'group-hover/btn:scale-110'}`} />
          </button>
        </div>

        {/* View Details Hover Pill */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-cyber font-bold tracking-wider shadow-[0_0_20px_rgba(255,26,53,0.6)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            <Eye className="w-4 h-4" />
            <span>VIEW DETAILS</span>
          </span>
        </div>

        {/* Bottom Platform Badges */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
          {game.platforms.slice(0, 3).map(p => (
            <span 
              key={p} 
              className="px-2 py-0.5 rounded-md text-[9px] font-mono font-semibold bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10"
            >
              {p === 'Xbox Series X' ? 'XBOX' : p === 'Nintendo Switch' ? 'SWITCH' : p}
            </span>
          ))}
        </div>
      </div>

      {/* Card Content & Action Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-[#0c0d16]">
        
        <div className="space-y-1.5">
          {/* Category & Studio Rating */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-red-400 font-semibold tracking-wider uppercase text-[10px]">
              {game.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{game.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => openGameDetail(game)}
            className="text-base font-bold font-heading text-white group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer leading-tight tracking-wide"
            title={game.title}
          >
            {game.title}
          </h3>

          {/* Subtitle / Tagline */}
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
            {game.subtitle}
          </p>
        </div>

        {/* Pricing & Checkout Trigger */}
        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2 mt-auto">
          
          <div className="flex flex-col">
            {game.discountPercent > 0 && (
              <span className="text-[11px] line-through text-zinc-500 font-mono">
                ${game.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-black text-white font-heading tracking-tight leading-none">
              ${game.price.toFixed(2)}
            </span>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={() => addToCart(game)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-cyber font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
              inCart
                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(255,26,53,0.35)] hover:shadow-[0_0_22px_rgba(255,26,53,0.6)]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{inCart ? 'IN CART' : 'BUY KEY'}</span>
          </button>

        </div>

      </div>
    </article>
  );
}
