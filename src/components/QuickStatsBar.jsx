import React from 'react';
import { Zap, ShieldCheck, KeyRound, Award, Users } from 'lucide-react';

export default function QuickStatsBar() {
  const perks = [
    {
      icon: Zap,
      title: 'Instant Delivery',
      desc: 'CD Keys unlocked in < 2 seconds'
    },
    {
      icon: KeyRound,
      title: 'Authorized Keys',
      desc: '100% direct publisher origin'
    },
    {
      icon: ShieldCheck,
      title: 'Red-Shield Guarantee',
      desc: 'Lifetime key activation warranty'
    },
    {
      icon: Users,
      title: 'Active Community',
      desc: '450K+ operatives worldwide'
    }
  ];

  return (
    <section className="relative z-20 border-y border-white/[0.08] bg-[#08090e] py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <div 
                key={i} 
                className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-red-500/30 hover:bg-white/[0.04] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-red-500 shadow-[0_0_12px_rgba(255,26,53,0.2)]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-cyber tracking-wide">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 font-sans">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
