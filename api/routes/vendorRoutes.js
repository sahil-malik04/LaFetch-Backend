const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  onboardVendor,
  updateVendor,
  getVendors,
  vendorStatus,
} = require("../controllers/vendorController");

router.post("/onboard-vendor", isAuthorized, onboardVendor);
router.put("/vendor/:userId", isAuthorized, upload.none(), updateVendor);
router.get("/vendors", isAuthorized, getVendors);
router.put("/status/:userId", isAuthorized, vendorStatus);

module.exports = router;
