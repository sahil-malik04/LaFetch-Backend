const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const productRoutes = require("./productRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const brandRoutes = require("./brandRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to la-fetch backend");
});
router.use("/auth", authRoutes);
router.use("/profile", userProfileRoutes);
router.use("/", productRoutes);
router.use("/", wishlistRoutes);
router.use("/", brandRoutes);

module.exports = router;