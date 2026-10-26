import { GAME_ARTWORK } from './gameArtwork.js';

const RAW_GAMES_DATA = [
  {
    id: 'game-1',
    slug: 'cyberpulse-omega-protocol',
    title: 'CYBERPULSE: Omega Protocol',
    subtitle: 'High-octane cyberpunk action RPG in a neon-drenched megacity',
    studio: 'Synapse Interactive',
    publisher: 'Redline Studios',
    releaseDate: '2025-11-14',
    ageRating: '18+ Mature',
    price: 47.99,
    originalPrice: 69.99,
    discountPercent: 31,
    rating: 4.9,
    reviewCount: 42180,
    totalPlayers: '1.4M',
    category: 'Action RPG',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Cyberpunk', 'Ray Tracing', 'Singleplayer', 'Open World', 'DLSS 3.5', 'HDR'],
    badge: 'FEATURED',
    isHero: true,
    isTrending: true,
    isNewRelease: false,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Immerse yourself into Neo-Sarasota in the year 2084. As an exiled neural mercenary equipped with experimental military-grade cyberware, dismantle corrupt megacorporations and carve your legend across the blood-slicked rain alleys.',
    story: 'When the Omega AI protocol breaks containment inside the orbital Citadel, reality fractures. You hold the encryption key that all seven corporate syndicates are willing to burn the city to acquire. Choose your allegiances, augment your flesh, and decide the fate of digital consciousness.',
    features: [
      'Full Path Tracing & NVIDIA DLSS 3.5 Frame Generation',
      'Branching cybernetic augmentations tree with 120+ active abilities',
      'Seamless 35km² vertical open-world metropolis with flying transit',
      'Original dark synthwave & industrial metal soundtrack featuring 40 tracks',
      'Full DualSense™ haptic feedback and dynamic trigger resistance'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10/11 64-bit',
        cpu: 'Intel Core i5-10400 / AMD Ryzen 5 3600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce RTX 2060 6GB / AMD Radeon RX 5600 XT',
        storage: '85 GB SSD NVMe required'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-13700K / AMD Ryzen 7 7800X3D',
        ram: '32 GB DDR5 RAM',
        gpu: 'NVIDIA GeForce RTX 4080 16GB / AMD Radeon RX 7900 XTX',
        storage: '85 GB SSD Gen 4 NVMe'
      }
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'K4ge_Runner',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '2 days ago',
        comment: 'Visually the most stunning game ever created. The gunplay feels punchy, and hacking enemy implants mid-combat never gets old. A masterpiece in modern cyberpunk.',
        helpful: 342
      },
      {
        id: 'rev-2',
        author: 'Valkyrie99',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '1 week ago',
        comment: 'The lighting with ray tracing active looks unreal on OLED. Story has genuine emotional weight and moral ambiguity.',
        helpful: 198
      }
    ]
  },
  {
    id: 'game-2',
    slug: 'shadows-of-valhalla-bloodline',
    title: 'SHADOWS OF VALHALLA: Bloodline',
    subtitle: 'Brutal dark fantasy souls-like set in frozen Norse purgatory',
    studio: 'Nordic Raven Works',
    publisher: 'Ironclad Games',
    releaseDate: '2026-02-18',
    ageRating: '18+ Mature',
    price: 59.99,
    originalPrice: 69.99,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 28940,
    totalPlayers: '950K',
    category: 'Dark Fantasy',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Souls-like', 'Dark Fantasy', 'Challenging', 'Singleplayer', 'Co-op', 'Atmospheric'],
    badge: 'HOT SALE',
    isHero: true,
    isTrending: true,
    isNewRelease: true,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Rise from the frozen ash as an undying berserker condemned to cleave through the fallen gods of Yggdrasil. Master bone-crushing parries, runic blood sorcery, and face titans of ancient myth.',
    story: 'Ragnarök came and went, yet the cosmos refused to die. Bound by cursed valknut runes, your soul cannot enter Valhalla until every defiled divine monarch has been slaughtered and offered to the Great Ash Tree.',
    features: [
      'Unforgiving precision combat with directional stamina and visceral executions',
      'Over 60 mythical bosses inspired by authentic poetic Eddas',
      'Dynamic weather system with blinding blizzards altering arena geometry',
      'Optional seamless 3-player co-op or hostile invader PvP'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
        ram: '12 GB RAM',
        gpu: 'NVIDIA GTX 1070 8GB / AMD Radeon RX 590',
        storage: '70 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-12700 / AMD Ryzen 7 5800X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 3070 Ti / AMD RX 6800 XT',
        storage: '70 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Bloodaxe_Thor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '3 days ago',
        comment: 'Died 47 times to the Frost Warden boss and I loved every second of it. The sound design of parrying a 40-foot axe is exhilarating.',
        helpful: 512
      }
    ]
  },
  {
    id: 'game-3',
    slug: 'crimson-vengeance-retribution',
    title: 'CRIMSON VENGEANCE: Retribution',
    subtitle: 'Ultra-fast stylish hack & slash with demonic weapon transformations',
    studio: 'Scarlet Blade Entertainment',
    publisher: 'Kurogane Interactive',
    releaseDate: '2026-01-10',
    ageRating: '18+ Mature',
    price: 34.99,
    originalPrice: 59.99,
    discountPercent: 42,
    rating: 4.9,
    reviewCount: 31200,
    totalPlayers: '820K',
    category: 'Action',
    platforms: ['PC', 'PS5', 'Xbox Series X', 'Nintendo Switch'],
    tags: ['Hack and Slash', 'Fast-Paced', 'Singleplayer', 'Stylized', 'Soundtrack'],
    badge: 'SPECIAL DEAL',
    isHero: true,
    isTrending: true,
    isNewRelease: false,
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Channel demonic bloodlust as Dante Vance, the last Crimson Knight. Chain 100-hit aerial combos, switch between scythe, twin odachi, and railguns in millisecond intervals.',
    story: 'Betrayed by the High Inquisitor and cast into the Nether Rift, Dante reconstitutes his physical form out of pure spite and brimstone. Tear through the seven sanctums of celestial traitors.',
    features: [
      'Ultra responsive 120 FPS combat engine with sub-frame cancel windows',
      'Dynamic style gauge ranking from D to SSS with adaptive battle tracks',
      'Bloodmorph arsenal allowing 14 different weapon fusion combinations',
      'Bloody Palace survival mode with 101 escalating monster floors'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 1060 6GB / AMD Radeon RX 580',
        storage: '45 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-10700 / AMD Ryzen 7 3700X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 3060 12GB / AMD RX 6700 XT',
        storage: '45 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'DevilMayCryFan',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '5 days ago',
        comment: 'If you miss the golden age of character action games, this is the holy grail. The aerial juggle mechanics are flawless.',
        helpful: 244
      }
    ]
  },
  {
    id: 'game-4',
    slug: 'stellar-horizon-2189',
    title: 'STELLAR HORIZON 2189',
    subtitle: 'Massive open-galaxy space exploration, fleet battles and trade empire',
    studio: 'Aetherion Orbit Studios',
    publisher: 'Deep Cosmos Publishing',
    releaseDate: '2025-09-22',
    ageRating: '12+ Teen',
    price: 49.99,
    originalPrice: 49.99,
    discountPercent: 0,
    rating: 4.7,
    reviewCount: 19400,
    totalPlayers: '610K',
    category: 'Sci-Fi Simulator',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Sci-Fi', 'Space', 'Open World', 'Multiplayer', 'Economy', 'Simulation'],
    badge: 'BESTSELLER',
    isHero: false,
    isTrending: true,
    isNewRelease: false,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Pilot customizable capital cruisers, discover uncharted star systems with seamless atmospheric planetary landings, and build interstellar mining conglomerates.',
    story: 'Humanity has breached the Sagittarius arm, discovering ancient Dyson swarms left dormant by a forgotten civilization. Join corporate armada wars or strike out as a solitary deep-space prospector.',
    features: [
      'Over 400 procedural star systems with 1:1 astronomical scale',
      'Modular ship construction with 300+ structural modules and weapon hardpoints',
      'Player-driven stock market and live resource economy across galaxies'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-9600K / AMD Ryzen 5 3600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 2070 / AMD Radeon RX 5700 XT',
        storage: '90 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-13700 / AMD Ryzen 7 7700X',
        ram: '32 GB RAM',
        gpu: 'NVIDIA RTX 4070 Ti / AMD RX 7800 XT',
        storage: '90 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Cmdr_Nova',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Landing seamlessly from deep space into a storm-ravaged gas giant without a single loading screen blew my mind.',
        helpful: 188
      }
    ]
  },
  {
    id: 'game-5',
    slug: 'neon-apex-zero-hour',
    title: 'NEON APEX: Zero Hour',
    subtitle: 'Competitive tactical 5v5 FPS with vertical cyber-movement',
    studio: 'Vortex Protocol',
    publisher: 'Apex Esports Global',
    releaseDate: '2026-03-01',
    ageRating: '16+',
    price: 29.99,
    originalPrice: 39.99,
    discountPercent: 25,
    rating: 4.6,
    reviewCount: 64200,
    totalPlayers: '2.8M',
    category: 'FPS',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['FPS', 'Tactical', 'Competitive', 'Multiplayer', 'Esports', 'Shooter'],
    badge: 'NEW RELEASE',
    isHero: false,
    isTrending: true,
    isNewRelease: true,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Precision gunplay meets lightning-speed wall-running, magnetic grapples, and tactical electronic warfare. Compete on 128-tick rate dedicated servers.',
    story: 'Elite operatives contract for underworld brokers in high-stakes hostage retrieval and data extraction missions across Singapore, Tokyo, and New Berlin.',
    features: [
      'Sub-tick bullet hit registration and server authoritative anti-cheat',
      '18 unique operators with specialized tactical gadgets and ultimate abilities',
      'Ranked competitive leagues with real-time global leaderboard integration'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i3-10100 / AMD Ryzen 3 3100',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 1050 Ti 4GB',
        storage: '40 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i5-13600K / AMD Ryzen 7 5700X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 3060 / AMD RX 6600 XT',
        storage: '40 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'ShroudLike_Aim',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: 'Yesterday',
        comment: 'Movement is silky smooth. The wall-run into sniper noscope is pure dopamine.',
        helpful: 129
      }
    ]
  },
  {
    id: 'game-6',
    slug: 'chrono-drift-tokyo-underground',
    title: 'CHRONO DRIFT: Tokyo Underground',
    subtitle: 'Hyper-neon underground street racing with time-dilation mechanics',
    studio: 'Midnight Nitro Team',
    publisher: 'Velocity Global',
    releaseDate: '2025-10-05',
    ageRating: '12+',
    price: 39.99,
    originalPrice: 49.99,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 15300,
    totalPlayers: '540K',
    category: 'Racing',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Racing', 'Drift', 'Customization', 'Multiplayer', 'Synthwave', 'Arcade'],
    badge: 'POPULAR',
    isHero: false,
    isTrending: false,
    isNewRelease: false,
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Tear through rain-slicked Shinjuku expressways at 340 km/h. Trigger nitro-overcharge and micro time-warps to slip through impossible gaps in traffic.',
    story: 'Join the illicit Chrono Syndicate racing circuit where victory buys immunity and modified sports cars are treated like hyper-weapons.',
    features: [
      'Deep mechanical and visual tuning with 80+ licensed Japanese and European chassis',
      'Dynamic wet asphalt physics with real-time puddle hydroplaning simulation',
      'Eurobeat and phonk radio stations with 65+ energetic tracks'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-7400 / AMD Ryzen 3 1300X',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 1060 6GB',
        storage: '55 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-11700 / AMD Ryzen 5 5600X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 3070 / AMD RX 6750 XT',
        storage: '55 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-7',
        author: 'DriftKing_Kenji',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Best arcade racer since Need For Speed Underground 2. The neon reflections on the cars look magnificent.',
        helpful: 278
      }
    ]
  },
  {
    id: 'game-7',
    slug: 'voidborne-abyssal-echoes',
    title: 'VOIDBORNE: Abyssal Echoes',
    subtitle: 'Atmospheric cosmic horror survival set in an abandoned deep-sea research station',
    studio: 'Black Trench Studios',
    publisher: 'Eldritch Interactive',
    releaseDate: '2025-12-04',
    ageRating: '18+ Mature',
    price: 24.99,
    originalPrice: 39.99,
    discountPercent: 37,
    rating: 4.7,
    reviewCount: 11400,
    totalPlayers: '420K',
    category: 'Horror',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Horror', 'Survival Horror', 'Psychological', 'Atmospheric', 'Sci-Fi'],
    badge: 'SALE -37%',
    isHero: false,
    isTrending: false,
    isNewRelease: false,
    coverImage: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Nine thousand meters below the surface in the Mariana Abyss, silence is your only weapon. Conserve oxygen, patch breach points, and evade predatory eldritch organisms drawn to sound.',
    story: 'Sent to investigate distress signal Theta-7 from Station Tartarus, engineer Elena Ross uncovers experiments testing cosmic artifacts recovered from tectonic fissures.',
    features: [
      '3D Binaural spatial audio mechanics where real mic input can reveal your location',
      'Dynamic water flooding physics altering room layouts in real-time',
      'Sanity degradation system warping hallucinations and navigational displays'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-6500 / AMD Ryzen 3 1200',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 1060 3GB / AMD RX 570',
        storage: '35 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-9700 / AMD Ryzen 5 3600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 2060 Super / AMD RX 5700',
        storage: '35 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-8',
        author: 'DeepFear91',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '1 month ago',
        comment: 'Terrifying audio design. I had to take off my headphones three times because the underwater creaks sounded too real.',
        helpful: 167
      }
    ]
  },
  {
    id: 'game-8',
    slug: 'tactical-ops-ghost-frontier',
    title: 'TACTICAL OPS: Ghost Frontier',
    subtitle: 'Hardcore military squad simulator in vast contested warzones',
    studio: 'Iron Sights Simulation',
    publisher: 'Frontline Media',
    releaseDate: '2026-01-28',
    ageRating: '18+ Mature',
    price: 44.99,
    originalPrice: 44.99,
    discountPercent: 0,
    rating: 4.8,
    reviewCount: 22100,
    totalPlayers: '730K',
    category: 'FPS',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Tactical', 'Mil-Sim', 'Multiplayer', 'Co-op', 'Realistic', 'Shooter'],
    badge: 'TOP RATED',
    isHero: false,
    isTrending: true,
    isNewRelease: true,
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Authentic military combat simulation with realistic terminal ballistics, radio relay frequency channels, and zero HUD markers. Coordinate fireteams to capture hostile sectors.',
    story: 'Set during a near-future Eastern European theater crisis. Operatives deploy behind adversary radar umbrellas to disrupt supply lines and eliminate commanders.',
    features: [
      'Realistic wind drift, bullet drop, and armor ricochet physics',
      'Squad radio system with voice distance attenuation and jamming effects',
      '100-player combined arms battles with combat drones, tanks, and transport helos'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-10400F / AMD Ryzen 5 3600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 2060 6GB / AMD RX 5600 XT',
        storage: '80 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-12700K / AMD Ryzen 7 5800X3D',
        ram: '32 GB RAM',
        gpu: 'NVIDIA RTX 3080 10GB / AMD RX 6800 XT',
        storage: '80 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-9',
        author: 'Sgt_Bravo',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '4 days ago',
        comment: 'Finally a tactical shooter that respects communication and positioning instead of slide-cancelling twitch reactions.',
        helpful: 310
      }
    ]
  },
  {
    id: 'game-9',
    slug: 'mythos-reign-of-asgard',
    title: 'MYTHOS: Reign of Asgard',
    subtitle: 'Epic open-world action RPG across the nine realms of Norse legend',
    studio: 'Valhalla Forge',
    publisher: 'Titanworks Entertainment',
    releaseDate: '2025-11-20',
    ageRating: '16+',
    price: 38.99,
    originalPrice: 64.99,
    discountPercent: 40,
    rating: 4.8,
    reviewCount: 38500,
    totalPlayers: '1.2M',
    category: 'Action RPG',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Open World', 'RPG', 'Norse', 'Action', 'Singleplayer', 'Story Rich'],
    badge: '40% OFF',
    isHero: false,
    isTrending: false,
    isNewRelease: false,
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Wield the thunderous storm-hammer Mjolnir and soar through realm gates to defend Asgard from the frost giants of Jotunheim. High-speed cinematic combat and mythic gear craft.',
    story: 'Odin has fallen into deep hibernation. Loki has unleashed the ancient beasts from the underworld. As the chosen Einherjar champion, you must unify the divided realm clans.',
    features: [
      'Nine vast realm maps with unique biomes, wildlife, and mythic dungeons',
      'Thunder kinetic combat system with boomerang weapon throws and lightning callouts',
      'Over 90 legendary armor sets forged from primordial dragon scales'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-8600 / AMD Ryzen 5 2600X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GTX 1660 Ti / AMD RX 5600 XT',
        storage: '95 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-12700 / AMD Ryzen 7 5800X',
        ram: '32 GB RAM',
        gpu: 'NVIDIA RTX 3070 8GB / AMD RX 6750 XT',
        storage: '95 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-10',
        author: 'ThorFanatic',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Throwing your hammer at a frost giant, watching it smash three enemies, then recalling it into your hand with full haptics is unmatched.',
        helpful: 219
      }
    ]
  },
  {
    id: 'game-10',
    slug: 'biohazard-extinction-wave',
    title: 'BIOHAZARD: Extinction Wave',
    subtitle: 'Cooperative 4-player horde shooter in infected bioweapons research arcologies',
    studio: 'Outbreak Interactive',
    publisher: 'Mutagen Games',
    releaseDate: '2026-02-05',
    ageRating: '18+ Mature',
    price: 31.99,
    originalPrice: 49.99,
    discountPercent: 36,
    rating: 4.7,
    reviewCount: 16700,
    totalPlayers: '680K',
    category: 'Horror',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Zombies', 'Co-op', 'Horror', 'Multiplayer', 'Survival', 'Gore'],
    badge: '36% OFF',
    isHero: false,
    isTrending: false,
    isNewRelease: true,
    coverImage: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Team up with up to 3 friends to quarantine catastrophic biological mutations. Deploy sentry guns, cryo-traps, and incinerators against swarms numbering in the thousands.',
    story: 'When Sublevel 14 of the Prometheus Gene Lab suffers structural collapse, the bio-engineered Chimera Strain escapes, adapting and mutating in real-time.',
    features: [
      'Procedural horde director adjusting spawn aggression to team stress levels',
      'Fully dismemberable dynamic anatomy engine with realistic physics',
      'Customizable weapon loadouts with exotic elemental ammo mods'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-9400 / AMD Ryzen 5 2600',
        ram: '12 GB RAM',
        gpu: 'NVIDIA GTX 1660 Super / AMD RX 580',
        storage: '60 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-11700 / AMD Ryzen 7 5700X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 3060 Ti / AMD RX 6700 XT',
        storage: '60 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-11',
        author: 'ZombieHunterX',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '1 week ago',
        comment: 'Intense fun with friends on Discord. The flamethrower effects look incredible in dark hallways.',
        helpful: 145
      }
    ]
  },
  {
    id: 'game-11',
    slug: 'iron-dreadnought-warhammer-3000',
    title: 'IRON DREADNOUGHT: Void Fleet',
    subtitle: 'Deep turn-based tactical fleet strategy and galactic conquest',
    studio: 'Aegis Grand Strategy',
    publisher: 'Command Sector',
    releaseDate: '2025-08-15',
    ageRating: '12+',
    price: 34.99,
    originalPrice: 49.99,
    discountPercent: 30,
    rating: 4.6,
    reviewCount: 9800,
    totalPlayers: '310K',
    category: 'Strategy',
    platforms: ['PC'],
    tags: ['Strategy', 'Turn-Based', 'Sci-Fi', 'Tactical', 'Singleplayer'],
    badge: 'STRATEGY PICK',
    isHero: false,
    isTrending: false,
    isNewRelease: false,
    coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Command massive kilometers-long dreadnoughts in high-stakes 3D tactical naval warfare. Balance shield vectors, manage hull integrity, and deploy starfighter wings.',
    story: 'As Fleet Admiral of the Solar Hegemony, defend humanity’s homeworlds against an ancient biomechanical swarm sweeping across the Perseus Arm.',
    features: [
      'True 3D tactical grid battlefields with asteroid field terrain cover',
      'Deep crew management and subsystem targeting (engines, bridge, hangar bays)',
      'Rich grand campaign with diplomatic pacts and tech tree research'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-6400 / AMD Ryzen 3 1200',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 1050 4GB',
        storage: '30 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-10700 / AMD Ryzen 5 5600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 2060 / AMD RX 5600',
        storage: '30 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-12',
        author: 'Admiral_Stark',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '1 month ago',
        comment: 'For tabletop wargaming fans, this is pure perfection. Firing the central spinal railgun through three enemy cruisers feels amazing.',
        helpful: 92
      }
    ]
  },
  {
    id: 'game-12',
    slug: 'neo-tokyo-blade-runners-requiem',
    title: 'NEO TOKYO: Synthetic Soul',
    subtitle: 'Detective noir cyberpunk thriller with deep branching dialogue and mind hacking',
    studio: 'Black Lotus Narrative',
    publisher: 'Cipher Media',
    releaseDate: '2026-03-12',
    ageRating: '18+ Mature',
    price: 36.99,
    originalPrice: 44.99,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 14800,
    totalPlayers: '490K',
    category: 'Cyberpunk Adventure',
    platforms: ['PC', 'PS5', 'Xbox Series X', 'Nintendo Switch'],
    tags: ['Cyberpunk', 'Story Rich', 'Detective', 'Choices Matter', 'Atmospheric', 'Sci-Fi'],
    badge: 'NEW RELEASE',
    isHero: false,
    isTrending: false,
    isNewRelease: true,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    heroBanner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Solve impossible synthetic murders in a city where memories can be rewritten, sold, and deleted. Jack into suspects’ cyberbrains to reconstruct memory crime scenes.',
    story: 'A prominent android rights councilwoman is discovered dead in an airtight sky-penthouse with her cortical memory core vaporized. You are the private investigator called to uncover the conspiracy.',
    features: [
      'Full voice acting featuring award-winning ensemble cast',
      'Memory reconstruction mini-games where you scrub through chronological timelines',
      '14 radically divergent endings influenced by subtle investigative decisions'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-7400 / AMD Ryzen 3 1300X',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 1060 6GB',
        storage: '40 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-10700 / AMD Ryzen 7 3700X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 3060 12GB',
        storage: '40 GB SSD'
      }
    },
    reviews: [
      {
        id: 'rev-13',
        author: 'CyberSleuth',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: 'Just now',
        comment: 'The writing is brilliant. You genuinely have to deduce contradictions yourself instead of following yellow quest markers.',
        helpful: 88
      }
    ]
  },
  {
    id: 'game-13',
    slug: 'elden-blaze-ashes-of-eternity',
    title: 'ELDEN BLAZE: Ashes of Eternity',
    subtitle: 'Brutal dark fantasy open-world action RPG with colossal demigod encounters',
    studio: 'FromAsh Software',
    publisher: 'Eternity Interactive',
    releaseDate: '2026-02-18',
    ageRating: '18+ Mature',
    price: 59.99,
    originalPrice: 69.99,
    discountPercent: 14,
    rating: 4.98,
    reviewCount: 94100,
    totalPlayers: '3.8M',
    category: 'Dark Fantasy',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Souls-like', 'Dark Fantasy', 'Open World', 'Masterpiece', 'Difficult'],
    badge: 'COMMUNITY #1',
    isHero: false,
    isTrending: true,
    isNewRelease: true,
    description: 'Traverse the fractured Lands of Cinders. Master weapon arts, wield forbidden sorceries, and challenge the fallen Primordial Titans.',
    features: ['Over 150 unique boss encounters', 'Dynamic day/night boss aggression cycle', 'Seamless multiplayer cooperative summon rings']
  },
  {
    id: 'game-14',
    slug: 'helios-prime-orbital-strike',
    title: 'HELIOS PRIME: Orbital Strike',
    subtitle: 'High-octane four-player cooperative squad shooter across hostile alien battlefronts',
    studio: 'Helios Defense Labs',
    publisher: 'Galactic Vanguard',
    releaseDate: '2026-01-20',
    ageRating: '16+',
    price: 39.99,
    originalPrice: 49.99,
    discountPercent: 20,
    rating: 4.92,
    reviewCount: 68500,
    totalPlayers: '2.1M',
    category: 'FPS',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Co-op', 'Shooter', 'Sci-Fi', 'PvE', 'Action'],
    badge: 'BEST CO-OP',
    isHero: false,
    isTrending: true,
    isNewRelease: false,
    description: 'Deploy from low orbit onto procedurally contested planets. Call down 500KG strike ordnance, laser turrets, and automated mechs.',
    features: ['Real-time strategic galactic liberation war map', 'Friendly-fire tactical physics and precision ballistics', 'Customizable heavy armor and heavy support weapons']
  },
  {
    id: 'game-15',
    slug: 'black-sea-pirate-corsairs-of-gold',
    title: 'BLACK SEA PIRATE: Corsairs of Gold',
    subtitle: 'Open-sea nautical multiplayer pirate simulator with deep naval cannon warfare',
    studio: 'Kraken Cove Studios',
    publisher: 'Corsair Games',
    releaseDate: '2025-08-14',
    ageRating: '12+',
    price: 34.99,
    originalPrice: 49.99,
    discountPercent: 30,
    rating: 4.86,
    reviewCount: 38200,
    totalPlayers: '1.2M',
    category: 'Action RPG',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Pirates', 'Open World', 'Naval Combat', 'Multiplayer', 'Adventure'],
    badge: 'SALE -30%',
    isHero: false,
    isTrending: false,
    isNewRelease: false,
    description: 'Captain fully crewed galleons across cursed archipelagos. Plunder sunken galleons, battle mythological leviathans, and bury mythical treasure.',
    features: ['Realistic dynamic ocean swell and wind aerodynamics', 'Multi-deck cannon warfare with boarding grapple physics', 'Extensive ship customisation and crew flag heraldry']
  },
  {
    id: 'game-16',
    slug: 'apex-survival-primordial-earth',
    title: 'APEX SURVIVAL: Primordial Earth',
    subtitle: 'Next-gen multiplayer primal sandbox survival with rideable apex predators',
    studio: 'Primordial Tech',
    publisher: 'Wild Frontier',
    releaseDate: '2025-11-28',
    ageRating: '16+',
    price: 44.99,
    originalPrice: 59.99,
    discountPercent: 25,
    rating: 4.81,
    reviewCount: 41200,
    totalPlayers: '950K',
    category: 'Horror',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Survival', 'Dinosaurs', 'Base Building', 'Crafting', 'Multiplayer'],
    badge: 'SURVIVAL HIT',
    isHero: false,
    isTrending: false,
    isNewRelease: false,
    description: 'Awaken stranded on a hyper-realistic primordial island. Tame, breed, and harness 80+ prehistoric dinosaurs while constructing fortress compounds.',
    features: ['Unreal Engine 5 Nanite terrain and Lumen global illumination', 'Genetic breeding trees yielding mutant color mutations and stats', 'Full dedicated server and tribe warfare support']
  },
  {
    id: 'game-17',
    slug: 'phantom-blade-zero-dynasty',
    title: 'PHANTOM BLADE: Zero Dynasty',
    subtitle: 'Mythic martial arts kung-fu action RPG featuring cinematic lightning combat',
    studio: 'S-Game Studios',
    publisher: 'Eastern Phoenix',
    releaseDate: '2026-03-01',
    ageRating: '18+ Mature',
    price: 54.99,
    originalPrice: 69.99,
    discountPercent: 21,
    rating: 4.96,
    reviewCount: 82400,
    totalPlayers: '3.1M',
    category: 'Action',
    platforms: ['PC', 'PS5'],
    tags: ['Martial Arts', 'Action', 'Mythology', 'Fast-Paced', 'Souls-like'],
    badge: 'TOP RATED',
    isHero: false,
    isTrending: true,
    isNewRelease: true,
    description: 'Wield the fluid combat arts of the Phantom Order. Counter lethal slashes with split-second parries, wire-fu evasions, and legendary chi bursts.',
    features: ['Handcrafted 60FPS motion-captured martial arts choreography', 'Over 30 traditional and steam-powered Chinese polearms and blades', 'Branching faction alliances and stealth assassinations']
  },
  {
    id: 'game-18',
    slug: 'hyper-speed-rush-formula-gp',
    title: 'HYPER-SPEED RUSH: Formula GP',
    subtitle: 'The pinnacle of physics-driven formula single-seater motorsport simulation',
    studio: 'Velocity Dynamics',
    publisher: 'Motorsport Pro',
    releaseDate: '2025-07-22',
    ageRating: '3+ Everyone',
    price: 49.99,
    originalPrice: 69.99,
    discountPercent: 28,
    rating: 4.89,
    reviewCount: 29800,
    totalPlayers: '820K',
    category: 'Racing',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    tags: ['Racing', 'Simulation', 'Motorsport', 'Competitive', 'VR Support'],
    badge: 'SIM GOLD',
    isHero: false,
    isTrending: false,
    isNewRelease: false,
    description: 'Experience 5G lateral cornering in full 2026 specification formula racers. Laser-scanned FIA circuits, dynamic tire compound wear, and changing weather.',
    features: ['TrueForce telemetry force-feedback support for direct-drive wheels', 'Full VR headset head-tracking integration', 'Live multiplayer ranked safety rating license ladder']
  },
  {
    id: 'game-19',
    slug: 'forge-realm-medieval-kingdoms',
    title: 'FORGE & REALM: Medieval Kingdoms',
    subtitle: 'Deep organic medieval town builder with tactical real-time battlefield RTS combat',
    studio: 'Slavic Forge Games',
    publisher: 'Hooded Horse Global',
    releaseDate: '2025-09-12',
    ageRating: '12+',
    price: 29.99,
    originalPrice: 39.99,
    discountPercent: 25,
    rating: 4.94,
    reviewCount: 75200,
    totalPlayers: '2.4M',
    category: 'Strategy',
    platforms: ['PC'],
    tags: ['City Builder', 'Medieval', 'Strategy', 'RTS', 'Historical'],
    badge: 'INDIE PHENOM',
    isHero: false,
    isTrending: true,
    isNewRelease: false,
    description: 'Build realistic 14th-century hamlets and fortresses without grid constraints. Manage crop crop rotations, seasonal winters, and march your peasant militia.',
    features: ['Gridless organic road snapping and architectural burgage plots', 'Historical trade route supply chains with regional bartering', 'Tactical morale and stamina-based RTS squad skirmishes']
  },
  {
    id: 'game-20',
    slug: 'ghost-protocol-extraction-delta',
    title: 'GHOST PROTOCOL: Extraction Delta',
    subtitle: 'Ultra-hardcore military squad tactics and high-stakes extraction shooter',
    studio: 'Delta Tactical Ops',
    publisher: 'Vanguard Military',
    releaseDate: '2025-10-30',
    ageRating: '18+ Mature',
    price: 42.99,
    originalPrice: 59.99,
    discountPercent: 28,
    rating: 4.88,
    reviewCount: 51200,
    totalPlayers: '1.6M',
    category: 'FPS',
    platforms: ['PC'],
    tags: ['Tactical', 'FPS', 'Military', 'Hardcore', 'Extraction'],
    badge: 'HARDCORE',
    isHero: false,
    isTrending: false,
    isNewRelease: false,
    description: 'Enter the quarantined demilitarized border zone. Loot high-tier military hardware, execute coordinated breaching raids, and extract before orbital bombardment.',
    features: ['Realistic armor plate hitboxes and medical tourniquet mechanics', 'Modular weaponsmithing with 600+ genuine military attachments', 'High-stakes inventory loss with persistent stash bunker']
  }
];

