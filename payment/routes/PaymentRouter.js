const express = require("express");
const router = express.Router();
const PaymentController = require("../controller/PaymentController");

router.post("/create-paypal-payment", PaymentController.confirmPayPalPayment);

module.exports = router;
