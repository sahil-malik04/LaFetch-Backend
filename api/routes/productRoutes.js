const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
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
  getSizeCharts,
  addSizeChart,
  updateSizeChart,
  deleteSizeChart,
  getSizeChartById,
  updateProductStatus,
  deleteProduct,
  onboardProduct,
  updateProductVariant,
} = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/product/:productId", getProductById);
router.put(
  "/product/:productId",
  isAuthorized,
  upload.fields([{ name: "image" }]),
  updateProduct
);
router.patch("/product-status/:productId", isAuthorized, updateProductStatus);
router.delete("/product/:productId", isAuthorized, deleteProduct);
router.post(
  "/product-onboard",
  isAuthorized,
  upload.fields([{ name: "image" }]),
  onboardProduct
);
router.put("/product-variant/:variantId", isAuthorized, updateProductVariant);
// banner routes
router.get("/banners", getBanners);
router.get("/banner/:bannerId", getBannerById);
router.post(
  "/banner",
  isAuthorized,
  upload.fields([{ name: "image" }]),
  addBanner
);
router.put(
  "/banner/:bannerId",
  isAuthorized,
  upload.fields([{ name: "image" }]),
  updateBanner
);
router.delete("/banner/:bannerId", isAuthorized, deleteBanner);

// sync products
router.post("/sync-products", isAuthorized, syncProducts);

// size charts
router.get("/product-size-charts", isAuthorized, getSizeCharts);
router.post(
  "/product-size-chart",
  isAuthorized,
  upload.fields([{ name: "sizeGuideImage" }]),
  addSizeChart
);
router.put(
  "/product-size-chart/:sizeChartId",
  isAuthorized,
  upload.fields([{ name: "sizeGuideImage" }]),
  updateSizeChart
);
router.delete(
  "/product-size-chart/:sizeChartId",
  isAuthorized,
  deleteSizeChart
);
router.get("/product-size-chart/:sizeChartId", isAuthorized, getSizeChartById);

module.exports = router;
