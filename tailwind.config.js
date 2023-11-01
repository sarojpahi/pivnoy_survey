/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        navH: "calc(100vh - 56px)",
        tabR: "calc(100vh - 590px)",
      },
    },
  },
  plugins: [],
};
