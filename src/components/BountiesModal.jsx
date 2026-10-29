import React from 'react';
import { useStore } from '../context/StoreContext';
import BountiesSection from './BountiesSection';
import { X, Sparkles, Ticket } from 'lucide-react';

export default function BountiesModal() {
  const { isBountiesModalOpen, setIsBountiesModalOpen } = useStore();

  if (!isBountiesModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fade-in"
      onClick={() => setIsBountiesModalOpen(false)}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#090a12] border border-red-500/50 shadow-[0_0_60px_rgba(255,26,53,0.35)] my-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing Top Accent Bar */}
        <div className="sticky top-0 z-50 h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 shadow-[0_0_15px_#ff1a35]" />

        {/* Modal Top Bar */}
        <div className="sticky top-1.5 z-40 bg-[#0d0e19] px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-[0_0_12px_rgba(255,26,53,0.3)]">
              <Ticket className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black font-cyber text-white tracking-wider uppercase">
                  OPERATIVE BOUNTIES &amp; DISCOUNT COUPONS
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-red-600/20 text-red-400 border border-red-500/30">
                  ACTIVE SYNDICATE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Complete interactive missions to unlock up to 40% OFF store vouchers
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBountiesModalOpen(false)}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60 transition-all cursor-pointer shadow-md"
            title="Close Bounties Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bounties Interactive Content */}
        <div className="p-2 sm:p-6">
          <BountiesSection isModal={true} />
        </div>
      </div>
    </div>
  );
}
