/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8F0',
          100: '#FDF2E3',
          200: '#F9E4C3',
          300: '#F4D09F',
          400: '#E8B374',
          500: '#C69749', // Golden Bronze - Primary
          600: '#B08340',
          700: '#8B6731',
          800: '#6B5026',
          900: '#4D3A1E'
        },
        secondary: {
          50: '#F7F5F4',
          100: '#EDE8E5',
          200: '#D4C8C0',
          300: '#B8A69A',
          400: '#9D8975',
          500: '#6F4E37', // Coffee Brown - Secondary
          600: '#5E3F2C',
          700: '#4D3221',
          800: '#3C2518',
          900: '#2B1B0F'
        },
        accent: {
          peach: '#E8A87C',
          yellow: '#FFD369',
        },
        background: {
          light: '#FFF8F0',
          dark: '#2E2E2E',
        },
        coral: '#E94F37',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'elegant-gradient': 'linear-gradient(135deg, #C69749, #FFD369)',
        'warm-gradient': 'linear-gradient(135deg, #E8A87C, #C69749)',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
      boxShadow: {
        'elegant': '0 10px 40px -15px rgba(198, 151, 73, 0.3)',
        'warm': '0 8px 30px -12px rgba(232, 168, 124, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'float': '0 20px 60px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.7s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-in': 'scaleIn 0.5s ease-out',
        'rotate-gentle': 'rotateGentle 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        slideInRight: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        bounceGentle: {
          '0%, 100%': { 
            transform: 'translateY(0)' 
          },
          '50%': { 
            transform: 'translateY(-10px)' 
          },
        },
        pulseGentle: {
          '0%, 100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
          '50%': { 
            opacity: '0.8', 
            transform: 'scale(1.05)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scaleIn: {
          '0%': { 
            transform: 'scale(0.95)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
        },
        rotateGentle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
