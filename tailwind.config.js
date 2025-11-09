/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          green: '#10B981',
          blue: '#3B82F6',
          red: '#EF4444',
          yellow: '#F59E0B',
        }
      }
    },
  },
  plugins: [],
}