import { Link } from "@reach/router";
import "./SiteFooter.scss";

export default function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="siteFooter__content">
        <div className="siteFooter__column">
          <h3 className="siteFooter__title">Postly.dk</h3>
          <p className="siteFooter__text">
            Postly.dk
            <br />
            Adresse
            <br />
            2650 Hvidovre
          </p>
          <p className="siteFooter__text">CVR. nr. 12345678</p>
          <p className="siteFooter__subtitle">Presse </p>
          <a
            href="mailto:kontakt@postly.dk"
            className="siteFooter__link"
            title="mailto:kontakt@postly.dk"
            aria-describedby="a11y-external-message">
            kontakt@postly.dk
          </a>
        </div>
        <div className="siteFooter__column">
          <h3 className="siteFooter__title">Kundeservice</h3>
          <p className="siteFooter__text">
            Kontakt mig gerne på <br />
            <a
              href="mailto:kontakt@postly.dk"
              className="siteFooter__link"
              title="mailto:kontakt@postly.dk"
              aria-describedby="a11y-external-message">
              kontakt@postly.dk
            </a>
          </p>
          <p className="siteFooter__text">
            Jeg besvarer din mail indenfor 24 timer, mandag til fredag.
          </p>
        </div>
        <div className="siteFooter__column">
          <h3 className="siteFooter__title">Yderligere service</h3>
          <p className="siteFooter__subtitle">Betingelser</p>
          <Link to="/terms-of-service" className="siteFooter__link">
            Handelsbetingelser
          </Link>
          <Link to="/privacy-policy" className="siteFooter__link siteFooter__link--margin">
            Privatlivspolitik/
            <br />
            Cookies
          </Link>
        </div>
        <div className="siteFooter__column">
          <h3 className="siteFooter__title">Nyhedsbrev</h3>
          <form>
            <label htmlFor="footer-newsletter" className="screenreader"></label>
            <input
              type="email"
              name="footer-newsletter"
              id="footer-newsletter"
              placeholder="E-mailadresse"
              className="newsletter__input"
            />
            <button type="submit" className="newsletter__button">
              Tilmeld
            </button>
          </form>
        </div>
      </div>
      <div className="siteFooter__bottom">
        <ul className="siteFooter__socials">
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
        <p className="siteFooter__text">&copy; 2022, Postly.dk</p>
      </div>
    </footer>
  );
}
