import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Globe2, 
  Gamepad2, 
  Cpu, 
  Shirt, 
  Trophy, 
  Cloud, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  Star,
  CheckCircle2,
  ExternalLink,
  Layers,
  CreditCard
} from 'lucide-react';

const DEPT_ICONS = {
  gaming: Gamepad2,
  hardware: Cpu,
  apparel: Shirt,
  collectibles: Trophy,
  services: Cloud
};

export default function GlobalHubView({ onEnterStore }) {
  const { 
    departments, 
    setActiveDepartment, 
    allProducts, 
    addToCart, 
    openGameDetail, 
    setIsCartOpen,
    bountyState
  } = useStore();

  const handleEnter = (deptId) => {
    setActiveDepartment(deptId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onEnterStore?.(deptId);
  };

  // 1 featured product from each department for the preview cards
  const getDeptPreviewProduct = (deptId) => {
    return allProducts.find(p => p.department === deptId);
  };

  return (
    <div className="space-y-16 animate-fade-in pb-20">
      
      {/* Universal Hero Portal Banner */}
      <section className="relative overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-red-500/20 bg-gradient-to-b from-[#0b0c14] via-[#08080c] to-[#050608]">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff1a3508_1px,transparent_1px),linear-gradient(to_bottom,#ff1a3508_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(255,26,53,0.3)]">
            <Globe2 className="w-4 h-4 animate-spin-slow text-red-400" />
            <span>Global Universal Shell // Omni-Commerce Protocol</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight uppercase leading-none max-w-5xl mx-auto">
            One Shell. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">Five Universes.</span><br />
            Unified Checkout.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-3xl mx-auto font-sans leading-relaxed">
            Welcome to the overarching ecosystem. Browse specialized independent storefronts across game keys, extreme rigs, cyberpunk techwear, numbered statues, and cloud nodes.
            <span className="text-white font-medium block mt-1">
              Add products from any store into your unified cache—pay in 1 frictionless transaction through the Global Shell.
            </span>
          </p>

          {/* Quick Universal Highlights Pill */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
            <div className="p-3 rounded-xl bg-[#0f101a] border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white font-cyber">5 Sub-Stores</span>
                <span className="block text-[10px] text-zinc-400">Independent catalogs</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0f101a] border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white font-cyber">1 Universal Cart</span>
                <span className="block text-[10px] text-zinc-400">Cross-store queue</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0f101a] border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white font-cyber">Single Checkout</span>
                <span className="block text-[10px] text-zinc-400">Pay through Shell only</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0f101a] border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white font-cyber">Universal Loyalty</span>
                <span className="block text-[10px] text-zinc-400">Sitewide coupons & XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Department Mega-Portals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Storefronts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide mt-1">
              SELECT YOUR STOREFRONT PORTAL
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Current Protocol: <span className="text-emerald-400 font-bold">ALL 5 SYSTEMS OPERATIONAL</span>
          </span>
        </div>

        {/* 5 Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => {
            const Icon = DEPT_ICONS[dept.id] || Globe2;
            const previewProduct = getDeptPreviewProduct(dept.id);

            return (
              <div
                key={dept.id}
                className="group relative rounded-2xl bg-[#0d0e16] border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              >
                {/* Header Image with Overlay */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={dept.bannerImage}
                    alt={dept.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e16] via-[#0d0e16]/60 to-transparent" />
                  
                  {/* Department Badge */}
                  <div className="absolute top-3 left-3">
                    <span 
                      className="px-2.5 py-1 rounded-md text-[10px] font-cyber font-bold tracking-wider uppercase border backdrop-blur-md"
                      style={{ 
                        backgroundColor: `${dept.accentColor}20`, 
                        borderColor: `${dept.accentColor}50`, 
                        color: dept.accentColor 
                      }}
                    >
                      {dept.badge}
                    </span>
                  </div>

                  {/* Icon badge */}
                  <div 
                    className="absolute bottom-3 left-4 w-11 h-11 rounded-xl flex items-center justify-center border shadow-lg backdrop-blur-md"
                    style={{ 
                      backgroundColor: '#0d0e16', 
                      borderColor: `${dept.accentColor}60`, 
                      color: dept.accentColor 
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-heading font-black text-white group-hover:text-red-400 transition-colors">
                        {dept.name}
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        Vertical 0{index + 1}
                      </span>
                    </div>

                    <p className="text-xs font-mono font-medium" style={{ color: dept.accentColor }}>
                      {dept.tagline}
                    </p>

                    <p className="text-xs text-zinc-400 line-clamp-2 font-sans">
                      {dept.description}
                    </p>
                  </div>

                  {/* Quick Preview Product Chip */}
                  {previewProduct && (
                    <div className="p-2.5 rounded-xl bg-[#131420] border border-zinc-800/80 flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img 
                          src={previewProduct.coverImage} 
                          alt={previewProduct.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-zinc-700" 
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-zinc-400 block uppercase font-mono">Trending In Store</span>
                          <span className="text-xs font-bold text-white truncate block">
                            {previewProduct.title}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(previewProduct)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 shrink-0 transition-all hover:scale-105"
                        title="Quick Add to Universal Cart"
                      >
                        + ${previewProduct.price.toFixed(2)}
                      </button>
                    </div>
                  )}

                  {/* Stats Bar & Enter Portal Button */}
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
                      <span>{dept.stats.items}</span>
                      <span>•</span>
                      <span>Rating {dept.stats.rating}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{dept.stats.delivery}</span>
                    </div>

                    <button
                      onClick={() => handleEnter(dept.id)}
                      className="w-full py-2.5 px-4 rounded-xl font-heading font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(255,26,53,0.25)]"
                      style={{
                        backgroundColor: `${dept.accentColor}18`,
                        border: `1px solid ${dept.accentColor}60`,
                        color: '#ffffff'
                      }}
                    >
                      <span>Enter {dept.shortName} Storefront</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: dept.accentColor }} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Universal Cart & Unified Checkout Explainer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#0f1019] to-[#12131f] border border-red-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-red-600/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>UNIFIED PAYMENT GATEWAY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide uppercase">
                Browse Everywhere. Checkout in One Place.
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed max-w-2xl">
                You never have to checkout separately for games, hardware, apparel, or server nodes. Any item you add from any of the five storefronts is synchronized into your Universal Tactical Cache. All payments, coupons, discounts, and operative XP are processed exclusively through the Global Shell.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(255,26,53,0.5)] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Open Universal Cart</span>
              </button>
              <button
                onClick={() => handleEnter('gaming')}
                className="py-3 px-6 rounded-xl bg-[#161726] hover:bg-[#1c1e30] border border-zinc-700 text-zinc-200 hover:text-white font-heading font-black text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>Browse Flagship Games</span>
                <ArrowRight className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
