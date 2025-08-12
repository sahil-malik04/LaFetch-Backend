const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getBrands,
  viewBrand,
  makeBrandFeatured,
  brandOnboard,
} = require("../controllers/brandController");

router.get("/brands", getBrands);
router.get("/view-brand/:brandId", viewBrand);
router.patch("/brand/:brandId", makeBrandFeatured);
router.post(
  "/brand-onboard",
  upload.fields([
    { name: "logo" },
    { name: "video" },
    { name: "PAN" },
    { name: "GST" },
    { name: "incorporationCertificate" },
    { name: "udhyamAadhar" },
    { name: "trademarkCertificate" },
    { name: "authorizedSignatoryIDProof" },
    { name: "qualityAssuranceCertificate" },
  ]),
  brandOnboard
);

module.exports = router;
