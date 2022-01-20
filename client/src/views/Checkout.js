import { loadStripe } from "@stripe/stripe-js";
import "./Checkout.scss";

const stripePromise = loadStripe("pk_test_51KJOszIj4eKOJ7cWA4DXFTUzgHagumD73V2wyBTC4T6uKTAPOh3jTto0odReDAEwjukRVX1LEuqarK32Zb8XrZrT001Y1to1N7");

export default function Checkout() {
  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1KJP1dIj4eKOJ7cWjUCyCRw5", // Replace with the ID of your price
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
    });
    console.log(error);
  };
  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
}