export const GAMES_DATA = RAW_GAMES_DATA.map(game => {
  const art = GAME_ARTWORK[game.id];
  if (!art) return game;
  return {
    ...game,
    coverImage: art.cover,
    heroBanner: art.hero,
    screenshots: art.screenshots
  };
});

export const CATEGORIES = [
  { id: 'all', name: 'All Games', icon: 'Gamepad2', count: 12 },
  { id: 'Action RPG', name: 'Action RPG', icon: 'Flame', count: 3 },
  { id: 'FPS', name: 'Tactical FPS', icon: 'Crosshair', count: 2 },
  { id: 'Action', name: 'Hack & Slash', icon: 'Sword', count: 2 },
  { id: 'Dark Fantasy', name: 'Dark Fantasy', icon: 'Skull', count: 2 },
  { id: 'Sci-Fi Simulator', name: 'Sci-Fi Space', icon: 'Rocket', count: 2 },
  { id: 'Racing', name: 'Neon Racing', icon: 'Zap', count: 1 },
  { id: 'Horror', name: 'Survival Horror', icon: 'Eye', count: 2 },
  { id: 'Strategy', name: 'Grand Strategy', icon: 'Shield', count: 1 },
  { id: 'Cyberpunk Adventure', name: 'Cyberpunk Noir', icon: 'Cpu', count: 1 }
];

