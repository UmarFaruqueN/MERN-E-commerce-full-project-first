const mongoose = require("mongoose");
const connection = require("../utils/database");

const addressSchema = new mongoose.Schema({
     user: {
          type: String,
          required: true,
     },

     name: {
          type: String,
          required: true,
     },
     phone: {
          type: String,
          required: true,
     },
     address: {
          type: String,
          required: true,
     },
     street: {
          type: String,
          required: true,
     },
     city: {
          type: String,
          required: true,
     },
     pin: {
          type: String,
          required: true,
     },
     district: {
          type: String,
          required: true,
     },
     state: {
          type: String,
          required: true,
     },
});

const Address = connection.model("Address", addressSchema);
module.exports = Address;
