/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stock-red': '#FADBD8',
        'stock-blue': '#2980B9',
        'stock-black': '#000000',
        'stock-gray': '#808080',
        primary: '#2980B9',
        secondary: '#FADBD8',
        accent: '#000000',
        muted: '#808080',
      },
    },
  },
  plugins: [],
}
