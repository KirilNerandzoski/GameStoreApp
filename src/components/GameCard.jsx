import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';

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
    <div 
      className="group relative flex flex-col rounded-xl overflow-hidden bg-[#0d0e14] border border-zinc-800/80 hover:border-red-500/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,26,53,0.3)] hover:-translate-y-1.5"
    >
      {/* Cover Image & Overlays */}
      <div 
        className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden cursor-pointer"
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
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 filter brightness-95 contrast-105"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-transparent to-black/30" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {game.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded font-cyber text-[11px] font-black bg-red-600 text-white shadow-[0_0_10px_rgba(255,26,53,0.6)]">
              -{game.discountPercent}%
            </span>
          )}
          {game.badge && game.discountPercent === 0 && (
            <span className="px-2 py-0.5 rounded font-cyber text-[10px] font-bold bg-zinc-900/90 text-red-400 border border-red-500/40 backdrop-blur-md">
              {game.badge}
            </span>
          )}
        </div>

        {/* Quick Wishlist Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(game);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-lg backdrop-blur-md transition-all ${
            inWish 
              ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(255,26,53,0.6)]' 
              : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80'
          }`}
          title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Pill on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-cyber font-bold tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            VIEW DOSSIER
          </span>
        </div>

        {/* Platform badges on bottom-left of image */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          {game.platforms.slice(0, 3).map(p => (
            <span 
              key={p} 
              className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-black/80 text-zinc-300 border border-zinc-700/60"
            >
              {p === 'Xbox Series X' ? 'XBOX' : p === 'Nintendo Switch' ? 'SWITCH' : p}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Category & Studio */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-1">
            <span className="text-red-400 font-medium">{game.category}</span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-3 h-3 fill-yellow-400" />
              <span>{game.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => openGameDetail(game)}
            className="text-base font-bold font-heading text-white group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer"
            title={game.title}
          >
            {game.title}
          </h3>

          {/* Subtitle / Tagline */}
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-sans">
            {game.subtitle}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          
          <div className="flex flex-col">
            {game.discountPercent > 0 && (
              <span className="text-[11px] line-through text-zinc-500 font-mono">
                ${game.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-black text-white font-heading tracking-wide">
              ${game.price.toFixed(2)}
            </span>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => addToCart(game)}
            className={`px-3 py-2 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              inCart
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(255,26,53,0.35)] hover:shadow-[0_0_18px_rgba(255,26,53,0.6)]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {inCart ? 'IN CART' : 'BUY KEY'}
          </button>

        </div>

      </div>
    </div>
  );
}
