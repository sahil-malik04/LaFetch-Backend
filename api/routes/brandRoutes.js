const express = require("express");
const router = express.Router();
const { getBrands, getProductsByBrand } = require("../controllers/brandController");

router.get("/brands", getBrands);
router.get("/products/:brandId", getProductsByBrand);

module.exports = router;
