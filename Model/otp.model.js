const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
    {
        otp: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("otps", otpSchema); 