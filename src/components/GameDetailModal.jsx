import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Star, 
  CheckCircle2, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Flame, 
  Calendar, 
  Building2, 
  Send,
  MessageSquare
} from 'lucide-react';

export default function GameDetailModal() {
  const { 
    selectedGame, 
    closeGameDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    isInCart,
    addReviewToGame,
    games,
    openGameDetail,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [chosenPlatform, setChosenPlatform] = useState(null);

  // Review submission form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState('');

  if (!selectedGame) return null;

  const screenshots = (selectedGame.screenshots && selectedGame.screenshots.length > 0)
    ? selectedGame.screenshots
    : [selectedGame.heroBanner || selectedGame.coverImage, selectedGame.coverImage].filter(Boolean);

  const currentPlatform = chosenPlatform || (selectedGame.platforms && selectedGame.platforms[0]) || 'Standard';
  const inWish = isInWishlist(selectedGame.id);
  const inCart = isInCart(selectedGame.id);

  // Similar games recommendation
  const similarGames = games
    .filter(g => g.id !== selectedGame.id && (g.category === selectedGame.category || (g.tags && selectedGame.tags && g.tags.some(t => selectedGame.tags.includes(t)))))
    .slice(0, 3);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addReviewToGame(selectedGame.id, {
      rating: reviewRating,
      comment: reviewComment.trim(),
      author: reviewAuthor.trim() || undefined
    });

    setReviewComment('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Dossier Link Copied', 'Encrypted game link saved to clipboard.', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-5xl rounded-2xl bg-[#0c0d13] border border-red-500/30 shadow-[0_0_50px_rgba(255,26,53,0.3)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeGameDetail}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-red-600 text-zinc-400 hover:text-white transition-all border border-zinc-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop & Media Gallery */}
        <div className="relative w-full bg-black">
          {/* Main Selected Image */}
          <div className="relative aspect-[16/9] max-h-[440px] w-full overflow-hidden">
            <img
              src={screenshots[selectedImgIdx] || selectedGame.heroBanner || selectedGame.coverImage}
              alt={selectedGame.title}
              className="w-full h-full object-cover object-center animate-fade-in transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d13] via-[#0c0d13]/40 to-transparent" />
            
            {/* Title overlay at bottom of banner */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-cyber font-bold bg-red-600 text-white">
                    {selectedGame.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {selectedGame.ageRating}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-heading text-white">
                  {selectedGame.title}
                </h2>
              </div>

              {/* Price Tag in banner */}
              <div className="flex items-center gap-3 bg-[#11121c]/90 px-4 py-2 rounded-xl border border-red-500/30 backdrop-blur-md">
                {selectedGame.discountPercent > 0 && (
                  <span className="px-2 py-1 rounded bg-red-600 text-white font-cyber font-bold text-xs">
                    -{selectedGame.discountPercent}%
                  </span>
                )}
                <div>
                  {selectedGame.discountPercent > 0 && (
                    <span className="text-xs line-through text-zinc-500 block font-mono">
                      ${selectedGame.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl font-black text-white font-heading">
                    ${selectedGame.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot Thumbnails Strip */}
          <div className="flex items-center gap-2 p-3 bg-[#08080c] overflow-x-auto border-y border-zinc-800/80">
            {screenshots.map((shot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIdx(idx)}
                className={`relative w-24 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  idx === selectedImgIdx 
                    ? 'border-red-500 shadow-[0_0_10px_rgba(255,26,53,0.5)] scale-105' 
                    : 'border-zinc-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={shot} alt="Screenshot thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Action & Platform Selection Bar */}
          <div className="p-4 rounded-xl bg-[#12131d] border border-red-500/20 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-zinc-400">Target Platform:</span>
              <div className="flex items-center gap-1.5">
                {selectedGame.platforms.map(p => (
                  <button
                    key={p}
                    onClick={() => setChosenPlatform(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                      currentPlatform === p 
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(255,26,53,0.5)]' 
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => addToCart(selectedGame, currentPlatform)}
                className="px-6 py-2.5 rounded-lg font-cyber font-bold tracking-wider text-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_15px_rgba(255,26,53,0.4)] transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {inCart ? 'ADD ANOTHER' : 'ADD TO TACTICAL CART'}
              </button>

              <button
                onClick={() => toggleWishlist(selectedGame)}
                className={`p-2.5 rounded-lg border transition-all ${
                  inWish 
                    ? 'bg-red-600/20 border-red-500 text-red-500' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-red-500' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                title="Share Game"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-4 border-b border-zinc-800 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'overview' ? 'text-red-500 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Dossier & Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_8px_#ff1a35]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'specs' ? 'text-red-500 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              System Requirements
              {activeTab === 'specs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_8px_#ff1a35]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
                activeTab === 'reviews' ? 'text-red-500 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Operative Reviews</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600/30 text-red-400">
                {selectedGame.reviews?.length || 0}
              </span>
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_8px_#ff1a35]" />
              )}
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metadata strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#11121a] border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Studio</span>
                  <span className="text-xs font-semibold text-white mt-0.5 block">{selectedGame.studio}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#11121a] border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Publisher</span>
                  <span className="text-xs font-semibold text-white mt-0.5 block">{selectedGame.publisher}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#11121a] border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Release Date</span>
                  <span className="text-xs font-semibold text-white mt-0.5 block font-mono">{selectedGame.releaseDate}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#11121a] border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Total Players</span>
                  <span className="text-xs font-semibold text-red-400 mt-0.5 block font-mono">{selectedGame.totalPlayers}</span>
                </div>
              </div>

              {/* Story & Lore */}
              <div>
                <h4 className="text-sm font-cyber font-bold text-red-400 uppercase tracking-wider mb-2">
                  Narrative Briefing
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {selectedGame.story}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans mt-2">
                  {selectedGame.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-sm font-cyber font-bold text-red-400 uppercase tracking-wider mb-3">
                  Tactical Features & Enhancements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {selectedGame.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#11121a] border border-zinc-800/80">
                      <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM REQUIREMENTS */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Minimum */}
              <div className="p-4 rounded-xl bg-[#11121a] border border-zinc-800 space-y-3">
                <h4 className="text-sm font-cyber font-bold text-zinc-200 uppercase tracking-wider pb-2 border-b border-zinc-800">
                  Minimum Specification
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Operating System:</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.minimum.os}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Processor (CPU):</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.minimum.cpu}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Memory:</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.minimum.ram}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Graphics (GPU):</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.minimum.gpu}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Storage:</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.minimum.storage}</span>
                  </div>
                </div>
              </div>

              {/* Recommended */}
              <div className="p-4 rounded-xl bg-[#11121a] border border-red-500/30 space-y-3 shadow-[0_0_15px_rgba(255,26,53,0.15)]">
                <h4 className="text-sm font-cyber font-bold text-red-400 uppercase tracking-wider pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>Recommended Specification (Ultra 60FPS)</span>
                  <Flame className="w-4 h-4 text-red-500" />
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Operating System:</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.recommended.os}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Processor (CPU):</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.recommended.cpu}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Memory:</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.recommended.ram}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Graphics (GPU):</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.recommended.gpu}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Storage:</span>
                    <span className="text-zinc-200 font-mono">{selectedGame.systemRequirements.recommended.storage}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* Existing Reviews List */}
              <div className="space-y-3">
                <h4 className="text-sm font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                  Field Reports ({selectedGame.reviews?.length || 0})
                </h4>

                {selectedGame.reviews?.map(rev => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-[#11121a] border border-zinc-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={rev.avatar} alt={rev.author} className="w-7 h-7 rounded-full object-cover border border-zinc-700" />
                        <div>
                          <span className="text-xs font-bold text-white block">{rev.author}</span>
                          <span className="text-[10px] text-zinc-500">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-yellow-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      "{rev.comment}"
                    </p>

                    <div className="text-[10px] text-zinc-500">
                      {rev.helpful} operatives found this assessment helpful
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Form: Post a Demo Review */}
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-xl bg-[#131420] border border-red-500/30 space-y-3">
                <h5 className="text-xs font-cyber font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Submit Your Operative Review
                </h5>

                <div className="flex flex-wrap gap-4 items-center">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Codename / Author</label>
                    <input
                      type="text"
                      placeholder="e.g. Ghost_Operator"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-[#0a0b10] border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Combat Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="px-3 py-1.5 rounded-lg bg-[#0a0b10] border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5) Masterpiece</option>
                      <option value="4">⭐⭐⭐⭐ (4/5) Commendable</option>
                      <option value="3">⭐⭐⭐ (3/5) Serviceable</option>
                      <option value="2">⭐⭐ (2/5) Flawed</option>
                      <option value="1">⭐ (1/5) Critical Failure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Debrief / Comment</label>
                  <textarea
                    rows="2"
                    required
                    placeholder="Log your experience with combat flow, performance, graphics..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0b10] border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-cyber font-bold tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(255,26,53,0.4)] transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  TRANSMIT REVIEW
                </button>
              </form>

            </div>
          )}

          {/* Similar Recommended Games */}
          {similarGames.length > 0 && (
            <div className="pt-6 border-t border-zinc-800 space-y-3">
              <h4 className="text-xs font-cyber font-bold tracking-wider text-zinc-400 uppercase">
                Synchronized Recommendations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarGames.map(sim => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      openGameDetail(sim);
                      setSelectedImgIdx(0);
                    }}
                    className="cursor-pointer p-2.5 rounded-xl bg-[#11121a] hover:bg-[#181926] border border-zinc-800/80 hover:border-red-500/50 transition-all flex items-center gap-3 group"
                  >
                    <img src={sim.coverImage} alt={sim.title} className="w-20 h-14 object-cover object-center shrink-0 rounded-lg border border-zinc-800" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate block">
                        {sim.title}
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        {sim.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-red-400 mt-1 block">
                        ${sim.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
