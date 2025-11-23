/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        docker: {
          DEFAULT: "#066da5",
          light: "#0d8ac7",
          dark: "#044d78",
        },
        kubernetes: {
          DEFAULT: "#326ce5",
          light: "#518bec",
          dark: "#2454c0",
        },
      },
    },
  },
  plugins: [],
};