export const PLATFORMS = ['All Platforms', 'PC', 'PS5', 'Xbox Series X', 'Nintendo Switch'];

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured & Popular' },
  { id: 'rating-desc', label: 'Highest Rated' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'discount-desc', label: 'Biggest Discount' },
  { id: 'release-desc', label: 'Release Date' }
];

export const INITIAL_USER_PROFILE = {
  gamertag: 'Valkyrie_99',
  avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=180&auto=format&fit=crop',
  level: 42,
  xp: 14850,
  xpToNext: 18000,
  balance: 145.50,
  ignisCredits: 3500,
  totalOrders: 3,
  hoursPlayed: 342,
  achievements: [
    { id: 'ach-1', title: 'Cyber Vanguard', desc: 'Activated 5+ sci-fi titles on release day', icon: 'Shield', unlocked: true },
    { id: 'ach-2', title: 'Bargain Slayer', desc: 'Saved over $100 using flash discount coupons', icon: 'Flame', unlocked: true },
    { id: 'ach-3', title: 'Key Master', desc: 'Redeemed 10 digital activation keys instantly', icon: 'Key', unlocked: true },
    { id: 'ach-4', title: 'Gladiator of Valhalla', desc: 'Defeated three mythic bosses without dying', icon: 'Trophy', unlocked: true },
    { id: 'ach-5', title: 'Night City Legend', desc: 'Completed Cyberpulse Omega on Hardcore mode', icon: 'Sparkles', unlocked: false }
  ]
};

