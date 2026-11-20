const mongoose = require("mongoose");
//stores otp temporarily 
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date, // expiry time stamp
});

module.exports = mongoose.model("Otp", otpSchema);