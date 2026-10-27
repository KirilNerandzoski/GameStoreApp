/**
 * Generates an SVG Data URL representing the custom PC Battlestation
 * configured by the user in the Battlestation Builder.
 */
export function generateBattlestationImage({
  rigName = 'TITAN Apex Rig',
  themePrimary = '#00f0ff',
  themeSecondary = '#0066ff',
  caseName = 'Obsidian Dual-Chamber',
  gpuName = 'RTX 5090 OC',
  cpuName = 'Ryzen 9 9950X3D',
  hasMonitor = true,
  monitorName = 'Specter 49" QD-OLED',
  hasDesk = true,
  fpsCyberpunk = 145,
  totalWattage = 750,
  creator = 'Operative'
}) {
  const safeRigName = (rigName || 'Custom Cyber Rig').replace(/[<>&"']/g, '').slice(0, 24);
  const safeGpu = (gpuName || 'RTX 5090').replace(/[<>&"']/g, '').slice(0, 22);
  const safeCpu = (cpuName || 'Ryzen 9').replace(/[<>&"']/g, '').slice(0, 20);
  const safeCreator = (creator || 'Apex Operative').replace(/[<>&"']/g, '').slice(0, 16);

  const isUltrawide = monitorName.includes('49"') || monitorName.includes('Curved');
  const isDual = monitorName.includes('Dual');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
    <defs>
      <linearGradient id="wallGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${themePrimary}" stop-opacity="0.3"/>
        <stop offset="60%" stop-color="${themeSecondary}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#07080e" stop-opacity="1"/>
      </linearGradient>

      <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#18181b"/>
        <stop offset="40%" stop-color="#121216"/>
        <stop offset="100%" stop-color="#090a0f"/>
      </linearGradient>

      <linearGradient id="caseGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1f2029"/>
        <stop offset="50%" stop-color="#0f1017"/>
        <stop offset="100%" stop-color="#08080c"/>
      </linearGradient>

      <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
        <stop offset="40%" stop-color="#ffffff" stop-opacity="0.02"/>
        <stop offset="100%" stop-color="${themePrimary}" stop-opacity="0.15"/>
      </linearGradient>

      <linearGradient id="monitorScreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0a101d"/>
        <stop offset="50%" stop-color="#111827"/>
        <stop offset="100%" stop-color="#030712"/>
      </linearGradient>

      <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Room Background -->
    <rect width="600" height="450" fill="#07080e"/>

    <!-- Ambient Wall Bias Light -->
    <rect x="0" y="0" width="600" height="340" fill="url(#wallGlow)"/>
    <circle cx="300" cy="160" r="180" fill="${themePrimary}" opacity="0.18" filter="url(#neonGlow)"/>

    <!-- Hex Wall Accents -->
    <polygon points="120,70 145,55 170,70 170,100 145,115 120,100" fill="none" stroke="${themePrimary}" stroke-opacity="0.25" stroke-width="1.5"/>
    <polygon points="175,100 200,85 225,100 225,130 200,145 175,130" fill="none" stroke="${themePrimary}" stroke-opacity="0.2" stroke-width="1.5"/>
    <polygon points="430,70 455,55 480,70 480,100 455,115 430,100" fill="none" stroke="${themePrimary}" stroke-opacity="0.25" stroke-width="1.5"/>

    <!-- Desk Surface -->
    ${hasDesk ? `
      <!-- Desk Edge & RGB Underside -->
      <polygon points="20,290 580,290 590,345 10,345" fill="url(#deskGrad)" stroke="#27272a" stroke-width="1.5"/>
      <line x1="20" y1="290" x2="580" y2="290" stroke="${themePrimary}" stroke-width="2" filter="url(#neonGlow)"/>
      
      <!-- Desk Legs / Frame -->
      <rect x="50" y="345" width="22" height="105" fill="#18181b" stroke="#27272a"/>
      <rect x="528" y="345" width="22" height="105" fill="#18181b" stroke="#27272a"/>
      
      <!-- Giant Desk Mat -->
      <rect x="110" y="296" width="310" height="42" rx="4" fill="#0b0c10" stroke="#1f2937" stroke-width="1"/>
      <line x1="110" y1="337" x2="420" y2="337" stroke="${themePrimary}" stroke-opacity="0.5" stroke-width="1"/>

      <!-- Keyboard & Mouse on Pad -->
      <rect x="145" y="303" width="130" height="26" rx="3" fill="#18181b" stroke="${themePrimary}" stroke-opacity="0.6" stroke-width="1"/>
      <rect x="150" y="306" width="120" height="20" rx="2" fill="#27272a"/>
      <!-- Mouse -->
      <ellipse cx="320" cy="316" rx="9" ry="14" fill="#18181b" stroke="${themePrimary}" stroke-width="1"/>
    ` : ''}

    <!-- MONITOR DISPLAY -->
    ${hasMonitor ? (
      isUltrawide ? `
        <!-- Ultrawide Curved Monitor -->
        <!-- Stand -->
        <polygon points="245,290 275,220 285,220 315,290" fill="#18181b" stroke="#27272a"/>
        <!-- Panel with Curve -->
        <rect x="80" y="100" width="360" height="155" rx="8" fill="url(#monitorScreen)" stroke="${themePrimary}" stroke-width="2" filter="url(#neonGlow)"/>
        <!-- Screen Game Cyber Graphic -->
        <circle cx="260" cy="170" r="45" fill="none" stroke="${themePrimary}" stroke-width="1.5" stroke-dasharray="4,4"/>
        <text x="260" y="174" font-family="monospace" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">ULTRAWIDE 240Hz</text>
        <text x="260" y="190" font-family="monospace" font-size="9" fill="${themePrimary}" text-anchor="middle">${fpsCyberpunk} FPS • 4K HDR</text>
      ` : (isDual ? `
        <!-- Dual Monitors -->
        <!-- Left Panel -->
        <rect x="70" y="110" width="170" height="135" rx="5" fill="url(#monitorScreen)" stroke="${themePrimary}" stroke-width="1.5"/>
        <!-- Right Panel -->
        <rect x="245" y="110" width="170" height="135" rx="5" fill="url(#monitorScreen)" stroke="${themePrimary}" stroke-width="1.5"/>
        <text x="155" y="175" font-family="monospace" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">PRIMARY 360Hz</text>
        <text x="330" y="175" font-family="monospace" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">DISCORD / OBS</text>
      ` : `
        <!-- Single Big 4K Monitor -->
        <rect x="250" y="220" width="20" height="70" fill="#18181b"/>
        <rect x="110" y="95" width="300" height="175" rx="6" fill="url(#monitorScreen)" stroke="${themePrimary}" stroke-width="2"/>
        <text x="260" y="180" font-family="monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">4K 165Hz HDR</text>
      `)
    ) : ''}

    <!-- PC RIG CHASSIS (ON DESK) -->
    <g transform="translate(425, 120)">
      <!-- Case Outline -->
      <rect x="0" y="0" width="135" height="185" rx="8" fill="url(#caseGrad)" stroke="${themePrimary}" stroke-width="2" filter="url(#neonGlow)"/>
      
      <!-- Tempered Glass Window -->
      <rect x="6" y="8" width="123" height="169" rx="5" fill="#000000" fill-opacity="0.85" stroke="#27272a"/>
      <rect x="6" y="8" width="123" height="169" rx="5" fill="url(#glassReflection)"/>

      <!-- Liquid Cooler / CPU Waterblock with OLED -->
      <circle cx="65" cy="58" r="16" fill="#18181b" stroke="${themePrimary}" stroke-width="2"/>
      <circle cx="65" cy="58" r="8" fill="${themePrimary}" opacity="0.8" filter="url(#neonGlow)"/>
      <line x1="55" y1="46" x2="35" y2="25" stroke="${themePrimary}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="75" y1="46" x2="95" y2="25" stroke="${themeSecondary}" stroke-width="2.5" stroke-linecap="round"/>

      <!-- RAM Sticks RGB -->
      <rect x="90" y="44" width="3" height="24" rx="1" fill="${themePrimary}" filter="url(#neonGlow)"/>
      <rect x="95" y="44" width="3" height="24" rx="1" fill="${themePrimary}" filter="url(#neonGlow)"/>

      <!-- Massive GPU Bracket -->
      <rect x="15" y="105" width="105" height="26" rx="4" fill="#18181b" stroke="${themePrimary}" stroke-width="1.5"/>
      <!-- Fans on GPU -->
      <circle cx="36" cy="118" r="8" fill="#090a0f" stroke="${themePrimary}" stroke-width="1"/>
      <circle cx="67" cy="118" r="8" fill="#090a0f" stroke="${themePrimary}" stroke-width="1"/>
      <circle cx="98" cy="118" r="8" fill="#090a0f" stroke="${themePrimary}" stroke-width="1"/>

      <!-- Front Intake Fans RGB Rings -->
      <circle cx="120" cy="40" r="10" fill="none" stroke="${themePrimary}" stroke-width="1.5" opacity="0.6"/>
      <circle cx="120" cy="80" r="10" fill="none" stroke="${themePrimary}" stroke-width="1.5" opacity="0.6"/>
      <circle cx="120" cy="120" r="10" fill="none" stroke="${themePrimary}" stroke-width="1.5" opacity="0.6"/>

      <!-- PSU Shroud at bottom -->
      <rect x="6" y="145" width="123" height="32" rx="3" fill="#0e0f14"/>
      <text x="67" y="165" font-family="monospace" font-size="7.5" font-weight="900" fill="${themePrimary}" text-anchor="middle" letter-spacing="1">APEX CRYOPLATE</text>
    </g>

    <!-- BOTTOM SPECS / HUD OVERLAY BANNER -->
    <rect x="0" y="390" width="600" height="60" fill="#07080e" fill-opacity="0.95" stroke="#1f2937" stroke-width="1"/>
    
    <!-- Title & Builder Info -->
    <text x="24" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#ffffff">${safeRigName}</text>
    <text x="24" y="433" font-family="monospace" font-size="9" fill="${themePrimary}">OP: ${safeCreator} • ${safeCpu} + ${safeGpu}</text>

    <!-- Performance & Power Badges -->
    <g transform="translate(390, 402)">
      <!-- FPS Metric -->
      <rect x="0" y="0" width="95" height="34" rx="5" fill="#11121c" stroke="${themePrimary}" stroke-opacity="0.4"/>
      <text x="47" y="14" font-family="monospace" font-size="7.5" fill="#9ca3af" text-anchor="middle">CYBERPUNK 4K</text>
      <text x="47" y="28" font-family="monospace" font-size="11" font-weight="900" fill="#10b981" text-anchor="middle">${fpsCyberpunk} FPS</text>

      <!-- Power Metric -->
      <rect x="105" y="0" width="95" height="34" rx="5" fill="#11121c" stroke="#374151"/>
      <text x="152" y="14" font-family="monospace" font-size="7.5" fill="#9ca3af" text-anchor="middle">EST. DRAW</text>
      <text x="152" y="28" font-family="monospace" font-size="11" font-weight="900" fill="#f59e0b" text-anchor="middle">${totalWattage}W</text>
    </g>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
