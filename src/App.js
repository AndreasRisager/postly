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
import {Helmet} from "react-helmet";

export default function App() {
  return (
    <>
      <Helmet defaultTitle="Postly" titleTemplate="Postly | %s" >
        <meta name="description" content="Se vores udvalg af fantastiske plakater fra postly." />
        <meta property="og:url" content="https://postly.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Postly" />
        <meta property="og:description" content="Se vores udvalg af fantastiske plakater fra postly." />
        <meta property="og:image" content="https://res.cloudinary.com/dffpafuyg/image/upload/v1644252262/photo_1513519245088_0e12902e5a38_ixlib_rb_1_2_8fdfa3b08f.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="postly.netlify.app" />
        <meta property="twitter:url" content="https://postly.netlify.app/" />
        <meta name="twitter:title" content="Postly" />
        <meta name="twitter:description" content="Se vores udvalg af fantastiske plakater fra postly." />
        <meta name="twitter:image" content="https://res.cloudinary.com/dffpafuyg/image/upload/v1644252262/photo_1513519245088_0e12902e5a38_ixlib_rb_1_2_8fdfa3b08f.jpg" />
      </Helmet>
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
