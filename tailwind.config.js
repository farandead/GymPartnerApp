/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'pump-black': '#1B2021',
        'pump-orange': '#FF8600',
        'pump-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
