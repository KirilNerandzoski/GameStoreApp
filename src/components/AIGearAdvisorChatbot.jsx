import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { processAdvisorQuery } from '../utils/aiAdvisorEngine';
import { playReelTick } from '../utils/cyberAudio';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  Cpu, 
  FlaskConical, 
  Package, 
  Flame, 
  ChevronRight,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

export default function AIGearAdvisorChatbot() {
  const { 
    allProducts, 
    games, 
    addToCart, 
    openGameDetail, 
    openBattlestationBuilder, 
    openFormulaLab, 
    openLootCrate, 
    setActiveDepartment,
    setIsCartOpen,
    isAdvisorOpen,
    setIsAdvisorOpen
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'ai',
      text: `👋 **NEXUS TAC-AI ONLINE.**\n\nGreetings Operative. I am your automated gear advisor and hardware telemetry consultant across all 6 storefronts.\n\nAsk me anything about **custom gaming rigs, 4K monitors, esports mice, CyberFuel formula mixes, loot crate odds, or active promo codes.**`,
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
        'Recommend an esports mouse',
        'What PC specs do I need for 4K 144Hz?',
        'What active promo codes exist?'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync with global store state if provided
  useEffect(() => {
    if (typeof isAdvisorOpen === 'boolean') {
      setIsOpen(isAdvisorOpen);
    }
  }, [isAdvisorOpen]);

  // URL Hash Listener for #advisor or #ai
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#advisor' || hash === '#ai' || hash === '#chat') {
        setIsOpen(true);
        setIsAdvisorOpen?.(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setIsAdvisorOpen]);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    setIsAdvisorOpen?.(next);
    if (!next && (window.location.hash.toLowerCase() === '#advisor' || window.location.hash.toLowerCase() === '#ai')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleSend = (textToSend = null) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    // Play subtle mechanical chirp
    playReelTick(1.2);

    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulated neural compute latency (450ms)
    setTimeout(() => {
      const response = processAdvisorQuery(text, allProducts, games);
      playReelTick(1.8);

      const botMsg = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        recommendedProducts: response.recommendedProducts || [],
        quickActions: response.quickActions || [],
        suggestedFollowUps: response.suggestedFollowUps || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action) => {
    playReelTick(1.4);
    switch (action) {
      case 'open_builder':
        openBattlestationBuilder();
        setIsOpen(false);
        break;
      case 'open_formula_lab':
        openFormulaLab();
        setIsOpen(false);
        break;
      case 'open_loot':
        openLootCrate();
        setIsOpen(false);
        break;
      case 'open_cart':
        setIsCartOpen(true);
        setIsOpen(false);
        break;
      case 'nav_hardware':
        setActiveDepartment('hardware');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
        break;
      case 'nav_gaming':
        setActiveDepartment('gaming');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
        break;
      case 'nav_apparel':
        setActiveDepartment('apparel');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-init-reset',
        sender: 'ai',
        text: `🔄 **MEMORY CLEARED.** Telemetry logs flushed. How can I assist your loadout today, Operative?`,
        recommendedProducts: [],
        quickActions: [
          { label: '🚀 PC Battlestation Studio', action: 'open_builder' },
          { label: '🧪 Custom Formula Lab', action: 'open_formula_lab' }
        ],
        suggestedFollowUps: [
          'Recommend an esports mouse',
          'Best gaming PC under $2,000',
          'What active promo codes exist?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Tactical Chat Trigger Pill */}
      {!isOpen && (
        <aside aria-label="AI Gear Advisor" className="fixed bottom-6 left-6 z-40">
          <button
            onClick={handleToggle}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-cyber font-black text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(191,0,255,0.5)] border border-purple-300 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
            title="Open AI Gear Advisor Chatbot (NEXUS TAC-AI)"
          >
            <div className="relative">
              <Bot className="w-4 h-4 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span>TAC-AI ADVISOR</span>
            <span className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono font-bold text-cyan-300">
              ONLINE
            </span>
          </button>
        </aside>
      )}

      {/* Expanded Tactical Chat Terminal */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 z-50 w-auto sm:w-[420px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[85vh] rounded-2xl bg-[#090a12] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden animate-fade-in backdrop-blur-xl">
          
          {/* Terminal Header */}
          <div className="px-4 py-3 bg-[#0d0e19] border-b border-zinc-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Bot className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-cyber font-black text-white tracking-wider truncate">
                    NEXUS TAC-AI
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    v4.9
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono truncate">
                  Tactical Loadout & Telemetry Advisor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleToggle}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Minimize Advisor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs scrollbar-thin">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-xs shadow-md'
                      : 'bg-[#121422] border border-zinc-800/90 text-zinc-200 rounded-bl-xs shadow-sm'
                  }`}
                >
                  {/* Markdown formatted text output */}
                  <div className="space-y-1.5 whitespace-pre-wrap">
                    {msg.text.split('\n\n').map((para, i) => (
                      <p key={i}>
                        {para.split('**').map((seg, segIdx) => 
                          segIdx % 2 === 1 ? <strong key={segIdx} className="text-white font-bold">{seg}</strong> : seg
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Embedded Recommended Product Cards */}
                  {msg.recommendedProducts?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-700/60 space-y-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                        Suggested Hardware & Titles:
                      </span>
                      <div className="space-y-1.5">
                        {msg.recommendedProducts.map(prod => (
                          <div
                            key={prod.id}
                            className="p-2 rounded-xl bg-[#090a10] border border-zinc-800/90 hover:border-cyan-500/50 flex items-center justify-between gap-2.5 transition-all"
                          >
                            <div 
                              onClick={() => openGameDetail(prod)}
                              className="flex items-center gap-2 min-w-0 cursor-pointer group flex-1"
                            >
                              <img
                                src={prod.coverImage}
                                alt={prod.title}
                                className="w-10 h-10 rounded-lg object-cover shrink-0 border border-zinc-800"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop';
                                }}
                              />
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-white block truncate group-hover:text-cyan-400 transition-colors">
                                  {prod.title}
                                </span>
                                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                                  ${prod.price.toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => addToCart(prod)}
                              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold flex items-center gap-1 shrink-0 transition-colors"
                              title="Add to Universal Cart"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  {msg.quickActions?.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-zinc-700/50 flex flex-wrap gap-1.5">
                      {msg.quickActions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(act.action)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-cyber font-bold tracking-wider uppercase bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="block mt-1 text-[9px] font-mono text-zinc-500 text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Suggested Follow-Up Prompt Chips */}
                {msg.suggestedFollowUps?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.suggestedFollowUps.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-400 hover:text-white bg-[#0e0f1a] hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/40 transition-colors cursor-pointer text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            ))}

            {/* Neural Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#121422] border border-zinc-800 text-zinc-400 w-fit animate-pulse">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-mono">Synthesizing loadout telemetry...</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0d0e19] border-t border-zinc-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask TAC-AI (e.g. 'RTX 5090 rig', 'mouse', 'promo')..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#08080f] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-800 text-black disabled:text-zinc-600 transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
