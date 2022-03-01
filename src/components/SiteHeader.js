import "./SiteHeader.scss";
import PrimaryNavigation from "./PrimaryNavigation";
import { Link } from "@reach/router";
import { useEffect, useState } from "react";
import { useCart } from "../helpers/CartContext";
import axios from "axios";
import { BASE_URL } from "../utils/urls";

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const { totalItems } = useCart();

  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    async function getAnnouncement() {
      try {
        const { data } = await axios.get(`${BASE_URL}/announcement`);
        setAnnouncement(data.text);
      } catch (error) {
        setAnnouncement("");
      }
    }
    getAnnouncement();
  }, []);

  return (
    <>
      <header className="siteHeader">
        {announcement && (
          <div className="siteHeader__announcement">
            <p>{announcement}</p>
          </div>
        )}
        <nav className="siteHeader__navigation">
          <Link to="/" className="siteHeader__logo">
            POSTLY.DK
          </Link>
          <div className="siteHeader__menu">
            {/* <button aria-label="open search">
              <i className="fas fa-search" aria-hidden="true"></i>
            </button> */}
            <Link to="/cart" className="siteHeader__cart">
              <i className="fas fa-shopping-bag" aria-hidden="true"></i>
              <div className="siteHeader__cart-count">{totalItems >= 100 ? "99+" : totalItems}</div>
            </Link>
            <button
              className="siteHeader__mobileMenu"
              onClick={() => setOpenMenu(!openMenu)}
              aria-label="open the menu">
              <i className="fas fa-bars" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
        <PrimaryNavigation open={openMenu} />
      </header>
    </>
  );
}
