import { useState } from "react";
import { useCart } from "../../helpers/CartContext";
import InputField from "../layout/InputField";
import RadioField from "../layout/RadioField";
import SelectField from "../layout/SelectField";
import Review from "./Review";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { CgSpinner } from "react-icons/cg";

export default function Payment({ state, prevStep, setStep, session }) {
  const { cart, resetCart, isCartEmpty } = useCart();
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [billing, setBilling] = useState({
    country: "Danmark-DK",
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
  });
  const router = useRouter();

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

    if (showBillingForm) {
      if (e.target.country.value === "") {
        e.target.country.focus();
        setStatusMessage("Vælg Land/område");
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
      if (e.target.address1.value === "") {
        e.target.address1.focus();
        setStatusMessage("Udfyld Adresse");
        return;
      }
      if (e.target.zip.value === "") {
        e.target.zip.focus();
        setStatusMessage("Udfyld Postnummer");
        return;
      }
      if (e.target.city.value === "") {
        e.target.city.focus();
        setStatusMessage("Udfyld By");
        return;
      }
    }

    setStatusMessage("");
    setIsProcessing(true);

    const billing_details = showBillingForm
      ? {
          address: {
            city: billing.city ? billing.city : state.city,
            country: billing.country.split("-")[1]
              ? billing.country.split("-")[1]
              : state.country.split("-")[1],
            line1: billing.address1 ? billing.address1 : state.address1,
            line2: billing.address2 ? billing.address2 : state.address2,
            postal_code: billing.zip ? billing.zip : state.zip,
          },
          email: state.email,
          name: `${billing.firstname ? billing.firstname : state.firstname} ${
            billing.lastname ? billing.lastname : state.lastname
          }`,
          phone: billing.phone ? billing.phone : state.phone,
        }
      : {
          address: {
            city: state.city,
            country: state.country.split("-")[1],
            line1: state.address1,
            line2: state.address2,
            postal_code: state.zip,
          },
          email: state.email,
          name: `${state.firstname} ${state.lastname}`,
          phone: state.phone,
        };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, checkout: state }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (typeof data.message === "string") {
          setStatusMessage(data.message);
        } else {
          throw new Error();
        }
      }

      const clientSecret = await response.text();

      const createPaymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details,
      });

      if (createPaymentMethod.error) {
        throw new Error();
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: createPaymentMethod.paymentMethod.id,
        receipt_email: state.email,
      });

      setIsProcessing(false);
      if (error) {
        console.log(error);
        setStatusMessage(error.message);
        return;
      }
      if (paymentIntent.status === "succeeded") {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${paymentIntent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        resetCart();
        router.push("/success");
      }
    } catch (error) {
      setIsProcessing(false);
      setStatusMessage("Der opstod en fejl!");
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
    <form onSubmit={handleSubmit}>
      <Review state={state} setStep={setStep} delivery />
      <h2 className="text-xl font-medium text-black mt-7">Betaling</h2>
      <h3 className="font-medium text-gray-600 mb-3">Alle transaktioner er sikre og krypterede.</h3>
      <div className="border border-inputBorder rounded-md p-4">
        <CardElement options={CardElementOptions} />
      </div>
      <section>
        <h2 className="text-xl font-medium text-black mt-7">Faktureringsadresse</h2>
        <h3 className="font-medium text-gray-600 mb-3">
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
            !showBillingForm
              ? {
                  borderBottom: "1px solid #d9d9d9",
                  borderRadius: "0 0 5px 5px",
                }
              : {}
          }>
          <div>Brug en anden faktureringsadresse</div>
        </RadioField>
        <div
          className={
            showBillingForm
              ? "grid grid-cols-2 gap-4 bg-gray-50 border border-inputBorder rounded-b-md p-4 "
              : "hidden"
          }>
          <SelectField
            name="country"
            id="country"
            label="Land/område"
            defaultValue={billing.country}
            onChange={(e) => {
              setBilling((prev) => ({
                ...prev,
                country: e.target.value,
              }));
            }}>
            <option value="Danmark-DK">Danmark</option>
          </SelectField>
          <InputField
            type="text"
            id="firstname"
            style={{ gridColumn: "span 1" }}
            value={billing.firstname}
            onChange={(e) => {
              setBilling((prev) => ({
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
            value={billing.lastname}
            onChange={(e) => {
              setBilling((prev) => ({
                ...prev,
                lastname: e.target.value,
              }));
            }}>
            Efternavn
          </InputField>
          <InputField
            type="text"
            id="address1"
            value={billing.address1}
            onChange={(e) => {
              setBilling((prev) => ({
                ...prev,
                address1: e.target.value,
              }));
            }}>
            Gade og husnummer
          </InputField>
          <InputField
            type="text"
            id="address2"
            value={billing.address2}
            onChange={(e) => {
              setBilling((prev) => ({
                ...prev,
                address2: e.target.value,
              }));
            }}>
            Lejlighed, etage osv. (valgfrit)
          </InputField>
          <InputField
            type="text"
            id="zip"
            style={{ gridColumn: "span 1" }}
            value={billing.zip}
            onChange={(e) => {
              setBilling((prev) => ({
                ...prev,
                zip: e.target.value,
              }));
            }}>
            Postnummer
          </InputField>
          <InputField
            type="text"
            id="city"
            style={{ gridColumn: "span 1" }}
            value={billing.city}
            onChange={(e) => {
              setBilling((prev) => ({
                ...prev,
                city: e.target.value,
              }));
            }}>
            By
          </InputField>
        </div>
      </section>

      <p className="text-red-700 italic my-2 min-h-6">{statusMessage}</p>
      <div className="flex flex-wrap gap-y-4 items-center justify-between">
        <button className="text-checkoutActiveColor font-normal" type="button" onClick={prevStep}>
          Tilbage til levering
        </button>
        <button
          className="bg-checkoutActiveColor text-black p-3.5 rounded-md font-normal disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit"
          disabled={isProcessing || isCartEmpty || !stripe}>
          {isProcessing ? (
            <p className="flex">
              <CgSpinner className="animate-spin h-6 w-6 mr-2" />
              Behandler...
            </p>
          ) : (
            "Fuldfør ordren"
          )}
        </button>
      </div>
    </form>
  );
}
