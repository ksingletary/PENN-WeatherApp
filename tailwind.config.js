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
        customWhite3: '#D9D9D94D',
        temperatureToday: '#BBD7EC',
        temperatureToday2: '#AECADF',
        borderGray: '#626161',
        lightGray: '#818085',
        lighterGray: '#39393A',
        blackLighter: '#1a1a1a',
        blackDarker: '#0f0f0f',
        blackDark: '#1e1e1e',
        blackDark2: '#0F0F11',
        blackDark3: '#1B1B1D',
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        montserratBold: ['Montserrat-Bold'],
        montserratLight: ['Montserrat-Light'],
        montserratMedium: ['Montserrat-Medium']
      },
    },
  },
  plugins: [],
}

