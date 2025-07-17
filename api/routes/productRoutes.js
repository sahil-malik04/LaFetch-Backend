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
  updateProduct,
  getBannerById,
  syncProducts,
} = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/product/:productId", getProductById);
router.put("/product/:productId", isAuthorized, updateProduct);

// banner routes
router.get("/banners", getBanners);
router.get("/banner/:bannerId", getBannerById);
router.post("/banner", isAuthorized, addBanner);
router.put("/banner/:bannerId", isAuthorized, updateBanner);
router.delete("/banner/:bannerId", isAuthorized, deleteBanner);

// sync products
router.post("/sync-products", isAuthorized, syncProducts);

module.exports = router;
