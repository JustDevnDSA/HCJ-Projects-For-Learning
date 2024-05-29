/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        'body': ["Inter", "sans-serif"],
        'display': ["Poppins", "sans-serif"],
      },
      colors:{
        'primary':'#3238f2'
      }
    },
  },
  plugins: [],
};
