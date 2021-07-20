module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: {
          light: '#187BDB',
          DEFAULT: '#185ADB',
          dark: '#1838DB'
        },
        secondary: {
          light: '#16DB74',
          DEFAULT: '#15DB95',
          dark: '#16DBB8'
        },
        black: '#0A1931'
      },
      fontFamily: {
        helvetica: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        avenir: ['Avenir']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
