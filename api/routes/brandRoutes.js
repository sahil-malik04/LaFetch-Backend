const express = require("express");
const router = express.Router();
const { getBrands, viewBrand } = require("../controllers/brandController");

router.get("/brands", getBrands);
router.get("/view-brand/:brandId", viewBrand);

module.exports = router;
