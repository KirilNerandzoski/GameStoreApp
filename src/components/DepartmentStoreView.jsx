import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Star, 
  Check, 
  Sparkles, 
  SlidersHorizontal, 
  Search, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Lock,
  Layers,
  Heart,
  FlaskConical,
  Cpu
} from 'lucide-react';

export default function DepartmentStoreView({ departmentId, onBackToHub }) {
  const { 
    departments, 
    allProducts, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openGameDetail,
    openFormulaLab,
    openBattlestationBuilder,
    setIsCartOpen 
  } = useStore();

  const dept = departments.find(d => d.id === departmentId) || departments[1];
  const products = allProducts.filter(p => p.department === departmentId);

  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedVariant, setSelectedVariant] = useState({});

  // Categories extraction
  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchTag = p.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchTag) return false;
    }
    return true;
  });

  const handleSelectVariant = (productId, variant) => {
    setSelectedVariant(prev => ({ ...prev, [productId]: variant }));
  };

  return (
    <div className="space-y-12 animate-fade-in pb-24 pt-28">
      
      {/* Top Department Return Bar & Context */}
      <div className="border-b border-zinc-800 bg-[#090a10] sticky top-24 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button
            onClick={onBackToHub}
            className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors group px-3 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4 text-red-500 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Global Universal Shell</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.accentColor }} />
              <span>Browsing: <strong className="text-white">{dept.name}</strong></span>
            </span>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-red-400" />
              <span>Universal Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner for this Department */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#0c0d16] p-6 sm:p-12 shadow-2xl">
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={dept.bannerImage} 
              alt={dept.name} 
              className="w-full h-full object-cover filter brightness-[0.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d16] via-[#0c0d16]/85 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider border backdrop-blur-md"
              style={{
                backgroundColor: `${dept.accentColor}20`,
                borderColor: `${dept.accentColor}60`,
                color: dept.accentColor
              }}
            >
              <span>{dept.badge}</span>
              <span>•</span>
              <span>{dept.stats.delivery}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-wide uppercase leading-tight">
              {dept.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              {dept.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1 text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Global Shell Verified
              </span>
              <span>•</span>
              <span>{dept.stats.items}</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">★ {dept.stats.rating} Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* If Hardware Department: Dedicated Battlestation Studio Banner */}
      {departmentId === 'hardware' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#07131b] via-[#091b26] to-[#07131b] border border-cyan-500/50 p-6 sm:p-8 shadow-[0_0_35px_rgba(0,240,255,0.2)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="space-y-2 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                <span>INTERACTIVE RIG ARCHITECTURE STUDIO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide uppercase">
                BUILD YOUR ULTIMATE PC BATTLESTATION
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl">
                Configure next-gen RTX 5090 GPUs, custom hardline cryo loops, ultrawide OLED monitors, and motor standing desks with real-time wattage and FPS simulation.
              </p>
            </div>

            <button
              onClick={() => openBattlestationBuilder()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-heading font-black text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2.5 shrink-0 hover:scale-105 cursor-pointer z-10"
            >
              <Cpu className="w-4 h-4 text-white" />
              <span>Launch Battlestation Builder</span>
            </button>
          </div>
        </section>
      )}

      {/* If CyberFuel Department: Dedicated Formula Lab Banner */}
      {departmentId === 'fuel' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#170e08] via-[#1f1107] to-[#170e08] border border-orange-500/50 p-6 sm:p-8 shadow-[0_0_35px_rgba(255,85,0,0.2)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="space-y-2 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-950/60 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold">
                <FlaskConical className="w-3.5 h-3.5 animate-pulse" />
                <span>INTERACTIVE MOLECULAR STUDIO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide uppercase">
                MIX YOUR OWN CUSTOM ENERGY TUB
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl">
                Combine your favorite flavor bases, calibrate caffeine levels, inject focus nootropics, and print your custom gamer tag directly on the front label.
              </p>
            </div>

            <button
              onClick={() => openFormulaLab()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-black font-heading font-black text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all flex items-center justify-center gap-2.5 shrink-0 hover:scale-105 cursor-pointer z-10"
            >
              <FlaskConical className="w-4 h-4 text-black" />
              <span>Launch Formula Lab</span>
            </button>
          </div>
        </section>
      )}

      {/* Filter & Category Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-4 rounded-2xl bg-[#0d0e16] border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'text-white shadow-lg'
                    : 'bg-[#141522] text-zinc-400 hover:text-white hover:bg-[#1a1c2c] border border-zinc-800'
                }`}
                style={activeCategory === cat ? {
                  backgroundColor: dept.accentColor,
                  boxShadow: `0 0 15px ${dept.accentColor}60`
                } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${dept.shortName}...`}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#131422] border border-zinc-800 focus:border-red-500 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const chosenPlatform = selectedVariant[product.id] || (product.platforms && product.platforms[0]) || 'Standard';
            const inWishlist = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-[#0c0d16] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)] hover:-translate-y-1.5"
              >
                {/* Image */}
                <div 
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() => openGameDetail(product)}
                >
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d16] via-transparent to-transparent opacity-80" />

                  {/* Discount Badge */}
                  {product.discountPercent > 0 && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-red-600 text-white font-cyber font-black text-xs shadow-md">
                      -{product.discountPercent}%
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
                      inWishlist 
                        ? 'bg-red-600 text-white border-red-500 shadow-[0_0_10px_#ff1a35]' 
                        : 'bg-black/60 text-zinc-400 hover:text-white border-white/10'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  {/* Category chip */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-black/75 border border-white/10 text-[10px] font-mono text-zinc-300">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>{product.studio}</span>
                      <span className="text-amber-400 font-bold flex items-center gap-0.5">
                        ★ {product.rating}
                      </span>
                    </div>

                    <h3 
                      onClick={() => openGameDetail(product)}
                      className="text-base font-bold text-white hover:text-red-400 transition-colors cursor-pointer line-clamp-1"
                      title={product.title}
                    >
                      {product.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 font-sans">
                      {product.description}
                    </p>

                    {/* Variant / Specs picker if multiple */}
                    {product.platforms && product.platforms.length > 1 && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {product.platforms.map(variant => (
                          <button
                            key={variant}
                            onClick={() => handleSelectVariant(product.id, variant)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                              chosenPlatform === variant
                                ? 'bg-white text-black font-bold'
                                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                            }`}
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black font-mono text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs font-mono text-zinc-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 block -mt-0.5">
                        In Stock • Insured
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, chosenPlatform)}
                      className="px-3.5 py-2 rounded-xl text-xs font-heading font-black tracking-wider uppercase text-white transition-all shadow-md hover:scale-105 flex items-center gap-1.5"
                      style={{
                        backgroundColor: dept.accentColor,
                        boxShadow: `0 0 15px ${dept.accentColor}40`
                      }}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
