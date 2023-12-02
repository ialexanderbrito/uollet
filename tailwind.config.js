/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#5636D3',
        'primary-dark': '#3d24a2',
        'investments-primary': '#170e39',
        success: '#12A454',
        danger: '#E83F5B',
        title: '#363F5F',
        text: '#969CB2',
        background: '#f7f7f8',
        'background-dark': '#0e0e10',
        'background-card': '#FFFFFF',
        'background-card-dark': '#2D2D2D',
        'selected-income': '#e7f5e7',
        'selected-income-dark': '#1f2a1f',
        'selected-outcome': '#fddede',
        'selected-outcome-dark': '#2a1f1f',
        'title-dark': '#969CB2',
        'text-dark': '#babab7',
      },
      zIndex: {
        '100': '100',
      },
      margin: {
        '0-auto': '0 auto',
        '0-auto-8': '0px auto 4.6rem',
        '2-auto': '2rem auto',
      },
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
  ],
};
