import "./App.scss";
import Home from "./views/Home";
import { Router } from "@reach/router";
import Cart from "./views/Cart";
import Shop from "./views/Shop";
import ProductView from "./views/ProductView";
import Success from "./views/Success";

export default function App() {
  return (
    <Router>
      <Home path="/" default />
      <Cart path="/cart" />
      <ProductView path="/product/:slug" />
      <Shop path="/shop" />
      <Success path="/success" />
    </Router>
  );
}
