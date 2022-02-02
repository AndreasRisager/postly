import React from "react";
import "./Checkout.scss";
import Breadcrumb from "../components/checkout/Breadcrumb";
import ContactInfo from "../components/checkout/ContactInfo";
import Levering from "../components/checkout/Levering";
import useLocalStorage from "../helpers/useLocalStorage";
import Payment from "../components/checkout/Payment";

export default function Checkout() {
  const [checkout, setCheckout] = useLocalStorage("checkout", {
    step: 1,
    email: "",
    delivery_method: "ship",
    delivery_place: "",
    country: "",
    firstname: "",
    lastname: "",
    business: "",
    shipping_address1: "",
    shipping_address2: "",
    zip_code: "",
    city: "",
    phone: "",
  });

  const nextStep = () => {
    setCheckout({ ...checkout, step: checkout.step + 1 });
  };
  const prevStep = () => {
    setCheckout({ ...checkout, step: checkout.step - 1 });
  };

  console.log(checkout);

  return (
    <main className="checkout">
      <section>
        <h1 className="checkout__heading">Kassen</h1>
        <Breadcrumb
          step={checkout.step}
          setCheckout={setCheckout}
          checkout={checkout}
        />
        {checkout.step === 1 && (
          <ContactInfo
            checkout={checkout}
            setCheckout={setCheckout}
            nextStep={nextStep}
          />
        )}
        {checkout.step === 2 && (
          <Levering
            setCheckout={setCheckout}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {checkout.step === 3 && <Payment prevStep={prevStep} />}
        {checkout.step === 4 && <h1>Tak for dit køb!</h1>}
      </section>
      <aside>
        <p>subtotal 100.00 kr.</p>
        <p>levering 29.00 kr.</p>
      </aside>
    </main>
  );
}
