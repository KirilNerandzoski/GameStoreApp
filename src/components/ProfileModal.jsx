import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  User, 
  Gamepad2, 
  Trophy, 
  Clock, 
  Receipt, 
  Coins, 
  Play, 
  Copy, 
  Check, 
  Flame, 
  ShieldCheck, 
  KeyRound,
  Edit2,
  Save,
  Database
} from 'lucide-react';
import { dispatchCustomerToWorkRelay } from '../lib/workRelay';

export default function ProfileModal() {
  const { 
    isProfileOpen, 
    setIsProfileOpen, 
    userProfile, 
    library, 
    orders, 
    simulatePlayGame, 
    addToast,
    currentUser,
    openAuthModal,
    openWorkRelayModal,
    signOut
  } = useStore();

  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'achievements' | 'orders'
  const [copiedKey, setCopiedKey] = useState(null);
  const [isEditingGamertag, setIsEditingGamertag] = useState(false);
  const [tempGamertag, setTempGamertag] = useState(userProfile.gamertag);

  if (!isProfileOpen) return null;

  const handleCopy = (keyStr) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(keyStr);
      setCopiedKey(keyStr);
      addToast('CD-Key Copied', keyStr, 'success');
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleSaveGamertag = () => {
    userProfile.gamertag = tempGamertag.trim() || 'Kirogamer';
    setIsEditingGamertag(false);
    addToast('Profile Updated', `Gamertag updated to ${userProfile.gamertag}`, 'info');
    // Section 4 Step 3: Send customer.updated when profile changes
    if (userProfile.email) {
      dispatchCustomerToWorkRelay({
        email: userProfile.email,
        name: userProfile.gamertag,
        externalId: userProfile.gamertag,
        eventType: 'customer.updated'
      }).catch(() => {});
    }
  };

  const xpPercentage = Math.min(100, Math.round((userProfile.xp % 1000) / 10));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-[#0c0d14] border border-red-500/35 shadow-[0_0_55px_rgba(255,26,53,0.3)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsProfileOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dossier Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#170a10] via-[#10111b] to-[#0a0b10] border-b border-zinc-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            {/* Avatar */}
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.gamertag}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-red-500 shadow-[0_0_20px_rgba(255,26,53,0.4)]"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-cyber font-bold bg-black text-red-400 border border-red-500/50">
                PRO
              </span>
            </div>

            {/* Profile Info & XP */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                {isEditingGamertag ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempGamertag}
                      onChange={(e) => setTempGamertag(e.target.value)}
                      className="px-3 py-1 rounded bg-[#07070a] border border-red-500 text-lg font-bold text-white focus:outline-none"
                    />
                    <button
                      onClick={handleSaveGamertag}
                      className="p-1.5 rounded bg-red-600 text-white hover:bg-red-500"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                      {userProfile.gamertag}
                    </h2>
                    <button
                      onClick={() => setIsEditingGamertag(true)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      title="Edit Codename"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <span className="px-2.5 py-0.5 rounded-md text-xs font-cyber font-bold bg-red-600 text-white shadow-[0_0_10px_rgba(255,26,53,0.5)]">
                  LEVEL {userProfile.level}
                </span>

                <span className="text-xs text-zinc-400 font-mono">
                  IGNIS Cyber Syndicate Operative
                </span>
              </div>

              {/* XP Progress Bar */}
              <div className="space-y-1 max-w-md">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">XP Progress</span>
                  <span className="text-red-400 font-bold">{userProfile.xp.toLocaleString()} / {(userProfile.level * 1000).toLocaleString()} XP</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden p-[1px]">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full shadow-[0_0_8px_#ff1a35] transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Balance Cards */}
            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
              <div className="p-2.5 rounded-xl bg-[#141524] border border-red-500/20 text-xs">
                <span className="text-zinc-500 block">Syndicate Credits</span>
                <span className="text-base font-bold font-mono text-red-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  {userProfile.ignisCredits.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#141524] border border-zinc-800 text-xs">
                <span className="text-zinc-500 block">Total Playtime</span>
                <span className="text-base font-bold font-mono text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  {userProfile.hoursPlayed} hrs
                </span>
              </div>

              {currentUser ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsProfileOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-mono font-bold transition-all text-center cursor-pointer"
                  title="Disconnect Session"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    openAuthModal();
                  }}
                  className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold transition-all text-center cursor-pointer animate-pulse"
                  title="Connect via Google or Email"
                >
                  Sign In / Connect
                </button>
              )}

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  openWorkRelayModal();
                }}
                className="px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Open WorkRelay Inventory & Webhook Sync Hub"
              >
                <Database className="w-3.5 h-3.5" />
                WorkRelay Sync
              </button>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-6 px-6 sm:px-8 border-b border-zinc-800 text-sm font-semibold bg-[#0e0f17]">
          <button
            onClick={() => setActiveTab('library')}
            className={`py-3.5 transition-colors relative flex items-center gap-2 ${
              activeTab === 'library' ? 'text-red-500 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Digital Library ({library.length})</span>
            {activeTab === 'library' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_8px_#ff1a35]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`py-3.5 transition-colors relative flex items-center gap-2 ${
              activeTab === 'achievements' ? 'text-red-500 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Combat Feats ({userProfile.achievements.filter(a => a.unlocked).length}/{userProfile.achievements.length})</span>
            {activeTab === 'achievements' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_8px_#ff1a35]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 transition-colors relative flex items-center gap-2 ${
              activeTab === 'orders' ? 'text-red-500 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Order Archive ({orders.length})</span>
            {activeTab === 'orders' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_8px_#ff1a35]" />
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto">
          
          {/* TAB 1: LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              {library.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  No games currently installed in operative vault.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {library.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#12131f] border border-zinc-800/80 hover:border-red-500/40 transition-colors flex gap-4"
                    >
                      <img
                        src={item.coverImage}
                        alt={item.gameTitle}
                        className="w-28 h-20 rounded-lg object-cover object-center shrink-0 border border-zinc-800"
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-black text-red-400 border border-red-500/30">
                              {item.platform}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              Acquired {item.purchaseDate}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white mt-1 truncate">
                            {item.gameTitle}
                          </h4>

                          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                            <Clock className="w-3.5 h-3.5 text-red-500" />
                            <span>{item.playtimeHours} hrs recorded</span>
                          </div>
                        </div>

                        {/* CD Key & Launch Simulator */}
                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleCopy(item.cdKey)}
                            className="text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-black/60 px-2 py-1 rounded border border-zinc-800"
                            title="Click to copy CD-Key"
                          >
                            <KeyRound className="w-3 h-3 text-red-400" />
                            <span className="truncate max-w-[100px]">{item.cdKey}</span>
                          </button>

                          <button
                            onClick={() => simulatePlayGame(item.gameId)}
                            className="px-3 py-1 rounded-lg text-xs font-cyber font-bold bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 transition-all flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>LAUNCH</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {userProfile.achievements.map(ach => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                    ach.unlocked
                      ? 'bg-[#121320] border-red-500/30 shadow-[0_0_15px_rgba(255,26,53,0.15)]'
                      : 'bg-[#0a0b10] border-zinc-800/60 opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    ach.unlocked 
                      ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(255,26,53,0.5)]' 
                      : 'bg-zinc-800 text-zinc-600'
                  }`}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white font-cyber tracking-wide">
                        {ach.title}
                      </h4>
                      {ach.unlocked ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          UNLOCKED
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-zinc-500">
                          LOCKED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 font-sans">
                      {ach.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.map((ord, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#11121d] border border-zinc-800/80 space-y-2">
                  <div className="flex flex-wrap items-center justify-between text-xs">
                    <span className="font-mono font-bold text-white">Order {ord.orderId}</span>
                    <span className="text-zinc-500 font-mono">{ord.date}</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-300">
                        <span>{item.title} ({item.platform})</span>
                        <span className="font-mono">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-mono">Method: {ord.paymentMethod}</span>
                    <span className="text-sm font-bold font-mono text-red-400">Total: ${ord.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
