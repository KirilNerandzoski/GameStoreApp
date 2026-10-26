import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Sparkles
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    bountyState,
    setIsCheckoutOpen,
    openGameDetail
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Drawer Panel */}
      <div 
        className="relative z-10 w-full max-w-md bg-[#0a0b10] border-l border-red-500/30 h-full flex flex-col shadow-[-10px_0_40px_rgba(255,26,53,0.2)] animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-[#0e0f17]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-500">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white tracking-wide">
                UNIVERSAL CACHE
              </h3>
              <span className="text-[11px] text-zinc-400 font-mono">
                {cart.length} items from Global Universal Shell
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={() => clearCart(true)}
                className="text-xs text-zinc-500 hover:text-red-400 transition-colors px-2 py-1"
                title="Flush Cart"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-cyber">Cache Empty</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Your acquisition queue contains zero active keys. Discover top tier titles from our catalog.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-lg text-xs font-cyber font-bold tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(255,26,53,0.4)] transition-all"
              >
                EXPLORE STORE
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={`${item.id}-${item.selectedPlatform}`}
                className="p-3 rounded-xl bg-[#11121c] border border-zinc-800/80 hover:border-red-500/40 transition-colors flex gap-3 group"
              >
                {/* Thumb */}
                <img
                  src={item.coverImage}
                  alt={item.title}
                  onClick={() => {
                    openGameDetail(item);
                    setIsCartOpen(false);
                  }}
                  className="w-16 h-20 rounded-lg object-cover cursor-pointer border border-zinc-800 hover:opacity-80 transition-opacity"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 
                        onClick={() => {
                          openGameDetail(item);
                          setIsCartOpen(false);
                        }}
                        className="text-xs font-bold text-white truncate cursor-pointer hover:text-red-400 transition-colors"
                        title={item.title}
                      >
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedPlatform)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-white/10 text-white border border-white/20">
                        {item.departmentName || 'IGNIS Gaming'}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-black text-red-400 border border-red-500/30">
                        {item.selectedPlatform}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {item.itemType === 'physical' ? 'Physical Cargo' : (item.itemType === 'subscription' ? 'Cloud Instance' : 'Instant Key')}
                      </span>
                    </div>
                  </div>

                  {/* Qty & Price Row */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60">
                    <div className="flex items-center gap-1.5 bg-[#0a0b10] border border-zinc-800 rounded px-1.5 py-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.selectedPlatform, item.quantity - 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1.5 font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.selectedPlatform, item.quantity + 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout calculations (only if cart has items) */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-zinc-800 bg-[#0e0f17] space-y-4">
            
            {/* Promo Voucher Code */}
            <div className="space-y-1.5">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo Code: CYBER2026"
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#07070a] border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-cyber font-bold text-zinc-200 transition-colors"
                >
                  APPLY
                </button>
              </form>

              {/* Unlocked Bounty Coupons & Demo Hints */}
              {!appliedPromo && (
                <div className="space-y-1.5 pt-1">
                  {bountyState?.unlockedCoupons?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-emerald-400 font-cyber font-bold">Earned Coupons:</span>
                      {bountyState.unlockedCoupons.map(c => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => applyPromoCode(c.code)}
                          className="px-2 py-0.5 rounded bg-red-600/25 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-[10px] font-mono font-bold transition-all"
                        >
                          {c.code} (-{c.discountPercent}%)
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[10px] text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <span>Demo codes:</span>
                      <button 
                        type="button"
                        onClick={() => applyPromoCode('CYBER2026')}
                        className="text-red-400 hover:underline font-mono"
                      >
                        CYBER2026 (-20%)
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(false);
                        document.getElementById('bounties')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-amber-400 hover:text-amber-300 font-cyber font-bold hover:underline"
                    >
                      + Earn up to 40% Off
                    </button>
                  </div>
                </div>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-950/30 border border-red-500/40 text-xs">
                  <span className="text-red-400 font-cyber font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-red-500" />
                    {appliedPromo.code} Active (-{appliedPromo.discountPercent}%)
                  </span>
                  <button
                    onClick={removePromoCode}
                    className="text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-400 font-semibold">
                  <span>Discount Applied</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Digital Delivery</span>
                <span className="font-mono text-emerald-400">FREE // INSTANT</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm">
                <span className="font-bold text-white font-cyber tracking-wide">TOTAL DUE</span>
                <span className="text-xl font-black font-heading text-white text-glow">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 rounded-xl text-sm font-cyber font-bold tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_20px_rgba(255,26,53,0.5)] hover:shadow-[0_0_30px_rgba(255,26,53,0.8)] transition-all flex items-center justify-center gap-2 group"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>Simulated Demo Transaction • No Real Funds Required</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
