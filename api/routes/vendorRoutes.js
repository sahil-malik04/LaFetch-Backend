const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  onboardVendor,
  updateVendor,
  getVendors,
  vendorStatus,
  vendorDocuments,
} = require("../controllers/vendorController");

router.post("/onboard-vendor", isAuthorized, onboardVendor);
router.put(
  "/vendor/:userId",
  isAuthorized,
  upload.fields([
    { name: "PAN" },
    { name: "businessRCertificate" },
    { name: "cancelledCheque" },
  ]),
  updateVendor
);
router.get("/vendors", isAuthorized, getVendors);
router.put("/status/:userId", isAuthorized, vendorStatus);
router.get("/vendor-documents/:vendorId", isAuthorized, vendorDocuments);

module.exports = router;
