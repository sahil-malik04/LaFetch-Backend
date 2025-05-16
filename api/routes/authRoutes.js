const express = require("express");
const router = express.Router();
const {
  signUpSendOtp,
  verifyOtp,
  resendOtp,
  updateUserProfile,
  signInSendOtp,
} = require("../controllers/authController");

// sign-up
router.post("/sign-up-send-otp", signUpSendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.put("/update-user-profile", updateUserProfile);

// sign-in
router.post("/sign-in-send-otp", signInSendOtp);

module.exports = router;
