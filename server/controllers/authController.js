const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Otp = require("../models/Otp");
const sendOtpEmail = require("../utils/sendOtpEmail");
// send OTP, do not create user yet
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
         // generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
         // remove old OTP if exists
        await Otp.findOneAndDelete({ email });

        // save OTP
        await Otp.create({
            email,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
            });

            await sendOtpEmail(email, otp);
            // temporarily store user data in response flow (NOT DB yet)
        res.status(200).json({
        success: true,
        message: "OTP sent to email",
        });

    } catch (error) {
        res.status(500).json({
        message: error.message,
        });
    }
};
//login existing user, return token
//token is stored in local storage for frontend to use for authenticated requests
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// verifies otp and creaate a user returns the token
const verifyOtp = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;

        const record = await Otp.findOne({ email });
        if (!record) {
        return res.status(400).json({ message: "OTP expired" });
        }

        if (String(record.otp) != String(otp)) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const now = new Date().getTime();
        const expiresAt = new Date(record.expiresAt).getTime();

if (expiresAt <= now) {
    return res.status(400).json({ message: "OTP expired" });
}
        console.log("NOW:", Date.now());
    console.log("EXPIRES MS:", new Date(record.expiresAt).getTime());
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
        name,
        email,
        password: hashedPassword,
        });

        await Otp.deleteOne({ email });

        const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
        );

        res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get current logged in user details
const getMe = async (req, res) => {

    try {

         res.json({
            success: true,
            user: req.user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Dev testing rouute for OTP mail
const testOtpEmail = async (req, res) => {
  try {
    const email = "vsaravanak7@gmail.com"; // put your real email here
    const otp = "123456";

    await sendOtpEmail(email, otp);

    res.json({ success: true, message: "OTP email sent" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    testOtpEmail,
    verifyOtp
};