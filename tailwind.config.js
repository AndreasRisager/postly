module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "#dee2e6",
        primaryColor: "#c5b4ad",
        black: "#333",
        productText: "#6e6e6e",
        footerColor: "#f2f0f0",
        inputBorder: "#d9d9d9",
        textColor: "#3d4246",
        filterButton: "#617d98",
        checkoutActiveColor: "#c5aa76",
        checkoutTextColor: "#737373",
      },
      gridTemplateColumns: {
        shop: "repeat(auto-fill,minmax(200px,1fr))",
        cart: "60% 1fr auto 1fr",
      },
      fontSize: {
        md: "0.950rem",
      },
      boxShadow: {
        input: "0 0 0 1px #c5aa76",
      },
    },
  },
  plugins: [],
};
