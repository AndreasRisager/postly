import { Link } from "@reach/router";
import React, { useState } from "react";
import "./CookieConsent.scss";

export default function CookieConsent() {
  const [cookieConsent, setCookieConsent] = useState(false);
  function handleClick() {
    localStorage.setItem("cookieConsent", true);
    setCookieConsent(true);
  }
  return (
    <div className={cookieConsent ? "cookieConsent slideOutDown" : "cookieConsent slideInUp"}>
      <div className="cookieConsent__text">
        <i className="fa-solid fa-cookie cookieConsent__icon" />
        Denne hjemmeside bruger cookies for at sikre, at du får den bedste oplevelse på vores
        hjemmeside.{" "}
        <Link to="/privacy-policy" className="cookieConsent__link">
          Learn more
        </Link>
      </div>
      <button className="cookieConsent__button" type="button" onClick={handleClick}>
        Godkend
      </button>
    </div>
  );
}
