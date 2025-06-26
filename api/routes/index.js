const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const productRoutes = require("./productRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const brandRoutes = require("./brandRoutes");
const cartRoutes = require("./cartRoutes");
const reviewRoutes = require("./reviewRoutes");
const taxesRoutes = require("./taxesRoutes");
const locationRoutes = require("./locationRoutes");
const returnPolicyRoutes = require("./returnPolicyRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to la-fetch backend");
});
router.use("/auth", authRoutes);
router.use("/profile", userProfileRoutes);
router.use("/", productRoutes);
router.use("/", wishlistRoutes);
router.use("/", brandRoutes);
router.use("/", cartRoutes);
router.use("/", reviewRoutes);
router.use("/", taxesRoutes);
router.use("/location", locationRoutes);
router.use("/", returnPolicyRoutes);

module.exports = router;