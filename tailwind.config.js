/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#022417',
          forest: '#043826',
          deep: '#064E3B',
          primary: '#0A5C36',
          emerald: '#0D7B48',
          lime: '#84E21D',
          limeHover: '#73C815',
          accent: '#22C55E',
          surface: '#F8F9F7',
          warm: '#F3F4ED',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
          text: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(6, 78, 59, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(6, 78, 59, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'floating': '0 10px 30px -5px rgba(6, 78, 59, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.08)',
        'action': '0 4px 14px 0 rgba(132, 226, 29, 0.39)',
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
