import "./App.scss";
import Home from "./views/Home";
import { Router } from "@reach/router";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";

export default function App() {
  return (
    <Router>
      <Home path="/" default />
      <Cart path="/cart" />
      <Checkout path="/checkout" />
    </Router>
  );
}
