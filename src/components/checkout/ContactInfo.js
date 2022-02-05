import CheckboxField from "../checkout/CheckboxField";
import InputField from "../checkout/InputField";
import { Link } from "@reach/router";
import { useState } from "react";

export default function ContactInfo({ checkout, setCheckout, nextStep }) {
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.email.value === "") {
      setStatusMessage("Udfyld Email Address");
      e.target.email.focus();
      return;
    }
    var at = e.target.email.value.indexOf("@");
    var dot = e.target.email.value.lastIndexOf(".");
    if (at <= 0) {
      e.target.email.focus();
      setStatusMessage("Skriv gyldig email");
      return;
    }
    if (dot < at + 2) {
      e.target.email.focus();
      setStatusMessage("Skriv gyldig email");
      return;
    }
    if (e.target.email.value.length <= dot + 2) {
      e.target.email.focus();
      setStatusMessage("Skriv gyldig email");
      return;
    }

    if (e.target.country.value === "") {
      e.target.country.focus();
      setStatusMessage("Udfyld Land/område");
      return;
    }
    if (e.target.firstname.value === "") {
      e.target.firstname.focus();
      setStatusMessage("Udfyld Fornavn");
      return;
    }
    if (e.target.lastname.value === "") {
      e.target.lastname.focus();
      setStatusMessage("Udfyld Efternavn");
      return;
    }
    if (e.target.shipping_address1.value === "") {
      e.target.shipping_address1.focus();
      setStatusMessage("Udfyld Addresse");
      return;
    }
    if (e.target.zip_code.value === "") {
      e.target.zip_code.focus();
      setStatusMessage("Udfyld Postnummer");
      return;
    }
    if (e.target.city.value === "") {
      e.target.city.focus();
      setStatusMessage("Udfyld By");
      return;
    }
    if (e.target.phone.value === "") {
      e.target.phone.focus();
      setStatusMessage("Udfyld Telefonnummer");
      return;
    }
    nextStep();
  };

  return (
    <form className="checkout__contactInfo" noValidate onSubmit={handleSubmit}>
      <div className="checkout__section">
        <h2 className="checkout__title">Kontaktinformation</h2>
        <div className="checkout__fields">
          <InputField
            type="email"
            id="email"
            value={checkout.email}
            onChange={(e) => {
              setCheckout((prev) => ({ ...prev, email: e.target.value }));
            }}>
            Mail
          </InputField>
        </div>
        <CheckboxField id="newsletter" defaultChecked>
          Bliv V.I.P &amp; få adgang til kampagner før alle andre
        </CheckboxField>
      </div>

      <div className="checkout__section">
        <h2 className="checkout__title">Leveringsadresse</h2>
        <div className="checkout__fields">
          <InputField type="text" id="country" value="Danmark" disabled>
            Land/område
          </InputField>
          <InputField
            type="text"
            id="firstname"
            style={{ gridColumn: "span 1" }}
            value={checkout.firstname}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                firstname: e.target.value,
              }));
            }}>
            Fornavn
          </InputField>
          <InputField
            type="text"
            id="lastname"
            style={{ gridColumn: "span 1" }}
            value={checkout.lastname}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                lastname: e.target.value,
              }));
            }}>
            Efternavn
          </InputField>
          <InputField
            type="text"
            id="shipping_address1"
            value={checkout.shipping_address1}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                shipping_address1: e.target.value,
              }));
            }}>
            Gade og husnummer
          </InputField>
          <InputField
            type="text"
            id="shipping_address2"
            value={checkout.shipping_address2}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                shipping_address2: e.target.value,
              }));
            }}>
            Lejlighed, etage osv. (valgfrit)
          </InputField>
          <InputField
            type="text"
            id="zip_code"
            style={{ gridColumn: "span 1" }}
            value={checkout.zip_code}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                zip_code: e.target.value,
              }));
            }}>
            Postnummer
          </InputField>
          <InputField
            type="text"
            id="city"
            style={{ gridColumn: "span 1" }}
            value={checkout.city}
            onChange={(e) => {
              setCheckout((prev) => ({ ...prev, city: e.target.value }));
            }}>
            By
          </InputField>
          <InputField
            type="text"
            id="phone"
            value={checkout.phone}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                phone: e.target.value,
              }));
            }}>
            Telefon (du modtager en sms når din pakke sendes)
          </InputField>
        </div>
        <CheckboxField
          id="checkout_remember_me"
          defaultChecked
          onClick={(e) => setCheckout({ ...checkout, remember_me: e.target.checked })}>
          Gem denne information for hurtigere udtjekning næste gang
        </CheckboxField>
      </div>
      {statusMessage && <p className="checkout__statusMessage">*{statusMessage}*</p>}
      <div className="checkout__stepButtons">
        <Link to="/cart" className="checkout__stepBack">
          Tilbage til indkøbskurven
        </Link>
        <button className="checkout__stepNext" type="submit">
          Fortsæt til levering
        </button>
      </div>
    </form>
  );
}
