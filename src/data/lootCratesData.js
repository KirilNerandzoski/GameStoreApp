export const RARITY_CONFIG = {
  common: {
    label: 'COMMON',
    color: '#94a3b8',
    borderColor: 'border-slate-500',
    bgColor: 'bg-slate-500/15',
    glowColor: 'shadow-[0_0_15px_rgba(148,163,184,0.3)]',
    badgeClass: 'bg-slate-800 text-slate-300 border border-slate-600'
  },
  rare: {
    label: 'RARE',
    color: '#00f0ff',
    borderColor: 'border-cyan-400',
    bgColor: 'bg-cyan-500/15',
    glowColor: 'shadow-[0_0_20px_rgba(0,240,255,0.4)]',
    badgeClass: 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
  },
  epic: {
    label: 'EPIC',
    color: '#bf00ff',
    borderColor: 'border-fuchsia-400',
    bgColor: 'bg-fuchsia-500/15',
    glowColor: 'shadow-[0_0_25px_rgba(191,0,255,0.45)]',
    badgeClass: 'bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-500/50'
  },
  legendary: {
    label: 'LEGENDARY',
    color: '#ffb700',
    borderColor: 'border-amber-400',
    bgColor: 'bg-amber-500/15',
    glowColor: 'shadow-[0_0_30px_rgba(255,183,0,0.5)]',
    badgeClass: 'bg-amber-950 text-amber-300 border border-amber-500/50'
  },
  godtier: {
    label: 'GOD-TIER',
    color: '#ff1a35',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-500/20',
    glowColor: 'shadow-[0_0_35px_rgba(255,26,53,0.6)]',
    badgeClass: 'bg-red-950 text-red-200 border border-red-500 animate-pulse'
  }
};

