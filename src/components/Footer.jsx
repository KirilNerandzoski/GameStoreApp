import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Flame, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    addToast('Frequency Linked', `Encrypted dispatch tuned to ${email}.`, 'success');
    setEmail('');
  };

  return (
    <footer className="relative bg-[#060608] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden text-zinc-400">
      
      {/* Background Subtle Red Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-600/5 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(255,26,53,0.3)]">
                <Flame className="w-5 h-5 text-red-500" />
              </div>
              <span className="font-heading font-black text-2xl tracking-wider text-white">
                IGNIS MARKETPLACE
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-sans">
              Next-generation cyberpunk digital game distributor. Instant cryptographic key delivery, verified direct publisher licensing, and tactical operative perks.
            </p>

            {/* Status Live Ticker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e0f17] border border-white/[0.08] text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-zinc-300">DISPATCH NODES: <strong>ONLINE (12ms)</strong></span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-cyber font-bold tracking-wider text-white uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-red-400 transition-colors">Spotlight Releases</a></li>
              <li><a href="#catalog" className="hover:text-red-400 transition-colors">Tactical Catalog</a></li>
              <li><a href="#deals" className="hover:text-red-400 transition-colors">Flash Discounts</a></li>
              <li><a href="#recently-viewed" className="hover:text-red-400 transition-colors">Recently Viewed</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-cyber font-bold tracking-wider text-white uppercase">
              Operative Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">CD-Key Activation Guide</span></li>
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">Red-Shield Guarantee</span></li>
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">Syndicate Level Perks</span></li>
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">System Compatibility</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-cyber font-bold tracking-wider text-white uppercase">
              Flash Intel Dispatch
            </h4>
            <p className="text-xs text-zinc-400">
              Receive notifications for 70%+ weekend flash drops and early CD-key releases.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="operative@ignis.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0f17] border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-[0_0_10px_rgba(255,26,53,0.4)] transition-all"
                title="Transmit"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Portfolio Disclaimer & Copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 text-[11px] text-zinc-400 max-w-xl text-center md:text-left">
            <strong className="text-red-400 font-cyber">PORTFOLIO DEMO SPECIFICATION:</strong> This is an interactive frontend showcase built strictly for demonstration purposes. All titles, CD-keys, orders, and currencies are fictional simulations. No real financial credentials or payment processors are invoked.
          </div>

          <div className="text-center md:text-right font-mono text-[11px] text-zinc-500">
            <div>IGNIS GAMING MARKETPLACE // v2.0.4</div>
            <div className="mt-1">Crafted with React, Tailwind CSS & Cyberpunk Crimson Aesthetic</div>
          </div>

        </div>

      </div>
    </footer>
  );
}
