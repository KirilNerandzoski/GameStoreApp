import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast, isCartOpen, isWishlistOpen } = useStore();

  if (!toasts || toasts.length === 0) return null;

  const isRightDrawerOpen = isCartOpen || isWishlistOpen;

  return (
    <div className={`fixed bottom-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0 transition-all duration-300 ${
      isRightDrawerOpen ? 'left-6' : 'right-6'
    }`}>
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative overflow-hidden flex items-start gap-3 p-4 rounded-lg bg-[#0d0e14]/95 border backdrop-blur-md shadow-2xl transition-all duration-300 animate-slide-in ${
              isSuccess
                ? 'border-red-500/50 shadow-[0_0_20px_rgba(255,26,53,0.35)]'
                : isError
                ? 'border-red-600 shadow-[0_0_25px_rgba(220,38,38,0.5)]'
                : isWarning
                ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'border-zinc-700/80 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
            }`}
          >
            {/* Top glowing bar */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] ${
              isSuccess ? 'bg-red-500 shadow-[0_0_8px_#ff1a35]' :
              isError ? 'bg-red-600 shadow-[0_0_8px_#dc2626]' :
              isWarning ? 'bg-amber-400' : 'bg-zinc-400'
            }`} />

            {/* Icon */}
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-red-500 animate-pulse" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-600" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-red-400" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-sm font-semibold tracking-wide text-white font-cyber flex items-center gap-2">
                {toast.title}
              </h4>
              <p className="text-xs text-gray-300 mt-0.5 leading-relaxed font-sans">
                {toast.message}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
