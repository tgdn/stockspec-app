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
      colors: {
        "accent-1": "#36393f",
        "accent-2": "#2f3136",
        "accent-3": "#202225",
        "accent-black": "#050507",
        "accent-lightblack": "#1F2125",
        "accent-lighterblack": "#36353A",
        "accent-darkgray": "#58595C",
        "accent-gray": "#97989B",
        "accent-lightgray": "#E3E5E8",
      },
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
