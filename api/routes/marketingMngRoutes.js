const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  addCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/marketingMngController");

// coupons
router.post("/coupon", isAuthorized, addCoupon);
router.get("/coupons", isAuthorized, getCoupon);
router.put("/coupon/:couponId", isAuthorized, updateCoupon);
router.delete("/coupon/:couponId", isAuthorized, deleteCoupon);

module.exports = router;
