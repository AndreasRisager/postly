import "./App.scss";
import Home from "./views/Home";
import { Router } from "@reach/router";
import Cart from "./views/Cart";
import Shop from "./views/Shop";
import ProductView from "./views/ProductView";
import Success from "./views/Success";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import Checkout from "./views/Checkout";

export default function App() {
  return (
    <>
      <SiteHeader />
      <Router>
        <Home path="/" default />
        <Cart path="/cart" />
        <ProductView path="/product/:slug" />
        <Shop path="/shop" />
        <Checkout path="/checkout" />
        <Success path="/success" />
      </Router>
      <SiteFooter />
    </>
  );
}
