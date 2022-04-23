const mongoose = require("mongoose");
const connection = require("../utils/database");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
          
     },
     phone: {
          type: String,
          required: true,
     },
     password: {
          type: String,
          required: true,
     },
     active: {
          type: Boolean,
          required: true,
     },
     cartProducts: {
          type: Array,
     },
     wishlist: {
          type: Array,
     },
     address: {
          type: Array,
     },
});

userSchema.methods.generateAuthToken = function () {
     const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN, { expiresIn: "180000" });
     return token;
};

const User = connection.model("User", userSchema);
module.exports = User;
