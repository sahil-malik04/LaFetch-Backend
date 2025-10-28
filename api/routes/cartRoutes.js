const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controllers/cartController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.post("/add-to-cart", isAuthorized, addToCart);
router.get("/cart-items/:userId", isAuthorized, getCartItems);
router.delete("/cart-item", isAuthorized, removeCartItem);

module.exports = router;
