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
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
