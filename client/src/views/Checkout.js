// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { useCart } from "../helpers/CartContext";
import "./Checkout.scss";

// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC);

export default function Checkout() {
  const { totalPrice } = useCart();

  // const handleSubmit = async (event, elements, stripe) => {
  //   event.preventDefault();

  //   if (isCartEmpty || !stripe || !elements) return;

  //   const cardElement = elements.getElement(CardElement);

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });

  //   if (error) {
  //     console.log(error);
  //   } else {
  //     const orderData = {
  //       line_items: cart,
  //       customer: {
  //         firstname: "john",
  //         lastname: "doe",
  //         email: "johndoe@gmail.com",
  //       },
  //       shipping: {
  //         name: "Primary",
  //         street: "address1",
  //         town_city: "city",
  //         postal_zip_code: "4345",
  //         country: "Denmark",
  //       },
  //       fulfillment: {
  //         shipping_method: "shippingOption",
  //       },
  //       payment: {
  //         gateway: "stripe",
  //         stripe: {
  //           payment_method_id: paymentMethod.id,
  //         },
  //       },
  //     };
  //   }
  // };
  return (
    <button>Betal {totalPrice}</button>
    // <Elements stripe={stripePromise}>
    //   <ElementsConsumer>
    //     {({ elements, stripe }) => (
    //       <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
    //         <CardElement />
    //         <br /> <br />
    //         <button>Betal {totalPrice}</button>
    //       </form>
    //     )}
    //   </ElementsConsumer>
    // </Elements>
  );
}
