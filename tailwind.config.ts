import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['var(--font-noto-sans)', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        logo:  ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          black:  '#111111',
          white:  '#ffffff',
          gray:   '#888888',
          light:  '#f8f8f8',
          border: '#e5e5e5',
        },
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}

export default config
