module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: {
          light: '#B8B67A',
          DEFAULT: '#74723e',
          dark: '#424124'
        }
      },
      fontFamily: {
        helvetica: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
