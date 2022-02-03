import RadioField from "../checkout/RadioField";
import InputField from "../checkout/InputField";
import { useState } from "react";

export default function Payment({ checkout, setCheckout, prevStep, nextStep }) {
  const [showBillingForm, setShowBillingForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("BETAL");

    nextStep();
  };

  return (
    <form className="checkout__payment" noValidate onSubmit={handleSubmit}>
      <div className="checkout__review-wrapper">
        <div className="checkout__review">
          <p className="checkout__review-label">Kontakt</p>
          <p className="checkout__review-value">{checkout.email}</p>
          <button className="checkout__review-button">Skift</button>
        </div>
        <div className="checkout__review">
          <p className="checkout__review-label">Send til</p>
          <p className="checkout__review-value">
            {`${checkout.business && `${checkout.business},`} ${
              checkout.shipping_address1
            }, ${
              checkout.shipping_address2 && `${checkout.shipping_address2},`
            } ${checkout.zip_code} ${checkout.city}, ${checkout.country}`}
          </p>
          <button className="checkout__review-button">Skift</button>
        </div>
        <div className="checkout__review">
          <p className="checkout__review-label">Methode</p>
          <p className="checkout__review-value">
            {checkout.delivery_method} &bull;{" "}
            {checkout.delivery_price.toFixed(2)}
            &nbsp;kr.
          </p>
          <button className="checkout__review-button">Skift</button>
        </div>
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title checkout__title--nopadding">Betaling</h2>
        <h3 className="checkout__subtitle">
          Alle transaktioner er sikre og krypterede.
        </h3>
        <span>KOOOOORT</span>
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title checkout__title--nopadding">
          Faktureringsadresse
        </h2>
        <h3 className="checkout__subtitle">
          Vælg den adresse, der matcher dit kort eller betalingsmetode.
        </h3>
        <RadioField
          name="billing_address"
          id="same_billing_address"
          onClick={() => setShowBillingForm(false)}
          defaultChecked>
          <div>Samme adresse som leveringsadressen</div>
        </RadioField>
        <RadioField
          name="billing_address"
          id="other_billing_address"
          onClick={() => setShowBillingForm(true)}
          style={
            showBillingForm
              ? {}
              : {
                  borderBottom: "1px solid #d9d9d9",
                  borderRadius: "0 0 5px 5px",
                }
          }>
          <div>Brug en anden faktureringsadresse</div>
        </RadioField>
        <div
          className={
            showBillingForm
              ? "checkout__fields checkout__fields--billing"
              : "checkout__fields checkout__fields--billing checkout__fields--hide"
          }>
          <InputField
            type="text"
            id="country"
            value={checkout.country}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                billing_country: e.target.value,
              }));
            }}>
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
                billing_firstname: e.target.value,
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
                billing_lastname: e.target.value,
              }));
            }}>
            Efternavn
          </InputField>
          <InputField
            type="text"
            id="business"
            value={checkout.business}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                billing_business: e.target.value,
              }));
            }}>
            Firma (valgfrit)
          </InputField>
          <InputField
            type="text"
            id="shipping_address1"
            value={checkout.shipping_address1}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                billing_address1: e.target.value,
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
                billing_address2: e.target.value,
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
                billing_zip_code: e.target.value,
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
              setCheckout((prev) => ({
                ...prev,
                billing_city: e.target.value,
              }));
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
                billing_phone: e.target.value,
              }));
            }}>
            Telefon (du modtager en sms når din pakke sendes)
          </InputField>
        </div>
      </div>
      <div className="checkout__stepButtons">
        <button className="checkout__stepBack" type="button" onClick={prevStep}>
          Tilbage til levering
        </button>
        <button className="checkout__stepNext" type="submit">
          Fuldfør ordren
        </button>
      </div>
    </form>
  );
}
