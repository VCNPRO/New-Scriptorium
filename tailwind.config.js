/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          800: '#3E2723', // Dark Mahogany
          900: '#281712', // Deep Oak
        },
        parchment: {
          100: '#FDFBF7', // Clean Paper
          200: '#F5F1E6', // Aged Paper
          300: '#E8E0D2', // Darker Parchment
        },
        copper: {
          400: '#CD7F32',
          500: '#B87333', // Polished Copper
          600: '#8B4513', // Bronze/Saddle Brown
        },
        ink: {
          900: '#1A1A1A', // Archival Ink
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        display: ['Cinzel', 'serif'],
        subhead: ['Playfair Display', 'serif'],
        script: ['Cormorant Garamond', 'serif'],
      }
    }
  },
  plugins: [],
}
