const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  addCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponById,
  getPromotions,
  addPromotion,
  updatePromotion,
  deletePromotion,
  updatePromotionStatus,
} = require("../controllers/marketingMngController");
const upload = require("../middleware/upload");

// coupons
router.post("/coupon", isAuthorized, addCoupon);
router.get("/coupons", isAuthorized, getCoupon);
router.put("/coupon/:couponId", isAuthorized, updateCoupon);
router.delete("/coupon/:couponId", isAuthorized, deleteCoupon);
router.get("/coupon/:couponId", isAuthorized, getCouponById);

// promotions
router.get("/promotions", isAuthorized, getPromotions);
router.post(
  "/promotion",
  isAuthorized,
  upload.fields([{ name: "image" }]),
  addPromotion
);
router.put(
  "/promotion/:promotionId",
  isAuthorized,
  upload.fields([{ name: "image" }]),
  updatePromotion
);
router.delete("/promotion/:promotionId", isAuthorized, deletePromotion);
router.patch(
  "/promotion-status/:promotionId",
  isAuthorized,
  updatePromotionStatus
);

module.exports = router;
