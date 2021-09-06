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
        "black-tr-20": "rgba(0,0,0,0.2)",
      },
      height: {
        screen: "calc(var(--vh) * 100)",
      },
      minHeight: {
        screen: "calc(var(--vh) * 100)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
