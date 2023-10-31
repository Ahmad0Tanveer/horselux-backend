

const express =require("express");
const router=express.Router();
const user = require("../Controller/user");
const authJwt = require("../middleware/Auth")
// const user = require("../Model/user");


 router.post('/user',user.userPost);
 router.get('/user',user.userGet);
 router.post('/user-singin',user.signinPost);
 router.post('/forgot-password', user.forgotPasswordPost);
 router.post('/verify-otp',  user.verifyOTPAndResetPassword);
 router.post('/reset-password',  user.ResetPassword);

 module.exports = router;