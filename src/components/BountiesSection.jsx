import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BOUNTY_TASKS } from '../data/games';
import { 
  Ticket, 
  Gift, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Heart, 
  Eye, 
  MessageSquare, 
  Trophy, 
  Zap, 
  Copy, 
  Check, 
  ShoppingBag,
  Lock,
  Unlock,
  Flame,
  Package
} from 'lucide-react';

export default function BountiesSection() {
  const {
    games,
    wishlist,
    recentlyViewed,
    bountyState,
    completeCheckInTask,
    toggleHackNode,
    claimBountyReward,
    toggleWishlist,
    openGameDetail,
    applyPromoCode,
    appliedPromo,
    setIsCartOpen,
    addToast,
    openLootCrate
  } = useStore();

  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      addToast('Coupon Code Copied!', `${code} copied to clipboard.`, 'success');
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const handleApplyAndOpenCart = (code) => {
    applyPromoCode(code);
    setIsCartOpen(true);
  };

  // Helper to compute live progress for each task
  const getTaskProgress = (task) => {
    switch (task.type) {
      case 'checkin':
        return bountyState.checkedIn ? 1 : 0;
      case 'wishlist':
        return Math.min(wishlist.length, task.target);
      case 'inspect':
        return Math.min(recentlyViewed.length, task.target);
      case 'review':
        return Math.min(bountyState.reviewsSubmitted || 0, task.target);
      case 'hack':
        return (bountyState.hackNodes || [false, false, false]).filter(Boolean).length;
      case 'master': {
        const nonMasterClaimed = (bountyState.claimedTaskIds || []).filter(id => id !== 'task-master').length;
        return Math.min(nonMasterClaimed, task.target);
      }
      default:
        return 0;
    }
  };

  // Quick helper actions to help users complete tasks right from the board
  const handleQuickWishlist = () => {
    const unawaited = games.find(g => !wishlist.includes(g.id));
    if (unawaited) {
      toggleWishlist(unawaited);
    }
  };

  const handleQuickInspect = () => {
    const unviewed = games.find(g => !recentlyViewed.includes(g.id)) || games[0];
    if (unviewed) {
      openGameDetail(unviewed);
    }
  };

  const handleQuickReview = () => {
    openGameDetail(games[0]);
  };

  const claimedCount = (bountyState.claimedTaskIds || []).length;
  const unlockedCoupons = bountyState.unlockedCoupons || [];

  return (
    <section id="bounties" className="py-16 bg-gradient-to-b from-[#070709] via-[#0d0a10] to-[#070709] border-t border-red-500/20 relative overflow-hidden">
      {/* Subtle Crimson Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-red-500/20 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-cyber font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,26,53,0.25)]">
              <Ticket className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              SYNDICATE REWARDS &amp; MISSIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-wide">
              OPERATIVE BOUNTIES // EARN DISCOUNT COUPONS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans">
              Complete interactive store missions to unlock exclusive discount vouchers (up to <span className="text-red-400 font-bold">40% OFF</span>) and bonus Operative XP. Apply unlocked coupons directly in your Tactical Cart.
            </p>
          </div>

          {/* Action & Progress Summary */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => openLootCrate()}
              className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/50 text-amber-300 font-cyber font-bold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(255,183,0,0.25)] flex items-center justify-center gap-2 group"
            >
              <Package className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>SPEND XP ON LOOT CRATES</span>
            </button>

            {/* Progress Summary Pill */}
            <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#11121c] border border-red-500/30 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
              <div className="w-11 h-11 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase block">Bounty Progression</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black font-heading text-white">
                    {claimedCount} / {BOUNTY_TASKS.length} Completed
                  </span>
                  <span className="text-xs font-mono text-red-400">
                    ({unlockedCoupons.length} Coupons Unlocked)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unlocked Coupon Vault (Shows all earned coupons ready to copy or 1-click apply!) */}
        <div className="p-5 rounded-2xl bg-[#0e0f17] border border-red-500/30 shadow-[0_0_30px_rgba(255,26,53,0.12)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-cyber font-bold tracking-wider text-white uppercase">
                Your Unlocked Coupon Vault ({unlockedCoupons.length})
              </h3>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              Click &ldquo;Apply to Cart&rdquo; to activate your discount immediately
            </span>
          </div>

          {unlockedCoupons.length === 0 ? (
            <div className="p-6 rounded-xl bg-[#090a0f] border border-dashed border-zinc-800 text-center space-y-1">
              <p className="text-xs font-cyber text-zinc-300">
                No Bounty Coupons Unlocked Yet
              </p>
              <p className="text-[11px] text-zinc-500">
                Complete any mission card below and click <strong className="text-red-400">CLAIM COUPON</strong> to add discount vouchers to your vault!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {unlockedCoupons.map(coupon => {
                const isCurrentlyApplied = appliedPromo?.code === coupon.code;
                return (
                  <div
                    key={coupon.code}
                    className={`relative p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                      isCurrentlyApplied
                        ? 'bg-red-950/30 border-red-500 shadow-[0_0_20px_rgba(255,26,53,0.3)]'
                        : 'bg-[#131420] border-red-500/40 hover:border-red-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-cyber font-black bg-red-600 text-white shadow-[0_0_10px_rgba(255,26,53,0.5)]">
                          SAVE {coupon.discountPercent}% OFF
                        </span>
                        <h4 className="text-base font-mono font-black text-white tracking-widest mt-1.5">
                          {coupon.code}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {coupon.desc}
                        </p>
                      </div>
                      <Ticket className="w-5 h-5 text-red-500 flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className="px-3 py-1.5 rounded-lg bg-[#090a10] hover:bg-zinc-800 border border-zinc-700 text-[11px] font-mono text-zinc-200 flex items-center gap-1.5 transition-colors"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-red-400" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleApplyAndOpenCart(coupon.code)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-[11px] font-cyber font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                          isCurrentlyApplied
                            ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-300'
                            : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(255,26,53,0.4)]'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isCurrentlyApplied ? 'APPLIED IN CART' : 'APPLY TO CART'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 6 Interactive Bounty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOUNTY_TASKS.map(task => {
            const progress = getTaskProgress(task);
            const isCompleted = progress >= task.target;
            const isClaimed = (bountyState.claimedTaskIds || []).includes(task.id);
            const progressPercent = Math.min(100, Math.round((progress / task.target) * 100));

            return (
              <div
                key={task.id}
                className={`relative rounded-2xl p-5 flex flex-col justify-between gap-4 border transition-all duration-300 ${
                  isClaimed
                    ? 'bg-[#0b0d13] border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                    : isCompleted
                    ? 'bg-[#14111b] border-red-500 shadow-[0_0_25px_rgba(255,26,53,0.3)]'
                    : 'bg-[#0d0e15] border-zinc-800/90 hover:border-red-500/40'
                }`}
              >
                {/* Top Row: Reward Pill & XP */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-cyber font-black tracking-wider ${
                      isClaimed
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-red-600 text-white shadow-[0_0_12px_rgba(255,26,53,0.5)]'
                    }`}>
                      {task.discountPercent}% OFF COUPON
                    </span>

                    <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      +{task.xpReward} XP
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                      <span>{task.title}</span>
                      {isClaimed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                      {task.description}
                    </p>
                  </div>

                  {/* Interactive Mini-Task Controls inside Card */}
                  {task.type === 'checkin' && !bountyState.checkedIn && (
                    <button
                      onClick={completeCheckInTask}
                      className="w-full py-2 px-3 rounded-lg bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-300 hover:text-white text-xs font-cyber font-bold tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <Flame className="w-4 h-4" />
                      <span>CALIBRATE REACTOR CORE NOW</span>
                    </button>
                  )}

                  {task.type === 'wishlist' && !isCompleted && (
                    <button
                      onClick={handleQuickWishlist}
                      className="w-full py-2 px-3 rounded-lg bg-[#151724] hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-cyber font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 text-red-500" />
                      <span>LOCK RANDOM GAME TO WISHLIST (+1)</span>
                    </button>
                  )}

                  {task.type === 'inspect' && !isCompleted && (
                    <button
                      onClick={handleQuickInspect}
                      className="w-full py-2 px-3 rounded-lg bg-[#151724] hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-cyber font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-red-500" />
                      <span>INSPECT A GAME DOSSIER (+1)</span>
                    </button>
                  )}

                  {task.type === 'review' && !isCompleted && (
                    <button
                      onClick={handleQuickReview}
                      className="w-full py-2 px-3 rounded-lg bg-[#151724] hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-cyber font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-red-500" />
                      <span>OPEN GAME DOSSIER TO POST REVIEW</span>
                    </button>
                  )}

                  {task.type === 'hack' && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {(bountyState.hackNodes || [false, false, false]).map((decrypted, idx) => (
                        <button
                          key={idx}
                          disabled={decrypted}
                          onClick={() => toggleHackNode(idx)}
                          className={`py-2 px-2 rounded-lg border text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1 ${
                            decrypted
                              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-400 cursor-default'
                              : 'bg-red-950/30 hover:bg-red-600 border-red-500/40 text-red-300 hover:text-white cursor-pointer animate-pulse'
                          }`}
                        >
                          {decrypted ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          <span>NODE 0{idx + 1}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Progress Bar & Claim Action */}
                <div className="space-y-3 pt-3 border-t border-zinc-800/80">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-400">Mission Progress</span>
                      <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                        {progress} / {task.target}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isClaimed || isCompleted
                            ? 'bg-gradient-to-r from-red-500 to-emerald-500'
                            : 'bg-red-600'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {isClaimed ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/25 border border-emerald-500/30">
                      <div className="text-xs font-mono">
                        <span className="text-zinc-400 block text-[10px]">UNLOCKED CODE:</span>
                        <span className="text-emerald-400 font-bold tracking-widest">{task.rewardCode}</span>
                      </div>
                      <button
                        onClick={() => handleApplyAndOpenCart(task.rewardCode)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-cyber font-bold tracking-wider transition-all"
                      >
                        USE COUPON
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={!isCompleted}
                      onClick={() => claimBountyReward(task)}
                      className={`w-full py-2.5 rounded-xl text-xs font-cyber font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-red-600 text-white shadow-[0_0_20px_rgba(255,26,53,0.5)] cursor-pointer'
                          : 'bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span>
                        {isCompleted
                          ? `CLAIM ${task.discountPercent}% COUPON (${task.rewardCode})`
                          : `COMPLETE TASK TO UNLOCK -${task.discountPercent}%`}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
