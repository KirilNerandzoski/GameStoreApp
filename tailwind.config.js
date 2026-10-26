/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070709',
          card: '#0e0f14',
          'card-hover': '#161722',
          border: 'rgba(255, 36, 66, 0.18)',
          'border-active': 'rgba(255, 36, 66, 0.6)',
          red: {
            DEFAULT: '#ff1a35',
            neon: '#ff2a4b',
            crimson: '#e10626',
            dark: '#8b0015',
            muted: '#3b0d14'
          },
          silver: '#e4e4eb',
          muted: '#8b8e9f'
        }
      },
      boxShadow: {
        'neon-red': '0 0 20px -3px rgba(255, 26, 53, 0.5), 0 0 8px -2px rgba(255, 26, 53, 0.3)',
        'neon-red-lg': '0 0 35px -5px rgba(255, 26, 53, 0.7), 0 0 15px -2px rgba(255, 26, 53, 0.5)',
        'neon-glow': 'inset 0 0 15px rgba(255, 26, 53, 0.2), 0 0 20px rgba(255, 26, 53, 0.35)',
        'dark-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.75)'
      },
      fontFamily: {
        gaming: ['"Rajdhani"', 'system-ui', 'sans-serif'],
        display: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(255, 26, 53, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 18px rgba(255, 26, 53, 0.9))' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
