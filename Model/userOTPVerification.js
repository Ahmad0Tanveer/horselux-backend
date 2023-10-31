const mongoose=require("mongoose");
const { schema } = require("./feedHarry");
const Schema=mongoose.Schema;
const userOTPVerificationSchema=new Schema(
    {
        userId:String,
        opt:String,
        createAt:Date,
        expireAt:Date,
    }
);

const userOTPVerification=mongoose.model(
    "userOTPVerification",
    userOTPVerificationSchema
);
module.exports=userOTPVerification;