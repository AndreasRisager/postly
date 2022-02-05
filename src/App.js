import "./App.scss";
import Home from "./views/Home";
import { Router } from "@reach/router";
import Cart from "./views/Cart";
import Shop from "./views/Shop";
import ProductView from "./views/ProductView";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import Checkout from "./views/Checkout";
import Account from "./views/Account";
import Success from "./views/Success";

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
        <Account path="/account" />
        <Success path="/success" />
      </Router>
      <SiteFooter />
    </>
  );
}
