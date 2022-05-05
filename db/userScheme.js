const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
    _id: { type: Number, },
    hash: { type: String, default: "" },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    checkbox: {
        type: Boolean,
        required: true,
    },
}, { versionKey: false })

module.exports = mongoose.model("User", UserScheme);