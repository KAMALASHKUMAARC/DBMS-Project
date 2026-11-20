const Otp = require("../models/Otp");
const sendOtpEmail = require("../utils/sendOtpEmail");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    await Otp.findOneAndDelete({ email }); // remove old OTP

    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOtpEmail(email, otp);

    res.json({ success: true, message: "OTP sent to email" });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};