module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './src/*.html',
    './src/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'intro': "url('/src/bg-intro.jpg')",
        'intro-sm': "url('/src/bg-intro-sm.jpg')",
        'about': "url('/src/bg-about.jpg')",
      }),
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
