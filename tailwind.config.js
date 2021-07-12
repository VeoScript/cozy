const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'honey': '#FFCE00',
        'modern-black': '#1A1A1A',
        'modern-dim': '#222222',
        'modern-white': '#F7F7F7'
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.mono],
        raleway: ['Raleway', ...defaultTheme.fontFamily.mono]
      }
    },
  },
  variants: {
    opacity: ['disabled']
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
