/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        screen: "70vh",
      },
    },
  },
  plugins: [require("tailwindcss"), require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
