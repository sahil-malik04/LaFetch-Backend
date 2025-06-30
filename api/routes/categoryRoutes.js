const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/categories", getCategories);
router.post("/category", addCategory);
router.put("/category/:categoryId", updateCategory);
router.delete("/category/:categoryId", deleteCategory);

module.exports = router;
