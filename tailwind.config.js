/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'luckiest': ['"Luckiest Guy"', 'cursive']
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
