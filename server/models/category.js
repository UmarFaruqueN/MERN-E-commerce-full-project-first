const mongoose = require("mongoose")
const connection = require("../utils/database")


const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
}
)



const Category = connection.model('Category',categorySchema);
module.exports = Category;