export const DEMO_PROMO_CODES = {
  'CYBER2026': { code: 'CYBER2026', discountPercent: 20, desc: '20% Off Storewide Cyberfest Promo' },
  'REDGLOW': { code: 'REDGLOW', discountPercent: 15, desc: '15% Off Crimson Member Discount' },
  'IGNIS50': { code: 'IGNIS50', discountPercent: 50, desc: '50% Mega VIP Flash Voucher' },
  'SYNDICATE10': { code: 'SYNDICATE10', discountPercent: 10, desc: '10% Off Daily Power Core Voucher' },
  'RECON15': { code: 'RECON15', discountPercent: 15, desc: '15% Off Radar Reconnaissance Coupon' },
  'INTEL20': { code: 'INTEL20', discountPercent: 20, desc: '20% Off Dossier Inspector Coupon' },
  'CRITIC25': { code: 'CRITIC25', discountPercent: 25, desc: '25% Off Operative Critic Voucher' },
  'HACKER30': { code: 'HACKER30', discountPercent: 30, desc: '30% Off Neural Decryption Coupon' },
  'OMEGA40': { code: 'OMEGA40', discountPercent: 40, desc: '40% Off Elite Master Bounty Coupon' },
  'NEON10': { code: 'NEON10', discountPercent: 10, desc: '10% Off Neon Crate Voucher' },
  'NEON15': { code: 'NEON15', discountPercent: 15, desc: '15% Off Neon Crate Rare Voucher' },
  'TACTICAL20': { code: 'TACTICAL20', discountPercent: 20, desc: '20% Off Spec-Ops Tactical Crate Voucher' },
  'CRATE25': { code: 'CRATE25', discountPercent: 25, desc: '25% Off Tactical Master Drop' },
  'SYNDICATE30': { code: 'SYNDICATE30', discountPercent: 30, desc: '30% Off Syndicate Black-Market Drop' },
  'CRIMSON35': { code: 'CRIMSON35', discountPercent: 35, desc: '35% Off Syndicate Elite Pass' },
  'GODTIER50': { code: 'GODTIER50', discountPercent: 50, desc: '50% Off God-Tier Omnicrate Jackpot!' }
};

