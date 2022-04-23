const mongoose = require("mongoose");
const connection = require("../utils/database");

const checkoutSchema = new mongoose.Schema({
     total: {
          type: Number,
          required: true,
     },
     shipping: {
          type: Number,
          required: true,
     },
     offer: {
          type: String,
          required: true,
     },
     offerAmount: {
          type: Number,
          required: true,
     },




});

const Checkout = connection.model("Checkout", checkoutSchema);
module.exports = Checkout;
