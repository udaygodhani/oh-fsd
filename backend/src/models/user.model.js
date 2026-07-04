const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Username is Required."]
    },
    email: {
        type: String,
        lowerCase: [true, "Email Should in Lowercase."],
        required: [true, "Email is Required."],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is not Valid."],
        unique: [true, "User with this email already exists."]
    },
    password: {
        type: String,
        required: [true, "Password is Required."],
        select: false
    },
    otp: {
        type: String,
        default: ""
    },
    otpExpired: {
        type: Date,
        default: new Date()
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;