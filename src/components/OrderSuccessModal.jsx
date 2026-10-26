import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  Gamepad2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Flame
} from 'lucide-react';

export default function OrderSuccessModal() {
  const { 
    completedOrder, 
    setCompletedOrder, 
    setIsProfileOpen, 
    addToast 
  } = useStore();

  const [copiedKey, setCopiedKey] = useState(null);

  if (!completedOrder) return null;

  const handleCopyKey = (keyStr) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(keyStr);
      setCopiedKey(keyStr);
      addToast('Activation Key Copied', `${keyStr} ready to redeem in launcher.`, 'success');
      setTimeout(() => setCopiedKey(null), 3000);
    }
  };

  const handleViewLibrary = () => {
    setCompletedOrder(null);
    setIsProfileOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-[#0c0d14] border border-red-500/50 shadow-[0_0_60px_rgba(255,26,53,0.45)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500 shadow-[0_0_15px_#ff1a35]" />

        {/* Close Button */}
        <button
          onClick={() => setCompletedOrder(null)}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Header */}
        <div className="p-6 text-center space-y-3 bg-[#11121d] border-b border-zinc-800">
          <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/60 mx-auto flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(255,26,53,0.5)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cyber font-bold bg-red-600/20 text-red-400 border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            TRANSACTION COMPLETED // KEYS DEPLOYED
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
            THANK YOU, OPERATIVE!
          </h3>

          <p className="text-xs text-zinc-400 font-mono">
            Receipt #{completedOrder.orderId} • {completedOrder.date}
          </p>
        </div>

        {/* CD Keys Box */}
        <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
              Universal Shell Fulfillment ({completedOrder.items.length} Items)
            </span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Origin & Insured
            </span>
          </div>

          <div className="space-y-3">
            {completedOrder.items.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-[#141524] border border-red-500/30 space-y-2 shadow-inner"
              >
                <div className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.coverImage && (
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className={`w-14 h-10 rounded-md shrink-0 border border-zinc-800 ${
                          item.isCustomFormula ? 'object-contain bg-[#07080e] p-0.5 border-cyan-500/40' : 'object-cover object-center'
                        }`} 
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/10 text-white border border-white/20">
                          {item.departmentName || 'IGNIS Gaming'}
                        </span>
                      </div>
                      <span className="font-bold text-white truncate block max-w-[220px]">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black text-red-400 border border-red-500/30 shrink-0">
                    {item.platform}
                  </span>
                </div>

                {/* Digital CD Key */}
                {item.cdKey && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#090a0f] border border-zinc-800">
                    <span className="font-mono text-xs sm:text-sm tracking-widest text-red-400 font-bold select-all">
                      {item.cdKey}
                    </span>

                    <button
                      onClick={() => handleCopyKey(item.cdKey)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-red-600 text-[11px] font-semibold text-white transition-colors"
                    >
                      {copiedKey === item.cdKey ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY KEY</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Physical Cargo Tracking */}
                {item.trackingNumber && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#090a0f] border border-cyan-500/40">
                    <div>
                      <span className="text-[10px] text-zinc-400 font-mono block">Insured Courier Tracking:</span>
                      <span className="font-mono text-xs sm:text-sm tracking-wider text-cyan-400 font-bold select-all">
                        {item.trackingNumber}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40">
                      Dispatched
                    </span>
                  </div>
                )}

                {/* Cloud Node Instance */}
                {item.serverInstanceId && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#090a0f] border border-emerald-500/40">
                    <div>
                      <span className="text-[10px] text-zinc-400 font-mono block">Active Cloud Instance:</span>
                      <span className="font-mono text-xs sm:text-sm tracking-wider text-emerald-400 font-bold select-all">
                        {item.serverInstanceId}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/40">
                      Online 128T
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* XP Reward Notification */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="text-zinc-200">
                Reward Gained: <strong className="text-white">+{completedOrder.items.length * 450} XP</strong> & IGNIS Syndicate Points
              </span>
            </div>
            <span className="font-cyber font-bold text-red-400 text-xs">LEVEL BOOST</span>
          </div>

          {/* Order Financials */}
          <div className="p-3 rounded-lg bg-[#0e0f17] border border-zinc-800/80 space-y-1 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Payment Gateway:</span>
              <span className="text-zinc-200 font-mono">{completedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Total Paid:</span>
              <span className="text-white font-bold font-mono">${completedOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-zinc-800 bg-[#11121d] flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleViewLibrary}
            className="flex-1 py-3 rounded-xl text-xs font-cyber font-bold tracking-wider text-white bg-red-600 hover:bg-red-500 shadow-[0_0_15px_rgba(255,26,53,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>OPEN IN MY LIBRARY</span>
          </button>

          <button
            onClick={() => setCompletedOrder(null)}
            className="px-5 py-3 rounded-xl text-xs font-cyber font-bold tracking-wider text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 transition-colors"
          >
            CONTINUE BROWSING
          </button>
        </div>

      </div>
    </div>
  );
}
