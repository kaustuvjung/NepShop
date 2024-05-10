const asyncHandler = require("express-async-handler");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPaymentKhalti = asyncHandler(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "rupee",
    metadata: {
      company: "NepShop",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

const processPayment = asyncHandler(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "rupee",
    metadata: {
      company: "NepShop",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

const sendStripeApiKey = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

module.exports = {
  processPayment,
  sendStripeApiKey,
  processPaymentKhalti,
};
