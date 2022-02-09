import { Link } from "@reach/router";
import "./PrimaryNavigation.scss";

export default function PrimaryNavigation({ open }) {
  return (
    <nav
      className={open ? "primaryNavigation primaryNavigation--open" : "primaryNavigation"}
      aria-label="Main menu">
      <ul className="primaryNavigation__list">
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/">Find Inspiration</Link>
        </li>
        <li>
          <Link to="/">Købsguide</Link>
        </li>
        <li>
          <a href="#newsletter">Nyhedsbrev</a>
        </li>
        <li>
          <Link to="/">Om Postly.dk</Link>
        </li>
        <li>
          <Link to="/">Kontakt</Link>
        </li>
        <ul className="socials">
          <li>
            <Link to="/">
              <i className="fab fa-facebook-square"></i>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
}
