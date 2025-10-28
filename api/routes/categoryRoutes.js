const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategoryHierarchy,
} = require("../controllers/categoryController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/categories", getCategories);
router.get("/category/:categoryId", getCategoryById);
router.post(
  "/category",
  isAuthorized,
  upload.fields([{ name: "image" }, { name: "banner" }]),
  addCategory
);
router.put(
  "/category/:categoryId",
  isAuthorized,
  upload.fields([{ name: "image" }, { name: "banner" }]),
  updateCategory
);
router.delete("/category/:categoryId", isAuthorized, deleteCategory);
router.get("/category-hierarchy", isAuthorized, getCategoryHierarchy);

module.exports = router;
