const express = require("express");
const router = express.Router();
const {
  signUpSendOtp,
  verifyOtp,
  resendOtp,
  updateUserProfile,
} = require("../controllers/authController");

router.post("/sign-up-send-otp", signUpSendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.put("/update-user-profile", updateUserProfile);

module.exports = router;
