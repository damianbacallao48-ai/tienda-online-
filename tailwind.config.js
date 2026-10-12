/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        torico: {
          dark: '#0b0b0e',
          card: '#141418',
          border: '#27272a',
          gold: '#eab308',
          goldLight: '#facc15',
          red: '#dc2626',
          redHover: '#b91c1c'
        }
      }
    },
  },
  plugins: [],
}
