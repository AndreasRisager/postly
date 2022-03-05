import axios from "axios";
import { useEffect, useState } from "react";
import RadioField from "../checkout/RadioField";
import XMLParser from "react-xml-parser";

export default function Levering({ checkout, setCheckout, nextStep, prevStep }) {
  const [statusMessage, setStatusMessage] = useState("");
  const [shipping, setShipping] = useState([]);
  useEffect(() => {
    async function getShipping() {
      const { data } = await axios.get(
        `https://www.gls.dk/webservices_v4/wsShopFinder.asmx/GetParcelShopDropPoint?street=${checkout.shipping_address1} ${checkout.shipping_address2}&zipcode=${checkout.zip_code}&countryIso3166A2=${checkout.country}&Amount=5`
      );
      var xml = new XMLParser().parseFromString(data);
      setShipping(xml.children[1].children);
    }
    getShipping();
  }, [checkout]);

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
          <button
            className="checkout__review-button"
            type="button"
            onClick={() => setCheckout({ ...checkout, step: 1 })}>
            Skift
          </button>
        </div>
        <div className="checkout__review">
          <p className="checkout__review-label">Send til</p>
          <p className="checkout__review-value">
            {`${checkout.shipping_address1}, ${
              checkout.shipping_address2 && `${checkout.shipping_address2},`
            } ${checkout.zip_code} ${checkout.city}, ${checkout.country}`}
          </p>
          <button
            className="checkout__review-button"
            type="button"
            onClick={() => setCheckout({ ...checkout, step: 1 })}>
            Skift
          </button>
        </div>
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title">Leveringsmetode</h2>
        {shipping.map((data) => {
          const pakkeshop = data.children;
          const address = `${pakkeshop[1].value}, ${pakkeshop[2].value}, ${pakkeshop[4].value} ${pakkeshop[5].value}`;
          return (
            <RadioField
              key={pakkeshop[0].value}
              name="delivery_method"
              id={pakkeshop[0].value}
              value={address}
              defaultChecked={checkout.delivery_method === address}
              onClick={(e) => {
                setCheckout((prev) => ({
                  ...prev,
                  delivery_method: e.target.value,
                  delivery_price: 29.0,
                }));
              }}>
              <div>GLS Pakkeshop - {address}</div>
              <div>29.00&nbsp;kr.</div>
            </RadioField>
          );
        })}
        <RadioField
          name="delivery_method"
          id="delivery_method1"
          value="GLS Hjemmelevering"
          defaultChecked={checkout.delivery_method === "GLS Hjemmelevering"}
          onClick={(e) => {
            setCheckout((prev) => ({
              ...prev,
              delivery_method: e.target.value,
              delivery_price: 45.0,
            }));
          }}>
          <div>GLS Hjemmelevering</div>
          <div>45.00&nbsp;kr.</div>
        </RadioField>
      </div>
      {statusMessage && <p className="checkout__statusMessage">*{statusMessage}*</p>}
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
