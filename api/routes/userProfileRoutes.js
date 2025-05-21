const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  addAddress,
} = require("../controllers/userProfileController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/user-profile/:userId", isAuthorized, getUserProfile);
// address
router.post("/address", isAuthorized, addAddress);

module.exports = router;
