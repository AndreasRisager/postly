import "./App.scss";
import Home from "./views/Home";
import { Router } from "@reach/router";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Shop from "./views/Shop";
import ProductView from "./views/ProductView";

export default function App() {
  return (
    <Router>
      <Home path="/" default />
      <Cart path="/cart" />
      <Checkout path="/checkout" />
      <ProductView path="/product/:slug" />
      <Shop path="/shop" />
    </Router>
  );
}
