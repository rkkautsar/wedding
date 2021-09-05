module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dusty-blue": "#CCDBED",
        "dusty-blue-900": "#93A7BE",
        "blue-ink": "#202D58",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
