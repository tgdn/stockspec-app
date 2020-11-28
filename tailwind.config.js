const defaultTheme = require("tailwindcss/defaultTheme");

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
      fontFamily: {
        sans: ['"Roboto"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "accent-1": "#36393f",
        "accent-2": "#2f3136",
        "accent-3": "#202225",
        "accent-black": "#050507",
        "accent-lightblack": "#1F2125",
        // "accent-lighterblack": "#36353A",
        "accent-lighterblack": "hsl(252 6% 19% / 1)",
        // "accent-darkgray": "#58595C",
        "accent-darkgray": "hsl(240 5% 27% / 1)",
        "accent-gray": "#97989B",
        "accent-lightgray": "#E3E5E8",
        "accent-lightblue": "#2161FE",
        "accent-darkblue": "#2253EA",
      },
      boxShadow: {},
      borderRadius: {
        huge: "0.675rem",
        xxl: "7.5rem",
      },
      zIndex: {
        neg: -1,
      },
      spacing: {
        108: "28rem",
        120: "32rem",
      },
    },
  },
  variants: {},
};
