/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      phone: "420px",
    },
    extend: {
      fontFamily: {
        lineSeed: ["LINESeedKR-Bd"],
        titleFont: ["TTTtangsbudaejjigaeB"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
