import "./SiteHeader.scss";
import PrimaryNavigation from "./PrimaryNavigation";
import { Link } from "@reach/router";
import { useState } from "react";
import { useCart } from "../helpers/CartContext";

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="siteHeader">
        <nav className="siteHeader__navigation">
          <Link to="/" className="siteHeader__logo">
            <img src="https://res.cloudinary.com/dffpafuyg/image/upload/v1643112043/logo_rzl0ec.png" alt="postly logo" />
          </Link>
          <div className="siteHeader__menu">
            <button aria-label="open search">
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
            <Link to="/">
              <i className="fas fa-user" aria-hidden="true"></i>
            </Link>
            <Link to="/cart" className="siteHeader__cart">
              <i className="fas fa-shopping-bag" aria-hidden="true"></i>
              <div className="siteHeader__cart-count">{totalItems >= 100 ? "99+" : totalItems}</div>
            </Link>
            <button className="siteHeader__mobileMenu" onClick={() => setOpenMenu(!openMenu)} aria-label="open the menu">
              <i className="fas fa-bars" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
        <PrimaryNavigation open={openMenu} />
      </header>
    </>
  );
}
