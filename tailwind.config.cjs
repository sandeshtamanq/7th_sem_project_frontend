/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b3a3a",
        secondary: "#dbaa16",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
