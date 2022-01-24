import "./App.scss";
import Home from "./views/Home";
import { Router } from "@reach/router";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Shop from "./views/Shop";

const stripePromise = loadStripe("pk_test_51KJOszIj4eKOJ7cWA4DXFTUzgHagumD73V2wyBTC4T6uKTAPOh3jTto0odReDAEwjukRVX1LEuqarK32Zb8XrZrT001Y1to1N7");

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Home path="/" default />
        <Cart path="/cart" />
        <Checkout path="/checkout" />
        <Shop path="/shop" />
      </Router>
    </Elements>
  );
}
