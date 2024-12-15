import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', ...fontFamily.sans],
        serif: ['var(--font-libre-baskerville)', ...fontFamily.serif],
      },
      colors: {
        whiteish: 'rgb(var(--whiteish))',
        blackish: 'rgb(var(--blackish))',
        'light-blue': 'rgb(var(--light-blue))',
        'dark-blue': 'rgb(var(--dark-blue))',
        'red-orange': 'rgb(var(--red-orange))',

        background: 'rgb(var(--whiteish))',
        foreground: 'rgb(var(--blackish))',
        card: {
          DEFAULT: 'rgb(var(--whiteish))',
          foreground: 'rgb(var(--blackish))',
        },
        popover: {
          DEFAULT: 'rgb(var(--whiteish))',
          foreground: 'rgb(var(--blackish))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'rgb(var(--blackish))',
        input: 'hsl(var(--input))',
        ring: 'rgb(var(--blackish))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      lineHeight: {
        tightest: '1.1',
        tighter: '1.2',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config
