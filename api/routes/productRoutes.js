const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getProducts,
  getProductById,
  getBanners,
  addBanner,
  updateBanner,
  deleteBanner,
  getCategories,
} = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/product/:productId", getProductById);

// banner routes
router.get("/banners", getBanners);
router.post("/banner", addBanner);
router.put("/banner/:bannerId", updateBanner);
router.delete("/banner/:bannerId", deleteBanner);

// categories routes
router.get("/categories", getCategories);

module.exports = router;
