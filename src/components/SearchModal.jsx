import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  X, 
  Flame, 
  ShoppingBag, 
  Star, 
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';

export default function SearchModal() {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    games, 
    openGameDetail, 
    addToCart 
  } = useStore();

  const [term, setTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = games.filter(g => {
    const q = term.toLowerCase().trim();
    if (!q) return false;
    return (
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.studio.toLowerCase().includes(q) ||
      g.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  const popularSearches = ['Cyberpunk', 'Souls-like', 'FPS', 'Dark Fantasy', 'Space', 'Ray Tracing'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-[#0c0d14] border border-red-500/40 shadow-[0_0_50px_rgba(255,26,53,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="relative p-4 border-b border-zinc-800 flex items-center gap-3 bg-[#11121d]">
          <Search className="w-5 h-5 text-red-500" />
          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search titles, genres, tactical tags (e.g. Cyberpunk, 5v5, Souls)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {term && (
            <button
              onClick={() => setTerm('')}
              className="p-1 rounded text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-zinc-400 bg-zinc-800/80 hover:bg-zinc-700 px-2.5 py-1 rounded border border-zinc-700"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        {!term && (
          <div className="p-4 border-b border-zinc-800/60 bg-[#0e0f17] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-zinc-500 flex items-center gap-1 font-mono">
              <TrendingUp className="w-3.5 h-3.5 text-red-500" />
              Popular:
            </span>
            {popularSearches.map(tag => (
              <button
                key={tag}
                onClick={() => setTerm(tag)}
                className="px-2.5 py-1 rounded-lg bg-[#141522] hover:bg-[#1c1d2e] border border-zinc-800 hover:border-red-500/40 text-zinc-300 hover:text-white transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {term && filtered.length === 0 && (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm text-zinc-400 font-cyber">No tactical matches found for "{term}"</p>
              <p className="text-xs text-zinc-500">Try broad terms like "Action", "RPG", or "Sci-Fi"</p>
            </div>
          )}

          {!term && (
            <div className="space-y-2">
              <span className="text-[11px] font-cyber font-bold uppercase tracking-wider text-zinc-500 px-2 block">
                Featured Recommendations
              </span>
              {games.slice(0, 4).map(game => (
                <div
                  key={game.id}
                  onClick={() => {
                    openGameDetail(game);
                    setIsSearchOpen(false);
                  }}
                  className="p-3 rounded-xl bg-[#11121d] hover:bg-[#171828] border border-zinc-800/80 hover:border-red-500/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img src={game.coverImage} alt={game.title} className="w-12 h-14 rounded-lg object-cover border border-zinc-800" />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                        {game.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                        <span className="text-red-400 font-medium">{game.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-3 h-3 fill-yellow-400" /> {game.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold font-mono text-white">
                      ${game.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(game);
                      }}
                      className="p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-[0_0_10px_rgba(255,26,53,0.3)] transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {term && filtered.map(game => (
            <div
              key={game.id}
              onClick={() => {
                openGameDetail(game);
                setIsSearchOpen(false);
              }}
              className="p-3 rounded-xl bg-[#11121d] hover:bg-[#171828] border border-zinc-800/80 hover:border-red-500/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <img src={game.coverImage} alt={game.title} className="w-12 h-14 rounded-lg object-cover border border-zinc-800" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                      {game.title}
                    </h4>
                    {game.discountPercent > 0 && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-600 text-white">
                        -{game.discountPercent}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span className="text-red-400 font-medium">{game.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400" /> {game.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold font-mono text-white">
                  ${game.price.toFixed(2)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(game);
                  }}
                  className="p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-[0_0_10px_rgba(255,26,53,0.3)] transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
