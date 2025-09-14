/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        akari: {
          blue: "#1A2A4A",
          amber: "#FFB300",
          mint: "#35C6A6"
        },
        mint: {
          50: "#E6F9F3",
          100: "#CCF3E7",
          200: "#99E7CF",
          300: "#66DBB7",
          400: "#33CF9F",
          500: "#35C6A6",
          600: "#2AA285",
          700: "#1F7E64",
          800: "#155A43",
          900: "#0A3622"
        },
        amber: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#FFB300",
          600: "#FFA000",
          700: "#FF8F00",
          800: "#FF6F00",
          900: "#E65100"
        }
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: [],
}