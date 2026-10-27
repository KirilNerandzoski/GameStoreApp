// Battlestation Component Specs & Configurator Data
export const RGB_THEMES = [
  { id: 'cyan', name: 'Cyber Neon', primary: '#00f0ff', secondary: '#0066ff', glow: 'rgba(0, 240, 255, 0.4)' },
  { id: 'crimson', name: 'Syndicate Crimson', primary: '#ff1a35', secondary: '#990011', glow: 'rgba(255, 26, 53, 0.4)' },
  { id: 'toxic', name: 'Matrix Toxic', primary: '#00ff88', secondary: '#008844', glow: 'rgba(0, 255, 136, 0.4)' },
  { id: 'purple', name: 'Vaporwave Ultra', primary: '#bf00ff', secondary: '#ff00aa', glow: 'rgba(191, 0, 255, 0.4)' },
  { id: 'amber', name: 'Solaris Gold', primary: '#ffb700', secondary: '#ff5500', glow: 'rgba(255, 183, 0, 0.4)' },
  { id: 'stealth', name: 'Stealth Obsidian', primary: '#52525b', secondary: '#18181b', glow: 'rgba(255, 255, 255, 0.05)' }
];

export const CASES = [
  {
    id: 'case-obsidian',
    name: 'Obsidian Dual-Chamber Glass',
    brand: 'Apex Cybernetics',
    price: 249.99,
    formFactor: 'ATX / E-ATX',
    maxGpuLength: 460,
    airflowRating: 'Ultra High',
    description: 'Panoramic dual tempered glass with separated PSU thermal chamber and 10x fan brackets.',
    badge: 'POPULAR'
  },
  {
    id: 'case-cybercube',
    name: 'Neo-Cube Tactical Mini-ITX',
    brand: 'Vanguard Dynamics',
    price: 199.99,
    formFactor: 'Mini-ITX',
    maxGpuLength: 350,
    airflowRating: 'Direct Airflow',
    description: 'Machined aluminum chassis with integrated quick-grab tactical carry handle.',
    badge: 'COMPACT'
  },
  {
    id: 'case-openair',
    name: 'Cryo-Apex Open-Air Bench',
    brand: 'Apex Cybernetics',
    price: 329.99,
    formFactor: 'Open Showcase',
    maxGpuLength: 500,
    airflowRating: 'Unrestricted Cryo',
    description: 'Aerospace-grade CNC aluminum skeletal chassis built for custom liquid hardline loops.',
    badge: 'ENTHUSIAST'
  },
  {
    id: 'case-monolith',
    name: 'Monolith Stealth Acoustic Shield',
    brand: 'Silencio Labs',
    price: 219.99,
    formFactor: 'ATX Workstation',
    maxGpuLength: 420,
    airflowRating: 'Sound-Dampened',
    description: 'High-density acoustic bitumen padding designed for dead-silent rendering and gaming.',
    badge: 'WHISPER QUIET'
  }
];

export const CPUS = [
  {
    id: 'cpu-9950x3d',
    name: 'AMD Ryzen 9 9950X3D',
    cores: '16 Cores / 32 Threads',
    clock: 'Up to 5.7 GHz',
    cache: '144MB 3D V-Cache',
    tdp: 120,
    price: 699.99,
    benchmarkScore: 99,
    description: 'The undisputed heavy-duty king for both high-refresh competitive gaming and intense rendering.',
    socket: 'AM5',
    badge: 'FLAGSHIP'
  },
  {
    id: 'cpu-7800x3d',
    name: 'AMD Ryzen 7 7800X3D',
    cores: '8 Cores / 16 Threads',
    clock: 'Up to 5.0 GHz',
    cache: '104MB 3D V-Cache',
    tdp: 120,
    price: 449.99,
    benchmarkScore: 95,
    description: 'Pure gaming optimization. Outperforms higher wattage chips in esports and high-fps shooters.',
    socket: 'AM5',
    badge: 'BEST GAMING VALUE'
  },
  {
    id: 'cpu-ultra9',
    name: 'Intel Core Ultra 9 285K',
    cores: '24 Cores (8P + 16E)',
    clock: 'Up to 5.7 GHz',
    cache: '36MB Smart Cache',
    tdp: 250,
    price: 629.99,
    benchmarkScore: 97,
    description: 'Next-gen hybrid architecture with onboard NPU AI boost and supreme single-core clocks.',
    socket: 'LGA1851',
    badge: 'AI ACCELERATED'
  },
  {
    id: 'cpu-14700k',
    name: 'Intel Core i7-14700K',
    cores: '20 Cores (8P + 12E)',
    clock: 'Up to 5.6 GHz',
    cache: '33MB Cache',
    tdp: 253,
    price: 399.99,
    benchmarkScore: 91,
    description: 'Heavy duty multitasking and high frame-rate gaming with Intel Turbo Boost Max 3.0.',
    socket: 'LGA1700',
    badge: 'BALANCED PRO'
  }
];

