import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { GAMES_DATA, INITIAL_USER_PROFILE, DEMO_PROMO_CODES } from '../data/games';
import confetti from 'canvas-confetti';

const StoreContext = createContext();

export function StoreProvider({ children }) {
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
          const fresh = GAMES_DATA.find(g => g.id === item.id);
          return fresh ? { ...item, coverImage: fresh.coverImage, heroBanner: fresh.heroBanner } : item;
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

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ignis_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_USER_PROFILE; }
    }
    return INITIAL_USER_PROFILE;
  });

  // Purchased Game Library
  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem('ignis_library');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(item => {
          const fresh = GAMES_DATA.find(g => g.id === item.gameId);
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

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
  const addToCart = (game, platform = null, showNotification = true) => {
    const chosenPlatform = platform || game.platforms[0] || 'PC';
    setCart(prev => {
      const existing = prev.find(item => item.id === game.id && item.selectedPlatform === chosenPlatform);
      if (existing) {
        return prev.map(item => 
          item.id === game.id && item.selectedPlatform === chosenPlatform
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...game, quantity: 1, selectedPlatform: chosenPlatform }];
    });

    if (showNotification) {
      addToast('Added to Cart', `${game.title} (${chosenPlatform}) added to your tactical cart.`, 'success');
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
  const completeOrder = (paymentMethodName = 'IGNIS Cyber Card (•••• 8092)') => {
    if (cart.length === 0) return null;

    const newKeys = cart.map(item => ({
      gameId: item.id,
      gameTitle: item.title,
      coverImage: item.coverImage,
      platform: item.selectedPlatform,
      purchaseDate: new Date().toISOString().split('T')[0],
      cdKey: generateCdKey(),
      playtimeHours: 0,
      lastPlayed: 'Not yet launched'
    }));

    const orderId = 'IGNIS-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      date: new Date().toLocaleString(),
      items: cart.map((item, idx) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        platform: item.selectedPlatform,
        cdKey: newKeys[idx].cdKey
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      total: cartTotal,
      paymentMethod: paymentMethodName
    };

    // Update state
    setOrders(prev => [newOrder, ...prev]);
    setLibrary(prev => [...newKeys, ...prev]);
    
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
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff1a35', '#ff4d66', '#ffffff', '#8b0015']
      });
    } catch (e) {
      // ignore in non-browser or sandbox
    }

    addToast('Order Confirmed!', `Order ${orderId} successfully completed. CD-Keys issued!`, 'success');
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
      isSearchOpen,
      setIsSearchOpen,
      completedOrder,
      setCompletedOrder,
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
