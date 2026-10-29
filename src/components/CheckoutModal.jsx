import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Coins, 
  Wallet, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Zap,
  RefreshCw,
  Truck
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    cartSubtotal,
    discountAmount,
    appliedPromo,
    userProfile, 
    completeOrder 
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'credits' | 'crypto' | 'steam'
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    email: 'operative.valkyrie@ignis-syndicate.net',
    gamertag: userProfile.gamertag,
    cardNumber: '4829 •••• •••• 9942',
    cardName: 'VALKYRIE ARCHER',
    expiry: '11/29',
    cvv: '884',
    country: 'United States'
  });

  const [shippingData, setShippingData] = useState({
    fullName: 'Alex Mercer',
    address: '88 Cybernetic Ave, Suite 402',
    city: 'Neo-Tokyo District 9',
    postalCode: '100-0001',
    courier: 'Quantum Expedited (Insured 24h)'
  });

  const hasPhysicalItems = cart.some(item => item.itemType === 'physical');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAutofillDemo = () => {
    setFormData({
      email: 'alex.mercer@prototype.io',
      gamertag: 'Ghost_Operative_01',
      cardNumber: '5500 2341 8899 4412',
      cardName: 'ALEX MERCER',
      expiry: '08/28',
      cvv: '773',
      country: 'Neo-Tokyo District 4'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Realistic cryptographic simulation delay
    setTimeout(() => {
      let methodLabel = 'IGNIS Cyber Card (•••• 9942)';
      if (paymentMethod === 'credits') methodLabel = 'IGNIS Operative Credits';
      if (paymentMethod === 'crypto') methodLabel = 'BTC Lightning Network';
      if (paymentMethod === 'steam') methodLabel = 'Steam Digital Wallet';

      completeOrder(methodLabel, shippingData);
      setIsProcessing(false);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-[#0c0d14] border border-red-500/40 shadow-[0_0_60px_rgba(255,26,53,0.35)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-zinc-800 bg-[#11121c] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-500">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white tracking-wide">
                GLOBAL UNIVERSAL SHELL // CHECKOUT
              </h3>
              <span className="text-[11px] text-zinc-400 font-mono">
                Consolidated Universal Checkout for All 6 Storefronts
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            disabled={isProcessing}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="bg-red-950/30 border-b border-red-500/30 px-5 py-2 flex items-center justify-between text-xs text-red-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span>Simulated checkout for demo showcase. No real money will be charged.</span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="text-[11px] font-cyber text-white bg-red-600/40 hover:bg-red-600 px-2 py-0.5 rounded border border-red-500/50 transition-colors hidden sm:block"
          >
            AUTO-FILL DEMO INFO
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
          
          {/* Order Summary Strip */}
          <div className="p-3.5 rounded-xl bg-[#131422] border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-zinc-400 block font-mono">Consolidated Cache:</span>
              <span className="text-white font-bold">{cart.length} Items ({cart.reduce((a,c) => a + c.quantity, 0)} Units across {new Set(cart.map(c => c.departmentName || 'IGNIS Gaming')).size} Stores)</span>
            </div>
            {discountAmount > 0 && (
              <div>
                <span className="text-zinc-400 block font-mono">Universal Discount:</span>
                <span className="text-red-400 font-bold">-${discountAmount.toFixed(2)} ({appliedPromo?.code})</span>
              </div>
            )}
            <div>
              <span className="text-zinc-400 block font-mono">Authorized Total:</span>
              <span className="text-lg font-black text-white font-heading text-glow">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Physical Delivery Form if Physical Items are in Cart */}
          {hasPhysicalItems && (
            <div className="p-4 rounded-xl bg-[#0f101a] border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-cyber font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Physical Cargo Courier Delivery Address</span>
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">Insured Transit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Full Recipient Name"
                  value={shippingData.fullName}
                  onChange={(e) => setShippingData(p => ({ ...p, fullName: e.target.value }))}
                  className="px-3 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Street Address & Apt"
                  value={shippingData.address}
                  onChange={(e) => setShippingData(p => ({ ...p, address: e.target.value }))}
                  className="px-3 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="City / District"
                  value={shippingData.city}
                  onChange={(e) => setShippingData(p => ({ ...p, city: e.target.value }))}
                  className="px-3 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={shippingData.postalCode}
                  onChange={(e) => setShippingData(p => ({ ...p, postalCode: e.target.value }))}
                  className="px-3 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider block">
              Choose Simulated Gateway
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_12px_rgba(255,26,53,0.3)]'
                    : 'bg-[#10111a] border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-red-500" />
                <span className="text-xs font-semibold">Cyber Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credits')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'credits'
                    ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_12px_rgba(255,26,53,0.3)]'
                    : 'bg-[#10111a] border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <Zap className="w-5 h-5 text-red-500" />
                <span className="text-xs font-semibold">IGNIS Credits</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'crypto'
                    ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_12px_rgba(255,26,53,0.3)]'
                    : 'bg-[#10111a] border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <Coins className="w-5 h-5 text-red-500" />
                <span className="text-xs font-semibold">Crypto Pulse</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('steam')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'steam'
                    ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_12px_rgba(255,26,53,0.3)]'
                    : 'bg-[#10111a] border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <Wallet className="w-5 h-5 text-red-500" />
                <span className="text-xs font-semibold">Steam Wallet</span>
              </button>

            </div>
          </div>

          {/* Interactive Card Visual Preview (When Card is selected) */}
          {paymentMethod === 'card' && (
            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#1b1c2b] via-[#10111d] to-[#250d13] border border-red-500/40 shadow-[0_0_25px_rgba(255,26,53,0.25)] text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-cyber font-bold tracking-widest text-xs text-red-400">
                  IGNIS QUANTUM TITANIUM
                </span>
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
              </div>

              {/* Chip & Contactless */}
              <div className="w-10 h-7 rounded bg-gradient-to-tr from-amber-400 to-amber-200 border border-amber-500/60 shadow-inner" />

              <div className="font-mono text-lg sm:text-xl tracking-widest text-zinc-200 text-glow">
                {formData.cardNumber || '•••• •••• •••• ••••'}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <div>
                  <span className="text-[9px] uppercase tracking-wider block text-zinc-500">Cardholder</span>
                  <span className="text-white font-bold tracking-wider uppercase">{formData.cardName || 'VALKYRIE ARCHER'}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block text-zinc-500">Expires</span>
                  <span className="text-white font-bold">{formData.expiry || '11/29'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Input Fields */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Instant Delivery Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Operative Gamertag</label>
                <input
                  type="text"
                  name="gamertag"
                  required
                  value={formData.gamertag}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="text-[11px] text-zinc-400 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white uppercase focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Exp & CVV</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-1/2 px-2 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white font-mono focus:outline-none focus:border-red-500 text-center"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-1/2 px-2 py-2 rounded-lg bg-[#08080c] border border-zinc-800 text-xs text-white font-mono focus:outline-none focus:border-red-500 text-center"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'credits' && (
              <div className="p-4 rounded-xl bg-[#141524] border border-red-500/30 text-xs text-zinc-300 space-y-2">
                <div className="flex justify-between items-center">
                  <span>Available Operative Credits:</span>
                  <span className="font-mono font-bold text-red-400">{userProfile.ignisCredits} CREDITS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Credits Required For Purchase:</span>
                  <span className="font-mono font-bold text-white">{Math.round(cartTotal * 10)} CREDITS</span>
                </div>
                <p className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
                  Deducts from your internal IGNIS syndicate balance instantly.
                </p>
              </div>
            )}
          </div>

          {/* Universal Delivery & Security Guarantees */}
          <div className="p-3.5 rounded-xl bg-[#090a10] border border-white/[0.06] space-y-2 text-xs font-mono">
            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>IGNIS Buyer Protection & Delivery Guarantees</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400">
              <div className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-200 font-bold block">Instant Digital Reveal</span>
                  <span className="text-[10px] text-zinc-400 leading-tight block">AAA keys generate in &lt; 2s with 1-click Steam/Epic activation.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <Truck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-200 font-bold block">Insured Express Courier</span>
                  <span className="text-[10px] text-zinc-400 leading-tight block">Rigs &amp; merch ship via express DHL with 30-day return warranty.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl text-sm font-cyber font-bold tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_25px_rgba(255,26,53,0.5)] transition-all flex items-center justify-center gap-2 ${
              isProcessing ? 'opacity-70 cursor-wait' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>GENERATING ENCRYPTED CD-KEYS...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>PAY ${cartTotal.toFixed(2)} VIA GLOBAL UNIVERSAL SHELL</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SANDBOX DEMO ENVIRONMENT • SAFE & LOCAL ONLY</span>
          </div>

        </form>

      </div>
    </div>
  );
}
