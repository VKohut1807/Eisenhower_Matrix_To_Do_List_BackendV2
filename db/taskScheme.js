const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskScheme = new Schema({
    _id: { type: Number, },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    completed: {
        type: Boolean,
        default: false
    },
    quadrant: {
        prioryty: { type: Number, },
        title: { type: String, },
        color: { type: String, },
        colorHex: { type: String, },
    },
    date: { type: Date, },
    avatar: {
        name: { type: String, },
        type: { type: String, },
        size: { type: Number, },
        url: { type: String, default: "" },
    }
}, { versionKey: false })

module.exports = mongoose.model("Task", TaskScheme);