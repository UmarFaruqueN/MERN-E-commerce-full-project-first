const mongoose = require("mongoose")
const connection = require("../utils/database")


const subCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    }
}
)



const SubCategory = connection.model('SubCategory',subCategorySchema);
module.exports = SubCategory;