export const GPUS = [
  {
    id: 'gpu-5090',
    name: 'NVIDIA GeForce RTX 5090 OC 32GB',
    vram: '32GB GDDR7 512-bit',
    tdp: 575,
    price: 2199.99,
    rtxTier: 'Tier 1 - God Level',
    fpsCyberpunk4k: 145,
    fpsWarzone1440: 310,
    fpsCs21080: 720,
    description: 'Unchecked graphical supremacy with Blackwell architecture and 4th Gen Tensor Cores.',
    badge: 'NEXT-GEN BEAST'
  },
  {
    id: 'gpu-4090',
    name: 'NVIDIA GeForce RTX 4090 24GB Titanium',
    vram: '24GB GDDR6X 384-bit',
    tdp: 450,
    price: 1799.99,
    rtxTier: 'Tier 1 - Master',
    fpsCyberpunk4k: 115,
    fpsWarzone1440: 260,
    fpsCs21080: 640,
    description: 'Triple vapor chamber cryo cooling. Handles ray traced 4K gaming with DLSS 3.5 frame gen.',
    badge: 'PROVEN TITAN'
  },
  {
    id: 'gpu-4080s',
    name: 'NVIDIA GeForce RTX 4080 Super 16GB',
    vram: '16GB GDDR6X 256-bit',
    tdp: 320,
    price: 999.99,
    rtxTier: 'Tier 2 - Elite',
    fpsCyberpunk4k: 88,
    fpsWarzone1440: 215,
    fpsCs21080: 540,
    description: 'Flawless 1440p ultra high refresh and reliable 4K ray tracing performance.',
    badge: 'SWEET SPOT'
  },
  {
    id: 'gpu-7900xtx',
    name: 'AMD Radeon RX 7900 XTX 24GB Nitro',
    vram: '24GB GDDR6 384-bit',
    tdp: 355,
    price: 929.99,
    rtxTier: 'Tier 2 - Pure Raster',
    fpsCyberpunk4k: 82,
    fpsWarzone1440: 235,
    fpsCs21080: 590,
    description: 'Massive 24GB frame buffer with DisplayPort 2.1 native ultra-wide throughput.',
    badge: '24GB VRAM'
  }
];

export const COOLING = [
  {
    id: 'cooler-cryoloop',
    name: 'Hardline Cryo Liquid Loop',
    type: 'Custom Acrylic Hardline',
    fans: 'Dual 360mm Radiators',
    price: 499.99,
    tdpDissipation: '600W+ Headroom',
    description: 'Bespoke hand-bent acrylic tubing, clear coolant with UV dye, and D5 pump reservoir combo.',
    badge: 'ULTIMATE'
  },
  {
    id: 'cooler-360aio',
    name: 'Apex Liquid 360 LCD AIO',
    type: 'Closed-Loop 360mm AIO',
    fans: '3x Magnetic Daisy-Chain 120mm',
    price: 239.99,
    tdpDissipation: '350W Headroom',
    description: '2.8-inch IPS LCD pump cap showing real-time CPU thermals, clock speeds, or custom GIFs.',
    badge: 'POPULAR'
  },
  {
    id: 'cooler-stealthair',
    name: 'Valkyrie Dual-Tower Air Cooler',
    type: 'Dual-Tower Copper Heatpipe',
    fans: '2x 140mm Silent Fluid Dynamic',
    price: 109.99,
    tdpDissipation: '280W Headroom',
    description: 'Zero pump failure risk. Pure copper cold plate with 7 sintered heat pipes.',
    badge: 'RELIABLE'
  }
];

export const MOTHERBOARDS = [
  {
    id: 'mobo-extreme',
    name: 'ROG Crosshair X870E Extreme',
    chipset: 'AMD X870E',
    price: 549.99,
    features: 'PCIe 5.0, Wi-Fi 7, Dual USB4 40Gbps, 20+2 Power Stages',
    badge: 'OVERCLOCKER'
  },
  {
    id: 'mobo-z890',
    name: 'AORUS Z890 Master X Ice',
    chipset: 'Intel Z890',
    price: 489.99,
    features: 'LGA1851, Gen5 M.2 Thermal Armor, 10GbE LAN, Hi-Fi ESS DAC',
    badge: 'WHITE ICE'
  },
  {
    id: 'mobo-b650',
    name: 'TUF Gaming B650-Plus WiFi',
    chipset: 'AMD B650',
    price: 199.99,
    features: 'PCIe 5.0 M.2, 2.5GbE LAN, Military-Grade Chokes, Wi-Fi 6E',
    badge: 'VALUE HERO'
  }
];

