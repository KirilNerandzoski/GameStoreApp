import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  PRIMARY_FLAVORS, 
  SECONDARY_INFUSIONS, 
  STIM_PROFILES, 
  FUNCTIONAL_BOOSTERS, 
  TUB_FINISHES, 
  TUB_EMBLEMS 
} from '../data/formulaLabData';
import { playWinSound } from '../utils/cyberAudio';
import { generateTubImage } from '../utils/generateTubImage';
import confetti from 'canvas-confetti';
import { 
  X, 
  FlaskConical, 
  Sparkles, 
  Zap, 
  Check, 
  ShoppingBag, 
  ChevronRight, 
  Sliders, 
  Palette, 
  Tag, 
  RotateCcw,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';

export default function CyberFuelLabModal() {
  const { 
    isFormulaLabOpen, 
    setIsFormulaLabOpen, 
    addToCart, 
    setIsCartOpen, 
    userProfile,
    addToast
  } = useStore();

  // Configurator State
  const [activeTab, setActiveTab] = useState(1); // 1: Flavor, 2: Stimulants, 3: Aesthetics, 4: Label
  const [primaryFlavor, setPrimaryFlavor] = useState(PRIMARY_FLAVORS[0]);
  const [secondaryFlavor, setSecondaryFlavor] = useState(SECONDARY_INFUSIONS[0]);
  const [stimProfile, setStimProfile] = useState(STIM_PROFILES[1]); // 140mg default
  const [selectedBoosters, setSelectedBoosters] = useState(['boost-alpha-gpc', 'boost-lions-mane']);
  const [tubFinish, setTubFinish] = useState(TUB_FINISHES[0]);
  const [tubEmblem, setTubEmblem] = useState(TUB_EMBLEMS[0]);
  const [formulaName, setFormulaName] = useState('Aim-Lock Protocol');
  const [creatorTag, setCreatorTag] = useState(userProfile.gamertag || 'Valkyrie_99');
  const [includeShaker, setIncludeShaker] = useState(false);

  // Sync creator tag if userProfile changes
  useEffect(() => {
    if (userProfile.gamertag && creatorTag === 'Valkyrie_99') {
      setCreatorTag(userProfile.gamertag);
    }
  }, [userProfile]);

  const handleClose = () => {
    setIsFormulaLabOpen(false);
    try {
      if (window.location.hash && (window.location.hash.includes('lab') || window.location.hash.includes('custom'))) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch (e) {
      window.location.hash = '';
    }
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFormulaLabOpen) {
        handleClose();
      }
    };
    if (isFormulaLabOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFormulaLabOpen]);

  const toggleBooster = (id) => {
    setSelectedBoosters(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const basePrice = 39.99;
  const totalPrice = Number((basePrice + (includeShaker ? 10.00 : 0)).toFixed(2));

  const handleSynthesizeAndAddToCart = () => {
    // Generate the exact custom visual as designed by user
    const customTubDataUrl = generateTubImage({
      formulaName: formulaName.trim() || 'Aim-Lock Protocol',
      primaryColor: primaryFlavor.color,
      secondaryColor: secondaryFlavor.color,
      primaryFlavorName: primaryFlavor.name,
      secondaryFlavorName: secondaryFlavor.name,
      emblem: tubEmblem.symbol,
      caffeine: stimProfile.caffeine,
      creator: creatorTag.trim() || 'Operative',
      finishName: tubFinish.name
    });

    const customProduct = {
      id: `fuel-custom-${Date.now()}`,
      department: 'fuel',
      departmentName: 'CyberFuel Labs',
      itemType: 'physical',
      title: `🧪 Custom Tub: ${formulaName.trim() || 'Custom Bio-Overclock'}`,
      studio: `${creatorTag.trim() || 'Operative'} x CyberFuel Labs`,
      price: totalPrice,
      originalPrice: totalPrice + 10.00,
      discountPercent: 15,
      rating: 5.0,
      reviewCount: 1,
      category: 'Custom Formulas',
      platforms: [
        '40 Servings',
        `${stimProfile.caffeine}mg Caffeine`,
        `${primaryFlavor.name} + ${secondaryFlavor.name}`,
        tubFinish.name
      ],
      coverImage: customTubDataUrl,
      heroBanner: customTubDataUrl,
      tags: [
        'Custom Formula', 
        '40 Servings', 
        `${stimProfile.caffeine}mg Caffeine`, 
        primaryFlavor.name
      ],
      features: [
        `Base Flavor: ${primaryFlavor.name} infused with ${secondaryFlavor.name}`,
        `Stim Profile: ${stimProfile.name} (${stimProfile.caffeine}mg Caffeine)`,
        `Active Boosters: ${selectedBoosters.map(b => FUNCTIONAL_BOOSTERS.find(fb => fb.id === b)?.name).filter(Boolean).join(', ')}`,
        `Custom Aesthetic: ${tubFinish.name} with ${tubEmblem.name} (${tubEmblem.symbol}) • Packaged with custom gamertag label`
      ],
      description: `1-of-a-kind personalized CyberFuel formula synthesized by ${creatorTag}. Features ${primaryFlavor.name} with a smooth ${secondaryFlavor.name} infusion, engineered for ${stimProfile.tagline.toLowerCase()}.`,
      isCustomFormula: true,
      customMeta: {
        primaryFlavor: primaryFlavor.name,
        secondaryFlavor: secondaryFlavor.name,
        caffeine: stimProfile.caffeine,
        boosters: selectedBoosters,
        emblem: tubEmblem.symbol,
        finish: tubFinish.name,
        creator: creatorTag,
        includeShaker
      }
    };

    // Add to Universal Cart
    addToCart(customProduct);

    // Audio & Confetti
    playWinSound('epic');
    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: [primaryFlavor.color, '#ff5500', '#ffffff']
      });
    } catch (e) {}

    addToast(
      'Formula Synthesized!',
      `"${customProduct.title}" added to your Universal Cart!`,
      'success'
    );

    handleClose();
    setIsCartOpen(true);
  };

  if (!isFormulaLabOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/90 animate-fade-in">
      
      {/* Click outside to close */}
      <div className="fixed inset-0 cursor-pointer" onClick={handleClose} />

      <div className="relative w-full max-w-5xl bg-[#090b12] border border-orange-500/40 rounded-3xl shadow-[0_0_60px_rgba(255,85,0,0.25)] overflow-hidden flex flex-col z-10 max-h-[95vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-zinc-800 bg-gradient-to-r from-[#120b08] via-[#160d09] to-[#120b08] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(255,85,0,0.3)]">
              <FlaskConical className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold">
                  CYBERFUEL LABS // MOLECULAR ALCHEMY
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  LIVE FORMULATOR
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white tracking-wide">
                CUSTOM ENERGY TUB STUDIO
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
            title="Close Lab (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Body: Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* LEFT: Live Dynamic Tub & Telemetry Preview (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-[#06070c] border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between space-y-6">
            
            {/* 3D-Styled Tub Representation */}
            <div className="relative flex flex-col items-center justify-center py-6">
              
              {/* Radial ambient glow behind tub */}
              <div 
                className="absolute w-56 h-56 rounded-full blur-[80px] pointer-events-none transition-all duration-700"
                style={{ backgroundColor: primaryFlavor.glowColor }} 
              />

              {/* The Tub Container */}
              <div 
                className={`relative w-48 h-64 rounded-2xl border-2 flex flex-col justify-between p-3.5 shadow-2xl transition-all duration-500 overflow-hidden ${tubFinish.bg} ${tubFinish.border}`}
                style={{
                  boxShadow: `0 0 35px ${primaryFlavor.glowColor}, inset 0 0 25px rgba(0,0,0,0.8)`
                }}
              >
                {/* Top Cap */}
                <div className="w-full h-8 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-between px-3 shadow-inner">
                  <span className="text-[9px] font-mono font-black tracking-widest text-zinc-400">CYBERFUEL</span>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryFlavor.color }} />
                </div>

                {/* Tub Label Body */}
                <div className="my-2 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col justify-between flex-1 relative overflow-hidden">
                  
                  {/* Subtle color gradient stripe */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500"
                    style={{ backgroundColor: primaryFlavor.color }}
                  />

                  {/* Top Label Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{tubEmblem.symbol}</span>
                    <span className="text-[8px] font-mono px-1 rounded bg-white/10 text-zinc-300 uppercase">
                      40 SERVINGS
                    </span>
                  </div>

                  {/* Formula Name */}
                  <div className="space-y-0.5 my-auto text-center">
                    <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-wider">
                      FORMULA SPEC:
                    </span>
                    <h3 className="text-sm font-black font-heading text-white tracking-wide truncate leading-tight">
                      {formulaName || 'Aim-Lock V1'}
                    </h3>
                    <span 
                      className="text-[10px] font-cyber font-bold block truncate"
                      style={{ color: primaryFlavor.color }}
                    >
                      {primaryFlavor.name}
                    </span>
                  </div>

                  {/* Creator Tag & Specs */}
                  <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[8px] font-mono text-zinc-400">
                    <span>OP: {creatorTag || 'VALKYRIE'}</span>
                    <span className="text-emerald-400 font-bold">{stimProfile.caffeine}mg</span>
                  </div>
                </div>

                {/* Bottom Base */}
                <div className="w-full h-3 rounded-b-lg bg-zinc-900 border-t border-white/10" />
              </div>

              {/* Shaker Addon Badge (if checked) */}
              {includeShaker && (
                <div className="mt-3 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-[10px] font-mono font-bold text-orange-400 flex items-center gap-1.5 animate-bounce">
                  <span>+ MATCHING RGB STEEL SHAKER INCLUDED</span>
                </div>
              )}
            </div>

            {/* Formula Telemetry Dashboard */}
            <div className="p-4 rounded-2xl bg-[#0c0d16] border border-zinc-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400 font-bold uppercase text-[10px]">Active Specs</span>
                <span className="text-emerald-400 font-bold">100% Zero Sugar</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Flavor Profile</span>
                  <span className="text-white font-semibold truncate block">
                    {primaryFlavor.name} + {secondaryFlavor.name}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Caffeine Index</span>
                  <span className="text-orange-400 font-bold block">
                    {stimProfile.caffeine}mg / Serving
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Boosters Injected</span>
                  <span className="text-zinc-300 font-semibold block">
                    {selectedBoosters.length} Nootropics
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Chassis Style</span>
                  <span className="text-zinc-300 font-semibold block">
                    {tubFinish.name}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Step-by-Step Customization Studio (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-6 flex flex-col justify-between">
            
            {/* Step Tabs Navigation */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 gap-2 overflow-x-auto scrollbar-none">
              {[
                { id: 1, label: '1. Flavor Fusion', icon: FlaskConical },
                { id: 2, label: '2. Bio-Stimulants', icon: Zap },
                { id: 3, label: '3. Tub Aesthetic', icon: Palette },
                { id: 4, label: '4. Gamer Label', icon: Tag }
              ].map(step => (
                <button
                  key={step.id}
                  onClick={() => setActiveTab(step.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-cyber font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === step.id
                      ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <step.icon className="w-3.5 h-3.5" />
                  <span>{step.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: FLAVOR FUSION */}
            {activeTab === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                    PRIMARY BASE FLAVOR
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    Select your dominant high-potency flavor core.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
                    {PRIMARY_FLAVORS.map(flavor => {
                      const isSelected = primaryFlavor.id === flavor.id;
                      return (
                        <button
                          key={flavor.id}
                          onClick={() => setPrimaryFlavor(flavor)}
                          className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                            isSelected 
                              ? 'bg-zinc-900 border-orange-500 shadow-lg' 
                              : 'bg-[#0b0d14] border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: flavor.color }} 
                            />
                            {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block leading-tight truncate">
                              {flavor.name}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500 block truncate">
                              {flavor.tagline}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                    SECONDARY ACCENT INFUSION
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    Subtle notes swirled into the powder for a custom finish.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
                    {SECONDARY_INFUSIONS.map(infusion => {
                      const isSelected = secondaryFlavor.id === infusion.id;
                      return (
                        <button
                          key={infusion.id}
                          onClick={() => setSecondaryFlavor(infusion)}
                          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between h-16 ${
                            isSelected 
                              ? 'bg-zinc-900 border-orange-400' 
                              : 'bg-[#0b0d14] border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white truncate block">
                              {infusion.name}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500 truncate block">
                            {infusion.note}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BIO-STIMULANTS & BOOSTERS */}
            {activeTab === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                    CAFFEINE & ENERGY PROFILE
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                    {STIM_PROFILES.map(stim => {
                      const isSelected = stimProfile.id === stim.id;
                      return (
                        <button
                          key={stim.id}
                          onClick={() => setStimProfile(stim)}
                          className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                            isSelected 
                              ? 'bg-zinc-900 border-orange-500 shadow-md' 
                              : 'bg-[#0b0d14] border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                              {stim.badge}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">
                              {stim.name}
                            </span>
                            <span className="text-lg font-black font-heading text-orange-400 block mt-0.5">
                              {stim.caffeine}mg <span className="text-[10px] text-zinc-400 font-mono">caffeine</span>
                            </span>
                            <p className="text-[10px] text-zinc-400 font-sans mt-1">
                              {stim.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                    FUNCTIONAL NOOTROPIC INJECTIONS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                    {FUNCTIONAL_BOOSTERS.map(booster => {
                      const isChecked = selectedBoosters.includes(booster.id);
                      return (
                        <div
                          key={booster.id}
                          onClick={() => toggleBooster(booster.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                            isChecked 
                              ? 'bg-orange-950/20 border-orange-500/50' 
                              : 'bg-[#0b0d14] border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-white block">
                              {booster.name}
                            </span>
                            <span className="text-[10px] text-orange-400 font-mono block">
                              {booster.role}
                            </span>
                            <span className="text-[9px] text-zinc-500 font-sans block">
                              {booster.detail}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-orange-500 border-orange-400 text-black' : 'border-zinc-700 bg-zinc-900'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TUB AESTHETICS */}
            {activeTab === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                    TUB CHASSIS FINISH
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {TUB_FINISHES.map(finish => {
                      const isSelected = tubFinish.id === finish.id;
                      return (
                        <button
                          key={finish.id}
                          onClick={() => setTubFinish(finish)}
                          className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                            isSelected 
                              ? 'bg-zinc-900 border-orange-500 shadow-md' 
                              : 'bg-[#0b0d14] border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span 
                              className="w-4 h-4 rounded-full border border-white/20" 
                              style={{ backgroundColor: finish.accent }} 
                            />
                            <span className="text-xs font-bold text-white">
                              {finish.name}
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                    SYNDICATE EMBLEM
                  </h4>
                  <div className="grid grid-cols-5 gap-2.5 mt-3">
                    {TUB_EMBLEMS.map(emblem => {
                      const isSelected = tubEmblem.id === emblem.id;
                      return (
                        <button
                          key={emblem.id}
                          onClick={() => setTubEmblem(emblem)}
                          className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                            isSelected 
                              ? 'bg-zinc-900 border-orange-500 shadow-md' 
                              : 'bg-[#0b0d14] border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-2xl">{emblem.symbol}</span>
                          <span className="text-[10px] font-mono text-zinc-300 block truncate">
                            {emblem.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: GAMER LABEL PERSONALIZATION */}
            {activeTab === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                    FORMULA TITLE & CODIFICTION
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    Printed in high-resolution directly onto the front label.
                  </p>

                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                        FORMULA NAME (UP TO 28 CHARS)
                      </label>
                      <input
                        type="text"
                        maxLength={28}
                        value={formulaName}
                        onChange={(e) => setFormulaName(e.target.value)}
                        placeholder="e.g. Aim-Lock Protocol"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0d14] border border-zinc-700 text-white font-heading font-black tracking-wide focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                        CREATOR GAMERTAG
                      </label>
                      <input
                        type="text"
                        maxLength={20}
                        value={creatorTag}
                        onChange={(e) => setCreatorTag(e.target.value)}
                        placeholder="Your Gamer Tag"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0d14] border border-zinc-700 text-white font-mono text-xs focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Shaker Bundle Addon Option */}
                <div className="p-3.5 rounded-xl bg-[#0b0d14] border border-orange-500/30 flex items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setIncludeShaker(!includeShaker)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 font-bold">
                      ⚡
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Bundle Matching Stainless Steel Shaker (+ $10.00)
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 block">
                        Normally $29.99 • Discounted bundle rate with custom tub!
                      </span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                    includeShaker ? 'bg-orange-500 border-orange-400 text-black' : 'border-zinc-700 bg-zinc-900'
                  }`}>
                    {includeShaker && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Navigation & Synthesize Button */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400">Total Price:</span>
                <span className="text-2xl font-black font-heading text-white">
                  ${totalPrice.toFixed(2)}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded bg-emerald-500/10">
                  40 Servings
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                {activeTab < 4 ? (
                  <button
                    onClick={() => setActiveTab(prev => Math.min(4, prev + 1))}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-cyber font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSynthesizeAndAddToCart}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,85,0,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Synthesize & Add to Cart (${totalPrice.toFixed(2)})</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
