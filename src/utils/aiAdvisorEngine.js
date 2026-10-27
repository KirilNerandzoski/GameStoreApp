// NEXUS TAC-AI (Tactical Gear & Loadout Advisor Engine)

export function processAdvisorQuery(userQuery, allProducts = [], games = []) {
  const query = userQuery.toLowerCase().trim();

  // Helper to find products matching keyword or id
  const findProduct = (term) => {
    return allProducts.find(p => 
      p.id.toLowerCase().includes(term) || 
      p.title.toLowerCase().includes(term) ||
      p.tags?.some(t => t.toLowerCase().includes(term))
    );
  };

  const findProducts = (terms, limit = 3) => {
    const list = [];
    for (const term of terms) {
      const match = findProduct(term);
      if (match && !list.some(p => p.id === match.id)) {
        list.push(match);
      }
      if (list.length >= limit) break;
    }
    return list;
  };

  // 1. Promo codes & discounts
  if (query.includes('promo') || query.includes('coupon') || query.includes('discount code') || query.includes('voucher')) {
    return {
      text: `🔐 **DECRYPTED OPERATIVE PROMO CODES DETECTED:**\n\n• **\`IGNIS10\`** — Grants **10% OFF** across all storefronts.\n• **\`CYBER20\`** — Exclusive **20% OFF** for orders exceeding $100.\n• **\`OVERCLOCK\`** — Grants **$50 OFF** on pre-built battlestations.\n\n*Apply these during checkout in the Universal Cart drawer for instant credit deductions.*`,
      recommendedProducts: [],
      quickActions: [
        { label: '🛒 Open Universal Cart', action: 'open_cart' }
      ],
      suggestedFollowUps: [
        'Recommend an esports mouse',
        'Build me a high-tier PC',
        'Which CyberFuel mix is best?'
      ]
    };
  }

  // 2. PC Battlestation & Rig queries
  if (query.includes('pc') || query.includes('rig') || query.includes('battlestation') || query.includes('5090') || query.includes('4090') || query.includes('build') || query.includes('desktop') || query.includes('gpu')) {
    const matched = findProducts(['titan', 'vanguard', 'specter', 'obsidian'], 2);
    return {
      text: `⚡ **TACTICAL PC RECOMMENDATION:**\n\nFor uncompromised **4K 144Hz+ ray tracing** and high-refresh esports (300+ FPS), our telemetry recommends an **AMD Ryzen 9 9950X3D** paired with an **RTX 5090 32GB** or **RTX 4090 24GB**.\n\nYou can customize your exact chassis, hardline liquid cooling loop, wattage headroom, and desk peripherals right now in our live studio:`,
      recommendedProducts: matched,
      quickActions: [
        { label: '🚀 Launch PC Battlestation Studio', action: 'open_builder' }
      ],
      suggestedFollowUps: [
        'What monitor works best for 4K?',
        'Do I need a 1000W or 1200W PSU?',
        'Show me Hall-Effect keyboards'
      ]
    };
  }

  // 3. CyberFuel Energy & Focus Formula queries
  if (query.includes('fuel') || query.includes('energy') || query.includes('caffeine') || query.includes('tub') || query.includes('drink') || query.includes('focus') || query.includes('nootropic')) {
    const fuelTubs = allProducts.filter(p => p.department === 'fuel').slice(0, 2);
    return {
      text: `🧪 **CYBERFUEL BIOMETRIC CALIBRATION:**\n\n• **For Late-Night Ranked Grinds:** Aim for **140mg - 180mg Caffeine** paired with **Alpha-GPC + L-Theanine** for laser focus without the nervous jitters.\n• **For Smooth Jitter-Free Reaction:** A **90mg Low-Stim** or **Zero-Stim** hydration blend with Citrulline Malate.\n\nYou can formulate your own custom 40-serving tub with your gamertag stamped on the chassis label:`,
      recommendedProducts: fuelTubs,
      quickActions: [
        { label: '🧪 Open Custom Formula Lab', action: 'open_formula_lab' }
      ],
      suggestedFollowUps: [
        'What are the best flavor combos?',
        'Can I put my gamertag on the tub?',
        'Recommend an esports mouse'
      ]
    };
  }

  // 4. Esports Peripherals (Mouse & Keyboard)
  if (query.includes('mouse') || query.includes('keyboard') || query.includes('peripheral') || query.includes('hall effect') || query.includes('dpi') || query.includes('esports')) {
    const periphs = findProducts(['phantom', 'cyberhaptic', 'specter'], 3);
    return {
      text: `🎯 **ESPORTS LOADOUT BLUEPRINT:**\n\n1. **Mouse:** The **Phantom Ultra (36g Carbon Fiber)** with 32,000 DPI and zero-smoothing optical switches gives near zero arm fatigue for micro-flicks.\n2. **Keyboard:** The **CyberHaptic 65%** features **Magnetic Hall-Effect switches** with 0.1mm Rapid Trigger for instantaneous strafe-stops in Valorant and CS2.`,
      recommendedProducts: periphs,
      quickActions: [
        { label: '⚡ Browse CyberTech Rigs Store', action: 'nav_hardware' }
      ],
      suggestedFollowUps: [
        'What is Rapid Trigger?',
        'Show me curved OLED monitors',
        'Build me a full PC setup'
      ]
    };
  }

  // 5. Monitors & Displays
  if (query.includes('monitor') || query.includes('screen') || query.includes('oled') || query.includes('ultrawide') || query.includes('240hz') || query.includes('display')) {
    const monitors = findProducts(['specter', 'curved', 'panel'], 2);
    return {
      text: `🖥️ **TACTICAL VISUAL ARSENAL:**\n\nFor immersive simulation and high productivity, the **Specter 49" QD-OLED 240Hz Curved Panel** delivers infinite contrast with a 0.03ms response time.\n\nFor dedicated competitive CS2/Apex play, dual 360Hz Fast-IPS panels offer the fastest optical clarity for tracking targets.`,
      recommendedProducts: monitors,
      quickActions: [
        { label: '🚀 Open Battlestation Studio', action: 'open_builder' }
      ],
      suggestedFollowUps: [
        'Recommend an RTX 4090 rig',
        'Which headset has spatial audio?'
      ]
    };
  }

  // 6. Loot Crates & Unboxing
  if (query.includes('crate') || query.includes('loot') || query.includes('unbox') || query.includes('knife') || query.includes('relic') || query.includes('odds') || query.includes('drop')) {
    return {
      text: `🎁 **CRATE INTELLIGENCE & TELEMETRY:**\n\n• **Neon Syndicate Crate:** Best entry tier (200 XP). High yield of tactical game keys and weapon camo skins.\n• **Cybernetic Apex Crate:** Balanced medium tier (500 XP). Drops custom street jackets, wireless gear, and Epic hardware.\n• **Black Market Vault Crate:** Legendary tier (1,200 XP). Contains the mythical **Holo Karambit Knife (0.8% Drop)** and 25% Off Hardware vouchers!`,
      recommendedProducts: [],
      quickActions: [
        { label: '📦 Open Loot Crate Terminal', action: 'open_loot' }
      ],
      suggestedFollowUps: [
        'How do I earn Operative XP?',
        'What active promo codes exist?'
      ]
    };
  }

  // 7. Games & Titles
  if (query.includes('game') || query.includes('play') || query.includes('rpg') || query.includes('shooter') || query.includes('action') || query.includes('horror') || query.includes('cyberpunk')) {
    const matchedGames = games.filter(g => {
      if (query.includes('cyberpunk') && g.title.toLowerCase().includes('cyberpunk')) return true;
      if (query.includes('shooter') && g.category.toLowerCase().includes('shooter')) return true;
      if (query.includes('rpg') && g.category.toLowerCase().includes('rpg')) return true;
      return g.rating >= 4.9;
    }).slice(0, 3);

    return {
      text: `🎮 **MISSION DOSSIER: TOP RECOMMENDED TITLES:**\n\nBased on your query, here are the top-rated AAA and indie master titles with instant digital key activation in your Universal Vault:`,
      recommendedProducts: matchedGames,
      quickActions: [
        { label: '🔥 Explore IGNIS Gaming Store', action: 'nav_gaming' }
      ],
      suggestedFollowUps: [
        'Recommend hardware to run these',
        'Show me games on sale',
        'What promo codes are active?'
      ]
    };
  }

  // 8. Streetwear & Techwear
  if (query.includes('jacket') || query.includes('hoodie') || query.includes('wear') || query.includes('apparel') || query.includes('streetwear') || query.includes('pants') || query.includes('cargo')) {
    const apparel = allProducts.filter(p => p.department === 'apparel').slice(0, 3);
    return {
      text: `🧥 **NEOWEAR TACTICAL DRIPS:**\n\nOur apparel division synthesizes waterproof DWR-coated cyber parkas, magnetic fidlock cargo armor, and reflective stealth hoodies engineered for both street aesthetic and extreme weather resistance.`,
      recommendedProducts: apparel,
      quickActions: [
        { label: '⚡ Browse NeoWear Streetwear', action: 'nav_apparel' }
      ],
      suggestedFollowUps: [
        'What size should I get?',
        'Any limited edition drops?'
      ]
    };
  }

  // 9. Budget-specific queries
  if (query.includes('under 100') || query.includes('under $100') || query.includes('cheap') || query.includes('budget')) {
    const budgetItems = allProducts.filter(p => p.price <= 100).slice(0, 3);
    return {
      text: `💰 **MAXIMUM VALUE LOADOUT (< $100):**\n\nHere are top-tier acquisitions calibrated for maximum performance-to-credit ratio without cutting corners on build quality:`,
      recommendedProducts: budgetItems,
      quickActions: [
        { label: '🛒 Open Universal Cart', action: 'open_cart' }
      ],
      suggestedFollowUps: [
        'Show me discount codes',
        'What games are on sale?'
      ]
    };
  }

  // 10. Dynamic catalog search fallback
  const keywords = query.split(/\s+/).filter(w => w.length > 2);
  const matched = allProducts.filter(p => {
    const pTitle = p.title.toLowerCase();
    const pTags = (p.tags || []).map(t => t.toLowerCase()).join(' ');
    const pDesc = (p.description || '').toLowerCase();
    return keywords.some(k => pTitle.includes(k) || pTags.includes(k) || pDesc.includes(k));
  }).slice(0, 3);

  if (matched.length > 0) {
    return {
      text: `🔍 **TELEMETRY SCAN COMPLETE:**\n\nFound **${matched.length} verified tactical items** matching **"${userQuery}"** across our universal catalog:`,
      recommendedProducts: matched,
      quickActions: [
        { label: '🚀 Launch Rig Studio', action: 'open_builder' },
        { label: '🧪 Open Formula Lab', action: 'open_formula_lab' }
      ],
      suggestedFollowUps: [
        'What are the best specs for 4K?',
        'Show me active promo codes',
        'Which crate has the best ROI?'
      ]
    };
  }

  // 11. General Greetings & Help fallback
  return {
    text: `👋 **NEXUS TAC-AI ONLINE.**\n\nGreetings Operative. I am your automated gear advisor and hardware telemetry consultant across all 6 IGNIS storefronts.\n\n**I can assist you with:**\n• Recommending optimal PC rigs and components (RTX 5090 / 4090, CPUs, liquid loops)\n• Finding esports peripherals (Hall-Effect keyboards, 36g carbon mice)\n• Formulating custom CyberFuel energy blends\n• Loot crate odds, drop mechanics, and active promo codes`,
    recommendedProducts: [
      allProducts.find(p => p.id === 'hw-apex-titan') || allProducts[0],
      allProducts.find(p => p.id === 'hw-cyber-keyboard') || allProducts[1]
    ].filter(Boolean),
    quickActions: [
      { label: '🚀 PC Battlestation Studio', action: 'open_builder' },
      { label: '🧪 Custom Formula Lab', action: 'open_formula_lab' },
      { label: '📦 Loot Crates', action: 'open_loot' }
    ],
    suggestedFollowUps: [
      'What is the best PC under $2,000?',
      'Recommend an esports mouse',
      'What active promo codes exist?'
    ]
  };
}