export const RAM_OPTIONS = [
  {
    id: 'ram-64gb',
    name: '64GB (2x32GB) DDR5-6400 CL30',
    brand: 'Corsair Dominator Titanium RGB',
    price: 279.99,
    speed: '6400 MT/s CL30',
    badge: 'RECOMMENDED'
  },
  {
    id: 'ram-32gb',
    name: '32GB (2x16GB) DDR5-6000 CL30',
    brand: 'G.Skill Trident Z5 Neo RGB',
    price: 149.99,
    speed: '6000 MT/s Low Latency',
    badge: 'ESPORTS VALUE'
  },
  {
    id: 'ram-128gb',
    name: '128GB (4x32GB) DDR5-5600 Workstation',
    brand: 'Kingston Fury Beast Pro',
    price: 499.99,
    speed: '5600 MT/s High Capacity',
    badge: 'CREATOR / 3D'
  }
];

export const STORAGE_OPTIONS = [
  {
    id: 'ssd-4tb',
    name: '4TB Gen5 NVMe M.2 Extreme SSD',
    brand: 'Crucial T705 with Heatsink',
    price: 389.99,
    speed: '14,500 MB/s Sequential Read',
    badge: 'GEN 5 BEAST'
  },
  {
    id: 'ssd-2tb',
    name: '2TB Gen4 NVMe M.2 Fast SSD',
    brand: 'Samsung 990 PRO',
    price: 179.99,
    speed: '7,450 MB/s Read',
    badge: 'MOST POPULAR'
  },
  {
    id: 'ssd-8tb',
    name: '8TB Dual Gen4 NVMe RAID-0 Array',
    brand: 'Nexus High-Speed Array',
    price: 699.99,
    speed: '14,000 MB/s Combined Read',
    badge: 'ARCHIVE VAULT'
  }
];

export const PSU_OPTIONS = [
  {
    id: 'psu-1200w',
    name: '1200W Titanium ATX 3.1 Fully Modular',
    brand: 'Seasonic Prime TX-1200',
    wattage: 1200,
    price: 349.99,
    efficiency: '80+ Titanium',
    badge: 'OVERKILL PRO'
  },
  {
    id: 'psu-1000w',
    name: '1000W Platinum ATX 3.0 Modular',
    brand: 'Corsair RM1000x Shift',
    wattage: 1000,
    price: 219.99,
    efficiency: '80+ Platinum',
    badge: 'SWEET SPOT'
  },
  {
    id: 'psu-850w',
    name: '850W Gold ATX 3.0 Silent Hybrid',
    brand: 'be quiet! Dark Power 13',
    wattage: 850,
    price: 159.99,
    efficiency: '80+ Gold',
    badge: 'BUDGET CLEAN'
  }
];

