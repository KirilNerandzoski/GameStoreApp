/**
 * Generates an SVG Data URL representing the exact customized CyberFuel energy tub
 * that the user designed in the Formula Lab.
 */
export function generateTubImage({
  formulaName = 'Aim-Lock Protocol',
  primaryColor = '#ff5500',
  secondaryColor = '#00f0ff',
  primaryFlavorName = 'Sour Glitch',
  secondaryFlavorName = 'Peach Nectar',
  emblem = '⚡',
  caffeine = 140,
  creator = 'Valkyrie_99',
  finishName = 'Matte Obsidian'
}) {
  const safeName = (formulaName || 'Custom Overclock')
    .replace(/[<>&"']/g, '')
    .slice(0, 20);
  const safeCreator = (creator || 'Operative')
    .replace(/[<>&"']/g, '')
    .slice(0, 16);
  const safeFlavor = (primaryFlavorName || 'Custom Blend')
    .replace(/[<>&"']/g, '')
    .slice(0, 22);

  // Chassis base shades
  let chassisGradientStart = '#18181b';
  let chassisGradientEnd = '#09090b';
  let chassisStroke = primaryColor;

  if (finishName.toLowerCase().includes('chrome')) {
    chassisGradientStart = '#3f3f46';
    chassisGradientEnd = '#18181b';
    chassisStroke = '#bf00ff';
  } else if (finishName.toLowerCase().includes('toxic') || finishName.toLowerCase().includes('neon')) {
    chassisGradientStart = '#062e16';
    chassisGradientEnd = '#02150a';
    chassisStroke = '#22c55e';
  } else if (finishName.toLowerCase().includes('syndicate') || finishName.toLowerCase().includes('crimson')) {
    chassisGradientStart = '#35080c';
    chassisGradientEnd = '#180406';
    chassisStroke = '#ff1a35';
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400" width="320" height="400">
    <defs>
      <linearGradient id="bgGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${secondaryColor || primaryColor}" stop-opacity="0.08"/>
      </linearGradient>
      <linearGradient id="chassisGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${chassisGradientStart}"/>
        <stop offset="50%" stop-color="#07080d"/>
        <stop offset="100%" stop-color="${chassisGradientEnd}"/>
      </linearGradient>
      <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#27272a"/>
        <stop offset="100%" stop-color="#090a0f"/>
      </linearGradient>
      <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="10" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Canvas Background -->
    <rect width="320" height="400" fill="#07080e"/>

    <!-- Ambient Aura -->
    <circle cx="160" cy="205" r="115" fill="url(#bgGlow)" filter="url(#neonBlur)"/>

    <!-- Tub Body -->
    <rect x="65" y="85" width="190" height="265" rx="22" fill="url(#chassisGrad)" stroke="${chassisStroke}" stroke-width="2.5"/>

    <!-- Lid Neck & Cap -->
    <rect x="85" y="65" width="150" height="28" rx="7" fill="url(#lidGrad)" stroke="#3f3f46" stroke-width="1.5"/>
    <rect x="100" y="58" width="120" height="10" rx="3" fill="#18181b"/>
    <circle cx="160" cy="79" r="4.5" fill="${primaryColor}" filter="url(#neonBlur)"/>

    <!-- Label Container -->
    <rect x="75" y="115" width="170" height="205" rx="14" fill="#000000" fill-opacity="0.75" stroke="${primaryColor}" stroke-opacity="0.4" stroke-width="1.5"/>

    <!-- Top Neon Stripe -->
    <rect x="75" y="115" width="170" height="5" fill="${primaryColor}"/>

    <!-- Emblem Symbol -->
    <text x="160" y="168" font-size="38" text-anchor="middle" dominant-baseline="middle">${emblem || '⚡'}</text>

    <!-- 40 Servings Badge -->
    <rect x="110" y="185" width="100" height="15" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="0.8"/>
    <text x="160" y="196" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="800" letter-spacing="1" fill="#e4e4e7" text-anchor="middle">40 SERVINGS</text>

    <!-- Formula Name -->
    <text x="160" y="228" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">${safeName}</text>
    <text x="160" y="246" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="700" fill="${primaryColor}" text-anchor="middle">${safeFlavor}</text>

    <!-- Bottom Specs & Metadata -->
    <line x1="85" y1="272" x2="235" y2="272" stroke="#27272a" stroke-width="1"/>
    <text x="90" y="290" font-family="monospace" font-size="7.5" fill="#a1a1aa">OP: ${safeCreator}</text>
    <text x="230" y="290" font-family="monospace" font-size="8" font-weight="bold" fill="#10b981" text-anchor="end">${caffeine}mg • 0 SUGAR</text>

    <!-- Bottom Rim -->
    <rect x="75" y="340" width="170" height="6" rx="3" fill="#18181b"/>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
