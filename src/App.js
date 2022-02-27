import "./App.scss";
import Home from "./views/Home";
import { Router } from "@reach/router";
import Cart from "./views/Cart";
import Shop from "./views/Shop";
import ProductView from "./views/ProductView";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import Checkout from "./views/Checkout";
import Success from "./views/Success";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import PrivacyPolicy from "./views/policies/PrivacyPolicy";
import TermsOfService from "./views/policies/TermsOfService";

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

        <PrivacyPolicy path="/privacy-policy" />
        <TermsOfService path="/terms-of-service" />
      </Router>
      <SiteFooter />
      {!localStorage.getItem("cookieConsent") && <CookieConsent />}
    </>
  );
}
