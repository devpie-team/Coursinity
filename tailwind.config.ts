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
      fontFamily: {
        sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        h1: ['5rem', { lineHeight: '5rem', fontWeight: '400' }],
        h2: ['4rem', { lineHeight: '4.8rem', fontWeight: '400' }],
        h3: ['2.625rem', { lineHeight: '3.4125rem', fontWeight: '400' }],
        h4: ['2rem', { lineHeight: '2.5rem', fontWeight: '400' }],
        h5: ['1.5rem', { lineHeight: '2.1rem', fontWeight: '400' }],
        h6: ['1.5rem', { lineHeight: '2.1rem', fontWeight: '400' }],
        body1: ['1.25rem', { lineHeight: '1.875rem', fontWeight: '400' }],
        body2: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        body3: ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        body4: ['0.875rem', { lineHeight: '0.875rem', fontWeight: '400' }],
        caption: ['1.875rem', { lineHeight: '2.25rem', fontWeight: '400' }]
      },
      colors: {
        black: '#0D0D0D',
        white: '#FFFFFF',
        'primary-green': '#02B5AC',
        'primary-purple': '#A578F2',
        'primary-blue': '#1C8DC1',
        'primary-yellow': '#FDE800',
        'secondary-100': '#F6F1FE',
        'secondary-200': '#E4EDF2',
        'secondary-300': '#F9FAFB',
        'secondary-400': '#D0D5DD'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config