export const LOOT_CRATES = [
  {
    id: 'crate-neon',
    name: 'Neon Infiltrator Crate',
    tagline: 'Standard Recon Drop',
    description: 'Perfect for regular syndicate operatives. Contains discount vouchers, bonus XP cache drops, and common cyber decals.',
    costXp: 150,
    accentColor: '#00f0ff',
    borderClass: 'border-cyan-500/40 hover:border-cyan-400',
    bgClass: 'bg-gradient-to-b from-[#091520] to-[#070910]',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    items: [
      {
        id: 'drop-neon-1',
        title: '10% Sitewide Neon Voucher',
        category: 'coupon',
        code: 'NEON10',
        discountPercent: 10,
        rarity: 'common',
        weight: 35,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
        description: 'Instant 10% discount on any game, hardware, or CyberFuel in your cart.'
      },
      {
        id: 'drop-neon-2',
        title: '+100 Operative XP Cache',
        category: 'xp',
        xpAmount: 100,
        rarity: 'common',
        weight: 30,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        description: 'Instant telemetry data injection boosting your Operative Level progression.'
      },
      {
        id: 'drop-neon-3',
        title: '15% Off Neon Recon Coupon',
        category: 'coupon',
        code: 'NEON15',
        discountPercent: 15,
        rarity: 'rare',
        weight: 20,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
        description: 'Elevated reconnaissance discount redeemable across all 6 departments.'
      },
      {
        id: 'drop-neon-4',
        title: '+300 Mega XP Booster',
        category: 'xp',
        xpAmount: 300,
        rarity: 'rare',
        weight: 10,
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
        description: 'Triple XP data canister that accelerates syndicate unlocks.'
      },
      {
        id: 'drop-neon-5',
        title: 'Free CyberGlow Shaker Drop',
        category: 'free_item',
        freeProductId: 'fuel-shaker-mag-glow',
        freeProductTitle: 'CyberGlow LED RGB Magnetic Shaker Bottle',
        freeProductDept: 'fuel',
        rarity: 'epic',
        weight: 5,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80',
        description: 'JACKPOT: Automatically adds the $29.99 RGB Magnetic Shaker to your cart for $0.00!'
      }
    ]
  },
  {
    id: 'crate-tactical',
    name: 'Tactical Spec-Ops Crate',
    tagline: 'High-Caliber Military Drop',
    description: 'Armament crate for serious shoppers. Delivers 20-25% coupons, heavy XP caches, and hardware discounts.',
    costXp: 350,
    accentColor: '#bf00ff',
    borderClass: 'border-fuchsia-500/40 hover:border-fuchsia-400',
    bgClass: 'bg-gradient-to-b from-[#180920] to-[#0a0712]',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80',
    items: [
      {
        id: 'drop-tac-1',
        title: '20% Off Spec-Ops Voucher',
        category: 'coupon',
        code: 'TACTICAL20',
        discountPercent: 20,
        rarity: 'rare',
        weight: 35,
        image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=400&q=80',
        description: '20% off your entire multi-store cart total.'
      },
      {
        id: 'drop-tac-2',
        title: '+500 Spec-Ops XP Infusion',
        category: 'xp',
        xpAmount: 500,
        rarity: 'rare',
        weight: 30,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
        description: 'Half a level worth of operative experience credited immediately.'
      },
      {
        id: 'drop-tac-3',
        title: '25% Off Tactical Master Drop',
        category: 'coupon',
        code: 'CRATE25',
        discountPercent: 25,
        rarity: 'epic',
        weight: 20,
        image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=400&q=80',
        description: 'Quarter-off discount code for high-tier battlestations or streetwear.'
      },
      {
        id: 'drop-tac-4',
        title: 'Free Tactical Energy Gummies Box',
        category: 'free_item',
        freeProductId: 'fuel-cyber-focus-gummies',
        freeProductTitle: 'Tactical Focus Caffeine Energy Gummies (12-Pack)',
        freeProductDept: 'fuel',
        rarity: 'epic',
        weight: 10,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
        description: 'Adds a full 12-pack of focus caffeine gummies ($22.99 value) to your cart for $0!'
      },
      {
        id: 'drop-tac-5',
        title: '35% Off Crimson Elite Pass',
        category: 'coupon',
        code: 'CRIMSON35',
        discountPercent: 35,
        rarity: 'legendary',
        weight: 5,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
        description: 'Massive 35% discount voucher for any purchase.'
      }
    ]
  },
  {
    id: 'crate-syndicate',
    name: 'Syndicate Black-Market Vault',
    tagline: 'Underground Contraband',
    description: 'Directly intercepted from cyber syndicate smugglers. Packed with 30% discount codes, free merch, and collector gear.',
    costXp: 750,
    accentColor: '#ffb700',
    borderClass: 'border-amber-500/40 hover:border-amber-400',
    bgClass: 'bg-gradient-to-b from-[#1a1405] to-[#0c0905]',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    items: [
      {
        id: 'drop-syn-1',
        title: '30% Off Syndicate Black Market',
        category: 'coupon',
        code: 'SYNDICATE30',
        discountPercent: 30,
        rarity: 'epic',
        weight: 40,
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
        description: 'Save 30% on hardware, collectibles, games, or server instances.'
      },
      {
        id: 'drop-syn-2',
        title: '+1,000 High-Roller XP Cache',
        category: 'xp',
        xpAmount: 1000,
        rarity: 'epic',
        weight: 25,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
        description: 'Massive +1,000 XP surge straight into your profile account.'
      },
      {
        id: 'drop-syn-3',
        title: 'Free Forged Carbon Shaker Drop',
        category: 'free_item',
        freeProductId: 'fuel-shaker-forged-carbon',
        freeProductTitle: 'Forged Carbon Fiber & Steel Shaker (26oz)',
        freeProductDept: 'fuel',
        rarity: 'legendary',
        weight: 20,
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80',
        description: 'Adds the ultra-premium $39.99 Forged Carbon Shaker to your cart for $0!'
      },
      {
        id: 'drop-syn-4',
        title: '40% Off Elite Master Bounty',
        category: 'coupon',
        code: 'OMEGA40',
        discountPercent: 40,
        rarity: 'legendary',
        weight: 12,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
        description: 'Legendary 40% discount coupon applicable on checkout.'
      },
      {
        id: 'drop-syn-5',
        title: '50% Off God-Tier Omnicrate Jackpot',
        category: 'coupon',
        code: 'GODTIER50',
        discountPercent: 50,
        rarity: 'godtier',
        weight: 3,
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
        description: 'THE HOLY GRAIL: Half off any order in the entire store!'
      }
    ]
  },
  {
    id: 'crate-godtier',
    name: 'God-Tier Omnicrate',
    tagline: 'Apex Singularity Vault',
    description: 'The highest tier in existence. Extremely volatile drop table with guaranteed Epic, Legendary, or God-Tier prizes.',
    costXp: 1500,
    accentColor: '#ff1a35',
    borderClass: 'border-red-500/50 hover:border-red-400',
    bgClass: 'bg-gradient-to-b from-[#200508] to-[#0c0406]',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    items: [
      {
        id: 'drop-god-1',
        title: '50% Off God-Tier Omnicrate Jackpot',
        category: 'coupon',
        code: 'GODTIER50',
        discountPercent: 50,
        rarity: 'godtier',
        weight: 25,
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
        description: 'Cut your entire cart bill in half with a 50% discount code.'
      },
      {
        id: 'drop-god-2',
        title: 'Free Limited Edition Collector Box',
        category: 'free_item',
        freeProductId: 'fuel-collector-box-phantom',
        freeProductTitle: 'Phantom Samurai Collector Box (Tub + Shaker + Pin)',
        freeProductDept: 'fuel',
        rarity: 'godtier',
        weight: 20,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80',
        description: 'Adds the $49.99 Limited Edition Collector Box to your cart for $0.00!'
      },
      {
        id: 'drop-god-3',
        title: '40% Off Elite Master Voucher',
        category: 'coupon',
        code: 'OMEGA40',
        discountPercent: 40,
        rarity: 'legendary',
        weight: 25,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
        description: '40% discount across games, hardware, techwear, or server nodes.'
      },
      {
        id: 'drop-god-4',
        title: '+2,500 Singularity XP Surge',
        category: 'xp',
        xpAmount: 2500,
        rarity: 'legendary',
        weight: 20,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
        description: 'A monolithic surge of +2,500 XP to boost your prestige level.'
      },
      {
        id: 'drop-god-5',
        title: 'Free CyberGlow RGB Shaker + 35% Off Combo',
        category: 'free_item',
        freeProductId: 'fuel-shaker-mag-glow',
        freeProductTitle: 'CyberGlow LED RGB Magnetic Shaker Bottle',
        freeProductDept: 'fuel',
        bonusCode: 'CRIMSON35',
        rarity: 'godtier',
        weight: 10,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80',
        description: 'ULTIMATE JACKPOT: $0 Free RGB Shaker + 35% discount code applied together!'
      }
    ]
  }
];
