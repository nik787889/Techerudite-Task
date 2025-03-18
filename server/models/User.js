// //
const mongoose = require("mongoose")

const User = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("User", User)