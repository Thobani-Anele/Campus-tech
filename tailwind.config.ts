import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ct-dark': '#0a0e27',
        'ct-darker': '#050812',
        'ct-accent-blue': '#00d9ff',
        'ct-accent-violet': '#b026ff',
        'ct-accent-cyan': '#00f0ff',
        'ct-glow-blue': '#0088ff',
        'ct-card-bg': '#111829',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(176, 38, 255, 0.1) 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-violet': '0 0 20px rgba(176, 38, 255, 0.3)',
        'glow-cyan': '0 0 30px rgba(0, 240, 255, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 20px rgba(0, 217, 255, 0.5))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
