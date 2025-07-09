const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/categoryController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/categories", getCategories);
router.get("/category/:categoryId", getCategoryById);
router.post("/category", isAuthorized, addCategory);
router.put("/category/:categoryId", isAuthorized, updateCategory);
router.delete("/category/:categoryId", isAuthorized, deleteCategory);

module.exports = router;
