import Information from "./Information";
import Payment from "./Payment";
import Shipping from "./Shipping";
import Summary from "./Summary";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC}`);

export default function Forms({ session, step, setStep, nextStep, prevStep }) {
  const [state, setState] = useState({
    email: session.user?.data?.email || "",
    country: session.user?.data?.country || "Danmark-DK",
    firstname: session.user?.data?.firstname || "",
    lastname: session.user?.data?.lastname || "",
    address1: session.user?.data?.address1 || "",
    address2: session.user?.data?.address2 || "",
    zip: session.user?.data?.zip || "",
    city: session.user?.data?.city || "",
    phone: session.user?.data?.phone || "",
    delivery_method: "",
    delivery_price: "",
    discount: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  return (
    <article className="flex flex-col sm:flex-row-reverse gap-8">
      <Summary state={state} setState={setState} />
      <section className="sm:w-2/3">
        {step === 1 && (
          <Information
            session={session}
            state={state}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <Shipping
            state={state}
            setState={setState}
            setStep={setStep}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {step === 3 && (
          <Elements stripe={stripePromise}>
            <Payment session={session} state={state} setStep={setStep} prevStep={prevStep} />
          </Elements>
        )}
      </section>
    </article>
  );
}
