const express = require("express");
const router = express.Router();
const {
  getBrands,
  viewBrand,
  makeBrandFeatured,
} = require("../controllers/brandController");

router.get("/brands", getBrands);
router.get("/view-brand/:brandId", viewBrand);
router.patch("/brand/:brandId", makeBrandFeatured);

module.exports = router;
