/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-blue": "#92C7CF",
        "primary-cream": "#FBF9F1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
