require("dotenv").config();
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 8080, function () {
  console.log("App is running on port", process.env.PORT || 8080);
});

app.get("/v1/products", async (req, res) => {
  const products = await stripe.products.list({
    limit: 4,
  });

  res.send(products);
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get("/checkout-success", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post("/checkout", async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const { quantity } = req.body;

  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: process.env.PRICE,
        quantity: quantity,
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`,
    // automatic_tax: {enabled: true},
  });

  return res.redirect(303, session.url);
});
