const express = require("express");
const router = express.Router();
const {
  signUpSendOtp,
  verifyOtp,
  resendOtp,
  updateUserProfile,
  signInSendOtp,
  deleteAccount,
  signOut,
  refreshToken,
  signIn,
} = require("../controllers/authController");
const { isAuthorized } = require("../middleware/authMiddleware");

// sign-up
router.post("/sign-up-send-otp", signUpSendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.put("/update-user-profile", updateUserProfile);

// admin-sign-in
router.post("/sign-in", signIn);

// sign-in
router.post("/sign-in-send-otp", signInSendOtp);

router.post("/delete-account/:userId", isAuthorized, deleteAccount);
router.post("/sign-out/:userId", signOut);
router.post("/refresh-token", refreshToken);

module.exports = router;
