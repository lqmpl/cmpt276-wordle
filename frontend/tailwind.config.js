/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        greenlight: 'rgb(100,209,67)',
        greenmed: 'rgb(78,146,57)',
        greendark: 'rgb(56,104,41)',
        yellowmed: 'rgb(255,170,121)',
        graylight: 'rgb(219,219,219)',
        graydark: 'rgb(97,95,95)',
        graydarker: 'rgb(80,76,76)',
        graydarkest: 'rgb(53,51,51)'
      },
    },
  },
  plugins: [],
}