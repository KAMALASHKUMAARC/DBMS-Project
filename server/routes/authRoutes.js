const express = require('express');
const protect = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getMe,
    testOtpEmail,
    verifyOtp
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/test-email', testOtpEmail);

module.exports = router;