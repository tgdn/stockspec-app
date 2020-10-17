module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    applyComplexClasses: true,
    extendedSpacingScale: true,
    extendedFontSizeScale: true,
  },
  plugins: [],
  theme: {
    extend: {
      colors: {},
      boxShadow: {},
      borderRadius: {
        huge: "0.675rem",
        xxl: "7.5rem",
      },
      zIndex: {
        neg: -1,
      },
    },
  },
  variants: {},
};
