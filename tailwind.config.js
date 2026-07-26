/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./modules/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Tektur', 'sans-serif'],
      }
    }
  },
  plugins: [],
}