import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  RGB_THEMES, 
  CASES, 
  CPUS, 
  GPUS, 
  COOLING, 
  MOTHERBOARDS, 
  RAM_OPTIONS, 
  STORAGE_OPTIONS, 
  PSU_OPTIONS, 
  BATTLESTATION_PERIPHERALS, 
  ASSEMBLY_OPTIONS 
} from '../data/battlestationData';
import { generateBattlestationImage } from '../utils/generateBattlestationImage';
import { playWinSound } from '../utils/cyberAudio';
import confetti from 'canvas-confetti';
import { 
  X, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Gauge, 
  Sparkles, 
  ShoppingBag, 
  Wrench, 
  Sliders, 
  Layers, 
  Flame, 
  ShieldCheck, 
  Palette,
  ChevronRight,
  Info
} from 'lucide-react';

export default function BattlestationBuilderModal() {
  const { 
    isBattlestationOpen, 
    setIsBattlestationOpen, 
    addToCart, 
    setIsCartOpen, 
    addToast 
  } = useStore();

  // Active Tab: 'rig' | 'peripherals' | 'branding'
  const [activeTab, setActiveTab] = useState('rig');

  // Customization State
  const [selectedTheme, setSelectedTheme] = useState(RGB_THEMES[0]);
  const [selectedCase, setSelectedCase] = useState(CASES[0]);
  const [selectedCpu, setSelectedCpu] = useState(CPUS[0]);
  const [selectedGpu, setSelectedGpu] = useState(GPUS[0]);
  const [selectedCooler, setSelectedCooler] = useState(COOLING[0]);
  const [selectedMobo, setSelectedMobo] = useState(MOTHERBOARDS[0]);
  const [selectedRam, setSelectedRam] = useState(RAM_OPTIONS[0]);
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[0]);
  const [selectedPsu, setSelectedPsu] = useState(PSU_OPTIONS[0]);

  // Peripherals State
  const [selectedMonitor, setSelectedMonitor] = useState(BATTLESTATION_PERIPHERALS.monitors[0]);
  const [selectedDesk, setSelectedDesk] = useState(BATTLESTATION_PERIPHERALS.desks[0]);
  const [selectedKeyboard, setSelectedKeyboard] = useState(BATTLESTATION_PERIPHERALS.keyboards[0]);
  const [selectedMouse, setSelectedMouse] = useState(BATTLESTATION_PERIPHERALS.mice[0]);
  const [selectedAudio, setSelectedAudio] = useState(BATTLESTATION_PERIPHERALS.audio[0]);
  const [selectedAmbience, setSelectedAmbience] = useState(BATTLESTATION_PERIPHERALS.ambience[0]);

  // Assembly & Branding State
  const [selectedAssembly, setSelectedAssembly] = useState(ASSEMBLY_OPTIONS[0]);
  const [rigCustomName, setRigCustomName] = useState('TITAN-X Liquid Core');
  const [operatorTag, setOperatorTag] = useState('Ghost_Operator');

  // URL Hash Listener for #builder
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.toLowerCase() === '#builder') {
        setIsBattlestationOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setIsBattlestationOpen]);

  // Escape key listener to close cleanly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isBattlestationOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBattlestationOpen]);

  const handleClose = () => {
    setIsBattlestationOpen(false);
    if (window.location.hash.toLowerCase() === '#builder') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  // Calculations: Total Power Draw & Headroom
  const estimatedWattage = useMemo(() => {
    return selectedCpu.tdp + selectedGpu.tdp + 100; // 100W for motherboard, fans, RAM, SSD
  }, [selectedCpu, selectedGpu]);

  const wattageHeadroom = useMemo(() => {
    return Math.round(((selectedPsu.wattage - estimatedWattage) / selectedPsu.wattage) * 100);
  }, [selectedPsu, estimatedWattage]);

  const isPowerSufficient = wattageHeadroom > 10;

  // Compatibility Checks
  const compatibilityAlerts = useMemo(() => {
    const alerts = [];
    if (selectedCase.formFactor === 'Mini-ITX' && selectedMobo.chipset.includes('E-ATX')) {
      alerts.push('Selected Motherboard may require ATX clearance; Mini-ITX chassis recommended with ITX boards.');
    }
    if (selectedGpu.id === 'gpu-5090' && selectedCase.id === 'case-cybercube') {
      alerts.push('High-density fit: RTX 5090 tight clearance in compact chassis. Apex custom riser cable will be included.');
    }
    if (!isPowerSufficient) {
      alerts.push(`Power Alert: Estimated draw (${estimatedWattage}W) approaches PSU limit (${selectedPsu.wattage}W). Recommend 1000W+ PSU.`);
    }
    return alerts;
  }, [selectedCase, selectedMobo, selectedGpu, isPowerSufficient, estimatedWattage, selectedPsu]);

  // Price Calculation
  const totalPrice = useMemo(() => {
    const partsTotal = 
      selectedCase.price +
      selectedCpu.price +
      selectedGpu.price +
      selectedCooler.price +
      selectedMobo.price +
      selectedRam.price +
      selectedStorage.price +
      selectedPsu.price +
      selectedMonitor.price +
      selectedDesk.price +
      selectedKeyboard.price +
      selectedMouse.price +
      selectedAudio.price +
      selectedAmbience.price +
      selectedAssembly.price;
    return Number(partsTotal.toFixed(2));
  }, [
    selectedCase, selectedCpu, selectedGpu, selectedCooler, selectedMobo, 
    selectedRam, selectedStorage, selectedPsu, selectedMonitor, selectedDesk, 
    selectedKeyboard, selectedMouse, selectedAudio, selectedAmbience, selectedAssembly
  ]);

  // Dynamic Image Generation
  const battlestationImageDataUrl = useMemo(() => {
    return generateBattlestationImage({
      rigName: rigCustomName.trim() || 'TITAN Battlestation',
      themePrimary: selectedTheme.primary,
      themeSecondary: selectedTheme.secondary,
      caseName: selectedCase.name,
      gpuName: selectedGpu.name,
      cpuName: selectedCpu.name,
      hasMonitor: selectedMonitor.id !== 'mon-none',
      monitorName: selectedMonitor.name,
      hasDesk: selectedDesk.id !== 'desk-none',
      fpsCyberpunk: selectedGpu.fpsCyberpunk4k,
      totalWattage: estimatedWattage,
      creator: operatorTag.trim() || 'Operative'
    });
  }, [
    rigCustomName, selectedTheme, selectedCase, selectedGpu, selectedCpu, 
    selectedMonitor, selectedDesk, estimatedWattage, operatorTag
  ]);

  // Handle Add To Universal Cart
  const handleAddToCart = () => {
    const customProduct = {
      id: `rig-custom-${Date.now()}`,
      department: 'hardware',
      departmentName: 'CyberTech Rigs',
      itemType: 'physical',
      title: `⚡ Custom Rig: ${rigCustomName.trim() || 'TITAN Apex Battlestation'}`,
      studio: `${operatorTag.trim() || 'Operative'} x Apex Cybernetics`,
      price: totalPrice,
      originalPrice: Number((totalPrice * 1.1).toFixed(2)),
      discountPercent: 10,
      rating: 5.0,
      reviewCount: 1,
      category: 'Desktops',
      platforms: [
        selectedAssembly.name.includes('Pre-Built') ? 'Turnkey Assembled' : 'DIY Master Kit',
        selectedGpu.name.split(' ')[2] || 'RTX 5090',
        `${selectedCpu.name} / ${selectedRam.name.split(' ')[0]}`,
        selectedTheme.name
      ],
      coverImage: battlestationImageDataUrl,
      heroBanner: battlestationImageDataUrl,
      tags: [
        'Custom Rig', 
        selectedGpu.name, 
        selectedCpu.name, 
        selectedAssembly.badge
      ],
      features: [
        `Chassis: ${selectedCase.name} (${selectedCase.formFactor})`,
        `Core Specs: ${selectedCpu.name} • ${selectedGpu.name} • ${selectedRam.name}`,
        `Cooling & Power: ${selectedCooler.name} • ${selectedPsu.name}`,
        `Setup Addons: ${selectedMonitor.name} • ${selectedDesk.name}`,
        `Assembly: ${selectedAssembly.name}`
      ],
      description: `Bespoke custom-engineered battlestation authored by ${operatorTag}. Equipped with ${selectedCpu.name}, ${selectedGpu.name}, and calibrated in ${selectedTheme.name} RGB aesthetic.`,
      isCustomFormula: true, // triggers crisp vector display in cart
      customMeta: {
        emblem: '⚡',
        gpu: selectedGpu.name,
        cpu: selectedCpu.name,
        ram: selectedRam.name,
        storage: selectedStorage.name,
        creator: operatorTag,
        theme: selectedTheme.name,
        assembly: selectedAssembly.name
      }
    };

    addToCart(customProduct);

    // Audio & Confetti
    playWinSound('epic');
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: [selectedTheme.primary, '#00f0ff', '#ffffff']
      });
    } catch (e) {}

    addToast(
      'Battlestation Synthesized!',
      `"${customProduct.title}" added to your Universal Cart!`,
      'success'
    );

    handleClose();
    setIsCartOpen(true);
  };

  if (!isBattlestationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-6xl rounded-2xl bg-[#090a10] border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="px-5 py-4 border-b border-zinc-800 bg-[#0d0e17] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black font-cyber text-white tracking-wider uppercase">
                  Interactive PC Battlestation Studio
                </h3>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  APEX RIG BUILDER v4.2
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5 hidden sm:block">
                Configure next-gen silicon, verify thermal clearances, and customize full desk peripherals with zero friction.
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800 hover:border-zinc-700"
            title="Exit Studio (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 py-2.5 bg-[#0a0b12] border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('rig')}
            className={`px-4 py-2 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'rig'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>1. CORE PC RIG</span>
          </button>

          <button
            onClick={() => setActiveTab('peripherals')}
            className={`px-4 py-2 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'peripherals'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent'
            }`}
          >
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span>2. BATTLESTATION SETUP</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`px-4 py-2 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'branding'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent'
            }`}
          >
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span>3. ASSEMBLY & TUNING</span>
          </button>
        </div>

        {/* Modal Main Body (2 Columns on Desktop) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          
          {/* Left Column: Component Pickers (7 Cols) */}
          <div className="lg:col-span-7 p-5 space-y-6 border-b lg:border-b-0 lg:border-r border-zinc-800/80 overflow-y-auto">
            
            {/* TAB 1: CORE PC COMPONENTS */}
            {activeTab === 'rig' && (
              <div className="space-y-6">
                
                {/* 1. Case Picker */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>PC Chassis & Architecture</span>
                    </label>
                    <span className="text-[11px] font-mono text-cyan-400">${selectedCase.price}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CASES.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedCase(item)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedCase.id === item.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                            : 'bg-[#10111a] border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate">{item.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500">
                          <span>{item.formFactor}</span>
                          <span className="text-cyan-400 font-bold">${item.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Processor (CPU) Picker */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Processor (CPU)</span>
                    </label>
                    <span className="text-[11px] font-mono text-cyan-400">${selectedCpu.price}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CPUS.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedCpu(item)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedCpu.id === item.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                            : 'bg-[#10111a] border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate">{item.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1">{item.cores} • {item.clock}</p>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500">
                          <span>{item.tdp}W TDP</span>
                          <span className="text-cyan-400 font-bold">${item.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Graphics Card (GPU) Picker */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Graphics Accelerator (GPU)</span>
                    </label>
                    <span className="text-[11px] font-mono text-cyan-400">${selectedGpu.price}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {GPUS.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedGpu(item)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedGpu.id === item.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                            : 'bg-[#10111a] border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate">{item.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1">{item.vram}</p>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500">
                          <span className="text-emerald-400 font-bold">{item.fpsCyberpunk4k} FPS 4K</span>
                          <span className="text-cyan-400 font-bold">${item.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Cooling Solution */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-cyan-400" />
                      <span>Thermal & Liquid Cooling</span>
                    </label>
                    <span className="text-[11px] font-mono text-cyan-400">${selectedCooler.price}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {COOLING.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedCooler(item)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedCooler.id === item.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-white'
                            : 'bg-[#10111a] border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5 truncate">{item.fans}</span>
                        <div className="mt-1.5 text-[10px] font-mono text-cyan-400 font-bold">${item.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Motherboard & RAM Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Motherboard */}
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Motherboard
                    </label>
                    <select
                      value={selectedMobo.id}
                      onChange={(e) => setSelectedMobo(MOTHERBOARDS.find(m => m.id === e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      {MOTHERBOARDS.map(m => (
                        <option key={m.id} value={m.id}>
                          {m.name} (${m.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* RAM */}
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      System Memory (RAM)
                    </label>
                    <select
                      value={selectedRam.id}
                      onChange={(e) => setSelectedRam(RAM_OPTIONS.find(r => r.id === e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      {RAM_OPTIONS.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name} (${r.price})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 6. Storage & Power Supply Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Storage */}
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      High-Speed Storage (SSD)
                    </label>
                    <select
                      value={selectedStorage.id}
                      onChange={(e) => setSelectedStorage(STORAGE_OPTIONS.find(s => s.id === e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      {STORAGE_OPTIONS.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name} (${s.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PSU */}
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Power Supply Unit (PSU)
                    </label>
                    <select
                      value={selectedPsu.id}
                      onChange={(e) => setSelectedPsu(PSU_OPTIONS.find(p => p.id === e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      {PSU_OPTIONS.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} (${p.price})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: BATTLESTATION SETUP (MONITORS, DESK, PERIPHERALS) */}
            {activeTab === 'peripherals' && (
              <div className="space-y-6">
                
                {/* 1. Monitor Selection */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Monitor className="w-4 h-4 text-cyan-400" />
                      <span>Primary Display & Ultrawide Panel</span>
                    </label>
                    <span className="text-[11px] font-mono text-cyan-400">${selectedMonitor.price}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BATTLESTATION_PERIPHERALS.monitors.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedMonitor(item)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedMonitor.id === item.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                            : 'bg-[#10111a] border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate">{item.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">{item.specs}</p>
                        <div className="mt-2 text-[10px] font-mono text-cyan-400 font-bold">
                          {item.price === 0 ? 'Included / None' : `$${item.price}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Desk & Surface */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Desk Surface & Ergonomics
                    </label>
                    <span className="text-[11px] font-mono text-cyan-400">${selectedDesk.price}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {BATTLESTATION_PERIPHERALS.desks.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedDesk(item)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedDesk.id === item.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-white'
                            : 'bg-[#10111a] border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5 line-clamp-1">{item.specs}</span>
                        <div className="mt-1.5 text-[10px] font-mono text-cyan-400 font-bold">
                          {item.price === 0 ? 'None' : `$${item.price}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Keyboard & Mouse */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Keyboard */}
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Optical / Mechanical Keyboard
                    </label>
                    <select
                      value={selectedKeyboard.id}
                      onChange={(e) => setSelectedKeyboard(BATTLESTATION_PERIPHERALS.keyboards.find(k => k.id === e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      {BATTLESTATION_PERIPHERALS.keyboards.map(k => (
                        <option key={k.id} value={k.id}>
                          {k.name} {k.price > 0 ? `(+$${k.price})` : '(None)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mouse */}
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Ultralight Wireless Mouse
                    </label>
                    <select
                      value={selectedMouse.id}
                      onChange={(e) => setSelectedMouse(BATTLESTATION_PERIPHERALS.mice.find(m => m.id === e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      {BATTLESTATION_PERIPHERALS.mice.map(m => (
                        <option key={m.id} value={m.id}>
                          {m.name} {m.price > 0 ? `(+$${m.price})` : '(None)'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Audio & Ambient Lighting */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Audio */}
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Audio & Headset Gear
                    </label>
                    <select
                      value={selectedAudio.id}
                      onChange={(e) => setSelectedAudio(BATTLESTATION_PERIPHERALS.audio.find(a => a.id === e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      {BATTLESTATION_PERIPHERALS.audio.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.name} {a.price > 0 ? `(+$${a.price})` : '(None)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ambient Light */}
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Smart Ambient Room Lighting
                    </label>
                    <select
                      value={selectedAmbience.id}
                      onChange={(e) => setSelectedAmbience(BATTLESTATION_PERIPHERALS.ambience.find(a => a.id === e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      {BATTLESTATION_PERIPHERALS.ambience.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.name} {a.price > 0 ? `(+$${a.price})` : '(None)'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: BRANDING, RGB & ASSEMBLY */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                
                {/* 1. RGB Theme Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-cyan-400" />
                    <span>Synchronized RGB Ambient Theme</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {RGB_THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme)}
                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                          selectedTheme.id === theme.id
                            ? 'bg-zinc-900 border-white text-white shadow-lg'
                            : 'bg-[#10111a] border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div 
                          className="w-5 h-5 rounded-full shrink-0 shadow-sm border border-white/20"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <span className="text-xs font-bold truncate">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Custom Identity Stamp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Rig Custom Designation
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      value={rigCustomName}
                      onChange={(e) => setRigCustomName(e.target.value)}
                      placeholder="e.g. TITAN-X Liquid Core"
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider">
                      Author / Operative Tag
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={operatorTag}
                      onChange={(e) => setOperatorTag(e.target.value)}
                      placeholder="e.g. Ghost_Operator"
                      className="w-full px-3 py-2 rounded-xl bg-[#10111a] border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                {/* 3. Assembly Mode Picker */}
                <div className="space-y-2.5">
                  <label className="text-xs font-cyber font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-cyan-400" />
                    <span>Fulfillment & Assembly Mode</span>
                  </label>
                  <div className="space-y-2.5">
                    {ASSEMBLY_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedAssembly(opt)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          selectedAssembly.id === opt.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                            : 'bg-[#10111a] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{opt.name}</span>
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {opt.price === 0 ? 'FREE' : `+$${opt.price}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1">{opt.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Column: Live Mockup, Benchmarks, Wattage & Add to Cart (5 Cols) */}
          <div className="lg:col-span-5 p-5 bg-[#07080d] flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              
              {/* Dynamic Mockup Card */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0a0b12] overflow-hidden shadow-2xl relative group">
                <img 
                  src={battlestationImageDataUrl} 
                  alt={rigCustomName}
                  className="w-full aspect-[4/3] object-contain bg-[#07080e]"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-black/80 text-cyan-400 border border-cyan-500/40 backdrop-blur-md">
                    LIVE RENDERING
                  </span>
                </div>
              </div>

              {/* Wattage & Headroom Meter */}
              <div className="p-3.5 rounded-xl bg-[#11121c] border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Estimated System Draw</span>
                  </span>
                  <span className="font-mono font-bold text-white">
                    {estimatedWattage}W / {selectedPsu.wattage}W
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      wattageHeadroom > 20 ? 'bg-emerald-500' : (wattageHeadroom > 5 ? 'bg-amber-500' : 'bg-red-500')
                    }`}
                    style={{ width: `${Math.min(100, Math.round((estimatedWattage / selectedPsu.wattage) * 100))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={isPowerSufficient ? 'text-emerald-400' : 'text-red-400'}>
                    {isPowerSufficient ? `Optimal Headroom (+${wattageHeadroom}%)` : 'PSU Upgrade Recommended'}
                  </span>
                  <span className="text-zinc-500">Tier 80+ Platinum Efficiency</span>
                </div>
              </div>

              {/* Simulated Gaming Performance Benchmarks */}
              <div className="p-3.5 rounded-xl bg-[#11121c] border border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-cyber font-bold text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Simulated Gaming Framerates</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Blackwell Engine</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-[#08080d] border border-zinc-800">
                    <span className="text-[9px] font-mono text-zinc-400 block truncate">Cyberpunk 4K</span>
                    <span className="text-sm font-black font-mono text-emerald-400">
                      {selectedGpu.fpsCyberpunk4k} FPS
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#08080d] border border-zinc-800">
                    <span className="text-[9px] font-mono text-zinc-400 block truncate">Warzone 1440p</span>
                    <span className="text-sm font-black font-mono text-cyan-400">
                      {selectedGpu.fpsWarzone1440} FPS
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#08080d] border border-zinc-800">
                    <span className="text-[9px] font-mono text-zinc-400 block truncate">CS2 1080p</span>
                    <span className="text-sm font-black font-mono text-fuchsia-400">
                      {selectedGpu.fpsCs21080} FPS
                    </span>
                  </div>
                </div>
              </div>

              {/* Compatibility Status Pill */}
              {compatibilityAlerts.length > 0 ? (
                <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300 text-[11px] font-mono space-y-1">
                  {compatibilityAlerts.map((msg, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span>100% Certified Compatible. Zero thermal or physical clearance bottlenecks.</span>
                </div>
              )}

            </div>

            {/* Bottom Add to Cart Summary & Action */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    Total Battlestation Package
                  </span>
                  <span className="text-[11px] text-zinc-500 line-through">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-heading text-white text-glow">
                    ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 block">
                    Save ${(totalPrice * 0.1).toFixed(2)} (Universal Bundle 10% Off)
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-cyber font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.4)] border border-cyan-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SYNTHESIZE RIG & ADD TO CART</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-500 text-center">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" /> 3-Year Hardware Warranty
                </span>
                <span>•</span>
                <span>White-Glove Insured Freight Delivery</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
