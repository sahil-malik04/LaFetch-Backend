const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controllers/cartController");

router.post("/add-to-cart", addToCart);
router.get("/cart-items/:userId", getCartItems);
router.delete("/cart-item", removeCartItem);

module.exports = router;
