const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",,
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#7856ff',
      }
    },
  },
    plugins: [
      nextui({
        themes: {
          light: {
            colors: {
              primary: {
                DEFAULT: "#F9FAFB",
                foreground: "#F9FAFB",
                background: "#1F2937"
              }
            },
          },
        },
      }),
    ],
};
