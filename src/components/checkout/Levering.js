import RadioField from "../checkout/RadioField";

export default function Levering({ setCheckout, nextStep, prevStep }) {
  return (
    <form className="checkout__levering" noValidate>
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
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title">Leveringsmetode</h2>
        <RadioField
          name="delivery_place"
          id="delivery_place1"
          defaultChecked
          value="GLS Pakkeshop 1"
          onClick={(e) => {
            setCheckout((prev) => ({
              ...prev,
              delivery_place: e.target.value,
            }));
          }}>
          <div>GLS Pakkeshop 1</div>
          <div>29.00 kr.</div>
        </RadioField>
        <RadioField
          name="delivery_place"
          id="delivery_place2"
          value="GLS Pakkeshop 2"
          onClick={(e) => {
            setCheckout((prev) => ({
              ...prev,
              delivery_place: e.target.value,
            }));
          }}>
          <div>GLS Pakkeshop 2</div>
          <div>29.00 kr.</div>
        </RadioField>
        <RadioField
          name="delivery_place"
          id="delivery_place3"
          value="GLS Pakkeshop 3"
          onClick={(e) => {
            setCheckout((prev) => ({
              ...prev,
              delivery_place: e.target.value,
            }));
          }}>
          <div>GLS Pakkeshop 3</div>
          <div>35.00 kr.</div>
        </RadioField>
      </div>
      <div className="checkout__stepButtons">
        <button className="checkout__stepBack" onClick={prevStep}>
          Tilbage til information
        </button>
        <button className="checkout__stepNext" onClick={nextStep}>
          Fortsæt til betaling
        </button>
      </div>
    </form>
  );
}
