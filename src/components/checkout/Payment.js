import RadioField from "../checkout/RadioField";

export default function Payment({ prevStep }) {
  return (
    <form className="checkout__payment" noValidate>
      <div className="checkout__review-wrapper">
        <div className="checkout__review">
          <p className="checkout__review-label">Kontakt</p>
          <p className="checkout__review-value">Mail</p>
          <button className="checkout__review-button">Skift</button>
        </div>
        <div className="checkout__review">
          <p className="checkout__review-label">Send til</p>
          <p className="checkout__review-value">Vej, Bynummer By, Land</p>
          <button className="checkout__review-button">Skift</button>
        </div>
        <div className="checkout__review">
          <p className="checkout__review-label">Methode</p>
          <p className="checkout__review-value">
            Levering til hjem - 29,00 kr.
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
          defaultChecked>
          <div>Samme adresse som leveringsadressen</div>
        </RadioField>
        <RadioField name="billing_address" id="other_billing_address">
          <div>Brug en anden faktureringsadresse</div>
        </RadioField>
      </div>
      <div className="checkout__stepButtons">
        <button className="checkout__stepBack" onClick={prevStep}>
          Tilbage til levering
        </button>
        <button className="checkout__stepNext">Fuldfør ordren</button>
      </div>
    </form>
  );
}
