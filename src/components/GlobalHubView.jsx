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
  CreditCard,
  Package,
  FlaskConical
} from 'lucide-react';

const DEPT_ICONS = {
  gaming: Gamepad2,
  hardware: Cpu,
  apparel: Shirt,
  collectibles: Trophy,
  services: Cloud,
  fuel: Zap
};

export default function GlobalHubView({ onEnterStore }) {
  const { 
    departments, 
    setActiveDepartment, 
    allProducts, 
    addToCart, 
    openGameDetail, 
    setIsCartOpen,
    bountyState,
    openLootCrate,
    openFormulaLab,
    openBattlestationBuilder
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
      <section className="relative overflow-hidden pt-28 sm:pt-[134px] lg:pt-[136px] pb-16 px-4 sm:px-6 lg:px-8 border-b border-red-500/20 bg-gradient-to-b from-[#0b0c14] via-[#08080c] to-[#050608]">
        {/* Cyber Grid Background with Radial Vignette */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ff1a3508_1px,transparent_1px),linear-gradient(to_bottom,#ff1a3508_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" 
          style={{ maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 80%)' }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(255,26,53,0.3)]">
            <Globe2 className="w-4 h-4 text-red-400 shrink-0" />
            <span>IGNIS Universal Ecosystem • 6 Curated Storefronts</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight uppercase leading-tight max-w-4xl mx-auto">
            One Ecosystem. <span className="text-red-500 drop-shadow-[0_0_30px_rgba(255,26,53,0.5)]">Six Universes.</span><br />
            Unified Checkout.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Browse specialized storefronts across game keys, custom battle rigs, cyberpunk techwear, numbered statues, and energy fuel with one consolidated cart and instant checkout.
          </p>

          {/* Direct Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleEnter('gaming')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-cyber font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,26,53,0.4)] hover:shadow-[0_0_35px_rgba(255,26,53,0.6)] hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Enter Main Game Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#storefronts"
              className="px-6 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 font-cyber font-bold text-sm tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-zinc-400" />
              <span>Explore 6 Storefronts</span>
            </a>
          </div>

          {/* Quick Universal Highlights Pill */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
            <div className="p-3 rounded-xl bg-[#0f101a] border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white font-cyber">6 Sub-Stores</span>
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

      {/* The 6 Sub-Storefront Portals Grid */}
      <section id="storefronts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-wide">
              EXPLORE SPECIALIZED STOREFRONTS
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              Six dedicated sub-catalogs. One universal shopping cart. Instant consolidated checkout.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            System Protocol: <span className="text-emerald-400 font-bold">ALL 6 STORES ONLINE</span>
          </span>
        </div>

        {/* 6 Portals Grid */}
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
                          className="w-14 h-10 rounded-lg object-cover object-center shrink-0 border border-zinc-700" 
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

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEnter(dept.id)}
                        className="flex-1 py-2.5 px-4 rounded-xl font-heading font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(255,26,53,0.25)] cursor-pointer"
                        style={{
                          backgroundColor: `${dept.accentColor}18`,
                          border: `1px solid ${dept.accentColor}60`,
                          color: '#ffffff'
                        }}
                      >
                        <span>Enter {dept.shortName} Storefront</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: dept.accentColor }} />
                      </button>

                      {dept.id === 'hardware' && (
                        <button
                          onClick={() => openBattlestationBuilder()}
                          className="px-3.5 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 flex items-center gap-1.5 transition-all shadow-md shrink-0 hover:scale-105 cursor-pointer"
                          title="Open Interactive PC Battlestation Studio"
                        >
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Build Rig</span>
                        </button>
                      )}

                      {dept.id === 'fuel' && (
                        <button
                          onClick={() => openFormulaLab()}
                          className="px-3.5 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/50 flex items-center gap-1.5 transition-all shadow-md shrink-0 hover:scale-105 cursor-pointer"
                          title="Open Custom Formula Lab Studio"
                        >
                          <FlaskConical className="w-3.5 h-3.5" />
                          <span>Mix Tub</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cyber Crate Loot Vault Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#17120a] via-[#100e0b] to-[#17120a] border border-amber-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(255,183,0,0.15)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/40 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold">
                <Package className="w-4 h-4 text-amber-400" />
                <span>THE SYNDICATE CRATE TERMINAL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide uppercase">
                Spend Operative XP. Unbox Real Drops.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-2xl">
                Experience CS2/Apex-style spinning roulette crate unboxings! Use your earned XP to decrypt Neon, Spec-Ops, and God-Tier Omnicrates containing 10%–50% discount vouchers, free physical shakers, and rare syndicate loot.
              </p>
            </div>

            <button
              onClick={() => openLootCrate()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-heading font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,183,0,0.4)] transition-all flex items-center justify-center gap-2.5 shrink-0 hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-current text-black" />
              <span>Enter Loot Crate Vault</span>
            </button>
          </div>
        </div>
      </section>

      {/* CyberFuel Formula Lab Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#170e08] via-[#1a0f07] to-[#170e08] border border-orange-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(255,85,0,0.15)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-950/40 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold">
                <FlaskConical className="w-4 h-4 text-orange-400" />
                <span>INTERACTIVE MOLECULAR STUDIO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide uppercase">
                Mix Your Own Custom Energy Tub.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-2xl">
                Become the mad bio-chemist! Combine dual flavor fusions, calibrate your exact caffeine potency (0mg to 180mg), inject focus nootropics, and design a custom tub with your gamertag printed on the front label.
              </p>
            </div>

            <button
              onClick={() => openFormulaLab()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-black font-heading font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,85,0,0.4)] transition-all flex items-center justify-center gap-2.5 shrink-0 hover:scale-105 cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-black" />
              <span>Launch Formula Lab</span>
            </button>
          </div>
        </div>
      </section>

      {/* Battlestation Rig Studio Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#07131b] via-[#091b26] to-[#07131b] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>INTERACTIVE PC BATTLESTATION STUDIO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide uppercase">
                Engineer Your Dream Rig & Desk Setup.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-2xl">
                Configure next-gen RTX 5090 GPUs, custom hardline cryo loops, ultrawide 240Hz OLEDs, and motorized standing desks with live wattage calculations, thermal clearance validation, and simulated gaming FPS.
              </p>
            </div>

            <button
              onClick={() => openBattlestationBuilder()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-heading font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2.5 shrink-0 hover:scale-105 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-white" />
              <span>Launch Battlestation Builder</span>
            </button>
          </div>
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
                You never have to checkout separately for games, hardware, apparel, or server nodes. Any item you add from any of the six storefronts is synchronized into your Universal Tactical Cache. All payments, coupons, discounts, and operative XP are processed exclusively through the Global Shell.
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
