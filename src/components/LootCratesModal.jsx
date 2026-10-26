import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { LOOT_CRATES, RARITY_CONFIG } from '../data/lootCratesData';
import { playReelTick, playCrateUnlock, playWinSound } from '../utils/cyberAudio';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Zap, 
  Package, 
  Flame, 
  Trophy, 
  ShieldAlert, 
  Check, 
  ShoppingBag, 
  RotateCcw, 
  Gift, 
  ChevronRight,
  PlusCircle,
  Clock,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

const CARD_WIDTH = 180; // width of each item card in pixels
const CARD_GAP = 12;   // gap between cards
const TOTAL_CARDS = 50; // number of cards on the roulette reel
const WINNER_INDEX = 42; // index where the winning item sits

export default function LootCratesModal() {
  const { 
    isLootModalOpen, 
    setIsLootModalOpen, 
    activeCrateId, 
    setActiveCrateId,
    userProfile, 
    addUserXp, 
    deductUserXp, 
    claimLootItem,
    applyPromoCode,
    setIsCartOpen,
    lootHistory
  } = useStore();

  const [selectedCrateId, setSelectedCrateId] = useState(activeCrateId || 'crate-neon');
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelItems, setReelItems] = useState([]);
  const [reelOffset, setReelOffset] = useState(0);
  const [wonItem, setWonItem] = useState(null);
  const [claimedState, setClaimedState] = useState(false);
  const [activeTab, setActiveTab] = useState('crates'); // 'crates' | 'history'

  const reelContainerRef = useRef(null);
  const tickIntervalRef = useRef(null);

  // Sync with context activeCrateId if changed externally
  useEffect(() => {
    if (activeCrateId) {
      setSelectedCrateId(activeCrateId);
    }
  }, [activeCrateId]);

  const activeCrate = LOOT_CRATES.find(c => c.id === selectedCrateId) || LOOT_CRATES[0];

  // Pick weighted random item from crate pool
  const getRandomItem = (crate) => {
    const totalWeight = crate.items.reduce((sum, item) => sum + (item.weight || 10), 0);
    let rand = Math.random() * totalWeight;
    for (const item of crate.items) {
      if (rand < (item.weight || 10)) {
        return item;
      }
      rand -= (item.weight || 10);
    }
    return crate.items[0];
  };

  // Generate roulette reel items
  const prepareReel = (targetWinner) => {
    const list = [];
    for (let i = 0; i < TOTAL_CARDS; i++) {
      if (i === WINNER_INDEX) {
        list.push(targetWinner);
      } else {
        list.push(getRandomItem(activeCrate));
      }
    }
    return list;
  };

  const handleStartUnboxing = () => {
    if (isSpinning) return;

    // Check XP balance
    if ((userProfile.xp || 0) < activeCrate.costXp) {
      alert(`Insufficient XP! You need ${activeCrate.costXp} XP to unlock this crate. Click '+500 Free XP Refill' to replenish!`);
      return;
    }

    // Deduct XP
    const success = deductUserXp(activeCrate.costXp);
    if (!success) return;

    // Pick winner & prepare reel
    const winner = getRandomItem(activeCrate);
    const newReel = prepareReel(winner);
    setReelItems(newReel);
    setWonItem(null);
    setClaimedState(false);
    setIsSpinning(true);

    // Initial reset offset
    setReelOffset(0);

    // Sound unlock hiss
    playCrateUnlock();

    // Calculate landing offset: center needle position
    // Center container width / 2 - (winner card position)
    setTimeout(() => {
      if (!reelContainerRef.current) return;
      const containerWidth = reelContainerRef.current.offsetWidth || 800;
      const centerLine = containerWidth / 2;

      // Card center relative to start of strip
      const cardCenter = (WINNER_INDEX * (CARD_WIDTH + CARD_GAP)) + (CARD_WIDTH / 2);
      
      // Slight random jitter (+/- 35px) so needle doesn't land dead center every time
      const randomJitter = (Math.random() - 0.5) * 60;
      const finalTranslate = -(cardCenter - centerLine + randomJitter);

      setReelOffset(finalTranslate);

      // Play decelerating tick sounds
      let elapsed = 0;
      const duration = 5200;
      let tickDelay = 60;

      const scheduleTick = () => {
        if (elapsed >= duration) return;
        playReelTick(Math.max(0.6, 1.2 - (elapsed / duration) * 0.5));
        
        // Exponential deceleration curve for audio ticks
        const progress = elapsed / duration;
        tickDelay = 50 + Math.pow(progress, 3) * 350;
        elapsed += tickDelay;
        tickIntervalRef.current = setTimeout(scheduleTick, tickDelay);
      };

      tickIntervalRef.current = setTimeout(scheduleTick, tickDelay);

      // Finish spin after 5.5s
      setTimeout(() => {
        clearTimeout(tickIntervalRef.current);
        setIsSpinning(false);
        setWonItem(winner);

        // Sound fanfare & confetti
        playWinSound(winner.rarity);
        
        try {
          const colors = winner.rarity === 'godtier' 
            ? ['#ff1a35', '#ffffff', '#ffb700'] 
            : ['#00f0ff', '#bf00ff', '#ffffff'];

          confetti({
            particleCount: winner.rarity === 'godtier' || winner.rarity === 'legendary' ? 120 : 60,
            spread: 70,
            origin: { y: 0.6 },
            colors
          });
        } catch (e) {}

      }, 5400);

    }, 50);
  };

  const handleClaim = () => {
    if (!wonItem) return;
    claimLootItem(wonItem);
    setClaimedState(true);

    if (wonItem.category === 'coupon' || wonItem.category === 'free_item') {
      setIsLootModalOpen(false);
      setIsCartOpen(true);
    }
  };

  if (!isLootModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/85 animate-fade-in">
      
      {/* Click outside to close (disabled during active spin) */}
      <div 
        className="fixed inset-0" 
        onClick={() => { if (!isSpinning) setIsLootModalOpen(false); }} 
      />

      <div className="relative w-full max-w-5xl bg-[#090b12] border border-zinc-800 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col z-10 max-h-[95vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-zinc-800/80 bg-gradient-to-r from-[#0d0f1a] via-[#101222] to-[#0d0f1a] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/40 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(255,26,53,0.3)]">
              <Package className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
                  THE VAULT TERMINAL
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  LIVE DROPS ON
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white tracking-wide">
                CYBER CRATE UNBOXING
              </h2>
            </div>
          </div>

          {/* User XP & Refill Action */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#06070c] border border-zinc-800 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Zap className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="text-left font-mono">
                <span className="text-[9px] text-zinc-500 block uppercase leading-none">Your Operative Balance</span>
                <span className="text-sm font-black text-white">{userProfile.xp?.toLocaleString() || 0} XP</span>
              </div>
            </div>

            <button
              onClick={() => addUserXp(500)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-cyber font-bold tracking-wider transition-all flex items-center gap-1.5"
              title="Add simulated XP for testing"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+500 XP Refill</span>
            </button>

            <button
              onClick={() => { if (!isSpinning) setIsLootModalOpen(false); }}
              disabled={isSpinning}
              className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors disabled:opacity-40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Crate Selection Tabs & Navigation */}
        <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-zinc-800/60 bg-[#07080e] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            {LOOT_CRATES.map(crate => {
              const isSelected = selectedCrateId === crate.id;
              return (
                <button
                  key={crate.id}
                  onClick={() => {
                    if (isSpinning) return;
                    setSelectedCrateId(crate.id);
                    setWonItem(null);
                    setReelItems([]);
                  }}
                  disabled={isSpinning}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-cyber font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-zinc-800 text-white border shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  style={isSelected ? { borderColor: crate.accentColor, color: crate.accentColor } : {}}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: crate.accentColor }} />
                  <span>{crate.name}</span>
                  <span className="text-[10px] font-mono text-zinc-400 px-1 rounded bg-black/40">
                    {crate.costXp} XP
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 shrink-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab('crates')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                activeTab === 'crates' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Crate Chamber
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all flex items-center gap-1 ${
                activeTab === 'history' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>History ({lootHistory.length})</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {activeTab === 'history' ? (
            /* Drop History Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-500" />
                  <span>Operative Unboxing Record</span>
                </h3>
                <span className="text-xs font-mono text-zinc-400">Total Unboxed: {lootHistory.length} Drops</span>
              </div>

              {lootHistory.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 space-y-2 font-mono text-sm">
                  <Package className="w-12 h-12 mx-auto stroke-1 opacity-30 text-zinc-400" />
                  <p>No drops recorded yet. Spin your first crate in the Crate Chamber!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {lootHistory.map((item, idx) => {
                    const rarityInfo = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.common;
                    return (
                      <div
                        key={item.id || idx}
                        className={`p-3.5 rounded-xl bg-[#0c0d16] border ${rarityInfo.borderColor} flex items-center gap-3.5`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0" 
                        />
                        <div className="min-w-0 flex-1 space-y-1">
                          <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${rarityInfo.badgeClass}`}>
                            {rarityInfo.label}
                          </span>
                          <h4 className="text-xs font-bold text-white truncate font-sans">{item.title}</h4>
                          <p className="text-[10px] font-mono text-zinc-400">
                            {item.category === 'coupon' && `${item.discountPercent}% OFF • Code: ${item.code}`}
                            {item.category === 'xp' && `+${item.xpAmount} XP Credited`}
                            {item.category === 'free_item' && 'Free Product Claimed'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Crate Chamber Tab */
            <>
              {/* THE ROULETTE REEL CHAMBER */}
              <div className="relative rounded-2xl bg-[#05060a] border border-zinc-800 p-4 sm:p-6 overflow-hidden shadow-inner">
                {/* Cyberpunk grid background in reel chamber */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
                
                {/* Center Laser Targeting Needle */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-red-500 z-20 pointer-events-none shadow-[0_0_15px_#ff1a35]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[10px] border-t-red-500" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-b-[10px] border-b-red-500" />
                </div>

                {/* Ambient glow in center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-600/10 blur-[60px] pointer-events-none rounded-full" />

                {/* The Rolling Strip */}
                <div 
                  ref={reelContainerRef}
                  className="relative overflow-hidden w-full h-56 flex items-center"
                >
                  {reelItems.length > 0 ? (
                    <div 
                      className="flex items-center transition-transform duration-[5200ms] will-change-transform"
                      style={{
                        transform: `translateX(${reelOffset}px)`,
                        transitionTimingFunction: 'cubic-bezier(0.1, 0.85, 0.2, 1)',
                        gap: `${CARD_GAP}px`
                      }}
                    >
                      {reelItems.map((item, idx) => {
                        const rarityInfo = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.common;
                        const isTheWinner = wonItem && idx === WINNER_INDEX;

                        return (
                          <div
                            key={idx}
                            className={`shrink-0 w-[180px] h-[210px] rounded-xl bg-[#0e101b] border flex flex-col justify-between p-3 relative overflow-hidden transition-all ${
                              isTheWinner 
                                ? `${rarityInfo.borderColor} ${rarityInfo.glowColor} scale-105 z-10` 
                                : 'border-zinc-800'
                            }`}
                          >
                            {/* Card Header Tag */}
                            <div className="flex items-center justify-between z-10">
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${rarityInfo.badgeClass}`}>
                                {rarityInfo.label}
                              </span>
                              {item.category === 'coupon' && (
                                <span className="text-[10px] font-mono font-black text-emerald-400">
                                  {item.discountPercent}% OFF
                                </span>
                              )}
                            </div>

                            {/* Image */}
                            <div className="relative h-24 my-1 overflow-hidden rounded-lg">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0e101b] via-transparent to-transparent" />
                            </div>

                            {/* Title & Desc */}
                            <div className="z-10 space-y-0.5">
                              <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                                {item.title}
                              </h4>
                              <p className="text-[9px] font-mono text-zinc-400 line-clamp-1">
                                {item.category === 'coupon' && `Code: ${item.code}`}
                                {item.category === 'xp' && `+${item.xpAmount} XP Surge`}
                                {item.category === 'free_item' && 'Free Item ($0.00)'}
                              </p>
                            </div>

                            {/* Bottom Rarity Stripe */}
                            <div 
                              className="absolute bottom-0 left-0 right-0 h-1" 
                              style={{ backgroundColor: rarityInfo.color }} 
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Idle State: Crate Preview Stand */
                    <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left z-10">
                      <div className="relative group">
                        <div 
                          className="w-36 h-36 rounded-2xl p-[2px] transition-all duration-500 shadow-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${activeCrate.accentColor}, #000)`
                          }}
                        >
                          <div className="w-full h-full rounded-2xl overflow-hidden relative">
                            <img 
                              src={activeCrate.image} 
                              alt={activeCrate.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 max-w-md">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span 
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border"
                            style={{
                              borderColor: `${activeCrate.accentColor}50`,
                              backgroundColor: `${activeCrate.accentColor}15`,
                              color: activeCrate.accentColor
                            }}
                          >
                            {activeCrate.tagline}
                          </span>
                          <span className="text-xs font-mono text-zinc-400 font-bold">
                            Cost: {activeCrate.costXp} XP
                          </span>
                        </div>
                        <h3 className="text-2xl font-black font-heading text-white">
                          {activeCrate.name}
                        </h3>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                          {activeCrate.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Target Status */}
                <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isSpinning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                    <span>{isSpinning ? 'DECRYPTION MATRIX ROTATING...' : 'READY FOR EXTRACTION'}</span>
                  </span>
                  <span className="hidden sm:inline">
                    Fair Algorithm • Verified Syndicate Odds
                  </span>
                </div>
              </div>

              {/* WIN REVEAL BANNER (If prize won) */}
              {wonItem && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#141624] via-[#10121d] to-[#141624] border border-red-500/50 shadow-[0_0_30px_rgba(255,26,53,0.3)] animate-scale-up space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/20 shrink-0">
                        <img 
                          src={wonItem.image} 
                          alt={wonItem.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="space-y-1 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span className="text-[10px] font-mono font-black uppercase text-red-400">
                            CONGRATULATIONS OPERATIVE!
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${RARITY_CONFIG[wonItem.rarity]?.badgeClass}`}>
                            {RARITY_CONFIG[wonItem.rarity]?.label}
                          </span>
                        </div>
                        <h3 className="text-lg font-black font-heading text-white">
                          {wonItem.title}
                        </h3>
                        <p className="text-xs text-zinc-300 font-sans">
                          {wonItem.description}
                        </p>
                      </div>
                    </div>

                    {/* Claim Action */}
                    <div className="flex items-center gap-2 shrink-0">
                      {claimedState ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                          <Check className="w-4 h-4" />
                          <span>CLAIMED TO ACCOUNT</span>
                        </div>
                      ) : (
                        <button
                          onClick={handleClaim}
                          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
                        >
                          <Gift className="w-4 h-4" />
                          <span>
                            {wonItem.category === 'coupon' && 'Apply Code & Open Cart'}
                            {wonItem.category === 'free_item' && 'Add $0 Item to Cart'}
                            {wonItem.category === 'xp' && 'Bank XP Surge'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS BAR */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c0d18] border border-zinc-800">
                <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>
                    Extraction Cost: <strong className="text-white">{activeCrate.costXp} XP</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Your Balance: <strong className="text-emerald-400">{userProfile.xp?.toLocaleString()} XP</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {wonItem ? (
                    <button
                      onClick={handleStartUnboxing}
                      disabled={isSpinning || (userProfile.xp || 0) < activeCrate.costXp}
                      className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(255,26,53,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Unbox Again ({activeCrate.costXp} XP)</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStartUnboxing}
                      disabled={isSpinning || (userProfile.xp || 0) < activeCrate.costXp}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-heading font-black text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,26,53,0.5)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed group"
                    >
                      <Zap className="w-4 h-4 fill-current group-hover:animate-bounce" />
                      <span>
                        {isSpinning ? 'DECRYPTING CRATE...' : `UNLOCK ${activeCrate.name.toUpperCase()} (${activeCrate.costXp} XP)`}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* LOOT POOL TRANSPARENCY CARDS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-zinc-300">
                    POSSIBLE EXTRACTIONS FROM THIS CRATE
                  </span>
                  <span className="text-zinc-500">
                    Odds weighted by syndicate rarity tier
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {activeCrate.items.map(item => {
                    const rarityInfo = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.common;
                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl bg-[#0c0d16] border ${rarityInfo.borderColor} flex flex-col justify-between space-y-2 relative overflow-hidden`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${rarityInfo.badgeClass}`}>
                            {rarityInfo.label}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {item.weight}%
                          </span>
                        </div>

                        <div className="h-16 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>

                        <div>
                          <h4 className="text-[11px] font-bold text-white line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-[9px] font-mono text-zinc-400">
                            {item.category === 'coupon' && `${item.discountPercent}% OFF • Code: ${item.code}`}
                            {item.category === 'xp' && `+${item.xpAmount} XP Bonus`}
                            {item.category === 'free_item' && 'Free Product'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
