/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Explore Stoneham Brand Colors
        'stoneham-green': '#2A6F4D',
        'lakeside-blue': '#007B9E',
        'beacon-gold': '#F4A300',
        'autumn-brick': '#D95D39',
        'community-sage': '#93C47D',
        'sky-tint': '#D2E5F1',
        'birch-white': '#F7F7F7',
        'granite-gray': '#404040',
        
        // Semantic color mappings
        primary: {
          DEFAULT: '#2A6F4D',
          hover: '#1F5A3A',
        },
        secondary: {
          DEFAULT: '#007B9E',
          hover: '#006B8A',
        },
        accent: {
          DEFAULT: '#F4A300',
          hover: '#E59400',
        },
        success: '#93C47D',
        warning: '#D95D39',
        background: '#F7F7F7',
        foreground: '#404040',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.2' }],
        'sm': ['0.875rem', { lineHeight: '1.4' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.2' }],
        '2xl': ['1.5rem', { lineHeight: '1.2' }],
        '3xl': ['2rem', { lineHeight: '1.2' }],
        '4xl': ['2.5rem', { lineHeight: '1.2' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'featured': '0 4px 12px rgba(0, 123, 158, 0.15)',
        'featured-hover': '0 6px 16px rgba(0, 123, 158, 0.2)',
      },
      maxWidth: {
        'container': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    // Custom component classes
    function({ addComponents, theme }) {
      addComponents({
        '.btn-primary': {
          backgroundColor: theme('colors.beacon-gold'),
          color: theme('colors.granite-gray'),
          border: 'none',
          borderRadius: theme('borderRadius.md'),
          padding: `${theme('spacing.md')} ${theme('spacing.lg')}`,
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.base[0]'),
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme('colors.accent.hover'),
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.md'),
          },
          '&:focus': {
            outline: `2px solid ${theme('colors.beacon-gold')}`,
            outlineOffset: '2px',
          },
        },
        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.lakeside-blue'),
          border: `2px solid ${theme('colors.lakeside-blue')}`,
          borderRadius: theme('borderRadius.md'),
          padding: `calc(${theme('spacing.md')} - 2px) calc(${theme('spacing.lg')} - 2px)`,
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.base[0]'),
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme('colors.lakeside-blue'),
            color: 'white',
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.md'),
          },
          '&:focus': {
            outline: `2px solid ${theme('colors.beacon-gold')}`,
            outlineOffset: '2px',
          },
        },
        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.granite-gray'),
          border: `1px solid ${theme('colors.granite-gray')}`,
          borderRadius: theme('borderRadius.md'),
          padding: `calc(${theme('spacing.md')} - 1px) calc(${theme('spacing.lg')} - 1px)`,
          fontWeight: theme('fontWeight.normal'),
          fontSize: theme('fontSize.base[0]'),
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme('colors.granite-gray'),
            color: 'white',
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.sm'),
          },
          '&:focus': {
            outline: `2px solid ${theme('colors.beacon-gold')}`,
            outlineOffset: '2px',
          },
        },
        '.card': {
          backgroundColor: theme('colors.birch-white'),
          border: `1px solid ${theme('colors.sky-tint')}`,
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.lg'),
          boxShadow: theme('boxShadow.sm'),
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: theme('boxShadow.md'),
          },
        },
        '.card-featured': {
          backgroundColor: theme('colors.sky-tint'),
          border: `2px solid ${theme('colors.lakeside-blue')}`,
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.lg'),
          boxShadow: theme('boxShadow.featured'),
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: theme('boxShadow.featured-hover'),
          },
        },
        '.heading-1': {
          fontSize: theme('fontSize.4xl[0]'),
          fontWeight: theme('fontWeight.bold'),
          color: theme('colors.stoneham-green'),
          lineHeight: theme('fontSize.4xl[1].lineHeight'),
        },
        '.heading-2': {
          fontSize: theme('fontSize.3xl[0]'),
          fontWeight: theme('fontWeight.semibold'),
          color: theme('colors.stoneham-green'),
          lineHeight: theme('fontSize.3xl[1].lineHeight'),
        },
        '.heading-3': {
          fontSize: theme('fontSize.2xl[0]'),
          fontWeight: theme('fontWeight.semibold'),
          color: theme('colors.lakeside-blue'),
          lineHeight: theme('fontSize.2xl[1].lineHeight'),
        },
        '.heading-4': {
          fontSize: theme('fontSize.xl[0]'),
          fontWeight: theme('fontWeight.semibold'),
          color: theme('colors.granite-gray'),
          lineHeight: theme('fontSize.xl[1].lineHeight'),
        },
        '.body-text': {
          fontSize: theme('fontSize.base[0]'),
          fontWeight: theme('fontWeight.normal'),
          color: theme('colors.granite-gray'),
          lineHeight: theme('fontSize.base[1].lineHeight'),
        },
        '.small-text': {
          fontSize: theme('fontSize.sm[0]'),
          fontWeight: theme('fontWeight.normal'),
          color: theme('colors.granite-gray'),
          lineHeight: theme('fontSize.sm[1].lineHeight'),
        },
        '.container': {
          maxWidth: theme('maxWidth.container'),
          margin: '0 auto',
          padding: `0 ${theme('spacing.lg')}`,
          '@screen md': {
            padding: `0 ${theme('spacing.xl')}`,
          },
          '@screen lg': {
            padding: `0 ${theme('spacing.2xl')}`,
          },
        },
      });
    },
  ],
} 