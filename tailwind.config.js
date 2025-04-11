module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        body: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#2D3142', // Charcoal Navy
        accent: '#EF8354', // Soft Orange
        soft: '#F7C59F', // Pale Apricot
        contrast: '#BFC0C0', // Muted Gray
        text: '#FFFFFF' // White
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
