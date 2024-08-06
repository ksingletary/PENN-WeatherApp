/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customWhite1: '#EDEDED',
        customWhite2: '#FEFEFE',
        borderGray: '#626161',
        lightGray: '#818085',
        blackDarker: '#0f0f0f',
        blackDark: '#1e1e1e',
        blackLight: '#262626',
        blackLighter: '#3a3a3a',
        blackLightest: '#4a4a4a'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

