/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        c2pDarkBlue: '#172144',
        c2pTurquoise: '#06B6D4',
        c2pOrange: '#F97316',
      },
    },
  },
  plugins: [],
}

