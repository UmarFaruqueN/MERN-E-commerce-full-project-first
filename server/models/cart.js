const mongoose = require("mongoose");
const connection = require("../utils/database");

const cartSchema = new mongoose.Schema({
     user: {
          type: String,
          required: true,
     },

     products: {
          type: Array,
          
     },
});

const Cart = connection.model("Cart", cartSchema);
module.exports = Cart;
