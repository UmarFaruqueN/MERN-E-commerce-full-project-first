const mongoose = require("mongoose")
const connection = require("../utils/database")
const jwt= require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}
)

adminSchema.methods.generateAuthToken = function () {
    const token=jwt.sign({_id:this._id},process.env.JWT_TOKEN,{expiresIn:"180000"})
    return token
}

const Admin = connection.model('Admin',adminSchema);
module.exports = Admin;