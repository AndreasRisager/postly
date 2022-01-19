require("dotenv").config();
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const uuid = require("uuid/v4");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 8080, function () {
  console.log("App is running on port", process.env.PORT || 8080);
});

app.get("/", (req, res) => {
  res.send("STRIPE PAYMENT");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { token, cart, totalPrice } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: totalPrice * 100,
        currency: "dkk",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the something`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});
