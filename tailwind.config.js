export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f0f1e',
          800: '#1a1a2e',
          700: '#16213e',
          600: '#0f3460',
        },
        neon: {
          cyan: '#00d4ff',
          purple: '#7c3aed',
          blue: '#0099ff',
          pink: '#ff006e',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        fadeInDown: 'fadeInDown 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(0, 212, 255, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        glass: '10px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 212, 255, 0.5)',
        glowPurple: '0 0 30px rgba(124, 58, 237, 0.4)',
        glowPink: '0 0 30px rgba(255, 0, 110, 0.3)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
