const mongoose = require("mongoose");
const connection = require("../utils/database");

const bannerSchema = new mongoose.Schema({
     for: {
          type: String,
          required: true,
     },

     banner: {
        type: String,
        required: true,
     },
     bannerId: {
        type: String,
        required: true,
     },
});

const Banner = connection.model("Banner", bannerSchema);
module.exports = Banner;