export const BOUNTY_TASKS = [
  {
    id: 'task-checkin',
    title: 'Daily Core Calibration',
    description: 'Calibrate the IGNIS reactor core to stabilize today’s dispatch frequency.',
    rewardCode: 'SYNDICATE10',
    discountPercent: 10,
    xpReward: 150,
    target: 1,
    type: 'checkin'
  },
  {
    id: 'task-wishlist',
    title: 'Radar Reconnaissance',
    description: 'Lock at least 3 games onto your Operative Wishlist radar.',
    rewardCode: 'RECON15',
    discountPercent: 15,
    xpReward: 250,
    target: 3,
    type: 'wishlist'
  },
  {
    id: 'task-inspect',
    title: 'Dossier Intelligence',
    description: 'Inspect 4 different game dossiers to analyze their combat specifications.',
    rewardCode: 'INTEL20',
    discountPercent: 20,
    xpReward: 300,
    target: 4,
    type: 'inspect'
  },
  {
    id: 'task-review',
    title: 'Field Operative Debrief',
    description: 'Broadcast 1 operative combat review on any game dossier page.',
    rewardCode: 'CRITIC25',
    discountPercent: 25,
    xpReward: 400,
    target: 1,
    type: 'review'
  },
  {
    id: 'task-hack',
    title: 'Neural Firewall Breach',
    description: 'Decrypt all 3 security nodes in the interactive terminal mini-task.',
    rewardCode: 'HACKER30',
    discountPercent: 30,
    xpReward: 500,
    target: 3,
    type: 'hack'
  },
  {
    id: 'task-master',
    title: 'Omega Syndicate Vanguard',
    description: 'Complete and claim any 3 operative bounties to unlock the master voucher.',
    rewardCode: 'OMEGA40',
    discountPercent: 40,
    xpReward: 1000,
    target: 3,
    type: 'master'
  }
];
