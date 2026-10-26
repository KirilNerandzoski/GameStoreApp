import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PLATFORMS, SORT_OPTIONS } from '../data/games';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Percent, 
  ArrowUpDown, 
  RotateCcw,
  Gamepad2,
  Flame,
  Crosshair,
  Sword,
  Skull,
  Rocket,
  Zap,
  Eye,
  Shield,
  Cpu
} from 'lucide-react';

const ICON_MAP = {
  Gamepad2,
  Flame,
  Crosshair,
  Sword,
  Skull,
  Rocket,
  Zap,
  Eye,
  Shield,
  Cpu
};

export default function FilterBar({ resultCount }) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPlatform,
    setSelectedPlatform,
    sortBy,
    setSortBy,
    maxPrice,
    setMaxPrice,
    onlyDiscounted,
    setOnlyDiscounted
  } = useStore();

  const isFiltered = 
    selectedCategory !== 'all' || 
    selectedPlatform !== 'All Platforms' || 
    sortBy !== 'featured' || 
    maxPrice < 70 || 
    onlyDiscounted || 
    searchQuery.trim() !== '';

  const resetAll = () => {
    setSelectedCategory('all');
    setSelectedPlatform('All Platforms');
    setSortBy('featured');
    setMaxPrice(70);
    setOnlyDiscounted(false);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Category Chips (Horizontal Scrollable) */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map(cat => {
            const Icon = ICON_MAP[cat.icon] || Gamepad2;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,26,53,0.5)] border border-red-500'
                    : 'bg-[#0f1017] text-zinc-300 hover:text-white hover:bg-[#161722] border border-zinc-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-red-500'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Filter & Sort Controls Bar */}
      <div className="p-4 rounded-xl bg-[#0d0e14] border border-zinc-800 shadow-xl flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Left: Search input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter catalog by title, tag..."
            className="w-full h-10 pl-10 pr-9 rounded-xl bg-[#0e0f18] border border-zinc-800 hover:border-zinc-700 focus:border-red-500/80 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
              title="Clear filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Center: Controls Group */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          
          {/* Platform filter */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-300">
            <span className="text-zinc-500 hidden sm:inline">Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#14151f] border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-500"
            >
              {PLATFORMS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Sort By dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-red-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#14151f] border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-500"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14151f] border border-zinc-800 text-xs">
            <span className="text-zinc-400">Max:</span>
            <span className="text-red-400 font-bold font-mono min-w-9">${maxPrice}</span>
            <input
              type="range"
              min="20"
              max="70"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-20 accent-red-600 cursor-pointer"
            />
          </div>

          {/* Only Discounted Toggle */}
          <button
            onClick={() => setOnlyDiscounted(!onlyDiscounted)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              onlyDiscounted
                ? 'bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_10px_rgba(255,26,53,0.3)]'
                : 'bg-[#14151f] border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Percent className="w-3.5 h-3.5 text-red-400" />
            <span>On Sale</span>
          </button>

          {/* Reset button if anything filtered */}
          {isFiltered && (
            <button
              onClick={resetAll}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Right: Live Counter */}
        <div className="text-xs text-zinc-400 font-mono w-full lg:w-auto text-right">
          Showing <span className="text-white font-bold">{resultCount}</span> titles
        </div>

      </div>

    </div>
  );
}
