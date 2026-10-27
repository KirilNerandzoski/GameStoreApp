import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { GAMES_DATA, INITIAL_USER_PROFILE, GUEST_USER_PROFILE, DEMO_PROMO_CODES } from '../data/games';
import { 
  DEPARTMENTS, 
  HARDWARE_PRODUCTS, 
  APPAREL_PRODUCTS, 
  COLLECTIBLES_PRODUCTS, 
  SERVICES_PRODUCTS, 
  FUEL_PRODUCTS,
  ALL_OMNI_PRODUCTS 
} from '../data/departmentsData.js';
import { supabase } from '../lib/supabaseClient';
import confetti from 'canvas-confetti';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Active Department / Sub-store: 'hub' (Global Universal Shell) | 'gaming' | 'hardware' | 'apparel' | 'collectibles' | 'services'
  const [activeDepartment, setActiveDepartment] = useState(() => {
    return localStorage.getItem('omni_active_department') || 'hub';
  });

  useEffect(() => {
    localStorage.setItem('omni_active_department', activeDepartment);
  }, [activeDepartment]);

  // Live Supabase Products state (with instant local seed fallback)
  const [allProducts, setAllProducts] = useState(ALL_OMNI_PRODUCTS);

  useEffect(() => {
    async function syncProductsFromSupabase() {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (!error && data && data.length > 0) {
          const mapped = data.map(row => ({
            id: row.id,
            department: row.department,
            departmentName: row.department_name,
            itemType: row.item_type,
            title: row.title,
            studio: row.studio,
            price: Number(row.price),
            originalPrice: Number(row.original_price),
            discountPercent: row.discount_percent,
            rating: Number(row.rating),
            reviewCount: row.review_count,
            category: row.category,
            platforms: row.platforms || [],
            coverImage: row.cover_image,
            heroBanner: row.hero_banner,
            tags: row.tags || [],
            features: row.features || [],
            description: row.description
          }));
          setAllProducts(mapped);
        }
      } catch (err) {
        console.warn('Supabase offline or network error, using local fallback:', err);
      }
    }
    syncProductsFromSupabase();
  }, []);

  // Supabase Auth Session listener
  useEffect(() => {
    // If URL contains an OAuth error or notice from redirect
    if (window.location.hash && (window.location.hash.includes('error=') || window.location.hash.includes('error_description='))) {
      try {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        const errDesc = hashParams.get('error_description') || hashParams.get('error');
        if (errDesc) {
          console.warn('OAuth provider notice:', decodeURIComponent(errDesc));
        }
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const user = session?.user || null;
      if (user) {
        if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('refresh_token'))) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        if (window.location.search && window.location.search.includes('code=')) {
          const cleanSearch = window.location.search.replace(/[?&]code=[^&]+/, '').replace(/^[?&]/, '');
          window.history.replaceState(null, '', window.location.pathname + (cleanSearch ? '?' + cleanSearch : ''));
        }
        setCurrentUser(user);
        setIsAuthModalOpen(false);
        localStorage.setItem('ignis_auth_user', JSON.stringify(user));
        setUserProfile(prev => ({
          ...prev,
          email: user.email,
          gamertag: user.user_metadata?.gamertag || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Operative',
          avatar: user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=180&auto=format&fit=crop',
          isGuest: false
        }));
      } else {
        const localUser = localStorage.getItem('ignis_auth_user');
        if (!localUser) {
          setCurrentUser(null);
          setUserProfile(GUEST_USER_PROFILE);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const user = session?.user || null;
      if (user) {
        if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('refresh_token'))) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        if (window.location.search && window.location.search.includes('code=')) {
          const cleanSearch = window.location.search.replace(/[?&]code=[^&]+/, '').replace(/^[?&]/, '');
          window.history.replaceState(null, '', window.location.pathname + (cleanSearch ? '?' + cleanSearch : ''));
        }
        setCurrentUser(user);
        setIsAuthModalOpen(false);
        localStorage.setItem('ignis_auth_user', JSON.stringify(user));
        setUserProfile(prev => ({
          ...prev,
          email: user.email,
          gamertag: user.user_metadata?.gamertag || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Operative',
          avatar: user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=180&auto=format&fit=crop',
          isGuest: false
        }));
      } else {
        const localUser = localStorage.getItem('ignis_auth_user');
        if (!localUser) {
          setCurrentUser(null);
          setUserProfile(GUEST_USER_PROFILE);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Games state (merges latest GAMES_DATA artwork/metadata with any saved demo reviews)
  const [games, setGames] = useState(() => {
    localStorage.removeItem('ignis_games');
    const saved = localStorage.getItem('ignis_games_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return GAMES_DATA.map(freshGame => {
          const found = parsed.find(g => g.id === freshGame.id);
          return found
            ? {
                ...freshGame,
                rating: found.rating ?? freshGame.rating,
                reviewCount: found.reviewCount ?? freshGame.reviewCount,
                reviews: found.reviews ?? freshGame.reviews
              }
            : freshGame;
        });
      } catch (e) {
        return GAMES_DATA;
      }
    }
    return GAMES_DATA;
  });

  // Cart - starts empty by default
  const [cart, setCart] = useState(() => {
    localStorage.removeItem('ignis_cart');
    const saved = localStorage.getItem('ignis_cart_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(item => {
          const fresh = ALL_OMNI_PRODUCTS.find(g => g.id === item.id) || GAMES_DATA.find(g => g.id === item.id);
          return fresh 
            ? { 
                ...item, 
                ...fresh, 
                coverImage: fresh.coverImage, 
                heroBanner: fresh.heroBanner, 
                quantity: item.quantity, 
                selectedPlatform: item.selectedPlatform 
              } 
            : item;
        });
      } catch (e) { return []; }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ignis_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [GAMES_DATA[1].id, GAMES_DATA[2].id];
  });

  // User Profile: Default to GUEST unless logged in or saved non-guest profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ignis_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && !parsed.isGuest && parsed.email) return parsed;
      } catch (e) { return GUEST_USER_PROFILE; }
    }
    return GUEST_USER_PROFILE;
  });

  // Purchased Game Library
  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem('ignis_library');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(item => {
          const fresh = ALL_OMNI_PRODUCTS.find(g => g.id === item.gameId) || GAMES_DATA.find(g => g.id === item.gameId);
          return fresh ? { ...item, coverImage: fresh.coverImage } : item;
        });
      } catch (e) { return []; }
    }
    // Initial starter library item
    return [
      {
        gameId: GAMES_DATA[4].id,
        gameTitle: GAMES_DATA[4].title,
        coverImage: GAMES_DATA[4].coverImage,
        platform: 'PC',
        purchaseDate: '2026-03-15',
        cdKey: 'NEON-8894-APEX-9192',
        playtimeHours: 28.4,
        lastPlayed: '2 days ago'
      }
    ];
  });

  // Order History
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ignis_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        orderId: 'IGNIS-792841',
        date: '2026-03-15 19:42',
        items: [{ title: GAMES_DATA[4].title, price: 29.99, platform: 'PC', cdKey: 'NEON-8894-APEX-9192' }],
        subtotal: 29.99,
        discount: 0,
        total: 29.99,
        paymentMethod: 'IGNIS Cyber Card (•••• 9942)'
      }
    ];
  });

  // Recently Viewed Games
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('ignis_recently_viewed');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [GAMES_DATA[0].id, GAMES_DATA[1].id, GAMES_DATA[3].id];
  });

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(70);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  // Modals & Drawers
  const [selectedGame, setSelectedGame] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isLootModalOpen, setIsLootModalOpen] = useState(false);
  const [activeCrateId, setActiveCrateId] = useState('crate-neon');
  const [isFormulaLabOpen, setIsFormulaLabOpen] = useState(false);
  const [isBattlestationOpen, setIsBattlestationOpen] = useState(false);

  // Loot Crate Unboxing History (with automatic healing for broken legacy URLs)
  const [lootHistory, setLootHistory] = useState(() => {
    const saved = localStorage.getItem('ignis_loot_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(item => {
          if (item.itemImage?.includes('photo-1579783902614-a3fb3927b675') || item.image?.includes('photo-1579783902614-a3fb3927b675')) {
            const fixedUrl = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80';
            return { ...item, itemImage: fixedUrl, image: fixedUrl };
          }
          return item;
        });
      } catch (e) { return []; }
    }
    return [];
  });

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Operative Bounties & Coupon Tasks State
  const [bountyState, setBountyState] = useState(() => {
    const saved = localStorage.getItem('ignis_bounties');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      checkedIn: false,
      reviewsSubmitted: 0,
      hackNodes: [false, false, false],
      claimedTaskIds: [],
      unlockedCoupons: []
    };
  });

  // Toasts (single active toast to prevent double/overlapping pop-ups)
  const [toasts, setToasts] = useState([]);
  const toastTimerRef = useRef(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('ignis_bounties', JSON.stringify(bountyState));
  }, [bountyState]);
  useEffect(() => {
    localStorage.setItem('ignis_games_v2', JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem('ignis_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ignis_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ignis_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('ignis_library', JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem('ignis_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ignis_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('ignis_loot_history', JSON.stringify(lootHistory));
  }, [lootHistory]);

  // Toast Dispatcher (replaces previous toast cleanly so double pop-ups never occur)
  const addToast = (title, message, type = 'info') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts([{ id, title, message, type }]);
    toastTimerRef.current = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
      toastTimerRef.current = null;
    }, 3200);
  };

  const removeToast = (id) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, platform = null, showNotification = true) => {
    const canonical = ALL_OMNI_PRODUCTS.find(p => p.id === product.id) || product;
    const chosenPlatform = platform || (canonical.platforms && canonical.platforms.length > 0 ? canonical.platforms[0] : (canonical.edition || 'Standard'));
    const itemDept = canonical.department || 'gaming';
    const deptInfo = DEPARTMENTS.find(d => d.id === itemDept);
    const deptName = canonical.departmentName || (deptInfo ? deptInfo.name : 'IGNIS Gaming');
    const itemType = canonical.itemType || (itemDept === 'gaming' ? 'digital' : 'physical');

    setCart(prev => {
      const existing = prev.find(item => item.id === canonical.id && item.selectedPlatform === chosenPlatform);
      if (existing) {
        return prev.map(item => 
          item.id === canonical.id && item.selectedPlatform === chosenPlatform
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev, 
        { 
          ...canonical, 
          coverImage: canonical.coverImage,
          heroBanner: canonical.heroBanner,
          quantity: 1, 
          selectedPlatform: chosenPlatform,
          department: itemDept,
          departmentName: deptName,
          itemType: itemType
        }
      ];
    });

    if (showNotification) {
      addToast('Added to Universal Cart', `${canonical.title} (${chosenPlatform}) queued for checkout in Global Shell.`, 'success');
    }
  };

  const removeFromCart = (gameId, platform, showNotification = true) => {
    setCart(prev => prev.filter(item => !(item.id === gameId && (!platform || item.selectedPlatform === platform))));
    if (showNotification) {
      addToast('Removed from Cart', 'Item was removed from your cart.', 'info');
    }
  };

  const updateCartQuantity = (gameId, platform, quantity) => {
    if (quantity <= 0) {
      removeFromCart(gameId, platform, true);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === gameId && item.selectedPlatform === platform) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = (showNotification = false) => {
    setCart([]);
    if (showNotification) {
      addToast('Cart Cleared', 'All items removed from your tactical cart.', 'info');
    }
  };

  // Wishlist operations (side effects kept outside state updater for React StrictMode safety)
  const toggleWishlist = (game, showNotification = true) => {
    const exists = wishlist.includes(game.id);
    setWishlist(prev =>
      prev.includes(game.id)
        ? prev.filter(id => id !== game.id)
        : [...prev, game.id]
    );

    if (showNotification) {
      if (exists) {
        addToast('Removed from Wishlist', `${game.title} removed from your radar.`, 'info');
      } else {
        addToast('Saved to Wishlist', `${game.title} locked into your target list.`, 'success');
      }
    }
  };

  const isInWishlist = (gameId) => wishlist.includes(gameId);

  const isInCart = (gameId) => cart.some(item => item.id === gameId);

  const isPurchased = (gameId) => library.some(item => item.gameId === gameId);

  // Recently Viewed
  const recordRecentlyViewed = (gameId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== gameId);
      return [gameId, ...filtered].slice(0, 8);
    });
  };

  // Game detail modal
  const openGameDetail = (game) => {
    setSelectedGame(game);
    recordRecentlyViewed(game.id);
  };

  const closeGameDetail = () => {
    setSelectedGame(null);
  };

  // Promo code
  const applyPromoCode = (codeStr) => {
    const trimmed = codeStr.trim().toUpperCase();
    if (DEMO_PROMO_CODES[trimmed]) {
      setAppliedPromo(DEMO_PROMO_CODES[trimmed]);
      addToast('Promo Activated!', `${DEMO_PROMO_CODES[trimmed].desc}`, 'success');
      return { success: true, message: DEMO_PROMO_CODES[trimmed].desc };
    } else {
      addToast('Invalid Code', 'Try codes: CYBER2026, REDGLOW, or IGNIS50', 'error');
      return { success: false, message: 'Invalid promo code. Use CYBER2026 or REDGLOW' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Promo Cleared', 'Promotional discount removed.', 'info');
  };

  // Subtotal and Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? (cartSubtotal * (appliedPromo.discountPercent / 100)) : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  // Generate random realistic CD key
  const generateCdKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${segment()}-${segment()}-${segment()}-${segment()}`;
  };

  // Complete Order (Simulated Checkout)
  const completeOrder = (paymentMethodName = 'IGNIS Cyber Card (•••• 8092)', shippingDetails = null) => {
    if (cart.length === 0) return null;

    const newKeys = cart.map(item => {
      const isDigital = item.department === 'gaming' || item.itemType === 'digital';
      const isSubscription = item.department === 'services' || item.itemType === 'subscription';
      return {
        gameId: item.id,
        gameTitle: item.title,
        coverImage: item.coverImage,
        platform: item.selectedPlatform,
        department: item.department || 'gaming',
        departmentName: item.departmentName || 'IGNIS Gaming',
        purchaseDate: new Date().toISOString().split('T')[0],
        cdKey: isDigital ? generateCdKey() : null,
        trackingNumber: !isDigital && !isSubscription ? 'TRK-OMNI-' + Math.floor(10000000 + Math.random() * 90000000) : null,
        serverInstanceId: isSubscription ? 'NODE-' + Math.floor(1000 + Math.random() * 9000) + '.ignis-cloud.net' : null,
        playtimeHours: 0,
        lastPlayed: 'Not yet launched'
      };
    });

    const orderId = 'OMNI-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      date: new Date().toLocaleString(),
      items: cart.map((item, idx) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        platform: item.selectedPlatform,
        department: item.department || 'gaming',
        departmentName: item.departmentName || 'IGNIS Gaming',
        itemType: item.itemType || 'digital',
        cdKey: newKeys[idx].cdKey,
        trackingNumber: newKeys[idx].trackingNumber,
        serverInstanceId: newKeys[idx].serverInstanceId
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      total: cartTotal,
      paymentMethod: paymentMethodName,
      shippingDetails: shippingDetails || { address: 'Neo-Tokyo Cyber Quarter, Block 09', courier: 'Quantum Expedited' }
    };

    // Update state
    setOrders(prev => [newOrder, ...prev]);
    setLibrary(prev => [...newKeys.filter(k => k.cdKey), ...prev]);

    // Persist order to Supabase orders table
    supabase.from('orders').insert([{
      id: orderId,
      customer_name: userProfile?.operativeId || 'Operative',
      customer_email: userProfile?.email || 'operative@ignis.cyber',
      total_amount: cartTotal,
      items: newOrder.items,
      shipping_address: shippingDetails,
      payment_method: paymentMethodName,
      status: 'completed'
    }]).then(({ error }) => {
      if (error) console.warn('Supabase order sync notice:', error.message);
    });
    
    // Award XP and stats to User Profile
    const gainedXP = cart.length * 450;
    setUserProfile(prev => {
      const nextXP = prev.xp + gainedXP;
      const nextLevel = Math.floor(nextXP / 1000) + 1;
      return {
        ...prev,
        xp: nextXP,
        level: nextLevel,
        totalOrders: prev.totalOrders + 1,
        ignisCredits: prev.ignisCredits + Math.round(cartTotal * 10)
      };
    });

    // Clear cart and promo without firing a second toast
    clearCart(false);
    setAppliedPromo(null);
    setIsCheckoutOpen(false);

    // Save for receipt modal
    setCompletedOrder(newOrder);

    // Confetti celebration
    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff1a35', '#00f0ff', '#bf00ff', '#ffb700', '#00ff88']
      });
    } catch (e) {
      // ignore
    }

    addToast('Universal Order Confirmed!', `Omni-Order ${orderId} executed through Global Shell!`, 'success');
    return newOrder;
  };

  // Add demo review to a game
  const addReviewToGame = (gameId, { rating, comment, author }) => {
    const newReview = {
      id: 'rev-' + Date.now(),
      author: author || userProfile.gamertag,
      avatar: userProfile.avatar,
      rating: Number(rating) || 5,
      date: 'Just now',
      comment,
      helpful: 1
    };

    setGames(prev => prev.map(g => {
      if (g.id === gameId) {
        const updatedReviews = [newReview, ...(g.reviews || [])];
        const newTotal = updatedReviews.length;
        const avgRating = (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / newTotal).toFixed(1);
        return {
          ...g,
          rating: parseFloat(avgRating),
          reviewCount: g.reviewCount + 1,
          reviews: updatedReviews
        };
      }
      return g;
    }));

    // If modal is open, update selectedGame as well
    if (selectedGame && selectedGame.id === gameId) {
      setSelectedGame(prev => ({
        ...prev,
        reviews: [newReview, ...(prev.reviews || [])],
        reviewCount: prev.reviewCount + 1
      }));
    }

    setBountyState(prev => ({
      ...prev,
      reviewsSubmitted: (prev.reviewsSubmitted || 0) + 1
    }));

    addToast('Review Submitted', 'Your operative critique has been broadcasted!', 'success');
  };

  // Bounty & Coupon Task Actions
  const completeCheckInTask = () => {
    if (bountyState.checkedIn) return;
    setBountyState(prev => ({ ...prev, checkedIn: true }));
    addToast('Reactor Core Calibrated!', 'Daily check-in complete. Claim your 10% coupon below!', 'success');
  };

  const toggleHackNode = (idx) => {
    setBountyState(prev => {
      const nextNodes = [...(prev.hackNodes || [false, false, false])];
      nextNodes[idx] = true;
      return { ...prev, hackNodes: nextNodes };
    });
    addToast(`Node 0${idx + 1} Decrypted`, 'Firewall security layer bypassed.', 'info');
  };

  const claimBountyReward = (task) => {
    if (bountyState.claimedTaskIds.includes(task.id)) return;

    const newCoupon = {
      code: task.rewardCode,
      discountPercent: task.discountPercent,
      desc: `${task.discountPercent}% Off — ${task.title}`,
      claimedAt: new Date().toLocaleTimeString()
    };

    setBountyState(prev => ({
      ...prev,
      claimedTaskIds: [...prev.claimedTaskIds, task.id],
      unlockedCoupons: [
        newCoupon,
        ...prev.unlockedCoupons.filter(c => c.code !== task.rewardCode)
      ]
    }));

    setUserProfile(prev => {
      const nextXP = prev.xp + (task.xpReward || 200);
      const nextLevel = Math.floor(nextXP / 1000) + 1;
      return {
        ...prev,
        xp: nextXP,
        level: nextLevel,
        ignisCredits: prev.ignisCredits + 250
      };
    });

    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#ff1a35', '#10b981', '#ffffff']
      });
    } catch (e) {
      // ignore
    }

    addToast(
      `Coupon Unlocked: ${task.rewardCode}`,
      `Earned ${task.discountPercent}% OFF coupon + ${task.xpReward} XP!`,
      'success'
    );
  };

  // Cyber Crate Unboxing Helpers
  const openLootCrate = (crateId = null) => {
    if (crateId) setActiveCrateId(crateId);
    setIsLootModalOpen(true);
  };

  const openFormulaLab = () => {
    setIsFormulaLabOpen(true);
  };

  const openBattlestationBuilder = () => {
    setIsBattlestationOpen(true);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const signInWithSocial = async (provider) => {
    try {
      const redirectUrl = new URL(import.meta.env.BASE_URL, window.location.origin).href;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl
        }
      });
      return { data, error };
    } catch (err) {
      return { error: err };
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      return { data, error };
    } catch (err) {
      return { error: err };
    }
  };

  const signUpWithEmail = async (email, password, gamertag) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            gamertag: gamertag || email.split('@')[0]
          }
        }
      });
      return { data, error };
    } catch (err) {
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setSession(null);
    setCurrentUser(null);
    localStorage.removeItem('ignis_auth_user');
    localStorage.removeItem('ignis_user_profile');
    setUserProfile(GUEST_USER_PROFILE);
    addToast('Session Terminated', 'Logged out of Operative Network.', 'info');
  };

  const signInWithDemo = () => {
    const demoUser = {
      id: 'demo-operative-77',
      email: 'valkyrie_99@ignis.cyber',
      user_metadata: {
        gamertag: 'Valkyrie_99',
        full_name: 'Valkyrie Operative'
      }
    };
    setCurrentUser(demoUser);
    localStorage.setItem('ignis_auth_user', JSON.stringify(demoUser));
    setUserProfile({
      ...INITIAL_USER_PROFILE,
      email: 'valkyrie_99@ignis.cyber',
      gamertag: 'Valkyrie_99',
      isGuest: false
    });
    addToast('Operative Link Established', 'Logged in as Valkyrie_99.', 'success');
  };

  const addUserXp = (amount) => {
    setUserProfile(prev => {
      const nextXP = (prev.xp || 0) + amount;
      const prevLevel = prev.level || 42;
      const nextLevel = Math.floor(nextXP / 1000) + 1;
      
      if (nextLevel > prevLevel) {
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff1a35', '#00f0ff', '#ffb700']
          });
        } catch (e) {}
        addToast('OPERATIVE RANK UP!', `Rank elevated to Level ${nextLevel}!`, 'success');
      }

      return {
        ...prev,
        xp: nextXP,
        level: nextLevel
      };
    });
  };

  const deductUserXp = (amount) => {
    if ((userProfile.xp || 0) < amount) {
      addToast('Insufficient XP', `You need ${amount} XP to unbox this crate. Complete bounties or refill daily!`, 'error');
      return false;
    }
    setUserProfile(prev => ({
      ...prev,
      xp: Math.max(0, (prev.xp || 0) - amount)
    }));
    return true;
  };

  const recordCrateOpen = (crate, item) => {
    const entryId = `unbox-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const historyEntry = {
      id: entryId,
      crateId: crate.id,
      crateName: crate.name,
      crateCostXp: crate.costXp,
      crateAccentColor: crate.accentColor,
      itemTitle: item.title,
      itemCategory: item.category,
      itemRarity: item.rarity,
      itemImage: item.image,
      itemCode: item.code || null,
      itemDiscountPercent: item.discountPercent || null,
      itemXpAmount: item.xpAmount || null,
      freeProductId: item.freeProductId || null,
      bonusCode: item.bonusCode || null,
      itemDescription: item.description,
      openedAt: new Date().toISOString(),
      claimed: false
    };

    // Prepend to persistent history (keeps up to 100 past unboxings)
    setLootHistory(prev => [historyEntry, ...prev.slice(0, 99)]);

    // Persist to Supabase loot_history table
    supabase.from('loot_history').insert([{
      id: entryId,
      crate_id: crate.id,
      crate_name: crate.name,
      item_title: item.title,
      item_rarity: item.rarity,
      item_value: item.value || 0,
      item_image: item.image || item.itemImage
    }]).then(({ error }) => {
      if (error) console.warn('Supabase loot_history sync notice:', error.message);
    });

    // If coupon, automatically safeguard into unlocked coupons so user never loses it
    if (item.category === 'coupon' && item.code) {
      setBountyState(prev => {
        const already = (prev.unlockedCoupons || []).some(c => c.code === item.code);
        return {
          ...prev,
          unlockedCoupons: already
            ? prev.unlockedCoupons
            : [{ code: item.code, discountPercent: item.discountPercent, title: item.title }, ...(prev.unlockedCoupons || [])]
        };
      });
    }

    // If XP surge, credit immediately
    if (item.category === 'xp' && item.xpAmount) {
      addUserXp(item.xpAmount);
    }

    return historyEntry;
  };

  const clearLootHistory = () => {
    setLootHistory([]);
    localStorage.removeItem('ignis_loot_history');
    addToast('History Cleared', 'Operative unboxing log reset.', 'info');
  };

  const claimLootItem = (item, historyId = null) => {
    // Mark as claimed in history if ID provided
    if (historyId) {
      setLootHistory(prev => prev.map(entry => 
        entry.id === historyId ? { ...entry, claimed: true } : entry
      ));
    }

    if (item.category === 'coupon') {
      applyPromoCode(item.code || item.itemCode);
      return { success: true, type: 'coupon' };
    }

    if (item.category === 'free_item') {
      const pId = item.freeProductId;
      const freeProduct = ALL_OMNI_PRODUCTS.find(p => p.id === pId);
      if (freeProduct) {
        addToCart({
          ...freeProduct,
          price: 0,
          originalPrice: freeProduct.price,
          isFreeLoot: true,
          title: `🎁 [FREE LOOT] ${freeProduct.title}`
        });
      }
      if (item.bonusCode) {
        applyPromoCode(item.bonusCode);
      }
      return { success: true, type: 'free_item' };
    }

    if (item.category === 'xp') {
      return { success: true, type: 'xp' };
    }

    return { success: true, type: 'badge' };
  };

  // Launch simulated game from library
  const simulatePlayGame = (gameId) => {
    setLibrary(prev => prev.map(item => {
      if (item.gameId === gameId) {
        return {
          ...item,
          playtimeHours: Number((item.playtimeHours + 1.2).toFixed(1)),
          lastPlayed: 'Just now'
        };
      }
      return item;
    }));

    setUserProfile(prev => ({
      ...prev,
      hoursPlayed: prev.hoursPlayed + 1
    }));

    addToast('Simulation Active', 'Booting game executable... Neural link established.', 'info');
  };

  return (
    <StoreContext.Provider value={{
      // Universal Multi-Department Ecosystem
      activeDepartment,
      setActiveDepartment,
      departments: DEPARTMENTS,
      allProducts,
      supabase,
      hardwareProducts: HARDWARE_PRODUCTS,
      apparelProducts: APPAREL_PRODUCTS,
      collectiblesProducts: COLLECTIBLES_PRODUCTS,
      servicesProducts: SERVICES_PRODUCTS,
      fuelProducts: FUEL_PRODUCTS,
      // Store state
      games,
      cart,
      wishlist,
      userProfile,
      library,
      orders,
      recentlyViewed,
      // Modals
      selectedGame,
      setSelectedGame,
      openGameDetail,
      closeGameDetail,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      isProfileOpen,
      setIsProfileOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      openAuthModal,
      session,
      currentUser,
      signInWithSocial,
      signInWithEmail,
      signUpWithEmail,
      signInWithDemo,
      signOut,
      isSearchOpen,
      setIsSearchOpen,
      completedOrder,
      setCompletedOrder,
      isLootModalOpen,
      setIsLootModalOpen,
      activeCrateId,
      setActiveCrateId,
      openLootCrate,
      isFormulaLabOpen,
      setIsFormulaLabOpen,
      openFormulaLab,
      isBattlestationOpen,
      setIsBattlestationOpen,
      openBattlestationBuilder,
      lootHistory,
      recordCrateOpen,
      clearLootHistory,
      addUserXp,
      deductUserXp,
      claimLootItem,
      // Filters
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedPlatform,
      setSelectedPlatform,
      selectedTag,
      setSelectedTag,
      sortBy,
      setSortBy,
      maxPrice,
      setMaxPrice,
      onlyDiscounted,
      setOnlyDiscounted,
      // Cart & Checkout
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartSubtotal,
      cartTotal,
      discountAmount,
      appliedPromo,
      applyPromoCode,
      removePromoCode,
      completeOrder,
      // Wishlist
      toggleWishlist,
      isInWishlist,
      isInCart,
      isPurchased,
      // Library & Reviews
      addReviewToGame,
      simulatePlayGame,
      // Bounties & Coupon Tasks
      bountyState,
      completeCheckInTask,
      toggleHackNode,
      claimBountyReward,
      // Toasts
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
