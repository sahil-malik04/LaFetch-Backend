const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getBrands,
  viewBrand,
  makeBrandFeatured,
  brandOnboard,
  editBrand,
  deleteBrand,
  getBrandLinkedWarehouses,
} = require("../controllers/brandController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/brands", getBrands);
router.get("/view-brand/:brandId", viewBrand);
router.patch("/brand/:brandId", isAuthorized, makeBrandFeatured);
router.post(
  "/brand-onboard",
  isAuthorized,
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
router.put(
  "/brand/:brandId",
  isAuthorized,
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
  editBrand
);
router.delete("/brand/:brandId", isAuthorized, deleteBrand);
router.get(
  "/brand-linked-warehouses/:brandId",
  isAuthorized,
  getBrandLinkedWarehouses
);

module.exports = router;
