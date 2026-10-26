# IGNIS // Next-Gen Cyberpunk Gaming Marketplace

A gaming marketplace demo built with **React**, **Tailwind CSS**, and modern web standards. Features a sleek black and red aesthetic, cinematic artwork, subtle neon glow effects, and functional frontend interactivity.

![Theme](https://img.shields.io/badge/Theme-Black%20%26%20Crimson%20Red-ff1a35)
![Platform](https://img.shields.io/badge/Platform-React%20%7C%20Vite%20%7C%20Tailwind-red)
![Type](https://img.shields.io/badge/Mode-Frontend%20Demo%20Only-black)

---

## ⚡ Quick Start

```bash
# Install dependencies (if not already installed)
npm install

# Start the local development server
npm run dev

# Or build for production
npm run build
npm run preview
```

Open `http://localhost:3000` (or the URL Vite provides) in your browser.

---

## 🎮 Key Features & Highlights

### 1. Black & Red Cyberpunk Aesthetic
- **Visuals**: Deep obsidian/carbon matte dark backgrounds (`#070709`, `#0d0e14`), neon crimson red accents (`#ff1a35`), subtle red ambient glow shaders, and custom scrollbars.
- **Typography**: Paired with *Rajdhani*, *Chakra Petch*, and *Inter* for futuristic HUD/terminal styling.
- **Glassmorphism & Micro-animations**: Glowing card hover states, scanlines, and animated badge indicators.

### 2. Interactive Spotlight Hero Showcase
- Multi-slide carousel featuring flagship AAA fictional titles (*CYBERPULSE: Omega Protocol*, *SHADOWS OF VALHALLA*, *CRIMSON VENGEANCE*).
- Live countdown ticker for flash drops.
- Interactive slide thumbnail strip and direct action controls (Buy Instant Key, Inspect Dossier, Wishlist).

### 3. Tactical Catalog, Live Search & Multi-Filters
- **Search**: Instant search bar with `Ctrl + K` global hotkey and popular search tags.
- **Category Filter**: Filter between 10 genres (Action RPG, Tactical FPS, Hack & Slash, Dark Fantasy, Sci-Fi, Horror, Racing, Strategy, etc.).
- **Platform Selection**: PC, PS5, Xbox Series X, Nintendo Switch.
- **Dynamic Sorting**: Featured, Highest Rated, Price Low-High, Price High-Low, Biggest Discount, Release Date.
- **Price Range Slider**: Real-time slider limiting items up to \$70.
- **Sale Toggle**: Instant filter for discounted titles.

### 4. Detailed Game Page Dossiers (`GameDetailModal`)
- Full cinematic backdrop banner with interactive screenshot gallery and clickable thumbnail strip.
- **3 Tabbed Sections**:
  1. **Overview & Narrative**: Story briefing, studio information, release date, and key features checklist.
  2. **System Requirements**: Minimum vs Recommended specifications (OS, CPU, GPU, RAM, Storage).
  3. **Community Reviews & Interactive Form**: Read field reports and submit your own simulated operative review, dynamically updating the game's rating and review count.
- **Platform Selector**: Choose your destination platform before adding to cart.
- **Recommendations**: Synchronized similar game cards based on genre and tags.

### 5. Shopping Cache & Promo Voucher Engine (`CartDrawer`)
- Slide-over drawer with item quantities (+/-), removal, subtotal calculation, and instant delivery guarantee.
- **Interactive Promo Codes**:
  - `CYBER2026` — 20% Off storewide
  - `REDGLOW` — 15% Off Crimson Member discount
  - `IGNIS50` — 50% Off VIP Flash voucher
- Saved to `localStorage` for session persistence.

### 6. Operative Radar (`WishlistDrawer`)
- Slide-over drawer tracking desired titles.
- Quick "Move to Cache" and "Move All Items to Cart" actions.
- LocalStorage persistence.

### 7. Fake Quantum Checkout & CD-Key Generator (`CheckoutModal` & `OrderSuccessModal`)
- Multi-gateway simulator: **IGNIS Cyber Card** (with live 3D preview that reflects cardholder name and number in real-time), **Syndicate Credits**, **Crypto Lightning**, or **Steam Wallet**.
- "Auto-fill Demo Info" button for one-click testing.
- Cryptographic handshake simulation with progress loader.
- **Instant Digital Activation Keys**: Generates unique mock CD-Keys (`XXXX-YYYY-ZZZZ-WWWW`) with one-click "Copy" buttons.
- Celebratory confetti particle explosion upon order confirmation.
- Direct link to open purchased titles in your personal library.

### 8. User Profile & Gaming Statistics (`ProfileModal`)
- Operative Dossier: Editable Gamertag, level progress, XP bar (boosted with each purchase!), total playtime, and Syndicate Credit balance.
- **Digital Library**: View all acquired games with their activation keys and click **"LAUNCH"** to simulate starting the game, increasing your playtime statistics.
- **Combat Feats / Achievements**: Badges like *Cyber Vanguard*, *Bargain Slayer*, *Key Master*, and *Gladiator*.
- **Order History Archive**: Complete records of past simulated receipts.

### 9. Recently Viewed Games & Toast Notifications
- Automatically tracks previously inspected games and surfaces them in a dedicated grid.
- Neon crimson toast notification system with auto-dismissal and slide animations.

---

## 🔒 Demo Notice
This application is strictly a frontend portfolio showcase. It contains **no real backend, real payment processors, or actual monetary transactions**. All games, CD-keys, studios, and accounts are fictional simulations.
