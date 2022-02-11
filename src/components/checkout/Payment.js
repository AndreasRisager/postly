import RadioField from "../checkout/RadioField";
import InputField from "../checkout/InputField";
import { useState } from "react";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCart } from "../../helpers/CartContext";
import { navigate } from "@reach/router";
import { BASE_URL } from "../../utils/urls";

export default function Payment({ checkout, setCheckout, prevStep }) {
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const { cart, resetCart, isCartEmpty } = useCart();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    if (!cardElement._complete) {
      setStatusMessage("Udfyld kort information");
      return;
    }

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const billing_details = showBillingForm
      ? {
          address: {
            city: checkout.billing_city,
            country: "DK",
            line1: checkout.billing_address1,
            line2: checkout.billing_address2,
            postal_code: checkout.billing_zip_code,
          },
          email: checkout.email,
          name: `${checkout.billing_firstname} ${checkout.billing_lastname}`,
          phone: checkout.billing_phone,
        }
      : {
          address: {
            city: checkout.city,
            country: "DK",
            line1: checkout.shipping_address1,
            line2: checkout.shipping_address2,
            postal_code: checkout.zip_code,
          },
          email: checkout.email,
          name: `${checkout.firstname} ${checkout.lastname}`,
          phone: checkout.phone,
        };

    try {
      const { data: clientSecret } = await axios.post(`${BASE_URL}/orders/`, {
        cart,
        checkout,
      });

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details,
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        receipt_email: checkout.email,
      });

      setIsProcessing(false);
      if (error) {
        setStatusMessage(error.message);
        return;
      }
      if (paymentIntent.status === "succeeded") {
        console.log("Tak for dit køb!");
        resetCart();
        navigate("/success");
      }
    } catch (error) {
      setIsProcessing(false);
      setStatusMessage("Der opstod en fejl!");
      console.log(error);
    }
  };

  const CardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: "17px",
        color: "#333",
      },
    },
  };

  return (
    <form className="checkout__payment" noValidate onSubmit={handleSubmit}>
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
        <div className="checkout__review">
          <p className="checkout__review-label">Methode</p>
          <p className="checkout__review-value">
            {checkout.delivery_method} &bull; {checkout.delivery_price.toFixed(2)}
            &nbsp;kr.
          </p>
          <button
            className="checkout__review-button"
            type="button"
            onClick={() => setCheckout({ ...checkout, step: 2 })}>
            Skift
          </button>
        </div>
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title checkout__title--nopadding">Betaling</h2>
        <h3 className="checkout__subtitle">Alle transaktioner er sikre og krypterede.</h3>
        <div className="cardElementContainer">
          <CardElement options={CardElementOptions} />
        </div>
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title checkout__title--nopadding">Faktureringsadresse</h2>
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
          <InputField type="text" id="country" value="Danmark" disabled>
            Land/område
          </InputField>
          <InputField
            type="text"
            id="firstname"
            style={{ gridColumn: "span 1" }}
            value={checkout.billing_firstname}
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
            value={checkout.billing_lastname}
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
            id="billing_address1"
            value={checkout.billing_address1}
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
            id="billing_address2"
            value={checkout.billing_address2}
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
            id="billing_zip_code"
            style={{ gridColumn: "span 1" }}
            value={checkout.billing_zip_code}
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
            value={checkout.billing_city}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                billing_city: e.target.value,
              }));
            }}>
            By
          </InputField>
        </div>
      </div>
      {statusMessage && <p className="checkout__statusMessage">*{statusMessage}*</p>}
      <div className="checkout__stepButtons">
        <button className="checkout__stepBack" type="button" onClick={prevStep}>
          Tilbage til levering
        </button>
        <button
          className="checkout__stepNext"
          type="submit"
          disabled={isProcessing || !stripe || !elements || isCartEmpty}>
          {isProcessing ? "Behandler ordren..." : "Fuldfør ordren"}
        </button>
      </div>
    </form>
  );
}
