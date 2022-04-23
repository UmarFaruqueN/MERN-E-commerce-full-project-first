const mongoose = require("mongoose");
const connection = require("../utils/database");

const productSchema = new mongoose.Schema({
     ProductName: {
          type: String,
          required: true,
     },
     ModelNumber: {
          type: String,
          required: true,
     },
     Category: {
          type: String,
          required: true,
     },

     SubCategory: {
          type: String,
          required: true,
     },
     Type: {
          type: String,
          required: true,
     },
     Stock: {
          type: Number,
          required: true,
     },
     LandingCost: {
          type: Number,
          required: true,
     },
     SellingPrice: {
          type: Number,
          required: true,
     },
     Description: {
          type: String,
          required: true,
     },
     CategoryOffer: {
          type: Number,
          required: true,
     },
     SubCategoryOffer: {
          type: Number,
          required: true,
     },
     TypeOffer: {
          type: Number,
          required: true,
     },
     ProductOffer: {
          type: Number,
          required: true,
     },
     CouponOffer: {
          type: Number,
          required: true,
     },
     Customers: {
          type: Array,
     },
     Image1: {
          type: String,
     },
     Image1id: {
          type: String,
     },
     Image2: {
          type: String,
     },
     Image2id: {
          type: String,
     },
     Image3: {
          type: String,
     },
     Image3id: {
          type: String,
     },
     Image4: {
          type: String,
     },
     Image4id: {
          type: String,
     },
     rating: {
          type: Array,
     },
     Offer: {
          type: Number,
     },
     OfferType: {
          type: String,
     },
});

const Product = connection.model("Product", productSchema);
module.exports = Product;
