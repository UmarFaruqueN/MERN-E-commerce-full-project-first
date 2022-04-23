const mongoose = require("mongoose");
const connection = require("../utils/database");

const orderSchema = new mongoose.Schema({
     userId: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: true,
     },
     phone: {
          type: Number,
          required: true,
     },
     address: {
          type: Object,
          required: true,
     },

     products: {
          type: Array,
          required: true,
     },
     subtotal: {
          type: Number,
          required: true,
     },
     shipping: {
          type: Number,
          required: true,
     },
     discount: {
          type: Number,
          required: true,
     },
     total: {
          type: Number,
          required: true,
     },
     paymentType: {
          type: String,
          required: true,
     },
     orderStatus: {
          type: String,
          required: true,
     },
     orderTime: {
          type: String,
     },
     statusTime: {
          type: String,
     },
     day: {
          type: String,
     },
     month: {
          type: String,
     },
     weekNumber: {
          type: String,
     },

});

const Order = connection.model("Order", orderSchema);
module.exports = Order;
