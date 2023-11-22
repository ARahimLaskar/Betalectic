/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // rem: {
      //   base: "var(--rem)", // Set base rem value to your custom --rem variable
      // },
      // padding: {
      //   "20rem": "5rem", // Define custom padding bottom size in rem units
      // },
    },
  },
  plugins: [],
};
