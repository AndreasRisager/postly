import { useState } from "react";
import RadioField from "../checkout/RadioField";

export default function Levering({
  checkout,
  setCheckout,
  nextStep,
  prevStep,
}) {
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.delivery_method.value === "") {
      setStatusMessage("Vælg en leveringsmetode");
      return;
    }
    nextStep();
  };
  return (
    <form className="checkout__levering" noValidate onSubmit={handleSubmit}>
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
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title">Leveringsmetode</h2>
        <RadioField
          name="delivery_method"
          id="delivery_method1"
          value="PostNord Pakkeshop 1"
          defaultChecked={checkout.delivery_method === "PostNord Pakkeshop 1"}
          onClick={(e) => {
            setCheckout((prev) => ({
              ...prev,
              delivery_method: e.target.value,
              delivery_price: 29.0,
            }));
          }}>
          <div>PostNord Pakkeshop 1</div>
          <div>29.00&nbsp;kr.</div>
        </RadioField>
        <RadioField
          name="delivery_method"
          id="delivery_method2"
          value="PostNord Pakkeshop 2"
          defaultChecked={checkout.delivery_method === "PostNord Pakkeshop 2"}
          onClick={(e) => {
            setCheckout((prev) => ({
              ...prev,
              delivery_method: e.target.value,
              delivery_price: 29.0,
            }));
          }}>
          <div>PostNord Pakkeshop 2</div>
          <div>29.00&nbsp;kr.</div>
        </RadioField>
        <RadioField
          name="delivery_method"
          id="delivery_method3"
          value="PostNord Pakkeshop 3"
          defaultChecked={checkout.delivery_method === "PostNord Pakkeshop 3"}
          onClick={(e) => {
            setCheckout((prev) => ({
              ...prev,
              delivery_method: e.target.value,
              delivery_price: 35.0,
            }));
          }}>
          <div>PostNord Pakkeshop 3</div>
          <div>35.00&nbsp;kr.</div>
        </RadioField>
      </div>
      {statusMessage && (
        <p className="checkout__statusMessage">*{statusMessage}*</p>
      )}
      <div className="checkout__stepButtons">
        <button className="checkout__stepBack" type="button" onClick={prevStep}>
          Tilbage til information
        </button>
        <button className="checkout__stepNext" type="submit">
          Fortsæt til betaling
        </button>
      </div>
    </form>
  );
}
