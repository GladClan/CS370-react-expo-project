const themeColors = {
  primary: "#161622",
  secondary: {
    DEFAULT: "#FF9C01",
    100: "#FF9001",
    200: "#FF8E01",
  },
  black: {
    DEFAULT: "#000",
    100: "#1E1E2D",
    200: "#232533",
  },
  gray: {
    100: "#CDCDE0",
  },
  white: "#fff",
  danger: '#e3342f',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeColors,
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};

module.exports.themeColors = themeColors;