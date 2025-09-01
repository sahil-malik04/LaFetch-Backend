const express = require("express");
const router = express.Router();
const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getBlogCategories,
  addBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controllers/blogController");
const { isAuthorized } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/get-blogs", getBlogs);
router.post(
  "/add-blog",
  isAuthorized,
  upload.fields([{ name: "image" }]),
  addBlog
);
router.patch("/delete-blog/:blogId", isAuthorized, deleteBlog);
router.put(
  "/update-blog/:blogId",
  isAuthorized,
  upload.fields([{ name: "image" }]),
  updateBlog
);
router.get("/view-blog/:blogId", getBlogById);

// categories
router.get("/blog-categories", getBlogCategories);
router.post("/blog-category", isAuthorized, addBlogCategory);
router.put("/blog-category/:categoryId", isAuthorized, updateBlogCategory);
router.delete("/blog-category/:categoryId", isAuthorized, deleteBlogCategory);

module.exports = router;
