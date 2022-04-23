const mongoose = require("mongoose")
const connection = require("../utils/database")


const typeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    }
}
)



const Type = connection.model('Type',typeSchema);
module.exports = Type;