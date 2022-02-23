import "./Newsletter.scss";

export default function Newsletter() {
  return (
    <section className="newsletter" id="newsletter">
      <h2 className="newsletter__title">
        Tilmeld dig vores nyhedsbrev <span>&#128077;</span>
      </h2>
      <p className="newsletter__text">
        Tilmeld dig for at modtage produktrabatter, produktnyheder og mere i din indbakke
      </p>
      <form className="newsletter__form">
        <label htmlFor="newsletterForm" className="screenreader">
          email
        </label>
        <input
          type="email"
          name="newsletterForm"
          id="newsletterForm"
          className="newsletter__input"
          placeholder="E-mailadresse"
        />
        <button type="submit" className="newsletter__button">
          Tilmeld
        </button>
      </form>
    </section>
  );
}
