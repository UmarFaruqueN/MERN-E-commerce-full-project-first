const mongoose = require("mongoose");
const connection = require("../utils/database");

const offerSchema = new mongoose.Schema({
     title: {
          type: String,
          required: true,
     },
     type: {
          type: String,
          required: true,
     },

     offerAmount: {
          type: Number,
          required: true,
     },
     minimumPurchase: {
          type: Number,
          required: true,
     },
     expireAt: {
          type: String,
          required: true,
     },
     expireDate: {
          type: Object,
          required: true,
     },
});

const Offer = connection.model("Offer", offerSchema);
module.exports = Offer;
