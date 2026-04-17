export default {
  plugins: {
    '@tailwindcss/postcss': {},
    // Convert oklch() colors to rgb fallbacks for older Chrome on school Chromebooks
    '@csstools/postcss-oklab-function': { preserve: false },
    autoprefixer: {},
  },
}