export const BATTLESTATION_PERIPHERALS = {
  monitors: [
    {
      id: 'mon-specter49',
      name: 'Specter 49" QD-OLED 240Hz Curved',
      price: 1299.99,
      specs: '5120x1440, 0.03ms, 1800R, HDR True Black 400',
      badge: 'FLAGSHIP OLED'
    },
    {
      id: 'mon-dual27',
      name: 'Dual 27" Fast-IPS 360Hz Esports Bundle',
      price: 899.99,
      specs: '2x 2560x1440, 360Hz, Dual Arm Heavy-Duty Mount Included',
      badge: 'ESPORTS DUAL'
    },
    {
      id: 'mon-4k165',
      name: '32" 4K 165Hz Mini-LED HDR 1400',
      price: 749.99,
      specs: '3840x2160, 1152 Local Dimming Zones, Quantum Dot',
      badge: 'CINEMATIC 4K'
    },
    {
      id: 'mon-none',
      name: 'No Monitor (Rig Only)',
      price: 0,
      specs: 'Use existing displays',
      badge: 'STANDALONE'
    }
  ],
  desks: [
    {
      id: 'desk-motorized72',
      name: 'Cyber-Desk Pro 72" Dual-Motor Standing Desk',
      price: 649.99,
      specs: 'Carbon fiber texture, anti-collision, under-desk cable raceway, 4 memory presets',
      badge: 'PRO ERGO'
    },
    {
      id: 'desk-cornerL',
      name: 'Obsidian L-Corner Battlestation Desk 60x60',
      price: 499.99,
      specs: 'Reinforced steel frame, headset hooks, dual monitor riser shelf',
      badge: 'CORNER MASTER'
    },
    {
      id: 'desk-none',
      name: 'No Desk (Rig & Gear Only)',
      price: 0,
      specs: 'Use existing room furniture',
      badge: 'STANDALONE'
    }
  ],
  keyboards: [
    {
      id: 'kb-hall65',
      name: 'CyberHaptic 65% Hall-Effect Magnetic Keyboard',
      price: 199.99,
      specs: '0.1mm Rapid Trigger, CNC Aluminum, 8000Hz Polling',
      badge: 'MAGNETIC TRIGGER'
    },
    {
      id: 'kb-gasket75',
      name: 'Vanguard 75% Custom Brass Gasket Keyboard',
      price: 179.99,
      specs: 'Lubed Linear Switches, South-Facing RGB, Hot-Swap PCB',
      badge: 'CUSTOM THOCK'
    },
    {
      id: 'kb-none',
      name: 'No Keyboard',
      price: 0,
      specs: 'Use existing keyboard',
      badge: 'SKIP'
    }
  ],
  mice: [
    {
      id: 'mouse-phantom36',
      name: 'Phantom Ultra 36g Wireless Carbon Fiber Mouse',
      price: 159.99,
      specs: '32,000 DPI Sensor, 4K Dongle, Zero-Smoothing, Pure Virgin PTFE',
      badge: '36G ULTRALIGHT'
    },
    {
      id: 'mouse-tactical8k',
      name: 'Specter 8000Hz Optical Esports Mouse',
      price: 89.99,
      specs: '8000Hz True Polling, Optical Switches (Zero Debounce), 58g',
      badge: '8K POLLING'
    },
    {
      id: 'mouse-none',
      name: 'No Mouse',
      price: 0,
      specs: 'Use existing mouse',
      badge: 'SKIP'
    }
  ],
  audio: [
    {
      id: 'audio-planar',
      name: 'Aether Pro Planar Magnetic Headset',
      price: 299.99,
      specs: '90mm Planar drivers, 2.4GHz Lossless + BT 5.3, Broadcast Mic',
      badge: 'AUDIOPHILE'
    },
    {
      id: 'audio-speakers',
      name: 'CryoBlast Desktop Nearfield Studio Monitors (Pair)',
      price: 229.99,
      specs: 'Carbon fiber woofers, silk dome tweeters, dedicated sub-out',
      badge: 'DESK MONITORS'
    },
    {
      id: 'audio-none',
      name: 'No Audio Gear',
      price: 0,
      specs: 'Use existing audio',
      badge: 'SKIP'
    }
  ],
  ambience: [
    {
      id: 'amb-nanolex',
      name: 'Nanolex Smart Hexagon RGB Wall Panels (9-Pack)',
      price: 149.99,
      specs: 'Audio reactive, Razer Chroma / Screen Sync, 16.8M colors',
      badge: 'WALL AURA'
    },
    {
      id: 'amb-screenbar',
      name: 'Dual CyberScreen Lightbar with Rear Bias Glow',
      price: 89.99,
      specs: 'Zero screen glare, auto-dimming sensor, wireless dial controller',
      badge: 'EYE SHIELD'
    },
    {
      id: 'amb-none',
      name: 'No Ambient Lighting',
      price: 0,
      specs: 'Standard room illumination',
      badge: 'STEALTH'
    }
  ]
};

export const ASSEMBLY_OPTIONS = [
  {
    id: 'prebuilt',
    name: 'Apex White-Glove Pre-Built & 24hr Burn-In',
    price: 99.00,
    duration: '2-3 Business Days',
    description: 'Expert hand-assembly, stealth dual-chamber cable management, BIOS flashing, Windows 11 Pro optimization, and 24-hour FurMark/Prime95 thermal stress testing. Covered by 3-Year Zero-Hassle Warranty.',
    badge: 'TURNKEY READY'
  },
  {
    id: 'diy',
    name: 'DIY Master Cargo Box (All Components Separate)',
    price: 0.00,
    duration: 'Ships Next Day',
    description: 'All individual manufacturer boxes securely freight-crated together. Includes an IGNIS tactical magnetic screwdriver kit, thermal paste syringe, and anti-static wristband.',
    badge: 'BUILD IT YOURSELF'
  }
];
