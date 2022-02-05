import React from "react";
import "./Checkout.scss";
import Breadcrumb from "../components/checkout/Breadcrumb";
import ContactInfo from "../components/checkout/ContactInfo";
import Levering from "../components/checkout/Levering";
import Payment from "../components/checkout/Payment";
import { useCheckout } from "../helpers/CheckoutContext";
import { useCart } from "../helpers/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC}`);

export default function Checkout() {
  const { checkout, setCheckout } = useCheckout();
  const { totalPrice } = useCart();

  const nextStep = () => {
    setCheckout({ ...checkout, step: checkout.step + 1 });
  };
  const prevStep = () => {
    setCheckout({ ...checkout, step: checkout.step - 1 });
  };

  return (
    <Elements stripe={stripePromise}>
      <main className="checkout">
        <h1 className="checkout__heading">Kassen</h1>
        <Breadcrumb step={checkout.step} setCheckout={setCheckout} checkout={checkout} />
        <article className="checkout__wrapper">
          <section className="checkout__steps">
            {checkout.step === 1 && (
              <ContactInfo checkout={checkout} setCheckout={setCheckout} nextStep={nextStep} />
            )}
            {checkout.step === 2 && (
              <Levering
                checkout={checkout}
                setCheckout={setCheckout}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {checkout.step === 3 && (
              <Payment
                prevStep={prevStep}
                nextStep={nextStep}
                checkout={checkout}
                setCheckout={setCheckout}
              />
            )}
            {checkout.step === 4 && <h1>Tak for dit køb!</h1>}
          </section>
          <aside className="checkout__summary">
            <div className="checkout__summary-price">
              <p>
                <span className="checkout__summary-text">Subtotal</span>
                <span className="checkout__summary-text">{totalPrice}&nbsp;kr.</span>
              </p>
              <p>
                <span className="checkout__summary-text">Levering</span>
                {checkout.delivery_price ? (
                  <span className="checkout__summary-text">
                    {checkout.delivery_price.toFixed(2)}&nbsp;kr.
                  </span>
                ) : (
                  <span className="checkout__summary-text checkout__summary-text--small">
                    Beregnet ved næste trin
                  </span>
                )}
              </p>
            </div>
            <div className="checkout__summary-total">
              <p>
                <span className="checkout__summary-text">I alt</span>
                <span className="checkout__summary-totalPrice">
                  {checkout.delivery_price
                    ? (parseFloat(totalPrice) + checkout.delivery_price).toFixed(2)
                    : totalPrice}
                  &nbsp;kr.
                </span>
              </p>
            </div>
          </aside>
        </article>
      </main>
    </Elements>
  );
}
