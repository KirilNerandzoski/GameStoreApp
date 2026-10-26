import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight,
  Flame
} from 'lucide-react';

export default function WishlistDrawer() {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    games, 
    toggleWishlist, 
    addToCart,
    openGameDetail,
    setIsCartOpen
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedGames = games.filter(g => wishlist.includes(g.id));

  const handleMoveAllToCart = () => {
    wishlistedGames.forEach(game => {
      addToCart(game, null, false);
    });
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={() => setIsWishlistOpen(false)} />

      {/* Drawer */}
      <div 
        className="relative z-10 w-full max-w-md bg-[#0a0b10] border-l border-red-500/30 h-full flex flex-col shadow-[-10px_0_40px_rgba(255,26,53,0.2)] animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-[#0e0f17]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-500">
              <Heart className="w-4 h-4 fill-red-500" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white tracking-wide">
                OPERATIVE WISHLIST
              </h3>
              <span className="text-[11px] text-zinc-400 font-mono">
                {wishlistedGames.length} targets locked on radar
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistedGames.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-cyber">No Radar Targets</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Save games to track price drops, alerts, and instant acquisition readiness.
                </p>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 rounded-lg text-xs font-cyber font-bold tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(255,26,53,0.4)] transition-all"
              >
                BROWSE TITLES
              </button>
            </div>
          ) : (
            wishlistedGames.map(game => (
              <div
                key={game.id}
                className="p-3 rounded-xl bg-[#11121c] border border-zinc-800/80 hover:border-red-500/40 transition-colors flex gap-3 group"
              >
                {/* Thumb */}
                <img
                  src={game.coverImage}
                  alt={game.title}
                  onClick={() => {
                    openGameDetail(game);
                    setIsWishlistOpen(false);
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop';
                  }}
                  className="w-24 h-16 sm:w-28 sm:h-18 rounded-lg object-cover object-center shrink-0 cursor-pointer border border-zinc-800 hover:opacity-80 transition-opacity shadow-sm"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => {
                          openGameDetail(game);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs font-bold text-white truncate cursor-pointer hover:text-red-400 transition-colors"
                      >
                        {game.title}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(game)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-0.5"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {game.discountPercent > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-600 text-white">
                          -{game.discountPercent}%
                        </span>
                      )}
                      <span className="text-[11px] text-zinc-400">
                        {game.category}
                      </span>
                    </div>
                  </div>

                  {/* Price & Move to Cart */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60">
                    <span className="text-xs font-bold font-mono text-white">
                      ${game.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(game);
                        toggleWishlist(game, false);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Cache</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedGames.length > 0 && (
          <div className="p-4 border-t border-zinc-800 bg-[#0e0f17] space-y-3">
            <button
              onClick={handleMoveAllToCart}
              className="w-full py-3 rounded-xl text-xs font-cyber font-bold tracking-wider text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_15px_rgba(255,26,53,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>MOVE ALL ITEMS TO CART</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
