const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/userProfileController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/user-profile/:userId", isAuthorized, getUserProfile);
// address
router.post("/address", isAuthorized, addAddress);
router.get("/addresses/:userId", isAuthorized, getAddress);
router.put("/address", isAuthorized, updateAddress);
router.delete("/address/:addressId", isAuthorized, deleteAddress);

module.exports = router;
