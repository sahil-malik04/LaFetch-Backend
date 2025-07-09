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
  getAllWishlist,
  getWishlistBoards,
} = require("../controllers/wishlistController");

router.get("/wishlist-board/:userId", isAuthorized, getWishlistBoards);
router.post("/wishlist-board", isAuthorized, addWishlistBoard);
router.delete("/wishlist-board/:boardId", isAuthorized, deleteWishlistBoard);
router.patch("/wishlist-board/:boardId", isAuthorized, renameBoard);

router.get("/board-products/:boardId", isAuthorized, getWishlist);
router.post("/board-product", isAuthorized, addToWishlist);
router.delete("/board-product", isAuthorized, removeFromWishlist);

router.get("/users-with-wishlist", isAuthorized, getAllWishlist);

module.exports = router;
