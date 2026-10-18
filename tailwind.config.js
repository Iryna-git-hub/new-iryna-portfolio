/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './script.js'],
  theme: {
    extend: {
      colors: {
        pink: { DEFAULT: '#f03e71', deep: '#c82152' },
        ink: '#1a1e1f',
        char: '#2a3031',
        steel: '#9aa3a6',
        mist: '#dce1e7',
        sun: '#ffd23f',
        cream: '#fff4c9',
        paper: '#f5f5f5',
        slate2: '#2a3132',
        muted: '#5f6b6e',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Helvetica Neue"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        cond: ['"Barlow Condensed"', '"Arial Narrow"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-white':
          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        'grid-ink':
          'linear-gradient(rgba(26,30,31,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(26,30,31,0.12) 1px, transparent 1px)',
        'grid-faint':
          'linear-gradient(rgba(26,30,31,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,30,31,0.045) 1px, transparent 1px)',
        'hatch-white': 'repeating-linear-gradient(45deg, rgba(255,255,255,0.45) 0 1px, transparent 1px 8px)',
        'fill-pink': 'linear-gradient(#f03e71, #f03e71)',
      },
      backgroundSize: { cell: '20px 20px' },
      backgroundPosition: { cell: '-1px -1px' },
      keyframes: {
        lensIdle: {
          '0%, 100%': { clipPath: 'circle(140px at 70% 40%)' },
          '33%': { clipPath: 'circle(165px at 56% 64%)' },
          '66%': { clipPath: 'circle(130px at 82% 70%)' },
        },
        drift: {
          '0%, 100%': { translate: '0 0', rotate: '0deg' },
          '25%': { translate: '6px -10px', rotate: '1.2deg' },
          '50%': { translate: '-4px -4px', rotate: '-0.8deg' },
          '75%': { translate: '-8px 6px', rotate: '1deg' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '35%': { opacity: '0' },
          '55%': { opacity: '1' },
          '70%': { opacity: '0' },
          '78%': { opacity: '1' },
        },
        softPulse: { '50%': { opacity: '0.2' } },
        caret: { '50%': { opacity: '0' } },
        marq: { to: { transform: 'translateX(-50%)' } },
        rowHi: {
          '0%, 19.9%': { backgroundColor: 'rgba(26,30,31,0.14)' },
          '20%, 100%': { backgroundColor: 'transparent' },
        },
        drawU: {
          '0%, 10%': { strokeDashoffset: '1' },
          '35%, 80%': { strokeDashoffset: '0' },
          '95%, 100%': { strokeDashoffset: '-1' },
        },
        curA: {
          '0%, 100%': { left: '14%', top: '34%' },
          '14%, 24%': { left: '44%', top: '48%' },
          '38%, 48%': { left: '16%', top: '80%' },
          '62%, 72%': { left: '66%', top: '84%' },
          '86%, 92%': { left: '30%', top: '28%' },
        },
        curB: {
          '0%, 100%': { left: '78%', top: '30%' },
          '16%, 26%': { left: '58%', top: '62%' },
          '40%, 50%': { left: '34%', top: '76%' },
          '64%, 74%': { left: '84%', top: '58%' },
          '88%, 94%': { left: '62%', top: '26%' },
        },
        click: {
          '0%, 13%, 15.5%, 37%, 39.5%, 61%, 63.5%, 85%, 87.5%, 100%': { transform: 'scale(0)', opacity: '0' },
          '14%, 38%, 62%, 86%': { transform: 'scale(0)', opacity: '0.9' },
          '15%, 39%, 63%, 87%': { transform: 'scale(1)', opacity: '0' },
        },
        nudge: { '0%, 60%, 100%': { transform: 'translateX(0)' }, '30%': { transform: 'translateX(6px)' } },
        typeIn: { to: { opacity: '1' } },
        slideUp: { to: { transform: 'translateY(-100%)' } },
        reveal: { from: { opacity: '0', transform: 'translateY(56px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        'lens-idle': 'lensIdle 11s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite',
        blink: 'blink 4.2s steps(1, end) infinite',
        'soft-pulse': 'softPulse 1.6s ease-in-out infinite',
        caret: 'caret 1s steps(1, end) infinite',
        marq: 'marq 90s linear infinite',
        'row-hi': 'rowHi 7.5s steps(1, end) infinite',
        'draw-u': 'drawU 7s cubic-bezier(.6,0,.2,1) infinite',
        'cur-a': 'curA 16s cubic-bezier(.65,0,.35,1) infinite',
        'cur-b': 'curB 19s cubic-bezier(.65,0,.35,1) infinite',
        click: 'click 16s ease-out infinite',
        nudge: 'nudge 1.8s ease-in-out infinite',
        'type-in': 'typeIn .01s steps(1, end) forwards',
        'slide-up': 'slideUp .8s cubic-bezier(.7,0,.2,1) 1.9s forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    plugin(function ({ addComponents, addBase }) {
      addBase({
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
          },
        },
      });
      addComponents({
        // Figma-style selection handle (corner / mid-edge square)
        '.handle': {
          position: 'absolute',
          width: '6px',
          height: '6px',
          border: '1px solid',
          boxSizing: 'border-box',
        },
        // Crop marks around project screenshots
        '.crop': {
          position: 'absolute',
          width: '18px',
          height: '18px',
          borderColor: 'rgba(26,30,31,0.35)',
          borderStyle: 'solid',
          borderWidth: '0',
        },
        // Skill tag with a Figma-like selection frame on hover
        '.chip': {
          position: 'relative',
          display: 'inline-block',
          transition: 'background-color .35s ease, color .35s ease',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            pointerEvents: 'none',
            opacity: '0',
            transform: 'scale(.92)',
            transition: 'opacity .3s ease, transform .35s cubic-bezier(.2,.8,.2,1)',
          },
          '&::before': { inset: '-5px', border: '1px solid #f03e71' },
          '&::after': {
            inset: '-8px',
            backgroundImage:
              'linear-gradient(#f03e71,#f03e71), linear-gradient(#f03e71,#f03e71), linear-gradient(#f03e71,#f03e71), linear-gradient(#f03e71,#f03e71)',
            backgroundSize: '6px 6px',
            backgroundPosition: '0 0, 100% 0, 0 100%, 100% 100%',
            backgroundRepeat: 'no-repeat',
          },
          '&:hover': { backgroundColor: '#fff4c9', color: '#1a1e1f' },
          '&:hover::before, &:hover::after': { opacity: '1', transform: 'scale(1)' },
        },
        // Menu link with an underline drawn on hover
        '.nav-link': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '2px',
            right: '2px',
            bottom: '5px',
            height: '1.5px',
            background: 'currentColor',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform .35s cubic-bezier(.2,.8,.2,1)',
          },
          '&:hover::after': { transform: 'scaleX(1)' },
        },
        // Fade-up on scroll (only where scroll-driven animations are supported)
        '@supports (animation-timeline: view())': {
          '.reveal': {
            animation: 'reveal linear both',
            animationTimeline: 'view()',
            animationRange: 'entry 0% cover 28%',
          },
        },
      });
    }),
  ],
};
