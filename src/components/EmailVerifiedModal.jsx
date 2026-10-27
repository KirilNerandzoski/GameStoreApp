import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  User, 
  Mail,
  Zap
} from 'lucide-react';

export default function EmailVerifiedModal() {
  const { 
    isVerifiedModalOpen, 
    setIsVerifiedModalOpen, 
    userProfile, 
    currentUser,
    addToast,
    setIsProfileOpen
  } = useStore();

  useEffect(() => {
    if (isVerifiedModalOpen) {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#00f0ff', '#10b981', '#ffffff', '#ff1a35']
        });
      } catch (e) {}
    }
  }, [isVerifiedModalOpen]);

  if (!isVerifiedModalOpen) return null;

  const handleClose = () => {
    setIsVerifiedModalOpen(false);
    addToast('Neural Link Connected', 'Welcome to IGNIS. Enjoy exploring the marketplace!', 'success');
  };

  const handleGoToProfile = () => {
    setIsVerifiedModalOpen(false);
    setIsProfileOpen(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#090a14] border border-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.35)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 shadow-[0_0_15px_#10b981]" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-10 cursor-pointer"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Visual Icon */}
        <div className="p-6 sm:p-8 text-center space-y-3 bg-[#0d0f1c] border-b border-zinc-800 relative">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-emerald-950/50 border border-emerald-500/60 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-pulse">
            <ShieldCheck className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-400" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-cyber font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>BIOMETRIC AUTH // IDENTITY CONFIRMED</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-cyber text-white tracking-wider uppercase">
            OPERATIVE VERIFIED
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md mx-auto">
            Your email has been successfully confirmed. Full security clearance granted to the IGNIS Cyberpunk Marketplace.
          </p>
        </div>

        {/* Dossier Credentials Summary Box */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-xl bg-[#111322] border border-zinc-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                Operative Gamertag:
              </span>
              <span className="font-bold text-cyan-300">
                {userProfile?.gamertag || currentUser?.user_metadata?.gamertag || 'Operative'}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                Linked Email:
              </span>
              <span className="font-bold text-white truncate max-w-[200px]">
                {userProfile?.email || currentUser?.email || 'Verified Operative'}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Security Clearance:
              </span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                LEVEL 1 // AUTHORIZED
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                Neural Connection:
              </span>
              <span className="font-bold text-zinc-300">
                AES-256 ENCRYPTED
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-cyber font-black text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(16,185,129,0.4)] border border-emerald-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>CONTINUE BROWSING MARKETPLACE</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              type="button"
              onClick={handleGoToProfile}
              className="w-full py-2.5 px-4 rounded-xl bg-[#121320] hover:bg-[#18192b] border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Operative Dossier & Inventory</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
