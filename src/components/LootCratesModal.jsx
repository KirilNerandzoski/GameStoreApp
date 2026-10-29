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
  ArrowRight,
  Trash2,
  Copy
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
    recordCrateOpen,
    clearLootHistory,
    applyPromoCode,
    setIsCartOpen,
    lootHistory,
    addToast
  } = useStore();

  const [selectedCrateId, setSelectedCrateId] = useState(activeCrateId || 'crate-neon');
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelItems, setReelItems] = useState([]);
  const [reelOffset, setReelOffset] = useState(0);
  const [wonItem, setWonItem] = useState(null);
  const [claimedState, setClaimedState] = useState(false);
  const [currentHistoryId, setCurrentHistoryId] = useState(null);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [activeTab, setActiveTab] = useState('crates'); // 'crates' | 'history'

  const reelContainerRef = useRef(null);
  const reelStripRef = useRef(null);
  const reelAnimationRef = useRef(null);
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

  // Pre-populate reel strip whenever active crate changes or modal opens
  useEffect(() => {
    if (isLootModalOpen) {
      const initialWinner = getRandomItem(activeCrate);
      setReelItems(prepareReel(initialWinner));
      setWonItem(null);
      setClaimedState(false);
      if (reelAnimationRef.current) {
        reelAnimationRef.current.cancel();
      }
      if (reelStripRef.current) {
        reelStripRef.current.style.transform = 'translate3d(0px, 0, 0)';
      }
    }
  }, [selectedCrateId, isLootModalOpen]);

  const handleStartUnboxing = () => {
    if (isSpinning) return;

    // Check XP balance
    if ((userProfile.xp || 0) < activeCrate.costXp) {
      if (addToast) {
        addToast(
          'Insufficient XP', 
          `You need ${activeCrate.costXp} XP to unlock ${activeCrate.name}. Click '+500 Free XP' in the top right to replenish!`,
          'warning'
        );
      }
      return;
    }

    // Deduct XP
    const success = deductUserXp(activeCrate.costXp);
    if (!success) return;

    // Stop any previous running animation/tick & reset position
    if (reelAnimationRef.current) {
      reelAnimationRef.current.cancel();
    }
    if (tickIntervalRef.current) {
      clearTimeout(tickIntervalRef.current);
    }
    if (reelStripRef.current) {
      reelStripRef.current.style.transform = 'translate3d(0px, 0, 0)';
    }

    // Pick winner & prepare reel
    const winner = getRandomItem(activeCrate);
    const newReel = prepareReel(winner);
    setReelItems(newReel);
    setWonItem(null);
    setClaimedState(false);
    setIsSpinning(true);

    // Sound unlock hiss
    playCrateUnlock();

    // Use requestAnimationFrame so DOM layout is committed before starting animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!reelContainerRef.current || !reelStripRef.current) return;
        const containerWidth = reelContainerRef.current.offsetWidth || 800;
        const centerLine = containerWidth / 2;

        // Card center relative to start of strip
        const cardCenter = (WINNER_INDEX * (CARD_WIDTH + CARD_GAP)) + (CARD_WIDTH / 2);
        
        // Slight random jitter (+/- 25px) so needle doesn't land dead center every time
        const randomJitter = (Math.random() - 0.5) * 50;
        const finalTranslate = -(cardCenter - centerLine + randomJitter);

        // Start decelerating audio ticks
        let elapsed = 0;
        const duration = 5000;
        let tickDelay = 55;

        const scheduleTick = () => {
          if (elapsed >= duration) return;
          playReelTick(Math.max(0.6, 1.2 - (elapsed / duration) * 0.5));
          
          const progress = elapsed / duration;
          tickDelay = 45 + Math.pow(progress, 3.4) * 460;
          elapsed += tickDelay;
          tickIntervalRef.current = setTimeout(scheduleTick, tickDelay);
        };

        tickIntervalRef.current = setTimeout(scheduleTick, tickDelay);

        // Hardware-accelerated smooth Web Animation (silky 60/120fps GPU compositor)
        const anim = reelStripRef.current.animate([
          { transform: 'translate3d(0px, 0, 0)' },
          { transform: `translate3d(${finalTranslate}px, 0, 0)` }
        ], {
          duration: 5000,
          easing: 'cubic-bezier(0.12, 0.8, 0.2, 1)',
          fill: 'forwards'
        });

        reelAnimationRef.current = anim;

        anim.onfinish = () => {
          if (reelStripRef.current) {
            reelStripRef.current.style.transform = `translate3d(${finalTranslate}px, 0, 0)`;
          }
          setReelOffset(finalTranslate);
          if (tickIntervalRef.current) {
            clearTimeout(tickIntervalRef.current);
          }
          setIsSpinning(false);
          setWonItem(winner);

          // RECORD EVERY CRATE OPEN IMMEDIATELY INTO PERMANENT HISTORY!
          const record = recordCrateOpen(activeCrate, winner);
          if (record?.id) setCurrentHistoryId(record.id);

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
        };
      });
    });
  };

  const handleClaim = () => {
    if (!wonItem) return;
    claimLootItem(wonItem, currentHistoryId);
    setClaimedState(true);

    if (wonItem.category === 'coupon' || wonItem.category === 'free_item') {
      handleClose();
      setIsCartOpen(true);
    }
  };

  const handleClose = () => {
    if (isSpinning) return;
    setIsLootModalOpen(false);
    // Clean up hash from URL so it doesn't loop
    try {
      if (window.location.hash && (window.location.hash.includes('crate') || window.location.hash.includes('loot'))) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch (e) {
      window.location.hash = '';
    }
  };

  // Keyboard Escape listener to close modal cleanly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isLootModalOpen && !isSpinning) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLootModalOpen, isSpinning]);

  const handleCopyCode = (code, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    }
  };

  if (!isLootModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/85 animate-fade-in">
      
      {/* Click outside to close (disabled during active spin) */}
      <div 
        className="fixed inset-0 cursor-pointer" 
        onClick={handleClose} 
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
              onClick={handleClose}
              disabled={isSpinning}
              className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
              title="Close Terminal (Esc)"
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
            <div className="space-y-5">
              {/* Top Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#0c0d16] border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Crates Decrypted</span>
                  <span className="text-xl font-black font-heading text-white">{lootHistory.length}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0c0d16] border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Total XP Invested</span>
                  <span className="text-xl font-black font-heading text-amber-400">
                    {lootHistory.reduce((sum, h) => sum + (h.crateCostXp || 0), 0).toLocaleString()} XP
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#0c0d16] border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Coupons Won</span>
                  <span className="text-xl font-black font-heading text-emerald-400">
                    {lootHistory.filter(h => (h.itemCategory || h.category) === 'coupon').length}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#0c0d16] border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">High-Tier Jackpots</span>
                  <span className="text-xl font-black font-heading text-red-400">
                    {lootHistory.filter(h => ['legendary', 'godtier'].includes(h.itemRarity || h.rarity)).length}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-500" />
                  <span>Permanent Operative Unboxing Record</span>
                </h3>
                {lootHistory.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all operative unboxing records?')) {
                        clearLootHistory();
                      }
                    }}
                    className="text-xs font-mono text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Log</span>
                  </button>
                )}
              </div>

              {lootHistory.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 space-y-2 font-mono text-sm">
                  <Package className="w-12 h-12 mx-auto stroke-1 opacity-30 text-zinc-400" />
                  <p>No drops recorded yet. Spin your first crate in the Crate Chamber!</p>
                  <button
                    onClick={() => setActiveTab('crates')}
                    className="mt-3 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-cyber font-bold text-xs uppercase"
                  >
                    Go to Crate Chamber
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {lootHistory.map((item, idx) => {
                    const r = item.itemRarity || item.rarity || 'common';
                    const rarityInfo = RARITY_CONFIG[r] || RARITY_CONFIG.common;
                    const title = item.itemTitle || item.title;
                    const image = item.itemImage || item.image;
                    const cat = item.itemCategory || item.category;
                    const code = item.itemCode || item.code;
                    const discount = item.itemDiscountPercent || item.discountPercent;
                    const xp = item.itemXpAmount || item.xpAmount;

                    return (
                      <div
                        key={item.id || idx}
                        className={`p-4 rounded-2xl bg-[#0c0d16] border ${rarityInfo.borderColor} flex flex-col justify-between shadow-lg relative overflow-hidden`}
                      >
                        {/* Crate Origin & Timestamp */}
                        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-2.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <Package 
                              className="w-3.5 h-3.5 shrink-0" 
                              style={{ color: item.crateAccentColor || '#ff1a35' }} 
                            />
                            <span className="text-[11px] font-cyber font-bold text-white truncate">
                              {item.crateName || 'Cyber Crate'}
                            </span>
                            {item.crateCostXp && (
                              <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                                (-{item.crateCostXp} XP)
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500 shrink-0 ml-1">
                            {item.openedAt 
                              ? new Date(item.openedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) 
                              : 'Logged'}
                          </span>
                        </div>

                        {/* Item Card Body */}
                        <div className="flex items-center gap-3">
                          <img 
                            src={image} 
                            alt={title} 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80';
                            }}
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0" 
                          />
                          <div className="min-w-0 flex-1 space-y-1">
                            <span className={`inline-block px-1.5 py-0.2 rounded text-[8px] font-mono font-bold uppercase ${rarityInfo.badgeClass}`}>
                              {rarityInfo.label}
                            </span>
                            <h4 className="text-xs font-bold text-white truncate font-sans">
                              {title}
                            </h4>
                            <p className="text-[10px] font-mono text-zinc-400 truncate">
                              {cat === 'coupon' && `${discount}% OFF • Code: ${code}`}
                              {cat === 'xp' && `+${xp} XP Credited`}
                              {cat === 'free_item' && 'Free Product Drop ($0.00)'}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Action Bar inside History Card */}
                        {cat === 'coupon' && code && (
                          <div className="mt-3 pt-2.5 border-t border-zinc-800/70 flex items-center justify-between gap-2">
                            <span className="px-2 py-0.5 rounded bg-black/60 border border-zinc-700 text-[10px] font-mono font-bold text-emerald-400">
                              {code}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleCopyCode(code, item.id)}
                                className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-mono text-zinc-300 flex items-center gap-1 transition-colors"
                              >
                                {copiedCodeId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedCodeId === item.id ? 'Copied' : 'Copy'}</span>
                              </button>
                              <button
                                onClick={() => {
                                  applyPromoCode(code);
                                  setIsLootModalOpen(false);
                                  setIsCartOpen(true);
                                }}
                                className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-cyber font-bold tracking-wider transition-colors"
                              >
                                Apply Code
                              </button>
                            </div>
                          </div>
                        )}

                        {cat === 'free_item' && (
                          <div className="mt-3 pt-2.5 border-t border-zinc-800/70 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold">$0.00 Claim</span>
                            <button
                              onClick={() => {
                                claimLootItem(item, item.id);
                                setIsLootModalOpen(false);
                                setIsCartOpen(true);
                              }}
                              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-cyber font-bold tracking-wider transition-colors flex items-center gap-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        )}

                        {cat === 'xp' && (
                          <div className="mt-3 pt-2.5 border-t border-zinc-800/70 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                            <span className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Banked to Profile</span>
                            </span>
                            <span className="font-bold">+{xp} XP</span>
                          </div>
                        )}
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

                {/* Ambient glow in center (zero blur calculation overhead) */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none rounded-full" 
                  style={{ background: 'radial-gradient(circle, rgba(255,26,53,0.12) 0%, transparent 70%)' }}
                />

                {/* The Rolling Strip */}
                <div 
                  ref={reelContainerRef}
                  className="relative overflow-hidden w-full h-56 flex items-center"
                >
                  <div 
                    ref={reelStripRef}
                    className="flex items-center will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden]"
                    style={{
                      transform: `translate3d(${reelOffset}px, 0, 0)`,
                      gap: `${CARD_GAP}px`
                    }}
                  >
                    {reelItems.map((item, idx) => {
                      const rarityInfo = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.common;
                      const isTheWinner = wonItem && idx === WINNER_INDEX;

                      return (
                        <div
                          key={idx}
                          className={`shrink-0 w-[180px] h-[210px] rounded-xl bg-[#0e101b] border flex flex-col justify-between p-3 relative overflow-hidden [contain:content] ${
                            isTheWinner 
                              ? `${rarityInfo.borderColor} ${rarityInfo.glowColor} scale-105 z-10 transition-transform duration-300` 
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
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80';
                              }}
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
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80';
                          }}
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
                      <Zap className="w-4 h-4 fill-current group-hover:scale-125 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80';
                            }}
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

        {/* Bottom Modal Exit Bar */}
        <div className="px-6 py-3 border-t border-zinc-800/80 bg-[#07080e] flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">Esc</kbd> or click outside to exit
          </span>
          <button
            onClick={handleClose}
            disabled={isSpinning}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-cyber font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-40 cursor-pointer"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
