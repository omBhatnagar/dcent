/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "1/5": "20%",
        "4/5": "80%",
      },
      colors: {
        background: {
          light: "#f1f5f7",
          dark: "#252b3b",
          darker: "#161923",
        },
        text: {
          DEFAULT: "#838ea3",
        },
        primary: "#5664d2",
      },
    },
  },
  plugins: [],
};
