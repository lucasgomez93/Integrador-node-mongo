const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");
const userBox = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, trim: true, unique:true},
    password: {type: String, required: true},
    data: {type: String, required: true} 
},
{timestamps: true} 
);

const User = model("user", userBox);

module.exports = User;

