/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./views/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-white": "#EAEAEA",
        "secondary-white": "#CBCACA",
        "bright-red": "#F20000",
        "nav-red": "#CE0000",
        "dark-red": "#692121",
        "pl-red": "#D2000C",
        "pl-red-dark": "#A5000A",
        "pl-cream": "#F8F3EB",
        "pl-dark": "#090A0D",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "scroll-left": "scroll-left 35s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
