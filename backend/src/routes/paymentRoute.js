const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/payment/process", protect, processPayment);

router.get("/stripeapikey", protect, sendStripeApiKey);

module.exports = router;
