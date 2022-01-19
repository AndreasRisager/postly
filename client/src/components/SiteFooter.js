import { Link } from "@reach/router";
import "./SiteFooter.scss";

export default function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="siteFooter__content">
        <div className="siteFooter__column">
          <h4 className="siteFooter__title">Ugeplan.dk</h4>
          <p className="siteFooter__text">
            Ugeplan.dk
            <br />
            Egøjevej 12
            <br />
            4600 Køge
          </p>
          <p className="siteFooter__text">CVR. nr. 34834245</p>
          <p className="siteFooter__subtitle">Presse </p>
          <a href="mailto:kontakt@ugeplan.dk" className="siteFooter__link" title="mailto:kontakt@ugeplan.dk" aria-describedby="a11y-external-message">
            kontakt@ugeplan.dk
          </a>
        </div>
        <div className="siteFooter__column">
          <h4 className="siteFooter__title">Kundeservice</h4>
          <p className="siteFooter__text">
            Kontakt mig gerne på <br />
            <a
              href="mailto:kontakt@ugeplan.dk"
              className="siteFooter__link"
              title="mailto:kontakt@ugeplan.dk"
              aria-describedby="a11y-external-message">
              kontakt@ugeplan.dk
            </a>
          </p>
          <p className="siteFooter__text">Jeg besvarer din mail indenfor 24 timer, mandag til fredag.</p>
        </div>
        <div className="siteFooter__column">
          <h4 className="siteFooter__title">Yderligere service</h4>
          <Link to="/giftcard" className="siteFooter__link">
            Gavekort
          </Link>
          <Link to="/buyingguide" className="siteFooter__link siteFooter__link--margin">
            Købsguide
          </Link>
          <p className="siteFooter__subtitle">Betingelser</p>
          <Link to="/terms" className="siteFooter__link">
            Handelsbetingelser
          </Link>
          <Link to="/policy" className="siteFooter__link siteFooter__link--margin">
            Persondatapolitik/
            <br />
            Cookies
          </Link>
          <p className="siteFooter__subtitle">MINE KUNDER...</p>
          <Link to="/reviews" className="siteFooter__link siteFooter__link--margin">
            Klik og læs hvad mine kunder siger...
          </Link>
          <Link to="/inspiration" className="siteFooter__link">
            Klik og se hvad mine kunder har lavet...
          </Link>
        </div>
        <div className="siteFooter__column">
          <h4 className="siteFooter__title">Nyhedsbrev</h4>
          <form>
            <label htmlFor="footer-newsletter" className="screenreader"></label>
            <input type="email" name="footer-newsletter" id="footer-newsletter" placeholder="E-mailadresse" className="newsletter__input" />
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
        <p className="siteFooter__text">&copy; 2022, Ugeplan.dk</p>
      </div>
    </footer>
  );
}
