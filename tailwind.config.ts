import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Color System - Cool Teal/Cyan
        primary: {
          50: '#f0f9fc',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Primary teal
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        // Secondary Color System - Muted Purple
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Secondary purple
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Accent Color System - Soft Blue
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Accent blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Neutral Color System - Cool Grays
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          150: '#f0f0f0',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          "'Roboto'",
          "'Oxygen'",
          "'Ubuntu'",
          "'Cantarell'",
          "'Fira Sans'",
          "'Droid Sans'",
          "'Helvetica Neue'",
          'sans-serif',
        ],
        display: [
          "'Inter'",
          "'Segoe UI'",
          "'Roboto'",
          'sans-serif',
        ],
        mono: [
          "'Menlo'",
          "'Monaco'",
          "'Courier New'",
          'monospace',
        ],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.5px' }],
        sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.3px' }],
        base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.3px' }],
        lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.3px' }],
        xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.5px' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.5px' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.8px' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-1px' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-1.2px' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-1.5px' }],
      },
      spacing: {
        xs: '0.25rem',   // 4px
        sm: '0.5rem',    // 8px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '2.5rem', // 40px
        '3xl': '3rem',   // 48px
        '4xl': '3.5rem', // 56px
        '5xl': '4rem',   // 64px
        '6xl': '5rem',   // 80px
      },
      borderRadius: {
        none: '0',
        xs: '0.25rem',
        sm: '0.375rem',
        base: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        none: 'none',
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in',
        'slide-down': 'slideInDown 0.5s ease-out',
        'slide-up': 'slideInUp 0.5s ease-out',
        'slide-left': 'slideInLeft 0.5s ease-out',
        'slide-right': 'slideInRight 0.5s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInDown: {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideInUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          from: { transform: 'translateX(20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      maxWidth: {
        'xs': '20rem',      // 320px
        'sm': '24rem',      // 384px
        'md': '28rem',      // 448px
        'lg': '32rem',      // 512px
        'xl': '36rem',      // 576px
        '2xl': '42rem',     // 672px
        '3xl': '48rem',     // 768px
        '4xl': '56rem',     // 896px
        '5xl': '64rem',     // 1024px
        '6xl': '72rem',     // 1152px
        '7xl': '80rem',     // 1280px
        'full': '100%',
        'container': '90rem', // 1440px
      },
      minHeight: {
        screen: '100vh',
        'screen-sm': '100svh',
      },
    },
  },
  plugins: [],
};

export default config;
