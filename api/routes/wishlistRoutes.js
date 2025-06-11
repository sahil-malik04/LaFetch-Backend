const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  addWishlistBoard,
  deleteWishlistBoard,
  renameBoard,
} = require("../controllers/wishlistController");

router.post("/wishlist-board", isAuthorized, addWishlistBoard);
router.delete("/wishlist-board/:boardId", isAuthorized, deleteWishlistBoard);
router.patch("/wishlist-board/:boardId", isAuthorized, renameBoard);

router.get("/wishlist/:userId", isAuthorized, getWishlist);
router.post("/wishlist", isAuthorized, addToWishlist);
router.delete("/wishlist", isAuthorized, removeFromWishlist);

module.exports = router;
