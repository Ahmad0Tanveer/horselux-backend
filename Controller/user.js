const User = require('../Model/user');
const OTP = require("../Model/otp.model")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport');
var otp;
let transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "Your API KEY"
    }
  })
);

const sendOTPVerificationEmail = async (email) => {
  try {
    otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log("otp=============.>>>>>>>", otp);
    let otpModel = new OTP({ otp, email });
    await otpModel.save();
    const msg = {
      to: email,
      from: "humam123452@gmail.com",
      subject: "OTP Verification Code",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    };

    // Add return statement here
    return await transporter.sendMail(msg);

  } catch (error) {
    console.log(error);
    throw new Error("Error sending OTP");
  }
};


// const generateToken = (email) => {
//   return jwt.sign({ email }, "JWT_SECRET");
// };

exports.userPost = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    console.log(name, email);

    if (password !== confirmPassword) {
      return res.status(401).json({ message: 'Password and confirm password do not match' });
    }

    // Check if the email already exists in the database
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).json({ message: 'Email already exists. Please choose a different email.' });
    // }

    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: bcrypt.hashSync(password, 10),
      confirmPassword: bcrypt.hashSync(confirmPassword, 10),
    });

    let token = jwt.sign({ id: newUser._id }, "JWT_SECRET");

    const savedUser = await newUser.save();

    res.status(200).json({ message: 'Post created successfully', User: savedUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.userGet = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
};

exports.signinPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    let token = jwt.sign({ id: user._id }, "JWT_SECRET");
    console.log(token);
    res.status(200).json({ User: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred during sign-in" });
  }
};


exports.forgotPasswordPost = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newOTP = `${Math.floor(1000 + Math.random() * 900000)}`;
    user.otp = newOTP;
    await user.save();

    await sendOTPVerificationEmail(email);

    res.status(200).json({ message: 'OTP sent successfully', OTP: newOTP });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error sending OTP for password reset' });
  }
};

exports.verifyOTPAndResetPassword = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const otpModel = await OTP.findOne({ email });
    if (!otpModel) {
      return res.status(404).json({ message: 'Invalid OTP' });
    }
    if (otpModel.otp === otp) {
      await OTP.deleteMany({ email: email })
      res.status(200).json({ message: 'OTP is success' });
    }
    else {
      res.status(401).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};


exports.ResetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};


