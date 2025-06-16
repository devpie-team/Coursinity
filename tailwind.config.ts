import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      animation: {
        slideRight: 'slide-right 20s linear infinite'
      },
      fontFamily: {
        sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        h1: ['80px', { lineHeight: '80px', fontWeight: '400', letterSpacing: '-0.03em' }],
        h2: ['64px', { lineHeight: '120%', fontWeight: '400', letterSpacing: '-0.04em' }],
        h3: ['42px', { lineHeight: '130%', fontWeight: '400', letterSpacing: '-0.04em' }],
        h4: ['32px', { lineHeight: '40px', fontWeight: '400' }],
        h5: ['30px', { lineHeight: '120%', fontWeight: '400' }],
        h6: ['24px', { lineHeight: '33.6px', fontWeight: '400' }],
        body1: ['20px', { lineHeight: '30px', fontWeight: '400' }],
        body2: ['18px', { lineHeight: '28px', fontWeight: '400' }],
        body3: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        body4: ['14px', { lineHeight: '24px', fontWeight: '400' }],
        caption: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        button: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        subtitle: ['13px', { lineHeight: '13px', fontWeight: '400' }]
      },
      colors: {
        black: '#0D0D0D',
        white: '#FFFFFF',
        'primary-green': '#02B5AC',
        'primary-purple': '#A578F2',
        'primary-blue': '#1C8DC1',
        'primary-yellow': '#FDE800',
        'secondary-purple': '#8759D5',
        'secondary-100': '#F6F1FE',
        'secondary-200': '#E4EDF2',
        'secondary-300': '#F9FAFB',
        'secondary-400': '#D0D5DD',
        'description': '#6E6E6E'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },

      backgroundImage: {
        'custom-gradient': `radial-gradient(
          ellipse 91.85% 92.48% at 10.11% 28.24%,
          rgba(30, 141, 194, 0.64) 8%,
          rgba(165, 120, 242, 0.64) 35%,
          rgba(30, 141, 194, 0.64) 100%
        )`
      },
      screens: {
        'min1150': '1150px',
        
      }
    }
  },
  safelist: [
    { pattern: /^h-.*/ },
    { pattern: /^min-h-.*/ },
    { pattern: /^max-h-.*/ },
    { pattern: /^w-.*/ },
    { pattern: /^min-w-.*/ },
    { pattern: /^max-w-.*/ },
    'min-[1150px]:hidden'
  ],
  plugins: [require('tailwindcss-animate')]
} satisfies Config
